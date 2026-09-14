/**
 * Script de Verificação Automatizada da Interface — Lote 4
 * Execução: node interface/ferramentas/validar-interface.cjs
 *
 * Importa diretamente CursoRegras de nucleo-regras.js (sem simuladores)
 * e valida dados de conteudo.js contra EVENTOS.json e TABLATURAS-COMPLETAS.md.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Carregar nucleo-regras.js diretamente como módulo Node
const nucleoPath = path.join(__dirname, '..', 'nucleo-regras.js');
if (!fs.existsSync(nucleoPath)) {
  console.error('ERRO: interface/nucleo-regras.js não encontrado!');
  process.exit(1);
}
const CursoRegras = require(nucleoPath);

// 2. Carregar conteudo.js em sandbox global (simulando o navegador)
const conteudoPath = path.join(__dirname, '..', 'conteudo.js');
if (!fs.existsSync(conteudoPath)) {
  console.error('ERRO: interface/conteudo.js não encontrado!');
  process.exit(1);
}

const conteudoCode = fs.readFileSync(conteudoPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(conteudoCode, sandbox);

const CURSO_DADOS = sandbox.window.CURSO_DADOS;
if (!CURSO_DADOS) {
  console.error('ERRO: CURSO_DADOS não foi definido no escopo global!');
  process.exit(1);
}

// 3. Carregar arquivos do Lote 3 para comparação de dados musicais
const eventosLote3Path = path.join(__dirname, '..', '..', 'entregas-gemini', 'lote-3', 'revisado', 'EVENTOS.json');
let EVENTOS_LOTE3 = null;
if (fs.existsSync(eventosLote3Path)) {
  try {
    EVENTOS_LOTE3 = JSON.parse(fs.readFileSync(eventosLote3Path, 'utf8'));
  } catch (e) {
    console.warn('Aviso: Não foi possível ler EVENTOS.json do Lote 3:', e.message);
  }
}

let falhas = 0;
let sucessos = 0;

function assert(cond, msg) {
  if (cond) {
    sucessos++;
    console.log(`  ✔ ${msg}`);
  } else {
    falhas++;
    console.error(`  ✖ FALHA: ${msg}`);
  }
}

console.log('================================================================');
console.log('SUÍTE DE TESTES E VERIFICAÇÃO AUTOMATIZADA — LOTE 4 REVISADO');
console.log('================================================================\n');

// -------------------------------------------------------------
// TESTE 1: Catálogo do Método Tríade e Títulos Originais
// -------------------------------------------------------------
console.log('[TESTE 1] Catálogo Original do Método Tríade:');
assert(CURSO_DADOS.catalogoOriginal && CURSO_DADOS.catalogoOriginal.length === 11, 'Exatamente 11 módulos catalogados.');

const titulosEsperados = [
  '01. Módulo 1',
  '02. Módulo 2',
  '03. Módulo 3',
  '04. Módulo 4',
  '05. Módulo 5',
  '06. Módulo 6',
  '07. Mês 7',
  '08. Mês 8',
  '09. Mês 9',
  '10. UPGRADE 5.0 Escala Maior Definitiva',
  '11. Links da AULA MENSAL e SORTEIO'
];

let modulosComTituloOriginal = 0;
let modulosComNotaEditorial = 0;

CURSO_DADOS.catalogoOriginal.forEach((m, idx) => {
  if (m.tituloOriginal === titulosEsperados[idx] && m.titulo.startsWith(titulosEsperados[idx])) {
    modulosComTituloOriginal++;
  }
  if (m.notaEditorial && m.notaEditorial.trim().length > 0) {
    modulosComNotaEditorial++;
  }
});

assert(modulosComTituloOriginal === 11, 'Todos os 11 módulos mantêm seus títulos originais do Drive como referência principal.');
assert(modulosComNotaEditorial === 11, 'Todos os 11 módulos possuem notas editoriais separadas identificando o conteúdo.');

let totalAulas = 0;
let totalComArquivo = 0;
let totalSemArquivo = 0;
let totalVideos = 0;
let totalPDFs = 0;
let fragmentosExcluidos = 0;

CURSO_DADOS.catalogoOriginal.forEach(m => {
  totalAulas += m.aulas.length;
  m.aulas.forEach(a => {
    if (a.temArquivos) totalComArquivo++;
    else totalSemArquivo++;

    if (a.materiais) {
      a.materiais.forEach(f => {
        if (f.tipo === 'video') totalVideos++;
        if (f.tipo === 'pdf') totalPDFs++;
        if (f.caminho_local && f.caminho_local.includes('.part-Frag') && f.utilizavel) fragmentosExcluidos++;
      });
    }
  });
});

assert(totalAulas === 300, `Total de 300 aulas catalogadas (obtido: ${totalAulas}).`);
assert(totalComArquivo === 197, `Total de 197 aulas com arquivos utilizáveis (obtido: ${totalComArquivo}).`);
assert(totalSemArquivo === 103, `Total de 103 aulas sem arquivos / texto no Katomart (obtido: ${totalSemArquivo}).`);
assert(totalVideos === 285, `Total de 285 vídeos utilizáveis no acervo (obtido: ${totalVideos}).`);
assert(totalPDFs === 33, `Total de 33 arquivos PDF catalogados (obtido: ${totalPDFs}).`);
assert(fragmentosExcluidos === 0, 'Nenhum fragmento .part-Frag habilitado como utilizável ou link de estudo.');

// -------------------------------------------------------------
// TESTE 2: Unidades do Plano de Estudo (12 unidades)
// -------------------------------------------------------------
console.log('\n[TESTE 2] Unidades do Plano de Estudo (48 Semanas):');
assert(CURSO_DADOS.planoEstudo && CURSO_DADOS.planoEstudo.unidades && CURSO_DADOS.planoEstudo.unidades.length === 12, 
  'Exatamente 12 unidades na rota de 48 semanas.');

const uDisponiveis = CURSO_DADOS.planoEstudo.unidades.filter(u => u.status === 'disponivel');
const uPlanejadas = CURSO_DADOS.planoEstudo.unidades.filter(u => u.status === 'planejada');

assert(uDisponiveis.length === 3, `Exatamente 3 unidades disponíveis (U1, U2, U3) (obtido: ${uDisponiveis.length}).`);
assert(uPlanejadas.length === 9, `Exatamente 9 unidades planejadas (U4 a U12) (obtido: ${uPlanejadas.length}).`);

uPlanejadas.forEach(up => {
  assert(up.objetivo && up.prerequisito && up.baseTriade && up.entregaPrevista, 
    `Unidade planejada ${up.id} possui objetivo, pré-requisito, base de acervo e entrega prevista sem aulas fictícias.`);
});

// -------------------------------------------------------------
// TESTE 3: Sessões de Estudo (48 sessões de 40 min, blocos contínuos)
// -------------------------------------------------------------
console.log('\n[TESTE 3] Sessões de Estudo (48 sessões de 40 min com blocos contínuos):');
assert(CURSO_DADOS.planoEstudo.sessoes && CURSO_DADOS.planoEstudo.sessoes.length === 48, 
  `Exatamente 48 sessões detalhadas (obtido: ${CURSO_DADOS.planoEstudo.sessoes.length}).`);

let sessoesComErroTempo = 0;
let sessoesComErroContinuidadeBlocos = 0;
let sessoesSemInstrucao = 0;
let sessoesSemCriterio = 0;

CURSO_DADOS.planoEstudo.sessoes.forEach(s => {
  const somaMinutos = s.blocos.reduce((acc, b) => acc + (b.duracaoMin || 0), 0);
  if (somaMinutos !== 40) {
    sessoesComErroTempo++;
    console.error(`  Erro de tempo na sessão ${s.id}: soma = ${somaMinutos} min.`);
  }

  // Verificar continuidade dos intervalos (ex: 0-5, 5-15, 15-28, 28-36, 36-40)
  let tempoAtual = 0;
  s.blocos.forEach(b => {
    const match = (b.intervalo || '').match(/(\d+)\s*[-–]\s*(\d+)/);
    if (match) {
      const inicio = parseInt(match[1], 10);
      const fim = parseInt(match[2], 10);
      if (inicio !== tempoAtual || fim !== (tempoAtual + b.duracaoMin)) {
        sessoesComErroContinuidadeBlocos++;
      }
      tempoAtual = fim;
    }
  });
  if (tempoAtual !== 40) {
    sessoesComErroContinuidadeBlocos++;
  }

  if (!s.instrucao || s.instrucao.trim().length === 0) sessoesSemInstrucao++;
  if (!s.criterioSaida || s.criterioSaida.trim().length === 0) sessoesSemCriterio++;
});

assert(sessoesComErroTempo === 0, 'Todas as 48 sessões somam rigorosamente 40 minutos.');
assert(sessoesComErroContinuidadeBlocos === 0, 'Todos os blocos possuem intervalos temporais estritamente contínuos de 0 a 40 min.');
assert(sessoesSemInstrucao === 0, 'Todas as 48 sessões possuem instruções detalhadas.');
assert(sessoesSemCriterio === 0, 'Todas as 48 sessões possuem critérios de saída explícitos.');

// -------------------------------------------------------------
// TESTE 4: Exercícios e Correspondência com EVENTOS.json
// -------------------------------------------------------------
console.log('\n[TESTE 4] Exercícios, Compassos e Correspondência Musical:');
assert(CURSO_DADOS.exercicios && CURSO_DADOS.exercicios.length === 16, `Exatamente 16 exercícios catalogados (obtido: ${CURSO_DADOS.exercicios.length}).`);

const ex4Obj = CURSO_DADOS.exercicios.find(e => e.id === 'ex4');
assert(ex4Obj && ex4Obj.totalCompassos === 4, `Ex. 4 possui exatamente 4 compassos derivados de EVENTOS.json (obtido: ${ex4Obj ? ex4Obj.totalCompassos : 'nulo'}).`);

if (EVENTOS_LOTE3 && EVENTOS_LOTE3.exercicios) {
  let compassosBatem = 0;
  ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6'].forEach(id => {
    const exNoConteudo = CURSO_DADOS.exercicios.find(e => e.id === id);
    const exNoJson = Array.isArray(EVENTOS_LOTE3.exercicios)
      ? EVENTOS_LOTE3.exercicios.find(e => e.id === id)
      : EVENTOS_LOTE3.exercicios[id];
    if (exNoConteudo && exNoJson && exNoConteudo.totalCompassos === exNoJson.total_compassos) {
      compassosBatem++;
    }
  });
  assert(compassosBatem === 6, 'Total de compassos dos exercícios 1 a 6 corresponde com precisão estrita a EVENTOS.json do Lote 3.');
}

const ex6s = CURSO_DADOS.exercicios.find(e => e.id === 'ex6-s');
assert(ex6s && ex6s.statusEntrega === 'parcial_preparatoria', 'Exercício 6-S identificado como parcial_preparatoria.');

let exComNotasPedagogicas = 0;
CURSO_DADOS.exercicios.forEach(ex => {
  if (ex.notasPedagogicas && typeof ex.notasPedagogicas === 'object') {
    exComNotasPedagogicas++;
  }
});
assert(exComNotasPedagogicas >= 12, `Exercícios das Unidades 1, 2 e 3 possuem notas pedagógicas detalhadas (obtido: ${exComNotasPedagogicas}).`);

// -------------------------------------------------------------
// TESTE 5: Módulo Compartilhado de Negócio (CursoRegras)
// -------------------------------------------------------------
console.log('\n[TESTE 5] Testes do Módulo Compartilhado CursoRegras:');

// 5.1 Validação de Backup
console.log('  -> 5.1: CursoRegras.validarBackup:');
const backupCorreto = {
  versao_backup: 1,
  data_exportacao: '2026-09-13T12:00:00.000Z',
  curso: 'Curso de Violão — Método Tríade',
  dados: {
    progresso: {
      versao: 1,
      ultimaSessaoId: 'sess-1a',
      sessoesPraticadas: [
        { id: 'log-1', data: '2026-09-14', sessaoId: 'sess-1a', minutos: 40, bpm: 52, trecho: 'c.1-4', melhoria: 'Fluidez', dificuldade: 'Polegar', proximaAcao: 'Ligar metrônomo' }
      ],
      avaliacoes: [
        { id: 'eval-1', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 }, audioRef: '', observacoes: '' }
      ]
    },
    catalogoAssistidos: ['aula-01-01'],
    catalogoPraticados: ['aula-01-01']
  }
};

const vOk = CursoRegras.validarBackup(backupCorreto);
assert(vOk.valido === true, 'Backup válido com versao_backup: 1 é aprovado.');
assert(vOk.versao_backup === 1, 'Versão do backup identificada como 1.');

// Rejeição de versao_backup inválida
assert(CursoRegras.validarBackup({ versao_backup: 2, dados: {} }).valido === false, 'versao_backup: 2 é rejeitada.');
assert(CursoRegras.validarBackup({ versao_backup: '1', dados: {} }).valido === false, 'versao_backup string "1" é rejeitada (deve ser número inteiro 1).');
assert(CursoRegras.validarBackup(null).valido === false, 'Objeto nulo é rejeitado.');

// Rejeição de entradas corrompidas (nulls em arrays)
const backupComNulls = JSON.parse(JSON.stringify(backupCorreto));
backupComNulls.dados.progresso.sessoesPraticadas.push(null);
assert(CursoRegras.validarBackup(backupComNulls).valido === false, 'Entrada nula em sessoesPraticadas é rejeitada.');

// Rejeição de notas fora da faixa 0-3 ou não inteiras
const backupNotaInvalida = JSON.parse(JSON.stringify(backupCorreto));
backupNotaInvalida.dados.progresso.avaliacoes[0].scores.clareza = 4;
assert(CursoRegras.validarBackup(backupNotaInvalida).valido === false, 'Nota de rubrica 4 (fora da faixa 0-3) é rejeitada.');

backupNotaInvalida.dados.progresso.avaliacoes[0].scores.clareza = 2.5;
assert(CursoRegras.validarBackup(backupNotaInvalida).valido === false, 'Nota de rubrica decimal 2.5 é rejeitada.');

// Rejeição de IDs desconhecidos
const backupIdDesconhecido = JSON.parse(JSON.stringify(backupCorreto));
backupIdDesconhecido.dados.progresso.avaliacoes[0].unidadeId = 'u99';
assert(CursoRegras.validarBackup(backupIdDesconhecido).valido === false, 'unidadeId inexistente ("u99") é rejeitada.');

// Rejeição de data inválida
const backupDataInvalida = JSON.parse(JSON.stringify(backupCorreto));
backupDataInvalida.dados.progresso.avaliacoes[0].data = 'data-invalida-123';
assert(CursoRegras.validarBackup(backupDataInvalida).valido === false, 'Data em formato não-ISO é rejeitada.');

// 5.2 CursoRegras.mesclarEstado
console.log('  -> 5.2: CursoRegras.mesclarEstado:');
const estadoAtual = {
  progresso: {
    versao: 1,
    ultimaSessaoId: 'sess-1a',
    sessoesPraticadas: [
      { id: 'sess-local-1', data: '2026-09-10', sessaoId: 'sess-1a', minutos: 40, bpm: 50, trecho: 'LOCAL' }
    ],
    avaliacoes: [
      { id: 'eval-local-1', data: '2026-09-10', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } }
    ]
  },
  catalogoAssistidos: ['aula-01-01'],
  catalogoPraticados: ['aula-01-01']
};

const dadosImportacao = {
  progresso: {
    sessoesPraticadas: [
      // Conflito de ID com o local: o local deve ser PRESERVADO
      { id: 'sess-local-1', data: '2026-09-10', sessaoId: 'sess-1a', minutos: 40, bpm: 99, trecho: 'IMPORTADO_CONFLITO' },
      // Nova sessão com mesma data mas ID diferente: NÃO deve ser deduplicada por data
      { id: 'sess-nova-2', data: '2026-09-10', sessaoId: 'sess-1b', minutos: 40, bpm: 52, trecho: 'NOVA_MESMA_DATA' },
      // Duplicata interna no próprio arquivo de importação
      { id: 'sess-duplicada-interna', data: '2026-09-11', sessaoId: 'sess-1c', minutos: 40, bpm: 54, trecho: 'DUPLICATA_1' },
      { id: 'sess-duplicada-interna', data: '2026-09-11', sessaoId: 'sess-1c', minutos: 40, bpm: 54, trecho: 'DUPLICATA_2' }
    ],
    avaliacoes: [
      { id: 'eval-nova-2', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } }
    ]
  },
  catalogoAssistidos: ['aula-01-01', 'aula-01-02'],
  catalogoPraticados: ['aula-01-03']
};

const resMerge = CursoRegras.mesclarEstado(estadoAtual, dadosImportacao);

const sessPreservada = resMerge.novoEstado.progresso.sessoesPraticadas.find(s => s.id === 'sess-local-1');
assert(sessPreservada && sessPreservada.trecho === 'LOCAL', 'No conflito de ID, o registro local foi preservado.');

const sessoesMesmaData = resMerge.novoEstado.progresso.sessoesPraticadas.filter(s => s.data === '2026-09-10');
assert(sessoesMesmaData.length === 2, 'Sessões em mesma data mas com IDs distintos NÃO foram indevidamente deduplicadas.');

const duplicadasInternas = resMerge.novoEstado.progresso.sessoesPraticadas.filter(s => s.id === 'sess-duplicada-interna');
assert(duplicadasInternas.length === 1, 'Duplicatas com mesmo ID dentro do arquivo de importação foram deduplicadas.');

assert(resMerge.sessoesAdicionadas === 2, 'Número correto de novas sessões adicionadas (2).');
assert(resMerge.avaliacoesAdicionadas === 1, 'Número correto de novas avaliações adicionadas (1).');
assert(resMerge.novoEstado.catalogoAssistidos.includes('aula-01-02'), 'Catálogo assistido mesclado com sucesso.');
assert(resMerge.novoEstado.catalogoPraticados.includes('aula-01-03'), 'Catálogo praticado mesclado com sucesso.');

// 5.3 CursoRegras.substituirEstado
console.log('  -> 5.3: CursoRegras.substituirEstado:');
const estadoSubstituido = CursoRegras.substituirEstado(dadosImportacao);
assert(estadoSubstituido.progresso.sessoesPraticadas.length === 3, 'Substituição resultou nas 3 sessões únicas do backup.');
assert(!estadoSubstituido.progresso.sessoesPraticadas.some(s => s.trecho === 'LOCAL'), 'Dados locais prévios foram inteiramente substituídos.');

// 5.4 CursoRegras.avaliarAvanco
console.log('  -> 5.4: CursoRegras.avaliarAvanco:');

// U1 com duas tomadas em mesma data
const evalsMesmoDia = [
  { id: '1', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } },
  { id: '2', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } }
];
const avMesmoDia = CursoRegras.avaliarAvanco(evalsMesmoDia, 'u1');
assert(avMesmoDia.aprovado === false, 'Duas avaliações no mesmo dia NÃO aprovam avanço.');
assert(avMesmoDia.mesmaDataApenas === true, 'Flag mesmaDataApenas acionada corretamente.');

// U1 com duas tomadas em datas distintas
const evalsDatasDistintas = [
  { id: '1', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } },
  { id: '2', data: '2026-09-18', unidadeId: 'u1', versao: 'u1-estudo', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } }
];
const avDatasDistintas = CursoRegras.avaliarAvanco(evalsDatasDistintas, 'u1');
assert(avDatasDistintas.aprovado === true, 'Duas avaliações em datas distintas com notas >= 2 aprovam avanço na U1.');

// U3 com versão parcial ex6-s (não deve aprovar)
const evalsEx6s = [
  { id: '1', data: '2026-09-15', unidadeId: 'u3', versao: 'ex6-s', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } },
  { id: '2', data: '2026-09-18', unidadeId: 'u3', versao: 'ex6-s', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } }
];
const avEx6s = CursoRegras.avaliarAvanco(evalsEx6s, 'u3');
assert(avEx6s.aprovado === false, 'Versão simplificada ex6-s (4 compassos) NÃO certifica avanço na U3.');
assert(avEx6s.temParcialApenas === true, 'Flag temParcialApenas acionada para ex6-s.');

// U2 oficial com e sem confirmação de 16 compassos (8 com repetição AABB)
const evalsU2SemConfirmacao = [
  { id: '1', data: '2026-09-15', unidadeId: 'u2', versao: 'ex3', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 }, execucaoIntegralConfirmada: false },
  { id: '2', data: '2026-09-18', unidadeId: 'u2', versao: 'ex3', scores: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 }, execucaoIntegralConfirmada: false }
];
const avU2Sem = CursoRegras.avaliarAvanco(evalsU2SemConfirmacao, 'u2');
assert(avU2Sem.aprovado === false, 'U2 sem confirmação de execução de 16 compassos NÃO aprova avanço.');
assert(avU2Sem.pendenteExecucaoIntegralU2 === true, 'Flag pendenteExecucaoIntegralU2 ativada.');

const evalsU2ComConfirmacao = [
  { id: '1', data: '2026-09-15', unidadeId: 'u2', versao: 'ex3', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 }, execucaoIntegralConfirmada: true },
  { id: '2', data: '2026-09-18', unidadeId: 'u2', versao: 'ex3', scores: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 }, execucaoIntegralConfirmada: true }
];
const avU2Com = CursoRegras.avaliarAvanco(evalsU2ComConfirmacao, 'u2');
assert(avU2Com.aprovado === true, 'U2 com execução de 16 compassos confirmada e 2 datas distintas aprova avanço com sucesso.');

// 5.5 CursoRegras.parseLinksSeguros e escapeHTML
console.log('  -> 5.5: CursoRegras.parseLinksSeguros & escapeHTML:');
const textoComLink = 'Estudo no Drive: https://drive.google.com/file/d/12345/view e material anexo.';
const parsedLinks = CursoRegras.parseLinksSeguros(textoComLink);
assert(parsedLinks.length === 3, 'Texto com link gerou 3 fragmentos (texto, link, texto).');
assert(parsedLinks[1].tipo === 'link' && parsedLinks[1].url.startsWith('https://drive.google.com/'), 'Link do Drive extraído com segurança.');

const textoMalicioso = '<script>alert("XSS")</script><img src="x" onerror="alert(1)">';
const parsedMalicioso = CursoRegras.parseLinksSeguros(textoMalicioso);
assert(parsedMalicioso.length === 1 && parsedMalicioso[0].tipo === 'texto', 'Texto sem links gerou nó de texto puro.');
assert(CursoRegras.escapeHTML(textoMalicioso).includes('&lt;script&gt;'), 'escapeHTML converte tags em entidades seguras.');

// -------------------------------------------------------------
// RESUMO FINAL
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL DE TESTES EXECUTADOS: ${sucessos + falhas}`);
console.log(`SUCESSOS: ${sucessos} | FALHAS: ${falhas}`);
console.log('================================================================');

if (falhas > 0) {
  console.error('\nCONCLUÍDO COM FALHAS.');
  process.exit(1);
} else {
  console.log('\nTODOS OS TESTES FORAM APROVADOS COM SUCESSO (0 FALHAS).');
  process.exit(0);
}
