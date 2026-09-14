
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

    container.innerHTML = `
      <div class="hoje-hero">
        <div class="hero-recommendation-tag">ðŸŽ¯ Recomendação Pedagógica</div>
        <h3>${escapeHTML(rec.atividade.titulo)}</h3>
        <p class="justificativa">${escapeHTML(rec.motivo)}</p>
        
        <div class="hero-meta-grid">
          <div class="hero-meta-item">
            <strong>Habilidade</strong>
            <span>${escapeHTML(rec.atividade.habilidade)}</span>
          </div>
          <div class="hero-meta-item">
            <strong>Área de Ensino</strong>
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

        <div class="hero-actions">
          <button id="btn-comecar-40" class="btn btn-primary btn-lg">â± Começar meus 40 minutos</button>
          <button id="btn-diagnostico-abrir" class="btn btn-secondary">Ajustar Nível (Diagnóstico)</button>
        </div>
      </div>

      <div class="hoje-alternativas">
        <h4>OpçÁµes alternativas de estudo</h4>
        <div class="alternativas-grid">
          <div class="card-alternativa" id="card-alt-anterior">
            <h5>Continuar atividade anterior</h5>
            <p>Retome a Áºltima prática realizada mantendo suas anotaçÁµes.</p>
          </div>
          <div class="card-alternativa" id="card-alt-dificuldade">
            <h5>Caderno de dificuldades</h5>
            <p>Revise pontos de tropeço com versÁµes preparatórias focadas.</p>
          </div>
          <div class="card-alternativa" id="card-alt-biblioteca">
            <h5>Explorar o Método Tríade</h5>
            <p>Consulte os 11 módulos e 300 aulas originais catalogadas.</p>
          </div>
        </div>
      </div>
    `;

    $('btn-comecar-40').onclick = () => {
      trocarAtividade(rec.atividade.id);
      iniciarOuRetomarSessao();
      navegarPara('aprender');
    };

    $('btn-diagnostico-abrir').onclick = () => abrirModalDiagnostico();
    $('card-alt-anterior').onclick = () => navegarPara('aprender');
    $('card-alt-dificuldade').onclick = () => navegarPara('progresso');
    $('card-alt-biblioteca').onclick = () => navegarPara('biblioteca');
  }

