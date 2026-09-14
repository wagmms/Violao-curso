// Auditoria de lógica em Node VM. Não inicia navegador, áudio ou localStorage real.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const base = path.resolve(__dirname, '../../interface-v2');
const elements = Object.fromEntries(['modal-resultado','res-atividade-nome','input-res-bpm','input-res-obs','btn-salvar-resultado','btn-fechar-resultado','select-res-status'].map(id => [id, {value:'', showModal(){}, close(){}}]));
const memory = new Map();
const window = {addEventListener(){}, scrollTo(){}, localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)}};
const ctx = vm.createContext({window,document:{getElementById:id=>elements[id]||null,querySelectorAll:()=>[]},console,setTimeout,clearTimeout});
vm.runInContext(fs.readFileSync(path.join(base,'dados-atividades.js'),'utf8'),ctx);
let code = fs.readFileSync(path.join(base,'app.js'),'utf8');
code = code.replace('window.__APP_TEST_API = {','window.__APP_TEST_API = { abrirModalResultado, carregarEstadoInicial,');
vm.runInContext(code,ctx);
const api = window.__APP_TEST_API;
const result = {ambiente:'Node VM; DOM mínimo simulado; sem navegador e sem avaliação acústica',achados:[]};
const add = (id, observado) => result.achados.push({id,observado});
const st = api.getState();
let malformed = null;
try {
  malformed = api.validarEsquemaBackup({versao:2,dificuldades:[null],atividadeAtualId:'inexistente',nivelExercicioAtual:'invalido'});
} catch (e) {
  malformed = { rejeitadoComErro: e.message };
}
add('backup-sem-validacao-profunda', Boolean(malformed && malformed.dados && malformed.dados.dificuldades && malformed.dados.dificuldades[0] === null && malformed.dados.atividadeAtualId === 'inexistente'));
st.sessao.elapsedMs = 600000;
api.setState(st);
add('sessao-excluida-da-restauracao',!Object.hasOwn(api.validarEsquemaBackup(JSON.parse(memory.get('metodo_triade_v2'))).dados,'sessao'));
st.atividadeAtualId = 'ativ-4';
add('escolha-inicial-nao-priorizada',api.obterRecomendacao().atividade.id);
st.nivelExercicioAtual = 'preparacao';
elements['select-res-status'].value = 'consegui';
const activity = window.PILOTO_ATIVIDADES[0];
for(let i=0;i<3;i++) { api.abrirModalResultado(activity); elements['btn-salvar-resultado'].onclick(); }
add('preparacao-aprova-habilidade',st.habilidades[activity.slug]);
add('tres-sucessos-revisoes-pendentes',st.revisoes.map(r=>({intervalo:r.intervaloDias,concluida:r.concluida})));
console.log(JSON.stringify(result,null,2));
