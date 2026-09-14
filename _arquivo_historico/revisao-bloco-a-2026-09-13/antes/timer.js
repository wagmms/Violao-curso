
var timerWorker = null;
try {
  timerWorker = new Worker('timer-worker.js');
  timerWorker.onmessage = () => atualizarTimer();
} catch (e) {
  console.warn('Web Worker indisponível, usando setInterval:', e.message);
}


function iniciarOuRetomarSessao() {
    if (state.sessao.ativa) {
      // Pausar: consolida elapsed antes de parar
      if (state.sessao.ultimoTimestamp) {
        state.sessao.elapsedMs = Math.min(
          state.sessao.totalMs,
          state.sessao.elapsedMs + (Date.now() - state.sessao.ultimoTimestamp)
        );
      }
      state.sessao.ativa = false;
      state.sessao.ultimoTimestamp = null;
      if (timerWorker) timerWorker.postMessage('stop');
      if (state.sessao.intervalId) {
        clearInterval(state.sessao.intervalId);
        state.sessao.intervalId = null;
      }
      const btn = $('btn-timer-toggle');
      if (btn) btn.textContent = 'Retomar';
      salvarEstado();
    } else {
      // Iniciar / Retomar
      if (state.sessao.elapsedMs >= state.sessao.totalMs) {
        state.sessao.elapsedMs = 0;
        state.sessao.passoIndex = 0;
        state.sessao.id = 'sessao-' + Date.now();
      }
      state.sessao.ativa = true;
      state.sessao.ultimoTimestamp = Date.now();
      const btn = $('btn-timer-toggle');
      if (btn) btn.textContent = 'Pausar';
      state.sessao.intervalId = setInterval(atualizarTimer, 500);
      salvarEstado();
    }
    atualizarTimer();
  }

function resetarSessao() {
    state.sessao.ativa = false;
    state.sessao.elapsedMs = 0;
    state.sessao.passoIndex = 0;
    state.sessao.ultimoTimestamp = null;
    if (state.sessao.intervalId) {
      clearInterval(state.sessao.intervalId);
      state.sessao.intervalId = null;
    }
    $('btn-timer-toggle').textContent = 'Iniciar';
    salvarEstado();
    atualizarTimer();
  }

async function atualizarTimer() {
    // Calcula currentMs sem modificar state.sessao.elapsedMs (evita dupla contagem com ticks do setInterval)
    let currentMs = state.sessao.elapsedMs;
    if (state.sessao.ativa && state.sessao.ultimoTimestamp) {
      const agora = Date.now();
      const delta = agora - state.sessao.ultimoTimestamp;
      currentMs = Math.min(state.sessao.totalMs, state.sessao.elapsedMs + delta);
    }

    const restanteMs = Math.max(0, state.sessao.totalMs - currentMs);
    const totalSegundos = Math.ceil(restanteMs / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    const formatted = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    const timerElem = $('timer-regressivo');
    if (timerElem) timerElem.textContent = formatted;

    const progBar = $('session-progress-bar');
    if (progBar) {
      const perc = (currentMs / state.sessao.totalMs) * 100;
      progBar.style.width = `${perc}%`;
    }

    // Determina o passo ativo conforme as duraçÁµes declaradas na atividade
    const ativAtual = atividadesDados.find(a => a.id === state.sessao.atividadeId) || atividadesDados[0];
    const minPassados = (currentMs / 1000) / 60;
    let acumMin = 0;
    let novoPasso = 0;

    const hab = state.habilidades[ativAtual.slug];
    const alvoAtingido = hab && hab.status === 'alvo_demonstrado';

    for (let i = 0; i < ativAtual.sessao40min.length; i++) {
      acumMin += ativAtual.sessao40min[i].minutos;
      if (minPassados < acumMin) {
        novoPasso = i;
        break;
      }
      if (i === ativAtual.sessao40min.length - 1) {
        novoPasso = i;
      }
    }

    if (ativAtual.sessao40min[novoPasso].fase === 'Prática Dirigida' && !alvoAtingido) {
      const elAtivo = document.querySelector(`.step-item[data-step="${novoPasso}"] .step-instrucao`);
      if (elAtivo && !elAtivo.dataset.redistribuido) {
        elAtivo.dataset.redistribuido = 'true';
        elAtivo.innerHTML = '<strong>Foco no Alvo:</strong> Dedique 15 min completos entre Preparação e Alvo. A Variação será liberada após demonstrar domínio.';
      }
    }

    if (novoPasso !== state.sessao.passoIndex) {
      state.sessao.passoIndex = novoPasso;
      if (AudioMotor) AudioMotor.tocarSinalFase();
      document.querySelectorAll('.step-item').forEach((el, idx) => {
        if (idx === novoPasso) el.classList.add('step-ativo');
        else el.classList.remove('step-ativo');
      });
    }

    // Sessão concluída
    if (restanteMs === 0 && state.sessao.ativa) {
      state.sessao.ativa = false;
      state.sessao.elapsedMs = state.sessao.totalMs; // consolida valor final
      state.sessao.ultimoTimestamp = null;
      if (state.sessao.intervalId) {
        clearInterval(state.sessao.intervalId);
        state.sessao.intervalId = null;
      }
      const btn = $('btn-timer-toggle');
      if (btn) btn.textContent = 'Reiniciar';
      salvarEstado();
      try {
        await mostrarAlerta('Sessão de 40 minutos concluída. Registre seu resultado e confirme os critérios do nível praticado.');
      } catch (e) {}
    }
  }

function limparDotsMetronomo() {
    for (let i = 1; i <= 4; i++) {
      const d = $(`pdot-${i}`);
      if (d) d.classList.remove('pulso-ativo', 'pulso-acento');
    }
  }

function atualizarDotsMetronomo(tempo, isAcento, isCountIn) {
    limparDotsMetronomo();
    const targetDot = $(`pdot-${tempo}`);
    if (targetDot) {
      if (isAcento && !isCountIn) targetDot.classList.add('pulso-acento');
      else targetDot.classList.add('pulso-ativo');
    }
  }