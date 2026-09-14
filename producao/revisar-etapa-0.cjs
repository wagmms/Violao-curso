const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const base=path.resolve(__dirname,'..'),root='C:/Users/wmors/Videos/KatoMart Acelerado';
const inv=JSON.parse(fs.readFileSync(path.join(__dirname,'etapa-0-inventario/v01/INVENTARIO.json'),'utf8'));
const w={};vm.runInNewContext(fs.readFileSync(path.join(base,'app/dados-catalogo.js'),'utf8'),{window:w});
const cat=w.CURSO_DADOS.catalogoOriginal.flatMap(m=>m.aulas.map(a=>({...a,mod:m.id})));
const out={data:new Date().toISOString(),escopo:'Todos os IDs, links, referências e tamanhos; SHA-256 de amostra explícita; sem reprodução de vídeos/PDFs',totaisDeclarados:inv.totais,erros:[],hashesAmostra:[]};
const err=(tipo,detalhe)=>out.erros.push({tipo,detalhe});
const ids=new Set(inv.entradas.map(e=>e.id));
out.ids={catalogo:cat.length,inventario:inv.entradas.length,unicos:ids.size};
for(const a of cat){const e=inv.entradas.find(e=>e.id===a.id);if(!e){err('id_ausente',a.id);continue;}if(e.grupoAula!==a.grupo_aula||e.moduloAtual.id!==a.mod)err('identidade',a.id);
const links=a.materiais.filter(m=>m.url).map(m=>m.url).sort();if(JSON.stringify(links)!==JSON.stringify([...e.disponibilidade.linksRemotos].sort()))err('links',a.id);}
for(const e of inv.entradas)if(!cat.some(a=>a.id===e.id))err('id_extra',e.id);
const refs=inv.entradas.flatMap(e=>e.arquivos), unique=new Map();
for(const f of refs){const prev=unique.get(f.caminhoRelativo);if(prev&&JSON.stringify(prev)!==JSON.stringify(f))err('referencia_inconsistente',f.caminhoRelativo);unique.set(f.caminhoRelativo,f);}
let physical=[];function walk(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,d.name);if(d.isDirectory())walk(p);else physical.push({caminhoRelativo:path.relative(root,p).replaceAll('\\','/'),tamanhoBytes:fs.statSync(p).size});}}walk(root);
out.arquivos={referencias:refs.length,unicosReferenciados:unique.size,fisicos:physical.length,bytesFisicos:physical.reduce((s,f)=>s+f.tamanhoBytes,0),naoReferenciados:physical.filter(f=>!unique.has(f.caminhoRelativo))};
for(const f of unique.values()){try{const p=path.resolve(root,f.caminhoRelativo);if(!p.startsWith(path.resolve(root)+path.sep)){err('fora_raiz',f.caminhoRelativo);continue;}const s=fs.statSync(p);if(s.size!==f.tamanhoBytes)err('tamanho',{caminho:f.caminhoRelativo,declarado:f.tamanhoBytes,real:s.size});if(!/^[a-f0-9]{64}$/.test(f.sha256))err('hash_formato',f.caminhoRelativo);}catch(e){err('arquivo_ausente',f.caminhoRelativo);}}
out.recontagem={comVideo:inv.entradas.filter(e=>e.arquivos.some(f=>f.tipo==='video'&&f.tamanhoBytes>0)).length,comPdf:inv.entradas.filter(e=>e.arquivos.some(f=>f.tipo==='pdf'&&f.tamanhoBytes>0)).length,comMaterial:inv.entradas.filter(e=>e.arquivos.some(f=>['video','pdf'].includes(f.tipo)&&f.tamanhoBytes>0)).length,comLegenda:inv.entradas.filter(e=>e.arquivos.some(f=>f.tipo==='legenda'&&f.tamanhoBytes>0)).length};
out.classificacoes={};for(const e of inv.entradas)out.classificacoes[e.classificacaoEditorial]=(out.classificacoes[e.classificacaoEditorial]||0)+1;
const triadeDir=path.join(root,'Curso de Violão Método Tríade COMPLETO - Heitor Castro');
const manifesto=JSON.parse(fs.readFileSync(path.join(triadeDir,fs.readdirSync(triadeDir).find(n=>/manifest.*json/i.test(n)))));
out.manifesto={entradasTriade:0,referenciasConferidas:0,divergencias:[]};
for(const e of inv.entradas.filter(e=>e.origem==='Método Tríade')){out.manifesto.entradasTriade++;const [,m,l]=e.id.match(/aula-mod-(\d+)-(\d+)/);for(const f of e.arquivos){out.manifesto.referenciasConferidas++;const msg=Number(path.basename(f.caminhoRelativo).match(/^\d+/)?.[0]);if(!manifesto.files.some(x=>x.message_id===msg&&x.module_index===Number(m)-1&&x.lesson_index===Number(l)-1))out.manifesto.divergencias.push({id:e.id,msg});}}
const groups=new Map();for(const f of unique.values()){if(!groups.has(f.sha256))groups.set(f.sha256,[]);groups.get(f.sha256).push(f);}
const dup=[...groups.values()].filter(g=>g.length>1);out.duplicatasPorHashesDeclarados={grupos:dup.length,bytesRedundantes:dup.reduce((s,g)=>s+(g.length-1)*g[0].tamanhoBytes,0),limite:'Agrupamento dos hashes entregues, não recálculo integral'};
out.candidatosCitados=['aula-kaiser-5-5-thumb-slap-batida-fingerstyle','aula-kaiser-134-3-pequena-valsa'].map(id=>({id,existe:ids.has(id)}));
const sample=new Map();for(const id of ['aula-mod-1-1','aula-mod-1-2','aula-mod-1-10','aula-mod-1-15','aula-mod-1-17','aula-kaiser-124-3-partituras-faceis-para-iniciantes','aula-kaiser-5-5-thumb-slap-batida-fingerstyle']){const e=inv.entradas.find(e=>e.id===id);for(const f of e?.arquivos||[])if(f.tamanhoBytes<15000000||f===e.arquivos.find(f=>f.tipo==='video'))sample.set(f.caminhoRelativo,f);}
async function hash(p){const h=crypto.createHash('sha256');for await(const b of fs.createReadStream(p))h.update(b);return h.digest('hex');}
(async()=>{for(const f of sample.values()){const actual=await hash(path.join(root,f.caminhoRelativo));out.hashesAmostra.push({caminho:f.caminhoRelativo,declarado:f.sha256,real:actual,confere:actual===f.sha256});}
out.pdfsSemExtensao=[...unique.values()].filter(f=>f.tipo==='pdf'&&!/\.pdf$/i.test(f.caminhoRelativo)).map(f=>{const fd=fs.openSync(path.join(root,f.caminhoRelativo),'r'),b=Buffer.alloc(8);fs.readSync(fd,b,0,8,0);fs.closeSync(fd);return {caminho:f.caminhoRelativo,cabecalho:b.toString()};});
fs.writeFileSync(path.join(__dirname,'etapa-0-inventario/EVIDENCIAS-REVISAO-CODEX-v01.json'),JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify({ids:out.ids,arquivos:{referencias:refs.length,unicos:unique.size,fisicos:physical.length,naoReferenciados:out.arquivos.naoReferenciados.length},recontagem:out.recontagem,erros:out.erros.length,exemplos:out.erros.slice(0,5),hashes:out.hashesAmostra.length,hashesDivergentes:out.hashesAmostra.filter(h=>!h.confere),pdfsSemExtensao:out.pdfsSemExtensao.length,classificacoes:out.classificacoes},null,2));})();
