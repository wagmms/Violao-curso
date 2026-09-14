function criarSerieOuvido(nivel = null) {
  return {id: novoId('serie'), sessaoId: state.sessao.id, atividadeId: state.atividadeAtualId, nivel,
    perguntaAtual:1, totalPerguntas:10, acertos:0, respondido:false, intervaloSorteado:null, serieEncerrada:false, historico:[]};
}
var treinoOuvido = null;

function validarSerieOuvido(serie) {
  if (serie == null) return null;
  const ativ = atividadesDados.find(a => a.id === serie.atividadeId);
  const permitidos = ativ?.exercicio.intervalosPorNivel?.[serie.nivel];

  if (!permitidos) throw new Error('Série auditiva inválida.');
  if (typeof serie.id !== 'string') throw new Error('Série auditiva inválida.');
  if (typeof serie.sessaoId !== 'string') throw new Error('Série auditiva inválida.');
  if (serie.totalPerguntas !== 10) throw new Error('Série auditiva inválida.');
  if (!Number.isInteger(serie.perguntaAtual)) throw new Error('Série auditiva inválida.');
  if (serie.perguntaAtual < 1 || serie.perguntaAtual > 10) throw new Error('Série auditiva inválida.');
  if (typeof serie.respondido !== 'boolean') throw new Error('Série auditiva inválida.');
  if (typeof serie.serieEncerrada !== 'boolean') throw new Error('Série auditiva inválida.');
  if (!Array.isArray(serie.historico)) throw new Error('Série auditiva inválida.');

  const esperado = serie.perguntaAtual - (serie.respondido ? 0 : 1);
  if (serie.historico.length !== esperado || (serie.serieEncerrada && (esperado !== 10 || !serie.respondido))) throw new Error('Série auditiva incompleta ou inconsistente.');
  for (const [i,h] of serie.historico.entries()) {
    if (h.pergunta !== i+1 || !permitidos.includes(h.intervaloChave) || !permitidos.includes(h.respostaChave) || h.correto !== (h.intervaloChave === h.respostaChave)) throw new Error('Resposta auditiva inválida.');
  }
  if (serie.acertos !== serie.historico.filter(h => h.correto).length) throw new Error('Placar auditivo não corresponde às respostas.');
  if (!serie.intervaloSorteado || !permitidos.includes(serie.intervaloSorteado.chave)) throw new Error('Pergunta auditiva inválida.');
  if (serie.respondido && serie.historico.at(-1).intervaloChave !== serie.intervaloSorteado.chave) throw new Error('Pergunta e resposta não correspondem.');
  return {...serie, intervaloSorteado: {chave:serie.intervaloSorteado.chave, ...AudioMotor.intervalos[serie.intervaloSorteado.chave]}};
}
function salvarSerieOuvido() {
  state.treinoOuvido = JSON.parse(JSON.stringify(treinoOuvido)); salvarEstado();
}
function sortearNovoIntervalo(intervalosPermitidos) {
  const chave = intervalosPermitidos[Math.floor(Math.random()*intervalosPermitidos.length)];
  treinoOuvido.intervaloSorteado = {chave, ...AudioMotor.intervalos[chave]}; treinoOuvido.respondido = false;
  salvarSerieOuvido(); atualizarFeedbackOuvido();
}
function atualizarFeedbackOuvido() {
  const f = $('ear-feedback'), pos = $('ear-controles-pos');
  if (!f || !pos || !treinoOuvido) return;
  $('ear-progresso-serie').textContent = `Pergunta ${treinoOuvido.perguntaAtual} de 10 · Acertos: ${treinoOuvido.acertos}`;
  f.style.display = treinoOuvido.respondido ? 'block' : 'none';
  pos.style.display = treinoOuvido.respondido ? 'block' : 'none';
  document.querySelectorAll('.btn-opcao-intervalo').forEach(b => b.disabled = treinoOuvido.respondido);
  if (treinoOuvido.serieEncerrada) {
    f.textContent = `Série concluída: ${treinoOuvido.acertos} de 10 acertos. O resultado será incluído na avaliação da sessão.`;
    pos.innerHTML = '<button id="btn-reiniciar-serie" class="btn btn-secondary btn-sm" type="button">Reiniciar série</button>';
    $('btn-reiniciar-serie').onclick = () => reiniciarTreinoOuvido(atividadesDados.find(a => a.id === treinoOuvido.atividadeId).exercicio.intervalosPorNivel[treinoOuvido.nivel]);
  } else {
    if (treinoOuvido.respondido) {
      const h = treinoOuvido.historico.at(-1), info = AudioMotor.intervalos[h.intervaloChave];
      f.textContent = `${h.correto ? 'Correto!' : 'Resposta incorreta.'} O intervalo era ${info.nome}. ${info.explicacao}`;
    }
    pos.innerHTML = '<button id="btn-proxima-pergunta" class="btn btn-primary btn-sm" type="button">Próxima pergunta</button>';
    $('btn-proxima-pergunta').onclick = () => avancarPerguntaTreinoOuvido(atividadesDados.find(a => a.id === treinoOuvido.atividadeId).exercicio.intervalosPorNivel[treinoOuvido.nivel]);
  }
}
function checarRespostaIntervalo(chave) {
  if (!treinoOuvido || treinoOuvido.respondido || treinoOuvido.serieEncerrada || !treinoOuvido.intervaloSorteado) return;
  const permitidos = atividadesDados.find(a => a.id === treinoOuvido.atividadeId).exercicio.intervalosPorNivel[treinoOuvido.nivel];
  if (!permitidos.includes(chave)) return;
  const correto = chave === treinoOuvido.intervaloSorteado.chave;
  treinoOuvido.respondido = true; if(correto) treinoOuvido.acertos++;
  treinoOuvido.historico.push({pergunta:treinoOuvido.perguntaAtual,intervaloChave:treinoOuvido.intervaloSorteado.chave,respostaChave:chave,correto});
  if (treinoOuvido.perguntaAtual === 10) treinoOuvido.serieEncerrada = true;
  salvarSerieOuvido(); atualizarFeedbackOuvido();
}
function avancarPerguntaTreinoOuvido(permitidos) {
  if (!treinoOuvido.respondido || treinoOuvido.serieEncerrada) return;
  treinoOuvido.perguntaAtual++; sortearNovoIntervalo(permitidos);
}
function reiniciarTreinoOuvido(permitidos) {
  treinoOuvido = criarSerieOuvido(state.nivelExercicioAtual); sortearNovoIntervalo(permitidos);
}
