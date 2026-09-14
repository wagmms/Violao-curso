const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {JSDOM,VirtualConsole}=require('jsdom');
const dir=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const dom=new JSDOM(html.replace(/<script[\s\S]*?<\/script>/g,''),{url:'https://curso.test/',runScripts:'outside-only',virtualConsole:new VirtualConsole()});
const w=dom.window;
w.scrollTo=()=>{};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
w.HTMLDialogElement.prototype.close=function(){this.open=false};
const run=c=>vm.runInContext(c,dom.getInternalVMContext());
for(const [,script] of html.matchAll(/<script src="([^"]+)"/g)) new vm.Script(fs.readFileSync(path.join(dir,script),'utf8'),{filename:script}).runInContext(dom.getInternalVMContext());
async function main(){
 await new Promise(r=>setImmediate(r));
 run('navegarPara("biblioteca")');
 assert.equal(w.document.querySelectorAll('.bib-aprender').length,631);
 w.document.querySelector('.bib-aprender').click();
 assert.ok(w.document.querySelector('#curso-aula'));
 assert.match(w.document.querySelector('#aprender-conteudo').textContent,/Roteiro desta aula/);
 const consultada=w.document.querySelector('#curso-consultada');consultada.checked=true;consultada.dispatchEvent(new w.Event('change'));
 const nota=w.document.querySelector('#curso-nota');nota.value='<script>não executar</script>';nota.dispatchEvent(new w.Event('input'));
 run('carregarEstadoInicial();navegarPara("aprender")');
 assert.equal(w.document.querySelector('#curso-nota').value,'<script>não executar</script>');
 assert.equal(w.document.querySelector('#curso-consultada').checked,true);
 assert.equal(run('state.tentativas.length'),0);
 assert.equal(run('validarEsquemaBackup(serializarEstado()).dados.aprendizagemCurso.progresso["aula-mod-1-1"].consultada'),true);
 assert.equal(run('validarAprendizagemCurso({aulaAtualId:"inexistente",progresso:{inexistente:{consultada:true}}}).aulaAtualId'),null);
 assert.equal(run('Object.keys(validarAprendizagemCurso({progresso:{inexistente:{consultada:true}}}).progresso).length'),0);
 for(const mod of w.CURSO_DADOS.catalogoOriginal){
   run(`abrirAulaCurso(${JSON.stringify(mod.aulas[0].id)})`);
   assert.equal(w.document.querySelector('#curso-modulo').value,mod.id);
   assert.equal(w.document.querySelector('#curso-aula').value,mod.aulas[0].id);
   const guia=w.GUIAS_AULAS[mod.aulas[0].id];
   assert.equal(guia.moduloId,mod.id);
 }
 for(const mod of w.CURSO_DADOS.catalogoOriginal) for(const a of mod.aulas){
   const guia=w.GUIAS_AULAS[a.id];assert.ok(guia);assert.equal(guia.sessao40min.reduce((s,b)=>s+b.minutos,0),40);
   for(const f of guia.fontes) assert.ok(fs.existsSync(path.join(w.ACERVO_LOCAL_PADRAO,f.caminhoLocal)),f.caminhoLocal);
 }
 assert.equal(run('materialLocalURL({caminhoLocal:"../segredo"})'),'');
 assert.equal(run('materialLocalURL({caminhoLocal:"https://exemplo.test"})'),'');
 assert.match(run('materialLocalURL({caminhoLocal:"Curso Kaiser\\\\aula.mp4"})'),/^file:\/\/\/C:/);
 run('abrirAulaCurso("aula-mod-1-1");trocarAtividade("ativ-8","preparacao");navegarPara("aprender")');
 assert.equal(w.document.querySelector('#curso-aula'),null);
 let svg=w.document.querySelector('.fretboard-card svg');assert.match(svg.getAttribute('aria-label'),/^Em:/);
 assert.doesNotMatch(w.document.querySelector('.fretboard-card').textContent,/A – C – E/);
 w.document.querySelector('[data-nivel="variacao"]').click();
 assert.equal(w.document.querySelectorAll('.fretboard-card svg').length,2);
 assert.match(w.document.querySelectorAll('.fretboard-card svg')[1].getAttribute('aria-label'),/^B7\/F#:/);
 run('trocarAtividade("ativ-4");navegarPara("aprender")');
 assert.equal(w.document.querySelector('.fretboard-card'),null);
 w.document.querySelector('#btn-aprender-curso').click();assert.ok(w.document.querySelector('#curso-aula'));
 // Mescla de backup preserva a nota local e acrescenta uma aula importada.
 w.mostrarConfirmacao=async()=>true;
 const backup=JSON.parse(JSON.stringify(run('serializarEstado()')));
 backup.aprendizagemCurso.progresso['aula-mod-1-1']={consultada:false,praticada:false,nota:'nota importada'};
 backup.aprendizagemCurso.progresso['aula-mod-1-2']={consultada:true,praticada:true,nota:'nova nota'};
 await w.processarArquivoBackup({target:{files:[{text:async()=>JSON.stringify(backup)}]}});
 assert.equal(run('state.aprendizagemCurso.progresso["aula-mod-1-1"].nota'),'<script>não executar</script>');
 assert.equal(run('state.aprendizagemCurso.progresso["aula-mod-1-2"].nota'),'nova nota');
 console.log('Curso integrado: navegação de 631 aulas, 12 módulos, fontes locais, progresso, backup e diagramas verificados.');
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>dom.window.close());