function renderizarTelaAprender() {
    const ativ = atividadesDados.find(a => a.id === state.atividadeAtualId) || atividadesDados[0];
    const container = $('aprender-conteudo');
    if (!container) return;

    const nivelKey = state.nivelExercicioAtual || 'alvo';
    const nivelAtual = ativ.exercicio.niveis[nivelKey] || ativ.exercicio.niveis.alvo;

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
                  <div><strong>${escapeHTML(f.modulo)}</strong> â€” ${escapeHTML(f.tituloAula)}</div>
                  <div style="color: var(--text-dim); margin-top: 2px;">
                    Verificação: <em>${escapeHTML(f.statusVerificacao)}</em> Â· Autoria: ${escapeHTML(f.autoria)}
                  </div>
                  <a href="${escapeHTML(f.url)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); font-size: 0.8rem; display: inline-block; margin-top: 4px;">
                    â†— Abrir arquivo original no Google Drive
                  </a>
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

            ${window.renderizarTablatura(nivelAtual.tablatura, "tab-container-" + ativ.id)}
            ${nivelAtual.instrucoesRodape ? `<div class="instrucoes-rodape">${escapeHTML(nivelAtual.instrucoesRodape)}</div>` : ''}

            <div class="dica-execucao">
              <strong>Foco de Atenção:</strong> ${escapeHTML(nivelAtual.dica)}
            </div>
          </div>

          <!-- Painel Interativo: MetrÁ´nomo ou Treinador de Ouvido -->
          <div id="painel-ferramenta-interativa"></div>

          <!-- Erros Observáveis e CorreçÁµes Proativas -->
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

          <!-- AçÁµes da Sessão -->
          <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
            <button id="btn-registrar-dificuldade-rapida" class="btn btn-secondary">âš ï¸ Anotar Dificuldade</button>
            <button id="btn-concluir-sessao" class="btn btn-success">âœ“ Concluir e Avaliar Nível</button>
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
      if (treinoOuvido.nivel !== nivelAtual) {
        treinoOuvido = {
          nivel: nivelAtual,
          perguntaAtual: 1,
          totalPerguntas: 10,
          acertos: 0,
          respondido: false,
          intervaloSorteado: null,
          serieEncerrada: false,
          historico: []
        };
      }

      container.innerHTML = `
        <div class="ear-trainer-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h5 style="font-size: 1rem; font-weight: 600;">ðŸŽ§ Treinador de Ouvido (Série de 10 Perguntas)</h5>
            <span style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--accent);" id="ear-progresso-serie">
              Pergunta ${treinoOuvido.perguntaAtual} de ${treinoOuvido.totalPerguntas} Â· Acertos: ${treinoOuvido.acertos}
            </span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            TÁ´nica de Referência: Dó4 (261.63 Hz, 2Âª corda casa 1). Apenas a primeira tentativa por pergunta é registrada. Áudio repetido não conta nova tentativa.
          </p>

          <div class="ear-trainer-prompts">
            <button id="btn-ouvir-tonica" class="btn btn-secondary btn-sm" type="button">ðŸŽµ 1. TÁ´nica (Dó4)</button>
            <button id="btn-ouvir-desconhecido" class="btn btn-primary btn-sm" type="button">ðŸ‘‚ 2. Ouvir Pergunta</button>
            <button id="btn-ouvir-harmonico" class="btn btn-ghost btn-sm" type="button">Juntas (HarmÁ´nico)</button>
          </div>

          <div class="ear-options-grid" id="ear-opcoes-container">
            ${intervalosPermitidos.map(chave => {
              const inf = AudioMotor.intervalos[chave];
              return `<button class="btn btn-secondary btn-opcao-intervalo" data-intervalo="${escapeHTML(chave)}" type="button">${escapeHTML(inf.nome)} (${inf.semitons} semitons)</button>`;
            }).join('')}
          </div>

          <div id="ear-feedback" class="ear-feedback-box"></div>
          <div id="ear-controles-pos" style="margin-top: 10px; display: none; text-align: right;">
            <button id="btn-proxima-pergunta" class="btn btn-primary btn-sm" type="button">Próxima Pergunta âž”</button>
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
        // P1-13: ouvir novamente não conta tentativa â€” apenas toca o som
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
        // Desabilitar opçÁµes de resposta após série encerrada
        document.querySelectorAll('.btn-opcao-intervalo').forEach(el => { el.disabled = true; });
      }

    } else {
      // MetrÁ´nomo com Web Audio API Lookahead
      const bpmAtual = ativ.exercicio.niveis[state.nivelExercicioAtual || 'alvo'].bpm || 60;
      container.innerHTML = `
        <div class="metronomo-box">
          <div class="metronomo-header">
            <h5>MetrÁ´nomo de Estudo (Web Audio API)</h5>
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
                <button id="btn-metro-toggle" class="btn btn-primary btn-sm" type="button">â–¶ Ligar MetrÁ´nomo</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Gravador Efêmero de Autoavaliação -->
        <div class="bloco-card" style="margin-top: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4>Autoavaliação (Gravador)</h4>
            <div id="gravador-controles" style="display: flex; gap: 8px; align-items: center;">
              <button id="btn-gravar-audio" class="btn btn-secondary btn-sm" type="button">ðŸŽ™ Gravar 30s</button>
              <button id="btn-ouvir-audio" class="btn btn-primary btn-sm" type="button" style="display: none;">â–¶ Ouvir</button>
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
          $('btn-metro-toggle').textContent = 'â–¶ Ligar MetrÁ´nomo';
          limparDotsMetronomo();
          if (speedTrainerInterval) clearInterval(speedTrainerInterval);
        } else {
          const comContagem = $('chk-contagem-previa').checked;
          const bpm = Number(slider.value);
          AudioMotor.iniciarMetronomo(bpm, 4, comContagem, pulsoInfo => {
            atualizarDotsMetronomo(pulsoInfo.tempo, pulsoInfo.isAcento, pulsoInfo.isCountIn);
          });
          $('btn-metro-toggle').textContent = 'â¹ Parar MetrÁ´nomo';

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
              btnGravar.textContent = 'ðŸŽ™ Gravar Novamente';
              
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
            await mostrarAlerta('Não foi possível acessar o microfone. Verifique as permissÁµes do navegador.');
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
          btnGravar.textContent = 'ðŸŽ™ Gravar 30s';
        };
      }
    }
  }

