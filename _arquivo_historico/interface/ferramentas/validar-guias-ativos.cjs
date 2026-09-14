const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const dir=path.resolve(__dirname,'..'),box={window:{}};
for(const f of ['conteudo-geral.js','guias-dados.js'])vm.runInNewContext(fs.readFileSync(path.join(dir,f),'utf8'),box);
const w=box.window,ids=w.CURSO_DADOS.catalogoOriginal.flatMap(m=>m.aulas),guides=Object.values(w.CURSO_GUIAS),counts={};
assert.equal(guides.length,128);assert.deepEqual(Array.from(w.CURSO_GUIAS_METADATA.modulos_homologados),[1,2,3]);
for(const g of guides){const a=ids.find(a=>a.id===g.id);assert(a&&a.grupo_aula===g.titulo_original,g.id);const mod=g.id.split('-')[2];counts[mod]=(counts[mod]||0)+1;for(const f of ['obj','evidencia','orcamento','pratica','dificuldade'])assert(g[f]?.trim(),g.id+' '+f);
 if(g.orcamento.includes('Dividida em 2 sessões'))assert(g.orcamento.includes('Sessão 1 (40 min)')&&g.orcamento.includes('Sessão 2 (40 min)'),g.id+' sessões truncadas');
}
assert.deepEqual(counts,{'1':46,'2':38,'3':44});
console.log('Guias ativos validados: 128 IDs/títulos, campos completos e orçamentos de aulas divididas preservados. Não executa navegador ou verifica veracidade de timestamps.');
