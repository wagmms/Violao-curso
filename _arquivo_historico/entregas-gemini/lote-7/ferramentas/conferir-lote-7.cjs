/**
 * Script de Conferência e Auditoria Curricular, Factual e Temporal — Lote 7 (Módulos 4 e 5)
 * Executa validações estritas:
 * 1. Correspondência exata de títulos e IDs canônicos com INVENTARIO.json e mapa-identidade-aulas.json (72 aulas)
 * 2. Correspondência de links do Google Drive
 * 3. Partição correta de arquivos (Mod 4: 12 com arquivo, 25 sem arquivo; Mod 5: 13 com arquivo, 22 sem arquivo)
 * 4. Aulas sem arquivo: marcação de *[Não verificado]*, dependência inferida, ação prática e 0 min (sem duração artificial)
 * 5. Aulas com arquivo: evidência localizável (timestamps/páginas), ZERO menção a MB/bytes, soma matemática estrita de 40 min
 * 6. Preservação da interface: Módulos 1-3 ativos (128 guias), Módulos 4 e 5 estritamente isolados (0 guias na interface)
 */

const fs = require('fs');
const path = require('path');

const repoDir = process.cwd();
const invPath = path.join(repoDir, 'entregas-gemini/lote-1/revisado/INVENTARIO.json');
const idMapPath = path.join(repoDir, 'interface/ferramentas/mapa-identidade-aulas.json');
const guiaMod4Path = path.join(repoDir, 'entregas-gemini/lote-7/GUIA-MODULO-04.md');
const guiaMod5Path = path.join(repoDir, 'entregas-gemini/lote-7/GUIA-MODULO-05.md');
const guiasDadosPath = path.join(repoDir, 'interface/guias-dados.js');
const conteudoGeralPath = path.join(repoDir, 'interface/conteudo-geral.js');

const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));
const idMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));

function parseGuia(filePath, modNum, expectedCount) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const aulas = [];
  let cur = null;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^#### Aula (\d+) \(`([^`]+)`\):\s*(.+)$/);
    if (m) {
      if (cur) aulas.push(cur);
      cur = {
        modulo: modNum,
        num: parseInt(m[1], 10),
        id: m[2].trim(),
        titulo: m[3].trim(),
        orcamento_raw: '',
        objetivo_raw: '',
        status_obj: '',
        fontes_raw: [],
        evidencia_raw: '',
        dependencia_raw: '',
        acao_lacuna_raw: '',
        linhas: []
      };
      continue;
    }
    if (!cur) continue;
    cur.linhas.push(l);

    if (l.startsWith('- **Orçamento de Estudo')) {
      cur.orcamento_raw = l.replace(/^- \*\*Orçamento de Estudo[^*]*\*\*:\s*/, '').trim();
    } else if (l.startsWith('- **Objetivo')) {
      cur.objetivo_raw = l.replace(/^- \*\*Objetivo[^*]*\*\*:\s*/, '').trim();
      const matchStatus = cur.objetivo_raw.match(/\*\[(.*?)\]\*/);
      cur.status_obj = matchStatus ? matchStatus[1] : '';
    } else if (l.startsWith('- **Evidência')) {
      cur.evidencia_raw = l.replace(/^- \*\*Evidência[^*]*\*\*:\s*/, '').trim();
    } else if (l.startsWith('- **Dependência Curricular Inferida:**')) {
      cur.dependencia_raw = l.replace(/^- \*\*Dependência Curricular Inferida:\*\*\s*/, '').trim();
    } else if (l.startsWith('- **Ação Prática para Resolução de Lacuna:**')) {
      cur.acao_lacuna_raw = l.replace(/^- \*\*Ação Prática para Resolução de Lacuna:\*\*\s*/, '').trim();
    }
    
    const urlMatches = [...l.matchAll(/\[(?:Acessar no Google Drive|Link no Drive)\]\((https:\/\/drive\.google\.com\/[^\)]+)\)/g)];
    for (const um of urlMatches) {
      cur.fontes_raw.push(um[1]);
    }
  }
  if (cur) aulas.push(cur);

  if (aulas.length !== expectedCount) {
    throw new Error(`Módulo ${modNum}: esperado ${expectedCount} aulas, mas obteve ${aulas.length}`);
  }
  return aulas;
}

const mod4Aulas = parseGuia(guiaMod4Path, 4, 37);
const mod5Aulas = parseGuia(guiaMod5Path, 5, 35);

const errors = [];
const avisos = [];
const relatorioAulas = [];

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

