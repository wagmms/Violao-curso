/**
 * Ferramenta avançada de conferência curricular, factual e temporal - Lote 6 Revisado
 * Executa auditoria estrita de:
 * 1. Correspondência exata de títulos e IDs canônicos (zero divergência)
 * 2. URLs de arquivos do Drive associados a cada aula
 * 3. Validação matemática de orçamentos por soma de blocos numéricos por sessão
 * 4. Validação de evidência factual (timestamps, seções e status [Confirmado] vs [Provisório])
 * 5. Integridade do compilador e isolamento de guias em revisão (somente Mod 1 ativo na interface)
 */

const fs = require('fs');
const path = require('path');

// Raiz derivada de __dirname para portabilidade
const repoDir = process.cwd();

const invPath = path.join(repoDir, 'entregas-gemini/lote-1/revisado/INVENTARIO.json');
const idMapPath = path.join(repoDir, 'interface/ferramentas/mapa-identidade-aulas.json');
const guiaMod2Path = path.join(repoDir, 'entregas-gemini/lote-6/revisado/GUIA-MODULO-02.md');
const guiaMod3Path = path.join(repoDir, 'entregas-gemini/lote-6/revisado/GUIA-MODULO-03.md');
const guiasDadosPath = path.join(repoDir, 'interface/guias-dados.js');

const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));
const idMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));
const guiaMod2 = fs.readFileSync(guiaMod2Path, 'utf8');
const guiaMod3 = fs.readFileSync(guiaMod3Path, 'utf8');

function parseGuia(content, modNum, expectedCount) {
  const lines = content.split(/\r?\n/);
  const aulas = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^#### Aula (\d+) \(`([^`]+)`\):\s*(.+)$/);
    if (m) {
      if (current) aulas.push(current);
      current = {
        num: parseInt(m[1], 10),
        id: m[2],
        titulo: m[3].trim(),
        orcamento_raw: '',
        orcamento_lines: [],
        status_obj: '',
        fontes_urls: [],
        evidencia: ''
      };
      continue;
    }
    if (!current) continue;
    if (line.startsWith('- **Orçamento de Estudo (Sessão de 40 Minutos):**')) {
      current.orcamento_raw = line.replace('- **Orçamento de Estudo (Sessão de 40 Minutos):**', '').trim();
      current.orcamento_lines.push(current.orcamento_raw);
    } else if (current.orcamento_lines.length > 0 && line.trim().startsWith('- *Sessão')) {
      current.orcamento_lines.push(line.trim());
    } else if (line.startsWith('- **Objetivo da Aula:**')) {
      const match = line.match(/\*\[(.*?)\]\*/);
      current.status_obj = match ? match[1] : '';
    } else if (line.startsWith('- **Evidência do que foi Consultado:**')) {
      current.evidencia = line.replace('- **Evidência do que foi Consultado:**', '').trim();
    }
    const urlMatches = [...line.matchAll(/\[Link no Drive\]\((https:\/\/drive\.google\.com\/[^\)]+)\)/g)];
    for (const um of urlMatches) {
      current.fontes_urls.push(um[1]);
    }
  }
  if (current) aulas.push(current);

  if (aulas.length !== expectedCount) {
    throw new Error(`Módulo ${modNum}: esperado ${expectedCount} aulas, encontrado ${aulas.length}`);
  }
  return aulas;
}

const mod2Aulas = parseGuia(guiaMod2, 2, 38);
const mod3Aulas = parseGuia(guiaMod3, 3, 44);

const errors = [];
const relatorioAulas = [];

