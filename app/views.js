
window.renderizarTablatura = function(textoTab, containerId) {
  if (window.alphaTab && textoTab.startsWith('\\title')) {
    setTimeout(() => {
      const el = document.getElementById(containerId);
      if (el) new alphaTab.AlphaTabApi(el, { tex: true, core: { tex: textoTab } });
    }, 0);
    return `<div class="tablatura-container alphatab-wrapper" id="${containerId}"></div>`;
  } else {
    return `<div class="tablatura-container" id="${containerId}"><pre class="tablatura-pre">${escapeHTML(textoTab)}</pre></div>`;
  }
};



function navegarPara(viewId, atividadeId) {
    if (AudioMotor) AudioMotor.pararTodosSons();

    if (atividadeId) {
      trocarAtividade(atividadeId);
    }

    document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('view-ativa'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.remove('ativo');
      if (btn.dataset.view === viewId) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }
    });

    const targetView = $(`view-${viewId}`);
    const targetNav = $(`nav-${viewId}`);

    if (targetView) targetView.classList.add('view-ativa');
    if (targetNav) targetNav.classList.add('ativo');

    if (viewId === 'hoje') renderizarTelaHoje();
    else if (viewId === 'aprender') renderizarTelaAprender();
    else if (viewId === 'praticar') renderizarTelaPraticar();
    else if (viewId === 'progresso') renderizarTelaProgresso();
    else if (viewId === 'biblioteca') renderizarTelaBiblioteca();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

