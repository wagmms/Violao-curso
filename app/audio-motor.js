/**
 * AudioMotor — Motor de Síntese Sonora e Relógio de Áudio (Web Audio API)
 * 
 * Atende às correções exigidas pelo Codex:
 * 1. Envelopes adaptativos calculados dinamicamente proporcionais à duração da nota,
 *    evitando agendamento de decay além do tempo de parada em sons curtos.
 * 2. Cancelamento e limpeza de todos os osciladores e timers ativos ao interromper ou trocar ferramenta.
 * 3. Frequências afinadas na escala de temperamento igual (A4 = 440 Hz) com tônica Dó4 (261.63 Hz).
 * 4. Metrônomo com Lookahead Scheduler sem drift acumulativo.
 */

(function(window) {
  'use strict';

  let audioCtx = null;
  let activeNodes = [];
  let pendingTimeouts = [];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  // Tabela de frequências das notas (Têmpera igual, A4 = 440 Hz)
  const FREQUENCIAS = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23,
    'F#4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
  };

  // Semitons relativos para intervalos diatônicos
  const INTERVALOS_SEMITONS = {
    'unissono': { nome: 'Uníssono', semitons: 0, explicacao: 'Mesma nota repetida, consonância pura.' },
    'segunda_menor': { nome: '2ª Menor', semitons: 1, explicacao: '1 semitom. Tensão máxima e dissonância dramática.' },
    'segunda_maior': { nome: '2ª Maior', semitons: 2, explicacao: '2 semitons (1 tom). Passo natural de escala diatônica (Dó -> Ré).' },
    'terca_menor': { nome: '3ª Menor', semitons: 3, explicacao: '3 semitons. Caráter menor/introspectivo (Dó -> Mi bemol).' },
    'terca_maior': { nome: '3ª Maior', semitons: 4, explicacao: '4 semitons (2 tons). Afirmativa e luminosa (Dó -> Mi).' },
    'quarta_justa': { nome: '4ª Justa', semitons: 5, explicacao: '5 semitons. Aberta e suspensa (Dó -> Fá).' },
    'tritono': { nome: 'Trítono', semitons: 6, explicacao: '6 semitons. Forte instabilidade harmônica.' },
    'quinta_justa': { nome: '5ª Justa', semitons: 7, explicacao: '7 semitons. Pura, firme e grandiosa (Dó -> Sol).' },
    'sexta_menor': { nome: '6ª Menor', semitons: 8, explicacao: '8 semitons. Expressiva e nostálgica.' },
    'sexta_maior': { nome: '6ª Maior', semitons: 9, explicacao: '9 semitons. Abertura calorosa e lírica (Dó -> Lá).' },
    'setima_menor': { nome: '7ª Menor', semitons: 10, explicacao: '10 semitons. Tensão dominante de acorde com sétima.' },
    'setima_maior': { nome: '7ª Maior', semitons: 11, explicacao: '11 semitons. Tensão moderna e elegante.' },
    'oitava_justa': { nome: '8ª Justa', semitons: 12, explicacao: '12 semitons. A mesma nota replicada em registro agudo (Dó4 -> Dó5).' }
  };


  // Buffer global para ruído branco (usado na síntese percussiva)
  let noiseBuffer = null;
  function getNoiseBuffer(ctx) {
    if (!noiseBuffer) {
      const bufferSize = ctx.sampleRate * 2.0;
      noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    }
    return noiseBuffer;
  }

  // Metrônomo via Lookahead Scheduler
  let isMetronomoAtivo = false;
  let timerId = null;
  let proximoCliqueAudioTime = 0;
  let compassoAtual = 1;
  let tempoAtualNoCompasso = 1;
  let temposPorCompasso = 4;
  let bpm = 60;
  let emContagemInicial = false;
  let pulsosContagemRestantes = 0;
  let callbackPulsoUI = null;

  const LOOKAHEAD_MS = 25.0;
  const SCHEDULE_AHEAD_TIME = 0.1;

  function agendarClique(time, tempo, isAcento, isCountIn) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isCountIn) {
      osc.frequency.setValueAtTime(1400, time);
    } else if (isAcento) {
      osc.frequency.setValueAtTime(1100, time);
    } else {
      osc.frequency.setValueAtTime(750, time);
    }

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.65, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.038);

    osc.start(time);
    osc.stop(time + 0.042);
    activeNodes.push(osc);
    osc.onended = () => { const idx = activeNodes.indexOf(osc); if (idx > -1) activeNodes.splice(idx, 1); };

    const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
    const timeoutId = setTimeout(() => {
      if (isMetronomoAtivo && typeof callbackPulsoUI === 'function') {
        callbackPulsoUI({
          tempo: tempo,
          temposPorCompasso: temposPorCompasso,
          isAcento: isAcento,
          isCountIn: isCountIn,
          pulsosContagemRestantes: pulsosContagemRestantes
        });
      }
    }, delayMs);
    pendingTimeouts.push(timeoutId);
  }

  function proximoPulso() {
    const duracaoPulso = 60.0 / bpm;
    proximoCliqueAudioTime += duracaoPulso;

    if (emContagemInicial) {
      pulsosContagemRestantes--;
      if (pulsosContagemRestantes <= 0) {
        emContagemInicial = false;
        tempoAtualNoCompasso = 1;
        compassoAtual = 1;
      } else {
        tempoAtualNoCompasso = (tempoAtualNoCompasso % temposPorCompasso) + 1;
      }
    } else {
      tempoAtualNoCompasso++;
      if (tempoAtualNoCompasso > temposPorCompasso) {
        tempoAtualNoCompasso = 1;
        compassoAtual++;
      }
    }
  }

  function scheduler() {
    const ctx = getAudioContext();
    if (!ctx || !isMetronomoAtivo) return;

    while (proximoCliqueAudioTime < ctx.currentTime + SCHEDULE_AHEAD_TIME) {
      const isAcento = (tempoAtualNoCompasso === 1 && !emContagemInicial);
      agendarClique(proximoCliqueAudioTime, tempoAtualNoCompasso, isAcento, emContagemInicial);
      proximoPulso();
    }
  }


  // Motor de Síntese Percussiva e Ritmos
  const PADROES_RITMICOS = {
    'bossa': {
      nome: 'Bossa Nova (2/4)',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0, 0.7, 0, 0, 0, 1, 0, 0, 0, 0.7, 0, 0, 0],
      tamborim:    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      vassourinha: [0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3]
    },
    'samba': {
      nome: 'Samba / Partido Alto',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      tamborim:    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
      vassourinha: [0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0]
    },
    'baiao': {
      nome: 'Baião / Forró',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0.5, 0, 0, 1, 0, 1, 0, 0, 0.5, 0, 0, 1, 0],
      tamborim:    [0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0],
      vassourinha: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
    },
    'dedilhado68': {
      nome: 'Dedilhado 6/8',
      steps: 12,
      stepBeatLength: 0.5,
      surdo:       [1, 0, 0, 0.7, 0, 0, 1, 0, 0, 0.7, 0, 0],
      tamborim:    [0, 0, 0.6, 0, 0, 0.6, 0, 0, 0.6, 0, 0, 0.6],
      vassourinha: [0.8, 0.4, 0.4, 0.8, 0.4, 0.4, 0.8, 0.4, 0.4, 0.8, 0.4, 0.4]
    }
  };

  let isRitmoAtivo = false;
  let ritmoTimerId = null;
  let proximoPassoRitmoTime = 0;
  let passoRitmoAtual = 0;
  let ritmoAtualId = 'bossa';
  let ritmoBpm = 80;

  function agendarPassoRitmo(time, passoId) {
    const ritmo = PADROES_RITMICOS[ritmoAtualId];
    if (ritmo.surdo[passoId]) {
      AudioMotor.tocarSurdo(time, ritmo.surdo[passoId]);
    }
    if (ritmo.tamborim[passoId]) {
      AudioMotor.tocarTamborim(time, ritmo.tamborim[passoId]);
    }
    if (ritmo.vassourinha[passoId]) {
      AudioMotor.tocarVassourinha(time, ritmo.vassourinha[passoId]);
    }
  }

  const LOOKAHEAD_MS_RITMO = 25.0;

  function schedulerRitmo() {
    const ctx = getAudioContext();
    if (!ctx || !isRitmoAtivo) return;

    while (proximoPassoRitmoTime < ctx.currentTime + SCHEDULE_AHEAD_TIME) {
      agendarPassoRitmo(proximoPassoRitmoTime, passoRitmoAtual);
      const duracaoPasso = (60.0 / ritmoBpm) * PADROES_RITMICOS[ritmoAtualId].stepBeatLength;
      proximoPassoRitmoTime += duracaoPasso;
      passoRitmoAtual = (passoRitmoAtual + 1) % PADROES_RITMICOS[ritmoAtualId].steps;
    }
  }

  const AudioMotor = {
    init: function() {
      getAudioContext();
    },

    isDisponivel: function() {
      return Boolean(window.AudioContext || window.webkitAudioContext);
    },

    iniciarMetronomo: function(novoBpm, novoTempos, comContagem, onPulso) {
      const ctx = getAudioContext();
      if (!ctx) return false;

      this.pararMetronomo();

      bpm = Math.max(30, Math.min(240, Number(novoBpm) || 60));
      temposPorCompasso = Math.max(1, Math.min(12, Number(novoTempos) || 4));
      callbackPulsoUI = onPulso;
      isMetronomoAtivo = true;

      emContagemInicial = Boolean(comContagem);
      pulsosContagemRestantes = emContagemInicial ? temposPorCompasso : 0;
      tempoAtualNoCompasso = 1;
      compassoAtual = 1;

      proximoCliqueAudioTime = ctx.currentTime + 0.05;
      timerId = setInterval(scheduler, LOOKAHEAD_MS);
      return true;
    },

    pararMetronomo: function() {
      isMetronomoAtivo = false;
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
      emContagemInicial = false;
      pulsosContagemRestantes = 0;
      tempoAtualNoCompasso = 1;
      this.cancelarTimeouts();
    },

    setBpm: function(novoBpm) {
      bpm = Math.max(30, Math.min(240, Number(novoBpm) || 60));
    },

    getBpm: function() {
      return bpm;
    },

    isAtivo: function() {
      return isMetronomoAtivo;
    },

    cancelarTimeouts: function() {
      while (pendingTimeouts.length > 0) {
        clearTimeout(pendingTimeouts.pop());
      }
    },

    pararTodosSons: function() {
      this.pararMetronomo();
      if (this.pararRitmo) this.pararRitmo();
      this.cancelarTimeouts();
      while (activeNodes.length > 0) {
        const node = activeNodes.pop();
        try { node.stop(); node.disconnect(); } catch (e) {}
      }
    },

    // Sintetizador de Notas com Envelope Adaptativo (evita agendamento de decay além da duração)
    tocarFrequencia: function(frequencia, duracaoSegundos = 0.8, delaySegundos = 0, tipoOnda = 'sine') {
      const ctx = getAudioContext();
      if (!ctx) return;

      const startTime = ctx.currentTime + delaySegundos;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = tipoOnda;
      osc.frequency.setValueAtTime(frequencia, startTime);

      // Envelope ADSR adaptativo estritamente proporcional à duração da nota
      const attack = Math.min(0.02, duracaoSegundos * 0.15);
      const release = Math.min(0.04, duracaoSegundos * 0.25);
      const decayTime = startTime + attack + Math.min(0.05, (duracaoSegundos - attack - release) * 0.5);
      const sustainTime = startTime + duracaoSegundos - release;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.5, startTime + attack);
      if (sustainTime > decayTime) {
        gain.gain.exponentialRampToValueAtTime(0.35, decayTime);
        gain.gain.setValueAtTime(0.35, sustainTime);
      }
      gain.gain.linearRampToValueAtTime(0.0001, startTime + duracaoSegundos);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duracaoSegundos + 0.005);
      activeNodes.push(osc);
      osc.onended = () => { const idx = activeNodes.indexOf(osc); if (idx > -1) activeNodes.splice(idx, 1); };
    },

    // Tocar intervalo com tônica de referência Dó4 (261.63 Hz)
    tocarIntervalo: function(freqBase = 261.63, semitons = 4, modo = 'melodico') {
      const freqAlvo = freqBase * Math.pow(2, semitons / 12);
      if (modo === 'harmonico') {
        this.tocarFrequencia(freqBase, 1.2, 0);
        this.tocarFrequencia(freqAlvo, 1.2, 0);
      } else {
        this.tocarFrequencia(freqBase, 0.7, 0);
        this.tocarFrequencia(freqAlvo, 0.8, 0.75);
      }
    },

    // Notificação sonora curta com envelope seguro
    tocarSinalFase: function() {
      this.tocarFrequencia(523.25, 0.12, 0, 'triangle');
      this.tocarFrequencia(659.25, 0.18, 0.12, 'triangle');
    },


    // --- Síntese Percussiva ---
    tocarTamborim: function(time, vol = 1.0) {
      const ctx = getAudioContext();
      if (!ctx) return;
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3000, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(1.0 * vol, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(time);
      noise.stop(time + 0.12);
      activeNodes.push(noise);
      noise.onended = () => { const idx = activeNodes.indexOf(noise); if (idx > -1) activeNodes.splice(idx, 1); };
    },

    tocarSurdo: function(time, vol = 1.0) {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(120, time);
      osc.frequency.exponentialRampToValueAtTime(40, time + 0.2);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(1.0 * vol, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.32);
      activeNodes.push(osc);
      osc.onended = () => { const idx = activeNodes.indexOf(osc); if (idx > -1) activeNodes.splice(idx, 1); };
    },

    tocarVassourinha: function(time, vol = 1.0) {
      const ctx = getAudioContext();
      if (!ctx) return;
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1500, time);
      filter.Q.setValueAtTime(1.5, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.6 * vol, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(time);
      noise.stop(time + 0.22);
      activeNodes.push(noise);
      noise.onended = () => { const idx = activeNodes.indexOf(noise); if (idx > -1) activeNodes.splice(idx, 1); };
    },

    // --- Controle de Ritmos ---
    iniciarRitmo: function(idRitmo, bpmRitmo) {
      const ctx = getAudioContext();
      if (!ctx) return false;

      this.pararRitmo();
      ritmoAtualId = idRitmo || 'bossa';
      ritmoBpm = Math.max(30, Math.min(240, Number(bpmRitmo) || 80));
      isRitmoAtivo = true;
      passoRitmoAtual = 0;
      proximoPassoRitmoTime = ctx.currentTime + 0.05;
      ritmoTimerId = setInterval(schedulerRitmo, LOOKAHEAD_MS_RITMO);
      return true;
    },

    pararRitmo: function() {
      isRitmoAtivo = false;
      if (ritmoTimerId !== null) {
        clearInterval(ritmoTimerId);
        ritmoTimerId = null;
      }
    },

    setRitmoBpm: function(novoBpm) { ritmoBpm = Math.max(30, Math.min(240, Number(novoBpm) || 80)); },
    getRitmoBpm: function() { return ritmoBpm; },
    isRitmoAtivo: function() { return isRitmoAtivo; },
    getRitmoAtual: function() { return ritmoAtualId; },

    frequencias: FREQUENCIAS,
    intervalos: INTERVALOS_SEMITONS,
    padroesRitmicos: PADROES_RITMICOS
  };

  window.AudioMotor = AudioMotor;
})(window);
