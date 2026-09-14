function obterRecomendacao() {
  const prontas = atividadesDados.filter(atividadeTemSessao);
  const atual = prontas.find(a => a.id === state.atividadeAtualId) || prontas[0];
  if (!state.sessao.concluida && (state.sessao.ativa || tempoDecorrido() > 0) && atividadeTemSessao(atual)) {
    return {atividade: atual, nivel: state.sessao.nivel, motivo: `Continue sua sessão: ${Math.floor(tempoDecorrido()/60000)} minutos registrados.`};
  }
  // Se o aluno selecionou explicitamente uma atividade específica
  if (state.atividadeAtualId && prontas.some(a => a.id === state.atividadeAtualId)) {
    const ativEscolhida = prontas.find(a => a.id === state.atividadeAtualId);
    if (ativEscolhida && (ativEscolhida.id !== prontas[0].id || state.sessao.passoAtualIndex > 0)) {
      return {atividade: ativEscolhida, nivel: state.nivelExercicioAtual || 'preparacao', motivo: 'Atividade prioritária selecionada para a prática de hoje.'};
    }
  }
  const dif = state.dificuldades.find(d => !d.resolvida && prontas.some(a => a.id === d.atividadeId));
  if (dif) return {atividade: prontas.find(a => a.id === dif.atividadeId), nivel: 'preparacao', motivo: `Recuperação de ${dif.trecho}: pratique a Preparação.`};
  const dataAtual = (typeof window !== 'undefined' && window.obterDataLocal) ? window.obterDataLocal() : obterDataLocal();
  const rev = state.revisoes.filter(r => !r.concluida && r.dataPrevista <= dataAtual && prontas.some(a => a.id === r.atividadeId)).sort((a,b) => a.dataPrevista.localeCompare(b.dataPrevista))[0];
  if (rev) return {atividade: prontas.find(a => a.id === rev.atividadeId), nivel: 'alvo', motivo: `Revisão prevista para ${rev.dataPrevista}, ciclo ${rev.ciclo}.`};

  // Se houver ponto de partida diagnosticado e ainda não superado
  if (state.perfil && state.perfil.pontoPartida && state.perfil.pontoPartida.atividadeId) {
    const ativDiag = prontas.find(a => a.id === state.perfil.pontoPartida.atividadeId);
    if (ativDiag && state.habilidades[ativDiag.slug]?.status !== 'alvo_demonstrado') {
      return {
        atividade: ativDiag,
        nivel: state.perfil.pontoPartida.nivelExercicio || 'preparacao',
        motivo: state.perfil.pontoPartida.justificativa || `Ponto de partida pedagógico: ${state.perfil.pontoPartida.gargalo || ativDiag.habilidade}`
      };
    }
  }

  const proxima = state.habilidades[atual.slug]?.status !== 'alvo_demonstrado' ? atual : prontas.find(a => state.habilidades[a.slug]?.status !== 'alvo_demonstrado') || atual;
  return {atividade: proxima, nivel: proxima.id === state.atividadeAtualId ? state.nivelExercicioAtual : 'preparacao', motivo: 'Sugerida como sequência prioritária dos fundamentos do curso.'};
}

function trocarAtividade(novaId, nivel) {
  if (!ATIVIDADES_VALIDAS_IDS.has(novaId)) return false;
  if (nivel && !NIVEIS_VALIDOS.has(nivel)) return false;
  if (state.aprendizagemCurso) state.aprendizagemCurso.aulaAtualId = null;
  const nivelFinal = nivel || (state.atividadeAtualId === novaId && state.nivelExercicioAtual ? state.nivelExercicioAtual : 'preparacao');
  if (state.atividadeAtualId !== novaId || state.sessao.concluida) {
    registrarInterrupcao('Sessão interrompida para trocar de atividade.');
    pararRelogio();
    state.atividadeAtualId = novaId;
    state.nivelExercicioAtual = nivelFinal;
    state.sessao = novaSessao(novaId, nivelFinal);
  } else if (nivel) {
    state.nivelExercicioAtual = nivel; state.sessao.nivel = nivel;
  }
  salvarEstado(); atualizarTimer(); return true;
}

