
// Variáveis Globais
var state = {
  versao: 2,
  perfil: {
    nivel: 'basico',
    estilo: 'nylon_geral',
    meta: 'MPB / Solo e Acompanhamento',
    dataCriacao: obterDataLocal ? obterDataLocal() : '2026-09-13'
  },
  atividadeAtualId: 'ativ-1',
  nivelExercicioAtual: 'alvo',
  sessao: {
    id: 'sessao-inicial',
    atividadeId: 'ativ-1',
    nivel: 'alvo',
    passoIndex: 0,
    elapsedMs: 0,
    totalMs: 2400000,
    ativa: false,
    ultimoTimestamp: null,
    intervalId: null
  },
  tentativas: [],
  dificuldades: [],
  revisoes: [],
  habilidades: {},
  legado: { assistidos: [], praticados: [], notas: {} }
};

var isStorageDisponivel = true;
const STORAGE_KEY_V2 = 'metodo_triade_v2';
const STORAGE_KEY_V1 = 'metodo_triade_geral_v1';


function storageGet(k) {
    try {
      return window.localStorage ? window.localStorage.getItem(k) : null;
    } catch (e) {
      isStorageDisponivel = false;
      return null;
    }
  }

function storageSet(k, v) {
    try {
      if (!window.localStorage) return false;
      window.localStorage.setItem(k, v);
      return true;
    } catch (e) {
      isStorageDisponivel = false;
      return false;
    }
  }

function salvarEstado() {
    // Consolida elapsedMs ativo ANTES de serializar para não perder tempo em andamento (P1-3)
    let elapsedParaSalvar = state.sessao.elapsedMs;
    if (state.sessao.ativa && state.sessao.ultimoTimestamp) {
      elapsedParaSalvar = Math.min(
        state.sessao.totalMs,
        state.sessao.elapsedMs + (Date.now() - state.sessao.ultimoTimestamp)
      );
    }

    const estadoSerializar = {
      ...state,
      sessao: {
        id: state.sessao.id,
        atividadeId: state.sessao.atividadeId,
        nivel: state.sessao.nivel,
        passoIndex: state.sessao.passoIndex,
        elapsedMs: elapsedParaSalvar,
        totalMs: state.sessao.totalMs,
        ativa: false, // sempre salva pausada
        ultimoTimestamp: null
      }
    };
    const serialized = JSON.stringify(estadoSerializar);
    const ok = storageSet(STORAGE_KEY_V2, serialized);
    if (!ok) {
      isStorageDisponivel = false;
      exibirAvisoArmazenamento();
    }
  }

function exibirAvisoArmazenamento() {
    const notice = $('aviso-armazenamento');
    if (notice) {
      notice.style.display = 'block';
      notice.textContent = 'Armazenamento local indisponível ou bloqueado neste navegador. O ambiente funciona normalmente na memória desta sessão; utilize a exportação manual de backup para guardar seu progresso.';
    }
  }

