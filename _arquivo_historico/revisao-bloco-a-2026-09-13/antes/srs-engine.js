

function obterRecomendacao() {
    // ativEscolhida declarada no escopo externo para estar acessível em todos os caminhos de retorno (P1-1)
    let ativEscolhida = state.atividadeAtualId
      ? atividadesDados.find(a => a.id === state.atividadeAtualId)
      : null;

    // 1. Sessão pausada com tempo decorrido â€” prioridade máxima (P1-4)
    if (state.sessao && state.sessao.elapsedMs > 0 && state.sessao.elapsedMs < state.sessao.totalMs) {
      const ativ = atividadesDados.find(a => a.id === state.sessao.atividadeId) || atividadesDados[0];
      const minEstudados = Math.floor(state.sessao.elapsedMs / 60000);
      return {
        atividade: ativ,
        motivo: `Sessão pausada: você já estudou ${minEstudados} minutos. Retome para concluir seus 40 minutos.`
      };
    }

    // 2. Recuperação: dificuldade pendente não resolvida no Caderno
    const difPendente = state.dificuldades.find(d => !d.resolvida);
    if (difPendente) {
      const ativ = atividadesDados.find(a => a.id === difPendente.atividadeId) || atividadesDados[0];
      return {
        atividade: ativ,
        motivo: `Sugerida para recuperação: você marcou dificuldade em "${escapeHTML(difPendente.trecho)}". Pratique com a versão de Preparação.`
      };
    }

    // 3. Revisão espaçada prevista para hoje ou vencida
    const hojeStr = obterDataLocal();
    const revPendente = state.revisoes.find(r => !r.concluida && r.dataPrevista <= hojeStr);
    if (revPendente) {
      const ativ = atividadesDados.find(a => a.id === revPendente.atividadeId) || atividadesDados[0];
      return {
        atividade: ativ,
        motivo: `Revisão agendada (ciclo ${revPendente.ciclo} Â· intervalo de ${revPendente.intervaloDias} dias) para consolidar a memória motora.`
      };
    }

    // 4. Escolha explícita do aluno (diagnóstico ou seleção manual), se alvo não demonstrado
    if (ativEscolhida) {
      const hab = state.habilidades[ativEscolhida.slug];
      if (!hab || hab.status !== 'alvo_demonstrado') {
        return {
          atividade: ativEscolhida,
          motivo: `Recomendação prioritária baseada no seu diagnóstico/planejamento de estudo.`
        };
      }
    }

    // 5. Próxima atividade da sequência com alvo não demonstrado
    for (const ativ of atividadesDados) {
      const hab = state.habilidades[ativ.slug];
      if (!hab || hab.status !== 'alvo_demonstrado') {
        return {
          atividade: ativ,
          motivo: `Próxima atividade da sequência de fundamentos (alvo ainda não demonstrado).`
        };
      }
    }

    // 6. Manutenção: todas demonstradas â€” ativEscolhida acessível aqui (P1-1)
    const atual = ativEscolhida || atividadesDados[0];
    return {
      atividade: atual,
      motivo: `Manutenção contínua de técnica e repertório de violão.`
    };
  }

function trocarAtividade(novaId) {
    if (state.atividadeAtualId === novaId) return;

    // Registra tentativa interrompida se havia progresso
    if (state.sessao && state.sessao.elapsedMs > 0 && state.sessao.atividadeId !== novaId) {
      if (state.sessao.ativa) {
        if (state.sessao.ultimoTimestamp) {
          state.sessao.elapsedMs = Math.min(
            state.sessao.totalMs,
            state.sessao.elapsedMs + (Date.now() - state.sessao.ultimoTimestamp)
          );
        }
        state.sessao.ativa = false;
        if (timerWorker) timerWorker.postMessage('stop');
        if (state.sessao.intervalId) {
          clearInterval(state.sessao.intervalId);
          state.sessao.intervalId = null;
        }
      }
      state.tentativas.push({
        id: 'tent-' + Date.now(),
        data: obterDataLocal(),
        atividadeId: state.sessao.atividadeId,
        nivel: state.sessao.nivel || state.nivelExercicioAtual,
        status: 'interrompida',
        bpm: 0,
        observacoes: `Sessão interrompida aos ${Math.floor(state.sessao.elapsedMs / 60000)} min para troca.`
      });
    }

    state.atividadeAtualId = novaId;
    state.sessao = {
      id: 'sessao-' + Date.now(),
      atividadeId: novaId,
      nivel: 'preparacao',
      passoIndex: 0,
      elapsedMs: 0,
      totalMs: 2400000,
      ativa: false,
      intervalId: null,
      ultimoTimestamp: null
    };
    salvarEstado();
  }

