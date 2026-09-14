
// Configurações Globais
const catalogoDados = window.CURSO_DADOS || { catalogoOriginal: [] };
const atividadesDados = window.PILOTO_ATIVIDADES || [];
const AudioMotor = window.AudioMotor || null;

const ATIVIDADES_VALIDAS_IDS = new Set(atividadesDados.map(a => a.id));
const NIVEIS_VALIDOS = new Set(['preparacao', 'alvo', 'variacao']);

document.addEventListener('DOMContentLoaded', () => {
  carregarEstadoInicial();
  Object.defineProperty(window, '_appState', { configurable: true, get: () => state });

  document.body.addEventListener('click', () => {
    if (AudioMotor) AudioMotor.init();
  }, { once: true });

  // Inicializar navegação
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navegarPara(btn.dataset.view));
  });

  document.getElementById('btn-timer-toggle').onclick = iniciarOuRetomarSessao;
  document.getElementById('btn-timer-reset').onclick = resetarSessao;

  // Inicializar afinador
  const btnAbrirAfinador = document.getElementById('btn-abrir-afinador');
  const btnFecharAfinador = document.getElementById('btn-fechar-afinador');
  const btnDesligarMicrofone = document.getElementById('btn-desligar-microfone');
  const modalAfinador = document.getElementById('modal-afinador');

  if (btnAbrirAfinador && modalAfinador) {
    btnAbrirAfinador.addEventListener('click', () => {
      modalAfinador.showModal();
      if (window.Afinador) window.Afinador.iniciar();
    });
  }

  const fecharAfinador = () => {
    if (modalAfinador) modalAfinador.close();
    if (window.Afinador) window.Afinador.parar();
  };

  if (btnFecharAfinador) btnFecharAfinador.addEventListener('click', fecharAfinador);
  if (btnDesligarMicrofone) btnDesligarMicrofone.addEventListener('click', fecharAfinador);
  if (modalAfinador) modalAfinador.addEventListener('close', fecharAfinador);

  // Modo Estante
  const btnEstante = document.getElementById('btn-modo-estante');
  if (btnEstante) {
    btnEstante.addEventListener('click', toggleModoEstante);
  }

  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT' || active.isContentEditable)) {
      return;
    }

    const key = e.key;

    if (key.toLowerCase() === 'f') {
      toggleModoEstante();
      mostrarToastAtalho(document.body.classList.contains('modo-estante') ? 'Modo Estante Ativado (F)' : 'Modo Normal');
    } else if (key === 'Escape') {
      if (document.body.classList.contains('modo-estante')) {
        toggleModoEstante();
        mostrarToastAtalho('Modo Normal');
      }
    } else if (key === ' ' || key === 'Spacebar') {
      if (active && active.tagName === 'BUTTON') return;
      e.preventDefault();
      iniciarOuRetomarSessao();
      mostrarToastAtalho(state.sessao.ativa ? 'Timer Retomado [Espaço]' : 'Timer Pausado [Espaço]');
    } else if (key === 'ArrowRight' || key.toLowerCase() === 'n') {
      e.preventDefault();
      if (!state.sessao.ativa && state.sessao.elapsedMs === 0) return;
      const ativ = atividadesDados.find(a => a.id === state.sessao.atividadeId);
      if (!ativ || !ativ.sessao40min) return;

      let acumulado = 0;
      for (let i = 0; i <= state.sessao.passoIndex; i++) {
        acumulado += ativ.sessao40min[i].minutos * 60000;
      }

      if (state.sessao.passoIndex < ativ.sessao40min.length - 1) {
        state.sessao.elapsedMs = acumulado;
        if (state.sessao.ativa) state.sessao.ultimoTimestamp = Date.now();
        atualizarTimer();
        mostrarToastAtalho(`Passo Avançado (${key === 'ArrowRight' ? 'Seta Direita' : 'N'})`);
      }
    } else if (key === 'ArrowLeft' || key.toLowerCase() === 'p') {
      e.preventDefault();
      if (!state.sessao.ativa && state.sessao.elapsedMs === 0) return;
      const ativ = atividadesDados.find(a => a.id === state.sessao.atividadeId);
      if (!ativ || !ativ.sessao40min) return;

      if (state.sessao.passoIndex > 0) {
        let acumulado = 0;
        for (let i = 0; i < state.sessao.passoIndex - 1; i++) {
          acumulado += ativ.sessao40min[i].minutos * 60000;
        }
        state.sessao.elapsedMs = acumulado;
        if (state.sessao.ativa) state.sessao.ultimoTimestamp = Date.now();
        atualizarTimer();
        mostrarToastAtalho(`Passo Anterior (${key === 'ArrowLeft' ? 'Seta Esquerda' : 'P'})`);
      }
    } else if (key === '1' || key === '2' || key === '3') {
      const modal = $('modal-resultado');
      if (modal && modal.open) return;
      const niveis = ['preparacao', 'alvo', 'variacao'];
      const index = parseInt(key) - 1;
      const aba = document.querySelector(`.nivel-tab[data-nivel="${niveis[index]}"]`);
      if (aba) {
        aba.click();
        const labels = ['Preparação', 'Alvo', 'Variação'];
        mostrarToastAtalho(`Nível: ${labels[index]} [${key}]`);
      }
    } else if (key === '4' || key === '5') {
      const modal = $('modal-resultado');
      if (modal && modal.open) {
        const select = $('select-res-status');
        if (select) {
          select.value = key === '4' ? 'consegui' : 'repetir';
          mostrarToastAtalho(`Resultado: ${key === '4' ? 'Consegui [4]' : 'Repetir [5]'}`);
        }
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && document.body.classList.contains('modo-estante')) {
      document.body.classList.remove('modo-estante');
      pararAutoScrollEstante();
      removerBarraEstante();
    }
  });

  // Inicializar timer, modais, diagnóstico...
  navegarPara('hoje');
  atualizarTimer();
  // Em uma saída normal, consolida até o último instante. Fechamentos abruptos
  // recuperam o último checkpoint (a cada cinco segundos enquanto há ticks).
  window.addEventListener('pagehide', () => pausarSessao());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) salvarEstado();
  });
});

