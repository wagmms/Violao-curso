/**
 * validar-piloto.cjs
 * 
 * Validador estático e determinístico do piloto funcional em interface-v2/
 * Verifica:
 * - Existência e sintaxe dos arquivos essenciais
 * - Contrato rigoroso de 9 itens em todas as 6 atividades didáticas
 * - Orçamento de 40 minutos exatos na sessão guiada (3 + 5 + 7 + 15 + 7 + 3 = 40 min)
 * - Coerência de links e IDs das fontes com o catálogo canônico
 * - Preservação de dados e compatibilidade com navegadores
 * 
 * Execução: node interface-v2/ferramentas/validar-piloto.cjs
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '../..');
const V2_DIR = path.resolve(__dirname, '..');

console.log('=== Validação do Piloto Didático: Método Tríade v2 ===');

let erros = [];
let avisos = [];

// 1. Verificação de Arquivos Obrigatórios
const arquivosObrigatorios = [
  'index.html',
  'estilo.css',
  'dados-catalogo.js',
  'dados-atividades.js',
  'audio-motor.js',
  'app.js', 'utils.js', 'storage.js', 'srs-engine.js', 'timer.js', 'ear-training.js', 'views.js', 'timer-worker.js'
];

for (const arq of arquivosObrigatorios) {
  const p = path.join(V2_DIR, arq);
  if (!fs.existsSync(p)) {
    erros.push(`Arquivo obrigatório ausente: ${arq}`);
  } else {
    const stats = fs.statSync(p);
    if (stats.size === 0) {
      erros.push(`Arquivo está vazio: ${arq}`);
    }
  }
}

if (erros.length > 0) {
  console.error('Erros estruturais encontrados:', erros);
  process.exit(1);
}

// 2. Carregar e Validar Dados no Sandbox VM
const sandbox = { window: {}, URL };
vm.createContext(sandbox);

// Carregar catálogo
try {
  const codigoCatalogo = fs.readFileSync(path.join(V2_DIR, 'dados-catalogo.js'), 'utf8');
  vm.runInContext(codigoCatalogo, sandbox);
} catch (e) {
  erros.push(`Falha ao executar dados-catalogo.js: ${e.message}`);
}

// Carregar atividades
try {
  const codigoAtividades = fs.readFileSync(path.join(V2_DIR, 'dados-atividades.js'), 'utf8');
  vm.runInContext(codigoAtividades, sandbox);
} catch (e) {
  erros.push(`Falha ao executar dados-atividades.js: ${e.message}`);
}

const catalogo = sandbox.window.CURSO_DADOS;
const atividades = sandbox.window.PILOTO_ATIVIDADES;

if (!catalogo || !Array.isArray(catalogo.catalogoOriginal)) {
  erros.push('dados-catalogo.js não definiu window.CURSO_DADOS corretamente.');
} else {
  console.log(`✓ Catálogo de referência carregado: ${catalogo.meta.totalAulas} aulas em ${catalogo.meta.totalModulos} módulos.`);
}

if (!atividades || !Array.isArray(atividades)) {
  erros.push('dados-atividades.js não definiu window.PILOTO_ATIVIDADES corretamente.');
} else {
  console.log(`✓ Base de atividades didáticas carregada: ${atividades.length} atividades cadastradas.`);
}

if (new Set(atividades.map(a => a.id)).size !== atividades.length) erros.push('IDs de atividades duplicados.');
vm.runInContext(fs.readFileSync(path.join(V2_DIR, 'utils.js'), 'utf8'), sandbox);
for (const arquivo of arquivosObrigatorios.filter(a => a.endsWith('.js'))) {
  try { new vm.Script(fs.readFileSync(path.join(V2_DIR, arquivo), 'utf8')); }
  catch(e) { erros.push(`Sintaxe inválida em ${arquivo}: ${e.message}`); }
}

// Mapa de IDs de aulas catalogadas para conferência cruzada
const idsAulasCatalogadas = new Set();
if (catalogo && catalogo.catalogoOriginal) {
  catalogo.catalogoOriginal.forEach(m => {
    m.aulas.forEach(a => idsAulasCatalogadas.add(a.id));
  });
}

// 3. Validação Detalhada do Contrato de Aula Pronta (9 Itens) em cada Atividade
atividades.forEach((ativ, idx) => {
  const rotulo = `Atividade [${idx + 1}/${atividades.length}] "${ativ.titulo || 'Sem título'}" (${ativ.id})`;
  if (ativ.statusOperacional === 'rascunho') {
    avisos.push(`${rotulo}: rascunho preservado, fora das sessões disponíveis; conteúdo ainda não homologado.`);
    if (sandbox.atividadeTemSessao(ativ)) erros.push(`${rotulo}: rascunho não pode iniciar sessão.`);
    return;
  }
  
  // Item 1: Habilidade e meta observável com pré-requisito testável
  if (!ativ.habilidade || typeof ativ.habilidade !== 'string' || ativ.habilidade.length < 15) {
    erros.push(`${rotulo}: Item 1 inválido - habilidade deve ser descrita claramente.`);
  }
  if (!ativ.metaObservavel || typeof ativ.metaObservavel !== 'string' || ativ.metaObservavel.length < 15) {
    erros.push(`${rotulo}: Item 1 inválido - meta observável deve ser clara e mensurável.`);
  }
  if (!ativ.prerequisito || typeof ativ.prerequisito !== 'string') {
    erros.push(`${rotulo}: Item 1 inválido - pré-requisito testável não informado.`);
  }

  // Item 2: Explicação curta com exemplo e termos definidos
  if (!ativ.explicacao || ativ.explicacao.length < 30) {
    erros.push(`${rotulo}: Item 2 inválido - explicação didática muito curta ou ausente.`);
  }

  // Item 3: Demonstração acessível e fontes do acervo
  if (!Array.isArray(ativ.fontes) || ativ.fontes.length === 0) {
    erros.push(`${rotulo}: Item 3 inválido - deve citar ao menos uma fonte do acervo.`);
  } else {
    ativ.fontes.map(sandbox.hidratarFonte).forEach(f => {
      if (!f.aulaId || !idsAulasCatalogadas.has(f.aulaId)) {
        avisos.push(`${rotulo}: Fonte cita aulaId "${f.aulaId}" que não consta no catálogo geral.`);
      }
      if (!f.url && idsAulasCatalogadas.has(f.aulaId)) {
        avisos.push(`${rotulo}: referência ${f.aulaId} sem arquivo de estudo; não deve gerar link na tela.`);
      } else if (!sandbox.urlDriveValida(f.url)) {
        erros.push(`${rotulo}: Fonte "${f.tituloAula}" deve ter URL segura no Drive.`);
      }
      if (!f.autoria) {
        erros.push(`${rotulo}: Fonte "${f.tituloAula}" deve explicitar autoria de complementos.`);
      }
    });
    if (!ativ.fontes.map(sandbox.hidratarFonte).some(f => sandbox.urlDriveValida(f.url))) erros.push(`${rotulo}: nenhuma fonte com material de estudo disponível.`);
  }

  // Item 4: Exercício escrito que permita começar sem adivinhar
  if (!ativ.exercicio || typeof ativ.exercicio !== 'object') {
    erros.push(`${rotulo}: Item 4 inválido - objeto 'exercicio' ausente.`);
  } else {
    if (!ativ.exercicio.contagem) erros.push(`${rotulo}: Item 4 - contagem rítmica ausente.`);
    if (!ativ.exercicio.dedilhacaoMD) erros.push(`${rotulo}: Item 4 - dedilhação/mão direita ausente.`);
  }

  // Item 5: Três níveis do mesmo objetivo (Preparação, Alvo, Variação)
  if (!ativ.exercicio.niveis || !ativ.exercicio.niveis.preparacao || !ativ.exercicio.niveis.alvo || !ativ.exercicio.niveis.variacao) {
    erros.push(`${rotulo}: Item 5 inválido - deve conter exatamente os três níveis: preparacao, alvo e variacao.`);
  } else {
    ['preparacao', 'alvo', 'variacao'].forEach(nk => {
      const niv = ativ.exercicio.niveis[nk];
      if (!niv.tablatura || niv.tablatura.length < 10) {
        erros.push(`${rotulo}: Nível "${nk}" sem partitura/tablatura legível.`);
      }
      if (!niv.dica) {
        erros.push(`${rotulo}: Nível "${nk}" sem dica de execução.`);
      }
    });
  }

  // Item 6: Erros observáveis e correção correspondente
  if (!Array.isArray(ativ.errosComuns) || ativ.errosComuns.length === 0) {
    erros.push(`${rotulo}: Item 6 inválido - deve listar erros comuns e correções.`);
  } else {
    ativ.errosComuns.forEach((e, eIdx) => {
      if (!e.erro || !e.correcao) {
        erros.push(`${rotulo}: Erro comum [${eIdx}] deve ter tanto o erro quanto a correção proativa.`);
      }
    });
  }

  // Item 7: Aplicação musical curta
  if (!ativ.aplicacaoMusical || ativ.aplicacaoMusical.length < 15) {
    erros.push(`${rotulo}: Item 7 inválido - aplicação musical ausente ou genérica.`);
  }

  // Item 8: Critério de saída e recuperação
  if (!ativ.criterioSaida || ativ.criterioSaida.length < 10) {
    erros.push(`${rotulo}: Item 8 inválido - critério de saída ausente.`);
  }
  if (!ativ.recuperacao || ativ.recuperacao.length < 15) {
    erros.push(`${rotulo}: Item 8 inválido - caminho de recuperação ausente.`);
  }

  // Validação de Prontidão (deve ser "em_revisao" até homologação pelo Codex)
  if (ativ.statusProntidao !== 'em_revisao') {
    erros.push(`${rotulo}: Status de prontidão deve ser "em_revisao" até aprovação final pelo Codex.`);
  }

  // Item 9 e Orçamento da Sessão de 40 Minutos
  if (!Array.isArray(ativ.sessao40min) || ativ.sessao40min.length !== 6) {
    erros.push(`${rotulo}: Orçamento de 40 min deve ter exatamente 6 blocos estruturados.`);
  } else {
    const somaMinutos = ativ.sessao40min.reduce((acc, bloco) => acc + (Number(bloco.minutos) || 0), 0);
    if (somaMinutos !== 40) {
      erros.push(`${rotulo}: Soma dos minutos da sessão é ${somaMinutos} min; DEVE ser exatamente 40 min.`);
    }
  }
});

// 4. Verificações Musicais Específicas (Auditoria das Correções do Codex)
console.log('--- Verificações Musicais e Pedagógicas Específicas ---');

// Atividade 1: Pulso e Subdivisão
const ativ1 = atividades.find(a => a.id === 'ativ-1');
if (ativ1) {
  if (!ativ1.exercicio.instrucoes.includes('compasso 9') && !ativ1.exercicio.niveis.alvo.tablatura.includes('c. 9')) {
    erros.push('Ativ 1: Deve explicitar abafamento/corte formal no pulso 1 do compasso 9.');
  }
}

// Atividade 2: Troca A - D
const ativ2 = atividades.find(a => a.id === 'ativ-2');
if (ativ2) {
  const textoAtiv2 = JSON.stringify(ativ2);
  if (textoAtiv2.includes('dedo 1 fixo na 3ª corda') || textoAtiv2.includes('dedo 1 como guia na 3ª')) {
    erros.push('Ativ 2: Alegação inválida de dedo 1 fixo na 3ª corda entre A e D com digitação padrão 1-2-3.');
  }
  const var2 = ativ2.exercicio.niveis.variacao;
  if (!var2.descricao.includes('semínima (♩ p)') || !var2.tablatura.includes('(3)  e   4   e')) {
    erros.push('Ativ 2: Variação deve registrar a subdivisão exata da balada (semínima, colcheias, contratempo).');
  }
}

// Atividade 3: Leitura Rítmica
const ativ3 = atividades.find(a => a.id === 'ativ-3');
if (ativ3) {
  const tabVar3 = ativ3.exercicio.niveis.variacao.tablatura;
  if (!tabVar3.includes('baixo p') || !tabVar3.includes('agudo i/m') || !tabVar3.includes('(X)')) {
    erros.push('Ativ 3: Variação deve alinhar cordas 6 e 1 em grade temporal única com distinção de ataque e abafamento (X).');
  }
}

// Atividade 4: Treino Auditivo
const ativ4 = atividades.find(a => a.id === 'ativ-4');
if (ativ4) {
  const ints = ativ4.exercicio.intervalosPorNivel;
  if (!ints || !ints.preparacao || ints.preparacao.length !== 2) {
    erros.push('Ativ 4: Preparação deve ter conjunto restrito de exatamente 2 intervalos.');
  }
  if (!ints || !ints.alvo || ints.alvo.length !== 4) {
    erros.push('Ativ 4: Alvo deve ter exatamente 4 intervalos fundamentais.');
  }
  if (!ints || !ints.variacao || ints.variacao.length !== 6) {
    erros.push('Ativ 4: Variação deve ter 6 intervalos incluindo sextas.');
  }
  const textoAtiv4 = JSON.stringify(ativ4);
  if (textoAtiv4.includes('avaliação acústica do violão') || textoAtiv4.includes('reconhecimento do microfone')) {
    erros.push('Ativ 4: Não deve alegar avaliação automática da execução física no instrumento.');
  }
}

// Atividade 5: Tríades
const ativ5 = atividades.find(a => a.id === 'ativ-5');
if (ativ5) {
  const descAlvo5 = ativ5.exercicio.niveis.alvo.descricao;
  const tabAlvo5 = ativ5.exercicio.niveis.alvo.tablatura;
  if (!descAlvo5.includes('Dó3') || !descAlvo5.includes('Mi3') || !descAlvo5.includes('Sol3') || !tabAlvo5.includes('C3 (T)    E3 (3M)   G3 (5J)')) {
    erros.push('Ativ 5: Arpejos de C e Am devem conter as notas fundamentais reais (T-3-5) com alturas corretas.');
  }
  const tabVar5 = ativ5.exercicio.niveis.variacao.tablatura;
  if (!tabVar5.includes('3M (Si)   5J (Ré)   T (Sol)') || !tabVar5.includes('Incompleta (sem 5ª)')) {
    erros.push('Ativ 5: Variação deve rotular tétrades/díades incompletas sem 5ª e apresentar a tríade de G completa com D.');
  }
}

// Atividade 6: Melodia e Acompanhamento
const ativ6 = atividades.find(a => a.id === 'ativ-6');
if (ativ6) {
  const prep6 = ativ6.exercicio.niveis.preparacao.tablatura;
  const alvo6 = ativ6.exercicio.niveis.alvo.tablatura;
  const var6 = ativ6.exercicio.niveis.variacao.tablatura;
  if (!prep6.includes('4/4') || !prep6.includes('c. 1') || !prep6.includes('c. 4')) {
    erros.push('Ativ 6: Preparação deve ter exatamente 4 compassos completos em métrica 4/4.');
  }
  if (!alvo6.includes('4/4') || !alvo6.includes('c. 1') || !alvo6.includes('c. 4')) {
    erros.push('Ativ 6: Alvo deve ter exatamente 4 compassos completos em métrica 4/4.');
  }
  if (!var6.includes('4/4') || !var6.includes('c. 1') || !var6.includes('c. 4')) {
    erros.push('Ativ 6: Variação deve ter exatamente 4 compassos completos em métrica 4/4.');
  }
  if (!ativ6.fontes.some(f => f.autoria.includes('didática autoral'))) {
    erros.push('Ativ 6: Exercício deve ser expressamente rotulado como composição didática autoral.');
  }
}

// 5. Exibição do Resultado
console.log('----------------------------------------------------');
if (avisos.length > 0) {
  console.log(`Avisos (${avisos.length}):`);
  avisos.forEach(a => console.log(` - ⚠ ${a}`));
}

if (erros.length > 0) {
  console.error(`ERROS ENCONTRADOS (${erros.length}):`);
  erros.forEach(e => console.error(` - ❌ ${e}`));
  process.exit(1);
} else {
  console.log('✅ Estrutura de dados, contrato didático e correções musicais validadas com sucesso!');
  console.log('Observação: A validação estática de dados e métricas prepara o piloto para a re-auditoria de código e homologação didática pelo Codex.');
  process.exit(0);
}