function abrirModalResultado(ativ) {
    const dialog = $('modal-resultado');
    if (!dialog) return;

    const nivelAtual = state.nivelExercicioAtual || 'alvo';
    const nivelObj = ativ.exercicio.niveis[nivelAtual];

    // P1-5: Mostrar critério de saída verificável por nível no modal
    const criterioTexto = nivelAtual === 'preparacao'
      ? `Critério (Preparação): registra progresso parcial; não aprova o Alvo principal.`
      : nivelAtual === 'variacao'
      ? `Critério (Variação): opcional; não afeta revisão espaçada do Alvo.`
      : `Critério (Alvo): ${escapeHTML(ativ.criterioSaida)}`;

    $('res-atividade-nome').textContent = `${ativ.titulo} â€” [${nivelObj.nome}]`;
    $('input-res-bpm').value = nivelObj.bpm || 0;
    $('input-res-obs').value = '';

    // Gerar checklist dos critérios de saída do nível atual
    const criterioTextoRaw = ativ.niveis?.[nivelAtual]?.criterioSaida || ativ.criterioSaida || '';
    const criteriosHTML = criterioTextoRaw.split(';').filter(c => c.trim()).map((c, i) =>
      `<label class="criterio-item" style="display:flex;gap:8px;padding:4px 0">
        <input type="checkbox" class="criterio-check" id="crit-${i}">
        <span>${escapeHTML(c.trim())}</span>
      </label>`
    ).join('');

    // Inserir no corpo do modal (antes do select de status)
    let divCriterio = dialog.querySelector('#div-criterio-modal');
    if (!divCriterio) {
      divCriterio = document.createElement('div');
      divCriterio.id = 'div-criterio-modal';
      divCriterio.style.cssText = 'background:var(--accent-light);border-left:3px solid var(--accent);padding:10px 14px;border-radius:4px;font-size:0.85rem;margin-bottom:12px;color:var(--accent);';
      const selectEl = dialog.querySelector('#select-res-status');
      if (selectEl && selectEl.parentNode) selectEl.parentNode.insertBefore(divCriterio, selectEl);
    }
    divCriterio.innerHTML = criteriosHTML 
      ? `<strong>Critérios de saída â€” confirme antes de registrar sucesso:</strong>${criteriosHTML}` 
      : escapeHTML(criterioTexto);

    $('btn-salvar-resultado').onclick = async () => {
      const statusDesempenho = $('select-res-status').value;
      const bpm = Number($('input-res-bpm').value) || 0;
      const compassos = Number($('res-compassos')?.value) || 0;
      const tentativas = Number($('res-tentativas')?.value) || 0;
      const chkPulso = $('chk-pulso')?.checked || false;
      const chkNotas = $('chk-notas')?.checked || false;
      const chkEnc = $('chk-encerramento')?.checked || false;
      const obs = ($('input-res-obs').value || '').trim();

      if (statusDesempenho === 'consegui' && criteriosHTML) {
        const checkboxes = dialog.querySelectorAll('.criterio-check');
        const todosChecados = checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked);
        if (!todosChecados) {
          await mostrarAlerta('Confirme todos os critérios de saída antes de registrar sucesso.');
          return;
        }
      }

      // Registro da tentativa com ID estÃ¡vel
      state.tentativas.push({
        id: 'tent-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        data: obterDataLocal(),
        atividadeId: ativ.id,
        nivel: nivelAtual,
        status: statusDesempenho,
        bpm: bpm,
        compassosSemErro: compassos,
        tentativasAteAcertar: tentativas,
        checklistExecutado: { pulso: chkPulso, notas: chkNotas, encerramento: chkEnc },
        observacoes: obs
      });

      // P1-2: LÁ“GICA RIGOROSA â€” Preparação/Variação NUNCA aprovam o Alvo nem afetam revisão
      if (nivelAtual === 'alvo' && statusDesempenho === 'consegui') {
        state.habilidades[ativ.slug] = {
          status: 'alvo_demonstrado',
          data: obterDataLocal()
        };
      } else if (nivelAtual === 'preparacao' && statusDesempenho === 'consegui') {
        // Progresso parcial sem aprovar o objetivo alvo
        if (!state.habilidades[ativ.slug] || state.habilidades[ativ.slug].status !== 'alvo_demonstrado') {
          state.habilidades[ativ.slug] = {
            status: 'em_pratica',
            data: obterDataLocal()
          };
        }
        // P1-2: Preparação NÁƒO toca na agenda de revisão â€” encerrar aqui
        salvarEstado();
        dialog.close();
        navegarPara('progresso');
        return;
      } else if (nivelAtual === 'variacao') {
        // P1-2: Variação é opcional, NÁƒO toca na agenda de revisão â€” encerrar aqui
        salvarEstado();
        dialog.close();
        navegarPara('progresso');
        return;
      }

      // P1-2: AGENDA DE REVISÁƒO â€” apenas para resultado do nível Alvo
      // Verifica se existe revisão pendente para concluir
      const revIndex = state.revisoes.findIndex(r => r.atividadeId === ativ.id && !r.concluida);
      let cicloAnterior = 0;
      let intervaloAnterior = 0;

      if (revIndex !== -1) {
        const rev = state.revisoes[revIndex];
        const hojeStr = obterDataLocal();
        if (rev.dataPrevista <= hojeStr) {
          cicloAnterior = rev.ciclo;
          intervaloAnterior = rev.intervaloDias;
          rev.concluida = true;
          rev.dataConclusao = hojeStr;
        } else {
          // Prática antecipada
          if (!rev.tentativasAntecipadas) rev.tentativasAntecipadas = [];
          rev.tentativasAntecipadas.push({ data: hojeStr, status: statusDesempenho });
          
          if (statusDesempenho === 'consegui') {
            // Se conseguiu na antecipada, apenas registra e encerra
            salvarEstado();
            dialog.close();
            navegarPara('progresso');
            return;
          } else {
            // Se falhou na antecipada, cancela a revisão futura e agenda recuperação
            rev.concluida = true;
            rev.dataConclusao = hojeStr;
            cicloAnterior = rev.ciclo;
            intervaloAnterior = rev.intervaloDias;
          }
        }
      }

      if (statusDesempenho === 'consegui') {
        // Avança no ciclo: 2 â†’ 7 â†’ 21 â†’ 21
        let proximoIntervalo = 2;
        let novoCiclo = 1;

        if (intervaloAnterior === 2) {
          proximoIntervalo = 7;
          novoCiclo = 2;
        } else if (intervaloAnterior === 7) {
          proximoIntervalo = 21;
          novoCiclo = 3;
        } else if (intervaloAnterior === 21) {
          proximoIntervalo = 21;
          novoCiclo = cicloAnterior + 1;
        }

        state.revisoes.push({
          id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          atividadeId: ativ.id,
          ciclo: novoCiclo,
          intervaloDias: proximoIntervalo,
          dataPrevista: obterDataLocal(proximoIntervalo),
          concluida: false
        });
      } else if (statusDesempenho === 'repetir' || statusDesempenho === 'dificuldade') {
        // Reprograma revisão de recuperação de 2 dias sem duplicar pendências
        state.revisoes.push({
          id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          atividadeId: ativ.id,
          ciclo: Math.max(1, cicloAnterior),
          intervaloDias: 2,
          dataPrevista: obterDataLocal(2),
          concluida: false
        });
      }

      salvarEstado();
      dialog.close();
      navegarPara('progresso');
    };

    $('btn-fechar-resultado').onclick = () => dialog.close();
    dialog.showModal();
  }

