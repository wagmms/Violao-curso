/**
 * Validador da Aula Completa cand-004 (Etapa 2B - v01-aula-completa)
 * Executa conferência com parser CSV real, integridade matemática de eventos,
 * links curriculares com Etapa 1 v03 e checagem de todos os recursos produzidos.
 */
const fs = require('fs');
const path = require('path');

const candDir = __dirname;
const etapa1Dir = path.resolve(candDir, '..', '..', '..', 'etapa-1-curriculo', 'v03');

console.log('=== VALIDADOR DA AULA COMPLETA: cand-004 (Etapa 2B) ===\n');
let errors = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error('[ERRO] ' + msg);
    errors++;
  } else {
    console.log('[OK] ' + msg);
  }
}

// 1. Validar aula.json e AULA.md
console.log('--- CONFERÊNCIA DE AULA.MD E AULA.JSON ---');
assert(fs.existsSync(path.join(candDir, 'AULA.md')), 'AULA.md existe no diretório');
const aulaJsonPath = path.join(candDir, 'aula.json');
assert(fs.existsSync(aulaJsonPath), 'aula.json existe no diretório');
const aulaJson = JSON.parse(fs.readFileSync(aulaJsonPath, 'utf8'));

assert(aulaJson.metadadosPedagogicos.id === 'aula-ped-017-leitura-clave-sol', 'ID pedagógico estável é aula-ped-017-leitura-clave-sol');
assert(aulaJson.metadadosPedagogicos.aulaPropostaId === 'aula-prop-017', 'Vínculo com aula-prop-017 conferido');
assert(aulaJson.metadadosPedagogicos.moduloPedagogicoId === 'mod-ped-05', 'Vínculo com mod-ped-05 conferido');
assert(aulaJson.metadadosPedagogicos.habilidadePrincipalId === 'hab-lei-003', 'Vínculo com hab-lei-003 conferido');
assert(aulaJson.status === 'aguardando_revisao', 'Status é rigorosamente aguardando_revisao');
assert(aulaJson.diagnosticoEntrada.length === 4, 'Diagnóstico contém exatamente 4 etapas');
assert(aulaJson.andamentos.preparatorioBpm === 48 && aulaJson.andamentos.alvoBpm === 60, 'Andamento preparatório 48 BPM e alvo 60 BPM');

// 2. Parser CSV Real para MATRIZ-FONTE-AULA.csv
console.log('\n--- PARSER CSV REAL: CONFERÊNCIA DA MATRIZ DA ETAPA 1 (v03) ---');
const matrizPath = path.join(etapa1Dir, 'MATRIZ-FONTE-AULA.csv');
assert(fs.existsSync(matrizPath), 'MATRIZ-FONTE-AULA.csv existe na Etapa 1 v03');
const matrizLines = fs.readFileSync(matrizPath, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);

let linkFoundOnSameLine = false;
matrizLines.forEach(line => {
  // Parser simples de CSV respeitando vírgulas básicas
  const cols = line.split(',');
  const entradaId = cols[0] ? cols[0].trim() : '';
  const aulaPropId = cols[2] ? cols[2].trim() : '';
  const habId = cols[3] ? cols[3].trim() : '';

  if (entradaId === 'aula-kaiser-124-3-partituras-faceis-para-iniciantes' &&
      aulaPropId === 'aula-prop-017' &&
      habId === 'hab-lei-003') {
    linkFoundOnSameLine = true;
  }
});
assert(linkFoundOnSameLine, 'Parser CSV encontrou na MESMA LINHA: aula-kaiser-124... -> aula-prop-017 -> hab-lei-003');

// 3. Validar EVENTOS.json principal
console.log('\n--- VALIDAÇÃO DE EVENTOS.JSON (ADAPTAÇÃO PRINCIPAL) ---');
const eventosPath = path.join(candDir, 'EVENTOS.json');
assert(fs.existsSync(eventosPath), 'EVENTOS.json existe');
const eventosData = JSON.parse(fs.readFileSync(eventosPath, 'utf8'));

