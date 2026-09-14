// Guias autorais de módulo. Não substituem nem atestam o conteúdo dos vídeos.
window.GUIAS_MODULOS = [
  ['Postura confortável e primeiros sons', 'Reconhecer as seis cordas e tocar sem tensão.', 'Violão afinado e apoio estável.', 'Aproxime o instrumento do corpo e deixe ombros e punhos livres.', 'Toque cada corda solta com o polegar, nomeie-a e deixe ressoar. Repita três vezes.', 'Ombro levantado: reposicione o apoio e reduza a força.', 'Nomear as seis cordas e produzir três séries sem desconforto.'],
  ['Trocas com continuidade', 'Trocar A e D mantendo o pulso.', 'Produzir A e D separadamente com clareza.', 'Prepare o próximo formato antes da troca; a velocidade vem depois da clareza.', 'A 50 BPM, alterne quatro tempos de A e quatro de D por oito compassos.', 'Parar na troca: reduza o BPM e isole a passagem.', 'Oito compassos com trocas no primeiro tempo e sem interromper a contagem.'],
  ['Percepção de intervalos', 'Comparar distâncias sonoras sem depender do braço.', 'Distinguir sons mais graves e mais agudos.', 'Cante a primeira nota e compare a segunda com essa referência.', 'Use o treinador de ouvido em Praticar. Faça dez comparações, cante as notas e anote as confusões.', 'Responder pelo desenho: escute novamente antes de consultar a resposta.', 'Oito acertos em dez comparações; repetir em outro dia para confirmar.'],
  ['Ritmo e primeiro repertório', 'Sustentar o acompanhamento de um trecho simples.', 'Trocar os acordes do trecho em andamento lento.', 'Separe a sequência dos acordes do movimento rítmico antes de reuni-los.', 'Escolha quatro compassos de uma aula deste módulo. Bata o ritmo em cordas abafadas e depois aplique os acordes a 50 BPM.', 'Perder o pulso na troca: pratique o ritmo abafado e reúna uma troca por vez.', 'Três repetições do trecho com contagem contínua e acordes na posição correta.'],
  ['Pestana e acordes com sétima', 'Produzir F com pressão suficiente e sem dor.', 'Montar acordes abertos com punho relaxado.', 'Coloque o indicador próximo ao traste e aplique somente a pressão necessária.', 'Monte F, confira cada corda separadamente e solte a mão entre tentativas. Alterne C e F em quatro tempos lentos.', 'Apertar com o polegar excessivamente: solte, reposicione e tente com menos força.', 'Três montagens claras de F e quatro trocas C–F sem dor.'],
  ['Bossa nova e independência', 'Separar baixo e bloco de acordes.', 'Em claro e pulso binário estável.', 'O baixo e o bloco agudo têm funções diferentes; mantenha cada camada regular.', 'Em 2/4 a 50 BPM, toque o baixo de Em no tempo 1 e o bloco agudo no tempo 2 por oito compassos. Depois consulte a atividade de bossa.', 'Acentuar tudo igualmente: toque o bloco mais leve que o baixo.', 'Oito compassos com camadas claras e sem acelerar.'],
  ['Samba, choro e baião', 'Reconhecer e reproduzir uma célula rítmica brasileira.', 'Contar subdivisões em compasso binário.', 'Cada gênero tem acentos próprios. Estude uma célula da fonte antes de combinar padrões.', 'Escolha uma aula do módulo. Ouça quatro compassos, marque o pulso e reproduza a célula em cordas abafadas, em andamento confortável.', 'Misturar padrões: compare com a mesma passagem da fonte e isole um compasso.', 'Repetir a célula quatro vezes mantendo os acentos identificados na fonte.'],
  ['Ataque e dinâmica de Baden Powell', 'Contrastar baixo e resposta de acordes.', 'Em montado e articulação confortável de p e i-m-a.', 'O contraste de ataque deve vir do gesto controlado, sem travar o braço.', 'Em 2/4 a 50 BPM, toque a sexta corda solta no tempo 1 e responda nas cordas 3, 2 e 1 de Em no tempo 2 por oito compassos.', 'Tensionar o braço para aumentar volume: reduza o ataque e retome gradualmente.', 'Oito compassos com contraste audível e ombros relaxados.'],
  ['Condução dos baixos', 'Construir uma ligação melódica nos bordões.', 'Identificar o baixo de dois acordes.', 'A baixaria conecta destinos harmônicos; escolha o baixo de chegada antes das notas intermediárias.', 'Escolha dois acordes de uma aula, toque apenas seus baixos e copie uma ligação curta demonstrada na fonte em andamento lento.', 'Baixo de chegada atrasado: retire notas intermediárias e reconstrua a passagem.', 'Quatro repetições chegando ao baixo do próximo acorde no tempo previsto.'],
  ['CAGED e condução de vozes', 'Comparar posições do mesmo acorde no braço.', 'Conhecer fundamental, terça e quinta.', 'As posições representam as mesmas funções em registros diferentes. Identifique notas antes de mover formatos.', 'Escolha duas posições do mesmo acorde demonstradas na aula. Nomeie as notas e alterne os formatos lentamente.', 'Mover formatos sem conferir notas: toque cada voz e identifique sua função.', 'Identificar as notas das duas posições e executar quatro trocas claras.'],
  ['Melodia acompanhada', 'Destacar a melodia sobre o acompanhamento.', 'Tocar separadamente a melodia e os baixos do trecho.', 'A melodia precisa permanecer reconhecível quando o acompanhamento entra.', 'Escolha dois compassos de arranjo do módulo. Toque a melodia, depois os baixos, e reúna com acompanhamento mais suave.', 'Acordes cobrem a melodia: reduza o volume das vozes internas e grave outra tentativa.', 'Três repetições nas quais a melodia possa ser cantada a partir da gravação.'],
  ['Expressão e harmonização', 'Executar um trecho com uma escolha expressiva consciente.', 'Tocar o trecho sem interrupções em andamento confortável.', 'Dinâmica e articulação devem apoiar a frase e preservar o pulso.', 'Escolha quatro compassos já dominados. Grave uma versão uniforme e outra com crescimento e resolução de intensidade.', 'Alterar o andamento sem intenção: repita com metrônomo e varie somente a intensidade.', 'Comparar as gravações e reconhecer a frase expressiva sem perda do pulso.']
].map((g, i) => ({moduloId: `mod-${i + 1}`, titulo:g[0], objetivo:g[1], prerequisito:g[2], explicacao:g[3], exercicio:g[4], correcao:g[5], criterio:g[6], autoria:'Complemento autoral — em revisão'}));