function renderizarTelaPraticar() {
    const container = $('praticar-conteudo');
    if (!container) return;

    container.innerHTML = `
      <div class="view-header">
        <h2>Central de Prática</h2>
        <p>Selecione uma das seis atividades fundamentais estruturadas com preparação, alvo e variação.</p>
      </div>

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
            <button class="btn btn-primary btn-iniciar-ativ" data-id="${escapeHTML(a.id)}" type="button" style="width: 100%;">
              Praticar Esta Atividade
            </button>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.btn-iniciar-ativ').forEach(btn => {
      btn.onclick = () => {
        const novaId = btn.dataset.id;
        trocarAtividade(novaId);
        navegarPara('aprender');
      };
    });
  }

function renderizarTelaProgresso() {
    const container = $('progresso-conteudo');
    if (!container) return;

    const dificuldadesHtml = state.dificuldades.length === 0
      ? '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 12px 0;">Nenhuma dificuldade pendente no momento.</p>'
      : state.dificuldades.map(d => `
        <div class="dificuldade-item">
          <div class="dificuldade-texto">
            <strong>${escapeHTML(d.trecho)}</strong>
            <p>${escapeHTML(d.problema)}</p>
            <small style="color: var(--text-dim);">Registrado em ${escapeHTML(d.data)} Â· Status: ${d.resolvida ? 'âœ“ Resolvida' : 'Pendente'}</small>
          </div>
          <div style="display: flex; gap: 6px;">
            ${!d.resolvida ? `<button class="btn btn-secondary btn-sm btn-recuperar-dif" data-id="${escapeHTML(d.id)}" type="button">Recuperar</button>
            <button class="btn btn-ghost btn-sm btn-resolver-dif" data-id="${escapeHTML(d.id)}" type="button">âœ“ Concluir</button>` : ''}
          </div>
        </div>
      `).join('');

    const revisoesPendentes = state.revisoes.filter(r => !r.concluida);
    const revisoesHtml = revisoesPendentes.length === 0
      ? '<p style="color: var(--text-muted); font-size: 0.9rem; padding: 12px 0;">Nenhuma revisão pendente no momento.</p>'
      : revisoesPendentes.map(r => {
        const ativ = atividadesDados.find(a => a.id === r.atividadeId) || { titulo: 'Atividade' };
        return `
          <div class="revisao-item">
            <div>
              <strong>${escapeHTML(ativ.titulo)}</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Ciclo ${r.ciclo} Â· Intervalo de ${r.intervaloDias} dias</div>
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
        <h2>Meu Progresso</h2>
        <p>Acompanhamento pedagógico fundamentado em demonstração de habilidades e caderno de recuperação.</p>
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
              <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-body); padding: 10px; border-radius: var(--radius-sm);">
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
          <button id="btn-exportar-backup" class="btn btn-secondary" type="button">ðŸ’¾ Exportar Backup Completo (JSON)</button>
          <label class="btn btn-secondary" style="cursor: pointer;">
            ðŸ“‚ Carregar Arquivo de Backup
            <input type="file" id="input-importar-backup" accept=".json,application/json" style="display: none;">
          </label>
          <button id="btn-migrar-v1-explicito" class="btn btn-ghost btn-sm" type="button">ðŸ”„ Importar dados da interface anterior (v1)</button>
        </div>
        <p id="msg-backup-status" style="font-size: 0.85rem; margin-top: 10px; color: var(--accent);"></p>
      </div>
    `;

    // AçÁµes do Caderno de Dificuldades
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

    // AçÁµes da Revisão Espaçada
    document.querySelectorAll('.btn-revisar-agora').forEach(btn => {
      btn.onclick = () => {
        const rev = state.revisoes.find(r => r.id === btn.dataset.id);
        if (rev) {
          trocarAtividade(rev.atividadeId);
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
                      return `<a href="${escapeHTML(mat.url)}" target="_blank" rel="noopener noreferrer">â†— ${escapeHTML(mat.tipo.toUpperCase())}: ${escapeHTML(mat.titulo)}</a>`;
                    } else {
                      return `<span style="color: var(--text-dim); font-size: 0.75rem;">${escapeHTML(mat.tipo)}: ${escapeHTML(mat.titulo)} (indisponível)</span>`;
                    }
                  }).join(' Â· ')}
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