function atualizarRevisaoAlvo(ativ, tentativa) {
  if (tentativa.nivel !== 'alvo') return;
  normalizarRevisoes(state.revisoes);
  const dataFn = (typeof window !== 'undefined' && window.obterDataLocal) ? window.obterDataLocal : obterDataLocal;
  const hoje = dataFn();
  const rev = state.revisoes.find(r => r.atividadeId === ativ.id && !r.concluida);
  const sucesso = tentativa.status === 'consegui';
  if (rev && rev.dataPrevista > hoje && sucesso) {
    rev.tentativasAntecipadas = [...(rev.tentativasAntecipadas || []), {data: hoje, status: tentativa.status, tentativaId: tentativa.id}];
    return;
  }
  let intervalo = 2, ciclo = 1;
  if (rev) {
    rev.concluida = true; rev.dataConclusao = hoje; rev.tentativaId = tentativa.id;
    if (sucesso) { intervalo = rev.intervaloDias === 2 ? 7 : 21; ciclo = Math.min(999, rev.ciclo + 1); }
  }
  state.revisoes.push({id: novoId('rev'), atividadeId: ativ.id, nivel: 'alvo', ciclo, intervaloDias: intervalo, dataPrevista: dataFn(intervalo), concluida: false});
}

function criterioDoNivel(ativ, nivel) {
  const n = ativ.exercicio.niveis[nivel];
  if (n.criterioSaida) return n.criterioSaida;
  if (nivel === 'alvo') return ativ.criterioSaida;
  return `${n.nome}: execute a tarefa descrita${n.repeticoes ? ', completando ' + n.repeticoes : ''}. ${n.descricao} Este registro não aprova o Alvo nem altera sua revisão.`;
}

function abrirModalResultado(ativ) {
  const dialog = $('modal-resultado');
  if (!dialog || !atividadeTemSessao(ativ)) return;
  if (state.sessao.concluida) { mostrarAlerta('Resultado já registrado. Inicie uma nova sessão para registrar outra tentativa.'); return; }
  const nivel = state.sessao.nivel;
  const sessaoId = state.sessao.id;
  const auditivo = ativ.ferramentaSugerida === 'treinador-ouvido';
  $('res-atividade-nome').textContent = `${ativ.titulo} — ${ativ.exercicio.niveis[nivel].nome}`;
  $('select-res-status').value = '';
  $('input-res-bpm').value = '';
  $('input-res-obs').value = '';
  $('res-compassos').value = '';
  $('res-tentativas').value = '';
  for (const id of ['chk-pulso','chk-notas','chk-encerramento']) $(id).checked = false;
  $('input-res-bpm').parentElement.hidden = auditivo;
  $('res-compassos').parentElement.parentElement.hidden = auditivo;
  $('chk-pulso').closest('fieldset').hidden = auditivo;
  let criterio = $('div-criterio-modal');
  if (!criterio) { criterio = document.createElement('div'); criterio.id = 'div-criterio-modal'; dialog.querySelector('.modal-body').prepend(criterio); }
  criterio.innerHTML = `<label><input type="checkbox" class="criterio-check"> ${escapeHTML(criterioDoNivel(ativ, nivel))}</label>`;
  let erro = $('resultado-erro');
  if (!erro) { erro = document.createElement('p'); erro.id = 'resultado-erro'; erro.setAttribute('role','alert'); dialog.querySelector('.modal-body').append(erro); }
  erro.textContent = '';
  $('btn-salvar-resultado').disabled = false;
  $('btn-salvar-resultado').onclick = () => {
    try {
      if (state.sessao.id !== sessaoId || state.sessao.concluida || state.sessao.nivel !== nivel) throw new Error('A sessão mudou. Feche esta avaliação e abra novamente.');
      const status = $('select-res-status').value;
      if (!['consegui','repetir','dificuldade'].includes(status)) throw new Error('Selecione como foi seu desempenho.');
      const lerNumero = (id, min, max) => {
        const el = $(id), raw = el.value.trim();
        if (el.validity?.badInput) throw new Error('Informe um número válido.');
        if (!raw) return null;
        const num = Number(raw);
        if (!Number.isInteger(num) || num < min || num > max) throw new Error(`Informe ${id === 'input-res-bpm' ? 'BPM' : id === 'res-compassos' ? 'compassos' : 'tentativas'} entre ${min} e ${max}.`);
        return num;
      };
      const bpm = auditivo ? 0 : lerNumero('input-res-bpm',30,240);
      const compassos = auditivo ? null : lerNumero('res-compassos',0,32);
      const repeticoes = auditivo ? null : lerNumero('res-tentativas',1,50);
      if (status === 'consegui' && !criterio.querySelector('input').checked) throw new Error('Confirme o critério do nível praticado.');
      if (status === 'consegui' && !auditivo && bpm === null) throw new Error('Informe o BPM alcançado antes de registrar sucesso.');
      const serie = auditivo ? state.treinoOuvido : null;
      if (auditivo && status === 'consegui' && (!serie || serie.sessaoId !== sessaoId || serie.nivel !== nivel || !serie.serieEncerrada || (nivel === 'alvo' && serie.acertos < 8))) {
        throw new Error('Conclua a série deste nível. Para o Alvo, são necessários pelo menos 8 acertos em 10.');
      }
      const tentativa = {id: novoId('tent'), sessaoId, atividadeId: ativ.id, nivel, data: obterDataLocal(), status, bpm: bpm ?? 0,
        duracaoMs: tempoDecorrido(), compassosSemErro: compassos, tentativasAteAcertar: repeticoes,
        checklistExecutado: {pulso: $('chk-pulso').checked, notas: $('chk-notas').checked, encerramento: $('chk-encerramento').checked},
        criterioConfirmado: criterio.querySelector('input').checked, observacoes: $('input-res-obs').value.trim()};
      if (serie) tentativa.serieOuvido = JSON.parse(JSON.stringify(serie));
      // Todas as validações precedem a primeira mutação do histórico.
      state.tentativas.push(tentativa);
      if (status === 'consegui' && nivel === 'alvo') state.habilidades[ativ.slug] = {status:'alvo_demonstrado',data:obterDataLocal(),tentativaId:tentativa.id};
      else if (status === 'consegui' && nivel === 'preparacao' && state.habilidades[ativ.slug]?.status !== 'alvo_demonstrado') state.habilidades[ativ.slug] = {status:'em_pratica',data:obterDataLocal()};
      atualizarRevisaoAlvo(ativ, tentativa);
      state.sessao.elapsedMs = tentativa.duracaoMs;
      state.sessao.ativa = false; state.sessao.ultimoTimestamp = null; state.sessao.concluida = true;
      pararRelogio(); salvarEstado(); atualizarTimer();
      $('btn-salvar-resultado').disabled = true;
      dialog.close(); navegarPara('progresso');
    } catch (e) { erro.textContent = e.message; }
  };
  $('btn-fechar-resultado').onclick = () => dialog.close();
  dialog.showModal();
}