function validarAprendizagemCurso(valor) {
  const aulas = window.CURSO_DADOS.catalogoOriginal.flatMap(m => m.aulas);
  const ids = new Set(aulas.map(a => a.id));
  const seguro = {aulaAtualId:null, progresso:{}};
  if (!valor || typeof valor !== 'object') return seguro;
  if (ids.has(valor.aulaAtualId)) seguro.aulaAtualId = valor.aulaAtualId;
  for (const [id, p] of Object.entries(valor.progresso || {})) {
    if (ids.has(id) && p && typeof p === 'object') seguro.progresso[id] = {consultada:p.consultada === true, praticada:p.praticada === true, nota:typeof p.nota === 'string' ? p.nota.slice(0, 10000) : ''};
  }
  return seguro;
}

function abrirAulaCurso(id) {
  if (!window.CURSO_DADOS.catalogoOriginal.some(m => m.aulas.some(a => a.id === id))) return;
  pausarSessao();
  state.aprendizagemCurso = validarAprendizagemCurso(state.aprendizagemCurso);
  state.aprendizagemCurso.aulaAtualId = id;
  salvarEstado();
  navegarPara('aprender');
}

function materialLocalURL(mat) {
  // Caminhos relativos ao acervo configurado; rejeita travessias e esquemas.
  const caminho = mat.caminhoLocal;
  if (!caminho || /(^[\\/]|:|(^|[\\/])\.\.([\\/]|$))/.test(caminho)) return '';
  const base = storageGet('metodo_triade_acervo_local') || window.ACERVO_LOCAL_PADRAO;
  if (!base || !/^[a-z]:[\\/]/i.test(base)) return '';
  const partes = (base.replace(/[\\/]+$/, '') + '/' + caminho).replace(/\\/g, '/').split('/');
  return 'file:///' + partes.map((p,i) => i === 0 ? p : encodeURIComponent(p)).join('/');
}

