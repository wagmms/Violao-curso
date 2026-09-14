
// Configurações Globais
const catalogoDados = window.CURSO_DADOS || { catalogoOriginal: [] };
const atividadesDados = window.PILOTO_ATIVIDADES || [];
const AudioMotor = window.AudioMotor || null;

const ATIVIDADES_VALIDAS_IDS = new Set(['ativ-1', 'ativ-2', 'ativ-3', 'ativ-4', 'ativ-5', 'ativ-6']);
const NIVEIS_VALIDOS = new Set(['preparacao', 'alvo', 'variacao']);

document.addEventListener('DOMContentLoaded', () => {
  carregarEstadoInicial();
  window._appState = state; // Compartilhamento entre módulos via global controlado

  document.body.addEventListener('click', () => {
    if (AudioMotor) AudioMotor.init();
  }, { once: true });

  // Inicializar navegação
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navegarPara(btn.dataset.view));
  });

  document.getElementById('btn-timer-toggle').onclick = iniciarOuRetomarSessao;
  document.getElementById('btn-timer-reset').onclick = resetarSessao;

  // Inicializar timer, modais, diagnóstico...
  navegarPara('hoje');
});

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
