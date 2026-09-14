let timerWorker = null;
let ultimoCheckpoint = 0;
try {
  timerWorker = new Worker('timer-worker.js');
  timerWorker.onmessage = () => atualizarTimer();
  timerWorker.onerror = () => {
    timerWorker.terminate(); timerWorker = null;
    if (state.sessao.ativa && !state.sessao.intervalId) state.sessao.intervalId = setInterval(atualizarTimer, 500);
  };
} catch { /* file:// pode bloquear Worker; timestamps funcionam no fallback. */ }

function tempoDecorrido(sessao = state.sessao, agora = Date.now()) {
  const delta = sessao.ativa && sessao.ultimoTimestamp != null ? Math.max(0, agora - sessao.ultimoTimestamp) : 0;
  return Math.min(sessao.totalMs, Math.max(0, sessao.elapsedMs + delta));
}
function novaSessao(atividadeId, nivel = 'preparacao') {
  return { id: novoId('sessao'), atividadeId, nivel, passoIndex: 0, elapsedMs: 0,
    totalMs: 2400000, ativa: false, concluida: false, ultimoTimestamp: null, intervalId: null };
}
function pararRelogio() {
  if (timerWorker) timerWorker.postMessage('stop');
  if (state.sessao.intervalId) clearInterval(state.sessao.intervalId);
  state.sessao.intervalId = null;
}
function pausarSessao() {
  state.sessao.elapsedMs = tempoDecorrido();
  state.sessao.ativa = false; state.sessao.ultimoTimestamp = null;
  pararRelogio(); salvarEstado(); atualizarTimer();
}
function iniciarSessao() {
  if (state.sessao.ativa) return true;
  const ativ = atividadesDados.find(a => a.id === state.atividadeAtualId);
  if (!atividadeTemSessao(ativ)) {
    mostrarAlerta('Esta atividade ainda está em elaboração. Escolha uma atividade com roteiro de sessão disponível.');
    return false;
  }
  const nova = state.sessao.concluida || state.sessao.elapsedMs >= state.sessao.totalMs;
  if (nova) state.sessao = novaSessao(ativ.id, state.nivelExercicioAtual);
  state.sessao.ativa = true; state.sessao.ultimoTimestamp = Date.now();
  if (timerWorker) timerWorker.postMessage('start');
  else state.sessao.intervalId = setInterval(atualizarTimer, 500);
  ultimoCheckpoint = Date.now(); salvarEstado(); atualizarTimer();
  if (nova && $('view-aprender')?.classList.contains('view-ativa')) renderizarTelaAprender();
  return true;
}
function iniciarOuRetomarSessao() {
  if (state.sessao.ativa) pausarSessao(); else iniciarSessao();
}
function registrarInterrupcao(motivo) {
  const ms = tempoDecorrido();
  if (!state.sessao.concluida && ms > 0 && !state.tentativas.some(t => t.sessaoId === state.sessao.id)) {
    state.tentativas.push({ id: novoId('tent'), sessaoId: state.sessao.id, data: obterDataLocal(),
      atividadeId: state.sessao.atividadeId, nivel: state.sessao.nivel, status: 'interrompida',
      bpm: 0, duracaoMs: ms, observacoes: motivo });
  }
}
function resetarSessao() {
  registrarInterrupcao('Sessão reiniciada pelo aluno.'); pararRelogio();
  state.sessao = novaSessao(state.atividadeAtualId, state.nivelExercicioAtual);
  salvarEstado(); atualizarTimer();
  if ($('view-aprender')?.classList.contains('view-ativa')) renderizarTelaAprender();
}
function atualizarTimer() {
  const currentMs = tempoDecorrido();
  const restanteMs = Math.max(0, state.sessao.totalMs - currentMs);
  const segundos = Math.ceil(restanteMs / 1000);
  if ($('timer-regressivo')) $('timer-regressivo').textContent = `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;
  if ($('session-progress-bar')) $('session-progress-bar').style.width = `${currentMs / state.sessao.totalMs * 100}%`;
  const ativ = atividadesDados.find(a => a.id === state.sessao.atividadeId);
  const blocos = ativ?.sessao40min || [];
  let acumulado = 0, passo = Math.max(0, blocos.length - 1);
  for (let i = 0; i < blocos.length; i++) {
    acumulado += blocos[i].minutos * 60000;
    if (currentMs < acumulado) { passo = i; break; }
  }
  if (passo !== state.sessao.passoIndex) {
    state.sessao.passoIndex = passo;
    if (state.sessao.ativa && AudioMotor) AudioMotor.tocarSinalFase();
  }
  document.querySelectorAll('.step-item').forEach((el, i) => el.classList.toggle('step-ativo', i === passo));
  if (restanteMs === 0 && state.sessao.ativa) {
    state.sessao.elapsedMs = state.sessao.totalMs; state.sessao.ativa = false; state.sessao.ultimoTimestamp = null;
    pararRelogio(); salvarEstado();
    mostrarAlerta('Os 40 minutos terminaram. Registre o resultado do nível praticado.');
  } else if (state.sessao.ativa && Date.now() - ultimoCheckpoint >= 5000) {
    ultimoCheckpoint = Date.now(); salvarEstado();
  }
  const btn = $('btn-timer-toggle');
  if (btn) {
    btn.disabled = !atividadeTemSessao(ativ);
    btn.textContent = state.sessao.ativa ? 'Pausar' : state.sessao.concluida || restanteMs === 0 ? 'Nova sessão' : currentMs > 0 ? 'Retomar' : 'Iniciar 40 min';
  }
}
function limparDotsMetronomo() {
  for (let i = 1; i <= 4; i++) $(`pdot-${i}`)?.classList.remove('pulso-ativo', 'pulso-acento');
}
function atualizarDotsMetronomo(tempo, isAcento, isCountIn) {
  limparDotsMetronomo(); $(`pdot-${tempo}`)?.classList.add(isAcento && !isCountIn ? 'pulso-acento' : 'pulso-ativo');
}
