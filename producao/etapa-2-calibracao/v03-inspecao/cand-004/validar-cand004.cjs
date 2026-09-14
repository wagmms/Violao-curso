/**
 * Validador Automatizado do Candidato cand-004 (v03-inspecao)
 * Executa checagem de integridade lógica, equivalência matemática,
 * vínculos curriculares com Etapa 1 v03 e coerência física dos recursos.
 */
const fs = require('fs');
const path = require('path');

const candDir = __dirname;
const etapa1Dir = path.resolve(candDir, '..', '..', '..', 'etapa-1-curriculo', 'v03');

console.log('=== VALIDAÇÃO AUTOMATIZADA: cand-004 (v03-inspecao) ===\n');
let errors = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error('[ERRO] ' + msg);
    errors++;
  } else {
    console.log('[OK] ' + msg);
  }
}

// 1. Validar EVENTOS.json
const eventosPath = path.join(candDir, 'EVENTOS.json');
assert(fs.existsSync(eventosPath), 'EVENTOS.json existe no diretório');
const eventosData = JSON.parse(fs.readFileSync(eventosPath, 'utf8'));

assert(eventosData.candidatoId === 'cand-004', 'candidatoId é cand-004');
assert(eventosData.aulaPropostaId === 'aula-prop-017', 'aulaPropostaId é aula-prop-017');
assert(eventosData.moduloPedagogicoId === 'mod-ped-05', 'moduloPedagogicoId é mod-ped-05');
assert(eventosData.habilidadePrincipalId === 'hab-lei-003', 'habilidadePrincipalId é hab-lei-003');
assert(eventosData.totalEventos === 14, 'Total de eventos declarado é 14');
assert(eventosData.totalCompassos === 4, 'Total de compassos declarado é 4');
assert(eventosData.totalTemposSeminima === 16, 'Total de tempos de semínima declarado é 16');
assert(Array.isArray(eventosData.eventos) && eventosData.eventos.length === 14, 'Array de eventos contém exatamente 14 itens');

// Validação dos compassos e aritmética rítmica
const compassosTempos = { 1: 0, 2: 0, 3: 0, 4: 0 };
let tempoAcumulado = 0;

const guitarPhysicalMap = {
  'C3': { corda: 5, casa: 3, midi: 48 },
  'D3': { corda: 4, casa: 0, midi: 50 },
  'E3': { corda: 4, casa: 2, midi: 52 },
  'F3': { corda: 4, casa: 3, midi: 53 },
  'G3': { corda: 3, casa: 0, midi: 55 },
  'A3': { corda: 3, casa: 2, midi: 57 }
};

eventosData.eventos.forEach((ev, idx) => {
  const num = idx + 1;
  // Aritmética
  compassosTempos[ev.compassoAutoral] += ev.duracaoTempos;
  tempoAcumulado += ev.duracaoTempos;

  // Transposição de oitava (violão: som real 1 oitava abaixo da escrita)
  assert(ev.midiSonoro === ev.midiEscrito - 12, `Evento ${ev.id}: MIDI sonoro (${ev.midiSonoro}) = MIDI escrito (${ev.midiEscrito}) - 12`);

  // Física do violão
  const phys = guitarPhysicalMap[ev.notaSonora];
  assert(phys && phys.corda === ev.corda && phys.casa === ev.casa && phys.midi === ev.midiSonoro,
    `Evento ${ev.id}: Nota ${ev.notaSonora} mapeada corretamente para corda ${ev.corda}, casa ${ev.casa}, MIDI ${ev.midiSonoro}`);

  // Autoria
  assert(ev.autoria === 'adaptacao_autoral_antigravity', `Evento ${ev.id}: Autoria identificada como adaptacao_autoral_antigravity`);
});

assert(compassosTempos[1] === 4.0, 'Compasso 1 soma exatamente 4 tempos (4/4)');
assert(compassosTempos[2] === 4.0, 'Compasso 2 soma exatamente 4 tempos (4/4)');
assert(compassosTempos[3] === 4.0, 'Compasso 3 soma exatamente 4 tempos (4/4)');
assert(compassosTempos[4] === 4.0, 'Compasso 4 soma exatamente 4 tempos (4/4)');
assert(tempoAcumulado === 16.0, 'Soma total de todos os eventos é rigorosamente 16 tempos');

// 2. Validar Vínculos com Etapa 1 v03
console.log('\n--- CONFERÊNCIA REFERENCIAL CONTRA ETAPA 1 (v03) ---');
const propPath = path.join(etapa1Dir, 'AULAS-PROPOSTAS.json');
assert(fs.existsSync(propPath), 'AULAS-PROPOSTAS.json da Etapa 1 v03 existe');
const propData = JSON.parse(fs.readFileSync(propPath, 'utf8'));
const aula17 = (propData.aulasPropostas || propData).find(a => a.id === 'aula-prop-017');
assert(!!aula17, 'aula-prop-017 existe em AULAS-PROPOSTAS.json');
assert(aula17 && aula17.moduloPedagogicoId === 'mod-ped-05', 'aula-prop-017 pertence ao módulo mod-ped-05');
assert(aula17 && aula17.habilidadePrincipalId === 'hab-lei-003', 'aula-prop-017 tem habilidade principal hab-lei-003');

const habPath = path.join(etapa1Dir, 'MAPA-HABILIDADES.json');
assert(fs.existsSync(habPath), 'MAPA-HABILIDADES.json da Etapa 1 v03 existe');
const habData = JSON.parse(fs.readFileSync(habPath, 'utf8'));
const hab3 = (habData.habilidades || habData).find(h => h.id === 'hab-lei-003');
assert(!!hab3, 'hab-lei-003 existe em MAPA-HABILIDADES.json');

const matrizPath = path.join(etapa1Dir, 'MATRIZ-FONTE-AULA.csv');
assert(fs.existsSync(matrizPath), 'MATRIZ-FONTE-AULA.csv da Etapa 1 v03 existe');
const matrizContent = fs.readFileSync(matrizPath, 'utf8');
assert(matrizContent.includes('aula-kaiser-124-3-partituras-faceis-para-iniciantes') && matrizContent.includes('aula-prop-017') && matrizContent.includes('hab-lei-003'),
  'MATRIZ-FONTE-AULA.csv mapeia aula-kaiser-124 -> aula-prop-017 -> hab-lei-003');

// 3. Validar Presença e Integridade dos Recursos Produzidos
console.log('\n--- VERIFICAÇÃO DE RECURSOS E ARTEFATOS ENTREGUES ---');
const requiredFiles = [
  'DOSSIE-FONTES.md',
  'REVISAO-MUSICAL.md',
  'EVIDENCIAS.csv',
  'RECURSOS.json',
  'PLANO-AULA.md',
  'RESPOSTA-PARECER.md',
  'EVENTOS.json',
  'pauta-adaptada.png',
  'pauta-adaptada.pdf',
  'pauta-adaptada.svg',
  'pauta-adaptada.musicxml',
  'pauta-adaptada.ly',
  'referencia-audio-sintese.wav'
];

requiredFiles.forEach(rf => {
  const p = path.join(candDir, rf);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 0, `Recurso ${rf} presente e não vazio (${size} bytes)`);
});

console.log('\n=================================================');
if (errors === 0) {
  console.log('RESULTADO: VALIDAÇÃO APROVADA COM ZERO ERROS!');
  process.exit(0);
} else {
  console.error(`RESULTADO: VALIDAÇÃO FALHOU COM ${errors} ERROS.`);
  process.exit(1);
}