function abrirModalDificuldade(ativOuAula) {
    const dialog = $('modal-dificuldade');
    if (!dialog) return;

    const titulo = ativOuAula.titulo || ativOuAula.grupo_aula || 'Trecho de Estudo';
    const trechoPadrao = ativOuAula.exercicio && ativOuAula.exercicio.niveis 
      ? ativOuAula.exercicio.niveis[state.nivelExercicioAtual || 'alvo'].nome 
      : (ativOuAula.titulo || '');
    const itemId = ativOuAula.id || 'aula-custom';

    $('dif-atividade-nome').textContent = titulo;
    $('input-dif-trecho').value = trechoPadrao;
    $('input-dif-problema').value = '';

    $('btn-salvar-dificuldade').onclick = async () => {
      const trecho = ($('input-dif-trecho').value || '').trim();
      const problema = ($('input-dif-problema').value || '').trim();
      if (!problema) {
        await mostrarAlerta('Por favor, descreva a dificuldade observada.');
        return;
      }

      state.dificuldades.push({
        id: 'dif-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        atividadeId: itemId,
        trecho: trecho,
        problema: problema,
        data: obterDataLocal(),
        resolvida: false
      });

      salvarEstado();
      dialog.close();
      await mostrarAlerta('Dificuldade registrada no seu Caderno. Você pode revisá-la com o roteiro de recuperação na aba Progresso.');
    };

    $('btn-fechar-dificuldade').onclick = () => dialog.close();
    dialog.showModal();
  }

