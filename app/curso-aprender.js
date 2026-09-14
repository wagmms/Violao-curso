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

function formatarTempoCheckpoint(tempoStr) {
  if (!tempoStr) return '00:00';
  const partes = tempoStr.split(':');
  if (partes.length === 3) {
    const min = partes[1];
    const seg = partes[2].split('.')[0];
    const horas = parseInt(partes[0], 10);
    return horas > 0 ? `${horas}:${min}:${seg}` : `${min}:${seg}`;
  }
  return tempoStr.split('.')[0];
}

function renderizarMaterialCurso(mat) {
  const label = escapeHTML(`${mat.tipo.toUpperCase()}: ${mat.titulo}`);
  if (urlDriveValida(mat.url) && mat.utilizavel) return `<a href="${escapeHTML(mat.url)}" target="_blank" rel="noopener noreferrer">↗ ${label}</a>`;
  const conhecidos = window.CAMINHOS_LOCAIS_CURSO ||= new Set(Object.values(window.GUIAS_AULAS || {}).flatMap(g => g.fontes.map(f => f.caminhoLocal)));
  const local = conhecidos.has(mat.caminhoLocal) ? materialLocalURL(mat) : '';
  if (local) return `<a href="${escapeHTML(local)}" target="_blank" rel="noopener noreferrer">📁 ${label}</a>`;
  return `<span>${label}${mat.caminhoLocal ? (conhecidos.has(mat.caminhoLocal) ? ' — configure a pasta do acervo local' : ' — arquivo não encontrado no índice local') : ' — sem arquivo acessível'}</span>`;
}