let autoScrollAnimId = null;
let autoScrollAtivo = false;
let autoScrollVelocidade = 1; // pixels por frame (~60px/s)

function toggleModoEstante() {
  const isEstante = document.body.classList.toggle('modo-estante');
  if (isEstante) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Erro ao entrar em tela cheia', err);
      });
    }
    criarBarraEstante();
    mostrarToastAtalho('Modo Estante ativado (F ou Esc para sair)');
  } else {
    pararAutoScrollEstante();
    removerBarraEstante();
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.warn('Erro ao sair da tela cheia', err);
      });
    }
    mostrarToastAtalho('Modo Estante desativado');
  }
}

function criarBarraEstante() {
  removerBarraEstante();
  const bar = document.createElement('div');
  bar.id = 'estante-floating-bar';
  bar.className = 'estante-autoscroll-bar';
  bar.innerHTML = `
    <span style="font-weight: 700; color: var(--accent);">🎼 Estante:</span>
    <button type="button" class="btn-autoscroll-toggle" id="btn-toggle-scroll">▶ Rolar Partitura</button>
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 0.75rem; color: #bbb;">Velocidade:</span>
      <button type="button" class="tab-metro-btn" id="btn-scroll-slow" title="Mais lento">-</button>
      <span id="scroll-spd-display" style="font-family: var(--font-mono); font-weight: 700; min-width: 28px; text-align: center;">1x</span>
      <button type="button" class="tab-metro-btn" id="btn-scroll-fast" title="Mais rápido">+</button>
    </div>
    <button type="button" class="tab-metro-btn" id="btn-scroll-top" title="Voltar ao Topo">⬆ Topo</button>
    <button type="button" class="btn btn-ghost btn-sm" id="btn-fechar-estante" style="color: #fff; padding: 4px 8px;" title="Sair do Modo Estante">✕ Sair</button>
  `;
  document.body.appendChild(bar);

  const btnToggle = bar.querySelector('#btn-toggle-scroll');
  const btnSlow = bar.querySelector('#btn-scroll-slow');
  const btnFast = bar.querySelector('#btn-scroll-fast');
  const btnTop = bar.querySelector('#btn-scroll-top');
  const btnFechar = bar.querySelector('#btn-fechar-estante');
  const spdDisplay = bar.querySelector('#scroll-spd-display');

  btnToggle.onclick = () => {
    if (autoScrollAtivo) {
      pararAutoScrollEstante();
      btnToggle.textContent = '▶ Rolar Partitura';
      btnToggle.classList.remove('ativo');
    } else {
      iniciarAutoScrollEstante();
      btnToggle.textContent = '⏸ Pausar';
      btnToggle.classList.add('ativo');
    }
  };

  btnSlow.onclick = () => {
    autoScrollVelocidade = Math.max(0.25, autoScrollVelocidade - 0.25);
    spdDisplay.textContent = `${autoScrollVelocidade}x`;
  };

  btnFast.onclick = () => {
    autoScrollVelocidade = Math.min(3, autoScrollVelocidade + 0.25);
    spdDisplay.textContent = `${autoScrollVelocidade}x`;
  };

  btnTop.onclick = () => {
    const mainElem = document.querySelector('.main-content') || window;
    mainElem.scrollTo({ top: 0, behavior: 'smooth' });
  };

  btnFechar.onclick = () => {
    toggleModoEstante();
  };
}