function renderizarMaterialCurso(mat) {
  const label = escapeHTML(`${mat.tipo.toUpperCase()}: ${mat.titulo}`);
  if (urlDriveValida(mat.url) && mat.utilizavel) return `<a href="${escapeHTML(mat.url)}" target="_blank" rel="noopener noreferrer">↗ ${label}</a>`;
  const conhecidos = window.CAMINHOS_LOCAIS_CURSO ||= new Set(Object.values(window.GUIAS_AULAS || {}).flatMap(g => g.fontes.map(f => f.caminhoLocal)));
  const local = conhecidos.has(mat.caminhoLocal) ? materialLocalURL(mat) : '';
  if (local) return `<a href="${escapeHTML(local)}" target="_blank" rel="noopener noreferrer">📁 ${label}</a>`;
  return `<span>${label}${mat.caminhoLocal ? (conhecidos.has(mat.caminhoLocal) ? ' — configure a pasta do acervo local' : ' — arquivo não encontrado no índice local') : ' — sem arquivo acessível'}</span>`;
}

function renderizarAulaCurso() {
  state.aprendizagemCurso = validarAprendizagemCurso(state.aprendizagemCurso);
  const contexto = state.aprendizagemCurso;
  const mods = window.CURSO_DADOS.catalogoOriginal;
  const mod = mods.find(m => m.aulas.some(a => a.id === contexto.aulaAtualId));
  if (!mod) return false;
  const aula = mod.aulas.find(a => a.id === contexto.aulaAtualId);
  const guiaModulo = window.GUIAS_MODULOS.find(g => g.moduloId === mod.id);
  const guia = window.GUIAS_AULAS[aula.id];
  const p = contexto.progresso[aula.id] || {};
  const relacionadas = atividadesDados.filter(t => t.fontes?.some(f => f.aulaId === aula.id));
  const sequencia = mods.flatMap(m => m.aulas);
  const indice = sequencia.findIndex(a => a.id === aula.id);
  $('aprender-conteudo').innerHTML = `
    <div class="view-header"><h2>${escapeHTML(mod.nome)}</h2><p>${escapeHTML(aula.grupo_aula)} · ${escapeHTML(aula.cursoOrigem)}</p></div>
    <div class="biblioteca-toolbar"><label>Módulo <select id="curso-modulo">${mods.map(m => `<option value="${m.id}" ${m.id===mod.id?'selected':''}>${escapeHTML(m.nome)}</option>`).join('')}</select></label>
    <label>Aula <select id="curso-aula">${mod.aulas.map(a => `<option value="${escapeHTML(a.id)}" ${a.id===aula.id?'selected':''}>${escapeHTML(a.grupo_aula)}</option>`).join('')}</select></label></div>
    <div class="aprender-layout"><div>
    <section class="bloco-card"><h4>Materiais desta aula</h4>${!aula.temArquivos?'<p>Esta entrada não tem arquivo de aula no catálogo. Pode ser um quiz ou item de plataforma; classificação pendente.</p>':''}<ul>${aula.materiais.map(m => `<li>${renderizarMaterialCurso(m)}</li>`).join('')}</ul>
    <h5>Arquivos conferidos no acervo local</h5><ul>${guia.fontes.map(m => `<li>${renderizarMaterialCurso(m)}</li>`).join('') || '<li>Nenhum material local encontrado para esta entrada.</li>'}</ul>
    <label>Pasta raiz do acervo local <input id="curso-pasta" placeholder="C:\\Acervo" value="${escapeHTML(storageGet('metodo_triade_acervo_local')||window.ACERVO_LOCAL_PADRAO||'')}"></label><button id="curso-salvar-pasta" class="btn btn-secondary">Salvar pasta</button><p>Use a pasta que contém os dois cursos. Links locais funcionam ao abrir o aplicativo por arquivo. A existência foi conferida na geração do índice.</p></section>
    <section class="bloco-card"><h4>Meu estudo desta aula</h4><label><input type="checkbox" id="curso-consultada" ${p.consultada?'checked':''}> Consultei o material</label><br><label><input type="checkbox" id="curso-praticada" ${p.praticada?'checked':''}> Pratiquei o trecho</label><textarea id="curso-nota" placeholder="Trecho estudado, resultado e dúvida" style="width:100%;min-height:100px">${escapeHTML(p.nota||'')}</textarea><p>Este registro é independente da avaliação das atividades de 40 minutos.</p></section>
    </div><div><section class="bloco-card"><h4>Roteiro desta aula</h4><p>${escapeHTML(guia.autoria)}. Em revisão.</p>
    <p><strong>Objetivo:</strong> ${escapeHTML(guia.objetivo)}</p><p><strong>Pré-requisito:</strong> ${escapeHTML(guia.prerequisito)}</p><p>${escapeHTML(guia.explicacao)}</p><p><strong>Exercício:</strong> ${escapeHTML(guia.exercicio)}</p><p><strong>Erro observável:</strong> ${escapeHTML(guia.erro)}</p><p><strong>Correção:</strong> ${escapeHTML(guia.correcao)}</p><p><strong>Critério:</strong> ${escapeHTML(guia.criterio)}</p>
    ${guia.tipo==='aula'?`<details><summary>Sugestão de sessão de 40 minutos</summary><ol>${guia.sessao40min.map(s=>`<li><strong>${escapeHTML(s.fase)} — ${s.minutos} min:</strong> ${escapeHTML(s.instrucao)}</li>`).join('')}</ol><p>Registre o estudo desta aula nos campos à esquerda.</p></details>`:''}</section>
    <section class="bloco-card"><h4>Pontos de consulta à fonte</h4>${guia.checkpoints.length?guia.checkpoints.map(c=>`<p><strong>${escapeHTML(c.tempo)}</strong> — ${escapeHTML(c.texto)}</p>`).join(''):'<p>Sem pontos de consulta extraídos de legenda. Consulte o vídeo ou PDF original.</p>'}
    ${guia.legendas.map(l=>`<details><summary>${escapeHTML(l.caminhoLocal.split(/[\\/]/).at(-1))} — transcrição automática</summary><div class="curso-transcricao">${l.trechos.map(c=>`<p><strong>${escapeHTML(c.tempo)}</strong> ${escapeHTML(c.texto)}</p>`).join('')}</div></details>`).join('')}</section>
    <details class="bloco-card"><summary>Orientação do módulo: ${escapeHTML(guiaModulo.titulo)}</summary><p>${escapeHTML(guiaModulo.objetivo)}</p><p>${escapeHTML(guiaModulo.explicacao)}</p><p>${escapeHTML(guiaModulo.exercicio)}</p></details>
    <section class="bloco-card"><h4>Atividades complementares vinculadas à aula</h4>${relacionadas.length ? relacionadas.map(t => `<button class="btn btn-secondary curso-atividade" data-id="${t.id}">${escapeHTML(t.titulo)} · em revisão</button>`).join('') : '<p>Sem atividade complementar vinculada. Use o roteiro desta aula e seus materiais.</p>'}<p>Vínculos por referência de fonte; não indicam homologação do conteúdo.</p></section></div></div>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><button id="curso-anterior" class="btn btn-secondary" ${indice===0?'disabled':''}>Aula anterior</button><button id="curso-proxima" class="btn btn-primary" ${indice===sequencia.length-1?'disabled':''}>Próxima aula</button><button id="curso-biblioteca" class="btn btn-secondary">Biblioteca</button><button id="curso-pratica" class="btn btn-secondary">Prática de 40 minutos</button></div>`;
  $('curso-modulo').onchange = e => abrirAulaCurso(mods.find(m => m.id===e.target.value).aulas[0].id);
  $('curso-aula').onchange = e => abrirAulaCurso(e.target.value);
  const registrar = () => { contexto.progresso[aula.id] = {consultada:$('curso-consultada').checked,praticada:$('curso-praticada').checked,nota:$('curso-nota').value.slice(0,10000)}; salvarEstado(); };
  $('curso-consultada').onchange = registrar; $('curso-praticada').onchange = registrar; $('curso-nota').oninput = registrar;
  $('curso-salvar-pasta').onclick = () => { const base=$('curso-pasta').value.trim(); if (base && !/^[a-z]:[\\/]/i.test(base)) { mostrarAlerta('Informe um caminho absoluto, como C:\\Acervo.'); return; } storageSet('metodo_triade_acervo_local',base); renderizarAulaCurso(); };
  $('curso-anterior').onclick = () => { if(indice>0) abrirAulaCurso(sequencia[indice-1].id); };
  $('curso-proxima').onclick = () => { if(indice<sequencia.length-1) abrirAulaCurso(sequencia[indice+1].id); };
  $('curso-biblioteca').onclick = () => navegarPara('biblioteca');
  $('curso-pratica').onclick = () => navegarPara('praticar');
  document.querySelectorAll('.curso-atividade').forEach(b => b.onclick = () => navegarPara('aprender', b.dataset.id));
  atualizarTimer();
  return true;
}

