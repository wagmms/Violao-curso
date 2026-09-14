
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

  // Modo Estante
  const btnEstante = document.getElementById('btn-modo-estante');
  if (btnEstante) {
    btnEstante.addEventListener('click', toggleModoEstante);
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key.toLowerCase() === 'f') {
      toggleModoEstante();
    } else if (e.key === 'Escape') {
      if (document.body.classList.contains('modo-estante')) {
        toggleModoEstante();
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && document.body.classList.contains('modo-estante')) {
      document.body.classList.remove('modo-estante');
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

function toggleModoEstante() {
  const isEstante = document.body.classList.toggle('modo-estante');
  if (isEstante) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Erro ao entrar em tela cheia', err);
      });
    }
  } else {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(err => {
        console.warn('Erro ao sair da tela cheia', err);
      });
    }
  }
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