function removerBarraEstante() {
  const bar = document.getElementById('estante-floating-bar');
  if (bar) bar.remove();
}

function iniciarAutoScrollEstante() {
  pararAutoScrollEstante();
  autoScrollAtivo = true;
  const mainElem = document.querySelector('.main-content') || document.documentElement;

  function passoScroll() {
    if (!autoScrollAtivo) return;
    mainElem.scrollTop += autoScrollVelocidade;
    // Se atingir o fim da página, encerra a rolagem suavemente
    if (mainElem.scrollTop + mainElem.clientHeight >= mainElem.scrollHeight - 2) {
      pararAutoScrollEstante();
      const btnToggle = document.getElementById('btn-toggle-scroll');
      if (btnToggle) {
        btnToggle.textContent = '▶ Rolar Partitura';
        btnToggle.classList.remove('ativo');
      }
      return;
    }
    autoScrollAnimId = requestAnimationFrame(passoScroll);
  }
  autoScrollAnimId = requestAnimationFrame(passoScroll);
}

function pararAutoScrollEstante() {
  autoScrollAtivo = false;
  if (autoScrollAnimId) {
    cancelAnimationFrame(autoScrollAnimId);
    autoScrollAnimId = null;
  }
}

function mostrarToastAtalho(mensagem) {
  let toast = document.getElementById('atalho-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'atalho-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--accent, #d97736)';
    toast.style.color = '#fff';
    toast.style.padding = '8px 18px';
    toast.style.borderRadius = '20px';
    toast.style.fontSize = '0.88rem';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '99999';
    toast.style.boxShadow = '0 4px 14px rgba(0,0,0,0.5)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    toast.style.pointerEvents = 'none';
    document.body.appendChild(toast);
  }

  toast.textContent = mensagem;
  toast.style.opacity = '1';

  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  toast.timeoutId = setTimeout(() => {
    toast.style.opacity = '0';
  }, 1800);
}

// API para testes automatizados e auditoria do Codex
window.__APP_TEST_API = {
  getState: () => state,
  setState: s => { state = s; salvarEstado(); },
  navegarPara,
  obterRecomendacao,
  validarEsquemaBackup,
  abrirModalResultado,
  carregarEstadoInicial,
  atualizarTimer,
  salvarEstado
};