function calcularDiagnosticoPontoPartida(respostas) {
  const pesoExp = { zero: 0, iniciante: 25, intermediario: 60, avancado: 90 }[respostas.experiencia] ?? 25;
  const scoreAcordes = (Number(respostas.acordes) || 0) * 33.33;
  const scoreRitmo = (Number(respostas.ritmo) || 0) * 33.33;
  const scorePercepcao = (Number(respostas.percepcao) || 0) * 33.33;
  const scoreLeitura = (Number(respostas.leitura) || 0) * 33.33;

  const scoreGeral = Math.min(100, Math.round(
    scoreAcordes * 0.30 +
    scoreRitmo * 0.30 +
    scorePercepcao * 0.15 +
    scoreLeitura * 0.15 +
    pesoExp * 0.10
  ));

  let nivelKey = 'iniciante';
  let nivelLabel = 'Iniciante (Fundamentos)';
  let gargalo = '';
  let atividadeId = 'ativ-1';
  let moduloId = 'mod-1';
  let aulaId = 'aula-mod-1-2';
  let justificativa = '';
  let nivelExercicio = 'preparacao';

  const acordesVal = String(respostas.acordes ?? '0');
  const ritmoVal = String(respostas.ritmo ?? '0');
  const percepcaoVal = String(respostas.percepcao ?? '0');
  const leituraVal = String(respostas.leitura ?? '0');
  const objetivoVal = String(respostas.objetivo ?? 'fundamentos');

  if (ritmoVal === '0' && acordesVal === '0') {
    nivelKey = 'iniciante_zero';
    nivelLabel = 'Iniciante Zero (Fundamentos Mecânicos)';
    gargalo = 'Coordenação motora inicial, postura e estabilização de pulso isócrono com metrônomo.';
    atividadeId = 'ativ-1';
    moduloId = 'mod-1';
    aulaId = 'aula-mod-1-2';
    nivelExercicio = 'preparacao';
    justificativa = 'Comece pela estabilização da mão direita e postura no violão de nylon antes de tentar trocas rápidas de acordes.';
  } else if (ritmoVal === '0') {
    nivelKey = 'iniciante_ritmo';
    nivelLabel = 'Iniciante (Pulso e Subdivisão)';
    gargalo = 'Insegurança rítmica, oscilação de andamento e ausência de subdivisão binária precisa.';
    atividadeId = 'ativ-1';
    moduloId = 'mod-1';
    aulaId = 'aula-mod-1-2';
    nivelExercicio = 'preparacao';
    justificativa = 'O pulso estável é a base de todo violonista. Domine a subdivisão a 60 BPM para dar segurança às suas músicas.';
  } else if (acordesVal === '0') {
    nivelKey = 'iniciante_trocas';
    nivelLabel = 'Iniciante (Troca Instantânea de Acordes)';
    gargalo = 'Pausa no ritmo durante a troca de acordes e movimento lento de dedo a dedo.';
    atividadeId = 'ativ-2';
    moduloId = 'mod-2';
    aulaId = 'aula-mod-1-10';
    nivelExercicio = 'preparacao';
    justificativa = 'Trabalhe a troca instantânea em bloco com ancoragem de dedos pivô (Lá e Ré) sem interrupção do pulso.';
  } else if (acordesVal === '1' && ritmoVal === '1') {
    if (percepcaoVal === '0') {
      nivelKey = 'iniciante_percepcao';
      nivelLabel = 'Iniciante Consolidado (Percepção & Ouvido)';
      gargalo = 'Dependência exclusiva de cifras desenhadas e dificuldade para identificar notas e intervalos de ouvido.';
      atividadeId = 'ativ-4';
      moduloId = 'mod-3';
      aulaId = 'aula-mod-1-15';
      nivelExercicio = 'preparacao';
      justificativa = 'Treine a distinção auditiva de terças, quartas e quintas para libertar seu violão da dependência de cifras decoradas.';
    } else if (leituraVal === '0') {
      nivelKey = 'iniciante_leitura';
      nivelLabel = 'Iniciante Consolidado (Leitura Rítmica)';
      gargalo = 'Insegurança com notação métrica (semínimas, colcheias e pausas) e dependência de áudio para aprender.';
      atividadeId = 'ativ-3';
      moduloId = 'mod-4';
      aulaId = 'aula-mod-1-8';
      nivelExercicio = 'preparacao';
      justificativa = 'Fortaleça a leitura rítmica de semínimas e colcheias para acelerar sua autonomia no repertório.';
    } else {
      nivelKey = 'intermediario_1';
      nivelLabel = 'Intermediário Inicial (Pestanas & Sétimas)';
      gargalo = 'Transição para pestanas sem tensão excessiva e compreensão harmônica das primeiras tétrades.';
      atividadeId = 'ativ-5';
      moduloId = 'mod-5';
      aulaId = 'aula-mod-1-9';
      nivelExercicio = 'alvo';
      justificativa = 'Com ritmo e trocas fundamentais estáveis, seu próximo salto é dominar tríades e vencer a barreira das pestanas.';
    }
  } else if (Number(acordesVal) >= 2 || Number(ritmoVal) >= 2) {
    if (objetivoVal === 'brasileiro') {
      if (Number(ritmoVal) < 3) {
        nivelKey = 'intermediario_2_bossa';
        nivelLabel = 'Intermediário (Violão Brasileiro: Bossa Nova)';
        gargalo = 'Síncope na mão direita e independência motora entre o baixo antecipado e os acordes em bloco.';
        atividadeId = 'ativ-7';
        moduloId = 'mod-6';
        aulaId = 'aula-mod-9-10';
        nivelExercicio = 'preparacao';
        justificativa = 'Domine a levada sincopada de João Gilberto e a independência rítmica do polegar no violão brasileiro.';
      } else {
        nivelKey = 'avancado_brasileiro';
        nivelLabel = 'Avançado (Violão Brasileiro: Baden Powell & Baixarias)';
        gargalo = 'Dinâmica percussiva da mão direita e condução melódica nos bordões (samba e choro).';
        atividadeId = (acordesVal === '3') ? 'ativ-9' : 'ativ-8';
        moduloId = (acordesVal === '3') ? 'mod-9' : 'mod-8';
        aulaId = (acordesVal === '3') ? 'aula-mod-7-2' : 'aula-mod-7-1';
        nivelExercicio = 'alvo';
        justificativa = 'Aprofunde as 5 levadas mágicas de Baden Powell e a arte das baixarias contrapontísticas no nylon.';
      }
    } else if (objetivoVal === 'solo_fingerstyle') {
      if (Number(acordesVal) < 3) {
        nivelKey = 'intermediario_solo';
        nivelLabel = 'Intermediário (Violão Solo: Melodia & Acompanhamento)';
        gargalo = 'Hierarquia dinâmica entre a melodia (mais cantada nas primas) e o acompanhamento (suave nos bordões).';
        atividadeId = 'ativ-6';
        moduloId = 'mod-11';
        aulaId = 'aula-mod-1-19';
        nivelExercicio = 'alvo';
        justificativa = 'Aprenda a destacar a linha melódica nas cordas agudas mantendo a base harmônica e o baixo integrados.';
      } else {
        nivelKey = 'avancado_solo';
        nivelLabel = 'Avançado (Violão Solo & Arranjo Polifônico)';
        gargalo = 'Independência polifônica e condução de múltiplas vozes simultâneas no nylon.';
        atividadeId = 'ativ-10';
        moduloId = 'mod-11';
        aulaId = 'aula-mod-8-2';
        nivelExercicio = 'alvo';
        justificativa = 'Pratique arranjos fingerstyle completos com controle refinado de timbre, dinâmica e hierarquia polifônica.';
      }
    } else {
      if (Number(acordesVal) >= 3) {
        nivelKey = 'avancado_master';
        nivelLabel = 'Avançado / Master (Harmonia Moderna & Drop 2)';
        gargalo = 'Fluência em voicings no meio do braço e voice leading nas cadências II-V-I.';
        atividadeId = 'ativ-11';
        moduloId = 'mod-10';
        aulaId = 'aula-mod-9-8';
        nivelExercicio = 'alvo';
        justificativa = 'Explore a condução harmônica refinada com voicings Drop 2 e o braço panorâmico (CAGED).';
      } else {
        nivelKey = 'intermediario_1';
        nivelLabel = 'Intermediário (Harmonia Aplicada & Pestanas)';
        gargalo = 'Consolidação de pestanas e expansão de vocabulário harmônico no braço.';
        atividadeId = 'ativ-5';
        moduloId = 'mod-5';
        aulaId = 'aula-mod-1-9';
        nivelExercicio = 'alvo';
        justificativa = 'Fortaleça a compreensão das tríades e tétrades para transitar com segurança por todo o braço do violão.';
      }
    }
  }

  let moduloNome = '01. Anatomia, Postura e os Primeiros Sons';
  let aulaTitulo = '02 - Noções Básicas de Ritmo';
  if (typeof window !== 'undefined' && window.CURSO_DADOS && window.CURSO_DADOS.catalogoOriginal) {
    const mod = window.CURSO_DADOS.catalogoOriginal.find(m => m.id === moduloId);
    if (mod) {
      moduloNome = mod.nome || mod.tituloOriginal || moduloNome;
      const al = mod.aulas.find(x => x.id === aulaId);
      if (al) aulaTitulo = al.grupo_aula || aulaTitulo;
    }
  }

  const ativObj = (typeof atividadesDados !== 'undefined') ? atividadesDados.find(a => a.id === atividadeId) : null;
  const atividadeTitulo = ativObj ? ativObj.titulo : 'Pulso e Subdivisão Rítmica no Nylon';

  return {
    scoreGeral,
    scores: {
      mecanica: Math.round(scoreAcordes),
      ritmo: Math.round(scoreRitmo),
      percepcao: Math.round(scorePercepcao),
      leitura: Math.round(scoreLeitura)
    },
    nivelKey,
    nivelLabel,
    gargalo,
    atividadeId,
    atividadeTitulo,
    atividadeNivel: nivelExercicio,
    moduloId,
    moduloNome,
    aulaId,
    aulaTitulo,
    nivelExercicio,
    justificativa
  };
}

