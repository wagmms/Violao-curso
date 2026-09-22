const { performance } = require('perf_hooks');

const N = 5000;
const M = 5000;

const state = {
  tentativas: Array.from({ length: N }, (_, i) => ({ id: `tentativa_${i}` })),
  dificuldades: Array.from({ length: N }, (_, i) => ({ id: `dif_${i}` })),
  revisoes: Array.from({ length: N }, (_, i) => ({ id: `rev_${i}` }))
};

const d = {
  tentativas: Array.from({ length: M }, (_, i) => ({ id: `tentativa_${i + 2500}` })),
  dificuldades: Array.from({ length: M }, (_, i) => ({ id: `dif_${i + 2500}` })),
  revisoes: Array.from({ length: M }, (_, i) => ({ id: `rev_${i + 2500}` }))
};

function processarResumoOriginal(state, d) {
  const novasTentativas = d.tentativas.filter(x => !state.tentativas.find(t => t.id === x.id)).length;
  const novasDifs = d.dificuldades.filter(x => !state.dificuldades.find(t => t.id === x.id)).length;
  const novasRevs = d.revisoes.filter(x => !state.revisoes.find(t => t.id === x.id)).length;
  return { novasTentativas, novasDifs, novasRevs };
}

function processarResumoOtimizado(state, d) {
  const idsTentativasLocais = new Set(state.tentativas.map(t => t.id));
  const idsDifsLocais = new Set(state.dificuldades.map(t => t.id));
  const idsRevsLocais = new Set(state.revisoes.map(r => r.id));

  const novasTentativas = d.tentativas.filter(x => !idsTentativasLocais.has(x.id)).length;
  const novasDifs = d.dificuldades.filter(x => !idsDifsLocais.has(x.id)).length;
  const novasRevs = d.revisoes.filter(x => !idsRevsLocais.has(x.id)).length;
  return { novasTentativas, novasDifs, novasRevs };
}

// Warmup
processarResumoOriginal(state, d);
processarResumoOtimizado(state, d);

const iterations = 5;

const startOriginal = performance.now();
for (let i = 0; i < iterations; i++) {
  processarResumoOriginal(state, d);
}
const endOriginal = performance.now();
const timeOriginal = (endOriginal - startOriginal) / iterations;

const startOptimized = performance.now();
for (let i = 0; i < iterations; i++) {
  processarResumoOtimizado(state, d);
}
const endOptimized = performance.now();
const timeOptimized = (endOptimized - startOptimized) / iterations;

console.log(`Original average time per run: ${timeOriginal.toFixed(2)} ms`);
console.log(`Optimized average time per run: ${timeOptimized.toFixed(2)} ms`);
console.log(`Speedup: ${(timeOriginal / timeOptimized).toFixed(1)}x faster`);