// Cordas ordenadas da sexta à primeira. Valores: casa; -1 = não tocar.
window.ACORDES_ESTUDO = {
  Em:{casas:[0,2,2,0,0,0],dedos:[0,2,3,0,0,0],formula:'1 – b3 – 5 (E – G – B)'},
  B7:{casas:[-1,2,1,2,0,2],dedos:[0,2,1,3,0,4],formula:'1 – 3 – 5 – b7 (B – D# – F# – A)'},
  'B7/F#':{casas:[2,-1,1,2,0,2],dedos:[2,0,1,3,0,4],formula:'B7 com F# no baixo; quinta corda omitida'},
  A:{casas:[-1,0,2,2,2,0],dedos:[0,0,1,2,3,0],formula:'1 – 3 – 5 (A – C# – E)'},
  D:{casas:[-1,-1,0,2,3,2],dedos:[0,0,0,1,3,2],formula:'1 – 3 – 5 (D – F# – A)'},
  Am:{casas:[-1,0,2,2,1,0],dedos:[0,0,2,3,1,0],formula:'1 – b3 – 5 (A – C – E)'},
  C:{casas:[-1,3,2,0,1,0],dedos:[0,3,2,0,1,0],formula:'1 – 3 – 5 (C – E – G)'},
  F:{casas:[1,3,3,2,1,1],dedos:[1,3,4,2,1,1],formula:'1 – 3 – 5 (F – A – C)'}
};