function copiarCaminhoArquivo(caminho) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(caminho).then(() => {
      mostrarAlerta('Caminho do arquivo copiado para a área de transferência!');
    }).catch(() => {
      mostrarAlerta('Caminho: ' + caminho);
    });
  } else {
    mostrarAlerta('Caminho: ' + caminho);
  }
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

  // Classificar materiais reais (excluindo legendas .vtt de exibição como anexo)
  const todosMateriais = [...(aula.materiais || []), ...(guia.fontes || [])];
  const vistos = new Set();
  const materiaisValidos = [];
  for (const m of todosMateriais) {
    const chave = m.caminhoLocal || m.url || m.titulo;
    if (!chave || vistos.has(chave)) continue;
    vistos.add(chave);
    // Filtrar fora legendas (.vtt) para não poluir a interface do estudante
    const ehLegenda = m.tipo === 'legenda' || (m.titulo && m.titulo.toLowerCase().endsWith('.vtt')) || (m.caminhoLocal && m.caminhoLocal.toLowerCase().endsWith('.vtt'));
    if (!ehLegenda) {
      materiaisValidos.push(m);
    }
  }

  const videoPrincipal = materiaisValidos.find(m => m.tipo === 'video' || (m.titulo && m.titulo.toLowerCase().endsWith('.mp4')));
  const pdfsApoio = materiaisValidos.filter(m => m.tipo === 'pdf' || (m.titulo && m.titulo.toLowerCase().endsWith('.pdf')));
  const outrosMateriais = materiaisValidos.filter(m => m !== videoPrincipal && !pdfsApoio.includes(m));

  const urlVideo = videoPrincipal ? (videoPrincipal.url && urlDriveValida(videoPrincipal.url) ? videoPrincipal.url : materialLocalURL(videoPrincipal)) : '';
  const caminhoVideoLocal = videoPrincipal?.caminhoLocal || '';

  // Indicador de status da aula
  const statusAulaTexto = p.praticada ? '✓ Praticada no violão' : (p.consultada ? '✓ Conteúdo assistido' : '○ Em estudo');
  const statusAulaClass = (p.praticada || p.consultada) ? 'color: var(--success); font-weight: 600;' : 'color: var(--secondary);';

  $('aprender-conteudo').innerHTML = `
    <div class="curso-study-room">
      <!-- Banner de Cabeçalho e Contexto da Aula -->
      <header class="curso-header-banner">
        <div class="curso-context-row">
          <div class="curso-breadcrumbs">
            <span class="curso-badge-modulo">${escapeHTML(mod.nome.split('.')[0] || 'MÓDULO')}</span>
            <span class="curso-badge-origem">${escapeHTML(aula.cursoOrigem || 'Método Tríade')}</span>
            <span style="font-size: 0.8rem; ${statusAulaClass}" id="curso-status-tag">${statusAulaTexto}</span>
          </div>
          <div class="curso-nav-controls">
            <button id="curso-anterior" class="btn btn-secondary btn-sm" ${indice === 0 ? 'disabled' : ''}>← Aula anterior</button>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">${indice + 1} de ${sequencia.length}</span>
            <button id="curso-proxima" class="btn btn-primary btn-sm" ${indice === sequencia.length - 1 ? 'disabled' : ''}>Próxima aula →</button>
          </div>
        </div>

        <div class="curso-title-row">
          <h2>${escapeHTML(aula.grupo_aula)}</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${escapeHTML(mod.nome)}</p>
        </div>

        <!-- Barra Seletora de Módulo e Aula -->
        <div class="curso-selectors-grid">
          <div class="curso-selector-group">
            <label for="curso-modulo">Selecionar Módulo</label>
            <select id="curso-modulo">
              ${mods.map(m => `<option value="${m.id}" ${m.id === mod.id ? 'selected' : ''}>${escapeHTML(m.nome)}</option>`).join('')}
            </select>
          </div>
          <div class="curso-selector-group">
            <label for="curso-aula">Selecionar Aula</label>
            <select id="curso-aula">
              ${mod.aulas.map(a => `<option value="${escapeHTML(a.id)}" ${a.id === aula.id ? 'selected' : ''}>${escapeHTML(a.grupo_aula)}</option>`).join('')}
            </select>
          </div>
        </div>
      </header>

      <!-- Layout de Duas Colunas da Sala de Estudo -->
      <div class="curso-study-grid">
        <!-- Coluna Esquerda: Mídia, Materiais & Diário de Estudo -->
        <div class="curso-col-esquerda">
          <!-- Card de Vídeo da Aula -->
          <section class="curso-video-card">
            <div class="curso-video-header">
              <h3>🎬 Vídeo e Materiais da Aula</h3>
              ${guia.tipo === 'aula' ? '<span class="status-badge status-sucesso">Aula Prática</span>' : '<span class="status-badge">Conceitual</span>'}
            </div>

            ${videoPrincipal ? `
              <div class="curso-video-hero-box">
                <div class="curso-video-icon">▶</div>
                <div class="curso-video-title">${escapeHTML(aula.grupo_aula)}</div>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Gravação da aula com demonstração no instrumento.</p>
                <div class="curso-video-actions">
                  ${urlVideo ? `
                    <a href="${escapeHTML(urlVideo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none;">
                      ▶ Assistir Aula em Vídeo
                    </a>
                  ` : `
                    <button class="btn btn-primary" id="btn-abrir-video-fallback" type="button">
                      ▶ Assistir Aula
                    </button>
                  `}
                  ${caminhoVideoLocal ? `
                    <button class="btn btn-secondary btn-sm" id="btn-copiar-caminho-video" type="button" title="Copiar caminho local do vídeo para abrir no seu reprodutor (VLC, etc.)">
                      📋 Copiar Local do Vídeo
                    </button>
                  ` : ''}
                </div>
              </div>
            ` : `
              <div class="curso-video-hero-box" style="padding: 16px;">
                <p style="font-size: 0.88rem; color: var(--text-muted);">Esta entrada foca em diretrizes e fundamentos. Utilize o roteiro pedagógico ao lado para orientar sua prática.</p>
              </div>
            `}

            <!-- Materiais de Apoio (PDFs / Partituras) -->
            ${pdfsApoio.length > 0 ? `
              <div>
                <h4 style="font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">📄 Apostilas & Materiais Complementares</h4>
                <div class="curso-materiais-list">
                  ${pdfsApoio.map(pdf => {
                    const url = pdf.url && urlDriveValida(pdf.url) ? pdf.url : materialLocalURL(pdf);
                    return `
                      <div class="curso-material-item">
                        <div class="curso-material-info">
                          <span class="curso-material-icon">📄</span>
                          <span style="font-weight: 500;">${escapeHTML(pdf.titulo.replace(/^[0-9_ -]+/, ''))}</span>
                        </div>
                        ${url ? `
                          <a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="text-decoration:none;">Abrir PDF</a>
                        ` : `
                          <span style="font-size: 0.78rem; color: var(--text-dim);">Consulte no acervo local</span>
                        `}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

            ${outrosMateriais.length > 0 ? `
              <div>
                <h4 style="font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px;">📎 Outros Arquivos da Aula</h4>
                <div class="curso-materiais-list">
                  ${outrosMateriais.map(m => `
                    <div class="curso-material-item">
                      <div class="curso-material-info">
                        <span class="curso-material-icon">📁</span>
                        <span>${escapeHTML(m.titulo.replace(/^[0-9_ -]+/, ''))}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </section>

          <!-- Card: Meu Estudo e Diário de Prática -->
          <section class="curso-diario-card">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
              <h4 style="margin: 0;">📝 Meu Registro Desta Aula</h4>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-curso-marcar-dificuldade" style="font-size: 0.8rem; color: var(--danger); border-color: rgba(239, 68, 68, 0.3);">
                🚩 Marcar Dificuldade (Caderno SRS)
              </button>
            </div>
            <div class="curso-check-options">
              <label class="curso-check-label">
                <input type="checkbox" id="curso-consultada" ${p.consultada ? 'checked' : ''}>
                <span>Assisti à aula e consultei os materiais</span>
              </label>
              <label class="curso-check-label">
                <input type="checkbox" id="curso-praticada" ${p.praticada ? 'checked' : ''}>
                <span>Pratiquei o trecho e os exercícios no violão</span>
              </label>
            </div>

            <div>
              <label for="curso-nota" style="display: block; font-size: 0.8rem; font-weight: 600; color: var(--tertiary); margin-bottom: 6px;">
                Minhas Anotações & Dúvidas
              </label>
              <textarea id="curso-nota" placeholder="Anote aqui suas observações, afinação usada, dúvidas de digitação ou pontos para revisar na próxima sessão...">${escapeHTML(p.nota || '')}</textarea>
              <span style="display: block; font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;" id="curso-salvamento-feedback">
                ✓ Sincronizado automaticamente com o seu progresso local.
              </span>
            </div>
          </section>

          <!-- Atividades Práticas Vinculadas ao Módulo -->
          ${relacionadas.length > 0 ? `
            <section class="curso-diario-card">
              <h4>🎯 Treinos Práticos no Laboratório</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
                Exercícios com tablatura, metrônomo interativo e áudio vinculados a esta aula:
              </p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${relacionadas.map(t => `
                  <button class="btn btn-secondary curso-atividade" data-id="${t.id}" style="text-align: left; padding: 10px 14px; font-size: 0.88rem;">
                    🎸 <strong>${escapeHTML(t.titulo)}</strong>
                  </button>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Gaveta Discreta: Configuração da Pasta Local do Acervo -->
          <details class="curso-drawer">
            <summary>⚙ Configurações de Mídia Local (opcional)</summary>
            <div class="curso-drawer-content">
              <p style="margin-bottom: 8px;">
                Se você possui os vídeos baixados no computador, indique a pasta raiz para que os atalhos locais funcionem ao usar por arquivo:
              </p>
              <label style="display: block; margin-bottom: 4px; font-weight: 600;">Pasta do Acervo:</label>
              <input id="curso-pasta" placeholder="C:\\Acervo" value="${escapeHTML(storageGet('metodo_triade_acervo_local') || window.ACERVO_LOCAL_PADRAO || '')}">
              <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                <button id="curso-salvar-pasta" class="btn btn-secondary btn-sm">Salvar Pasta</button>
              </div>
            </div>
          </details>
        </div>

        <!-- Coluna Direita: Roteiro Pedagógico, Tópicos & Rotina 40 Min -->
        <div class="curso-col-direita">
          <!-- Card de Roteiro Pedagógico da Aula -->
          <section class="curso-roteiro-card">
            <div class="curso-roteiro-header">
              <h4>Roteiro desta aula</h4>
              <span class="curso-badge-origem">Método Tríade</span>
            </div>

            <!-- 1. Objetivo de Aprendizagem -->
            <div class="curso-objetivo-box">
              <strong>🎯 O que você vai dominar</strong>
              <p>${escapeHTML(guia.objetivo)}</p>
            </div>

            <!-- 2. Pré-requisito & Preparação -->
            <div class="curso-passo-box">
              <strong>📌 Pré-requisito & Preparação</strong>
              <p>${escapeHTML(guia.prerequisito)}</p>
            </div>

            <!-- 3. Instrução e Exercício Prático -->
            <div class="curso-passo-box">
              <strong>🎸 O que Praticar (Passo a Passo)</strong>
              <p>${escapeHTML(guia.explicacao)}</p>
              <div style="margin-top: 10px; padding: 10px 12px; background-color: var(--bg-surface-subtle); border-radius: var(--radius-sm); border-left: 3px solid var(--secondary);">
                <strong style="color: var(--secondary); font-size: 0.78rem;">EXERCÍCIO RECOMENDADO:</strong>
                <p style="margin-top: 2px; font-weight: 600; color: var(--text-main); font-size: 0.92rem;">${escapeHTML(guia.exercicio)}</p>
              </div>
            </div>

            <!-- 4. Caixa de Erro Comum vs Correção -->
            <div class="curso-erro-correcao-grid">
              <div class="curso-erro-box">
                <strong>⚠️ Falha / Erro Comum</strong>
                <p>${escapeHTML(guia.erro)}</p>
              </div>
              <div class="curso-correcao-box">
                <strong> Como Ajustar</strong>
                <p>${escapeHTML(guia.correcao)}</p>
              </div>
            </div>

            <!-- 5. Critério de Sucesso -->
            <div class="curso-criterio-box">
              <span style="font-size: 1.2rem;">🏆</span>
              <div>
                <strong>Critério de Domínio (Quando avançar):</strong>
                <p style="margin-top: 2px; color: var(--text-main);">${escapeHTML(guia.criterio)}</p>
              </div>
            </div>
          </section>

          <!-- Momentos-Chave da Aula (Checkpoints de Estudo) -->
          ${guia.checkpoints && guia.checkpoints.length > 0 ? `
            <section class="curso-checkpoints-card">
              <h4>📍 Momentos-Chave & Tópicos da Aula</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${guia.checkpoints.map(c => `
                  <div class="curso-checkpoint-item">
                    <span class="curso-checkpoint-time">${formatarTempoCheckpoint(c.tempo)}</span>
                    <span style="color: var(--text-main);">${escapeHTML(c.texto)}</span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Sugestão de Sessão de Prática de 40 Minutos -->
          ${guia.tipo === 'aula' && guia.sessao40min ? `
            <section class="curso-rotina-card">
              <div class="curso-rotina-header">
                <h4>⏱ Sugestão de Sessão Guiada (40 min)</h4>
                <span class="curso-badge-modulo">6 Blocos</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Distribuição ideal do tempo para assimilar o conteúdo desta lição com eficiência:
              </p>
              <div class="curso-rotina-timeline">
                ${guia.sessao40min.map((s, idx) => `
                  <div class="curso-rotina-step">
                    <div class="curso-rotina-step-info">
                      <span style="font-weight: 700; color: var(--accent); font-family: var(--font-mono);">${idx + 1}.</span>
                      <div>
                        <span class="curso-rotina-step-fase">${escapeHTML(s.fase)}:</span>
                        <span class="curso-rotina-step-desc">${escapeHTML(s.instrucao)}</span>
                      </div>
                    </div>
                    <span class="curso-rotina-step-min">${s.minutos} min</span>
                  </div>
                `).join('')}
              </div>
              <div style="margin-top: 6px;">
                <button id="curso-pratica" class="btn btn-primary" style="width: 100%;">
                  🎸 Abrir Rotina de Prática no Instrumento
                </button>
              </div>
            </section>
          ` : `
            <div style="margin-top: 6px;">
              <button id="curso-pratica" class="btn btn-secondary" style="width: 100%;">
                🎸 Abrir Prática no Instrumento
              </button>
            </div>
          `}

          <!-- Orientação Geral do Módulo -->
          ${guiaModulo ? `
            <details class="curso-drawer">
              <summary>📖 Visão Geral do Módulo: ${escapeHTML(guiaModulo.titulo)}</summary>
              <div class="curso-drawer-content">
                <p><strong>Objetivo do Módulo:</strong> ${escapeHTML(guiaModulo.objetivo)}</p>
                <p style="margin-top: 6px;"><strong>Fundamentação:</strong> ${escapeHTML(guiaModulo.explicacao)}</p>
                <p style="margin-top: 6px; color: var(--secondary);"><strong>Diretriz de Prática:</strong> ${escapeHTML(guiaModulo.exercicio)}</p>
              </div>
            </details>
          ` : ''}

          <!-- Transcrição das Falas do Professor (Recolhida) -->
          ${guia.legendas && guia.legendas.length > 0 ? `
            <details class="curso-drawer">
              <summary>💬 Transcrição das Orientações em Texto</summary>
              <div class="curso-drawer-content curso-transcricao" style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
                ${guia.legendas.flatMap(l => l.trechos).map(c => `
                  <p style="font-size: 0.84rem; line-height: 1.5;">
                    <strong style="color: var(--secondary); font-family: var(--font-mono);">${formatarTempoCheckpoint(c.tempo)}</strong>:
                    <span style="color: var(--text-main);">${escapeHTML(c.texto)}</span>
                  </p>
                `).join('')}
              </div>
            </details>
          ` : ''}
        </div>
      </div>

      <!-- Barra Inferior de Navegação e Atalhos Rápidos -->
      <footer style="display: flex; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap; padding: 16px 20px; background-color: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-top: 10px;">
        <div style="display: flex; gap: 10px;">
          <button id="curso-anterior-bot" class="btn btn-secondary" ${indice === 0 ? 'disabled' : ''}>← Aula anterior</button>
          <button id="curso-proxima-bot" class="btn btn-primary" ${indice === sequencia.length - 1 ? 'disabled' : ''}>Próxima aula →</button>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="curso-biblioteca" class="btn btn-secondary">Catálogo Completo</button>
        </div>
      </footer>
    </div>
  `;

  // Event Handlers
  $('curso-modulo').onchange = e => abrirAulaCurso(mods.find(m => m.id === e.target.value).aulas[0].id);
  $('curso-aula').onchange = e => abrirAulaCurso(e.target.value);

  const registrar = () => {
    contexto.progresso[aula.id] = {
      consultada: $('curso-consultada').checked,
      praticada: $('curso-praticada').checked,
      nota: $('curso-nota').value.slice(0, 10000)
    };
    salvarEstado();

    const tag = $('curso-status-tag');
    if (tag) {
      if (contexto.progresso[aula.id].praticada) {
        tag.textContent = '✓ Praticada no violão';
        tag.style.color = 'var(--success)';
      } else if (contexto.progresso[aula.id].consultada) {
        tag.textContent = '✓ Conteúdo assistido';
        tag.style.color = 'var(--success)';
      } else {
        tag.textContent = '○ Em estudo';
        tag.style.color = 'var(--secondary)';
      }
    }
  };

  $('curso-consultada').onchange = registrar;
  $('curso-praticada').onchange = registrar;
  $('curso-nota').oninput = registrar;

  const btnMarcarDif = $('btn-curso-marcar-dificuldade');
  if (btnMarcarDif) {
    btnMarcarDif.onclick = () => {
      if (typeof abrirModalDificuldade === 'function') {
        abrirModalDificuldade(aula);
      }
    };
  }

  $('curso-salvar-pasta').onclick = () => {
    const base = $('curso-pasta').value.trim();
    if (base && !/^[a-z]:[\\/]/i.test(base)) {
      mostrarAlerta('Informe um caminho absoluto, como C:\\Acervo.');
      return;
    }
    storageSet('metodo_triade_acervo_local', base);
    mostrarAlerta('Pasta do acervo configurada com sucesso!');
    renderizarAulaCurso();
  };

  const irAnterior = () => { if (indice > 0) abrirAulaCurso(sequencia[indice - 1].id); };
  const irProxima = () => { if (indice < sequencia.length - 1) abrirAulaCurso(sequencia[indice + 1].id); };

  $('curso-anterior').onclick = irAnterior;
  $('curso-proxima').onclick = irProxima;

  const antBot = $('curso-anterior-bot');
  if (antBot) antBot.onclick = irAnterior;
  const proxBot = $('curso-proxima-bot');
  if (proxBot) proxBot.onclick = irProxima;

  $('curso-biblioteca').onclick = () => navegarPara('biblioteca');
  $('curso-pratica').onclick = () => navegarPara('praticar');

  const btnCopiar = $('btn-copiar-caminho-video');
  if (btnCopiar && caminhoVideoLocal) {
    btnCopiar.onclick = () => {
      const base = storageGet('metodo_triade_acervo_local') || window.ACERVO_LOCAL_PADRAO || '';
      const caminhoCompleto = base ? `${base}\\${caminhoVideoLocal}` : caminhoVideoLocal;
      copiarCaminhoArquivo(caminhoCompleto);
    };
  }

  const btnVideoFallback = $('btn-abrir-video-fallback');
  if (btnVideoFallback) {
    btnVideoFallback.onclick = () => {
      mostrarAlerta('Abra o vídeo correspondente a esta aula no seu reprodutor ou configure a pasta do acervo nas configurações abaixo.');
    };
  }

  document.querySelectorAll('.curso-atividade').forEach(b => {
    b.onclick = () => navegarPara('aprender', b.dataset.id);
  });

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