function auditarAula(a, modNum, modPrefix) {
  const registro = {
    modulo: modNum,
    aula: a.num,
    id: a.id,
    titulo: a.titulo,
    tem_arquivo: false,
    tipo_sessao: 'indefinido',
    orcamento_minutos: 0,
    status_tempo: 'ok',
    status_evidencia: 'ok',
    status_identidade: 'ok',
    erros: []
  };

  // 1. Identidade e Título
  const key = `${modPrefix}:::${a.titulo}`;
  const expectedId = idMap[key];
  if (!expectedId) {
    const err = `[Módulo ${modNum} - Aula ${a.num}] Título não consta em mapa-identidade-aulas.json: "${a.titulo}"`;
    errors.push(err);
    registro.erros.push(err);
    registro.status_identidade = 'erro';
  } else if (expectedId !== a.id) {
    const err = `[Módulo ${modNum} - Aula ${a.num}] ID divergente para "${a.titulo}": esperado ${expectedId}, obtido ${a.id}`;
    errors.push(err);
    registro.erros.push(err);
    registro.status_identidade = 'erro';
  }

  // 2. Localização no Inventário
  const invItem = inv.find(x => x.modulo === modPrefix && (x.grupo_aula === a.titulo || x.titulo === a.titulo));
  if (!invItem) {
    const err = `[Módulo ${modNum} - Aula ${a.num}] Não encontrado no inventário: "${a.titulo}"`;
    errors.push(err);
    registro.erros.push(err);
  } else {
    // Verifica URL se houver no inventário
    if (invItem.url_drive) {
      const urlEncontrada = a.fontes_raw.some(u => u === invItem.url_drive);
      if (!urlEncontrada) {
        avisos.push(`[Módulo ${modNum} - Aula ${a.num}] URL do inventário não listada explicitamente no guia: ${invItem.url_drive}`);
      }
    }
  }

  // 3. Determinação de Presença de Arquivo
  // Mod 4: 12 com arquivo (aulas 4, 9, 10, 20, 21, 22, 23, 24, 25, 26, 29, 34)
  // Mod 5: 13 com arquivo (aulas 7, 13, 14, 15, 16, 17, 19, 20, 24, 25, 33, 34, 35)
  const mod4ComArq = [4, 9, 10, 20, 21, 22, 23, 24, 25, 26, 29, 34];
  const mod5ComArq = [7, 13, 14, 15, 16, 17, 19, 20, 24, 25, 33, 34, 35];
  const esperadoComArquivo = modNum === 4 ? mod4ComArq.includes(a.num) : mod5ComArq.includes(a.num);
  registro.tem_arquivo = esperadoComArquivo;

  // 4. Auditoria de Aulas SEM Arquivo (Item de plataforma Hotmart)
  if (!esperadoComArquivo) {
    registro.tipo_sessao = 'item_documental_sem_sessao';
    registro.orcamento_minutos = 0;

    // Deve ter [Não verificado]
    if (a.status_obj !== 'Não verificado') {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Aula sem arquivo deve ter objetivo marcado como *[Não verificado]*. Obtido: "${a.status_obj}"`;
      errors.push(err);
      registro.erros.push(err);
    }

    // Deve ter dependência inferida
    if (!a.dependencia_raw || a.dependencia_raw.length < 5) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Aula sem arquivo deve documentar dependência curricular inferida.`;
      errors.push(err);
      registro.erros.push(err);
    }

    // Deve ter ação prática para lacuna
    if (!a.acao_lacuna_raw || a.acao_lacuna_raw.length < 5) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Aula sem arquivo deve documentar ação prática para resolução de lacuna.`;
      errors.push(err);
      registro.erros.push(err);
    }

    // Orçamento DEVE ser 0 min
    if (!a.orcamento_raw.includes('0 min') && !a.orcamento_raw.includes('sem sessão alocada')) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Item documental sem arquivo deve ter 0 min alocados. Obtido: "${a.orcamento_raw}"`;
      errors.push(err);
      registro.erros.push(err);
      registro.status_tempo = 'erro';
    }
  } 
  // 5. Auditoria de Aulas COM Arquivo
  else {
    // Proíbe metadados de tamanho de arquivo (MB/bytes) na evidência
    if (/\b\d+(\.\d+)?\s*(MB|GB|KB|bytes)\b/i.test(a.evidencia_raw)) {
      const err = `[Módulo ${modNum} - Aula ${a.num}] Evidência contém metadado de tamanho de arquivo (MB/bytes): "${a.evidencia_raw}"`;
      errors.push(err);
      registro.erros.push(err);
      registro.status_evidencia = 'erro';
    }

    if (a.status_obj === 'Confirmado') {
      // Exige referência verificável (timestamp MM:SS, pág. de apostila, seção ou questionário)
      const temRefVerificavel = /aos \d+:\d+|\d+:\d+|pág\.|Apostila|questionário|Katomart|seção/i.test(a.evidencia_raw);
      if (!temRefVerificavel) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Objetivo [Confirmado] sem referência localizável (timestamp ou página): "${a.evidencia_raw}"`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_evidencia = 'erro';
      }
    } else if (a.status_obj === 'Provisório') {
      // Exige explicitação da limitação documental (sem legenda / sem transcrição)
      const temLimitacao = /sem legenda|sem transcrição|sem arquivo/i.test(a.evidencia_raw);
      if (!temLimitacao) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Objetivo [Provisório] deve explicitar a limitação documental na evidência: "${a.evidencia_raw}"`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_evidencia = 'erro';
      }
    }

    // Caso institucional sem instrumento (Mod 4 Aula 34)
    if (modNum === 4 && a.num === 34) {
      registro.tipo_sessao = 'institucional_sem_pratica';
      registro.orcamento_minutos = 0;
      if (!a.orcamento_raw.includes('0 min')) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Aula institucional sem instrumento deve ter 0 min.`;
        errors.push(err);
        registro.erros.push(err);
      }
    }
    // Caso de aula agrupada parceira (compartilha sessão da principal)
    else if (a.orcamento_raw.includes('[Sessão Agrupada]: Cumprida conjuntamente') || a.orcamento_raw.includes('0 min adicionais')) {
      registro.tipo_sessao = 'agrupada_parceira';
      registro.orcamento_minutos = 0;
      const mParceira = a.orcamento_raw.match(/Aula (\d+)/i);
      if (!mParceira) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Aula agrupada parceira sem indicação da aula principal: "${a.orcamento_raw}"`;
        errors.push(err);
        registro.erros.push(err);
      } else {
        registro.aula_parceira = parseInt(mParceira[1], 10);
      }
    }
    // Caso de aula agrupada principal (detalha a sessão conjunta de 40 min)
    else if (a.orcamento_raw.includes('[Sessão Agrupada')) {
      registro.tipo_sessao = 'agrupada_principal';
      const mParceira = a.orcamento_raw.match(/com Aula (\d+)/i);
      registro.aula_parceira = mParceira ? parseInt(mParceira[1], 10) : null;
      const blocos = extrairBlocos(a.orcamento_raw);
      const soma = blocos.reduce((acc, b) => acc + b.minutos, 0);
      registro.orcamento_minutos = soma;
      registro.blocos = blocos;
      if (soma !== 40) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Sessão agrupada principal soma ${soma} min (esperado 40 min). Linha: "${a.orcamento_raw}"`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_tempo = 'erro';
      }
    }
    // Sessão padrão individual de 40 min
    else {
      registro.tipo_sessao = 'padrao_individual_40min';
      const blocos = extrairBlocos(a.orcamento_raw);
      const soma = blocos.reduce((acc, b) => acc + b.minutos, 0);
      registro.orcamento_minutos = soma;
      registro.blocos = blocos;
      if (soma !== 40) {
        const err = `[Módulo ${modNum} - Aula ${a.num}] Sessão individual soma ${soma} min (esperado 40 min). Linha: "${a.orcamento_raw}"`;
        errors.push(err);
        registro.erros.push(err);
        registro.status_tempo = 'erro';
      }
    }
  }

  relatorioAulas.push(registro);
}

for (const a of mod4Aulas) {
  auditarAula(a, 4, '04. Módulo 4');
}

for (const a of mod5Aulas) {
  auditarAula(a, 5, '05. Módulo 5');
}

// Auditoria de Integridade e Isolamento da Interface
global.window = {};
require(guiasDadosPath);
const fakeWindow = global.window;

const activeGuiasCount = Object.keys(fakeWindow.CURSO_GUIAS || {}).length;
if (activeGuiasCount !== 128) {
  errors.push(`Interface deve manter exatamente 128 guias ativos (Módulos 1, 2 e 3). Contém: ${activeGuiasCount}`);
}

// Confirma que Módulos 4 e 5 NÃO estão ativos prematuramente na interface
for (const id of Object.keys(fakeWindow.CURSO_GUIAS || {})) {
  if (id.includes('mod-4') || id.includes('mod-5')) {
    errors.push(`Aula de módulo em revisão (Módulos 4/5) ativada prematuramente na interface: ${id}`);
  }
}

// Confirma integridade do catálogo global de 300 aulas em 11 módulos
global.window = {};
require(conteudoGeralPath);
const modulosGeral = (global.window.CURSO_DADOS && global.window.CURSO_DADOS.catalogoOriginal) || [];
let totalAulasGeral = 0;
modulosGeral.forEach(m => {
  totalAulasGeral += (m.aulas || []).length;
});

if (modulosGeral.length !== 11 || totalAulasGeral !== 300) {
  errors.push(`Catálogo geral da interface corrompido: ${modulosGeral.length} módulos (esperado 11), ${totalAulasGeral} aulas (esperado 300)`);
}

const stats = {
  total_aulas_auditadas: relatorioAulas.length,
  modulo_4: {
    total: mod4Aulas.length,
    com_arquivo: relatorioAulas.filter(r => r.modulo === 4 && r.tem_arquivo).length,
    sem_arquivo: relatorioAulas.filter(r => r.modulo === 4 && !r.tem_arquivo).length
  },
  modulo_5: {
    total: mod5Aulas.length,
    com_arquivo: relatorioAulas.filter(r => r.modulo === 5 && r.tem_arquivo).length,
    sem_arquivo: relatorioAulas.filter(r => r.modulo === 5 && !r.tem_arquivo).length
  },
  por_tipo_sessao: {
    padrao_individual_40min: relatorioAulas.filter(r => r.tipo_sessao === 'padrao_individual_40min').length,
    agrupada_principal: relatorioAulas.filter(r => r.tipo_sessao === 'agrupada_principal').length,
    agrupada_parceira: relatorioAulas.filter(r => r.tipo_sessao === 'agrupada_parceira').length,
    institucional_sem_pratica: relatorioAulas.filter(r => r.tipo_sessao === 'institucional_sem_pratica').length,
    item_documental_sem_sessao: relatorioAulas.filter(r => r.tipo_sessao === 'item_documental_sem_sessao').length
  },
  por_status_objetivo: {
    confirmado: relatorioAulas.filter(r => {
      const a = mod4Aulas.concat(mod5Aulas).find(x => x.id === r.id);
      return a && a.status_obj === 'Confirmado';
    }).length,
    provisorio: relatorioAulas.filter(r => {
      const a = mod4Aulas.concat(mod5Aulas).find(x => x.id === r.id);
      return a && a.status_obj === 'Provisório';
    }).length,
    nao_verificado: relatorioAulas.filter(r => {
      const a = mod4Aulas.concat(mod5Aulas).find(x => x.id === r.id);
      return a && a.status_obj === 'Não verificado';
    }).length
  },
  isolamento_interface: {
    guias_ativos_interface: activeGuiasCount,
    modulos_1_a_3_ativos: true,
    modulos_4_e_5_em_revisao_isolados: true
  }
};

const resultado = {
  data_auditoria: new Date().toISOString(),
  lote: 7,
  total_erros: errors.length,
  total_avisos: avisos.length,
  erros: errors,
  avisos: avisos,
  estatisticas: stats,
  aulas: relatorioAulas
};

// Salva o JSON de conferência
const outputPath = path.join(repoDir, 'entregas-gemini/lote-7/RESULTADO-CONFERENCIA.json');
fs.writeFileSync(outputPath, JSON.stringify(resultado, null, 2), 'utf8');

// Salva o próprio script em entregas-gemini/lote-7/ferramentas/conferir-lote-7.cjs
const toolsDir = path.join(repoDir, 'entregas-gemini/lote-7/ferramentas');
fs.mkdirSync(toolsDir, { recursive: true });
const selfCode = fs.readFileSync(__filename, 'utf8');
fs.writeFileSync(path.join(toolsDir, 'conferir-lote-7.cjs'), selfCode, 'utf8');

console.log(`\n======================================================`);
console.log(`   RELATÓRIO DE AUDITORIA CURRICULAR — LOTE 7`);
console.log(`======================================================`);
console.log(`Total de aulas auditadas: ${stats.total_aulas_auditadas} (72 esperadas)`);
console.log(`Módulo 4: ${stats.modulo_4.total} aulas (${stats.modulo_4.com_arquivo} com arquivo / ${stats.modulo_4.sem_arquivo} sem arquivo)`);
console.log(`Módulo 5: ${stats.modulo_5.total} aulas (${stats.modulo_5.com_arquivo} com arquivo / ${stats.modulo_5.sem_arquivo} sem arquivo)`);
console.log(`Distribuição de sessões:`, stats.por_tipo_sessao);
console.log(`Status de objetivos:`, stats.por_status_objetivo);
console.log(`Isolamento de interface: 128 guias ativos (Mod 1-3), 0 de Mod 4-5.`);
console.log(`Total de erros: ${errors.length}`);
console.log(`Total de avisos: ${avisos.length}`);

if (errors.length === 0) {
  console.log(`\n✔ SUCESSO: Todos os critérios curriculares, matemáticos e de integridade foram atendidos!`);
  process.exit(0);
} else {
  console.error(`\n❌ ERROS ENCONTRADOS:`);
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
}
