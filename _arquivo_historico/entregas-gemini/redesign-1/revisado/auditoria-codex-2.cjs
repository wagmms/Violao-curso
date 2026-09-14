// Revisão independente de lógica. Não inicia navegador nem usa dados reais do aluno.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const base=path.resolve(__dirname,'../../../interface-v2');
let now=1000000;
class Clock extends Date { static now(){return now;} }
const elements=Object.fromEntries(['modal-resultado','res-atividade-nome','input-res-bpm','input-res-obs','btn-salvar-resultado','btn-fechar-resultado','select-res-status','timer-regressivo','btn-timer-toggle'].map(id=>[id,{value:'',showModal(){},close(){}}]));
const memory=new Map();
const window={addEventListener(){},scrollTo(){},localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)}};
const context=vm.createContext({window,document:{getElementById:id=>elements[id]||null,querySelectorAll:()=>[]},console,Date:Clock,setTimeout,clearTimeout,setInterval:()=>1,clearInterval(){},alert(){}});
vm.runInContext(fs.readFileSync(path.join(base,'dados-atividades.js'),'utf8'),context);
let code=fs.readFileSync(path.join(base,'app.js'),'utf8').replace('window.__APP_TEST_API = {','window.__APP_TEST_API = { abrirModalResultado, atualizarTimer, carregarEstadoInicial,');
vm.runInContext(code,context);
const api=window.__APP_TEST_API,st=api.getState(),activity=window.PILOTO_ATIVIDADES[0];
const report={ambiente:'Node VM, DOM mínimo e relógio simulado; sem navegador ou avaliação acústica',achados:[]};
const add=(id,observado)=>report.achados.push({id,observado});
const save=(nivel,status)=>{st.nivelExercicioAtual=nivel;api.abrirModalResultado(activity);elements['select-res-status'].value=status;elements['btn-salvar-resultado'].onclick();};
for(let i=0;i<3;i++)save('alvo','consegui');
add('sucessos-alvo',st.revisoes.map(r=>({dias:r.intervaloDias,concluida:r.concluida})));
save('preparacao','consegui');
add('pendentes-apos-preparacao',st.revisoes.filter(r=>!r.concluida).length);
st.habilidades=Object.fromEntries(window.PILOTO_ATIVIDADES.map(a=>[a.slug,{status:'alvo_demonstrado'}]));
st.dificuldades=[];st.revisoes=[];st.sessao.elapsedMs=0;
try{add('todas-demonstradas',api.obterRecomendacao());}catch(e){add('todas-demonstradas',e.message);}
const backup=JSON.parse(JSON.stringify(st));
backup.tentativas=[{atividadeId:'ativ-1',nivel:'alvo',status:'consegui',bpm:-100}];
backup.revisoes=[{id:'r',atividadeId:'ativ-1',intervaloDias:2,concluida:false,dataPrevista:{},ciclo:'abc'}];
backup.legado={assistidos:2,praticados:null,notas:[]};
backup.sessao={atividadeId:'ativ-1',nivel:'alvo',elapsedMs:'Infinity',passoIndex:-20};
try{const v=api.validarEsquemaBackup(backup);add('backup-malformado-aceito',{bpm:v.dados.tentativas[0].bpm,ciclo:v.dados.revisoes[0].ciclo,legado:v.dados.legado,elapsedMs:v.dados.sessao.elapsedMs,passo:v.dados.sessao.passoIndex});}catch(e){add('backup-malformado-rejeitado',e.message);}
st.sessao.elapsedMs=0;st.sessao.ativa=true;st.sessao.ultimoTimestamp=now;st.sessao.atividadeId='ativ-1';
api.setState(st);
now+=600000;api.atualizarTimer();
add('timer-10-minutos',{visor:elements['timer-regressivo'].textContent,salvo:JSON.parse(memory.get('metodo_triade_v2')).sessao.elapsedMs});
now+=1800000;api.atualizarTimer();
add('timer-concluido',{visor:elements['timer-regressivo'].textContent,salvo:JSON.parse(memory.get('metodo_triade_v2')).sessao.elapsedMs});
console.log(JSON.stringify(report,null,2));
