
var treinoOuvido = {
  nivel: null,
  perguntaAtual: 1,
  totalPerguntas: 10,
  acertos: 0,
  respondido: false,
  intervaloSorteado: null,
  serieEncerrada: false,
  historico: []
};


function sortearNovoIntervalo(intervalosPermitidos) {
    const chave = intervalosPermitidos[Math.floor(Math.random() * intervalosPermitidos.length)];
    treinoOuvido.intervaloSorteado = {
      chave: chave,
      ...AudioMotor.intervalos[chave]
    };
    treinoOuvido.respondido = false;

    const feedback = $('ear-feedback');
    if (feedback) {
      feedback.style.display = 'none';
      feedback.className = 'ear-feedback-box';
    }
    const pos = $('ear-controles-pos');
    if (pos) pos.style.display = 'none';
  }

function checarRespostaIntervalo(escolhidoChave) {
    // P1-13: Não permite pontuação após série encerrada
    if (treinoOuvido.serieEncerrada) return;
    if (!treinoOuvido.intervaloSorteado) return;

    const feedback = $('ear-feedback');
    const pos = $('ear-controles-pos');
    if (!feedback) return;

    feedback.style.display = 'block';

    const correto = (escolhidoChave === treinoOuvido.intervaloSorteado.chave);

    // P1-13: Apenas primeira resposta pontua â€” registrar no historico
    if (!treinoOuvido.respondido) {
      treinoOuvido.respondido = true;
      if (correto) treinoOuvido.acertos++;
      // Guardar primeira resposta da pergunta no histórico da série
      treinoOuvido.historico.push({
        pergunta: treinoOuvido.perguntaAtual,
        intervaloChave: treinoOuvido.intervaloSorteado.chave,
        respostaChave: escolhidoChave,
        correto
      });
    }

    if (correto) {
      feedback.className = 'ear-feedback-box feedback-correto';
      feedback.innerHTML = `<strong>Correto!</strong> Você identificou ${escapeHTML(treinoOuvido.intervaloSorteado.nome)} (${treinoOuvido.intervaloSorteado.semitons} semitons).<br><em>${escapeHTML(treinoOuvido.intervaloSorteado.explicacao)}</em>`;
    } else {
      const respErrada = AudioMotor.intervalos[escolhidoChave];
      feedback.className = 'ear-feedback-box feedback-incorreto';
      feedback.innerHTML = `<strong>Resposta incorreta.</strong> Você selecionou ${escapeHTML(respErrada.nome)}, mas o intervalo tocado foi <strong>${escapeHTML(treinoOuvido.intervaloSorteado.nome)}</strong> (${treinoOuvido.intervaloSorteado.semitons} semitons).<br><em>Dica: ${escapeHTML(treinoOuvido.intervaloSorteado.explicacao)}</em>`;
    }

    const progresso = $('ear-progresso-serie');
    if (progresso) progresso.textContent = `Pergunta ${treinoOuvido.perguntaAtual} de ${treinoOuvido.totalPerguntas} Â· Acertos: ${treinoOuvido.acertos}`;
    if (pos) pos.style.display = 'block';
  }

function avancarPerguntaTreinoOuvido(intervalosPermitidos) {
    // P1-13: Não avança se série encerrada
    if (treinoOuvido.serieEncerrada) return;

    if (treinoOuvido.perguntaAtual < treinoOuvido.totalPerguntas) {
      treinoOuvido.perguntaAtual++;
      sortearNovoIntervalo(intervalosPermitidos);
      const progresso = $('ear-progresso-serie');
      if (progresso) progresso.textContent = `Pergunta ${treinoOuvido.perguntaAtual} de ${treinoOuvido.totalPerguntas} Â· Acertos: ${treinoOuvido.acertos}`;
    } else {
      // Série concluída â€” marcar e desabilitar respostas
      treinoOuvido.serieEncerrada = true;
      const feedback = $('ear-feedback');
      const pos = $('ear-controles-pos');
      if (feedback) {
        feedback.className = 'ear-feedback-box feedback-correto';
        feedback.innerHTML = `<strong>Série Concluída!</strong> Você acertou ${treinoOuvido.acertos} de ${treinoOuvido.totalPerguntas} perguntas (${Math.round((treinoOuvido.acertos / treinoOuvido.totalPerguntas) * 100)}%). Registre seu resultado na conclusão da sessão.`;
        feedback.style.display = 'block';
      }
      // P1-13: Reiniciar restaura o botão "Próxima Pergunta"
      if (pos) {
        pos.style.display = 'block';
        pos.innerHTML = `<button id="btn-reiniciar-serie" class="btn btn-secondary btn-sm" type="button">Reiniciar Série</button>`;
        const btnReiniciar = $('btn-reiniciar-serie');
        if (btnReiniciar) btnReiniciar.onclick = () => reiniciarTreinoOuvido(intervalosPermitidos);
      }
      // Desabilitar botÁµes de resposta após término (P1-13)
      document.querySelectorAll('.btn-opcao-intervalo').forEach(el => { el.disabled = true; });
    }
  }

function reiniciarTreinoOuvido(intervalosPermitidos) {
    treinoOuvido.perguntaAtual = 1;
    treinoOuvido.acertos = 0;
    treinoOuvido.respondido = false;
    treinoOuvido.intervaloSorteado = null;
    treinoOuvido.serieEncerrada = false;
    treinoOuvido.historico = [];
    // nivel mantido para não recarregar a ferramenta

    // Reabilitar botÁµes de resposta
    document.querySelectorAll('.btn-opcao-intervalo').forEach(el => { el.disabled = false; });

    // Restaurar botão de próxima pergunta (P1-13)
    const pos = $('ear-controles-pos');
    if (pos) {
      pos.style.display = 'none';
      pos.innerHTML = `<button id="btn-proxima-pergunta" class="btn btn-primary btn-sm" type="button">Próxima Pergunta âž”</button>`;
      $('btn-proxima-pergunta').onclick = () => avancarPerguntaTreinoOuvido(intervalosPermitidos);
    }

    sortearNovoIntervalo(intervalosPermitidos);
    const progresso = $('ear-progresso-serie');
    if (progresso) progresso.textContent = `Pergunta 1 de ${treinoOuvido.totalPerguntas} Â· Acertos: 0`;
  }