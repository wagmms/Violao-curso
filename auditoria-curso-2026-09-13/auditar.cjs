const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { pathToFileURL } = require('url');
const { CDPClient } = require('../interface-v2/ferramentas/cdp-runner.cjs');
const root = path.resolve(__dirname, '..');
const out = { data: new Date().toISOString(), escopo: 'Perfil isolado; dados simulados; sem acessar Drive ou microfone', testes: [], telas: [] };
const box = {window:{}};
vm.createContext(box);
for (const f of ['interface-v2/dados-catalogo.js','interface-v2/dados-atividades.js','interface/guias-dados.js']) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),box);
out.modulos = box.window.CURSO_DADOS.catalogoOriginal.map(m=>({id:m.id,nome:m.nome,tipo:m.tipo,aulas:m.aulas.length,comArquivos:m.aulas.filter(a=>a.temArquivos).length,guias:m.aulas.filter(a=>box.window.CURSO_GUIAS[a.id]).length}));
out.atividades = box.window.PILOTO_ATIVIDADES.map(a=>({id:a.id,titulo:a.titulo,status:a.statusProntidao,fontes:a.fontes.length,blocos:a.sessao40min.length,minutos:a.sessao40min.reduce((s,x)=>s+x.minutos,0),meta:a.metaObservavel,criterio:a.criterioSaida}));
async function main(){
 const exe=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
 const c=await CDPClient.launch(exe,9337,pathToFileURL(path.join(root,'interface-v2/index.html')).href);
 const check=async(nome,expr)=>{try{out.testes.push({nome,resultado:await c.evaluate(expr)});}catch(e){out.testes.push({nome,erro:e.message});}};
 try {
 await c.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'light'},{name:'prefers-reduced-motion',value:'reduce'}]});
 await c.evaluate('window.auditBase=JSON.stringify(state)');
 for(const width of [1366,375,320]){
  await c.setViewport(width,900);
  for(const view of ['hoje','aprender','praticar','progresso','biblioteca']){
   await c.evaluate(`navegarPara('${view}')`);
   await new Promise(r=>setTimeout(r,220));
   out.telas.push(await c.evaluate(`({view:'${view}',width:${width},scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,exercicioY:document.querySelector('.exercicio-box')?.getBoundingClientRect().top,cortados:[...document.querySelectorAll('.view-ativa .bloco-card,.view-ativa .aula-item,.nav-btn,.view-ativa .exercicio-box')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,4).map(e=>({classe:e.className,direita:e.getBoundingClientRect().right})),texto:document.querySelector('.view-ativa').innerText.slice(0,220)})`));
   if(width!==320) await c.captureScreenshot(path.join(__dirname,`${view}-${width}.png`));
  }
 }
 await check('Fontes hidratadas',`(()=>{navegarPara('aprender');return {fontes:hidratarFontes(atividadesDados[0]).fontes,links:[...document.querySelectorAll('#aprender-conteudo a')].map(a=>a.getAttribute('href')),alphaTab:!!window.alphaTab}})()`);
 await check('Atividade 7: contrato de backup',`(()=>{trocarAtividade('ativ-7');try{validarEsquemaBackup(JSON.parse(JSON.stringify(state)));return 'aceito'}catch(e){return e.message}})()`);
 await check('Atividade 7: timer',`atualizarTimer().then(()=> 'ok').catch(e=>e.message)`);
 await c.evaluate(`state=JSON.parse(auditBase);state.sessao.elapsedMs=60000;trocarAtividade('ativ-2')`);
 await check('Troca com progresso: contrato de backup',`(()=>{try{validarEsquemaBackup(JSON.parse(JSON.stringify(state)));return 'aceito'}catch(e){return {erro:e.message,tentativa:state.tentativas[0]}}})()`);
 await c.reload();
 await check('Reabertura após interrupção',`({atividade:state.atividadeAtualId,tentativas:state.tentativas.length})`);
 await c.evaluate(`window.auditBase=JSON.stringify(state);state=JSON.parse(auditBase);state.nivelExercicioAtual='preparacao';state.revisoes=[{id:'rev-audit',atividadeId:'ativ-1',intervaloDias:2,ciclo:1,dataPrevista:obterDataLocal(-1),concluida:false}];abrirModalResultado(atividadesDados[0]);document.getElementById('select-res-status').value='repetir'`);
 await check('Preparação com repetir altera revisão do Alvo',`(async()=>{await document.getElementById('btn-salvar-resultado').onclick();return state.revisoes})()`);
 await c.evaluate(`state=JSON.parse(auditBase);state.sessao.ativa=true;state.sessao.ultimoTimestamp=Date.now();abrirModalResultado(atividadesDados[0]);document.querySelectorAll('.criterio-check').forEach(e=>e.checked=true);document.getElementById('select-res-status').value='consegui';document.getElementById('input-res-bpm').value='-9'`);
 await check('Conclusão: BPM inválido, sessão e histórico',`(async()=>{await document.getElementById('btn-salvar-resultado').onclick();return {ativa:state.sessao.ativa,tentativa:state.tentativas.at(-1),habilidades:state.habilidades}})()`);
 await c.evaluate(`state=JSON.parse(auditBase);state.sessao.ativa=true;state.sessao.ultimoTimestamp=Date.now()-600000;salvarEstado()`);
 await check('Exportação durante sessão',`(()=>{window.auditBlob=null;const old=URL.createObjectURL;URL.createObjectURL=b=>{window.auditBlob=b;return old(b)};exportarBackupJSON();return auditBlob.text().then(t=>({exportado:JSON.parse(t).sessao.elapsedMs,salvo:JSON.parse(localStorage.getItem('metodo_triade_v2')).sessao.elapsedMs}))})()`);
 await c.evaluate(`state=JSON.parse(auditBase);salvarEstado();state.sessao.ativa=true;state.sessao.ultimoTimestamp=Date.now()-600000`);
 await c.reload();
 await check('Recarregar após dez minutos sem outra ação',`state.sessao.elapsedMs`);
 await c.evaluate(`window.auditBase=JSON.stringify(state)`);
 await c.evaluate(`state=JSON.parse(auditBase);state.nivelExercicioAtual='variacao';trocarAtividade('ativ-2')`);
 await check('Nível após trocar atividade',`({tela:state.nivelExercicioAtual,sessao:state.sessao.nivel})`);
 await c.evaluate(`state=JSON.parse(auditBase);state.dificuldades=[{id:'d1',atividadeId:'ativ-1',trecho:'x',problema:'y',resolvida:false}];navegarPara('hoje');document.getElementById('btn-comecar-40').click()`);
 await check('Hoje: recuperação realmente abre preparação',`({nivel:state.nivelExercicioAtual,ativa:state.sessao.ativa})`);
 await check('Hoje: botão Começar durante sessão ativa',`(()=>{navegarPara('hoje');document.getElementById('btn-comecar-40').click();return {ativa:state.sessao.ativa}})()`);
 await c.evaluate(`state=JSON.parse(auditBase);navegarPara('aprender');abrirModalResultado(atividadesDados[0]);document.getElementById('res-compassos').value=8;document.getElementById('chk-pulso').checked=true;document.getElementById('modal-resultado').close();abrirModalResultado(atividadesDados[1])`);
 await check('Valores herdados em nova avaliação',`({compassos:document.getElementById('res-compassos').value,pulso:document.getElementById('chk-pulso').checked,criterio:document.getElementById('div-criterio-modal').innerText})`);
 await c.evaluate(`document.querySelectorAll('dialog').forEach(d=>d.close());state=JSON.parse(auditBase);navegarPara('aprender','ativ-4');checarRespostaIntervalo(treinoOuvido.intervaloSorteado.chave);navegarPara('hoje');navegarPara('aprender')`);
 await check('Ouvido: retomada após responder',`({respondido:treinoOuvido.respondido,proximaVisivel:getComputedStyle(document.getElementById('ear-controles-pos')).display,historicoPersistido:!!state.treinoOuvido})`);
 await c.evaluate(`navegarPara('biblioteca');document.getElementById('bib-busca').value='ritmica';filtrarBiblioteca()`);
 await check('Busca sem acentos',`document.getElementById('bib-resultados-lista').innerText.slice(0,250)`);
 await c.send('Emulation.setEmulatedMedia',{media:'print'});
 await check('Impressão inclui telas já visitadas',`[...document.querySelectorAll('.view-panel')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.id)`);
 await c.send('Emulation.setEmulatedMedia',{media:'',features:[{name:'prefers-color-scheme',value:'dark'}]});
 await c.setViewport(1366,900);await c.evaluate(`navegarPara('hoje')`);await new Promise(r=>setTimeout(r,220));await c.captureScreenshot(path.join(__dirname,'hoje-dark-1366.png'));
 } finally {fs.writeFileSync(path.join(__dirname,'resultados.json'),JSON.stringify(out,null,2));try{c.ws.close()}catch{}try{c.proc.kill()}catch{}}
 console.log(JSON.stringify({testes:out.testes,telas:out.telas,modulos:out.modulos},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1});
