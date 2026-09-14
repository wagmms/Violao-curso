const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'../../..'),box={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'interface/conteudo-geral.js'),'utf8'),box);
const catalog=box.window.CURSO_DADOS.catalogoOriginal,md=fs.readFileSync(path.join(__dirname,'GUIA-MODULO-01.md'),'utf8');
const sections=md.split(/(?=^#### Aula \d+)/m).slice(1),errors=[];
for(const s of sections){const h=/^#### Aula \d+ \(`([^`]+)`\): (.+)/.exec(s),a=catalog[0].aulas.find(a=>a.id===h?.[1]);if(!a){errors.push({tipo:'aula_desconhecida',id:h?.[1]});continue;}
 if(h[2].trim()!==a.grupo_aula)errors.push({tipo:'titulo',id:a.id,guia:h[2],catalogo:a.grupo_aula});
 for(const u of [...s.matchAll(/https:\/\/drive\.google\.com\/[^)\s]+/g)].map(x=>x[0]))if(!a.materiais.some(m=>m.url===u))errors.push({tipo:'url_nao_corresponde',id:a.id,url:u});
}
const inv=JSON.parse(fs.readFileSync(path.join(root,'entregas-gemini/lote-1/revisado/INVENTARIO.json'),'utf8'));
const sources=inv.filter(x=>x.modulo==='01. Módulo 1'&&['descricao','legenda'].includes(x.tipo)).slice(0,6).map(x=>({titulo:x.titulo,caminho:x.caminho_local,existe:!!x.caminho_local&&fs.existsSync(x.caminho_local)}));
fs.writeFileSync(path.join(__dirname,'RESULTADO-CONFERENCIA-CODEX.json'),JSON.stringify({aulas:sections.length,erros:errors,amostra_fontes:sources},null,2)+'\n');console.log(JSON.stringify({aulas:sections.length,erros:errors.length,amostra_erros:errors.slice(0,3),fontes:sources},null,2));
