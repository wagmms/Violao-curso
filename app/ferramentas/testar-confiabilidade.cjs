const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {JSDOM, VirtualConsole} = require('jsdom');
const dir = path.resolve(__dirname, '..');
const scripts = [...fs.readFileSync(path.join(dir,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const results=[];
async function ambiente(){
 const dom = new JSDOM(fs.readFileSync(path.join(dir,'index.html'),'utf8').replace(/<script[\s\S]*?<\/script>/g,''),{url:'https://curso.test/',runScripts:'outside-only',virtualConsole:new VirtualConsole()});
 const w=dom.window;
 w.scrollTo=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
 w.HTMLDialogElement.prototype.close=function(){this.open=false};
 w.URL.createObjectURL=b=>{w.ultimoBlob=b;return 'blob:test'};w.URL.revokeObjectURL=()=>{};
 w.HTMLAnchorElement.prototype.click=function(){};
 for(const script of scripts)new vm.Script(fs.readFileSync(path.join(dir,script),'utf8'),{filename:script}).runInContext(dom.getInternalVMContext());
 await new Promise(r=>setImmediate(r));
 w.mostrarAlerta=async(msg)=>{w.ultimoAlerta=msg;return true};
 w.mostrarConfirmacao=async()=>true;
 return {dom,w,run:code=>vm.runInContext(code,dom.getInternalVMContext())};
}
async function teste(nome,fn){let a;try{a=await ambiente();await fn(a);results.push({nome,ok:true});}catch(e){results.push({nome,ok:false,erro:e.stack});}finally{a?.dom.window.close();}}
function avaliar(a,nivel,status,bpm='60'){
 a.run(`trocarAtividade('ativ-1','${nivel}');abrirModalResultado(atividadesDados[0])`);
 a.w.document.getElementById('select-res-status').value=status;
 a.w.document.getElementById('input-res-bpm').value=bpm;
 a.w.document.querySelector('.criterio-check').checked=true;
 a.w.document.getElementById('btn-salvar-resultado').click();
}
async function main(){

 await teste('window.onerror manipula erros com segurança sem XSS', a => {
  const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const inlineScript = indexHtml.match(/<script>(window\.onerror[\s\S]*?)<\/script>/)[1];
  a.run(inlineScript);
  a.run(`window.onerror("<img src=x onerror=alert(1)>", "app.js", 10, 5, new Error("<script>alert(1)</script>"));`);
  const errElem = a.w.document.getElementById('fatal-error');
  assert.ok(errElem !== null);
  assert.equal(a.w.document.getElementsByTagName('img').length, 0);
  assert.ok(errElem.textContent.includes('<img src=x onerror=alert(1)>'));
 });

 await teste('Worker bloqueado inicia timer de fallback',a=>{
  // Reload the timer.js script in the window context where Worker is overridden
  a.run(`
   pausarSessao();
   timerWorker=null;
   self.Worker=function(){throw new Error("CSP");};
  `);

  const timerJs = require('fs').readFileSync(require('path').join(__dirname, '../timer.js'), 'utf8');
  a.run(timerJs); // This will execute the file contents in context

  a.run(`
   iniciarSessao();
  `);
  assert.equal(a.run('timerWorker'),null);assert.ok(a.run('state.sessao.intervalId')!==null);
 });

 await teste('Worker emite onerror encerra worker e inicia timer de fallback',a=>{
  // Reload the timer.js script in the window context where Worker is overridden
  a.run(`
   pausarSessao();
   self.Worker=class{constructor(){this.onmessage=null;this.onerror=null;}postMessage(){}terminate(){}};
  `);

  const timerJs = require('fs').readFileSync(require('path').join(__dirname, '../timer.js'), 'utf8');
  a.run(timerJs);

  a.run(`
   iniciarSessao();
  `);
  assert.ok(a.run('timerWorker')!==null);assert.equal(a.run('state.sessao.intervalId'),null);
  a.run('timerWorker.onerror(new Error("mock"));');
  assert.equal(a.run('timerWorker'),null);assert.ok(a.run('state.sessao.intervalId')!==null);
 });

 await teste('11 atividades: selecionar, serializar e restaurar',a=>{for(let i=1;i<=11;i++){a.run(`trocarAtividade('ativ-${i}')`);const d=a.run('validarEsquemaBackup(serializarEstado()).dados');assert.equal(d.atividadeAtualId,`ativ-${i}`);assert.equal(d.sessao.nivel,d.nivelExercicioAtual);}});
 await teste('Interrupção ativa sem elapsed consolidado permanece no backup',a=>{a.run(`iniciarSessao();state.sessao.ultimoTimestamp-=60000;trocarAtividade('ativ-2');carregarEstadoInicial()`);assert.equal(a.run('state.tentativas.length'),1);assert.equal(a.run('state.tentativas[0].status'),'interrompida');assert.ok(a.run('state.tentativas[0].duracaoMs')>=60000);});
  await teste('Rascunhos não iniciam; timer tolera roteiro vazio',a=>{
    a.run(`
      pausarSessao();
      const rascunhoMock = { id: 'ativ-mock-rascunho', titulo: 'Rascunho Teste', statusOperacional: 'rascunho', sessao40min: [] };
      atividadesDados.push(rascunhoMock);
      ATIVIDADES_VALIDAS_IDS.add('ativ-mock-rascunho');
      trocarAtividade('ativ-mock-rascunho');
      atualizarTimer();
    `);
    assert.equal(a.run('iniciarSessao()'), false);
    assert.equal(a.run('state.sessao.ativa'), false);
    a.run(`
      atividadesDados.pop();
      ATIVIDADES_VALIDAS_IDS.delete('ativ-mock-rascunho');
      trocarAtividade('ativ-1');
      atualizarTimer();
    `);
  });
 await teste('Checkpoint e exportação usam o tempo ativo consolidado',a=>{a.run(`iniciarSessao();state.sessao.ultimoTimestamp-=600000;ultimoCheckpoint=0;atualizarTimer()`);const saved=JSON.parse(a.w.localStorage.getItem('metodo_triade_v2'));assert.ok(saved.sessao.elapsedMs>=600000);assert.ok(Math.abs(saved.sessao.elapsedMs-a.run('serializarEstado().sessao.elapsedMs'))<50);});
 await teste('pagehide salva e pausa antes de fechar',a=>{a.run('iniciarSessao();state.sessao.ultimoTimestamp-=600000');a.w.dispatchEvent(new a.w.Event('pagehide'));assert.ok(JSON.parse(a.w.localStorage.getItem('metodo_triade_v2')).sessao.elapsedMs>=600000);assert.equal(a.run('state.sessao.ativa'),false);});
 await teste('Relógio regressivo não duplica tempo nem aceita delta negativo',a=>{a.run(`iniciarSessao();state.sessao.ultimoTimestamp-=10000`);let ms=a.run('tempoDecorrido()');a.run('atualizarTimer();atualizarTimer();pausarSessao()');assert.ok(a.run('state.sessao.elapsedMs')<ms+50);a.run('state.sessao.ativa=true;state.sessao.ultimoTimestamp=Date.now()+60000');assert.equal(a.run('tempoDecorrido()'),a.run('state.sessao.elapsedMs'));});
 for(const nivel of ['preparacao','alvo','variacao'])for(const status of ['consegui','repetir','dificuldade']){
  await teste(`SRS: ${nivel}/${status}; revisão vencida`,a=>{
   a.run(`state.revisoes=[{id:'r',atividadeId:'ativ-1',ciclo:1,intervaloDias:2,dataPrevista:obterDataLocal(-1),concluida:false}];iniciarSessao();state.sessao.ultimoTimestamp-=10000`);
   avaliar(a,nivel,status);
   assert.equal(a.run('state.tentativas.length'),1);assert.equal(a.run('state.sessao.ativa'),false);assert.equal(a.run('state.sessao.concluida'),true);
   if(nivel!=='alvo'){assert.equal(a.run('state.revisoes.length'),1);assert.equal(a.run('state.revisoes[0].concluida'),false);}else {assert.equal(a.run('state.revisoes.length'),2);assert.equal(a.run('state.revisoes[1].intervaloDias'),status==='consegui'?7:2);}
   a.run('validarEsquemaBackup(serializarEstado())');
  });
 }
 await teste('Sucessos no mesmo dia não aceleram revisão e conclusão não duplica tentativa',a=>{avaliar(a,'alvo','consegui');a.w.document.getElementById('btn-salvar-resultado').click();assert.equal(a.run('state.tentativas.length'),1);avaliar(a,'alvo','consegui');assert.equal(a.run('state.revisoes.filter(r=>!r.concluida).length'),1);assert.equal(a.run('state.revisoes.find(r=>!r.concluida).intervaloDias'),2);a.run(`trocarAtividade('ativ-2')`);assert.equal(a.run(`state.tentativas.filter(t=>t.status==='interrompida').length`),0);});
 for(const bpm of ['-9','0','241','60.5','']) await teste(`Avaliação rejeita sucesso com BPM ${JSON.stringify(bpm)}`,a=>{avaliar(a,'alvo','consegui',bpm);assert.equal(a.run('state.tentativas.length'),0);assert.ok(a.w.document.getElementById('resultado-erro').textContent);});
 await teste('Campos de avaliação limpos e critérios próprios da Preparação',a=>{a.run('abrirModalResultado(atividadesDados[0])');a.w.document.getElementById('res-compassos').value=8;a.w.document.getElementById('chk-pulso').checked=true;a.run(`trocarAtividade('ativ-2','preparacao');abrirModalResultado(atividadesDados[1])`);assert.equal(a.w.document.getElementById('res-compassos').value,'');assert.equal(a.w.document.getElementById('chk-pulso').checked,false);assert.equal(a.w.document.getElementById('select-res-status').value,'');assert.ok(a.w.document.getElementById('div-criterio-modal').textContent.includes('Preparação'));});
 await teste('Hoje recupera em Preparação e continuar não pausa sessão ativa',a=>{a.run(`state.dificuldades=[{id:'d',atividadeId:'ativ-1',trecho:'troca',problema:'hesitação',data:obterDataLocal(),resolvida:false}];navegarPara('hoje')`);a.w.document.getElementById('btn-comecar-40').click();assert.equal(a.run('state.sessao.nivel'),'preparacao');a.run(`navegarPara('hoje')`);a.w.document.getElementById('btn-comecar-40').click();assert.equal(a.run('state.sessao.ativa'),true);});
 await teste('Histórico parcialmente inválido recupera registros válidos e preserva original',a=>{avaliar(a,'alvo','consegui');const orig=a.run('serializarEstado()');orig.tentativas.push({...orig.tentativas[0],id:'ruim',bpm:-9});const raw=JSON.stringify(orig);a.w.localStorage.setItem('metodo_triade_v2',raw);a.run(`state.tentativas=[];state.habilidades={};carregarEstadoInicial()`);assert.equal(a.run('state.tentativas.length'),1);assert.equal(a.w.localStorage.getItem('metodo_triade_v2_recuperacao'),raw);assert.ok(a.w.document.getElementById('aviso-recuperacao'));a.run('salvarEstado()');assert.equal(a.w.localStorage.getItem('metodo_triade_v2_recuperacao'),raw);});
 await teste('Sem espaço para cópia de recuperação, escrita não sobrescreve original',a=>{a.w.localStorage.setItem('metodo_triade_v2','{quebrado');a.run(`storageSet=()=>false;carregarEstadoInicial();salvarEstado()`);assert.equal(a.w.localStorage.getItem('metodo_triade_v2'),'{quebrado');assert.equal(a.run('bloquearGravacao'),true);assert.ok(a.w.document.querySelector('#aviso-recuperacao button'));});
 await teste('dataValida: validação de datas, tipos e formatos',a=>{
  assert.equal(a.run("dataValida('2026-09-13')"), true);
  assert.equal(a.run("dataValida('2024-02-29')"), true);
  assert.equal(a.run("dataValida('2025-12-31')"), true);
  assert.equal(a.run("dataValida('2025-01-01')"), true);

  assert.equal(a.run("dataValida(null)"), false);
  assert.equal(a.run("dataValida(undefined)"), false);
  assert.equal(a.run("dataValida(12345)"), false);
  assert.equal(a.run("dataValida({})"), false);
  assert.equal(a.run("dataValida([])"), false);
  assert.equal(a.run("dataValida(true)"), false);

  assert.equal(a.run("dataValida('2026/09/13')"), false);
  assert.equal(a.run("dataValida('13-09-2026')"), false);
  assert.equal(a.run("dataValida('2026-9-13')"), false);
  assert.equal(a.run("dataValida('2026-09-1')"), false);
  assert.equal(a.run("dataValida('2026-09-13T00:00:00Z')"), false);
  assert.equal(a.run("dataValida('')"), false);
  assert.equal(a.run("dataValida('2026-09-13 extra')"), false);

  assert.equal(a.run("dataValida('2025-02-29')"), false);
  assert.equal(a.run("dataValida('2026-00-10')"), false);
  assert.equal(a.run("dataValida('2026-13-10')"), false);
  assert.equal(a.run("dataValida('2026-04-31')"), false);
  assert.equal(a.run("dataValida('2026-09-00')"), false);
  assert.equal(a.run("dataValida('2026-01-32')"), false);
 });
 await teste('Datas impossíveis rejeitadas',a=>{a.run(`state.revisoes=[{id:'r',atividadeId:'ativ-1',ciclo:1,intervaloDias:2,dataPrevista:'2026-02-30',concluida:false}]`);assert.throws(()=>a.run('validarEsquemaBackup(serializarEstado())'));});
 await teste('Merge preserva sessão ativa, notas e uma revisão pendente; idempotência',async a=>{
  a.run(`state.legado.notas.a='local';state.revisoes=[{id:'r1',atividadeId:'ativ-1',ciclo:1,intervaloDias:2,dataPrevista:obterDataLocal(2),concluida:false}];iniciarSessao();state.sessao.ultimoTimestamp-=60000`);
  const d=JSON.parse(a.run('JSON.stringify(serializarEstado())'));d.atividadeAtualId='ativ-2';d.sessao.atividadeId='ativ-2';d.legado.notas.a='importada';d.revisoes=[{...d.revisoes[0],id:'r2'}];
  const event={target:{files:[{text:async()=>JSON.stringify(d)}],value:'backup'}};
  await a.w.processarArquivoBackup(event);await a.w.processarArquivoBackup(event);
  assert.equal(a.run('state.sessao.ativa'),true);assert.equal(a.run('state.sessao.atividadeId'),'ativ-1');assert.equal(a.run('state.atividadeAtualId'),'ativ-1');assert.equal(a.run('state.legado.notas.a'),'local');assert.equal(a.run('state.revisoes.length'),2);assert.equal(a.run('state.revisoes.filter(r=>!r.concluida).length'),1);
 });
 await teste('Legado v1 é mesclado sem marcar domínio',async a=>{const event={target:{files:[{text:async()=>JSON.stringify({versao:1,assistidos:['aula-1'],praticados:[],notas:{'aula-1':'teste'}})}]}};await a.w.processarArquivoBackup(event);assert.equal(a.run('state.legado.assistidos.length'),1);assert.equal(a.run('Object.keys(state.habilidades).length'),0);});
 await teste('Ouvido: primeira resposta, retomada, reload, resultado vinculado',a=>{
  a.run(`trocarAtividade('ativ-4','alvo');navegarPara('aprender');checarRespostaIntervalo(treinoOuvido.intervaloSorteado.chave);checarRespostaIntervalo(treinoOuvido.intervaloSorteado.chave);navegarPara('hoje');navegarPara('aprender')`);
  assert.equal(a.run('treinoOuvido.acertos'),1);assert.equal(a.w.document.getElementById('ear-controles-pos').style.display,'block');
  a.run(`carregarEstadoInicial();navegarPara('aprender')`);assert.equal(a.run('treinoOuvido.acertos'),1);
  a.run(`for(let i=1;i<10;i++){avancarPerguntaTreinoOuvido(atividadesDados[3].exercicio.intervalosPorNivel.alvo);checarRespostaIntervalo(treinoOuvido.intervaloSorteado.chave)};abrirModalResultado(atividadesDados[3])`);
  a.w.document.getElementById('select-res-status').value='consegui';a.w.document.querySelector('.criterio-check').checked=true;a.w.document.getElementById('btn-salvar-resultado').click();
  assert.equal(a.run('state.tentativas[0].serieOuvido.acertos'),10);assert.equal(a.run('state.tentativas[0].serieOuvido.historico.length'),10);a.run('validarEsquemaBackup(serializarEstado())');
 });
 await teste('Ouvido: sucesso sem série ou com 7/10 não aprova',a=>{
  a.run(`trocarAtividade('ativ-4','alvo');navegarPara('aprender');abrirModalResultado(atividadesDados[3])`);
  a.w.document.getElementById('select-res-status').value='consegui';a.w.document.querySelector('.criterio-check').checked=true;a.w.document.getElementById('btn-salvar-resultado').click();assert.equal(a.run('state.tentativas.length'),0);
  a.run(`for(let i=0;i<10;i++){const permitidos=atividadesDados[3].exercicio.intervalosPorNivel.alvo;checarRespostaIntervalo(i<7?treinoOuvido.intervaloSorteado.chave:permitidos.find(c=>c!==treinoOuvido.intervaloSorteado.chave));if(i<9)avancarPerguntaTreinoOuvido(permitidos)}`);
  a.w.document.getElementById('btn-salvar-resultado').click();assert.equal(a.run('state.tentativas.length'),0);
 });
 await teste('Fontes canônicas nunca produzem link vazio',a=>{a.run(`navegarPara('aprender')`);for(const link of a.w.document.querySelectorAll('#aprender-conteudo a'))assert.ok(link.href.startsWith('https://drive.google.com/'));});
<<<<<<< HEAD
 await teste('Validação de URL do Google Drive (urlDriveValida)',a=>{
  assert.equal(a.run('urlDriveValida("https://drive.google.com/file/d/123/view")'), true);
  assert.equal(a.run('urlDriveValida("https://drive.google.com/drive/folders/abc")'), true);
  assert.equal(a.run('urlDriveValida("http://drive.google.com/file/d/123/view")'), false);
  assert.equal(a.run('urlDriveValida("https://google.com/file/d/123/view")'), false);
  assert.equal(a.run('urlDriveValida("https://drive.google.com.attacker.com/file")'), false);
  assert.equal(a.run('urlDriveValida("https://fake-drive.google.com/file")'), false);
  assert.equal(a.run('urlDriveValida("not a url")'), false);
  assert.equal(a.run('urlDriveValida("")'), false);
  assert.equal(a.run('urlDriveValida(null)'), false);
  assert.equal(a.run('urlDriveValida(undefined)'), false);
  assert.equal(a.run('urlDriveValida(12345)'), false);
 });
 await teste('normalizarRevisoes: trata lista vazia e item único', a => {
  const v1 = a.run('normalizarRevisoes([])');
  assert.equal(v1.length, 0);

  const revs = [{ id: 'rev-1', atividadeId: 'ativ-1', dataPrevista: '2026-09-15', concluida: false }];
  const res = a.run(`normalizarRevisoes(${JSON.stringify(revs)})`);
  assert.equal(res.length, 1);
  assert.equal(res[0].concluida, false);
 });
 await teste('normalizarRevisoes: mescla pendências da mesma atividade mantendo a mais antiga e resolvendo empate por ID', a => {
  const input = [
   { id: 'rev-c', atividadeId: 'ativ-1', dataPrevista: '2026-09-20', concluida: false },
   { id: 'rev-b', atividadeId: 'ativ-1', dataPrevista: '2026-09-15', concluida: false },
   { id: 'rev-a', atividadeId: 'ativ-1', dataPrevista: '2026-09-15', concluida: false },
   { id: 'rev-ja-concluida', atividadeId: 'ativ-1', dataPrevista: '2026-09-10', concluida: true }
  ];

  const res = a.run(`
   const revs = ${JSON.stringify(input)};
   normalizarRevisoes(revs);
  `);

  const revA = res.find(r => r.id === 'rev-a');
  assert.equal(revA.concluida, false);

  const revB = res.find(r => r.id === 'rev-b');
  assert.equal(revB.concluida, true);
  assert.equal(revB.substituidaPor, 'rev-a');
  assert.equal(revB.motivoEncerramento, 'mescla-de-pendencias');

  const revC = res.find(r => r.id === 'rev-c');
  assert.equal(revC.concluida, true);
  assert.equal(revC.substituidaPor, 'rev-a');
  assert.equal(revC.motivoEncerramento, 'mescla-de-pendencias');

  const revJaConcluida = res.find(r => r.id === 'rev-ja-concluida');
  assert.equal(revJaConcluida.concluida, true);
  assert.equal(revJaConcluida.substituidaPor, undefined);
 });
 await teste('normalizarRevisoes: isola deduplicação por atividade e preserva referência do array', a => {
  const res = a.run(`
   const list = [
    { id: 'rev-ativ1-2', atividadeId: 'ativ-1', dataPrevista: '2026-09-18', concluida: false },
    { id: 'rev-ativ1-1', atividadeId: 'ativ-1', dataPrevista: '2026-09-15', concluida: false },
    { id: 'rev-ativ2-2', atividadeId: 'ativ-2', dataPrevista: '2026-09-22', concluida: false },
    { id: 'rev-ativ2-1', atividadeId: 'ativ-2', dataPrevista: '2026-09-10', concluida: false }
   ];
   const ret = normalizarRevisoes(list);
   ({ sameRef: ret === list, list: ret });
  `);

  assert.ok(res.sameRef);

  assert.equal(res.list.find(r => r.id === 'rev-ativ1-1').concluida, false);
  assert.equal(res.list.find(r => r.id === 'rev-ativ1-2').concluida, true);
  assert.equal(res.list.find(r => r.id === 'rev-ativ1-2').substituidaPor, 'rev-ativ1-1');

  assert.equal(res.list.find(r => r.id === 'rev-ativ2-1').concluida, false);
  assert.equal(res.list.find(r => r.id === 'rev-ativ2-2').concluida, true);
  assert.equal(res.list.find(r => r.id === 'rev-ativ2-2').substituidaPor, 'rev-ativ2-1');
 });
 await teste('obterDataLocal: formato YYYY-MM-DD, deslocamentos, viradas de mês/ano e ano bissexto',a=>{
  // Require direto via CJS export
  const { obterDataLocal } = require('../utils.js');
  assert.equal(typeof obterDataLocal, 'function');

  // 1. Padrão sem parâmetros e com 0
  const hojeReg = /^\d{4}-\d{2}-\d{2}$/;
  const hoje = a.run('obterDataLocal()');
  const hojeZero = a.run('obterDataLocal(0)');
  assert.ok(hojeReg.test(hoje), 'Deve retornar formato YYYY-MM-DD');
  assert.equal(hoje, hojeZero, 'obterDataLocal() e obterDataLocal(0) devem ser idênticos');
  assert.equal(obterDataLocal(), hoje, 'Exported obterDataLocal deve equivaler ao ambiente');

  // 2. Testar cálculo relativo em relação à data atual
  const dRef = new Date();
  const pad = n => String(n).padStart(2, '0');

  const dPlus5 = new Date(dRef);
  dPlus5.setDate(dPlus5.getDate() + 5);
  const espPlus5 = `${dPlus5.getFullYear()}-${pad(dPlus5.getMonth() + 1)}-${pad(dPlus5.getDate())}`;
  assert.equal(a.run('obterDataLocal(5)'), espPlus5);

  const dMinus5 = new Date(dRef);
  dMinus5.setDate(dMinus5.getDate() - 5);
  const espMinus5 = `${dMinus5.getFullYear()}-${pad(dMinus5.getMonth() + 1)}-${pad(dMinus5.getDate())}`;
  assert.equal(a.run('obterDataLocal(-5)'), espMinus5);

  // 3. Mockar Date para testar cenários de borda
  a.run(`
    const _RealDate = Date;
    function mockData(ano, mesZeroBased, dia) {
      function CustomDate(...args) {
        if (args.length) return new _RealDate(...args);
        return new _RealDate(ano, mesZeroBased, dia, 12, 0, 0);
      }
      CustomDate.prototype = _RealDate.prototype;
      CustomDate.now = () => new _RealDate(ano, mesZeroBased, dia, 12, 0, 0).getTime();
      return CustomDate;
    }
  `);

  // 3a. Virada de ano (31/12/2026 + 1 dia => 2027-01-01)
  a.run('Date = mockData(2026, 11, 31);');
  assert.equal(a.run('obterDataLocal()'), '2026-12-31');
  assert.equal(a.run('obterDataLocal(1)'), '2027-01-01');

  // 3b. Virada de ano inversa (01/01/2026 - 1 dia => 2025-12-31)
  a.run('Date = mockData(2026, 0, 1);');
  assert.equal(a.run('obterDataLocal()'), '2026-01-01');
  assert.equal(a.run('obterDataLocal(-1)'), '2025-12-31');

  // 3c. Ano Bissexto (28/02/2024 + 1 dia => 2024-02-29)
  a.run('Date = mockData(2024, 1, 28);');
  assert.equal(a.run('obterDataLocal()'), '2024-02-28');
  assert.equal(a.run('obterDataLocal(1)'), '2024-02-29');

  // 3d. Ano Não-Bissexto (28/02/2025 + 1 dia => 2025-03-01)
  a.run('Date = mockData(2025, 1, 28);');
  assert.equal(a.run('obterDataLocal()'), '2025-02-28');
  assert.equal(a.run('obterDataLocal(1)'), '2025-03-01');

  // 3e. Preenchimento de zeros para dia e mês de 1 dígito (05/03/2026)
  a.run('Date = mockData(2026, 2, 5);');
  assert.equal(a.run('obterDataLocal()'), '2026-03-05');

  // Restaurar Date original
  a.run('Date = _RealDate;');
 });
 const report={data:new Date().toISOString(),tipo:'JSDOM com DOM e estado reais; áudio e dialog nativo não homologados por esta suíte',total:results.length,aprovados:results.filter(t=>t.ok).length,resultados:results};
 fs.writeFileSync(path.resolve(dir,'../revisao-bloco-a-2026-09-13/testes-confiabilidade.json'),JSON.stringify(report,null,2));
 console.log(`${report.aprovados}/${report.total} aprovados`);for(const r of results.filter(t=>!t.ok))console.error(r.nome,r.erro);
 if(report.aprovados!==report.total)process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1});