function validarEsquemaBackup(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('Arquivo vazio ou formato JSON raiz inválido.');
    }

    // Regex para data local YYYY-MM-DD
    const RE_DATA = /^\d{4}-\d{2}-\d{2}$/;
    const HABILIDADES_STATUS_VALIDOS = new Set(['em_pratica', 'alvo_demonstrado']);
    const CICLOS_VALIDOS = new Set([1, 2, 3]);

    // Suporte a backup v1 legado
    if ((obj.versao === 1 || obj.versao_backup === 1) && Array.isArray(obj.assistidos)) {
      if (!Array.isArray(obj.praticados) || typeof obj.notas !== 'object' || Array.isArray(obj.notas) || obj.notas === null) {
        throw new Error('Formato de backup legado v1 inválido.');
      }
      return {
        tipo: 'v1',
        dados: {
          assistidos: obj.assistidos.filter(x => typeof x === 'string' && x.length > 0),
          praticados: obj.praticados.filter(x => typeof x === 'string' && x.length > 0),
          notas: Object.fromEntries(Object.entries(obj.notas).filter(([k, v]) => typeof k === 'string' && typeof v === 'string'))
        }
      };
    }

    // Validação estrita do backup v2
    if (obj.versao === 2) {
      if (!ATIVIDADES_VALIDAS_IDS.has(obj.atividadeAtualId)) {
        throw new Error(`Atividade atual inválida ou desconhecida: "${obj.atividadeAtualId}".`);
      }
      if (!NIVEIS_VALIDOS.has(obj.nivelExercicioAtual)) {
        throw new Error(`Nível de exercício inválido: "${obj.nivelExercicioAtual}".`);
      }

      // Validação de Dificuldades
      if (!Array.isArray(obj.dificuldades)) throw new Error('Campo "dificuldades" deve ser uma lista.');
      const difIds = new Set();
      for (const d of obj.dificuldades) {
        if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('Registro de dificuldade nulo ou inválido.');
        if (typeof d.id !== 'string' || !d.id) throw new Error('ID de dificuldade ausente.');
        if (difIds.has(d.id)) throw new Error(`ID de dificuldade duplicado: ${d.id}`);
        difIds.add(d.id);
        if (!ATIVIDADES_VALIDAS_IDS.has(d.atividadeId)) throw new Error(`Atividade inválida na dificuldade: ${d.atividadeId}`);
        if (typeof d.trecho !== 'string' || typeof d.problema !== 'string') throw new Error('Texto da dificuldade inválido.');
        if (typeof d.resolvida !== 'boolean') throw new Error('Status booleano da dificuldade inválido.');
        if (d.data && !RE_DATA.test(d.data)) throw new Error(`Data de dificuldade inválida: ${d.data}`);
      }

      // Validação de RevisÁµes
      if (!Array.isArray(obj.revisoes)) throw new Error('Campo "revisoes" deve ser uma lista.');
      const revIds = new Set();
      for (const r of obj.revisoes) {
        if (!r || typeof r !== 'object' || Array.isArray(r)) throw new Error('Registro de revisão nulo ou inválido.');
        if (typeof r.id !== 'string' || !r.id) throw new Error('ID de revisão ausente.');
        if (revIds.has(r.id)) throw new Error(`ID de revisão duplicado: ${r.id}`);
        revIds.add(r.id);
        if (!ATIVIDADES_VALIDAS_IDS.has(r.atividadeId)) throw new Error(`Atividade inválida na revisão: ${r.atividadeId}`);
        if (typeof r.intervaloDias !== 'number' || !Number.isFinite(r.intervaloDias) || ![2, 7, 21].includes(r.intervaloDias)) {
          throw new Error(`Intervalo de revisão inválido: ${r.intervaloDias}`);
        }
        if (typeof r.concluida !== 'boolean') throw new Error('Status booleano de conclusão de revisão inválido.');
        if (r.ciclo !== undefined) {
          if (typeof r.ciclo !== 'number' || !Number.isInteger(r.ciclo) || r.ciclo < 1 || r.ciclo > 999) {
            throw new Error(`Ciclo de revisão inválido: ${r.ciclo}`);
          }
        }
        if (r.dataPrevista !== undefined) {
          if (typeof r.dataPrevista !== 'string' || !RE_DATA.test(r.dataPrevista)) {
            throw new Error(`Data prevista de revisão inválida: ${r.dataPrevista}`);
          }
        }
      }

      // Validação de Tentativas
      if (!Array.isArray(obj.tentativas)) throw new Error('Campo "tentativas" deve ser uma lista.');
      const tentIds = new Set();
      for (const t of obj.tentativas) {
        if (!t || typeof t !== 'object' || Array.isArray(t)) throw new Error('Registro de tentativa nulo ou inválido.');
        if (typeof t.id !== 'string' || !t.id) throw new Error('ID de tentativa ausente.');
        if (tentIds.has(t.id)) throw new Error(`ID de tentativa duplicado: ${t.id}`);
        tentIds.add(t.id);
        if (!ATIVIDADES_VALIDAS_IDS.has(t.atividadeId)) throw new Error(`Atividade inválida na tentativa: ${t.atividadeId}`);
        if (!NIVEIS_VALIDOS.has(t.nivel)) throw new Error(`Nível inválido na tentativa: ${t.nivel}`);
        if (!['consegui', 'repetir', 'dificuldade'].includes(t.status)) throw new Error(`Status de tentativa inválido: ${t.status}`);
        if (typeof t.bpm !== 'number' || !Number.isFinite(t.bpm) || t.bpm < 0 || t.bpm > 300) {
          throw new Error(`BPM inválido na tentativa: ${t.bpm}`);
        }
        if (t.data && !RE_DATA.test(t.data)) throw new Error(`Data de tentativa inválida: ${t.data}`);
      }

      // Validação de Habilidades (se fornecidas)
      if (obj.habilidades !== undefined) {
        if (typeof obj.habilidades !== 'object' || Array.isArray(obj.habilidades) || obj.habilidades === null) {
          throw new Error('Campo "habilidades" deve ser um objeto.');
        }
        for (const [slug, hab] of Object.entries(obj.habilidades)) {
          if (!hab || typeof hab !== 'object') throw new Error(`Habilidade inválida para slug: ${slug}`);
          if (!HABILIDADES_STATUS_VALIDOS.has(hab.status)) throw new Error(`Status de habilidade inválido: ${hab.status}`);
        }
      }

      // Validação de Legado (se fornecido)
      let legadoValidado = { assistidos: [], praticados: [], notas: {} };
      if (obj.legado) {
        if (typeof obj.legado !== 'object' || Array.isArray(obj.legado) || obj.legado === null) {
          throw new Error('Campo "legado" deve ser um objeto.');
        }
        if (!Array.isArray(obj.legado.assistidos)) throw new Error('Campo "legado.assistidos" deve ser uma lista.');
        if (!Array.isArray(obj.legado.praticados)) throw new Error('Campo "legado.praticados" deve ser uma lista.');
        if (typeof obj.legado.notas !== 'object' || Array.isArray(obj.legado.notas) || obj.legado.notas === null) {
          throw new Error('Campo "legado.notas" deve ser um mapa de anotaçÁµes.');
        }
        legadoValidado = {
          assistidos: obj.legado.assistidos.filter(x => typeof x === 'string' && x.length > 0),
          praticados: obj.legado.praticados.filter(x => typeof x === 'string' && x.length > 0),
          notas: Object.fromEntries(Object.entries(obj.legado.notas).filter(([k, v]) => typeof k === 'string' && typeof v === 'string'))
        };
      }

      // Validação de Sessão (se fornecida)
      let sessaoValidada = { ...state.sessao };
      if (obj.sessao) {
        if (typeof obj.sessao !== 'object' || Array.isArray(obj.sessao) || obj.sessao === null) {
          throw new Error('Campo "sessao" deve ser um objeto.');
        }
        if (obj.sessao.atividadeId && !ATIVIDADES_VALIDAS_IDS.has(obj.sessao.atividadeId)) {
          throw new Error(`Atividade inválida na sessão: ${obj.sessao.atividadeId}`);
        }
        if (obj.sessao.nivel && !NIVEIS_VALIDOS.has(obj.sessao.nivel)) {
          throw new Error(`Nível inválido na sessão: ${obj.sessao.nivel}`);
        }
        if (obj.sessao.elapsedMs !== undefined) {
          if (typeof obj.sessao.elapsedMs !== 'number' || !Number.isFinite(obj.sessao.elapsedMs) ||
              obj.sessao.elapsedMs < 0 || obj.sessao.elapsedMs > 2400000) {
            throw new Error(`elapsedMs inválido na sessão: ${obj.sessao.elapsedMs}`);
          }
        }
        if (obj.sessao.passoIndex !== undefined) {
          if (typeof obj.sessao.passoIndex !== 'number' || !Number.isInteger(obj.sessao.passoIndex) ||
              obj.sessao.passoIndex < 0 || obj.sessao.passoIndex > 5) {
            throw new Error(`passoIndex inválido na sessão: ${obj.sessao.passoIndex}`);
          }
        }
        sessaoValidada = {
          id: typeof obj.sessao.id === 'string' ? obj.sessao.id : 'sessao-restaurada',
          atividadeId: obj.sessao.atividadeId || state.sessao.atividadeId,
          nivel: obj.sessao.nivel || state.sessao.nivel,
          passoIndex: obj.sessao.passoIndex !== undefined ? obj.sessao.passoIndex : 0,
          elapsedMs: obj.sessao.elapsedMs !== undefined ? obj.sessao.elapsedMs : 0,
          totalMs: 2400000,
          ativa: false,
          ultimoTimestamp: null,
          intervalId: null
        };
      }

      return {
        tipo: 'v2',
        dados: {
          versao: 2,
          perfil: (obj.perfil && typeof obj.perfil === 'object') ? obj.perfil : state.perfil,
          atividadeAtualId: obj.atividadeAtualId,
          nivelExercicioAtual: obj.nivelExercicioAtual,
          sessao: sessaoValidada,
          tentativas: obj.tentativas,
          dificuldades: obj.dificuldades,
          revisoes: obj.revisoes,
          habilidades: (obj.habilidades && typeof obj.habilidades === 'object') ? obj.habilidades : {},
          legado: legadoValidado
        }
      };
    }

    throw new Error('Versão de backup não suportada ou formato incompatível.');
  }

