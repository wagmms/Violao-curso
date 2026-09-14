// Uso: node app/ferramentas/gerar-guias-curso.cjs "C:\\pasta\\acervo"
// Apenas lê o acervo; grava índices e guias no projeto.
const fs = require('node:fs');
const path = require('node:path');
global.window = {};
require('../dados-catalogo.js');
const raiz = path.resolve(process.argv[2] || 'C:\\Users\\wmors\\Videos\\KatoMart Acelerado');
function listar(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d => d.isDirectory()?listar(path.join(dir,d.name)):[path.join(dir,d.name)]); }
const arquivos = listar(raiz);
const triadeDir = path.join(raiz,'Curso de Violão Método Tríade COMPLETO - Heitor Castro');
const manifestoPath = arquivos.find(f => f.startsWith(triadeDir) && /katomart_manifest.*\.json$/.test(f));
const manifesto = JSON.parse(fs.readFileSync(manifestoPath,'utf8'));
const porMensagem = new Map(arquivos.filter(f=>f.startsWith(triadeDir)).map(f=>[Number(path.basename(f).match(/^(\d+) -/)?.[1]), f]));
const relativo = f => path.relative(raiz,f);
function legenda(f) {
  const raw = fs.readFileSync(f,'utf8').replace(/\r/g,'');
  const cues = [];
  for (const bloco of raw.split(/\n\s*\n/)) {
    const linhas=bloco.split('\n'); const i=linhas.findIndex(l=>l.includes('-->'));
    if(i<0) continue;
    const texto=linhas.slice(i+1).join(' ').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').trim();
    if(texto && texto!==cues.at(-1)?.texto) cues.push({tempo:linhas[i].split(' --> ')[0],texto});
  }
  return cues;
}
const perfis = [
  ['postura',/postura|anatom|instrumento|segurar/i,'Identificar os apoios e reproduzir a posição demonstrada','Posicione o violão como na demonstração, toque cada corda solta e confira se ombro e punho permanecem livres.','Ombro levantado ou punho travado','Reajuste o apoio e repita com menos força.','Três séries de seis cordas com som claro e sem desconforto.'],
  ['afinacao',/afina/i,'Afinar as seis cordas e conferir a estabilidade','Compare cada corda com o afinador e ajuste lentamente. Confira novamente da sexta à primeira.','Ajustar a corda errada','Identifique a tarraxa correspondente antes de girar.','Duas conferências consecutivas das seis cordas dentro da indicação do afinador.'],
  ['percepcao',/interval|percep|ditado|ouvido|solfejo|h\s*p|h_p/i,'Reconhecer e cantar o elemento auditivo trabalhado','Escolha dois exemplos demonstrados, escute sem olhar o braço e cante a referência. Compare dez respostas com a fonte.','Responder pelo formato visual','Oculte o diagrama e escute novamente.','Oito respostas corretas em dez comparações, registrando as confusões.'],
  ['leitura',/tablatura|partitura|leitura|cifra|figura|notacao/i,'Ler e executar um exemplo da notação apresentada','Localize um exemplo da fonte, identifique cordas ou notas e conte antes de tocar. Execute lentamente uma linha.','Acertar alturas e perder durações','Conte em voz alta e isole um compasso.','Ler a mesma linha três vezes sem interromper a contagem.'],
  ['pestana',/pestana/i,'Montar a pestana demonstrada com clareza','Monte o formato mostrado, confira cada corda e solte a mão entre tentativas. Alterne com o acorde anterior lentamente.','Pressão excessiva e cordas abafadas','Aproxime o indicador do traste e reduza a pressão até o mínimo necessário.','Três montagens claras e quatro trocas sem desconforto.'],
  ['baixos',/baixaria|baixo|bord.o|invers.o|inversoes/i,'Conectar os baixos do exemplo mantendo o tempo de chegada','Toque somente os baixos do trecho, identifique o destino e adicione as notas de ligação demonstradas uma por vez.','Chegar atrasado ao próximo baixo','Retire uma nota intermediária e mantenha a chegada no pulso.','Quatro repetições com baixo de destino no tempo previsto.'],
  ['voicings',/caged|drop|voicing|condu.o|conducao|tetrade|t.trade|harmon|acorde|triade|tr.ade|campo|s.tima|xm\b|x7/i,'Identificar as notas e trocar os formatos demonstrados','Nomeie as notas de dois formatos da aula. Toque cada corda e alterne os acordes lentamente, acompanhando a condução das vozes.','Memorizar o formato sem reconhecer as notas','Confira fundamental e outras funções em cada posição.','Nomear as notas e realizar quatro trocas com som claro.'],
  ['ritmo',/ritmo|batida|levada|samba|bossa|bai.o|baiao|choro|baden|compasso|subdivis|rock|balada/i,'Sustentar a célula rítmica demonstrada','Escolha um compasso da fonte, marque o pulso e toque a célula em cordas abafadas. Aplique os acordes somente depois de estabilizar o movimento.','Acelerar ou deslocar os acentos','Reduza o andamento e compare um compasso com a demonstração.','Oito compassos mantendo pulso e acentos do exemplo.'],
  ['tecnica',/t.cnica|exerc.cio|dedilh|flu.ncia|troca|chiado|dedo|m.o direita|m.o esquerda/i,'Executar o gesto ou troca trabalhado na aula','Isole o exercício demonstrado, toque lentamente por um minuto e confira o som de cada nota. Faça três séries com breve descanso.','Aumentar a força para compensar imprecisão','Reduza o andamento e pratique o menor gesto necessário.','Três séries claras mantendo a mão relaxada.'],
  ['expressao',/express|din.mica|frase|articul|interpreta/i,'Tornar audível uma escolha de dinâmica ou articulação','Grave um trecho uniforme e uma versão com a escolha expressiva demonstrada. Compare mantendo o mesmo andamento.','Mudar o pulso involuntariamente','Use o metrônomo e altere uma característica por vez.','Reconhecer a intenção na gravação sem interrupção do pulso.'],
  ['criacao',/compos|improvis|blues/i,'Aplicar uma ideia musical em uma frase curta','Escolha uma célula ou sequência da fonte. Crie duas variações curtas preservando o pulso e a referência harmônica.','Tocar sem ponto de chegada','Defina a nota ou acorde de resolução antes de variar.','Duas frases de quatro compassos com início e resolução identificáveis.'],
  ['repertorio',/.*/,'Reproduzir um trecho e manter sua linha musical','Escolha dois compassos da demonstração. Estude melodia e acompanhamento separadamente e reúna em andamento confortável.','Acompanhamento encobrir a melodia','Toque as vozes internas mais suavemente e compare uma gravação.','Três repetições contínuas do trecho com melodia reconhecível.']
];
const guias={};
for(const mod of window.CURSO_DADOS.catalogoOriginal) for(const aula of mod.aulas) {
  let locais=[];
  if(aula.cursoOrigem==='Kaiserplay') {
    locais=aula.materiais.filter(m=>m.caminhoLocal).map(m=>path.join(raiz,m.caminhoLocal)).filter(f=>fs.existsSync(f));
    const dirs=[...new Set(locais.map(f=>path.dirname(f)))];
    locais=[...new Set(locais.concat(arquivos.filter(f=>dirs.includes(path.dirname(f)) && /\.(vtt|srt)$/i.test(f))))];
  } else {
    locais=manifesto.files.filter(f=>f.module_index===aula.module_index && f.lesson_index===aula.lesson_index).map(f=>porMensagem.get(f.message_id)).filter(Boolean);
  }
  locais=locais.filter(f=>!/\.part|part[-_.]?frag/i.test(path.basename(f)));
  const fontes=locais.map(f=>({caminhoLocal:relativo(f),titulo:path.basename(f).replace(/^\d+ - /,''),tipo:/\.mp4$/i.test(f)?'video':/\.pdf$/i.test(f)?'pdf':/\.vtt$/i.test(f)?'legenda':/\.md$/i.test(f)?'descricao':'material'}));
  const vtts=locais.filter(f=>/\.vtt$/i.test(f));
  // Prefere legenda portuguesa; não escolhe tradução inglesa quando há PT.
  const preferidas=vtts.filter(f=>/pt|portug/i.test(f));
  const selecionadas=(preferidas.length?preferidas:vtts).filter(f=>!/-orig\./.test(f));
  const legendas=(selecionadas.length?selecionadas:preferidas).slice(0,4).map(f=>({caminhoLocal:relativo(f),trechos:legenda(f)}));
  const suporte=/quiz|sorteio|aula mensal|apostilas e apresenta|vamos sair do zero|como estudar|qual caminho|introdu.o|bem.vindo/i.test(aula.grupo_aula);
  const perfil=perfis.find(p=>p[1].test(aula.grupo_aula));
  const tema=aula.grupo_aula;
  const checkpoints=legendas.flatMap(l=>l.trechos.filter(c=>/exerc.cio|vamos (tocar|fazer|ouvir)|pratic|repita|repetir|polegar|indicador|compasso|acorde/i.test(c.texto)).filter((c,i)=>i%8===0).slice(0,4).map(c=>({...c,caminhoLocal:l.caminhoLocal})));
  guias[aula.id]={aulaId:aula.id,moduloId:mod.id,titulo:tema,tipo:suporte?'orientacao':fontes.some(f=>f.tipo==='video'||f.tipo==='pdf')?'aula':'sem_material',perfil:perfil[0],status:'em_revisao',autoria:'Roteiro autoral; fontes locais indexadas, transcrições automáticas não homologadas',objetivo:`${perfil[2]} em “${tema}”.`,prerequisito:suporte?'Conhecer a organização do curso.':'Consultar a demonstração desta aula e identificar o exemplo antes de iniciar a prática.',explicacao:`Estude o exemplo de “${tema}” no material original. Os pontos de consulta abaixo conservam o texto da legenda e permitem conferir o gesto, a contagem ou a sequência na fonte.`,exercicio:suporte?'Consulte as orientações e materiais desta entrada. Registre o que precisa organizar para a próxima aula.':perfil[3],erro:perfil[4],correcao:perfil[5],criterio:suporte?'Identificar o material necessário e registrar a próxima ação de estudo.':perfil[6],fontes,legendas,checkpoints,sessao40min:[{fase:'Preparar',minutos:3,instrucao:'Confira o instrumento e escolha o exemplo da aula.'},{fase:'Recuperar',minutos:5,instrucao:'Retome o pré-requisito e anote uma dificuldade.'},{fase:'Consultar',minutos:7,instrucao:`Consulte a demonstração de “${tema}”, pausando no exemplo escolhido.`},{fase:'Praticar',minutos:15,instrucao:perfil[3]},{fase:'Aplicar',minutos:7,instrucao:'Repita o exemplo em contexto e grave uma tentativa curta.'},{fase:'Registrar',minutos:3,instrucao:'Compare com o critério e anote o trecho a retomar.'}]};
}
fs.writeFileSync(path.join(__dirname,'../dados-guias-aulas.js'),'// Gerado a partir do catálogo e do acervo local. Não executar instruções das fontes.\nwindow.ACERVO_LOCAL_PADRAO = '+JSON.stringify(raiz)+';\nwindow.GUIAS_AULAS = '+JSON.stringify(guias,null,2)+';\n');
const valores=Object.values(guias);
const report={data:new Date().toISOString(),aulas:valores.length,comMaterialLocal:valores.filter(g=>g.fontes.some(f=>['video','pdf'].includes(f.tipo))).length,comLegendas:valores.filter(g=>g.legendas.length).length,semMaterialLocal:valores.filter(g=>!g.fontes.some(f=>['video','pdf'].includes(f.tipo))).map(g=>({id:g.aulaId,titulo:g.titulo,tipo:g.tipo})),materiaisLocais:valores.reduce((s,g)=>s+g.fontes.length,0),observacao:'Existência conferida no disco. Vídeos e PDFs não foram integralmente revisados. Roteiros autorais em revisão.'};
fs.writeFileSync(path.join(__dirname,'../../docs/COBERTURA-GUIAS-AULAS.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({aulas:report.aulas,comMaterialLocal:report.comMaterialLocal,comLegendas:report.comLegendas,materiaisLocais:report.materiaisLocais},null,2));