function gerarDiagramaExercicio(nivel, ativ) {
  const key = Object.entries(ativ.exercicio.niveis).find(([,n]) => n===nivel)?.[0];
  const nomes = ativ.id==='ativ-2' ? ['A','D'] : ativ.id==='ativ-8' ? (key==='variacao'?['Em','B7/F#']:['Em']) : [];
  if (!nomes.length) return ''; // A tablatura permanece a referência quando não há diagrama específico.
  return nomes.map(nome => {
    const a=window.ACORDES_ESTUDO[nome];
    return `<div class="fretboard-card"><h4>${escapeHTML(nome)}</h4><p>${escapeHTML(a.formula)}</p><svg viewBox="0 0 640 210" role="img" aria-label="${escapeHTML(nome)}: casas ${a.casas.join(', ')} da sexta à primeira corda">
    ${[0,1,2,3,4,5].map(f => `<line x1="${90+f*100}" y1="20" x2="${90+f*100}" y2="175" stroke="#a38c80" stroke-width="${f===0?6:2}"/>${f?`<text x="${40+f*100}" y="200" fill="#ffb68c">Casa ${f}</text>`:''}`).join('')}
    ${a.casas.map((f,i) => {const y=30+i*27;return `<line x1="90" y1="${y}" x2="590" y2="${y}" stroke="#d5c3b7"/><text x="15" y="${y+4}" fill="#d5c3b7">${6-i} (${['E','A','D','G','B','e'][i]})</text>${f>0?`<circle cx="${40+f*100}" cy="${y}" r="12" fill="#ffb68c"/><text x="${40+f*100}" y="${y+4}" text-anchor="middle" fill="#151312">${a.dedos[i]}</text>`:`<text x="65" y="${y+4}" fill="#ffb68c">${f===0?'○':'×'}</text>`}`;}).join('')}</svg><p>○ corda solta · × não tocar · 1 indicador · 2 médio · 3 anelar · 4 mínimo</p></div>`;
  }).join('');
}