function carregarEstadoInicial() {
    const rawV2 = storageGet(STORAGE_KEY_V2);
    if (rawV2) {
      try {
        const parsed = JSON.parse(rawV2);
        const valid = validarEsquemaBackup(parsed);
        if (valid.tipo === 'v2') {
          state = { ...state, ...valid.dados };
          // Sessão restaurada do storage sempre inicia pausada
          state.sessao.ativa = false;
          state.sessao.ultimoTimestamp = null;
          state.sessao.intervalId = null;
        }
      } catch (e) {
        console.warn('Falha ao restaurar estado v2:', e.message);
      }
    }

    // NOTA: NUNCA importar automaticamente a chave v1. A importação de legado agora é explícita.
    if (!storageSet('__storage_test__', '1')) {
      isStorageDisponivel = false;
      exibirAvisoArmazenamento();
    } else {
      try { window.localStorage.removeItem('__storage_test__'); } catch (e) {}
    }
  }

function exportarBackupJSON() {
    const backupData = {
      versao: 2,
      exportadoEm: new Date().toISOString(),
      perfil: state.perfil,
      atividadeAtualId: state.atividadeAtualId,
      nivelExercicioAtual: state.nivelExercicioAtual,
      sessao: {
        id: state.sessao.id,
        atividadeId: state.sessao.atividadeId,
        nivel: state.sessao.nivel,
        passoIndex: state.sessao.passoIndex,
        elapsedMs: state.sessao.elapsedMs,
        totalMs: state.sessao.totalMs,
        ativa: false
      },
      tentativas: state.tentativas,
      dificuldades: state.dificuldades,
      revisoes: state.revisoes,
      habilidades: state.habilidades,
      legado: state.legado
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metodo-triade-v2-backup-${obterDataLocal()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

async function importarLegadoV1Explicito() {
    const rawV1 = storageGet(STORAGE_KEY_V1);
    if (!rawV1) {
      await mostrarAlerta('Nenhum dado legado encontrado no navegador sob a chave metodo_triade_geral_v1.');
      return;
    }
    try {
      const parsed = JSON.parse(rawV1);
      const valid = validarEsquemaBackup(parsed);
      if (valid.tipo === 'v1') {
        state.legado.assistidos = [...new Set([...state.legado.assistidos, ...valid.dados.assistidos])];
        state.legado.praticados = [...new Set([...state.legado.praticados, ...valid.dados.praticados])];
        state.legado.notas = { ...valid.dados.notas, ...state.legado.notas };
        salvarEstado();
        await mostrarAlerta(`Dados v1 importados: ${valid.dados.assistidos.length} aulas assistidas e ${valid.dados.praticados.length} praticadas.`);
        renderizarTelaProgresso();
      }
    } catch (e) {
      await mostrarAlerta('Falha ao processar dados legados v1: ' + e.message);
    }
  }

async function processarArquivoBackup(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const valid = validarEsquemaBackup(parsed);

      if (valid.tipo === 'v1') {
        // Legado v1: merge apenas de assistidos/praticados/notas (local ganha em conflito de notas)
        state.legado.assistidos = [...new Set([...state.legado.assistidos, ...valid.dados.assistidos])];
        state.legado.praticados = [...new Set([...state.legado.praticados, ...valid.dados.praticados])];
        // P1-7: notas locais têm prioridade; arquivo não sobrescreve notas existentes
        state.legado.notas = { ...valid.dados.notas, ...state.legado.notas };
        salvarEstado();
        const msgEl = $('msg-backup-status');
        if (msgEl) msgEl.textContent = `Backup v1 mesclado: ${valid.dados.assistidos.length} aulas assistidas, ${valid.dados.praticados.length} praticadas.`;
      } else if (valid.tipo === 'v2') {
        // P1-7 & P1-8: Calcular resumo antes de aplicar
        const d = valid.dados;

        // Deduplica por ID â€” local e importado, sem sobrescrever
        const difsMap = new Map();
        state.dificuldades.forEach(x => difsMap.set(x.id, x)); // local tem prioridade
        d.dificuldades.forEach(x => { if (!difsMap.has(x.id)) difsMap.set(x.id, x); });

        const tentsMap = new Map();
        state.tentativas.forEach(x => tentsMap.set(x.id, x));
        d.tentativas.forEach(x => { if (!tentsMap.has(x.id)) tentsMap.set(x.id, x); });

        const revsMap = new Map();
        state.revisoes.forEach(x => revsMap.set(x.id, x));
        // P1-8: não reabrir revisão já concluída localmente
        d.revisoes.forEach(x => {
          if (!revsMap.has(x.id)) {
            revsMap.set(x.id, x);
          } else {
            const local = revsMap.get(x.id);
            // Se local está concluída, mantém conclusão independente do arquivo
            if (!local.concluida) revsMap.set(x.id, x);
          }
        });

        // Resumo das diferenças
        const novasTentativas = d.tentativas.filter(x => !state.tentativas.find(t => t.id === x.id)).length;
        const novasDifs = d.dificuldades.filter(x => !state.dificuldades.find(t => t.id === x.id)).length;
        const novasRevs = d.revisoes.filter(x => !state.revisoes.find(t => t.id === x.id)).length;

        const confirmar = await mostrarConfirmacao(
          `Resumo do backup:\n` +
          `â€¢ ${novasTentativas} tentativas novas (as existentes são preservadas)\n` +
          `â€¢ ${novasDifs} dificuldades novas\n` +
          `â€¢ ${novasRevs} revisÁµes novas\n\n` +
          `Notas locais têm prioridade. RevisÁµes já concluídas não serão reabertas.\n` +
          `Deseja aplicar?`
        );

        if (confirmar) {
          // P1-8: sessão ativa local não é substituída
          const sessaoFinal = (state.sessao.elapsedMs > 0 && !d.sessao.elapsedMs)
            ? state.sessao
            : d.sessao || state.sessao;

          state = {
            ...state,
            atividadeAtualId: d.atividadeAtualId,
            nivelExercicioAtual: d.nivelExercicioAtual,
            sessao: sessaoFinal,
            dificuldades: Array.from(difsMap.values()),
            tentativas: Array.from(tentsMap.values()),
            revisoes: Array.from(revsMap.values()),
            habilidades: { ...d.habilidades, ...state.habilidades }, // local ganha habilidades
            legado: {
              assistidos: [...new Set([...state.legado.assistidos, ...d.legado.assistidos])],
              praticados: [...new Set([...state.legado.praticados, ...d.legado.praticados])],
              notas: { ...d.legado.notas, ...state.legado.notas } // local ganha notas
            }
          };

          salvarEstado();
          const msgEl = $('msg-backup-status');
          if (msgEl) msgEl.textContent = `Backup v2 mesclado â€” ${novasTentativas} tentativas, ${novasDifs} dificuldades e ${novasRevs} revisÁµes adicionadas.`;
          renderizarTelaProgresso();
        }
      }
    } catch (err) {
      await mostrarAlerta('Backup não aplicado: ' + err.message);
      // P1-8: estado anterior é preservado em caso de erro
    }
    // Limpar input para permitir reimport idempotente
    if (event.target) event.target.value = '';
  }