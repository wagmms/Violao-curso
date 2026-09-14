const fs=require('fs'),path=require('path');
const root=__dirname,d=JSON.parse(fs.readFileSync(path.join(root,'EVENTOS.json'),'utf8').replace(/^\uFEFF/,''));
const errs=[],counts={}; const open={1:64,2:59,3:55,4:50,5:45,6:40};
const pitch=s=>{const m=/^([A-G])([#b]?)(\d)$/.exec(s);return m?12*(+m[3]+1)+{C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0):NaN};
function audit(ex,label){
 const a=ex.eventos; counts[label]=a.length;
 for(let c=1;c<=ex.total_compassos;c++)for(const v of new Set(a.map(x=>x.voz))){
  const es=a.filter(x=>x.compasso===c&&x.voz===v).sort((x,y)=>x.pulso_entrada-y.pulso_entrada);let cursor=1;
  for(const e of es){if(e.pulso_entrada!==cursor||e.termino_pulso!==e.pulso_entrada+e.duracao_pulsos||e.duracao_pulsos<=0)errs.push(`${label} c${c} ${v}: continuidade/duração`);cursor=e.termino_pulso;}
  if(cursor!==5)errs.push(`${label} c${c} ${v}: termina em ${cursor}`);
 }
 const notes=a.filter(x=>x.tipo!=='pausa');
 for(const e of notes)if(pitch(e.nota_soante)!==open[e.corda]+e.casa)errs.push(`${label} c${e.compasso}: altura ${e.nota_soante} ${e.corda}/${e.casa}`);
 for(let i=0;i<notes.length;i++)for(let j=i+1;j<notes.length;j++){
  const x=notes[i],y=notes[j],sx=4*(x.compasso-1)+x.pulso_entrada,sy=4*(y.compasso-1)+y.pulso_entrada;
  if(Math.max(sx,sy)<Math.min(sx+x.duracao_pulsos,sy+y.duracao_pulsos)){
   if(x.corda===y.corda)errs.push(`${label} c${x.compasso}: sobreposição corda ${x.corda}`);
   if(x.dedo_me&&x.dedo_me===y.dedo_me&&x.casa!==y.casa)errs.push(`${label} c${x.compasso}: dedo ME ${x.dedo_me} em casas distintas`);
  }
  if(sx===sy&&x.dedo_md===y.dedo_md)errs.push(`${label} c${x.compasso}: dedo MD ${x.dedo_md} em dois ataques`);
 }
}
for(const ex of d.exercicios){audit(ex,ex.id);for(const v of ex.variantes||[])audit(v,v.id);}
const md=fs.readFileSync(path.join(root,'EXERCICIOS.md'),'utf8');
let tables=[],rows=[];for(const line of md.split(/\r?\n/)){if(/^\|\s*\d+\s*\|/.test(line)){const r=line.split('|').slice(1,-1).map(x=>x.trim().replace(/\*+/g,''));if(r.length===11)rows.push(r);}else if(rows.length){tables.push(rows);rows=[];}}if(rows.length)tables.push(rows);
const expected=d.exercicios.flatMap(e=>[e,...(e.variantes||[])]);
if(tables.length!==expected.length)errs.push(`Tabelas ${tables.length} / versões JSON ${expected.length}`);
const key=e=>[e.compasso,e.voz.toLowerCase(),e.pulso_entrada,e.duracao_pulsos,e.nota_soante,e.corda??'—',e.casa??'—',e.dedo_me??'—',e.dedo_md??'—',e.termino_pulso].join('|');
const parsed=tables.map((rs,i)=>({id:`tabela-${i+1}`,total_compassos:Math.max(...rs.map(r=>+r[0])),eventos:rs.map(r=>({compasso:+r[0],voz:r[1].toLowerCase(),pulso_entrada:+r[2],duracao_pulsos:+r[3],nota_soante:r[4],corda:r[5]==='—'?null:+r[5].replace('ª',''),casa:r[6]==='—'?null:+r[6],dedo_me:r[7]==='—'?null:+r[7],dedo_md:r[8]==='—'?null:r[8],termino_pulso:+r[9].replace('Pulso ',''),tipo:r[4]==='Pausa'?'pausa':'ataque'}))}));
parsed.forEach(e=>audit(e,e.id));
const mapping=tables.length===expected.length?expected:tables.length===d.exercicios.length*2?d.exercicios.flatMap(e=>[e,null]):[];
parsed.forEach((e,i)=>{const match=mapping[i];if(match&&JSON.stringify(e.eventos.map(key).sort())!==JSON.stringify(match.eventos.map(key).sort()))errs.push(`Tabela divergente: ${match.id}`)});
const sessions=[];for(const unit of ['UNIDADE-02.md','UNIDADE-03.md']){
 const text=fs.readFileSync(path.join(root,unit),'utf8');const blocks=text.split(/(?=^## Semana \d+ · Sessão)/m).slice(1);
 if(blocks.length!==16)errs.push(`${unit}: ${blocks.length} sessões`);
 for(const b of blocks){const title=b.split('\n')[0];const rs=[...b.matchAll(/^\|\s*(\d+)[–-](\d+) min\s*\|\s*(\d+) min\s*\|/gm)];let c=0;for(const r of rs){if(+r[1]!==c||+r[2]-+r[1]!==+r[3])errs.push(`${title}: blocos inconsistentes`);c=+r[2];}if(c!==40)errs.push(`${title}: ${c} minutos`);sessions.push({title,minutos:c});}
}
const result={erros:[...new Set(errs)],eventos_por_versao:counts,tabelas:tables.length,sessoes:sessions.length,duracao_16_compassos_50_56_bpm:[64*60/56,64*60/50],limites:'Validação simbólica: não certifica conforto físico nem intenção harmônica.'};
fs.writeFileSync(path.join(root,'RESULTADO-VALIDACAO.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));process.exitCode=errs.length?1:0;
