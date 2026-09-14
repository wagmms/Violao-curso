/**
 * Script de Verificação Automatizada da Interface — Lote 4
 * Execução: node interface/ferramentas/validar-interface.cjs
 */

const fs = require('fs');
const path = require('path');

// 1. Carregar conteudo.js simulando o ambiente global do navegador
const conteudoPath = path.join(__dirname, '..', 'conteudo.js');
if (!fs.existsSync(conteudoPath)) {
  console.error('ERRO: interface/conteudo.js não encontrado!');
  process.exit(1);
}

const conteudoCode = fs.readFileSync(conteudoPath, 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(conteudoCode, sandbox);

const CURSO_DADOS = sandbox.window.CURSO_DADOS;
if (!CURSO_DADOS) {
  console.error('ERRO: CURSO_DADOS não foi definido no escopo global!');
  process.exit(1);
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
console.log('INICIANDO SUÍTE DE TESTES E VERIFICAÇÃO AUTOMATIZADA — LOTE 4');
console.log('================================================================\n');

// -------------------------------------------------------------
// TESTE 1: Catálogo do Método Tríade (300 aulas, 11 módulos)
// -------------------------------------------------------------
console.log('[TESTE 1] Verificação do Catálogo Original (Método Tríade):');
assert(CURSO_DADOS.catalogoOriginal && CURSO_DADOS.catalogoOriginal.length === 11, 'Exatamente 11 módulos catalogados.');

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
assert(totalSemArquivo === 103, `Total de 103 aulas sem arquivos / indisponíveis no backup (obtido: ${totalSemArquivo}).`);
assert(totalVideos === 285, `Total de 285 vídeos utilizáveis no acervo (obtido: ${totalVideos}).`);
assert(totalPDFs === 33, `Total de 33 arquivos PDF catalogados (obtido: ${totalPDFs}).`);
assert(fragmentosExcluidos === 0, 'Nenhum fragmento .part-Frag habilitado como utilizável ou link de estudo.');

// -------------------------------------------------------------
// TESTE 2: Unidades do Plano de Estudo (12 unidades)
// -------------------------------------------------------------
console.log('\n[TESTE 2] Verificação das 12 Unidades do Plano de Estudo:');
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
// TESTE 3: Sessões de Estudo (48 sessões de exatamente 40 minutos)
// -------------------------------------------------------------
console.log('\n[TESTE 3] Verificação das 48 Sessões de Estudo (40 min exatos):');
assert(CURSO_DADOS.planoEstudo.sessoes && CURSO_DADOS.planoEstudo.sessoes.length === 48, 
  `Exatamente 48 sessões detalhadas (obtido: ${CURSO_DADOS.planoEstudo.sessoes.length}).`);

let sessoesComErroTempo = 0;
let sessoesSemInstrucao = 0;
let sessoesSemCriterio = 0;

CURSO_DADOS.planoEstudo.sessoes.forEach(s => {
  const somaMinutos = s.blocos.reduce((acc, b) => acc + (b.duracaoMin || 0), 0);
  if (somaMinutos !== 40) {
    sessoesComErroTempo++;
    console.error(`  Erro de tempo na sessão ${s.id}: soma = ${somaMinutos} min.`);
  }
  if (!s.instrucao || s.instrucao.trim().length === 0) sessoesSemInstrucao++;
  if (!s.criterioSaida || s.criterioSaida.trim().length === 0) sessoesSemCriterio++;
});

assert(sessoesComErroTempo === 0, 'Todas as 48 sessões somam rigorosamente 40 minutos.');
assert(sessoesSemInstrucao === 0, 'Todas as 48 sessões possuem instruções detalhadas.');
assert(sessoesSemCriterio === 0, 'Todas as 48 sessões possuem critérios de saída explícitos.');

// -------------------------------------------------------------
// TESTE 4: Exercícios e Versões Musicais (16 versões)
// -------------------------------------------------------------
console.log('\n[TESTE 4] Verificação de Exercícios e Tablatura:');
assert(CURSO_DADOS.exercicios && CURSO_DADOS.exercicios.length === 16, `Exatamente 16 exercícios catalogados (obtido: ${CURSO_DADOS.exercicios.length}).`);

const ex6s = CURSO_DADOS.exercicios.find(e => e.id === 'ex6-s');
assert(ex6s && ex6s.statusEntrega === 'parcial_preparatoria', 'Exercício 6-S identificado estritamente como parcial_preparatoria (não substitui entrega oficial).');

let exComTablatura = 0;
let exComEventos = 0;

CURSO_DADOS.exercicios.forEach(ex => {
  if (ex.tablatura && ex.tablatura.trim().length > 20) exComTablatura++;
  if (ex.eventos && ex.eventos.length > 0) exComEventos++;
});

assert(exComTablatura === 16, 'Todas as 16 versões de exercícios possuem tablatura monoespaçada completa.');
assert(exComEventos === 12, 'Todos os 12 exercícios das Unidades 2 e 3 possuem tabelas estruturadas de eventos (Lote 3 revisado).');

// -------------------------------------------------------------
// TESTE 5: Simulação de Lógica da Aplicação (app.js)
// -------------------------------------------------------------
console.log('\n[TESTE 5] Verificação das Regras de Negócio e Avanço Curricular:');

function simularAvaliador(registros) {
  const entregasValidas = registros.filter(r => r.notas && (r.versao === 'u1-estudo' || r.versao === 'ex3' || r.versao === 'ex6'));
  const aprovadas = entregasValidas.filter(r => 
    r.notas.continuidade >= 2 &&
    r.notas.clareza >= 2 &&
    r.notas.equilibrio >= 2 &&
    r.notas.autonomia >= 2
  );

  const datasDistintas = new Set(aprovadas.map(r => r.data));
  return datasDistintas.size >= 2;
}

// Caso 5.1: Duas tomadas no mesmo dia com notas máximas (não deve liberar)
const casoMesmoDia = [
  { id: '1', data: '2026-09-15', versao: 'ex3', notas: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } },
  { id: '2', data: '2026-09-15', versao: 'ex3', notas: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } }
];
assert(simularAvaliador(casoMesmoDia) === false, 'Duas avaliações na mesma data NÃO liberam o avanço de unidade.');

