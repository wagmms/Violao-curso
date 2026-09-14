/**
 * Afinador Cromático - Método Tríade
 * 100% nativo (Web Audio API), offline, usando file:// e autocorrelação no domínio do tempo.
 */

(function(window) {
  'use strict';

  let audioContext = null;
  let analyser = null;
  let microphoneStream = null;
  let animationId = null;
  let mediaStreamSource = null;

  const Afinador = {
    iniciar: async function() {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        mediaStreamSource = audioContext.createMediaStreamSource(microphoneStream);
        mediaStreamSource.connect(analyser);

        const statusEl = document.getElementById('afinador-status');
        if (statusEl) {
          statusEl.textContent = 'Microfone conectado. Toque uma corda...';
          statusEl.style.color = 'var(--text-main)';
        }

        Afinador.detectarPitch();

      } catch (err) {
        console.error('Erro ao acessar microfone:', err);
        const statusEl = document.getElementById('afinador-status');
        if (statusEl) {
          statusEl.textContent = 'Acesso ao microfone negado ou indisponível.';
          statusEl.style.color = 'var(--danger)';
        }
      }
    },

    parar: function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      if (mediaStreamSource) {
        mediaStreamSource.disconnect();
        mediaStreamSource = null;
      }

      if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        microphoneStream = null;
      }

      if (analyser) {
        analyser = null;
      }

      const statusEl = document.getElementById('afinador-status');
      if (statusEl) {
        statusEl.textContent = 'Aguardando...';
        statusEl.style.color = 'var(--text-dim)';
      }

      const freqEl = document.getElementById('afinador-frequencia');
      if(freqEl) freqEl.textContent = '-- Hz';

      const notaEl = document.getElementById('afinador-nota');
      if(notaEl) notaEl.textContent = '-';

      const pointerEl = document.getElementById('afinador-ponteiro');
      if(pointerEl) {
          pointerEl.style.left = '50%';
          pointerEl.style.backgroundColor = 'var(--accent)';
      }
    },

    autoCorrelate: function(buf, sampleRate) {
      let SIZE = buf.length;
      let rms = 0;

      for (let i = 0; i < SIZE; i++) {
        let val = buf[i];
        rms += val * val;
      }
      rms = Math.sqrt(rms / SIZE);
      if (rms < 0.01) // Not enough signal
        return -1;

      let r1 = 0, r2 = SIZE - 1, thres = 0.2;
      for (let i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) { r1 = i; break; }
      for (let i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

      buf = buf.slice(r1, r2);
      SIZE = buf.length;

      let c = new Array(SIZE).fill(0);
      for (let i = 0; i < SIZE; i++)
        for (let j = 0; j < SIZE - i; j++)
          c[i] = c[i] + buf[j] * buf[j + i];

      let d = 0; while (c[d] > c[d + 1]) d++;
      let maxval = -1, maxpos = -1;
      for (let i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
          maxval = c[i];
          maxpos = i;
        }
      }
      let T0 = maxpos;

      let x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
      let a = (x1 + x3 - 2 * x2) / 2;
      let b = (x3 - x1) / 2;
      if (a) T0 = T0 - b / (2 * a);

      return sampleRate / T0;
    },

    detectarPitch: function() {
       if (!analyser) return;

       let buffer = new Float32Array(analyser.fftSize);
       analyser.getFloatTimeDomainData(buffer);
       let pitch = Afinador.autoCorrelate(buffer, audioContext.sampleRate);

       if (pitch !== -1) {
           Afinador.atualizarUI(pitch);
       }

       animationId = requestAnimationFrame(Afinador.detectarPitch);
    },

    notaDaFrequencia: function(frequencia) {
      const notaNum = 12 * (Math.log(frequencia / 440) / Math.log(2));
      return Math.round(notaNum) + 69;
    },

    frequenciaDaNota: function(nota) {
      return 440 * Math.pow(2, (nota - 69) / 12);
    },

    centavosOffDaPitch: function(frequencia, nota) {
      return Math.floor(1200 * Math.log(frequencia / Afinador.frequenciaDaNota(nota)) / Math.log(2));
    },

    nomeDasNotas: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],

    atualizarUI: function(pitch) {
       const freqEl = document.getElementById('afinador-frequencia');
       const notaEl = document.getElementById('afinador-nota');
       const pointerEl = document.getElementById('afinador-ponteiro');
       const statusEl = document.getElementById('afinador-status');

       if (!freqEl || !notaEl || !pointerEl || !statusEl) return;

       const notaNum = Afinador.notaDaFrequencia(pitch);
       const nomeNota = Afinador.nomeDasNotas[notaNum % 12];
       const oitava = Math.floor(notaNum / 12) - 1;

       const cents = Afinador.centavosOffDaPitch(pitch, notaNum);

       notaEl.textContent = `${nomeNota}${oitava}`;
       freqEl.textContent = `${pitch.toFixed(1)} Hz`;

       // cents range is -50 to +50
       // 0 cents means pointer is at 50% left.
       // -50 cents means 0% left
       // +50 cents means 100% left
       let porcentagem = (cents + 50);
       // Limitar entre 0% e 100% para não sair da régua visualmente
       porcentagem = Math.max(0, Math.min(100, porcentagem));
       pointerEl.style.left = `${porcentagem}%`;

       if (Math.abs(cents) <= 3) {
           pointerEl.style.backgroundColor = 'var(--success)';
           notaEl.style.color = 'var(--success)';
           statusEl.textContent = 'Afinado!';
           statusEl.style.color = 'var(--success)';
       } else {
           pointerEl.style.backgroundColor = 'var(--accent)';
           notaEl.style.color = 'var(--text-main)';
           statusEl.textContent = cents < 0 ? 'Aperte a corda (Muito grave)' : 'Afrouxe a corda (Muito agudo)';
           statusEl.style.color = 'var(--text-dim)';
       }
    }
  };

  window.Afinador = Afinador;
})(window);