function abrirModalDiagnostico() {
  const dialog = $('modal-diagnostico');
  if (!dialog) return;

  const respostasAtuais = {
    experiencia: state.perfil?.diagnostico?.respostas?.experiencia || 'iniciante',
    acordes: state.perfil?.diagnostico?.respostas?.acordes || '0',
    ritmo: state.perfil?.diagnostico?.respostas?.ritmo || '0',
    percepcao: state.perfil?.diagnostico?.respostas?.percepcao || '0',
    leitura: state.perfil?.diagnostico?.respostas?.leitura || '0',
    objetivo: state.perfil?.diagnostico?.respostas?.objetivo || 'fundamentos'
  };

  const perguntas = [
    {
      campo: 'experiencia',
      numero: '01',
      titulo: 'Tempo de Prática e Histórico com Violão',
      opcoes: [
        { valor: 'zero', label: 'Começando do Zero', desc: 'Nunca toquei violão ou estou dando os primeiros passos absolutos.' },
        { valor: 'iniciante', label: 'Poucos Meses', desc: 'Conheço alguns acordes soltos, mas ainda não toco músicas completas no tempo.' },
        { valor: 'intermediario', label: '1 a 3 Anos', desc: 'Toco repertório popular básico, mas tenho bloqueios em pestanas, ritmo ou teoria.' },
        { valor: 'avancado', label: 'Mais de 3 Anos', desc: 'Toco com autonomia e busco harmonia moderna, ritmo brasileiro e fingerstyle.' }
      ]
    },
    {
      campo: 'acordes',
      numero: '02',
      titulo: 'Mão Esquerda — Fluência Mecânica e Trocas de Acordes',
      opcoes: [
        { valor: '0', label: 'Movimento Dedo a Dedo', desc: 'Pauso a batida para posicionar o acorde ou hesito na troca entre formas.' },
        { valor: '1', label: 'Acordes Abertos no Tempo', desc: 'Troco acordes simples (C, D, G, Em, Am) sem parar, mas travo em pestanas (F, Bm).' },
        { valor: '2', label: 'Pestanas & Tétrades Básicas', desc: 'Faço pestanas sem interromper a levada e utilizo acordes com 7ª e inversões.' },
        { valor: '3', label: 'Voicings & Condução Suave', desc: 'Domino tétrades, voicings Drop 2, sistema CAGED e voice leading no braço.' }
      ]
    },
    {
      campo: 'ritmo',
      numero: '03',
      titulo: 'Mão Direita — Pulso, Rítmica e Levadas',
      opcoes: [
        { valor: '0', label: 'Pulso Instável / Sem Metrônomo', desc: 'Oscilo a velocidade, perco o tempo com frequência e tenho dificuldade em subdividir.' },
        { valor: '1', label: 'Batidas Pop/Rock Contínuas', desc: 'Mantenho pulso firme em 4/4 e 3/4 em batidas fundamentais constantes.' },
        { valor: '2', label: 'Síncopes & Dedilhados P-I-M-A', desc: 'Domino levadas sincopadas (Bossa Nova, Samba) e dedilhados regulares.' },
        { valor: '3', label: 'Levadas Baden & Percussivas', desc: 'Domino levadas dinâmicas de Baden Powell, choro e baixarias nos bordões.' }
      ]
    },
    {
      campo: 'percepcao',
      numero: '04',
      titulo: 'Percepção Auditiva e Teoria Musical Aplicada',
      opcoes: [
        { valor: '0', label: 'Apenas Cifras Decoradas', desc: 'Não identifico intervalos ou notas de ouvido; dependo 100% de diagramas visuais.' },
        { valor: '1', label: 'Maior vs Menor e Semitons', desc: 'Distingo acordes Maiores de Menores e compreendo a lógica de tons e semitons.' },
        { valor: '2', label: 'Intervalos & Campo Harmônico', desc: 'Reconheço terças, quartas e quintas de ouvido e entendo campo harmônico maior.' },
        { valor: '3', label: 'Harmonia Funcional Avançada', desc: 'Reconheço tensões (7, 9, 13), cadências II-V-I e tiro levadas/arranjos de ouvido.' }
      ]
    },
    {
      campo: 'leitura',
      numero: '05',
      titulo: 'Leitura Musical, Cifras e Notação',
      opcoes: [
        { valor: '0', label: 'Apenas Vídeos e Diagramas', desc: 'Não leio tablaturas nem partituras; aprendo apenas imitando vídeos demonstrativos.' },
        { valor: '1', label: 'Tablaturas e Figuras Rítmicas', desc: 'Leio tablatura com fluência e compreendo figuras de tempo (semínimas e colcheias).' },
        { valor: '2', label: 'Partitura na 1ª Posição', desc: 'Leio melodias em partitura (clave de sol), entendo compassos, pausas e ligaduras.' },
        { valor: '3', label: 'Partitura no Braço & Analítica', desc: 'Leio partituras em várias posições do braço e domino cifragem analítica funcional.' }
      ]
    },
    {
      campo: 'objetivo',
      numero: '06',
      titulo: 'Seu Foco Prioritário de Aprendizagem',
      opcoes: [
        { valor: 'fundamentos', label: 'Fundamentos & Som Limpo', desc: 'Construir base sólida: postura sem dor, troca instantânea e primeiras músicas no tempo.' },
        { valor: 'brasileiro', label: 'Violão Brasileiro & Síncope', desc: 'Bossa Nova, Samba, Choro, levadas de Baden Powell e baixarias nos bordões.' },
        { valor: 'solo_fingerstyle', label: 'Violão Solo & Fingerstyle', desc: 'Tocar melodia, harmonia e contracanto simultâneos no violão de nylon.' },
        { valor: 'harmonia_improviso', label: 'Harmonia Moderna & Braço', desc: 'Voicings Drop 2, sistema CAGED, escalas e voice leading nas cadências II-V-I.' }
      ]
    }
  ];

  let htmlPerguntas = `
    <div class="diag-intro-banner">
      <div class="diag-intro-icon">🎯</div>
      <div class="diag-intro-text">
        <strong>Diagnóstico Pedagógico do Método Tríade & Kaiserplay</strong>
        <p>Avalie suas habilidades nos 5 eixos fundamentais do violão de nylon. O algoritmo identifica seu gargalo técnico imediato e calcula onde você deve iniciar no acervo e nas rotinas diárias de 40 minutos.</p>
      </div>
    </div>
    <div class="diag-form-list">
  `;

  perguntas.forEach(p => {
    htmlPerguntas += `
      <div class="diag-step-card" data-step-campo="${p.campo}">
        <div class="diag-step-header">
          <div class="diag-step-header-left">
            <span class="diag-step-badge">Etapa ${p.numero}</span>
            <span class="diag-step-title">${p.titulo}</span>
          </div>
        </div>
        <div class="diag-tiles-grid">
    `;

    p.opcoes.forEach(op => {
      const isSelected = respostasAtuais[p.campo] === op.valor;
      htmlPerguntas += `
        <button type="button" class="diag-choice-tile ${isSelected ? 'ativo' : ''}" data-campo="${p.campo}" data-valor="${op.valor}">
          <div class="diag-tile-head">
            <span class="diag-tile-title">${escapeHTML(op.label)}</span>
            <span class="diag-tile-check">✓</span>
          </div>
          <p class="diag-tile-desc">${escapeHTML(op.desc)}</p>
        </button>
      `;
    });

    htmlPerguntas += `
        </div>
      </div>
    `;
  });

  htmlPerguntas += `
    </div>
    <div id="diag-preview-container"></div>
  `;

  $('corpo-diagnostico').innerHTML = htmlPerguntas;

  function renderizarPreview() {
    const res = calcularDiagnosticoPontoPartida(respostasAtuais);
    const container = $('diag-preview-container');
    if (!container) return;

    container.innerHTML = `
      <div class="diag-live-preview">
        <div class="diag-preview-header">
          <span class="diag-preview-badge">Resultado em Tempo Real</span>
          <h4>Mapeamento do Seu Ponto de Partida</h4>
        </div>

        <div class="diag-preview-grid">
          <div class="diag-preview-col-left">
            <div class="diag-level-card">
              <span class="diag-level-subtitle">Nível Técnico Calculado</span>
              <div class="diag-level-name">${escapeHTML(res.nivelLabel)}</div>
              <div class="diag-score-bar-wrap">
                <div class="diag-score-label">
                  <span>Pontuação Global</span>
                  <strong>${res.scoreGeral} / 100</strong>
                </div>
                <div class="diag-bar-track">
                  <div class="diag-bar-fill" style="width: ${res.scoreGeral}%;"></div>
                </div>
              </div>
            </div>

            <div class="diag-meters-grid">
              <div class="diag-meter-item">
                <div class="diag-meter-header">
                  <span>Mão Esquerda (Trocas)</span>
                  <strong>${res.scores.mecanica}%</strong>
                </div>
                <div class="diag-bar-track mini"><div class="diag-bar-fill" style="width:${res.scores.mecanica}%;"></div></div>
              </div>
              <div class="diag-meter-item">
                <div class="diag-meter-header">
                  <span>Mão Direita (Rítmica)</span>
                  <strong>${res.scores.ritmo}%</strong>
                </div>
                <div class="diag-bar-track mini"><div class="diag-bar-fill" style="width:${res.scores.ritmo}%;"></div></div>
              </div>
              <div class="diag-meter-item">
                <div class="diag-meter-header">
                  <span>Percepção & Ouvido</span>
                  <strong>${res.scores.percepcao}%</strong>
                </div>
                <div class="diag-bar-track mini"><div class="diag-bar-fill" style="width:${res.scores.percepcao}%;"></div></div>
              </div>
              <div class="diag-meter-item">
                <div class="diag-meter-header">
                  <span>Leitura & Métrica</span>
                  <strong>${res.scores.leitura}%</strong>
                </div>
                <div class="diag-bar-track mini"><div class="diag-bar-fill" style="width:${res.scores.leitura}%;"></div></div>
              </div>
            </div>
          </div>

          <div class="diag-preview-col-right">
            <div class="diag-bottleneck-card">
              <div class="diag-bottleneck-tag">🚨 Gargalo Técnico Prioritário a Destravar</div>
              <p class="diag-bottleneck-desc">${escapeHTML(res.gargalo)}</p>
            </div>

            <div class="diag-recommendation-card">
              <div class="diag-rec-item">
                <span class="diag-rec-icon">⏱</span>
                <div>
                  <strong>Sessão de 40 Minutos Recomendada:</strong>
                  <p>${escapeHTML(res.atividadeTitulo)} (${res.nivelExercicio === 'preparacao' ? 'Nível Preparação' : 'Nível Alvo'})</p>
                </div>
              </div>
              <div class="diag-rec-item">
                <span class="diag-rec-icon">📚</span>
                <div>
                  <strong>Módulo do Acervo:</strong>
                  <p>${escapeHTML(res.moduloNome)}</p>
                </div>
              </div>
              <div class="diag-rec-item">
                <span class="diag-rec-icon">🎓</span>
                <div>
                  <strong>Primeira Aula Sugerida:</strong>
                  <p>${escapeHTML(res.aulaTitulo)}</p>
                </div>
              </div>
              <div class="diag-rec-justificativa">
                <strong>Diretriz Pedagógica:</strong> ${escapeHTML(res.justificativa)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Interatividade das opções
  const tiles = $('corpo-diagnostico').querySelectorAll('.diag-choice-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const campo = tile.getAttribute('data-campo');
      const valor = tile.getAttribute('data-valor');
      if (!campo || !valor) return;

      respostasAtuais[campo] = valor;

      // Atualizar classes ativas no mesmo grupo
      const parentStep = tile.closest('.diag-step-card');
      if (parentStep) {
        parentStep.querySelectorAll('.diag-choice-tile').forEach(t => t.classList.remove('ativo'));
        tile.classList.add('ativo');
      }

      renderizarPreview();
    });
  });

  renderizarPreview();

  // Salvar diagnóstico
  $('btn-salvar-diagnostico').onclick = () => {
    const resFinal = calcularDiagnosticoPontoPartida(respostasAtuais);

    state.perfil.nivel = resFinal.nivelKey;
    state.perfil.nivelLabel = resFinal.nivelLabel;
    state.perfil.diagnostico = {
      respostas: { ...respostasAtuais },
      scores: resFinal.scores,
      scoreGeral: resFinal.scoreGeral,
      data: (typeof window !== 'undefined' && window.obterDataLocal) ? window.obterDataLocal() : obterDataLocal()
    };
    state.perfil.pontoPartida = {
      atividadeId: resFinal.atividadeId,
      atividadeTitulo: resFinal.atividadeTitulo,
      nivelExercicio: resFinal.nivelExercicio,
      moduloId: resFinal.moduloId,
      moduloNome: resFinal.moduloNome,
      aulaId: resFinal.aulaId,
      aulaTitulo: resFinal.aulaTitulo,
      gargalo: resFinal.gargalo,
      justificativa: resFinal.justificativa
    };

    // Configura a atividade e nível atuais para o ponto diagnosticado
    state.atividadeAtualId = resFinal.atividadeId;
    state.nivelExercicioAtual = resFinal.nivelExercicio;

    if (state.sessao && !state.sessao.ativa) {
      state.sessao.atividadeId = resFinal.atividadeId;
      state.sessao.nivel = resFinal.nivelExercicio;
      state.sessao.passoAtualIndex = 0;
    }

    salvarEstado();
    dialog.close();
    renderizarTelaHoje();

    if (typeof mostrarToastAtalho === 'function') {
      mostrarToastAtalho(`✓ Ponto de partida definido: ${resFinal.nivelLabel}`);
    }
  };

  const btnFechar = $('btn-fechar-diagnostico');
  if (btnFechar) btnFechar.onclick = () => dialog.close();

  const btnCancelar = $('btn-cancelar-diagnostico');
  if (btnCancelar) btnCancelar.onclick = () => dialog.close();

  dialog.showModal();
}