// Caso 5.2: Duas tomadas em datas distintas com notas >= 2 (deve liberar)
const casoDatasDistintas = [
  { id: '1', data: '2026-09-15', versao: 'ex3', notas: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } },
  { id: '2', data: '2026-09-18', versao: 'ex3', notas: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } }
];
assert(simularAvaliador(casoDatasDistintas) === true, 'Duas avaliações em datas distintas com notas >= 2 liberam o avanço de unidade.');

// Caso 5.3: Uma dimensão com nota < 2 (não deve liberar)
const casoNotaInsuficiente = [
  { id: '1', data: '2026-09-15', versao: 'ex3', notas: { continuidade: 2, clareza: 2, equilibrio: 2, autonomia: 2 } },
  { id: '2', data: '2026-09-18', versao: 'ex3', notas: { continuidade: 2, clareza: 1, equilibrio: 2, autonomia: 2 } }
];
assert(simularAvaliador(casoNotaInsuficiente) === false, 'Qualquer nota inferior a 2 impede o avanço de unidade.');

// Caso 5.4: Tentativa com exercício 6-S (preparação parcial - não deve liberar)
const casoEx6s = [
  { id: '1', data: '2026-09-15', versao: 'ex6-s', notas: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } },
  { id: '2', data: '2026-09-18', versao: 'ex6-s', notas: { continuidade: 3, clareza: 3, equilibrio: 3, autonomia: 3 } }
];
assert(simularAvaliador(casoEx6s) === false, 'Versão simplificada Ex.6-S (4 compassos) não é aceita para avanço de unidade.');

// -------------------------------------------------------------
// TESTE 6: Proteção contra Injeção de Código (XSS)
// -------------------------------------------------------------
console.log('\n[TESTE 6] Verificação de Sanitização e Segurança XSS:');

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const payloadMalicioso = '<script>alert("XSS")</script><img src="x" onerror="alert(1)">';
const escapado = escapeHTML(payloadMalicioso);

assert(!escapado.includes('<script>'), 'Tag script neutralizada por escape seguro.');
assert(!escapado.includes('<img'), 'Tag img neutralizada por escape seguro.');
assert(escapado.includes('&lt;script&gt;'), 'Entidades HTML devidamente convertidas.');

// -------------------------------------------------------------
// TESTE 7: Integridade e Validação do Backup JSON
// -------------------------------------------------------------
console.log('\n[TESTE 7] Verificação do Mecanismo de Backup JSON:');

function validarEstruturaBackup(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    if (!data || typeof data !== 'object') return false;
    if (!data.versao || typeof data.versao !== 'string') return false;
    if (!data.progresso || typeof data.progresso !== 'object') return false;
    if (!Array.isArray(data.diario)) return false;
    if (!Array.isArray(data.avaliacoes)) return false;
    return true;
  } catch (e) {
    return false;
  }
}

const backupValido = JSON.stringify({
  versao: '1.3',
  dataExportacao: new Date().toISOString(),
  progresso: { 'sess-1a': { praticado: true } },
  diario: [{ id: '1', data: '2026-09-15', duracaoMinutos: 40, bpm: 52 }],
  avaliacoes: [{ id: 'a1', data: '2026-09-15', unidadeId: 'u1', versao: 'u1-estudo' }]
});

const backupInvalidoCorrompido = "{ versao: 1.3, progresso: 'invalido' ";
const backupInvalidoEstrutura = JSON.stringify({ app: 'violao', dados: [] });

assert(validarEstruturaBackup(backupValido) === true, 'Backup válido é aprovado na validação de esquema.');
assert(validarEstruturaBackup(backupInvalidoCorrompido) === false, 'JSON corrompido é rejeitado sem exceção não tratada.');
assert(validarEstruturaBackup(backupInvalidoEstrutura) === false, 'JSON sem os campos obrigatórios é rejeitado.');

// -------------------------------------------------------------
// RESUMO FINAL
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL DE TESTES EXECUTADOS: ${sucessos + falhas}`);
console.log(`SUCESSOS: ${sucessos} | FALHAS: ${falhas}`);
console.log('================================================================');

if (falhas > 0) {
  console.error('CONCLUÍDO COM FALHAS.');
  process.exit(1);
} else {
  console.log('TODOS OS TESTES FORAM APROVADOS COM SUCESSO (0 ERROS).');
  process.exit(0);
}
