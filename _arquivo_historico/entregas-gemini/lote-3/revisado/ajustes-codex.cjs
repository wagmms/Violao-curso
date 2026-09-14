const fs=require('fs'),path=require('path');
const root=__dirname;
const read=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/^\uFEFF/,'');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const data=JSON.parse(read('EVENTOS.json'));
const versions=data.exercicios.flatMap(e=>[e,...e.variantes]);
const count=versions.reduce((n,e)=>n+e.eventos.length,0);
for(const f of ['VERIFICACAO.md','RESUMO-REVISAO.md'])write(f,read(f).replaceAll('275',String(count)));
let u3=read('UNIDADE-03.md');
u3=u3.replace('quinta G3 (3/0) ou D4 (2/3)','oitava G3 (3/0), quinta D4 (2/3)');
u3=u3.replace('em menos de 10 segundos por acorde','em andamento livre, sem limite de tempo para responder');
u3=u3.replace('a sonoridade de C/E é mais aberta, fluida e menos pesada que a fundamental','compare a sonoridade de C/E com a posição fundamental e descreva a diferença que você percebe');
u3=u3.replace('Executar o Exercício 4 duas vezes consecutivas a 52 BPM sem hesitações de digitação.','Executar o Exercício 4 duas vezes consecutivas em andamento confortável anotado, com continuidade.');
u3=u3.replace('a 2ª inversão tem uma sonoridade pastoral e suspensa característica da música brasileira','o baixo na quinta altera a disposição do acorde; compare a sonoridade e descreva o que percebe');
u3=u3.replace('5. **Fontes de Vídeo:**','5. **Andamento e avaliação:** BPMs nos blocos são sugestões ajustáveis. Para avançar, obter pelo menos 2 em continuidade rítmica, clareza sonora, equilíbrio entre vozes e compreensão/autonomia em duas sessões distintas. Se a primeira entrega ocorrer em 12C, repetir 12C em outro dia antes de avançar; não depender da sessão D.\n6. **Fontes de Vídeo:**');
u3=u3.replace('Gravação dos 8 compassos de Ex. 6 salva com sucesso e inversões justificadas por escrito.','Gravação dos 8 compassos de Ex. 6 e inversões justificadas por escrito. A conclusão exige pontuação mínima 2 nas quatro dimensões, confirmada em outra sessão obrigatória 12C em dia distinto.');
write('UNIDADE-03.md',u3);
let md=read('EXERCICIOS.md');
md=md.replace('Tríades sustentadas em semibreves completas sem movimento melódico intermediário.','Voicings sustentados por quatro pulsos, sem movimento melódico intermediário. No c.3, G2–G3–D4 omite a terça: é uma preparação contextual de Sol, não uma tríade completa.');
md=md.replace('### Tabela de Eventos — Exercício 4 (Versão Principal)','No Ex.4 c.1, a terça E4 deixa de soar quando entra G4 no pulso 3; a segunda metade omite a terça de C. No c.3, G2–G3–B3 omite a quinta na primeira metade e G2–G3–D4 omite a terça na segunda. São voicings contextuais, não tríades completas em todos os instantes.\n\n### Tabela de Eventos — Exercício 4 (Versão Principal)');
md=md.replace('é um acorde dominante **sem terça** (G–D–F, a terça Si é omitida em favor da quinta e da sétima menor).','na primeira metade soa G–D–D (Sol sem terça); F4 entra apenas no pulso 3, formando então G7 sem terça (G–D–F). A função dominante decorre do contexto da frase.');
md=md.replace('### Tabela de Eventos — Exercício 6 (Versão Principal)','No Ex.6 c.1, a segunda metade omite a terça de C; c.3 contém Am sem quinta (A–A–C), e c.8 contém C sem terça (C–G–C). São reduções contextuais.\n\n### Tabela de Eventos — Exercício 6 (Versão Principal)');
function tab(e){
 const lines=['4/4; cada coluna representa um pulso. Número = ataque; = = sustentação; . = silêncio.','Encerrar o som na duração indicada na tabela; em cada barra todas as notas são encerradas ou rearticuladas.'];
 for(let start=1;start<=e.total_compassos;start+=4){
  const bars=Array.from({length:Math.min(4,e.total_compassos-start+1)},(_,i)=>start+i);
  lines.push('c.     '+bars.map(c=>String(c).padEnd(16)).join('|'));
  lines.push('pulso  '+bars.map(()=>[1,2,3,4].map(p=>String(p).padEnd(4)).join('')).join('|'));
  for(let s=1;s<=6;s++)lines.push(`${s}ª     `+bars.map(c=>[1,2,3,4].map(p=>{
   const n=e.eventos.find(x=>x.tipo!=='pausa'&&x.compasso===c&&x.corda===s&&x.pulso_entrada<=p&&x.termino_pulso>p);
   return(n?(n.pulso_entrada===p?String(n.casa):'='):'.').padEnd(4);
  }).join('')).join('|'));
 }
 return '```text\n'+lines.join('\n')+'\n```';
}
let i=0;md=md.replace(/```text[\s\S]*?```/g,()=>tab(data.exercicios[i++]));
if(i!==6)throw Error(`Esperadas 6 tablaturas principais, recebidas ${i}`);
write('EXERCICIOS.md',md);
write('TABLATURAS-COMPLETAS.md','# Tablaturas das 12 versões — conferidas por eventos\n\nA tabela de eventos em EXERCICIOS.md informa vozes, dedos e durações. Cordas numeradas de 1 (prima) a 6 (bordão). Pausas exigem cessação do som; ponto não é novo ataque.\n\n'+versions.map(e=>'## '+e.id+'\n\n'+tab(e)).join('\n\n')+'\n');
write('VERIFICACAO.md',read('VERIFICACAO.md')+'\n## Complemento Codex — 13/09/2026\n\nCorrigida a contagem para '+count+' eventos por representação (JSON e Markdown). As seis tabs principais foram regeneradas dos eventos com colunas de um pulso; TABLATURAS-COMPLETAS.md inclui também as variantes. Corrigidos classificação de G3, explicações de voicings e critérios de avaliação. A validação de acorde do script examina sete compassos principais; não é uma interpretação harmônica de todos os exercícios.\n');
console.log(JSON.stringify({versoes:versions.length,eventos:count,tablaturas_principais:i}));