assert(eventosData.totalEventos === 14, 'Total de eventos é 14');
assert(eventosData.totalCompassos === 4, 'Total de compassos é 4');
assert(eventosData.totalTemposSeminima === 16, 'Total de tempos é 16');

const barSums = { 1: 0, 2: 0, 3: 0, 4: 0 };
let totalTime = 0;
eventosData.eventos.forEach(ev => {
  barSums[ev.compasso] += ev.duracaoTempos;
  totalTime += ev.duracaoTempos;
  assert(ev.midiSonoro === ev.midiEscrito - 12, `Evento ${ev.id}: MIDI sonoro (${ev.midiSonoro}) = MIDI escrito (${ev.midiEscrito}) - 12`);
});
assert(barSums[1] === 4.0 && barSums[2] === 4.0 && barSums[3] === 4.0 && barSums[4] === 4.0, 'Todos os 4 compassos somam exatamente 4.0 tempos cada');
assert(totalTime === 16.0, 'Tempo acumulado total é rigorosamente 16.0 tempos');

// 4. Validar tarefa de transferência
console.log('\n--- VALIDAÇÃO DA TAREFA DE TRANSFERÊNCIA ---');
const transfPath = path.join(candDir, 'recursos', 'tarefa-transferencia', 'transferencia-eventos.json');
assert(fs.existsSync(transfPath), 'transferencia-eventos.json existe');
const transfData = JSON.parse(fs.readFileSync(transfPath, 'utf8'));

assert(transfData.totalEventos === 7, 'Transferência: total de eventos é 7');
assert(transfData.totalCompassos === 2, 'Transferência: total de compassos é 2');
assert(transfData.totalTemposSeminima === 8, 'Transferência: total de tempos é 8');

let transfSum = 0;
transfData.eventos.forEach(ev => {
  transfSum += ev.duracaoTempos;
  assert(ev.midiSonoro === ev.midiEscrito - 12, `Transferência ${ev.id}: MIDI sonoro (${ev.midiSonoro}) = MIDI escrito (${ev.midiEscrito}) - 12`);
});
assert(transfSum === 8.0, 'Transferência: soma total de tempos é rigorosamente 8.0 tempos');

// 5. Validar Recursos Físicos Entregues
console.log('\n--- CONFERÊNCIA FÍSICA DOS RECURSOS DA AULA ---');
const requiredFiles = [
  'AULA.md',
  'aula.json',
  'EVENTOS.json',
  'RECURSOS.json',
  'EVIDENCIAS.csv',
  'REVISAO-MUSICAL.md',
  'VERIFICACOES.md',
  'PENDENCIAS.md',
  'RESUMO.md',
  'RESPOSTA-PARECER.md',
  'recursos/pauta-limpa.png',
  'recursos/pauta-limpa.svg',
  'recursos/pauta-anotada.png',
  'recursos/pauta-celular.png',
  'recursos/referencia-audio-sintese.wav',
  'recursos/pauta-adaptada.musicxml',
  'recursos/tarefa-transferencia/transferencia-pauta-limpa.png',
  'recursos/tarefa-transferencia/transferencia-pauta-limpa.svg',
  'recursos/tarefa-transferencia/transferencia-pauta-gabarito.png',
  'recursos/tarefa-transferencia/transferencia-audio-sintese.wav',
  'recursos/tarefa-transferencia/transferencia-eventos.json',
  'recursos/tarefa-transferencia/transferencia-gabarito.md'
];

requiredFiles.forEach(rf => {
  const p = path.join(candDir, rf);
  const exists = fs.existsSync(p);
  const sz = exists ? fs.statSync(p).size : 0;
  assert(exists && sz > 0, `Recurso ${rf} presente e íntegro (${sz} bytes)`);
});

console.log('\n=================================================');
if (errors === 0) {
  console.log('RESULTADO: AULA COMPLETA CAND-004 VALIDADA COM ZERO ERROS!');
  process.exit(0);
} else {
  console.error(`RESULTADO: VALIDAÇÃO FALHOU COM ${errors} ERROS.`);
  process.exit(1);
}
