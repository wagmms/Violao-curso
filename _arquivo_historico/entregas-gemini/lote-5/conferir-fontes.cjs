const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'../..'),inv=JSON.parse(fs.readFileSync(path.join(root,'entregas-gemini/lote-1/revisado/INVENTARIO.json'),'utf8'));
const box={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'interface/conteudo-geral.js'),'utf8'),box);const modules=box.window.CURSO_DADOS.catalogoOriginal;
const result=[];
for(const m of modules){
 const items=inv.filter(x=>x.modulo===m.nome),groups=new Map();for(const x of items){const key=x.grupo_aula||x.titulo;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(x);}
 assert.equal(m.aulas.length,groups.size,m.nome);
 for(const a of m.aulas){const source=groups.get(a.grupo_aula);assert(source,a.grupo_aula);const key=x=>JSON.stringify([x.titulo,x.tipo,x.url||null]);assert.deepEqual(a.materiais.map(key).sort(),source.filter(x=>x.tipo!=='part-frag').map(key).sort());}
 result.push({modulo:m.nome,aulas:m.aulas.length,com_arquivo:m.aulas.filter(a=>a.temArquivos).length,sem_arquivo:m.aulas.filter(a=>!a.temArquivos).length,videos:items.filter(x=>x.tipo==='video').length,pdfs:items.filter(x=>x.tipo==='pdf').length});
}
const guide=fs.readFileSync(path.join(__dirname,'GUIA-MODULO-01.md'),'utf8'),matches=[...guide.matchAll(/^#### Aula (\d+) \(`([^`]+)`\): (.+)$/gm)];
const divergencias=matches.filter(x=>{const a=modules[0].aulas.find(a=>a.id===x[2]);return !a||a.grupo_aula!==x[3];}).map(x=>({id:x[2],titulo_guia:x[3],titulo_catalogado:modules[0].aulas.find(a=>a.id===x[2])?.grupo_aula}));
fs.writeFileSync(path.join(__dirname,'CONFERENCIA-FONTES.json'),JSON.stringify({catalogo_equivalente_ao_inventario:true,por_modulo:result,titulos_divergentes_guia:divergencias},null,2)+'\n');
console.log(JSON.stringify({por_modulo:result,titulos_divergentes:divergencias.length},null,2));
