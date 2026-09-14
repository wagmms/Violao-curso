(function(){
 'use strict';
 const d=window.CURSO_DADOS, guias=window.CURSO_GUIAS||{}, mapaMd=window.CURSO_MAPA_ESTUDO||'';
 const key='metodo_triade_geral_v1', ids=new Set(d.catalogoOriginal.flatMap(m=>m.aulas.map(a=>a.id)));
 const $=id=>document.getElementById(id);
 let state={versao:1,assistidos:[],praticados:[],notas:{}}, persist=true;
 const message=t=>{$('aviso').textContent=t;};

 function storageGet(k){
  try{return window.localStorage?window.localStorage.getItem(k):null;}
  catch(e){return null;}
 }
 function storageSet(k,v){
  try{if(!window.localStorage)return false;window.localStorage.setItem(k,v);return true;}
  catch(e){return false;}
 }

 function save(){
  if(!storageSet(key,JSON.stringify(state))){
   persist=false;
   message('Armazenamento local bloqueado ou indisponível. O catálogo funciona na memória desta sessão; exporte seu backup antes de fechar.');
  }
 }

 function valid(x){
  if(!x)throw Error('Arquivo vazio ou inválido.');
  const versao=x.versao||x.versao_backup;
  if(versao!==1||!Array.isArray(x.assistidos)||!Array.isArray(x.praticados)||!x.notas||typeof x.notas!=='object'||Array.isArray(x.notas))throw Error('Formato de backup não reconhecido.');
  for(const list of [x.assistidos,x.praticados])if(list.some(id=>typeof id!=='string'||!ids.has(id)))throw Error('Aula desconhecida no backup.');
  for(const [id,v]of Object.entries(x.notas))if(!ids.has(id)||typeof v!=='string')throw Error('Anotação inválida.');
  return{versao:1,assistidos:[...new Set(x.assistidos)],praticados:[...new Set(x.praticados)],notas:Object.fromEntries(Object.entries(x.notas))};
 }

 try{
  const raw=storageGet(key);
  if(raw)state=valid(JSON.parse(raw));
  else{
   for(const [field,oldkey]of [['assistidos','curso_violao_catalogo_assistidos_v1'],['praticados','curso_violao_catalogo_praticados_v1']]){
    const oldRaw=storageGet(oldkey);
    if(oldRaw){
     const old=JSON.parse(oldRaw);
     if(Array.isArray(old))state[field]=[...new Set(old.filter(id=>ids.has(id)))];
    }
   }
  }
 }catch(e){
  message('Não foi possível recuperar os registros locais anteriores. O catálogo continua disponível; use um backup válido.');
 }

 if(!storageSet('__storage_test__','1')){
  persist=false;
  message('Armazenamento local indisponível. O catálogo funciona nesta sessão; exporte seu backup antes de fechar a página.');
 }else{
  try{window.localStorage.removeItem('__storage_test__');}catch(e){}
  save();
 }

 const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

 function stats(){
  $('progresso').textContent=`${d.catalogoOriginal.reduce((n,m)=>n+m.aulas.length,0)} aulas catalogadas · ${state.assistidos.length} assistidas · ${state.praticados.length} praticadas. Marcações são registros pessoais, não certificação de domínio.`;
 }

 function formatInline(text){
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*([^\*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/\*([^\*]+)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>');
 }

 function renderMarkdown(md){
  const lines=md.split(/\r?\n/);
  let html='', inList=false, inTable=false, tableRows=[];
  function flushTable(){
   if(!inTable)return;
   html+='<table class="mapa-tabela"><tbody>';
   tableRows.forEach((row,idx)=>{
    const cells=row.split('|').slice(1,-1).map(c=>c.trim());
    if(idx===0)html+='<tr>'+cells.map(c=>`<th>${formatInline(c)}</th>`).join('')+'</tr>';
    else if(idx===1&&cells[0].includes('---')){}
    else html+='<tr>'+cells.map(c=>`<td>${formatInline(c)}</td>`).join('')+'</tr>';
   });
   html+='</tbody></table>';
   tableRows=[];inTable=false;
  }
  function flushList(){if(inList){html+='</ul>';inList=false;}}

  for(const line of lines){
   const trimmed=line.trim();
   if(!trimmed){flushList();flushTable();continue;}
   if(trimmed.startsWith('|')&&trimmed.endsWith('|')){flushList();inTable=true;tableRows.push(trimmed);continue;}
   else flushTable();
   if(trimmed.startsWith('# ')){flushList();html+=`<h1>${formatInline(trimmed.slice(2))}</h1>`;}
   else if(trimmed.startsWith('## ')){flushList();html+=`<h2>${formatInline(trimmed.slice(3))}</h2>`;}
   else if(trimmed.startsWith('### ')){flushList();html+=`<h3>${formatInline(trimmed.slice(4))}</h3>`;}
   else if(trimmed.startsWith('#### ')){flushList();html+=`<h4>${formatInline(trimmed.slice(5))}</h4>`;}
   else if(trimmed.startsWith('> ')){flushList();html+=`<blockquote>${formatInline(trimmed.slice(2))}</blockquote>`;}
   else if(trimmed.startsWith('- ')){
    if(!inList){html+='<ul>';inList=true;}
    html+=`<li>${formatInline(trimmed.slice(2))}</li>`;
   }else if(trimmed==='---'){flushList();html+='<hr>';}
   else{flushList();html+=`<p>${formatInline(trimmed)}</p>`;}
  }
  flushList();flushTable();
  return html;
 }

 function render(){
  const container=$('catalogo');container.replaceChildren();let shown=0;
  const query=normalize($('busca').value),mod=$('modulo').value,type=$('tipo').value;
  for(const m of d.catalogoOriginal){
   if(mod!=='todos'&&mod!==m.id)continue;
   const aulas=m.aulas.filter(a=>{
    if(query&&!normalize(m.nome+' '+a.grupo_aula+' '+a.materiais.map(x=>x.titulo).join(' ')).includes(query))return false;
    if(type==='video'||type==='pdf')return a.materiais.some(x=>x.tipo===type&&x.utilizavel);
    if(type==='disponivel')return a.temArquivos;
    if(type==='indisponivel')return !a.temArquivos;
    if(type==='assistidos')return state.assistidos.includes(a.id);
    if(type==='praticados')return state.praticados.includes(a.id);
    if(type==='com_guia')return Boolean(guias[a.id]);
    return true;
   });
   if(!aulas.length)continue;
   const section=node('section');section.append(node('h2',m.nome));
   for(const a of aulas){
    shown++;const card=node('details'),summary=node('summary',a.grupo_aula);card.append(summary);
    card.append(node('p',a.temArquivos?'Arquivos catalogados no backup.':'Indisponível no backup. Não foi localizado arquivo associado.'));
    const marks=node('div');marks.className='marks';
    for(const [field,label]of [['assistidos','Assistida'],['praticados','Praticada']]){
     const l=node('label'),input=node('input');input.type='checkbox';input.checked=state[field].includes(a.id);
     input.dataset.aulaId=a.id;input.dataset.field=field;
     input.onchange=()=>{state[field]=input.checked?[...new Set([...state[field],a.id])]:state[field].filter(id=>id!==a.id);save();stats();};
     l.append(input,document.createTextNode(label));marks.append(l);
    }
    card.append(marks);
    const list=node('ul');
    for(const mat of a.materiais){
     if(mat.tipo==='part-frag')continue;
     const li=node('li'),safe=(()=>{try{const u=new URL(mat.url);return u.protocol==='https:'&&u.hostname==='drive.google.com';}catch(e){return false;}})();
     if(mat.utilizavel&&safe){const link=node('a',mat.titulo);link.href=mat.url;link.target='_blank';link.rel='noopener noreferrer';li.append(link);}
     else li.append(node('span',mat.titulo+' — sem link de estudo disponível'));
     li.append(node('small',` · ${mat.tipo} · ${mat.status_verificacao||'catalogado'}`));list.append(li);
    }
    card.append(list);

    // Guia de estudo se houver guia homologado para a aula
    const guia=guias[a.id];
    if(guia){
     const gBox=node('details');gBox.className='guia-estudo';
     const gSum=node('summary','📖 Guia de Estudo Homologado');gSum.className='guia-resumo';
     gBox.append(gSum);

     const gBody=node('div');gBody.className='guia-corpo';
     if(guia.editorial){const ed=node('p',guia.editorial);ed.className='guia-editorial';gBody.append(ed);}

     const statusP=node('p');statusP.className='guia-aviso-status';
     const badge=node('span',`[${guia.status_obj||'Confirmado'}]`);badge.className='guia-badge';
     statusP.append(badge,document.createTextNode(' '+(guia.evidencia||'Registro de estudo complementar.')));
     gBody.append(statusP);

     const objP=node('p');const objH=node('strong','Objetivo Pedagógico: ');objP.append(objH,document.createTextNode(guia.obj||''));gBody.append(objP);
     const orcP=node('p');const orcH=node('strong','Gestão do Tempo (Sessão de 40 Minutos): ');orcP.append(orcH,document.createTextNode(guia.orcamento||''));gBody.append(orcP);
     const pratP=node('p');const pratH=node('strong','Sugestão de Prática Complementar: ');pratP.append(pratH,document.createTextNode(guia.pratica||''));gBody.append(pratP);
     const difP=node('p');const difH=node('strong','Ponto Crítico de Atenção / Dificuldade: ');difP.append(difH,document.createTextNode(guia.dificuldade||''));gBody.append(difP);

     const discP=node('small','Nota: O vídeo original é a referência primária. As orientações são complementos de estudo. As sínteses de fontes foram relatadas pelo executor; a aprovação do guia não equivale à inspeção integral dos vídeos pelo Codex.');
     discP.className='guia-disclaimer';gBody.append(discP);

     gBox.append(gBody);card.append(gBox);
    }

    const label=node('label','Anotações desta aula'),note=node('textarea');note.rows=3;note.value=state.notas[a.id]||'';note.id='nota-'+a.id;note.dataset.aulaId=a.id;label.htmlFor=note.id;
    const saveNote=()=>{state.notas[a.id]=note.value;save();};
    note.oninput=saveNote;note.onchange=saveNote;card.append(label,note);section.append(card);
   }
   container.append(section);
  }
  $('resultado').textContent=`${shown} aulas encontradas`;stats();
 }

 for(const m of d.catalogoOriginal){const o=node('option',m.nome);o.value=m.id;$('modulo').append(o);}
 for(const id of ['busca','modulo','tipo'])$(id).addEventListener(id==='busca'?'input':'change',render);

 $('exportar').onclick=()=>{
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=node('a');
  a.href=url;a.download='metodo-triade-backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };

 let pending=null;
 $('importar').onchange=async e=>{
  pending=null;$('aplicar').disabled=true;$('substituir').disabled=true;const f=e.target.files[0];if(!f)return;
  try{
   pending=valid(JSON.parse(await f.text()));
   message(`Backup válido: ${pending.assistidos.length} assistidas, ${pending.praticados.length} praticadas e ${Object.keys(pending.notas).length} anotações. Mesclar preserva suas anotações existentes; substituir troca esses registros.`);
   $('aplicar').disabled=false;$('substituir').disabled=false;
  }catch(err){message('Backup não aplicado: '+err.message);}
 };

 function apply(replace){
  if(!pending)return;
  if(replace&&!confirm('Substituir as marcações e anotações atuais pelo backup?'))return;
  state=replace?valid(pending):{versao:1,assistidos:[...new Set([...state.assistidos,...pending.assistidos])],praticados:[...new Set([...state.praticados,...pending.praticados])],notas:{...pending.notas,...state.notas}};
  save();render();pending=null;$('importar').value='';$('aplicar').disabled=true;$('substituir').disabled=true;if(persist)message('Backup aplicado com sucesso.');
 }

 $('aplicar').onclick=()=>apply(false);$('substituir').onclick=()=>apply(true);

 let elapsed=0,start=null;
 function timer(){
  const ms=elapsed+(start===null?0:Date.now()-start),s=Math.max(0,Math.ceil((2400000-ms)/1000));
  $('tempo').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  if(s===0&&start!==null){
   elapsed=2400000;start=null;$('iniciar').textContent='Retomar';
   message('40 minutos concluídos. Registre o que praticou; o cronômetro não marca aulas automaticamente.');
  }
 }

 $('iniciar').onclick=()=>{
  if(start===null){
   if(elapsed>=2400000)elapsed=0;
   start=Date.now();$('iniciar').textContent='Pausar';
  }else{
   elapsed+=Date.now()-start;start=null;$('iniciar').textContent='Retomar';
  }
  timer();
 };

 $('reiniciar').onclick=()=>{elapsed=0;start=null;$('iniciar').textContent='Iniciar';timer();};
 $('imprimir').onclick=()=>window.print();

 // Modal do Mapa de Estudo
 const modalMapa=$('modal-mapa');
 if($('btn-mapa')&&modalMapa){
  $('btn-mapa').onclick=()=>{
   if(mapaMd&&!$('corpo-mapa').hasChildNodes()){
    $('corpo-mapa').innerHTML=renderMarkdown(mapaMd);
   }
   if(typeof modalMapa.showModal==='function')modalMapa.showModal();
   else modalMapa.setAttribute('open','');
  };
  $('fechar-mapa').onclick=()=>{
   if(typeof modalMapa.close==='function')modalMapa.close();
   else modalMapa.removeAttribute('open');
  };
  modalMapa.addEventListener('click',e=>{
   if(e.target===modalMapa){
    if(typeof modalMapa.close==='function')modalMapa.close();
    else modalMapa.removeAttribute('open');
   }
  });
 }

 setInterval(timer,500);render();
})();