function abrirModalDificuldade(ativ) {
    const dialog = $('modal-dificuldade');
    if (!dialog) return;

    $('dif-atividade-nome').textContent = ativ.titulo;
    $('input-dif-trecho').value = ativ.exercicio.niveis[state.nivelExercicioAtual || 'alvo'].nome;
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
        atividadeId: ativ.id,
        trecho: trecho,
        problema: problema,
        data: obterDataLocal(),
        resolvida: false
      });

      salvarEstado();
      dialog.close();
      await mostrarAlerta('Dificuldade registrada no seu Caderno. Você pode revisá-la com o roteiro de recuperação.');
    };

    $('btn-fechar-dificuldade').onclick = () => dialog.close();
    dialog.showModal();
  }

function abrirModalDiagnostico() {
    const dialog = $('modal-diagnostico');
    if (!dialog) return;

    $('corpo-diagnostico').innerHTML = `
      <p>Ajuste seu ponto de partida pedagógico. Suas respostas definem a recomendação prioritária sem atribuir conclusÁµes fictícias ao catálogo.</p>
      
      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 12px;">
        <div>
          <label><strong>1. Rítmica e Pulso:</strong></label>
          <select id="diag-ritmo" style="width: 100%; padding: 8px; margin-top: 4px;">
            <option value="iniciante">Iniciante: sinto dificuldade em manter o tempo ou nunca usei metrÁ´nomo</option>
            <option value="basico">Básico: mantenho pulso estável em 4/4 com subdivisão em colcheias</option>
          </select>
        </div>

        <div>
          <label><strong>2. Troca de Acordes:</strong></label>
          <select id="diag-acordes" style="width: 100%; padding: 8px; margin-top: 4px;">
            <option value="iniciante">Iniciante: movo um dedo por vez e pauso a batida na troca</option>
            <option value="basico">Básico: troco acordes fundamentais em bloco sem parar o ritmo</option>
          </select>
        </div>

        <div>
          <label><strong>3. Percepção Auditiva de Intervalos:</strong></label>
          <select id="diag-ouvido" style="width: 100%; padding: 8px; margin-top: 4px;">
            <option value="iniciante">Iniciante: não identifico intervalos de ouvido</option>
            <option value="intermediario">Intermediário inicial: distingo terça maior, quarta e quinta justa</option>
          </select>
        </div>
      </div>
    `;

    $('btn-salvar-diagnostico').onclick = () => {
      const nivelRitmo = $('diag-ritmo').value;
      const nivelAcordes = $('diag-acordes').value;
      const nivelOuvido = $('diag-ouvido').value;

      state.perfil.diagnostico = {
        ritmo: nivelRitmo,
        acordes: nivelAcordes,
        ouvido: nivelOuvido,
        data: obterDataLocal()
      };

      if (nivelRitmo === 'iniciante') {
        state.perfil.nivel = 'basico';
        trocarAtividade('ativ-1');
      } else if (nivelAcordes === 'iniciante') {
        state.perfil.nivel = 'basico';
        trocarAtividade('ativ-2');
      } else if (nivelOuvido === 'intermediario') {
        state.perfil.nivel = 'intermediario';
        trocarAtividade('ativ-4');
      } else {
        state.perfil.nivel = 'basico';
        trocarAtividade('ativ-3');
      }

      
      dialog.close();
      renderizarTelaHoje();
    };

    $('btn-fechar-diagnostico').onclick = () => dialog.close();
    dialog.showModal();
  }