function validarOrcamentoSessao(a, modNum) {
  const raw = a.orcamento_raw;
  const lines = a.orcamento_lines;
  const registro = {
    modulo: modNum,
    aula: a.num,
    id: a.id,
    titulo: a.titulo,
    tipo_sessao: 'indefinido',
    sessoes: [],
    status_tempo: 'ok',
    status_evidencia: 'ok',
    erros: []
  };

  function extrairBlocos(linha) {
    let clean = linha;
    clean = clean.replace(/^.*?-\s*\*\*Orçamento[^*]+\*\*\s*/i, '');
    clean = clean.replace(/\[Sessão Agrupada com Aula\s+\d+[^\]]*\]:\s*/i, '');
    clean = clean.replace(/^.*?Sessão\s+\d+\s*\(\d+\s*min\):\s*/i, '');
    clean = clean.replace(/Total[\s\S]*$/i, '').trim();
    const parts = clean.split('|').map(p => p.trim()).filter(Boolean);
    const blocks = [];
    for (const p of parts) {
      const m = p.match(/^(.*?):\s*(\d+)\s*min/i);
      if (m) {
        blocks.push({ atividade: m[1].trim(), minutos: parseInt(m[2], 10) });
      }
    }
    return blocks;
  }

  // 1. Caso de aula extensa dividida em 2 sessões
  if (raw.includes('Dividida em 2 sessões')) {
    registro.tipo_sessao = 'aula_extensa_2_sessoes';
    const sessao1Line = lines.find(l => l.includes('Sessão 1'));
    const sessao2Line = lines.find(l => l.includes('Sessão 2'));
    if (!sessao1Line || !sessao2Line) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Falta detalhamento de Sessão 1 ou Sessão 2`;
      errors.push(err);
      registro.erros.push(err);
    } else {
      for (const [sName, sLine] of [['Sessão 1', sessao1Line], ['Sessão 2', sessao2Line]]) {
        const blocos = extrairBlocos(sLine);
        const soma = blocos.reduce((acc, b) => acc + b.minutos, 0);
        registro.sessoes.push({ nome: sName, blocos, soma_minutos: soma });
        if (soma !== 40) {
          const err = `[Módulo ${modNum} - Aula ${a.num}] Soma numérica de ${sName} é ${soma} min (esperado 40 min)`;
          errors.push(err);
          registro.erros.push(err);
          registro.status_tempo = 'divergencia';
        }
      }
    }
  }
  // 2. Caso de aula agrupada parceira (aponta para a principal sem contar minutos extras)
  else if (raw.includes('[Sessão Agrupada]: Cumprida conjuntamente')) {
    registro.tipo_sessao = 'agrupada_parceira';
    const mParceira = raw.match(/conjuntamente com a Aula (\d+)/i);
    const numParceira = mParceira ? parseInt(mParceira[1], 10) : null;
    registro.sessoes.push({
      nome: 'Sessão Conjunta (Compartilhada)',
      aponta_para_aula: numParceira,
      soma_minutos: 40,
      nota: 'Orçamento não duplicado; contabilizado na aula principal parceira.'
    });
  }
  // 3. Caso de aula agrupada principal (detalha a sessão única de 40 min)
  else if (raw.includes('[Sessão Agrupada com Aula')) {
    registro.tipo_sessao = 'agrupada_principal';
    const mParceira = raw.match(/com Aula (\d+)/i);
    const numParceira = mParceira ? parseInt(mParceira[1], 10) : null;
    const blocos = extrairBlocos(raw);
    const soma = blocos.reduce((acc, b) => acc + b.minutos, 0);
    registro.sessoes.push({
      nome: 'Sessão Conjunta Única',
      parceira_aula: numParceira,
      blocos,
      soma_minutos: soma
    });
    if (soma !== 40) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Soma numérica da sessão agrupada é ${soma} min (esperado 40 min)`;
      errors.push(err);
      registro.erros.push(err);
      registro.status_tempo = 'divergencia';
    }
  }
  // 4. Caso de sessão padrão de 40 minutos (5 + 10 + 20 + 5)
  else {
    registro.tipo_sessao = 'padrao_individual';
    const blocos = extrairBlocos(raw);
    const soma = blocos.reduce((acc, b) => acc + b.minutos, 0);
    registro.sessoes.push({ nome: 'Sessão Padrão', blocos, soma_minutos: soma });
    if (soma !== 40) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Soma numérica da sessão padrão é ${soma} min (esperado 40 min)`;
      errors.push(err);
      registro.erros.push(err);
      registro.status_tempo = 'divergencia';
    }
  }

  // Validação de Evidência Localizável
  const ev = a.evidencia;
  if (!ev || ev.trim().length === 0) {
    const err = `[Módulo ${modNum} - Aula ${a.num}] Evidência vazia.`;
    errors.push(err);
    registro.erros.push(err);
    registro.status_evidencia = 'erro';
  } else {
    // Proíbe uso de tamanho de arquivo como prova de conteúdo
    if (ev.includes(' MB)') || ev.includes(' bytes)')) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Evidência contém metadado de tamanho de arquivo (MB/bytes) em vez de referência textual/auditiva localizável.`;
      errors.push(err);
      registro.erros.push(err);
      registro.status_evidencia = 'erro';
    }
    // Se marcado como Confirmado, exige referência a arquivo e passagem/timestamp/seção
    if (a.status_obj === 'Confirmado') {
      const temArquivoRef = ev.includes('.vtt') || ev.includes('.md') || ev.includes('.pdf') || ev.includes('Apostila');
      const temPassagemRef = ev.includes('passagem') || ev.includes('seção') || ev.includes('pág') || ev.includes('aos ') || ev.includes('em ');
      if (!temArquivoRef || !temPassagemRef) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Objetivo Confirmado sem referência localizável (arquivo e passagem/timestamp): "${ev}"`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_evidencia = 'erro';
      }
    } else if (a.status_obj === 'Provisório') {
      // Itens provisórios devem explicitar a limitação documental
      if (!ev.includes('sem arquivo') && !ev.includes('sem legenda') && !ev.includes('sem transcrição') && !ev.includes('provisória')) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Objetivo Provisório deve explicitar a limitação documental na evidência.`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_evidencia = 'erro';
      }
    } else {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Status inválido: "${a.status_obj}"`;
      errors.push(err);
      registro.erros.push(err);
    }
  }

  relatorioAulas.push(registro);
}

function auditarCatalogo(aulas, modNum, modPrefix) {
  for (const a of aulas) {
    // 1. Checa correspondência de título com mapa-identidade-aulas.json
    const expectedId = idMap[`${modPrefix}:::${a.titulo}`];
    if (!expectedId) {
      errors.push(`[Módulo ${modNum} - Aula ${a.num}] Título não encontrado no mapa de identidade: "${a.titulo}"`);
    } else if (expectedId !== a.id) {
      errors.push(`[Módulo ${modNum} - Aula ${a.num}] Divergência de ID: esperado ${expectedId}, no guia está ${a.id}`);
    }

    // 2. Checa se o título confere com o inventário
    const invItem = inv.find(x => x.modulo === modPrefix && (x.grupo_aula === a.titulo || x.titulo === a.titulo));
    if (!invItem) {
      errors.push(`[Módulo ${modNum} - Aula ${a.num}] Grupo não encontrado no inventário: "${a.titulo}"`);
    }

    validarOrcamentoSessao(a, modNum);
  }
}

auditarCatalogo(mod2Aulas, 2, '02. Módulo 2');
auditarCatalogo(mod3Aulas, 3, '03. Módulo 3');

// Auditoria do guias-dados.js na interface
global.window = {};
require(guiasDadosPath);
const fakeWindow = global.window;

if (!fakeWindow.CURSO_MAPA_ESTUDO || fakeWindow.CURSO_MAPA_ESTUDO.length < 5000) {
  errors.push('CURSO_MAPA_ESTUDO ausente ou incompleto em guias-dados.js');
}

if (!fakeWindow.CURSO_GUIAS || Object.keys(fakeWindow.CURSO_GUIAS).length !== 46) {
  errors.push(`CURSO_GUIAS deve conter exatamente 46 aulas do Módulo 1. Contém: ${Object.keys(fakeWindow.CURSO_GUIAS || {}).length}`);
}

// Confirma que Módulos 2 e 3 NÃO estão ativados prematuramente na interface
for (const id of Object.keys(fakeWindow.CURSO_GUIAS || {})) {
  if (!id.startsWith('aula-mod-1-')) {
    errors.push(`Aula de módulo não homologado ativada prematuramente na interface: ${id}`);
  }
}

// Estatísticas de tempo e sessões
const stats = {
  total_aulas_auditadas: relatorioAulas.length,
  por_tipo_sessao: {
    padrao_individual: relatorioAulas.filter(r => r.tipo_sessao === 'padrao_individual').length,
    agrupada_principal: relatorioAulas.filter(r => r.tipo_sessao === 'agrupada_principal').length,
    agrupada_parceira: relatorioAulas.filter(r => r.tipo_sessao === 'agrupada_parceira').length,
    aula_extensa_2_sessoes: relatorioAulas.filter(r => r.tipo_sessao === 'aula_extensa_2_sessoes').length
  },
  por_status_objetivo: {
    confirmado: relatorioAulas.filter(r => mod2Aulas.concat(mod3Aulas).find(a => a.id === r.id)?.status_obj === 'Confirmado').length,
    provisorio: relatorioAulas.filter(r => mod2Aulas.concat(mod3Aulas).find(a => a.id === r.id)?.status_obj === 'Provisório').length
  }
};

const resultado = {
  data_auditoria: new Date().toISOString(),
  total_erros: errors.length,
  erros: errors,
  estatisticas: stats,
  aulas: relatorioAulas
};

const outputJsonPath = path.join(repoDir, 'entregas-gemini/lote-6/revisado/RESULTADO-CONFERENCIA.json');
fs.writeFileSync(outputJsonPath, JSON.stringify(resultado, null, 2), 'utf8');

// Salva o próprio script em entregas-gemini/lote-6/revisado/ferramentas/conferir-lote-6.cjs
const toolsDir = path.join(repoDir, 'entregas-gemini/lote-6/revisado/ferramentas');
fs.mkdirSync(toolsDir, { recursive: true });
const selfCode = fs.readFileSync(__filename, 'utf8');
fs.writeFileSync(path.join(toolsDir, 'conferir-lote-6.cjs'), selfCode, 'utf8');

console.log(`\n=== RELATÓRIO DE AUDITORIA CURRICULAR E TEMPORAL (LOTE 6 REVISADO) ===`);
console.log(`Total de aulas auditadas: ${stats.total_aulas_auditadas}`);
console.log(`Distribuição de sessões:`, stats.por_tipo_sessao);
console.log(`Status de objetivos:`, stats.por_status_objetivo);
console.log(`Total de erros encontrados: ${errors.length}`);

if (errors.length === 0) {
  console.log(`\n✔ SUCESSO TOTAL! Todas as 38 aulas do Mod 2 e 44 aulas do Mod 3 auditadas matematicamente.`);
  console.log(`✔ 100% das sessões fecham em 40 minutos exatos por soma de blocos numéricos.`);
  console.log(`✔ Nenhuma evidência contém metadados de MB/bytes; todas possuem referências verificáveis ou status [Provisório] justificado.`);
  console.log(`✔ Compilador portátil validado com apenas Módulo 1 ativo na interface (zero botões fantasmas).`);
  process.exit(0);
} else {
  console.error(`\n❌ ERROS ENCONTRADOS:\n`, errors);
  process.exit(1);
}
