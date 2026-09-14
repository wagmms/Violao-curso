/**
 * nucleo-regras.js — Módulo Compartilhado de Regras de Negócio, Backup e Avaliação
 * 
 * Compatível tanto com browsers (scripts clássicos via window.CursoRegras)
 * quanto com Node.js (via require / module.exports) sem nenhuma dependência externa.
 */

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.CursoRegras = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // IDs conhecidos e válidos para integridade referencial
  const UNIDADES_VALIDAS = new Set([
    "u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8", "u9", "u10", "u11", "u12"
  ]);

  const SESSOES_VALIDAS = new Set();
  for (let u = 1; u <= 12; u++) {
    for (const letra of ["a", "b", "c", "d"]) {
      SESSOES_VALIDAS.add(`sess-${u}${letra}`);
    }
  }

  const VERSOES_EXERCICIO_VALIDAS = new Set([
    "u1-ex1", "u1-ex2", "u1-ex3", "u1-estudo",
    "ex1", "ex1-s", "ex2", "ex2-s", "ex3", "ex3-s",
    "ex4", "ex4-s", "ex5", "ex5-s", "ex6", "ex6-s"
  ]);

  // 1. UTILITÁRIOS DE SEGURANÇA E ESCAPE
  function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isSafeUrl(url) {
    if (!url || typeof url !== "string") return false;
    const clean = url.trim().toLowerCase();
    return clean.startsWith("https://drive.google.com/") || clean.startsWith("https://");
  }

  function parseLinksSeguros(texto) {
    if (typeof texto !== "string") return [];
    const tokens = [];
    // Regex para capturar [label](url) OU URLs soltas http(s)://...
    const regexLinks = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)|(https?:\/\/[^\s\)]+)/g;
    let lastIndex = 0;
    let match;

    while ((match = regexLinks.exec(texto)) !== null) {
      if (match.index > lastIndex) {
        const textChunk = texto.substring(lastIndex, match.index);
        tokens.push({
          tipo: "texto",
          conteudo: textChunk,
          valor: textChunk
        });
      }

      const isMarkdown = Boolean(match[1] && match[2]);
      const label = isMarkdown ? match[1] : match[3];
      const url = isMarkdown ? match[2] : match[3];

      tokens.push({
        tipo: "link",
        label: label,
        valor: label,
        url: url,
        seguro: isSafeUrl(url)
      });
      lastIndex = regexLinks.lastIndex;
    }

    if (lastIndex < texto.length) {
      const remainingChunk = texto.substring(lastIndex);
      tokens.push({
        tipo: "texto",
        conteudo: remainingChunk,
        valor: remainingChunk
      });
    }

    return tokens;
  }

  function isDataISOValida(dataStr) {
    if (typeof dataStr !== "string") return false;
    // Aceita YYYY-MM-DD ou formato ISO 8601 completo
    const match = dataStr.match(/^(\d{4})-(\d{2})-(\d{2})(T.*)?$/);
    if (!match) return false;
    const timestamp = Date.parse(dataStr);
    return !Number.isNaN(timestamp);
  }

  function isScoreValido(score) {
    return Number.isInteger(score) && score >= 0 && score <= 3;
  }

  // 2. VALIDAÇÃO RIGOROSA DO BACKUP JSON
  function validarBackup(rawInput) {
    let obj = rawInput;
    if (typeof rawInput === "string") {
      try {
        obj = JSON.parse(rawInput);
      } catch (e) {
        return { valido: false, erro: "JSON corrompido ou sintaxe inválida: " + e.message };
      }
    }

    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      return { valido: false, erro: "O backup deve ser um objeto JSON não nulo." };
    }

    // Aceita versão_backup: 1 (número ou string "1")
    const versaoBackup = obj.versao_backup !== undefined ? obj.versao_backup : obj.versao;
    if (versaoBackup !== 1 && versaoBackup !== "1") {
      return { valido: false, erro: `Versão de backup incompatível: obtido '${versaoBackup}', esperado 1.` };
    }

    const dadosCorpo = obj.dados || obj;
    const prog = dadosCorpo.progresso || dadosCorpo;

    if (!prog || typeof prog !== "object" || Array.isArray(prog)) {
      return { valido: false, erro: "Objeto 'progresso' ausente ou inválido no backup." };
    }

    if (!Array.isArray(prog.sessoesPraticadas)) {
      return { valido: false, erro: "Campo 'sessoesPraticadas' deve ser uma lista (array)." };
    }

    if (!Array.isArray(prog.avaliacoes)) {
      return { valido: false, erro: "Campo 'avaliacoes' deve ser uma lista (array)." };
    }

    // Validação estrita de cada sessão praticada
    const sessoesNormalizadas = [];
    for (let i = 0; i < prog.sessoesPraticadas.length; i++) {
      const s = prog.sessoesPraticadas[i];
      if (!s || typeof s !== "object" || Array.isArray(s)) {
        return { valido: false, erro: `Registro nulo ou inválido em sessoesPraticadas no índice ${i}.` };
      }

      if (!s.id || typeof s.id !== "string" || s.id.trim() === "") {
        return { valido: false, erro: `Identificador 'id' ausente ou inválido na sessão de índice ${i}.` };
      }

      if (!isDataISOValida(s.data)) {
        return { valido: false, erro: `Data ISO inválida na sessão '${s.id}': obtido '${s.data}'.` };
      }

      if (!s.sessaoId || typeof s.sessaoId !== "string" || !SESSOES_VALIDAS.has(s.sessaoId)) {
        return { valido: false, erro: `ID de sessão desconhecido na sessão '${s.id}': '${s.sessaoId}'.` };
      }

      const min = Number(s.minutos);
      if (!Number.isFinite(min) || min <= 0 || min > 300) {
        return { valido: false, erro: `Duração em minutos inválida na sessão '${s.id}': '${s.minutos}'.` };
      }

      let bpmVal = null;
      if (s.bpm !== null && s.bpm !== undefined && s.bpm !== "") {
        const b = Number(s.bpm);
        if (!Number.isFinite(b) || b <= 0 || b > 300) {
          return { valido: false, erro: `BPM inválido na sessão '${s.id}': '${s.bpm}'.` };
        }
        bpmVal = Math.round(b);
      }

      sessoesNormalizadas.push({
        id: String(s.id).trim(),
        data: String(s.data).trim(),
        sessaoId: String(s.sessaoId).trim(),
        minutos: Math.round(min),
        bpm: bpmVal,
        trecho: typeof s.trecho === "string" ? s.trecho.trim() : "",
        melhoria: typeof s.melhoria === "string" ? s.melhoria.trim() : "",
        dificuldade: typeof s.dificuldade === "string" ? s.dificuldade.trim() : "",
        proximaAcao: typeof s.proximaAcao === "string" ? s.proximaAcao.trim() : ""
      });
    }

    // Validação estrita de cada avaliação de entrega
    const avaliacoesNormalizadas = [];
    for (let i = 0; i < prog.avaliacoes.length; i++) {
      const a = prog.avaliacoes[i];
      if (!a || typeof a !== "object" || Array.isArray(a)) {
        return { valido: false, erro: `Registro nulo ou inválido em avaliacoes no índice ${i}.` };
      }

      if (!a.id || typeof a.id !== "string" || a.id.trim() === "") {
        return { valido: false, erro: `Identificador 'id' ausente ou inválido na avaliação de índice ${i}.` };
      }

      if (!isDataISOValida(a.data)) {
        return { valido: false, erro: `Data ISO inválida na avaliação '${a.id}': obtido '${a.data}'.` };
      }

      if (!a.unidadeId || typeof a.unidadeId !== "string" || !UNIDADES_VALIDAS.has(a.unidadeId)) {
        return { valido: false, erro: `Unidade inválida na avaliação '${a.id}': '${a.unidadeId}'.` };
      }

      if (!a.versao || typeof a.versao !== "string" || !VERSOES_EXERCICIO_VALIDAS.has(a.versao)) {
        return { valido: false, erro: `Versão de exercício inválida na avaliação '${a.id}': '${a.versao}'.` };
      }

      const sc = a.scores;
      if (!sc || typeof sc !== "object" || Array.isArray(sc)) {
        return { valido: false, erro: `Objeto 'scores' ausente na avaliação '${a.id}'.` };
      }

      if (!isScoreValido(sc.continuidade) || !isScoreValido(sc.clareza) ||
          !isScoreValido(sc.equilibrio) || !isScoreValido(sc.autonomia)) {
        return { valido: false, erro: `Pontuações de rubrica devem ser números inteiros de 0 a 3 na avaliação '${a.id}'.` };
      }

      avaliacoesNormalizadas.push({
        id: String(a.id).trim(),
        data: String(a.data).trim(),
        unidadeId: String(a.unidadeId).trim(),
        versao: String(a.versao).trim(),
        scores: {
          continuidade: sc.continuidade,
          clareza: sc.clareza,
          equilibrio: sc.equilibrio,
          autonomia: sc.autonomia
        },
        execucaoIntegralConfirmada: Boolean(a.execucaoIntegralConfirmada),
        audioRef: typeof a.audioRef === "string" ? a.audioRef.trim() : "",
        observacoes: typeof a.observacoes === "string" ? a.observacoes.trim() : ""
      });
    }

    // Catálogo assistidos e praticados (opcionais com default seguro)
    const catAssist = [];
    if (Array.isArray(dadosCorpo.catalogoAssistidos)) {
      for (const id of dadosCorpo.catalogoAssistidos) {
        if (typeof id === "string" && id.trim()) catAssist.push(id.trim());
      }
    }

    const catPrat = [];
    if (Array.isArray(dadosCorpo.catalogoPraticados)) {
      for (const id of dadosCorpo.catalogoPraticados) {
        if (typeof id === "string" && id.trim()) catPrat.push(id.trim());
      }
    }

    const ultimaSessaoId = (typeof prog.ultimaSessaoId === "string" && SESSOES_VALIDAS.has(prog.ultimaSessaoId))
      ? prog.ultimaSessaoId
      : "sess-1a";

    const dadosExtraidos = {
      progresso: {
        versao: 1,
        ultimaSessaoId: ultimaSessaoId,
        sessoesPraticadas: sessoesNormalizadas,
        avaliacoes: avaliacoesNormalizadas
      },
      catalogoAssistidos: catAssist,
      catalogoPraticados: catPrat
    };

    return {
      valido: true,
      erros: [],
      versao_backup: 1,
      dados: dadosExtraidos,
      dadosNormalizados: {
        versao_backup: 1,
        data_exportacao: obj.data_exportacao || new Date().toISOString(),
        curso: "Curso de Violão — Método Tríade",
        dados: dadosExtraidos
      },
      contagens: {
        sessoes: sessoesNormalizadas.length,
        avaliacoes: avaliacoesNormalizadas.length,
        catalogoAssistidos: catAssist.length,
        catalogoPraticados: catPrat.length
      }
    };
  }

  // 3. MESCLAGEM DETERMINÍSTICA (MERGE)
  function mesclarEstado(estadoAtual, backupNormalizado) {
    const localProg = (estadoAtual && estadoAtual.progresso) ? estadoAtual.progresso : { sessoesPraticadas: [], avaliacoes: [] };
    const dadosCorpo = (backupNormalizado && backupNormalizado.dados) ? backupNormalizado.dados : (backupNormalizado || {});
    const backupProg = dadosCorpo.progresso || dadosCorpo;
    const backupSessoes = Array.isArray(backupProg.sessoesPraticadas) ? backupProg.sessoesPraticadas : [];
    const backupAvaliacoes = Array.isArray(backupProg.avaliacoes) ? backupProg.avaliacoes : [];
    const backupAssist = Array.isArray(dadosCorpo.catalogoAssistidos) ? dadosCorpo.catalogoAssistidos : [];
    const backupPrat = Array.isArray(dadosCorpo.catalogoPraticados) ? dadosCorpo.catalogoPraticados : [];

    // Sessoes Praticadas:
    // Deduplica inclusive dentro do próprio backup importado.
    // Em caso de conflito por ID, MANTÉM O LOCAL. Não deduplica por data.
    const mergedSessoes = [...(localProg.sessoesPraticadas || [])];
    const seenSessIds = new Set(mergedSessoes.map(s => s.id));
    let sessoesIncluidas = 0;
    let sessoesConflito = 0;

    backupSessoes.forEach(s => {
      if (!s || !s.id) return;
      if (seenSessIds.has(s.id)) {
        sessoesConflito++;
      } else {
        seenSessIds.add(s.id);
        mergedSessoes.push(s);
        sessoesIncluidas++;
      }
    });

    // Avaliações:
    const mergedAvaliacoes = [...(localProg.avaliacoes || [])];
    const seenEvalIds = new Set(mergedAvaliacoes.map(a => a.id));
    let avaliacoesIncluidas = 0;
    let avaliacoesConflito = 0;

    backupAvaliacoes.forEach(a => {
      if (!a || !a.id) return;
      if (seenEvalIds.has(a.id)) {
        avaliacoesConflito++;
      } else {
        seenEvalIds.add(a.id);
        mergedAvaliacoes.push(a);
        avaliacoesIncluidas++;
      }
    });

    // Catálogo Tracking: união de conjuntos
    const localAssistList = estadoAtual && estadoAtual.catalogoAssistidos
      ? (Array.isArray(estadoAtual.catalogoAssistidos) ? estadoAtual.catalogoAssistidos : [...estadoAtual.catalogoAssistidos])
      : [];
    const localPratList = estadoAtual && estadoAtual.catalogoPraticados
      ? (Array.isArray(estadoAtual.catalogoPraticados) ? estadoAtual.catalogoPraticados : [...estadoAtual.catalogoPraticados])
      : [];

    const mergedAssistSet = new Set(localAssistList);
    const antesAssist = mergedAssistSet.size;
    backupAssist.forEach(id => mergedAssistSet.add(id));
    const assistNovos = mergedAssistSet.size - antesAssist;

    const mergedPratSet = new Set(localPratList);
    const antesPrat = mergedPratSet.size;
    backupPrat.forEach(id => mergedPratSet.add(id));
    const pratNovos = mergedPratSet.size - antesPrat;

    const assistArray = [...mergedAssistSet];
    const pratArray = [...mergedPratSet];

    return {
      novoEstado: {
        activeView: (estadoAtual && estadoAtual.activeView) || "inicio",
        currentSessionId: (estadoAtual && estadoAtual.currentSessionId) || "sess-1a",
        currentExerciseId: (estadoAtual && estadoAtual.currentExerciseId) || "ex1",
        exerciseVersion: (estadoAtual && estadoAtual.exerciseVersion) || "principal",
        catalogFilter: estadoAtual ? estadoAtual.catalogFilter : undefined,
        catalogoAssistidos: assistArray,
        catalogoPraticados: pratArray,
        progresso: {
          versao: 1,
          ultimaSessaoId: (estadoAtual && estadoAtual.currentSessionId) || backupProg.ultimaSessaoId || "sess-1a",
          sessoesPraticadas: mergedSessoes,
          avaliacoes: mergedAvaliacoes
        },
        timer: estadoAtual ? estadoAtual.timer : undefined
      },
      sessoesAdicionadas: sessoesIncluidas,
      avaliacoesAdicionadas: avaliacoesIncluidas,
      catalogoAssistidosAdicionados: assistNovos,
      catalogoPraticadosAdicionados: pratNovos,
      relatorio: {
        sessoesIncluidas,
        sessoesConflito,
        avaliacoesIncluidas,
        avaliacoesConflito
      }
    };
  }

  // 4. SUBSTITUIÇÃO INTEGRAL DO ESTADO (REPLACE)
  function substituirEstado(arg1, arg2) {
    let estadoAtual = {};
    let backupNormalizado = arg1;
    if (arg2) {
      estadoAtual = arg1 || {};
      backupNormalizado = arg2;
    }

    const dadosCorpo = (backupNormalizado && backupNormalizado.dados) ? backupNormalizado.dados : (backupNormalizado || {});
    const backupProg = dadosCorpo.progresso || dadosCorpo;
    const backupSessoes = Array.isArray(backupProg.sessoesPraticadas) ? backupProg.sessoesPraticadas : [];
    const backupAvaliacoes = Array.isArray(backupProg.avaliacoes) ? backupProg.avaliacoes : [];
    const backupAssist = Array.isArray(dadosCorpo.catalogoAssistidos) ? dadosCorpo.catalogoAssistidos : [];
    const backupPrat = Array.isArray(dadosCorpo.catalogoPraticados) ? dadosCorpo.catalogoPraticados : [];

    // Deduplica caso haja IDs duplicados internamente no arquivo
    const sessoesUnicas = [];
    const seenSess = new Set();
    backupSessoes.forEach(s => {
      if (!s || !s.id) return;
      if (!seenSess.has(s.id)) {
        seenSess.add(s.id);
        sessoesUnicas.push(s);
      }
    });

    const avaliacoesUnicas = [];
    const seenEval = new Set();
    backupAvaliacoes.forEach(a => {
      if (!a || !a.id) return;
      if (!seenEval.has(a.id)) {
        seenEval.add(a.id);
        avaliacoesUnicas.push(a);
      }
    });

    const catAssistArray = Array.from(new Set(backupAssist));
    const catPratArray = Array.from(new Set(backupPrat));
    const ultimaSess = backupProg.ultimaSessaoId || "sess-1a";

    const resultadoEstado = {
      activeView: estadoAtual.activeView || "inicio",
      currentSessionId: ultimaSess,
      currentExerciseId: "ex1",
      exerciseVersion: "principal",
      catalogFilter: estadoAtual.catalogFilter,
      catalogoAssistidos: catAssistArray,
      catalogoPraticados: catPratArray,
      progresso: {
        versao: 1,
        ultimaSessaoId: ultimaSess,
        sessoesPraticadas: sessoesUnicas,
        avaliacoes: avaliacoesUnicas
      },
      timer: estadoAtual.timer
    };

    // Propriedades no topo para permitir acesso tanto via resultado.progresso quanto resultado.novoEstado.progresso
    resultadoEstado.novoEstado = resultadoEstado;
    resultadoEstado.relatorio = {
      totalSessoes: sessoesUnicas.length,
      totalAvaliacoes: avaliacoesUnicas.length
    };

    return resultadoEstado;
  }

  // 5. MOTOR OFICIAL DE AVANÇO CURRICULAR (RUBRICA DE 4 DIMENSÕES)
  function avaliarAvanco(avaliacoes, unidadeId) {
    if (!Array.isArray(avaliacoes)) {
      return {
        unidadeId,
        requiredVersion: "desconhecido",
        totalAvaliacoes: 0,
        totalTomadasSucesso: 0,
        datasDistintas: [],
        aprovado: false,
        mesmaDataApenas: false,
        temParcialApenas: false,
        faltaConfirmacaoIntegralU2: false
      };
    }

    // Filtrar estritamente pela unidade sob avaliação (mistura de unidades não afeta outra)
    const evals = avaliacoes.filter(e => e.unidadeId === unidadeId);

    let requiredVersion = "ex3";
    if (unidadeId === "u1") requiredVersion = "u1-estudo";
    if (unidadeId === "u3") requiredVersion = "ex6";

    let faltaConfirmacaoIntegralU2 = false;

    const tomadasCompletasSucesso = evals.filter(e => {
      if (e.versao !== requiredVersion) return false;
      const sc = e.scores || {};
      const atingiuNotas =
        sc.continuidade >= 2 &&
        sc.clareza >= 2 &&
        sc.equilibrio >= 2 &&
        sc.autonomia >= 2;

      if (!atingiuNotas) return false;

      // Para Unidade 2, exige explicitamente a confirmação de execução integral (16 compassos)
      if (unidadeId === "u2") {
        if (!e.execucaoIntegralConfirmada) {
          faltaConfirmacaoIntegralU2 = true;
          return false;
        }
      }

      return true;
    });

    const datasDistintas = [...new Set(tomadasCompletasSucesso.map(t => t.data))];
    const tomadasParciais = evals.filter(e => e.versao === "ex6-s");

    return {
      unidadeId,
      requiredVersion,
      totalAvaliacoes: evals.length,
      totalTomadasSucesso: tomadasCompletasSucesso.length,
      datasDistintas: datasDistintas,
      aprovado: datasDistintas.length >= 2,
      mesmaDataApenas: tomadasCompletasSucesso.length >= 2 && datasDistintas.length === 1,
      temParcialApenas: tomadasParciais.length > 0 && tomadasCompletasSucesso.length === 0,
      faltaConfirmacaoIntegralU2: faltaConfirmacaoIntegralU2 && tomadasCompletasSucesso.length === 0,
      pendenteExecucaoIntegralU2: faltaConfirmacaoIntegralU2 && tomadasCompletasSucesso.length === 0
    };
  }

  return {
    escapeHTML,
    isSafeUrl,
    parseLinksSeguros,
    isDataISOValida,
    isScoreValido,
    validarBackup,
    mesclarEstado,
    substituirEstado,
    avaliarAvanco,
    UNIDADES_VALIDAS,
    SESSOES_VALIDAS,
    VERSOES_EXERCICIO_VALIDAS
  };
});