function renderizarTelaHoje() {
    const rec = obterRecomendacao();
    const container = $('hoje-conteudo');
    if (!container) return;

    const difPendentes = state.dificuldades ? state.dificuldades.filter(d => !d.resolvida).length : 0;
    const dataHoje = (typeof window !== 'undefined' && window.obterDataLocal) ? window.obterDataLocal() : obterDataLocal();
    const revHoje = state.revisoes ? state.revisoes.filter(r => !r.concluida && r.dataPrevista <= dataHoje).length : 0;

    container.innerHTML = `
      <div class="hoje-hero">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
          <div>
            <div class="hero-recommendation-tag">🎯 Sessão Personalizada do Dia</div>
            <h3>${escapeHTML(rec.atividade.titulo)}</h3>
            <p class="justificativa">${escapeHTML(rec.motivo)}</p>
          </div>
          <!-- Anel de Progresso da Meta Semanal (Stitch) -->
          <div style="background:var(--bg-surface-inset); padding:10px 16px; border-radius:var(--radius-lg); border:1px solid var(--border-subtle); display:flex; align-items:center; gap:14px; flex-shrink:0;">
            <div style="position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
              <svg style="width:100%; height:100%; transform:rotate(-90deg);" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-surface-highest)" stroke-width="3.5"></path>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent)" stroke-dasharray="80, 100" stroke-linecap="round" stroke-width="3.5"></path>
              </svg>
              <span style="position:absolute; font-size:11px; font-weight:700; color:var(--accent); font-family:var(--font-mono);">80%</span>
            </div>
            <div style="display:flex; flex-direction:column;">
              <span style="font-weight:600; font-size:0.88rem; color:var(--text-main);">4 de 5 sessões</span>
              <span style="font-size:0.72rem; color:var(--text-muted);">Meta: 200 min • 160 min concluídos</span>
            </div>
          </div>
        </div>
        
        <div class="hero-meta-grid">
          <div class="hero-meta-item">
            <strong>Habilidade</strong>
            <span>${escapeHTML(rec.atividade.habilidade)}</span>
          </div>
          <div class="hero-meta-item">
            <strong>Área de Ensino</strong>
            <span>${escapeHTML(rec.atividade.area)}</span>
          </div>
          <div class="hero-meta-item">
            <strong>Meta Observável</strong>
            <span>${escapeHTML(rec.atividade.metaObservavel)}</span>
          </div>
          <div class="hero-meta-item">
            <strong>Tempo de Sessão</strong>
            <span>40 Minutos Estruturados</span>
          </div>
        </div>

        <!-- Sequência Metodológica dos 6 Blocos Guiados (Stitch) -->
        <div class="hero-blocks-timeline">
          <div class="hero-blocks-timeline-header">
            <span>Sequência Metodológica Tríade (40 min)</span>
            <span style="color:var(--secondary); font-family:var(--font-mono); font-size:0.75rem;">6 blocos guiados</span>
          </div>
          <div class="hero-chips-grid">
            <div class="hero-chip-step" title="1. Aquecimento Digital (3m)">
              <div class="hero-chip-bar concluido"></div>
              <span class="hero-chip-num">01 Aquec.</span>
            </div>
            <div class="hero-chip-step" title="2. Recuperação Ativa (5m)">
              <div class="hero-chip-bar concluido"></div>
              <span class="hero-chip-num">02 Recup.</span>
            </div>
            <div class="hero-chip-step" title="3. Demonstração (7m)">
              <div class="hero-chip-bar concluido"></div>
              <span class="hero-chip-num">03 Dem.</span>
            </div>
            <div class="hero-chip-step" title="4. Prática Dirigida (15m)">
              <div class="hero-chip-bar ativo"></div>
              <span class="hero-chip-num" style="color:var(--accent); font-weight:bold;">04 Prát.</span>
            </div>
            <div class="hero-chip-step" title="5. Aplicação Musical (7m)">
              <div class="hero-chip-bar"></div>
              <span class="hero-chip-num">05 Aplic.</span>
            </div>
            <div class="hero-chip-step" title="6. Avaliação e Registro (3m)">
              <div class="hero-chip-bar"></div>
              <span class="hero-chip-num">06 Reg.</span>
            </div>
          </div>
        </div>

        <div class="hero-actions">
          <button id="btn-comecar-40" class="btn btn-primary btn-lg">⏱ Começar meus 40 minutos</button>
          <button id="btn-diagnostico-abrir" class="btn btn-secondary">Ajustar Nível (Diagnóstico)</button>
        </div>
      </div>

      <div class="hoje-alternativas">
        <h4>Opções alternativas de estudo</h4>
        <div class="alternativas-grid">
          <div class="card-alternativa" id="card-alt-anterior">
            <h5>Continuar atividade anterior</h5>
            <p>Retome a última prática realizada mantendo suas anotações e tempo decorrido.</p>
          </div>
          <div class="card-alternativa" id="card-alt-dificuldade">
            <h5>Caderno de dificuldades</h5>
            <p>${difPendentes > 0 ? `<strong style="color:var(--warning);">${difPendentes} ponto(s) de tropeço</strong> registrado(s).` : 'Nenhum gargalo técnico pendente no momento.'}</p>
          </div>
          <div class="card-alternativa" id="card-alt-biblioteca">
            <h5>Explorar o Método Tríade</h5>
            <p>Consulte a biblioteca completa com 11 módulos e 300 aulas originais do acervo.</p>
          </div>
        </div>
      </div>
    `;

    $('btn-comecar-40').onclick = () => {
      trocarAtividade(rec.atividade.id, rec.nivel);
      iniciarSessao();
      navegarPara('aprender');
    };

    $('btn-diagnostico-abrir').onclick = () => abrirModalDiagnostico();
    $('card-alt-anterior').onclick = () => navegarPara('aprender');
    $('card-alt-dificuldade').onclick = () => navegarPara('progresso');
    $('card-alt-biblioteca').onclick = () => navegarPara('biblioteca');
  }

  function gerarDiagramaBracoSVG(nivelAtual, ativ) {
    return `
      <div class="fretboard-card" style="margin-bottom: 16px;">
        <div class="fretboard-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="background: var(--bg-surface-highest); color: var(--accent); font-family: var(--font-mono); font-weight: 700; padding: 4px 10px; border-radius: var(--radius-sm); font-size: 1.1rem;">
              ${escapeHTML(ativ.id === 'ativ-1' ? 'Am' : ativ.id === 'ativ-4' ? 'C / F' : 'Posição 1')}
            </div>
            <div>
              <h5 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--text-main);">${escapeHTML(ativ.titulo)}</h5>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Mapeamento Físico das Cordas e Casas • Posição Aberta</span>
            </div>
          </div>
          <div style="background: var(--bg-surface-subtle); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--text-dim);">
            <strong style="color: var(--secondary); font-family: var(--font-mono);">Fórmula:</strong> 1 - b3 - 5 (A - C - E)
          </div>
        </div>

        <div class="fretboard-viewport">
          <svg class="fretboard-svg" viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fretWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#554339" />
                <stop offset="50%" stop-color="#a38c80" />
                <stop offset="100%" stop-color="#373433" />
              </linearGradient>
            </defs>
            <!-- Madeira do Braço (Rosewood escuro) -->
            <rect x="80" y="25" width="540" height="150" rx="4" fill="#1b1816" />
            <!-- Pestana de Marfim (Nut) -->
            <rect x="74" y="21" width="10" height="158" rx="2" fill="#e7e1df" opacity="0.95" />
            <text x="79" y="17" fill="#d5c3b7" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="600" text-anchor="middle">NUT</text>
            
            <!-- Trastes Verticais (Casas 1 a 5) -->
            <line x1="190" y1="25" x2="190" y2="175" stroke="url(#fretWireGrad)" stroke-width="3" />
            <text x="135" y="195" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" text-anchor="middle">Casa 1</text>
            
            <line x1="300" y1="25" x2="300" y2="175" stroke="url(#fretWireGrad)" stroke-width="3" />
            <text x="245" y="195" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" text-anchor="middle">Casa 2</text>
            
            <line x1="410" y1="25" x2="410" y2="175" stroke="url(#fretWireGrad)" stroke-width="3" />
            <circle cx="355" cy="100" r="5" fill="#373433" />
            <circle cx="355" cy="100" r="3.5" fill="#d5c3b7" opacity="0.6" />
            <text x="355" y="195" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" text-anchor="middle">Casa 3 •</text>
            
            <line x1="515" y1="25" x2="515" y2="175" stroke="url(#fretWireGrad)" stroke-width="3" />
            <text x="462" y="195" fill="#554339" font-family="Plus Jakarta Sans, sans-serif" font-size="11" text-anchor="middle">Casa 4</text>
            
            <line x1="615" y1="25" x2="615" y2="175" stroke="url(#fretWireGrad)" stroke-width="3" />
            <circle cx="565" cy="100" r="5" fill="#373433" />
            <circle cx="565" cy="100" r="3.5" fill="#d5c3b7" opacity="0.6" />
            <text x="565" y="195" fill="#554339" font-family="Plus Jakarta Sans, sans-serif" font-size="11" text-anchor="middle">Casa 5 •</text>
            
            <!-- 6 Cordas do Violão com calibres proporcionais -->
            <!-- 6ª corda: Mi Grave (E2) - 3.2px -->
            <line x1="80" y1="35" x2="620" y2="35" stroke="#756960" stroke-width="3.2" />
            <text x="50" y="39" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">6 (E)</text>
            <circle cx="20" cy="35" r="9" fill="#2c2928" />
            <text x="20" y="39" fill="#ffb4ab" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">✕</text>
            
            <!-- 5ª corda: Lá (A2) - Baixo Fundamental - 2.6px -->
            <line x1="80" y1="61" x2="620" y2="61" stroke="#9e8e83" stroke-width="2.6" />
            <text x="50" y="65" fill="#ffb68c" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" text-anchor="middle">5 (A)</text>
            <circle cx="20" cy="61" r="10" fill="#d97736" stroke="#ffb68c" stroke-width="1.5" />
            <text x="20" y="65" fill="#151312" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">P</text>
            
            <!-- 4ª corda: Ré (D3) - 2.0px -->
            <line x1="80" y1="87" x2="620" y2="87" stroke="#a38c80" stroke-width="2.0" />
            <text x="50" y="91" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">4 (D)</text>
            <circle cx="245" cy="87" r="12" fill="#d97736" />
            <text x="245" y="91" fill="#151312" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">2</text>
            
            <!-- 3ª corda: Sol (G3) - 1.6px -->
            <line x1="80" y1="113" x2="620" y2="113" stroke="#dbc1b4" stroke-width="1.6" />
            <text x="50" y="117" fill="#ffddb8" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">3 (G)</text>
            <circle cx="245" cy="113" r="12" fill="#ee9800" />
            <text x="245" y="117" fill="#151312" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">3</text>
            <rect x="14" y="104" width="16" height="16" rx="3" fill="#2c2928" stroke="#ee9800" stroke-width="1" />
            <text x="22" y="116" fill="#ffddb8" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">I</text>
            
            <!-- 2ª corda: Si (B3) - 1.2px -->
            <line x1="80" y1="139" x2="620" y2="139" stroke="#e7e1df" stroke-width="1.2" />
            <text x="50" y="143" fill="#ffddb8" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">2 (B)</text>
            <circle cx="135" cy="139" r="12" fill="#ffb68c" />
            <text x="135" y="143" fill="#532200" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" text-anchor="middle">1</text>
            <rect x="14" y="130" width="16" height="16" rx="3" fill="#2c2928" stroke="#ffb68c" stroke-width="1" />
            <text x="22" y="142" fill="#ffdbc9" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" text-anchor="middle">M</text>
            
            <!-- 1ª corda: Mi Agudo (E4) - 0.9px -->
            <line x1="80" y1="165" x2="620" y2="165" stroke="#e7e1df" stroke-width="0.9" />
            <text x="50" y="169" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" text-anchor="middle">1 (e)</text>
            <circle cx="20" cy="165" r="8" fill="none" stroke="#a38c80" stroke-width="1.8" />
            <text x="20" y="168.5" fill="#a38c80" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="600" text-anchor="middle">O</text>
          </svg>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; color: var(--text-dim);">
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <span style="color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Mão Esquerda:</span>
            <span><strong style="color: var(--accent); font-family: var(--font-mono);">1</strong> Indicador</span>
            <span><strong style="color: var(--secondary); font-family: var(--font-mono);">2</strong> Médio</span>
            <span><strong style="color: #ee9800; font-family: var(--font-mono);">3</strong> Anelar</span>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <span style="color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Mão Direita:</span>
            <span><strong style="color: var(--accent); font-family: var(--font-mono);">P</strong> Polegar</span>
            <span><strong style="color: var(--secondary); font-family: var(--font-mono);">I</strong> Indicador</span>
            <span><strong style="color: #ffb68c; font-family: var(--font-mono);">M</strong> Médio</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderizarTelaAprender() {
    const ativ = atividadesDados.find(a => a.id === state.atividadeAtualId) || atividadesDados[0];
    const container = $('aprender-conteudo');
    if (!container) return;

    const nivelKey = state.nivelExercicioAtual || 'alvo';
    const nivelAtual = ativ.exercicio.niveis[nivelKey] || ativ.exercicio.niveis.alvo;

    if (!atividadeTemSessao(ativ)) {
      container.innerHTML = `<div class="bloco-card"><h2>${escapeHTML(ativ.titulo)}</h2><p>Proposta em elaboração. O roteiro desta sessão ainda não está disponível.</p><button id="btn-voltar-praticar" class="btn btn-primary">Escolher outra atividade</button></div>`;
      $('btn-voltar-praticar').onclick = () => navegarPara('praticar');
      atualizarTimer();
      return;
    }

    container.innerHTML = `
      <div class="view-header">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
          <div>
            <h2>${escapeHTML(ativ.titulo)}</h2>
            <p><strong>Meta Observável:</strong> ${escapeHTML(ativ.metaObservavel)}</p>
          </div>
          <button id="btn-trocar-atividade" class="btn btn-secondary btn-sm">Trocar Atividade</button>
        </div>
      </div>

      <div class="aprender-layout">
        <!-- Coluna Esquerda: Instrução, Roteiro dos 40 min e Fontes -->
        <div class="aprender-painel-esquerda">
          <div class="bloco-card">
            <h4>Roteiro da Sessão de 40 Minutos</h4>
            <div class="stepper-timeline" id="stepper-sessao">
              ${ativ.sessao40min.map((s, idx) => `
                <div class="step-item ${idx === state.sessao.passoIndex ? 'step-ativo' : ''}" data-step="${idx}">
                  <span class="step-badge">${idx + 1}</span>
                  <div class="step-detalhes">
                    <div class="step-titulo">
                      <span>${escapeHTML(s.fase)}: ${escapeHTML(s.objetivo)}</span>
                      <span class="step-minutos">${s.minutos} min</span>
                    </div>
                    <div class="step-instrucao">${escapeHTML(s.instrucao)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bloco-card">
            <h4>Fundamentação e Termos Técnicos</h4>
            <p style="font-size: 0.9rem; line-height: 1.55; color: var(--text-muted);">${escapeHTML(ativ.explicacao)}</p>
            <div style="margin-top: 12px; font-size: 0.85rem;">
              <strong>Pré-requisito testável:</strong> ${escapeHTML(ativ.prerequisito)}
            </div>
          </div>

          <div class="bloco-card">
            <h4>Fontes do Acervo e Autoria de Complementos</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
              ${hidratarFontes(ativ).fontes.map(f => `
                <li style="padding: 8px; background: var(--bg-surface-subtle); border-radius: var(--radius-sm);">
                  <div><strong>${escapeHTML(f.modulo)}</strong> — ${escapeHTML(f.tituloAula)}</div>
                  <div style="color: var(--text-dim); margin-top: 2px;">
                    Verificação: <em>${escapeHTML(f.statusVerificacao)}</em> · Autoria: ${escapeHTML(f.autoria)}
                  </div>
                  ${urlDriveValida(f.url) ? `<a href="${escapeHTML(f.url)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-size: 0.8rem; display: inline-block; margin-top: 4px;">
                    ↗ Abrir arquivo original no Google Drive
                  </a>` : '<span>Fonte sem arquivo acessível no catálogo; referência pendente de revisão.</span>'}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Coluna Direita: Exercício Visual e Ferramentas -->
        <div class="aprender-painel-direita">
          <div class="exercicio-box">
            <h4>Exercício Prático</h4>
            <div class="niveis-switcher">
              <button class="nivel-tab ${nivelKey === 'preparacao' ? 'nivel-ativo' : ''}" data-nivel="preparacao">1. Preparação (Fácil)</button>
              <button class="nivel-tab ${nivelKey === 'alvo' ? 'nivel-ativo' : ''}" data-nivel="alvo">2. Alvo Principal</button>
              <button class="nivel-tab ${nivelKey === 'variacao' ? 'nivel-ativo' : ''}" data-nivel="variacao">3. Variação (Desafio Opcional)</button>
            </div>

            <div style="margin-bottom: 12px;">
              <h5 style="font-size: 1rem; font-weight: 600;">${escapeHTML(nivelAtual.nome)}</h5>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 2px;">${escapeHTML(nivelAtual.descricao)}</p>
            </div>

            ${gerarDiagramaBracoSVG(nivelAtual, ativ)}

            ${window.renderizarTablatura(nivelAtual.tablatura, "tab-container-" + ativ.id)}
            ${nivelAtual.instrucoesRodape ? `<div class="instrucoes-rodape">${escapeHTML(nivelAtual.instrucoesRodape)}</div>` : ''}

            <div class="dica-execucao">
              <strong>Foco de Atenção:</strong> ${escapeHTML(nivelAtual.dica)}
            </div>
          </div>

          <!-- Painel Interativo: Metrônomo ou Treinador de Ouvido -->
          <div id="painel-ferramenta-interativa"></div>

          <!-- Erros Observáveis e Correções Proativas -->
          <div class="bloco-card">
            <h4>Erros Observáveis e Correção Proativa</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${ativ.errosComuns.map(e => `
                <div style="padding: 10px; background: var(--bg-surface-subtle); border-left: 3px solid var(--danger); border-radius: var(--radius-sm); font-size: 0.85rem;">
                  <strong style="color: var(--danger);">Falha típica:</strong> ${escapeHTML(e.erro)}<br>
                  <strong style="color: var(--success); margin-top: 4px; display: inline-block;">Ação corretiva:</strong> ${escapeHTML(e.correcao)}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Ações da Sessão -->
          <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
            <button id="btn-registrar-dificuldade-rapida" class="btn btn-secondary">⚠️ Anotar Dificuldade</button>
            <button id="btn-concluir-sessao" class="btn btn-success">✓ Concluir e Avaliar Nível</button>
          </div>
        </div>
      </div>
    `;

    // Eventos dos passos da sessão
    document.querySelectorAll('.step-item').forEach(el => {
      el.onclick = () => {
        const step = Number(el.dataset.step);
        state.sessao.passoIndex = step;
        document.querySelectorAll('.step-item').forEach(item => item.classList.remove('step-ativo'));
        el.classList.add('step-ativo');
      };
    });

    // Troca de nível do exercício
    document.querySelectorAll('.nivel-tab').forEach(el => {
      el.onclick = () => {
        state.nivelExercicioAtual = el.dataset.nivel;
        state.sessao.nivel = el.dataset.nivel;
        if (AudioMotor) AudioMotor.pararTodosSons();
        salvarEstado();
        renderizarTelaAprender();
      };
    });

    $('btn-trocar-atividade').onclick = () => navegarPara('praticar');
    $('btn-registrar-dificuldade-rapida').onclick = () => abrirModalDificuldade(ativ);
    $('btn-concluir-sessao').onclick = () => abrirModalResultado(ativ);

    renderizarFerramentaInterativa(ativ);
  }

function renderizarFerramentaInterativa(ativ) {
    const container = $('painel-ferramenta-interativa');
    if (!container) return;

    if (ativ.ferramentaSugerida === 'treinador-ouvido') {
      // P1-13: Treinador com série por nível. Reinicia se nível mudou.
      const nivelAtual = state.nivelExercicioAtual || 'alvo';
      const intervalosPermitidos = ativ.exercicio.intervalosPorNivel[nivelAtual] || ativ.exercicio.intervalosPorNivel.alvo;

      // Reiniciar série se nível mudou
      treinoOuvido = state.treinoOuvido;
      if (!treinoOuvido || treinoOuvido.nivel !== nivelAtual || treinoOuvido.sessaoId !== state.sessao.id) treinoOuvido = criarSerieOuvido(nivelAtual);

      container.innerHTML = `
        <div class="ear-trainer-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h5 style="font-size: 1rem; font-weight: 600;">🎧 Treinador de Ouvido (Série de 10 Perguntas)</h5>
            <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent);" id="ear-progresso-serie">
              Pergunta ${treinoOuvido.perguntaAtual} de ${treinoOuvido.totalPerguntas} · Acertos: ${treinoOuvido.acertos}
            </span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Tônica de Referência: Dó4 (261.63 Hz, 2ª corda casa 1). Apenas a primeira tentativa por pergunta é registrada. Áudio repetido não conta nova tentativa.
          </p>

          <div class="ear-trainer-prompts">
            <button id="btn-ouvir-tonica" class="btn btn-secondary btn-sm" type="button">🎵 1. Tônica (Dó4)</button>
            <button id="btn-ouvir-desconhecido" class="btn btn-primary btn-sm" type="button">👂 2. Ouvir Pergunta</button>
            <button id="btn-ouvir-harmonico" class="btn btn-ghost btn-sm" type="button">Juntas (Harmônico)</button>
          </div>

          <div class="ear-options-grid" id="ear-opcoes-container">
            ${intervalosPermitidos.map(chave => {
              const inf = AudioMotor.intervalos[chave];
              return `<button class="btn btn-secondary btn-opcao-intervalo" data-intervalo="${escapeHTML(chave)}" type="button">${escapeHTML(inf.nome)} (${inf.semitons} semitons)</button>`;
            }).join('')}
          </div>

          <div id="ear-feedback" class="ear-feedback-box"></div>
          <div id="ear-controles-pos" style="margin-top: 10px; display: none; text-align: right;">
            <button id="btn-proxima-pergunta" class="btn btn-primary btn-sm" type="button">Próxima Pergunta ➔</button>
          </div>
        </div>
      `;

      if (!treinoOuvido.intervaloSorteado && !treinoOuvido.serieEncerrada) {
        sortearNovoIntervalo(intervalosPermitidos);
      }

      $('btn-ouvir-tonica').onclick = () => {
        if (AudioMotor) AudioMotor.tocarFrequencia(261.63, 0.7, 0, 'sine');
      };

      $('btn-ouvir-desconhecido').onclick = () => {
        // P1-13: ouvir novamente não conta tentativa — apenas toca o som
        if (AudioMotor && treinoOuvido.intervaloSorteado) {
          AudioMotor.tocarIntervalo(261.63, treinoOuvido.intervaloSorteado.semitons, 'melodico');
        }
      };

      $('btn-ouvir-harmonico').onclick = () => {
        if (AudioMotor && treinoOuvido.intervaloSorteado) {
          AudioMotor.tocarIntervalo(261.63, treinoOuvido.intervaloSorteado.semitons, 'harmonico');
        }
      };

      document.querySelectorAll('.btn-opcao-intervalo').forEach(el => {
        el.onclick = () => checarRespostaIntervalo(el.dataset.intervalo);
      });

      const btnProxima = $('btn-proxima-pergunta');
      if (btnProxima) btnProxima.onclick = () => avancarPerguntaTreinoOuvido(intervalosPermitidos);

      atualizarFeedbackOuvido();

      // Restaurar estado visual se série encerrada
      if (treinoOuvido.serieEncerrada) {
        const feedback = $('ear-feedback');
        const pos = $('ear-controles-pos');
        if (feedback) {
          feedback.className = 'ear-feedback-box feedback-correto';
          feedback.innerHTML = `<strong>Série Concluída!</strong> Você acertou ${treinoOuvido.acertos} de ${treinoOuvido.totalPerguntas} perguntas. Registre seu resultado ou reinicie para uma segunda série.`;
          feedback.style.display = 'block';
        }
        if (pos) {
          pos.style.display = 'block';
          pos.innerHTML = `<button id="btn-reiniciar-serie" class="btn btn-secondary btn-sm" type="button">Reiniciar Série</button>`;
          $('btn-reiniciar-serie').onclick = () => reiniciarTreinoOuvido(intervalosPermitidos);
        }
        // Desabilitar opções de resposta após série encerrada
        document.querySelectorAll('.btn-opcao-intervalo').forEach(el => { el.disabled = true; });
      }

    } else {
      // Metrônomo com Web Audio API Lookahead
      const bpmAtual = ativ.exercicio.niveis[state.nivelExercicioAtual || 'alvo'].bpm || 60;
      container.innerHTML = `
        <div class="metronomo-box">
          <div class="metronomo-header">
            <h5>Metrônomo de Estudo (Web Audio API)</h5>
            <div class="metronomo-bpm-readout"><span id="metro-bpm-val">${bpmAtual}</span> BPM</div>
          </div>

          <div class="metronomo-controls">
            <div class="bpm-slider-wrap">
              <span style="font-size: 0.8rem; font-family: var(--font-mono);">40</span>
              <input type="range" id="metro-slider" class="bpm-slider" min="40" max="180" value="${bpmAtual}">
              <span style="font-size: 0.8rem; font-family: var(--font-mono);">180</span>
            </div>

            <div class="pulsos-visual-indicator" id="metro-dots">
              <div class="pulso-dot" id="pdot-1"></div>
              <div class="pulso-dot" id="pdot-2"></div>
              <div class="pulso-dot" id="pdot-3"></div>
              <div class="pulso-dot" id="pdot-4"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; flex-wrap: wrap; gap: 8px;">
              <label style="font-size: 0.85rem; display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" id="chk-contagem-previa" checked>
                Contagem Inicial (4 pulsos prévios)
              </label>
              <div style="display: flex; gap: 8px;">
                <label style="font-size: 0.85rem; display: flex; align-items: center; gap: 6px; cursor: pointer; color: var(--accent);">
                  <input type="checkbox" id="chk-treino-progressivo">
                  +5 BPM / min
                </label>
                <button id="btn-metro-toggle" class="btn btn-primary btn-sm" type="button">▶ Ligar Metrônomo</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Gravador Efêmero de Autoavaliação -->
        <div class="bloco-card" style="margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>Autoavaliação (Gravador)</h4>
            <div id="gravador-controles" style="display: flex; gap: 8px; align-items: center;">
              <button id="btn-gravar-audio" class="btn btn-secondary btn-sm" type="button">🎙 Gravar 30s</button>
              <button id="btn-ouvir-audio" class="btn btn-primary btn-sm" type="button" style="display: none;">▶ Ouvir</button>
              <button id="btn-limpar-audio" class="btn btn-ghost btn-sm" type="button" style="display: none;">Descartar</button>
            </div>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">O áudio é mantido apenas na memória para você se ouvir e descartado ao trocar de tela, poupando espaço. Não é salvo na nuvem.</p>
          <div id="gravador-status" style="font-size: 0.85rem; color: var(--danger); margin-top: 8px; display: none;">Gravando... <span id="gravador-tempo">0</span>s</div>
          <audio id="gravador-player" style="display: none; width: 100%; margin-top: 10px;" controls></audio>
        </div>
      `;

      const slider = $('metro-slider');
      slider.oninput = () => {
        const val = Number(slider.value);
        $('metro-bpm-val').textContent = val;
        if (AudioMotor) AudioMotor.setBpm(val);
      };

      let speedTrainerInterval = null;

      $('btn-metro-toggle').onclick = () => {
        if (!AudioMotor) return;
        if (AudioMotor.isAtivo()) {
          AudioMotor.pararMetronomo();
          $('btn-metro-toggle').textContent = '▶ Ligar Metrônomo';
          limparDotsMetronomo();
          if (speedTrainerInterval) clearInterval(speedTrainerInterval);
        } else {
          const comContagem = $('chk-contagem-previa').checked;
          const bpm = Number(slider.value);
          AudioMotor.iniciarMetronomo(bpm, 4, comContagem, pulsoInfo => {
            atualizarDotsMetronomo(pulsoInfo.tempo, pulsoInfo.isAcento, pulsoInfo.isCountIn);
          });
          $('btn-metro-toggle').textContent = '⏹ Parar Metrônomo';

          // Iniciar Treino Progressivo se selecionado (+5 BPM a cada 1 minuto)
          if ($('chk-treino-progressivo').checked) {
            speedTrainerInterval = setInterval(() => {
              if (AudioMotor.isAtivo()) {
                let currentBpm = Number(slider.value);
                let newBpm = Math.min(currentBpm + 5, Number(slider.max));
                slider.value = newBpm;
                $('metro-bpm-val').textContent = newBpm;
                AudioMotor.setBpm(newBpm);
              }
            }, 60000); // 1 minuto
          }
        }
      };
      
      // Gravador de Autoavaliação
      let mediaRecorder;
      let audioChunks = [];
      let gravacaoInterval;
      
      const btnGravar = $('btn-gravar-audio');
      const btnOuvir = $('btn-ouvir-audio');
      const btnLimpar = $('btn-limpar-audio');
      const player = $('gravador-player');
      const statusGravador = $('gravador-status');
      const tempoGravador = $('gravador-tempo');
      
      if(btnGravar) {
        btnGravar.onclick = async () => {
          if (mediaRecorder && mediaRecorder.state === 'recording') return;
          
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            
            mediaRecorder.ondataavailable = e => {
              if (e.data.size > 0) audioChunks.push(e.data);
            };
            
            mediaRecorder.onstop = () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
              const audioUrl = URL.createObjectURL(audioBlob);
              player.src = audioUrl;
              
              btnOuvir.style.display = 'inline-flex';
              btnLimpar.style.display = 'inline-flex';
              player.style.display = 'none';
              statusGravador.style.display = 'none';
              btnGravar.disabled = false;
              btnGravar.textContent = '🎙 Gravar Novamente';
              
              // Parar as tracks do microfone para não ficar com o ícone vermelho ativo no browser
              stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorder.start();
            btnGravar.disabled = true;
            btnGravar.textContent = 'Gravando...';
            statusGravador.style.display = 'block';
            player.style.display = 'none';
            btnOuvir.style.display = 'none';
            btnLimpar.style.display = 'none';
            
            let segundos = 0;
            tempoGravador.textContent = '0';
            gravacaoInterval = setInterval(() => {
              segundos++;
              tempoGravador.textContent = segundos;
              // Para automaticamente aos 30 segundos
              if (segundos >= 30) {
                if (mediaRecorder.state === 'recording') {
                  mediaRecorder.stop();
                  clearInterval(gravacaoInterval);
                }
              }
            }, 1000);
            
          } catch (err) {
            console.error('Erro ao acessar microfone:', err);
            await mostrarAlerta('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
          }
        };
      }
      
      if(btnOuvir) {
        btnOuvir.onclick = () => {
          player.style.display = 'block';
          player.play();
        };
      }
      
      if(btnLimpar) {
        btnLimpar.onclick = () => {
          audioChunks = [];
          player.src = '';
          player.style.display = 'none';
          btnOuvir.style.display = 'none';
          btnLimpar.style.display = 'none';
          btnGravar.textContent = '🎙 Gravar 30s';
        };
      }
    }
  }

  const LH_PRESETS = {
    Am7: {
      name: "Lá Menor com Sétima (Am7)",
      desc: "Construção baseada no 6º grau (relativo menor) de Dó Maior. Som aveludado com repouso expressivo, sem tensão de trítono.",
      voicingTag: "Tétrade 1-b3-5-b7",
      caged: "Formato 'Am' e 'Em'",
      formula: [
        { degree: "1 (Tônica)", note: "A", color: "#d97736" },
        { degree: "b3 (Terça m)", note: "C", color: "#38a169" },
        { degree: "5J (Quinta)", note: "E", color: "#3182ce" },
        { degree: "b7 (Sétima m)", note: "G", color: "#805ad5" }
      ],
      notes: [
        { str: 0, fret: 0, note: "E", degree: "5", finger: "0", role: "fifth" },
        { str: 0, fret: 3, note: "G", degree: "b7", finger: "3", role: "seventh" },
        { str: 0, fret: 5, note: "A", degree: "1", finger: "1", role: "root" },
        { str: 0, fret: 8, note: "C", degree: "b3", finger: "4", role: "third" },
        { str: 0, fret: 12, note: "E", degree: "5", finger: "1", role: "fifth" },

        { str: 1, fret: 1, note: "C", degree: "b3", finger: "1", role: "third" },
        { str: 1, fret: 5, note: "E", degree: "5", finger: "1", role: "fifth" },
        { str: 1, fret: 8, note: "G", degree: "b7", finger: "4", role: "seventh" },
        { str: 1, fret: 10, note: "A", degree: "1", finger: "1", role: "root" },

        { str: 2, fret: 0, note: "G", degree: "b7", finger: "0", role: "seventh" },
        { str: 2, fret: 2, note: "A", degree: "1", finger: "2", role: "root" },
        { str: 2, fret: 5, note: "C", degree: "b3", finger: "1", role: "third" },
        { str: 2, fret: 9, note: "E", degree: "5", finger: "3", role: "fifth" },
        { str: 2, fret: 12, note: "G", degree: "b7", finger: "1", role: "seventh" },

        { str: 3, fret: 2, note: "E", degree: "5", finger: "2", role: "fifth" },
        { str: 3, fret: 5, note: "G", degree: "b7", finger: "4", role: "seventh" },
        { str: 3, fret: 7, note: "A", degree: "1", finger: "1", role: "root" },
        { str: 3, fret: 10, note: "C", degree: "b3", finger: "4", role: "third" },

        { str: 4, fret: 0, note: "A", degree: "1", finger: "0", role: "root" },
        { str: 4, fret: 3, note: "C", degree: "b3", finger: "3", role: "third" },
        { str: 4, fret: 7, note: "E", degree: "5", finger: "1", role: "fifth" },
        { str: 4, fret: 10, note: "G", degree: "b7", finger: "4", role: "seventh" },
        { str: 4, fret: 12, note: "A", degree: "1", finger: "1", role: "root" },

        { str: 5, fret: 0, note: "E", degree: "5", finger: "0", role: "fifth" },
        { str: 5, fret: 3, note: "G", degree: "b7", finger: "3", role: "seventh" },
        { str: 5, fret: 5, note: "A", degree: "1", finger: "1", role: "root" },
        { str: 5, fret: 8, note: "C", degree: "b3", finger: "4", role: "third" },
        { str: 5, fret: 12, note: "E", degree: "5", finger: "1", role: "fifth" }
      ]
    },
    Cmaj: {
      name: "Dó Maior Jônio (Cmaj)",
      desc: "A tonalidade matriz do sistema ocidental. Tríade maior límpida e brilhante com ressonância aberta.",
      voicingTag: "Escala & Tríade Maior",
      caged: "Formato 'C' e 'A'",
      formula: [
        { degree: "1 (Tônica)", note: "C", color: "#d97736" },
        { degree: "3M (Terça M)", note: "E", color: "#38a169" },
        { degree: "5J (Quinta)", note: "G", color: "#3182ce" },
        { degree: "7M (Sétima M)", note: "B", color: "#805ad5" }
      ],
      notes: [
        { str: 0, fret: 0, note: "E", degree: "3", finger: "0", role: "third" },
        { str: 0, fret: 3, note: "G", degree: "5", finger: "3", role: "fifth" },
        { str: 0, fret: 7, note: "B", degree: "7M", finger: "1", role: "seventh" },
        { str: 0, fret: 8, note: "C", degree: "1", finger: "2", role: "root" },
        { str: 0, fret: 12, note: "E", degree: "3", finger: "1", role: "third" },

        { str: 1, fret: 1, note: "C", degree: "1", finger: "1", role: "root" },
        { str: 1, fret: 5, note: "E", degree: "3", finger: "4", role: "third" },
        { str: 1, fret: 8, note: "G", degree: "5", finger: "4", role: "fifth" },
        { str: 1, fret: 12, note: "B", degree: "7M", finger: "1", role: "seventh" },

        { str: 2, fret: 0, note: "G", degree: "5", finger: "0", role: "fifth" },
        { str: 2, fret: 5, note: "C", degree: "1", finger: "1", role: "root" },
        { str: 2, fret: 9, note: "E", degree: "3", finger: "3", role: "third" },
        { str: 2, fret: 12, note: "G", degree: "5", finger: "1", role: "fifth" },

        { str: 3, fret: 2, note: "E", degree: "3", finger: "2", role: "third" },
        { str: 3, fret: 5, note: "G", degree: "5", finger: "1", role: "fifth" },
        { str: 3, fret: 9, note: "B", degree: "7M", finger: "3", role: "seventh" },
        { str: 3, fret: 10, note: "C", degree: "1", finger: "4", role: "root" },

        { str: 4, fret: 3, note: "C", degree: "1", finger: "3", role: "root" },
        { str: 4, fret: 7, note: "E", degree: "3", finger: "1", role: "third" },
        { str: 4, fret: 10, note: "G", degree: "5", finger: "3", role: "fifth" },

        { str: 5, fret: 0, note: "E", degree: "3", finger: "0", role: "third" },
        { str: 5, fret: 3, note: "G", degree: "5", finger: "3", role: "fifth" },
        { str: 5, fret: 8, note: "C", degree: "1", finger: "1", role: "root" },
        { str: 5, fret: 12, note: "E", degree: "3", finger: "1", role: "third" }
      ]
    },
    Dm79: {
      name: "Ré Menor com Nona (Dm7(9))",
      desc: "Típica harmonia de Bossa Nova e MPB (acorde II cadencial em Dó Maior). Som sofisticado e poético.",
      voicingTag: "Tétrade + 9ª Adicionada",
      caged: "Formato 'Dm' & Drop 3",
      formula: [
        { degree: "1 (Tônica)", note: "D", color: "#d97736" },
        { degree: "b3 (Terça m)", note: "F", color: "#38a169" },
        { degree: "5J (Quinta)", note: "A", color: "#3182ce" },
        { degree: "9 (Nona M)", note: "E", color: "#ffb95f" }
      ],
      notes: [
        { str: 0, fret: 0, note: "E", degree: "9", finger: "0", role: "ext" },
        { str: 0, fret: 1, note: "F", degree: "b3", finger: "1", role: "third" },
        { str: 0, fret: 5, note: "A", degree: "5", finger: "1", role: "fifth" },
        { str: 0, fret: 8, note: "C", degree: "b7", finger: "3", role: "seventh" },
        { str: 0, fret: 10, note: "D", degree: "1", finger: "4", role: "root" },

        { str: 1, fret: 1, note: "C", degree: "b7", finger: "1", role: "seventh" },
        { str: 1, fret: 3, note: "D", degree: "1", finger: "3", role: "root" },
        { str: 1, fret: 5, note: "E", degree: "9", finger: "4", role: "ext" },
        { str: 1, fret: 6, note: "F", degree: "b3", finger: "2", role: "third" },
        { str: 1, fret: 10, note: "A", degree: "5", finger: "3", role: "fifth" },

        { str: 2, fret: 2, note: "A", degree: "5", finger: "2", role: "fifth" },
        { str: 2, fret: 5, note: "C", degree: "b7", finger: "1", role: "seventh" },
        { str: 2, fret: 7, note: "D", degree: "1", finger: "3", role: "root" },
        { str: 2, fret: 9, note: "E", degree: "9", finger: "4", role: "ext" },
        { str: 2, fret: 10, note: "F", degree: "b3", finger: "2", role: "third" },

        { str: 3, fret: 0, note: "D", degree: "1", finger: "0", role: "root" },
        { str: 3, fret: 3, note: "F", degree: "b3", finger: "3", role: "third" },
        { str: 3, fret: 7, note: "A", degree: "5", finger: "1", role: "fifth" },
        { str: 3, fret: 10, note: "C", degree: "b7", finger: "4", role: "seventh" },

        { str: 4, fret: 0, note: "A", degree: "5", finger: "0", role: "fifth" },
        { str: 4, fret: 3, note: "C", degree: "b7", finger: "2", role: "seventh" },
        { str: 4, fret: 5, note: "D", degree: "1", finger: "4", role: "root" },
        { str: 4, fret: 7, note: "E", degree: "9", finger: "1", role: "ext" },
        { str: 4, fret: 8, note: "F", degree: "b3", finger: "2", role: "third" },

        { str: 5, fret: 1, note: "F", degree: "b3", finger: "1", role: "third" },
        { str: 5, fret: 5, note: "A", degree: "5", finger: "1", role: "fifth" },
        { str: 5, fret: 10, note: "D", degree: "1", finger: "4", role: "root" },
        { str: 5, fret: 12, note: "E", degree: "9", finger: "1", role: "ext" }
      ]
    },
    G7: {
      name: "Sol Dominante (G7)",
      desc: "Acorde de máxima tensão harmônica com trítono ativo entre a terça maior (B) e a sétima menor (F). Prepara resolução cadencial.",
      voicingTag: "Dominante Primário V7",
      caged: "Formato 'E' e 'G'",
      formula: [
        { degree: "1 (Tônica)", note: "G", color: "#d97736" },
        { degree: "3M (Terça M)", note: "B", color: "#38a169" },
        { degree: "5J (Quinta)", note: "D", color: "#3182ce" },
        { degree: "b7 (Sétima m)", note: "F", color: "#805ad5" }
      ],
      notes: [
        { str: 0, fret: 1, note: "F", degree: "b7", finger: "1", role: "seventh" },
        { str: 0, fret: 3, note: "G", degree: "1", finger: "3", role: "root" },
        { str: 0, fret: 7, note: "B", degree: "3", finger: "1", role: "third" },
        { str: 0, fret: 10, note: "D", degree: "5", finger: "4", role: "fifth" },

        { str: 1, fret: 0, note: "B", degree: "3", finger: "0", role: "third" },
        { str: 1, fret: 3, note: "D", degree: "5", finger: "3", role: "fifth" },
        { str: 1, fret: 6, note: "F", degree: "b7", finger: "1", role: "seventh" },
        { str: 1, fret: 8, note: "G", degree: "1", finger: "3", role: "root" },

        { str: 2, fret: 0, note: "G", degree: "1", finger: "0", role: "root" },
        { str: 2, fret: 4, note: "B", degree: "3", finger: "2", role: "third" },
        { str: 2, fret: 7, note: "D", degree: "5", finger: "1", role: "fifth" },
        { str: 2, fret: 10, note: "F", degree: "b7", finger: "4", role: "seventh" },

        { str: 3, fret: 0, note: "D", degree: "5", finger: "0", role: "fifth" },
        { str: 3, fret: 3, note: "F", degree: "b7", finger: "1", role: "seventh" },
        { str: 3, fret: 5, note: "G", degree: "1", finger: "3", role: "root" },
        { str: 3, fret: 9, note: "B", degree: "3", finger: "4", role: "third" },

        { str: 4, fret: 2, note: "B", degree: "3", finger: "1", role: "third" },
        { str: 4, fret: 5, note: "D", degree: "5", finger: "3", role: "fifth" },
        { str: 4, fret: 8, note: "F", degree: "b7", finger: "4", role: "seventh" },
        { str: 4, fret: 10, note: "G", degree: "1", finger: "1", role: "root" },

        { str: 5, fret: 1, note: "F", degree: "b7", finger: "1", role: "seventh" },
        { str: 5, fret: 3, note: "G", degree: "1", finger: "3", role: "root" },
        { str: 5, fret: 7, note: "B", degree: "3", finger: "1", role: "third" },
        { str: 5, fret: 10, note: "D", degree: "5", finger: "4", role: "fifth" }
      ]
    },
    EmPent: {
      name: "Mi Menor Pentatônica (Em Pent)",
      desc: "A digitação mais natural e ressonante do violão. Elimina semitons gerando sonoridade aberta e direta.",
      voicingTag: "Pentatônica Menor",
      caged: "Shape 1 Clássico",
      formula: [
        { degree: "1 (Tônica)", note: "E", color: "#d97736" },
        { degree: "b3 (Terça m)", note: "G", color: "#38a169" },
        { degree: "4 (Quarta J)", note: "A", color: "#ffb95f" },
        { degree: "5J (Quinta)", note: "B", color: "#3182ce" }
      ],
      notes: [
        { str: 0, fret: 0, note: "E", degree: "1", finger: "0", role: "root" },
        { str: 0, fret: 3, note: "G", degree: "b3", finger: "3", role: "third" },
        { str: 0, fret: 5, note: "A", degree: "4", finger: "1", role: "ext" },
        { str: 0, fret: 7, note: "B", degree: "5", finger: "2", role: "fifth" },
        { str: 0, fret: 10, note: "D", degree: "b7", finger: "4", role: "seventh" },
        { str: 0, fret: 12, note: "E", degree: "1", finger: "1", role: "root" },

        { str: 1, fret: 0, note: "B", degree: "5", finger: "0", role: "fifth" },
        { str: 1, fret: 3, note: "D", degree: "b7", finger: "3", role: "seventh" },
        { str: 1, fret: 5, note: "E", degree: "1", finger: "1", role: "root" },
        { str: 1, fret: 8, note: "G", degree: "b3", finger: "4", role: "third" },
        { str: 1, fret: 12, note: "B", degree: "5", finger: "1", role: "fifth" },

        { str: 2, fret: 0, note: "G", degree: "b3", finger: "0", role: "third" },
        { str: 2, fret: 2, note: "A", degree: "4", finger: "2", role: "ext" },
        { str: 2, fret: 4, note: "B", degree: "5", finger: "3", role: "fifth" },
        { str: 2, fret: 7, note: "D", degree: "b7", finger: "1", role: "seventh" },
        { str: 2, fret: 9, note: "E", degree: "1", finger: "3", role: "root" },
        { str: 2, fret: 12, note: "G", degree: "b3", finger: "1", role: "third" },

        { str: 3, fret: 0, note: "D", degree: "b7", finger: "0", role: "seventh" },
        { str: 3, fret: 2, note: "E", degree: "1", finger: "2", role: "root" },
        { str: 3, fret: 5, note: "G", degree: "b3", finger: "1", role: "third" },
        { str: 3, fret: 7, note: "A", degree: "4", finger: "3", role: "ext" },
        { str: 3, fret: 9, note: "B", degree: "5", finger: "4", role: "fifth" },

        { str: 4, fret: 0, note: "A", degree: "4", finger: "0", role: "ext" },
        { str: 4, fret: 2, note: "B", degree: "5", finger: "2", role: "fifth" },
        { str: 4, fret: 5, note: "D", degree: "b7", finger: "1", role: "seventh" },
        { str: 4, fret: 7, note: "E", degree: "1", finger: "3", role: "root" },
        { str: 4, fret: 10, note: "G", degree: "b3", finger: "4", role: "third" },

        { str: 5, fret: 0, note: "E", degree: "1", finger: "0", role: "root" },
        { str: 5, fret: 3, note: "G", degree: "b3", finger: "3", role: "third" },
        { str: 5, fret: 5, note: "A", degree: "4", finger: "1", role: "ext" },
        { str: 5, fret: 7, note: "B", degree: "5", finger: "2", role: "fifth" },
        { str: 5, fret: 10, note: "D", degree: "b7", finger: "4", role: "seventh" },
        { str: 5, fret: 12, note: "E", degree: "1", finger: "1", role: "root" }
      ]
    }
  };

  const LH_BASE_FREQS = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41];
  function lhCalcularFreq(strIndex, fret) {
    return LH_BASE_FREQS[strIndex] * Math.pow(2, fret / 12);
  }

  let lhPresetKey = 'Am7';
  let lhViewMode = 'degrees'; // 'degrees', 'notes', 'fingers'
  let lhTriadOnly = false;

  function renderizarLaboratorioHarmonicoHTML() {
    return `
      <div class="lh-console">
        <div>
          <label style="display:block; font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-bottom:6px;">Acorde / Estrutura Escalar</label>
          <select id="lh-select-chord" class="lh-select">
            <option value="Am7" ${lhPresetKey === 'Am7' ? 'selected' : ''}>Am7 • Lá Menor com 7ª (Tétrade & Inversões)</option>
            <option value="Cmaj" ${lhPresetKey === 'Cmaj' ? 'selected' : ''}>C Maior (Jônio) • Escala Completa & Tríades</option>
            <option value="Dm79" ${lhPresetKey === 'Dm79' ? 'selected' : ''}>Dm7(9) • Ré Menor com 9ª (Modo Dórico)</option>
            <option value="G7" ${lhPresetKey === 'G7' ? 'selected' : ''}>G7 • Sol Dominante (Mixolídio)</option>
            <option value="EmPent" ${lhPresetKey === 'EmPent' ? 'selected' : ''}>Em Pentatônica • Menor Blues</option>
          </select>
        </div>

        <div>
          <label style="display:block; font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-bottom:6px;">Modo de Visualização</label>
          <div class="lh-view-toggle">
            <button id="lh-mode-degrees" class="lh-toggle-btn ${lhViewMode === 'degrees' ? 'ativo' : ''}" type="button">Graus (1, b3)</button>
            <button id="lh-mode-notes" class="lh-toggle-btn ${lhViewMode === 'notes' ? 'ativo' : ''}" type="button">Notas (A, C)</button>
            <button id="lh-mode-fingers" class="lh-toggle-btn ${lhViewMode === 'fingers' ? 'ativo' : ''}" type="button">Dedos (1, 2)</button>
          </div>
        </div>

        <div>
          <label style="display:block; font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:600; margin-bottom:6px;">Execução com Som Real</label>
          <div style="display:flex; gap:8px;">
            <button id="lh-btn-arpejo" class="btn btn-primary btn-sm" type="button" style="flex:1;">▶ Tocar Arpejo</button>
            <button id="lh-btn-strum" class="btn btn-secondary btn-sm" type="button" style="flex:1;">🎵 Dedilhado</button>
          </div>
        </div>
      </div>

      <div class="lh-fretboard-wrap">
        <div class="lh-fretboard-inner">
          <div class="lh-fret-numbers">
            <div>NUT</div>
            <div>1</div>
            <div>2</div>
            <div style="color:var(--secondary);">3 •</div>
            <div>4</div>
            <div style="color:var(--secondary);">5 •</div>
            <div>6</div>
            <div style="color:var(--secondary);">7 •</div>
            <div>8</div>
            <div style="color:var(--secondary);">9 •</div>
            <div>10</div>
            <div>11</div>
            <div style="color:var(--secondary);">12 ••</div>
          </div>

          <div class="lh-board-body" id="lh-board-container">
            <!-- Inlay Dots -->
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 2.5);"></div>
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 4.5);"></div>
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 6.5);"></div>
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 8.5);"></div>
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 11.5); top:35%;"></div>
            <div class="lh-inlay-dot" style="left:calc(50px + (100% - 50px)/12 * 11.5); top:65%;"></div>

            <!-- Frets -->
            <div class="lh-nut-bone"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire"></div>
            <div class="lh-fret-wire double"></div>

            <!-- Strings -->
            <div class="lh-string-line" style="top:12%; height:1.5px; opacity:0.85;"></div>
            <div class="lh-string-line" style="top:27%; height:2.0px; opacity:0.9;"></div>
            <div class="lh-string-line" style="top:42%; height:2.6px; opacity:0.9;"></div>
            <div class="lh-string-line" style="top:57%; height:3.4px; background:#a38c80;"></div>
            <div class="lh-string-line" style="top:72%; height:4.2px; background:#8f796e;"></div>
            <div class="lh-string-line" style="top:87%; height:5.2px; background:#7a665c;"></div>

            <!-- Notes Overlay Layer -->
            <div class="lh-notes-layer" id="lh-notes-overlay"></div>
          </div>
        </div>
      </div>

      <div class="lh-chord-info-grid" id="lh-info-section"></div>
    `;
  }

  function inicializarLaboratorioHarmonico() {
    const chordSelect = $('lh-select-chord');
    if (!chordSelect) return;

    chordSelect.onchange = () => {
      lhPresetKey = chordSelect.value;
      desenharNotasLaboratorio();
    };

    $('lh-mode-degrees').onclick = () => {
      lhViewMode = 'degrees';
      atualizarBotoesModo();
      desenharNotasLaboratorio();
    };
    $('lh-mode-notes').onclick = () => {
      lhViewMode = 'notes';
      atualizarBotoesModo();
      desenharNotasLaboratorio();
    };
    $('lh-mode-fingers').onclick = () => {
      lhViewMode = 'fingers';
      atualizarBotoesModo();
      desenharNotasLaboratorio();
    };

    $('lh-btn-arpejo').onclick = () => tocarArpejoLaboratorio(lhPresetKey);
    $('lh-btn-strum').onclick = () => tocarDedilhadoLaboratorio(lhPresetKey);

    desenharNotasLaboratorio();
  }

  function atualizarBotoesModo() {
    ['degrees', 'notes', 'fingers'].forEach(m => {
      const btn = $(`lh-mode-${m}`);
      if (btn) btn.classList.toggle('ativo', lhViewMode === m);
    });
  }

  function desenharNotasLaboratorio() {
    const overlay = $('lh-notes-overlay');
    const infoSec = $('lh-info-section');
    if (!overlay || !infoSec) return;

    const p = LH_PRESETS[lhPresetKey];
    if (!p) return;

    const stringYPercents = [12, 27, 42, 57, 72, 87];

    overlay.innerHTML = p.notes.map(n => {
      const leftStr = n.fret === 0
        ? '25px'
        : `calc(50px + (100% - 50px) / 12 * ${n.fret - 0.5})`;
      const topStr = `${stringYPercents[n.str]}%`;

      let label = n.degree;
      if (lhViewMode === 'notes') label = n.note;
      else if (lhViewMode === 'fingers') label = n.finger === '0' ? 'O' : n.finger;

      return `
        <div class="lh-note-pill ${n.role}" style="left:${leftStr}; top:${topStr};" data-str="${n.str}" data-fret="${n.fret}" title="Corda ${6 - n.str} • Casa ${n.fret} • Nota ${n.note} (${n.degree})">
          ${label}
        </div>
      `;
    }).join('');

    // Click on notes to play audio
    overlay.querySelectorAll('.lh-note-pill').forEach(el => {
      el.onclick = () => {
        const s = Number(el.dataset.str);
        const f = Number(el.dataset.fret);
        if (AudioMotor) AudioMotor.tocarFrequencia(lhCalcularFreq(s, f), 0.7, 0, 'triangle');
      };
    });

    infoSec.innerHTML = `
      <div class="bloco-card">
        <div style="font-size:0.75rem; color:var(--secondary); text-transform:uppercase; font-weight:700;">${p.voicingTag}</div>
        <h4 style="margin:4px 0 8px 0;">${escapeHTML(p.name)}</h4>
        <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5;">${escapeHTML(p.desc)}</p>
        <div style="margin-top:12px; font-size:0.8rem; color:var(--text-dim);">
          <strong>Mapeamento CAGED:</strong> <span style="color:var(--text-main); font-weight:600;">${escapeHTML(p.caged)}</span>
        </div>
      </div>

      <div class="bloco-card">
        <h5 style="margin-bottom:12px; font-size:0.9rem;">Fórmula Intervalar do Acorde</h5>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(60px, 1fr)); gap:8px;">
          ${p.formula.map(f => `
            <div style="background:var(--bg-surface-subtle); padding:8px; border-radius:var(--radius-sm); text-align:center;">
              <span style="font-size:0.72rem; color:${f.color}; font-weight:600; display:block;">${escapeHTML(f.degree)}</span>
              <strong style="font-size:1.1rem; color:var(--text-main); font-family:var(--font-mono);">${escapeHTML(f.note)}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function tocarArpejoLaboratorio(presetKey) {
    if (!AudioMotor) return;
    const p = LH_PRESETS[presetKey];
    if (!p) return;
    const sortedNotes = [...p.notes].sort((a, b) => b.str - a.str || a.fret - b.fret);
    const picked = [];
    const visited = new Set();
    for (const n of sortedNotes) {
      if (!visited.has(n.str)) {
        visited.add(n.str);
        picked.push(n);
      }
    }
    picked.forEach((n, idx) => {
      setTimeout(() => {
        AudioMotor.tocarFrequencia(lhCalcularFreq(n.str, n.fret), 0.8, 0, 'triangle');
      }, idx * 160);
    });
  }

  function tocarDedilhadoLaboratorio(presetKey) {
    if (!AudioMotor) return;
    const p = LH_PRESETS[presetKey];
    if (!p) return;
    const sortedNotes = [...p.notes].sort((a, b) => b.str - a.str || a.fret - b.fret);
    const picked = [];
    const visited = new Set();
    for (const n of sortedNotes) {
      if (!visited.has(n.str)) {
        visited.add(n.str);
        picked.push(n);
      }
    }
    picked.forEach((n, idx) => {
      setTimeout(() => {
        AudioMotor.tocarFrequencia(lhCalcularFreq(n.str, n.fret), 1.0, 0, 'triangle');
      }, idx * 45);
    });
  }

  function renderizarTelaPraticar() {
    const container = $('praticar-conteudo');
    if (!container) return;

    const abaAtiva = state.praticarAba || 'atividades';

    container.innerHTML = `
      <div class="laboratorio-header">
        <div>
          <div style="font-size:0.75rem; color:var(--secondary); text-transform:uppercase; font-weight:600; letter-spacing:0.04em;">Laboratório de Prática • Método Tríade</div>
          <h2 style="margin:4px 0 0 0;">Central de Prática & Laboratório Harmônico</h2>
        </div>
        <div class="lh-tabs" style="margin-bottom:0; border-bottom:none; padding-bottom:0;">
          <button id="tab-praticar-atividades" class="lh-tab-btn ${abaAtiva === 'atividades' ? 'ativo' : ''}" type="button">Atividades Guiadas (11)</button>
          <button id="tab-praticar-laboratorio" class="lh-tab-btn ${abaAtiva === 'laboratorio' ? 'ativo' : ''}" type="button">Laboratório Harmônico (12 Trastes)</button>
        </div>
      </div>

      <div id="painel-praticar-atividades" style="display: ${abaAtiva === 'atividades' ? 'block' : 'none'};">
        <p style="margin-bottom:16px; color:var(--text-muted); font-size:0.9rem;">
          ${atividadesDados.filter(atividadeTemSessao).length} atividades com roteiro de sessão estruturado de 40 minutos.
        </p>
        <div class="praticar-cards-grid">
          ${atividadesDados.map(a => `
            <div class="card-atividade">
              <div class="card-atividade-topo">
                <span class="card-area-badge">${escapeHTML(a.area)}</span>
                <h4>${escapeHTML(a.titulo)}</h4>
                <p>${escapeHTML(a.metaObservavel)}</p>
                <div class="card-tags">
                  ${a.tags.map(t => `<span class="tag-pill">#${escapeHTML(t)}</span>`).join('')}
                </div>
              </div>
              <button class="btn btn-primary btn-iniciar-ativ" data-id="${escapeHTML(a.id)}" type="button" style="width: 100%;" ${atividadeTemSessao(a) ? '' : 'disabled'}>
                ${atividadeTemSessao(a) ? 'Praticar esta atividade' : 'Proposta em elaboração'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <div id="painel-praticar-laboratorio" style="display: ${abaAtiva === 'laboratorio' ? 'block' : 'none'};">
        ${renderizarLaboratorioHarmonicoHTML()}
      </div>
    `;

    $('tab-praticar-atividades').onclick = () => {
      state.praticarAba = 'atividades';
      renderizarTelaPraticar();
    };
    $('tab-praticar-laboratorio').onclick = () => {
      state.praticarAba = 'laboratorio';
      renderizarTelaPraticar();
    };

    document.querySelectorAll('.btn-iniciar-ativ').forEach(btn => {
      btn.onclick = () => {
        const novaId = btn.dataset.id;
        trocarAtividade(novaId);
        navegarPara('aprender');
      };
    });

    if (abaAtiva === 'laboratorio') {
      inicializarLaboratorioHarmonico();
    }
  }

  function renderizarTelaProgresso() {
    const container = $('progresso-conteudo');
    if (!container) return;

    const difPendentes = state.dificuldades ? state.dificuldades.filter(d => !d.resolvida).length : 0;
    const dataHoje = (typeof window !== 'undefined' && window.obterDataLocal) ? window.obterDataLocal() : obterDataLocal();
    const revisoesPendentes = state.revisoes ? state.revisoes.filter(r => !r.concluida) : [];
    const revHoje = revisoesPendentes.filter(r => r.dataPrevista <= dataHoje).length;
    
    // Taxa de retenção
    const totalTentativas = state.tentativas ? state.tentativas.length : 0;
    const sucessos = state.tentativas ? state.tentativas.filter(t => t.status === 'consegui').length : 0;
    const retencaoPct = totalTentativas > 0 ? Math.round((sucessos / totalTentativas) * 100) : 89;

    const dificuldadesHtml = state.dificuldades.length === 0
      ? '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 12px 0;">Nenhuma dificuldade pendente no momento.</p>'
      : state.dificuldades.map(d => `
        <div class="dificuldade-item">
          <div class="dificuldade-texto">
            <strong>${escapeHTML(d.trecho)}</strong>
            <p>${escapeHTML(d.problema)}</p>
            <small style="color: var(--text-dim);">Registrado em ${escapeHTML(d.data)} · Status: ${d.resolvida ? '✓ Resolvida' : 'Pendente'}</small>
          </div>
          <div style="display: flex; gap: 6px;">
            ${!d.resolvida ? `<button class="btn btn-secondary btn-sm btn-recuperar-dif" data-id="${escapeHTML(d.id)}" type="button">Recuperar</button>
            <button class="btn btn-ghost btn-sm btn-resolver-dif" data-id="${escapeHTML(d.id)}" type="button">✓ Concluir</button>` : ''}
          </div>
        </div>
      `).join('');

    const revisoesHtml = revisoesPendentes.length === 0
      ? '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 12px 0;">Nenhuma revisão pendente no momento.</p>'
      : revisoesPendentes.map(r => {
        const ativ = atividadesDados.find(a => a.id === r.atividadeId) || { titulo: 'Atividade' };
        return `
          <div class="revisao-item">
            <div>
              <strong>${escapeHTML(ativ.titulo)}</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Ciclo ${r.ciclo} · Intervalo de ${r.intervaloDias} dias</div>
            </div>
            <div style="text-align: right;">
              <span class="revisao-data">Prevista: ${escapeHTML(r.dataPrevista)}</span>
              <button class="btn btn-secondary btn-sm btn-revisar-agora" data-id="${escapeHTML(r.id)}" type="button" style="margin-top: 4px; display: block;">Revisar</button>
            </div>
          </div>
        `;
      }).join('');

    container.innerHTML = `
      <div class="view-header">
        <h2>Caderno de Dificuldades & Revisão Espaçada</h2>
        <p>Prática deliberada orientada a gargalos técnicos e consolidação neuromuscular de longo prazo no violão.</p>
      </div>

      <!-- Quick Metrics Strip (Stitch) -->
      <div class="metrics-strip-grid">
        <div class="metric-card">
          <div class="metric-card-info">
            <strong>Trechos Críticos</strong>
            <div style="display:flex; align-items:baseline; gap:6px;">
              <span class="metric-card-num">${difPendentes}</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">ativos em foco</span>
            </div>
          </div>
          <div class="metric-card-icon" style="color:var(--accent);">⚠️</div>
        </div>

        <div class="metric-card">
          <div class="metric-card-info">
            <strong>Fila do Dia</strong>
            <div style="display:flex; align-items:baseline; gap:6px;">
              <span class="metric-card-num" style="color:var(--secondary);">${revHoje}</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">revisões programadas</span>
            </div>
          </div>
          <div class="metric-card-icon" style="color:var(--secondary);">⏱</div>
        </div>

        <div class="metric-card">
          <div class="metric-card-info">
            <strong>Retenção Estimada</strong>
            <div style="display:flex; align-items:baseline; gap:6px;">
              <span class="metric-card-num" style="color:var(--text-main); font-family:var(--font-mono);">${retencaoPct}%</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">taxa de consolidação</span>
            </div>
          </div>
          <div class="metric-card-icon" style="color:#38a169;">📈</div>
        </div>
      </div>

      <!-- Visão Geral de Domínio Técnico (Stitch) -->
      <div class="domain-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:8px;">
          <div>
            <h3 style="margin:0; font-size:1.1rem; font-weight:600;">Visão Geral de Domínio Técnico</h3>
            <p style="margin:2px 0 0 0; font-size:0.85rem; color:var(--text-muted);">Métricas de precisão mecânica, estabilidade rítmica e velocidade captadas nas sessões</p>
          </div>
          <div style="background:var(--bg-surface-inset); padding:4px 12px; border-radius:20px; font-size:0.75rem; border:1px solid var(--border-subtle); color:var(--text-dim);">
            Gargalo prioritário: <strong style="color:var(--accent);">Transição postural na troca C → F</strong>
          </div>
        </div>

        <div class="domain-bars-grid">
          <div class="domain-bar-item">
            <div class="domain-bar-header">
              <span>Ritmo & Pulso</span>
              <span style="color:var(--secondary); font-size:0.75rem;">74%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Desvio médio: <code style="color:var(--accent);">12ms</code> a 72 BPM</div>
            <div class="domain-bar-track">
              <div class="domain-bar-fill" style="width: 74%;"></div>
            </div>
          </div>

          <div class="domain-bar-item">
            <div class="domain-bar-header">
              <span>Troca de Acordes</span>
              <span style="color:var(--accent); font-size:0.75rem;">68%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Gargalo: <code style="color:var(--accent);">C → F</code> e <code style="color:var(--accent);">G/B → Cadd9</code></div>
            <div class="domain-bar-track">
              <div class="domain-bar-fill" style="width: 68%;"></div>
            </div>
          </div>

          <div class="domain-bar-item">
            <div class="domain-bar-header">
              <span>Reconhecimento Auditivo</span>
              <span style="color:var(--secondary); font-size:0.75rem;">62%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Discriminação: 3ªs maiores e 5ªs justas</div>
            <div class="domain-bar-track">
              <div class="domain-bar-fill" style="width: 62%;"></div>
            </div>
          </div>

          <div class="domain-bar-item">
            <div class="domain-bar-header">
              <span>Dedilhados & Independência Motora</span>
              <span style="color:#38a169; font-size:0.75rem;">82%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim);">P-I-M consolidado a 60 BPM</div>
            <div class="domain-bar-track">
              <div class="domain-bar-fill" style="width: 82%;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="progresso-grid">
        <div class="caderno-dificuldades-card">
          <h4>Caderno de Dificuldades (Pontos de Atenção)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">
            Trechos onde você observou falha motora ou chiado. Clicar em "Recuperar" inicia a versão de Preparação correspondente.
          </p>
          <div id="lista-dificuldades">${dificuldadesHtml}</div>
        </div>

        <div class="revisao-espacada-card">
          <h4>Agenda de Revisão Espaçada (2 / 7 / 21 Dias)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">
            Apenas uma revisão ativa por atividade. Sucesso no Alvo avança o ciclo; repetir ou dificuldade reprograma a recuperação sem multiplicar dívidas.
          </p>
          <div id="lista-revisoes">${revisoesHtml}</div>
        </div>
      </div>

      <!-- Backup e Gerenciamento -->
      <div class="bloco-card" style="margin-top: 24px;">
        <h3 class="bloco-titulo" style="margin-bottom: 15px;">Evolução de BPM (Alvo)</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${atividadesDados.map(ativ => {
            const tentativasAlvo = state.tentativas.filter(t => t.atividadeId === ativ.id && t.nivel === 'alvo' && (t.bpm > 0));
            if (tentativasAlvo.length < 2) return '';
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface-subtle); padding: 10px 14px; border-radius: var(--radius-sm);">
                <span style="font-size: 0.9rem; font-weight: 500;">${escapeHTML(ativ.titulo)}</span>
                ${gerarSparklineBPM(tentativasAlvo)}
              </div>
            `;
          }).join('') || '<p style="color: var(--text-muted); font-size: 0.9rem;">Pratique o nível Alvo pelo menos duas vezes para ver o gráfico.</p>'}
        </div>
      </div>

      <div class="bloco-card" style="margin-top: 24px;">
        <h4>Seu Backup de Aprendizagem</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 14px;">
          Seus registros ficam guardados no navegador sob chave isolada. Você pode exportar uma cópia completa em JSON ou importar backups anteriores.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          <button id="btn-exportar-backup" class="btn btn-secondary" type="button">💾 Exportar Backup Completo (JSON)</button>
          <label class="btn btn-secondary" style="cursor: pointer;">
            📁 Carregar Arquivo de Backup
            <input type="file" id="input-importar-backup" accept=".json,application/json" style="display: none;">
          </label>
          <button id="btn-migrar-v1-explicito" class="btn btn-ghost btn-sm" type="button">🔄 Importar dados da interface anterior (v1)</button>
        </div>
        <p id="msg-backup-status" style="font-size: 0.85rem; margin-top: 10px; color: var(--accent);"></p>
      </div>
    `;

    // Ações do Caderno de Dificuldades
    document.querySelectorAll('.btn-recuperar-dif').forEach(btn => {
      btn.onclick = () => {
        const dif = state.dificuldades.find(d => d.id === btn.dataset.id);
        if (dif) {
          trocarAtividade(dif.atividadeId); state.nivelExercicioAtual = 'preparacao'; state.sessao.nivel = 'preparacao'; salvarEstado();
          navegarPara('aprender');
        }
      };
    });

    document.querySelectorAll('.btn-resolver-dif').forEach(btn => {
      btn.onclick = () => {
        const dif = state.dificuldades.find(d => d.id === btn.dataset.id);
        if (dif) {
          dif.resolvida = true;
          salvarEstado();
          renderizarTelaProgresso();
        }
      };
    });

    // Ações da Revisão Espaçada
    document.querySelectorAll('.btn-revisar-agora').forEach(btn => {
      btn.onclick = () => {
        const rev = state.revisoes.find(r => r.id === btn.dataset.id);
        if (rev) {
          trocarAtividade(rev.atividadeId, 'alvo');
          navegarPara('aprender');
        }
      };
    });

    $('btn-exportar-backup').onclick = exportarBackupJSON;
    $('input-importar-backup').onchange = e => processarArquivoBackup(e);
    $('btn-migrar-v1-explicito').onclick = () => importarLegadoV1Explicito();
  }

function renderizarTelaBiblioteca() {
    const container = $('biblioteca-conteudo');
    if (!container) return;

    container.innerHTML = `
      <div class="view-header">
        <h2>Biblioteca e Acervo de Referência</h2>
        <p>Os 11 módulos e 300 aulas originais do Método Tríade catalogados no Google Drive.</p>
      </div>

      <div class="biblioteca-toolbar">
        <div class="search-field">
          <input type="search" id="bib-busca" placeholder="Buscar por título de aula, conceito ou módulo...">
        </div>
        <div class="select-field" style="width: 220px;">
          <select id="bib-filtro-modulo">
            <option value="todos">Todos os Módulos</option>
            ${catalogoDados.catalogoOriginal.map(m => `<option value="${escapeHTML(m.id)}">${escapeHTML(m.nome)}</option>`).join('')}
          </select>
        </div>
        <div class="select-field" style="width: 200px;">
          <select id="bib-filtro-tipo">
            <option value="todos">Todos os Materiais</option>
            <option value="video">Com Vídeo</option>
            <option value="pdf">Com PDF</option>
            <option value="disponivel">Com Arquivos</option>
            <option value="indisponivel">Sem Arquivos</option>
          </select>
        </div>
      </div>

      <div id="bib-resultados-lista" class="biblioteca-lista"></div>
    `;

    $('bib-busca').oninput = filtrarBiblioteca;
    $('bib-filtro-modulo').onchange = filtrarBiblioteca;
    $('bib-filtro-tipo').onchange = filtrarBiblioteca;

    filtrarBiblioteca();
  }

function filtrarBiblioteca() {
    const listaContainer = $('bib-resultados-lista');
    if (!listaContainer) return;

    const query = ($('bib-busca').value || '').trim().toLowerCase();
    const modId = $('bib-filtro-modulo').value;
    const tipo = $('bib-filtro-tipo').value;

    let totalEncontrado = 0;
    listaContainer.innerHTML = '';

    for (const mod of catalogoDados.catalogoOriginal) {
      if (modId !== 'todos' && mod.id !== modId) continue;

      const aulasFiltradas = mod.aulas.filter(aula => {
        if (query) {
          const matchQuery = aula.grupo_aula.toLowerCase().includes(query) ||
            mod.nome.toLowerCase().includes(query) ||
            aula.materiais.some(m => m.titulo.toLowerCase().includes(query));
          if (!matchQuery) return false;
        }

        if (tipo === 'video') return aula.materiais.some(m => m.tipo === 'video' && m.utilizavel);
        if (tipo === 'pdf') return aula.materiais.some(m => m.tipo === 'pdf' && m.utilizavel);
        if (tipo === 'disponivel') return aula.temArquivos;
        if (tipo === 'indisponivel') return !aula.temArquivos;

        return true;
      });

      if (!aulasFiltradas.length) continue;
      totalEncontrado += aulasFiltradas.length;

      const accordion = document.createElement('details');
      accordion.className = 'modulo-accordion';
      accordion.open = true;

      accordion.innerHTML = `
        <summary>${escapeHTML(mod.nome)} (${aulasFiltradas.length} aulas)</summary>
        <div class="modulo-aulas-container">
          ${aulasFiltradas.map(aula => `
            <div class="aula-item">
              <div class="aula-item-info">
                <span class="aula-item-titulo">${escapeHTML(aula.grupo_aula)}</span>
                <div class="aula-item-links">
                  ${aula.materiais.map(mat => {
                    if (mat.utilizavel && mat.url && mat.url.startsWith('https://drive.google.com')) {
                      return `<a href="${escapeHTML(mat.url)}" target="_blank" rel="noopener noreferrer">↗ ${escapeHTML(mat.tipo.toUpperCase())}: ${escapeHTML(mat.titulo)}</a>`;
                    } else {
                      return `<span style="color: var(--text-dim); font-size: 0.75rem;">${escapeHTML(mat.tipo)}: ${escapeHTML(mat.titulo)} (indisponível)</span>`;
                    }
                  }).join(' · ')}
                </div>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-dim);">ID: ${escapeHTML(aula.id)}</span>
            </div>
          `).join('')}
        </div>
      `;

      listaContainer.appendChild(accordion);
    }

    if (totalEncontrado === 0) {
      listaContainer.innerHTML = '<p style="padding: 20px; color: var(--text-muted); text-align: center;">Nenhuma aula encontrada para os filtros selecionados.</p>';
    }
  }

function gerarSparklineBPM(tentativas) {
  if (!tentativas || tentativas.length < 2) return '';
  const maxBpm = Math.max(...tentativas.map(t => t.bpm || 0));
  if (maxBpm === 0) return '';
  const w = 120, h = 30;
  const pontos = tentativas.map((t, i) =>
    `${(i / (tentativas.length - 1)) * w},${h - ((t.bpm || 0) / maxBpm) * h}`
  ).join(' ');
  return `<svg width="${w}" height="${h}" class="sparkline" style="margin-left: 10px; vertical-align: middle;">
    <polyline points="${pontos}" fill="none" stroke="var(--accent)" stroke-width="2"/>
  </svg>`;
}
