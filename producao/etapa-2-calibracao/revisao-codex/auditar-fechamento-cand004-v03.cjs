// Conferência independente das expectativas musicais; não importa validar-aula.cjs.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'../../..');
const dir=path.join(root,'producao/etapa-2-calibracao/v03-aula-completa/cand-004');
const read=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
const checks=[];
const check=(nome,ok)=>checks.push({nome,ok});
const e=read('EVENTOS.json').adaptacao_pedagogica.eventos;
const notes=['C4','C4','G4','G4','A4','A4','G4','F4','F4','E4','E4','D4','D4','C4'];
const durations=[1,1,1,1,1,1,2,1,1,1,1,1,1,2];
const positions={C4:[5,3],D4:[4,0],E4:[4,2],F4:[4,3],G4:[3,0],A4:[3,2]};
check('14 eventos',e.length===14);
let start=0;
for(let i=0;i<e.length;i++) {
 const v=e[i],p=positions[notes[i]];
 check('Evento '+(i+1),v.nota_escrita===notes[i]&&v.nota_sonora===notes[i][0]+'3'&&v.duracao_tempos===durations[i]&&v.inicio_tempo_global===start&&v.compasso===Math.floor(start/4)+1&&v.tempo_compasso===start%4+1&&v.violao_corda===p[0]&&v.violao_casa===p[1]);
 start+=durations[i];
}
check('16 tempos',start===16);
const base=JSON.parse(fs.readFileSync(path.join(root,'producao/etapa-0-inventario/v04/ARQUIVOS-FISICOS.json'),'utf8'));
const record=base.arquivos.find(v=>v.id==='arq-0408');
const bytes=fs.readFileSync(path.join(base.acervoRaiz,record.caminhoRelativo));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
check('Fonte real corresponde à base',bytes.length===51500&&sha(bytes)===record.sha256);
const a=read('aula.json');
check('Identidade e relações',a.id_pedagogico==='aula-ped-017-leitura-clave-sol'&&a.candidatoId==='cand-004'&&a.id_proposta==='aula-prop-017'&&a.modulo_pedagogico==='mod-ped-05'&&a.habilidade_id==='hab-lei-003');
const manifest=read('INSPECAO-GRAFICOS.json');
for(const r of manifest.recursos) check('Hash inspecionado '+r.arquivo,sha(fs.readFileSync(path.join(dir,r.arquivo)))===r.sha256);
for(const f of ['recursos/referencia-audio-sintese.wav','recursos/tarefa-transferencia/transferencia-audio-sintese.wav','recursos/pauta-adaptada.musicxml']) check('Preservado '+f,sha(fs.readFileSync(path.join(dir,f)))===sha(fs.readFileSync(path.join(root,'producao/etapa-2-calibracao/v02-aula-completa/cand-004',f))));
const report={data:'2026-09-14',checks,limites:['Executor e revisor desta rodada são Codex; não é revisão externa independente.','Script independente do validador de produção.','Sem escuta humana nova, teste de aluno ou certificação formal de schemas.']};
fs.writeFileSync(path.join(__dirname,'EVIDENCIAS-fechamento-cand004-v03.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:checks.length,falhas:checks.filter(c=>!c.ok)},null,2));
if(checks.some(c=>!c.ok))process.exitCode=1;
