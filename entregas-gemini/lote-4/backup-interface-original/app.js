/**
 * app.js — Lógica da Interface Local do Curso de Violão — Método Tríade
 * 
 * Atualização de Escopo (13/09/2026):
 * - Catálogo do Curso Original (300 aulas do Método Tríade)
 * - Meu Plano de Estudo (48 semanas, 12 unidades, exercícios homologados)
 * - Execução estritamente nativa (Vanilla JS), sem dependências, file:// compatível.
 */

(function () {
  "use strict";

  const DADOS = window.CURSO_DADOS;
  if (!DADOS) {
    console.error("ERRO: window.CURSO_DADOS não encontrado. Verifique a carga de conteudo.js.");
    return;
  }

  const STORAGE_KEY_PROG = "curso_violao_progresso_v1";
  const STORAGE_KEY_CAT_ASSIST = "curso_violao_catalogo_assistidos_v1";
  const STORAGE_KEY_CAT_PRAT = "curso_violao_catalogo_praticados_v1";

  let storageAvailable = true;

  // Estado da Aplicação
  const appState = {
    activeView: "inicio",
    currentSessionId: "sess-1a",
    currentExerciseId: "ex1",
    exerciseVersion: "principal",
    
    // Filtros do Catálogo Original
    catalogFilter: {
      searchTerm: "",
      moduleId: "all",
      typeFilter: "all" // all, video, pdf, disponivel, indisponivel
    },

    // Acompanhamento do Catálogo Original
    catalogoAssistidos: new Set(),
    catalogoPraticados: new Set(),

    // Progresso do Plano Personalizado
    progresso: {
      versao: 1,
      ultimaSessaoId: "sess-1a",
      sessoesPraticadas: [],
      avaliacoes: []
    },

    // Temporizador
    timer: {
      duracaoTotalMs: 40 * 60 * 1000,
      tempoDecorridoMs: 0,
      timestampInicio: null,
      intervalId: null,
      estaRodando: false,
      estaConcluido: false
    }
  };

  // 1. PERSISTÊNCIA
  function testLocalStorage() {
    try {
      const testKey = "__curso_violao_test__";
      localStorage.setItem(testKey, "1");
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function carregarDadosLocais() {
    storageAvailable = testLocalStorage();
    const alertEl = document.getElementById("storageAlert");
    if (!storageAvailable) {
      if (alertEl) alertEl.style.display = "block";
      console.warn("localStorage indisponível. Executando em memória temporária.");
      return;
    }

    try {
      // Plano de Estudo
      const rawProg = localStorage.getItem(STORAGE_KEY_PROG);
      if (rawProg) {
        const parsed = JSON.parse(rawProg);
        if (parsed && typeof parsed === "object") {
          appState.progresso.versao = parsed.versao || 1;
          appState.progresso.ultimaSessaoId = parsed.ultimaSessaoId || "sess-1a";
          appState.progresso.sessoesPraticadas = Array.isArray(parsed.sessoesPraticadas) ? parsed.sessoesPraticadas : [];
          appState.progresso.avaliacoes = Array.isArray(parsed.avaliacoes) ? parsed.avaliacoes : [];
          appState.currentSessionId = appState.progresso.ultimaSessaoId;
        }
      }

      // Catálogo Original
      const rawAssist = localStorage.getItem(STORAGE_KEY_CAT_ASSIST);
      if (rawAssist) {
        const arr = JSON.parse(rawAssist);
        if (Array.isArray(arr)) appState.catalogoAssistidos = new Set(arr);
      }

      const rawPrat = localStorage.getItem(STORAGE_KEY_CAT_PRAT);
      if (rawPrat) {
        const arr = JSON.parse(rawPrat);
        if (Array.isArray(arr)) appState.catalogoPraticados = new Set(arr);
      }
    } catch (err) {
      console.error("Erro ao carregar dados locais:", err);
    }
  }

  function salvarProgresso() {
    if (!storageAvailable) return;
    try {
      appState.progresso.ultimaSessaoId = appState.currentSessionId;
      localStorage.setItem(STORAGE_KEY_PROG, JSON.stringify(appState.progresso));
    } catch (err) {
      console.error("Erro ao salvar progresso:", err);
    }
  }

  function salvarCatalogoTracking() {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(STORAGE_KEY_CAT_ASSIST, JSON.stringify([...appState.catalogoAssistidos]));
      localStorage.setItem(STORAGE_KEY_CAT_PRAT, JSON.stringify([...appState.catalogoPraticados]));
    } catch (err) {
      console.error("Erro ao salvar acompanhamento do catálogo:", err);
    }
  }

  // 2. NAVEGAÇÃO PRINCIPAL
  function setupNavigation() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetView = tab.getAttribute("data-view");
        if (targetView) switchView(targetView);
      });
    });

    // Atalhos do Início
    const btnContinue = document.getElementById("btnContinueSession");
    if (btnContinue) {
      btnContinue.addEventListener("click", () => {
        carregarSessaoNoCard(appState.currentSessionId);
        switchView("sessao");
      });
    }

    const btnGoToPlan = document.getElementById("btnGoToPlanOverview");
    if (btnGoToPlan) {
      btnGoToPlan.addEventListener("click", () => switchView("plano"));
    }

    const btnGoToCat = document.getElementById("btnGoToCatalogo");
    if (btnGoToCat) {
      btnGoToCat.addEventListener("click", () => switchView("catalogo"));
    }

    // Subabas do Diário
    const subtabBtns = document.querySelectorAll(".diario-tabs-subnav button");
    subtabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        subtabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const targetSub = btn.getAttribute("data-subtab");
        document.querySelectorAll(".subtab-panel").forEach(p => p.classList.remove("active"));
        const panel = document.getElementById(`subtab-${targetSub}`);
        if (panel) panel.classList.add("active");
        if (targetSub === "status") renderAdvancementStatus();
        if (targetSub === "historico") renderHistory();
      });
    });
  }

  function switchView(viewName) {
    appState.activeView = viewName;

    document.querySelectorAll(".nav-tab").forEach(tab => {
      const isMatch = tab.getAttribute("data-view") === viewName;
      tab.classList.toggle("active", isMatch);
      tab.setAttribute("aria-selected", isMatch ? "true" : "false");
    });

    document.querySelectorAll(".app-view").forEach(view => {
      view.classList.toggle("active", view.id === `view-${viewName}`);
    });

    if (viewName === "inicio") {
      updateDashboardStats();
    } else if (viewName === "catalogo") {
      renderCatalogView();
    } else if (viewName === "plano") {
      renderPlanView();
    } else if (viewName === "sessao") {
      carregarSessaoNoCard(appState.currentSessionId);
    } else if (viewName === "exercicios") {
      renderExerciseDisplay(appState.currentExerciseId);
    } else if (viewName === "fontes") {
      renderSourcesView();
    } else if (viewName === "diario") {
      renderAdvancementStatus();
      renderHistory();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 3. TEMPORIZADOR BASEADO EM TIMESTAMP REAL
  function setupTimer() {
    const btnStart = document.getElementById("btnTimerStart");
    const btnPause = document.getElementById("btnTimerPause");
    const btnReset = document.getElementById("btnTimerReset");
    const btnToDiary = document.getElementById("btnTimerToDiary");
    const digitsEl = document.getElementById("timerDigits");
    const badgeEl = document.getElementById("timerStatusBadge");
    const dockEl = document.getElementById("timerDock");

    function formatTime(ms) {
      const totalSec = Math.max(0, Math.floor(ms / 1000));
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function updateDisplay() {
      let tempoRestanteMs = appState.timer.duracaoTotalMs - appState.timer.tempoDecorridoMs;
      if (appState.timer.estaRodando && appState.timer.timestampInicio) {
        const delta = Date.now() - appState.timer.timestampInicio;
        tempoRestanteMs -= delta;
      }

      if (tempoRestanteMs <= 0) {
        tempoRestanteMs = 0;
        if (appState.timer.estaRodando) {
          clearInterval(appState.timer.intervalId);
          appState.timer.estaRodando = false;
          appState.timer.estaConcluido = true;
          appState.timer.tempoDecorridoMs = appState.timer.duracaoTotalMs;
          dockEl.classList.remove("timer-running");
          dockEl.classList.add("timer-finished");
          badgeEl.textContent = "Concluído (40 min)";
          btnStart.disabled = true;
          btnPause.disabled = true;
        }
      }

      digitsEl.textContent = formatTime(tempoRestanteMs);
    }

    btnStart.addEventListener("click", () => {
      if (appState.timer.estaRodando || appState.timer.estaConcluido) return;
      appState.timer.estaRodando = true;
      appState.timer.timestampInicio = Date.now();
      dockEl.classList.add("timer-running");
      badgeEl.textContent = "Em andamento";
      btnStart.disabled = true;
      btnPause.disabled = false;

      appState.timer.intervalId = setInterval(updateDisplay, 250);
      updateDisplay();
    });

    btnPause.addEventListener("click", () => {
      if (!appState.timer.estaRodando) return;
      appState.timer.estaRodando = false;
      const delta = Date.now() - appState.timer.timestampInicio;
      appState.timer.tempoDecorridoMs += delta;
      clearInterval(appState.timer.intervalId);

      dockEl.classList.remove("timer-running");
      badgeEl.textContent = "Pausado";
      btnStart.disabled = false;
      btnPause.disabled = true;
      updateDisplay();
    });

    btnReset.addEventListener("click", () => {
      clearInterval(appState.timer.intervalId);
      appState.timer.estaRodando = false;
      appState.timer.estaConcluido = false;
      appState.timer.tempoDecorridoMs = 0;
      appState.timer.timestampInicio = null;

      dockEl.classList.remove("timer-running", "timer-finished");
      badgeEl.textContent = "Pausado";
      btnStart.disabled = false;
      btnPause.disabled = true;
      digitsEl.textContent = "40:00";
    });

    btnToDiary.addEventListener("click", () => {
      let decorridoMs = appState.timer.tempoDecorridoMs;
      if (appState.timer.estaRodando && appState.timer.timestampInicio) {
        decorridoMs += (Date.now() - appState.timer.timestampInicio);
      }
      const decorridoMin = Math.max(1, Math.round(decorridoMs / 60000));
      
      switchView("diario");
      const inputMinutes = document.getElementById("logMinutes");
      if (inputMinutes) inputMinutes.value = decorridoMin;
      const selectSession = document.getElementById("logSessionSelect");
      if (selectSession) selectSession.value = appState.currentSessionId;
    });

    const btnStartFromSession = document.getElementById("btnStartStudyFromSession");
    if (btnStartFromSession) {
      btnStartFromSession.addEventListener("click", () => {
        if (!appState.timer.estaRodando) {
          btnStart.click();
        }
      });
    }
  }

  // 4. PAINEL DE INÍCIO
  function updateDashboardStats() {
    const sessoes = DADOS.planoEstudo.sessoes;
    const lastSession = sessoes.find(s => s.id === appState.currentSessionId) || sessoes[0];
    const titleEl = document.getElementById("dashLastSessionTitle");
    const descEl = document.getElementById("dashLastSessionDesc");
    if (titleEl && lastSession) {
      titleEl.textContent = `Semana ${lastSession.semana} · Sessão ${lastSession.sessao}`;
      descEl.textContent = `${lastSession.titulo} (40 min)`;
    }

    const sessoesCount = appState.progresso.sessoesPraticadas.length;
    const totalMinutos = appState.progresso.sessoesPraticadas.reduce((acc, s) => acc + (parseInt(s.minutos, 10) || 0), 0);
    const catAssistidas = appState.catalogoAssistidos.size;

    const statSess = document.getElementById("statSessionsCount");
    const statMin = document.getElementById("statMinutesCount");
    const statCat = document.getElementById("statCatalogoAssistidasCount");
    const statComp = document.getElementById("statCompletedUnitsCount");

    if (statSess) statSess.textContent = sessoesCount;
    if (statMin) statMin.textContent = totalMinutos;
    if (statCat) statCat.textContent = `${catAssistidas} / ${DADOS.estatisticasCatalogo.totalAulas}`;

    let concluidas = 0;
    ["u1", "u2", "u3"].forEach(uId => {
      const res = checkUnitAdvancement(uId);
      if (res.aprovado) concluidas++;
    });
    if (statComp) statComp.textContent = `${concluidas} / 3`;

    const progList = document.getElementById("dashUnitsProgressList");
    if (progList) {
      progList.innerHTML = "";
      ["u1", "u2", "u3"].forEach(uId => {
        const u = DADOS.planoEstudo.unidades.find(item => item.id === uId);
        const res = checkUnitAdvancement(uId);
        const itemDiv = document.createElement("div");
        itemDiv.className = "unit-prog-item";
        
        const titleSpan = document.createElement("span");
        titleSpan.textContent = `Unidade ${u.numero}: ${u.titulo}`;

        const badgeSpan = document.createElement("span");
        if (res.aprovado) {
          badgeSpan.className = "badge badge-success";
          badgeSpan.textContent = "Homologada";
        } else if (res.datasDistintas.length === 1) {
          badgeSpan.className = "badge badge-accent";
          badgeSpan.textContent = "1 de 2 tomadas";
        } else {
          badgeSpan.className = "badge";
          badgeSpan.textContent = "Em andamento";
        }

        itemDiv.appendChild(titleSpan);
        itemDiv.appendChild(badgeSpan);
        progList.appendChild(itemDiv);
      });
    }
  }

  // 5. CATÁLOGO DO CURSO ORIGINAL (MÉTODO TRÍADE)
  function setupCatalogControls() {
    const searchInput = document.getElementById("catalogSearchInput");
    const moduleSelect = document.getElementById("catalogModuleSelect");
    const pillButtons = document.querySelectorAll(".filter-pills-row button");

    if (moduleSelect) {
      moduleSelect.innerHTML = '<option value="all">Todos os Módulos (1 a 11)</option>';
      DADOS.catalogoOriginal.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = `${m.nome} (${m.totalAulas} aulas)`;
        moduleSelect.appendChild(opt);
      });

      moduleSelect.addEventListener("change", () => {
        appState.catalogFilter.moduleId = moduleSelect.value;
        renderCatalogView();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        appState.catalogFilter.searchTerm = searchInput.value.trim().toLowerCase();
        renderCatalogView();
      });
    }

    pillButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        pillButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        appState.catalogFilter.typeFilter = btn.getAttribute("data-cat-filter") || "all";
        renderCatalogView();
      });
    });
  }

  function renderCatalogView() {
    const container = document.getElementById("catalogModulesList");
    if (!container) return;
    container.innerHTML = "";

    const { searchTerm, moduleId, typeFilter } = appState.catalogFilter;

    let modulosExibidos = DADOS.catalogoOriginal;
    if (moduleId !== "all") {
      modulosExibidos = modulosExibidos.filter(m => m.id === moduleId);
    }

    let totalAulasRenderizadas = 0;

    modulosExibidos.forEach(mod => {
      // Filtrar aulas deste módulo
      const aulasFiltradas = mod.aulas.filter(aula => {
        // Filtro de texto
        if (searchTerm) {
          const matchTitle = aula.grupo_aula.toLowerCase().includes(searchTerm);
          const matchMod = mod.nome.toLowerCase().includes(searchTerm);
          const matchMats = aula.materiais.some(m => m.titulo.toLowerCase().includes(searchTerm));
          if (!matchTitle && !matchMod && !matchMats) return false;
        }

        // Filtro por tipo
        if (typeFilter === "video") {
          return aula.materiais.some(m => m.tipo === "video" && m.utilizavel);
        } else if (typeFilter === "pdf") {
          return aula.materiais.some(m => m.tipo === "pdf" && m.utilizavel);
        } else if (typeFilter === "disponivel") {
          return aula.temArquivos;
        } else if (typeFilter === "indisponivel") {
          return !aula.temArquivos;
        }

        return true;
      });

      if (aulasFiltradas.length === 0) return;
      totalAulasRenderizadas += aulasFiltradas.length;

      const modCard = document.createElement("article");
      modCard.className = "catalog-module-card";

      // Cabeçalho do Módulo
      const modHeader = document.createElement("header");
      modHeader.className = "catalog-module-header";

      const h3 = document.createElement("h3");
      h3.textContent = mod.titulo;
      modHeader.appendChild(h3);

      const badgeCount = document.createElement("span");
      badgeCount.className = "catalog-module-badge";
      badgeCount.textContent = `${aulasFiltradas.length} aulas mostradas (${mod.aulasComArquivo} disp. / ${mod.aulasSemArquivo} sem arq.)`;
      modHeader.appendChild(badgeCount);

      modCard.appendChild(modHeader);

      // Lista de Aulas
      const lessonsList = document.createElement("div");
      lessonsList.className = "catalog-lessons-list";

      aulasFiltradas.forEach(aula => {
        const row = document.createElement("div");
        row.className = "catalog-lesson-row";

        // Topo da Aula
        const topRow = document.createElement("div");
        topRow.className = "catalog-lesson-header";

        const titleDiv = document.createElement("div");
        const titleSpan = document.createElement("span");
        titleSpan.className = "catalog-lesson-title";
        titleSpan.textContent = aula.grupo_aula;
        titleDiv.appendChild(titleSpan);

        const statusBadge = document.createElement("span");
        if (aula.temArquivos) {
          statusBadge.className = "badge badge-info";
          statusBadge.textContent = "Disponível no backup";
        } else {
          statusBadge.className = "badge badge-planned";
          statusBadge.textContent = "Indisponível no backup";
        }
        statusBadge.style.marginLeft = "8px";
        titleDiv.appendChild(statusBadge);

        topRow.appendChild(titleDiv);

        // Acompanhamento Independente (Checkboxes)
        const trackDiv = document.createElement("div");
        trackDiv.className = "catalog-lesson-tracking";

        const labelAssist = document.createElement("label");
        labelAssist.className = "tracking-checkbox-label";
        const chkAssist = document.createElement("input");
        chkAssist.type = "checkbox";
        chkAssist.checked = appState.catalogoAssistidos.has(aula.id);
        chkAssist.addEventListener("change", () => {
          if (chkAssist.checked) appState.catalogoAssistidos.add(aula.id);
          else appState.catalogoAssistidos.delete(aula.id);
          salvarCatalogoTracking();
          updateDashboardStats();
        });
        labelAssist.appendChild(chkAssist);
        labelAssist.appendChild(document.createTextNode("Assistido"));

        const labelPrat = document.createElement("label");
        labelPrat.className = "tracking-checkbox-label";
        const chkPrat = document.createElement("input");
        chkPrat.type = "checkbox";
        chkPrat.checked = appState.catalogoPraticados.has(aula.id);
        chkPrat.addEventListener("change", () => {
          if (chkPrat.checked) appState.catalogoPraticados.add(aula.id);
          else appState.catalogoPraticados.delete(aula.id);
          salvarCatalogoTracking();
          updateDashboardStats();
        });
        labelPrat.appendChild(chkPrat);
        labelPrat.appendChild(document.createTextNode("Praticado"));

        trackDiv.appendChild(labelAssist);
        trackDiv.appendChild(labelPrat);
        topRow.appendChild(trackDiv);

        row.appendChild(topRow);

        // Materiais da Aula
        const matsDiv = document.createElement("div");
        matsDiv.className = "catalog-materials-list";

        if (!aula.temArquivos) {
          const pSem = document.createElement("p");
          pSem.className = "text-muted text-sm";
          pSem.textContent = "ℹ Aula cadastrada na plataforma Hotmart (texto/quiz) sem arquivo capturado no backup Katomart.";
          matsDiv.appendChild(pSem);
        } else {
          aula.materiais.forEach(mat => {
            const matItem = document.createElement("div");
            matItem.className = "catalog-material-item";

            const infoSpan = document.createElement("span");
            const typeBadge = document.createElement("span");
            typeBadge.className = `mat-type-badge ${mat.tipo === "video" ? "mat-type-video" : (mat.tipo === "pdf" ? "mat-type-pdf" : "")}`;
            typeBadge.textContent = mat.tipo;
            infoSpan.appendChild(typeBadge);
            infoSpan.appendChild(document.createTextNode(" " + mat.titulo));

            matItem.appendChild(infoSpan);

            if (mat.tipo === "part-frag") {
              const fragSpan = document.createElement("span");
              fragSpan.className = "text-muted text-sm";
              fragSpan.textContent = "[Arquivo fragmentado .part-Frag — excluído]";
              matItem.appendChild(fragSpan);
            } else if (mat.url && isSafeUrl(mat.url)) {
              const a = document.createElement("a");
              a.href = mat.url;
              a.target = "_blank";
              a.rel = "noopener noreferrer";
              a.className = "btn btn-sm btn-outline";
              a.textContent = "Abrir no Drive ↗";
              matItem.appendChild(a);
            }

            matsDiv.appendChild(matItem);
          });
        }

        row.appendChild(matsDiv);
        lessonsList.appendChild(row);
      });

      modCard.appendChild(lessonsList);
      container.appendChild(modCard);
    });

    if (totalAulasRenderizadas === 0) {
      const p = document.createElement("p");
      p.className = "text-muted";
      p.textContent = "Nenhuma aula encontrada para os filtros selecionados.";
      container.appendChild(p);
    }
  }

  function isSafeUrl(url) {
    if (!url || typeof url !== "string") return false;
    const clean = url.trim().toLowerCase();
    return clean.startsWith("https://") || clean.startsWith("http://");
  }

  // 6. MEU PLANO DE ESTUDO (48 SEMANAS - 12 UNIDADES)
  function renderPlanView() {
    const container = document.getElementById("planUnitsContainer");
    if (!container) return;
    container.innerHTML = "";

    DADOS.planoEstudo.unidades.forEach(unit => {
      const card = document.createElement("article");
      const isAvailable = unit.status === "disponivel";
      card.className = `unit-card ${isAvailable ? "unit-available" : "unit-planned"}`;

      const header = document.createElement("div");
      header.className = "unit-card-header";

      const titleGroup = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.className = "unit-card-title";
      h3.textContent = `Unidade ${unit.numero} · ${unit.titulo} (${unit.semanas})`;
      titleGroup.appendChild(h3);

      const badge = document.createElement("span");
      badge.className = `badge ${isAvailable ? "badge-info" : "badge-planned"}`;
      badge.textContent = isAvailable ? "Disponível (16 sessões)" : "Planejada na Arquitetura";

      header.appendChild(titleGroup);
      header.appendChild(badge);
      card.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "unit-details-grid";

      function addDetail(label, text) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label + ": ";
        p.appendChild(strong);
        p.appendChild(document.createTextNode(text || "—"));
        grid.appendChild(p);
      }

      addDetail("Objetivo", unit.objetivo);
      addDetail("Pré-requisito", unit.prerequisito);
      addDetail("Entrega Prevista", unit.entregaPrevista);
      addDetail("Critério de Avanço", unit.criterioAvanco);
      addDetail("Base Tríade", unit.baseTriade);

      card.appendChild(grid);

      if (isAvailable) {
        const weeksDiv = document.createElement("div");
        weeksDiv.className = "unit-weeks-pills";

        const unitSessions = DADOS.planoEstudo.sessoes.filter(s => s.unidadeId === unit.id);
        const distinctWeeks = [...new Set(unitSessions.map(s => s.semana))];

        distinctWeeks.forEach(wNum => {
          const btnWeek = document.createElement("button");
          btnWeek.type = "button";
          btnWeek.className = "week-pill-btn";
          btnWeek.textContent = `Semana ${wNum}`;
          btnWeek.addEventListener("click", () => {
            const firstSess = unitSessions.find(s => s.semana === wNum && s.sessao === "A");
            if (firstSess) {
              appState.currentSessionId = firstSess.id;
              carregarSessaoNoCard(firstSess.id);
              switchView("sessao");
            }
          });
          weeksDiv.appendChild(btnWeek);
        });

        card.appendChild(weeksDiv);
      } else {
        const noteP = document.createElement("p");
        noteP.className = "text-muted text-sm";
        noteP.textContent = "ℹ Unidade de planejamento (semanas 13 a 48). Não contém botões de aulas fictícias; será produzida em lotes futuros conforme a rota de pré-requisitos.";
        card.appendChild(noteP);
      }

      container.appendChild(card);
    });
  }

  // 7. SESSÃO DE PRÁTICA (40 MIN)
  function setupSessionView() {
    const selectSession = document.getElementById("currentSessionSelect");
    if (!selectSession) return;

    selectSession.innerHTML = "";
    DADOS.planoEstudo.sessoes.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = `Semana ${s.semana} · Sessão ${s.sessao}${s.tipo === "opcional" ? " (Opcional)" : ""} — ${s.titulo}`;
      selectSession.appendChild(opt);
    });

    selectSession.addEventListener("change", () => {
      carregarSessaoNoCard(selectSession.value);
    });

    const btnPrev = document.getElementById("btnPrevSession");
    const btnNext = document.getElementById("btnNextSession");

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        const idx = DADOS.planoEstudo.sessoes.findIndex(s => s.id === appState.currentSessionId);
        if (idx > 0) carregarSessaoNoCard(DADOS.planoEstudo.sessoes[idx - 1].id);
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        const idx = DADOS.planoEstudo.sessoes.findIndex(s => s.id === appState.currentSessionId);
        if (idx < DADOS.planoEstudo.sessoes.length - 1) carregarSessaoNoCard(DADOS.planoEstudo.sessoes[idx + 1].id);
      });
    }

    const btnLog = document.getElementById("btnLogThisSession");
    if (btnLog) {
      btnLog.addEventListener("click", () => {
        switchView("diario");
        const logSel = document.getElementById("logSessionSelect");
        if (logSel) logSel.value = appState.currentSessionId;
      });
    }

    const btnExercise = document.getElementById("btnGoToExercise");
    if (btnExercise) {
      btnExercise.addEventListener("click", () => {
        const s = DADOS.planoEstudo.sessoes.find(item => item.id === appState.currentSessionId);
        if (s && s.exercicioAssociadoId) {
          appState.currentExerciseId = s.exercicioAssociadoId;
          switchView("exercicios");
        }
      });
    }
  }

  function carregarSessaoNoCard(sessionId) {
    const sessoes = DADOS.planoEstudo.sessoes;
    const s = sessoes.find(item => item.id === sessionId) || sessoes[0];
    appState.currentSessionId = s.id;
    salvarProgresso();

    const selectEl = document.getElementById("currentSessionSelect");
    if (selectEl) selectEl.value = s.id;

    const unitBadge = document.getElementById("sessionUnitBadge");
    const weekBadge = document.getElementById("sessionWeekBadge");
    const typeBadge = document.getElementById("sessionTypeBadge");

    if (unitBadge) {
      const u = DADOS.planoEstudo.unidades.find(item => item.id === s.unidadeId);
      unitBadge.textContent = u ? `Unidade ${u.numero}` : s.unidadeId;
    }
    if (weekBadge) weekBadge.textContent = `Semana ${s.semana}`;
    if (typeBadge) {
      typeBadge.textContent = s.tipo === "opcional" ? "Sessão D (Opcional)" : `Sessão ${s.sessao} (Obrigatória)`;
      typeBadge.className = `badge ${s.tipo === "opcional" ? "badge-planned" : "badge-accent"}`;
    }

    document.getElementById("sessionDisplayTitle").textContent = s.tituloCompleto;
    document.getElementById("sessionObjetivoText").textContent = s.objetivo;
    
    const prereqRow = document.getElementById("sessionPrereqRow");
    const prereqText = document.getElementById("sessionPrereqText");
    if (s.prerequisito) {
      prereqRow.style.display = "block";
      prereqText.textContent = s.prerequisito;
    } else {
      prereqRow.style.display = "none";
    }

    document.getElementById("sessionInstrucaoText").textContent = s.instrucao || "—";
    document.getElementById("sessionDificuldadeText").textContent = s.dificuldade || "—";
    document.getElementById("sessionSimplificacaoText").textContent = s.simplificacao || "—";
    document.getElementById("sessionCriterioText").textContent = s.criterioSaida || "—";
    document.getElementById("sessionBpmSuggested").textContent = s.andamentoSugeridoBPM || "50–56 BPM";

    const tbody = document.getElementById("sessionBlocksTbody");
    tbody.innerHTML = "";
    s.blocos.forEach(b => {
      const tr = document.createElement("tr");
      
      const tdTempo = document.createElement("td");
      tdTempo.textContent = b.intervalo;
      
      const tdDur = document.createElement("td");
      tdDur.textContent = `${b.duracaoMin} min`;
      
      const tdAtiv = document.createElement("td");
      tdAtiv.textContent = b.atividade;

      tr.appendChild(tdTempo);
      tr.appendChild(tdDur);
      tr.appendChild(tdAtiv);
      tbody.appendChild(tr);
    });

    const exBox = document.getElementById("linkedExerciseBox");
    const exLabel = document.getElementById("linkedExerciseLabel");
    if (s.exercicioAssociadoId) {
      exBox.style.display = "flex";
      const exObj = DADOS.exercicios.find(e => e.id === s.exercicioAssociadoId);
      exLabel.textContent = `Exercício: ${exObj ? exObj.titulo : s.exercicioAssociadoId}`;
    } else {
      exBox.style.display = "none";
    }
  }

  // 8. CADERNO DE EXERCÍCIOS
  function setupExerciseView() {
    const exSelect = document.getElementById("exerciseSelect");
    if (!exSelect) return;

    exSelect.innerHTML = "";
    const uGroups = { "u1": "Unidade 1", "u2": "Unidade 2", "u3": "Unidade 3" };
    Object.keys(uGroups).forEach(uId => {
      const optGroup = document.createElement("optgroup");
      optGroup.label = uGroups[uId];
      DADOS.exercicios
        .filter(e => e.unidadeId === uId && (e.tipo === "principal" || e.id.startsWith("u1-")))
        .forEach(e => {
          const opt = document.createElement("option");
          opt.value = e.id;
          opt.textContent = e.tituloCompleto;
          optGroup.appendChild(opt);
        });
      exSelect.appendChild(optGroup);
    });

    exSelect.addEventListener("change", () => {
      appState.currentExerciseId = exSelect.value;
      renderExerciseDisplay(exSelect.value);
    });

    const btnPrin = document.getElementById("btnVersionPrincipal");
    const btnSimp = document.getElementById("btnVersionSimplificada");

    btnPrin.addEventListener("click", () => {
      btnPrin.classList.add("active");
      btnSimp.classList.remove("active");
      appState.exerciseVersion = "principal";
      renderExerciseDisplay(appState.currentExerciseId);
    });

    btnSimp.addEventListener("click", () => {
      btnSimp.classList.add("active");
      btnPrin.classList.remove("active");
      appState.exerciseVersion = "simplificada";
      renderExerciseDisplay(appState.currentExerciseId);
    });
  }

  function renderExerciseDisplay(baseExerciseId) {
    let targetId = baseExerciseId;
    if (appState.exerciseVersion === "simplificada") {
      const simplifiedCandidate = `${baseExerciseId}-s`;
      const exists = DADOS.exercicios.some(e => e.id === simplifiedCandidate);
      if (exists) targetId = simplifiedCandidate;
    }

    const ex = DADOS.exercicios.find(e => e.id === targetId) || DADOS.exercicios[0];
    const selectEl = document.getElementById("exerciseSelect");
    if (selectEl) {
      const baseId = targetId.replace(/-s$/, "");
      selectEl.value = baseId;
    }

    document.getElementById("exerciseUnitTag").textContent = ex.unidadeId.toUpperCase();
    document.getElementById("exerciseCompassosTag").textContent = `${ex.totalCompassos} Compassos`;
    document.getElementById("exerciseBpmTag").textContent = ex.andamento || "50–56 BPM";
    document.getElementById("exerciseDisplayTitle").textContent = ex.tituloCompleto;
    document.getElementById("exerciseDescText").textContent = ex.descricao || "";

    const alertBox = document.getElementById("exercisePartialAlert");
    const alertText = document.getElementById("exercisePartialAlertText");
    if (ex.avisoPedagogico) {
      alertBox.style.display = "block";
      alertText.textContent = ex.avisoPedagogico;
    } else {
      alertBox.style.display = "none";
    }

    const tabAsciiEl = document.getElementById("exerciseTabAscii");
    tabAsciiEl.textContent = ex.tablatura || "Tablatura não disponível para esta versão.";

    const eventsSec = document.getElementById("exerciseEventsSection");
    const tbody = document.getElementById("exerciseEventsTbody");
    tbody.innerHTML = "";

    if (ex.eventos && ex.eventos.length > 0) {
      eventsSec.style.display = "block";
      ex.eventos.forEach(ev => {
        const tr = document.createElement("tr");

        function addTd(val) {
          const td = document.createElement("td");
          td.textContent = (val !== undefined && val !== null) ? val : "—";
          tr.appendChild(td);
        }

        addTd(ev.compasso);
        addTd(ev.voz);
        addTd(ev.pulso_inicio || ev.pulso_entrada);
        addTd(ev.duracao_pulsos);
        addTd(ev.altura_spn);
        addTd(`${ev.corda || "—"} / ${ev.casa !== undefined ? ev.casa : "—"}`);
        addTd(`${ev.dedo_mao_esquerda || "—"} / ${ev.dedo_mao_direita || "—"}`);
        addTd(ev.termino_pulso ? `Pulso ${ev.termino_pulso}` : "—");
        addTd(ev.articulacao || ev.descricao || "—");

        tbody.appendChild(tr);
      });
    } else {
      eventsSec.style.display = "none";
    }
  }

  // 9. FONTES E ACERVO
  function renderSourcesView() {
    const container = document.getElementById("sourcesContainer");
    if (!container) return;
    container.innerHTML = "";

    DADOS.fontes.forEach(fonte => {
      const card = document.createElement("article");
      card.className = "source-card";

      const top = document.createElement("div");
      const badge = document.createElement("span");
      badge.className = "badge badge-info";
      badge.textContent = fonte.modulo;
      top.appendChild(badge);

      const title = document.createElement("h3");
      title.className = "source-card-title";
      title.textContent = fonte.titulo;
      top.appendChild(title);

      const status = document.createElement("p");
      status.className = "text-sm";
      const strongStatus = document.createElement("strong");
      strongStatus.textContent = "Status: ";
      status.appendChild(strongStatus);
      status.appendChild(document.createTextNode(fonte.statusVerificacao));
      top.appendChild(status);

      const note = document.createElement("p");
      note.className = "source-card-note";
      note.textContent = fonte.notaPedagogica;
      top.appendChild(note);

      card.appendChild(top);

      const linkContainer = document.createElement("div");
      linkContainer.style.marginTop = "14px";

      if (isSafeUrl(fonte.url)) {
        const a = document.createElement("a");
        a.href = fonte.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "btn btn-outline btn-sm";
        a.textContent = "Abrir no Google Drive ↗";
        linkContainer.appendChild(a);
      }

      card.appendChild(linkContainer);
      container.appendChild(card);
    });
  }

  // 10. DIÁRIO E AVALIAÇÃO
  function setupDiarioView() {
    const formLog = document.getElementById("formLogSession");
    const selectLogSess = document.getElementById("logSessionSelect");
    const dateLog = document.getElementById("logDate");

    if (selectLogSess) {
      selectLogSess.innerHTML = "";
      DADOS.planoEstudo.sessoes.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = `Semana ${s.semana} · Sessão ${s.sessao} — ${s.titulo}`;
        selectLogSess.appendChild(opt);
      });
    }

    if (dateLog && !dateLog.value) {
      dateLog.value = new Date().toISOString().slice(0, 10);
    }

    if (formLog) {
      formLog.addEventListener("submit", (e) => {
        e.preventDefault();
        const novaPratica = {
          id: `log_${Date.now()}`,
          data: document.getElementById("logDate").value,
          sessaoId: document.getElementById("logSessionSelect").value,
          minutos: parseInt(document.getElementById("logMinutes").value, 10) || 40,
          bpm: parseInt(document.getElementById("logBpm").value, 10) || null,
          trecho: document.getElementById("logTrecho").value.trim(),
          melhoria: document.getElementById("logMelhoria").value.trim(),
          dificuldade: document.getElementById("logDificuldade").value.trim(),
          proximaAcao: document.getElementById("logProximaAcao").value.trim()
        };

        appState.progresso.sessoesPraticadas.unshift(novaPratica);
        salvarProgresso();
        alert("✔ Sessão de estudo registrada no diário com sucesso!");
        formLog.reset();
        document.getElementById("logDate").value = new Date().toISOString().slice(0, 10);
        document.getElementById("logMinutes").value = 40;
        updateDashboardStats();
      });
    }

    const formRubric = document.getElementById("formRubricEvaluation");
    const rubricDate = document.getElementById("rubricDate");
    const rubricUnit = document.getElementById("rubricUnitSelect");
    const rubricVer = document.getElementById("rubricVersionSelect");

    if (rubricDate && !rubricDate.value) {
      rubricDate.value = new Date().toISOString().slice(0, 10);
    }

    function updateRubricVersions() {
      const uId = rubricUnit.value;
      rubricVer.innerHTML = "";
      if (uId === "u1") {
        rubricVer.add(new Option("Estudo de 8 Compassos (U1-ESTUDO)", "u1-estudo"));
      } else if (uId === "u2") {
        rubricVer.add(new Option("Ex. 3: 'Primeiro Canto' Completo (8 compassos)", "ex3"));
        rubricVer.add(new Option("Ex. 3-S: 'Primeiro Canto' Simplificado", "ex3-s"));
      } else if (uId === "u3") {
        rubricVer.add(new Option("Ex. 6: Estudo Polifônico com Inversões (8 compassos)", "ex6"));
        rubricVer.add(new Option("Ex. 6-S: Estudo Parcial (4 compassos - Não certifica avanço)", "ex6-s"));
      }
    }

    if (rubricUnit) {
      rubricUnit.addEventListener("change", updateRubricVersions);
      updateRubricVersions();
    }

    if (formRubric) {
      formRubric.addEventListener("submit", (e) => {
        e.preventDefault();

        const contScore = parseInt(document.querySelector("input[name='score_continuidade']:checked")?.value, 10);
        const clarScore = parseInt(document.querySelector("input[name='score_clareza']:checked")?.value, 10);
        const equiScore = parseInt(document.querySelector("input[name='score_equilibrio']:checked")?.value, 10);
        const autoScore = parseInt(document.querySelector("input[name='score_autonomia']:checked")?.value, 10);

        const novaAvaliacao = {
          id: `eval_${Date.now()}`,
          data: document.getElementById("rubricDate").value,
          unidadeId: document.getElementById("rubricUnitSelect").value,
          versao: document.getElementById("rubricVersionSelect").value,
          audioRef: document.getElementById("rubricAudioRef").value.trim(),
          scores: {
            continuidade: contScore,
            clareza: clarScore,
            equilibrio: equiScore,
            autonomia: autoScore
          },
          observacoes: document.getElementById("rubricObservacoes").value.trim()
        };

        appState.progresso.avaliacoes.unshift(novaAvaliacao);
        salvarProgresso();
        alert("✔ Avaliação formal de entrega registrada com sucesso!");
        formRubric.reset();
        document.getElementById("rubricDate").value = new Date().toISOString().slice(0, 10);
        updateRubricVersions();
        updateDashboardStats();
      });
    }

    setupBackupHandlers();
  }

  // 11. MOTOR DE AVANÇO PEDAGÓGICO
  function checkUnitAdvancement(unidadeId) {
    const evals = appState.progresso.avaliacoes.filter(e => e.unidadeId === unidadeId);

    let requiredVersion = "ex3";
    if (unidadeId === "u1") requiredVersion = "u1-estudo";
    if (unidadeId === "u3") requiredVersion = "ex6";

    const tomadasCompletasSucesso = evals.filter(e => {
      const sc = e.scores || {};
      const atingiuNotas = sc.continuidade >= 2 && sc.clareza >= 2 && sc.equilibrio >= 2 && sc.autonomia >= 2;
      const versaoValida = e.versao === requiredVersion;
      return atingiuNotas && versaoValida;
    });

    const datasDistintas = [...new Set(tomadasCompletasSucesso.map(t => t.data))];
    const tomadasParciais = evals.filter(e => e.versao === "ex6-s");

    return {
      unidadeId,
      requiredVersion,
      totalAvaliacoes: evals.length,
      totalTomadasSucesso: tomadasCompletasSucesso.length,
      datasDistintas,
      aprovado: datasDistintas.length >= 2,
      temParcialApenas: tomadasParciais.length > 0 && tomadasCompletasSucesso.length === 0,
      mesmaDataApenas: tomadasCompletasSucesso.length >= 2 && datasDistintas.length === 1
    };
  }

  function renderAdvancementStatus() {
    const container = document.getElementById("advancementStatusBody");
    if (!container) return;
    container.innerHTML = "";

    const activeUnits = ["u1", "u2", "u3"];

    activeUnits.forEach(uId => {
      const u = DADOS.planoEstudo.unidades.find(item => item.id === uId);
      const res = checkUnitAdvancement(uId);

      const box = document.createElement("div");
      box.className = "card";
      box.style.marginBottom = "18px";

      const header = document.createElement("div");
      header.className = "card-header flex-between";

      const h4 = document.createElement("h4");
      h4.textContent = `Unidade ${u.numero}: ${u.titulo}`;
      header.appendChild(h4);

      const badge = document.createElement("span");
      if (res.aprovado) {
        badge.className = "badge badge-success";
        badge.textContent = "✔ Avanço Sugerido";
      } else if (res.datasDistintas.length === 1) {
        badge.className = "badge badge-accent";
        badge.textContent = "1 de 2 tomadas concluída";
      } else {
        badge.className = "badge";
        badge.textContent = "Pendente";
      }
      header.appendChild(badge);
      box.appendChild(header);

      const body = document.createElement("div");
      body.className = "card-body";

      const pParecer = document.createElement("p");
      if (res.aprovado) {
        pParecer.innerHTML = `<strong>Status Oficial:</strong> Parabéns! Você demonstrou estabilidade na entrega oficial (versão <code>${res.requiredVersion}</code>) com nota mínima 2 em todas as 4 dimensões em duas datas distintas (${res.datasDistintas.join(" e ")}). O avanço pedagógico está plenamente liberado.`;
      } else if (res.mesmaDataApenas) {
        pParecer.innerHTML = `<strong>Atenção da Rubrica:</strong> Você possui ${res.totalTomadasSucesso} tomadas com notas ≥ 2 registradas na data <code>${res.datasDistintas[0]}</code>. Pela regra oficial do Codex, <em>duas tomadas no mesmo dia não bastam</em> para certificar avanço. É obrigatório repetir a gravação em outro dia para comprovar permanência motora.`;
      } else if (res.datasDistintas.length === 1) {
        pParecer.innerHTML = `<strong>Progresso:</strong> 1 tomada oficial bem-sucedida registrada em <code>${res.datasDistintas[0]}</code>. Realize uma segunda tomada em data posterior para atingir o critério de avanço.`;
      } else if (res.temParcialApenas) {
        pParecer.innerHTML = `<strong>Aviso de Versão:</strong> Há registros na versão simplificada <code>ex6-s</code> (4 compassos). Esta versão é uma preparação parcial de estudo e <em>não atende à entrega final da Unidade 3</em>, que exige os 8 compassos integrais de <code>ex6</code>.`;
      } else {
        pParecer.textContent = "Nenhuma avaliação oficial com nota ≥ 2 em todas as 4 dimensões registrada para esta unidade até o momento.";
      }
      body.appendChild(pParecer);

      box.appendChild(body);
      container.appendChild(box);
    });
  }

  // 12. HISTÓRICO COM SEGURANÇA TEXTCONTENT (XSS)
  function renderHistory() {
    const container = document.getElementById("historyEntriesContainer");
    const filterSelect = document.getElementById("filterHistoryUnit");
    if (!container) return;

    container.innerHTML = "";
    const filterUnit = filterSelect ? filterSelect.value : "all";

    const itens = [];
    appState.progresso.sessoesPraticadas.forEach(s => itens.push({ tipo: "pratica", data: s.data, item: s }));
    appState.progresso.avaliacoes.forEach(a => itens.push({ tipo: "avaliacao", data: a.data, item: a }));

    itens.sort((a, b) => (b.data || "").localeCompare(a.data || ""));

    const itensFiltrados = itens.filter(entry => {
      if (filterUnit === "all") return true;
      if (entry.tipo === "pratica") {
        const sObj = DADOS.planoEstudo.sessoes.find(s => s.id === entry.item.sessaoId);
        return sObj && sObj.unidadeId === filterUnit;
      }
      if (entry.tipo === "avaliacao") {
        return entry.item.unidadeId === filterUnit;
      }
      return true;
    });

    if (itensFiltrados.length === 0) {
      const p = document.createElement("p");
      p.className = "text-muted";
      p.textContent = "Nenhum registro encontrado para este filtro.";
      container.appendChild(p);
      return;
    }

    itensFiltrados.forEach(entry => {
      const card = document.createElement("div");
      card.className = "history-entry-card";

      const header = document.createElement("div");
      header.className = "flex-between";

      const badge = document.createElement("span");
      badge.className = `badge ${entry.tipo === "avaliacao" ? "badge-accent" : "badge-info"}`;
      badge.textContent = entry.tipo === "avaliacao" ? "Avaliação de Entrega" : "Sessão Praticada";

      const dateSpan = document.createElement("span");
      dateSpan.className = "text-muted text-sm";
      dateSpan.textContent = entry.data;

      header.appendChild(badge);
      header.appendChild(dateSpan);
      card.appendChild(header);

      const body = document.createElement("div");
      body.style.marginTop = "8px";

      if (entry.tipo === "pratica") {
        const s = entry.item;
        const sObj = DADOS.planoEstudo.sessoes.find(item => item.id === s.sessaoId);

        const pTitle = document.createElement("p");
        pTitle.style.fontWeight = "600";
        pTitle.textContent = sObj ? `${sObj.tituloCompleto} (${s.minutos} min)` : `Sessão: ${s.sessaoId} (${s.minutos} min)`;
        body.appendChild(pTitle);

        function addSafeText(label, txt) {
          if (!txt) return;
          const p = document.createElement("p");
          p.className = "text-sm";
          const strong = document.createElement("strong");
          strong.textContent = label + ": ";
          p.appendChild(strong);
          p.appendChild(document.createTextNode(txt));
          body.appendChild(p);
        }

        addSafeText("Trecho prioritário", s.trecho);
        addSafeText("BPM pessoal", s.bpm ? `${s.bpm} BPM` : null);
        addSafeText("O que funcionou", s.melhoria);
        addSafeText("Dificuldade principal", s.dificuldade);
        addSafeText("Próxima ação concreta", s.proximaAcao);
      } else if (entry.tipo === "avaliacao") {
        const a = entry.item;
        const sc = a.scores || {};

        const pTitle = document.createElement("p");
        pTitle.style.fontWeight = "600";
        pTitle.textContent = `Avaliação: ${a.unidadeId.toUpperCase()} • Versão: ${a.versao}`;
        body.appendChild(pTitle);

        const pScores = document.createElement("p");
        pScores.className = "text-sm";
        pScores.textContent = `Pontuação: Continuidade = ${sc.continuidade}/3 | Som = ${sc.clareza}/3 | Equilíbrio = ${sc.equilibrio}/3 | Autonomia = ${sc.autonomia}/3`;
        body.appendChild(pScores);

        if (a.audioRef) {
          const pAudio = document.createElement("p");
          pAudio.className = "text-sm";
          pAudio.appendChild(document.createTextNode(`Áudio de referência: ${a.audioRef}`));
          body.appendChild(pAudio);
        }

        if (a.observacoes) {
          const pObs = document.createElement("p");
          pObs.className = "text-sm";
          pObs.appendChild(document.createTextNode(`Observações: ${a.observacoes}`));
          body.appendChild(pObs);
        }
      }

      card.appendChild(body);
      container.appendChild(card);
    });

    if (filterSelect) {
      filterSelect.onchange = renderHistory;
    }
  }

  // 13. BACKUP JSON
  function setupBackupHandlers() {
    const btnExport = document.getElementById("btnExportJson");
    const fileInput = document.getElementById("importJsonFile");
    const previewBox = document.getElementById("importPreviewBox");
    const previewText = document.getElementById("importPreviewText");
    const btnMerge = document.getElementById("btnConfirmMerge");
    const btnReplace = document.getElementById("btnConfirmReplace");

    let dadosImportadosTemp = null;

    if (btnExport) {
      btnExport.addEventListener("click", () => {
        const payload = {
          versao_backup: 1,
          data_exportacao: new Date().toISOString(),
          curso: "Curso de Violão — Método Tríade",
          dados: {
            progresso: appState.progresso,
            catalogoAssistidos: [...appState.catalogoAssistidos],
            catalogoPraticados: [...appState.catalogoPraticados]
          }
        };

        const jsonStr = JSON.stringify(payload, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup_metodo_triade_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            if (!parsed || typeof parsed !== "object") {
              throw new Error("Formato JSON inválido.");
            }

            const dadosCorpo = parsed.dados || parsed;
            const prog = dadosCorpo.progresso || dadosCorpo;

            if (!Array.isArray(prog.sessoesPraticadas) || !Array.isArray(prog.avaliacoes)) {
              throw new Error("Estrutura do arquivo de backup não reconhecida.");
            }

            dadosImportadosTemp = dadosCorpo;
            previewBox.style.display = "block";
            previewText.textContent = `Arquivo válido! Contém ${prog.sessoesPraticadas.length} sessões praticadas e ${prog.avaliacoes.length} avaliações de entrega. Escolha como deseja aplicar:`;
          } catch (err) {
            alert(`Erro ao ler backup: ${err.message}`);
            previewBox.style.display = "none";
            dadosImportadosTemp = null;
          }
        };
        reader.readAsText(file, "UTF-8");
      });
    }

    if (btnMerge) {
      btnMerge.addEventListener("click", () => {
        if (!dadosImportadosTemp) return;
        const prog = dadosImportadosTemp.progresso || dadosImportadosTemp;
        
        const existingSessIds = new Set(appState.progresso.sessoesPraticadas.map(s => s.id));
        prog.sessoesPraticadas.forEach(s => {
          if (!existingSessIds.has(s.id)) appState.progresso.sessoesPraticadas.push(s);
        });

        const existingEvalIds = new Set(appState.progresso.avaliacoes.map(a => a.id));
        prog.avaliacoes.forEach(a => {
          if (!existingEvalIds.has(a.id)) appState.progresso.avaliacoes.push(a);
        });

        if (Array.isArray(dadosImportadosTemp.catalogoAssistidos)) {
          dadosImportadosTemp.catalogoAssistidos.forEach(id => appState.catalogoAssistidos.add(id));
        }
        if (Array.isArray(dadosImportadosTemp.catalogoPraticados)) {
          dadosImportadosTemp.catalogoPraticados.forEach(id => appState.catalogoPraticados.add(id));
        }

        salvarProgresso();
        salvarCatalogoTracking();
        alert("✔ Dados mesclados com sucesso!");
        previewBox.style.display = "none";
        fileInput.value = "";
        dadosImportadosTemp = null;
        updateDashboardStats();
        renderAdvancementStatus();
        renderHistory();
      });
    }

    if (btnReplace) {
      btnReplace.addEventListener("click", () => {
        if (!dadosImportadosTemp) return;
        const confirmacao = window.confirm("ATENÇÃO: Deseja realmente SUBSTITUIR todos os seus dados atuais pelo arquivo importado?");
        if (!confirmacao) return;

        const prog = dadosImportadosTemp.progresso || dadosImportadosTemp;
        appState.progresso.sessoesPraticadas = prog.sessoesPraticadas;
        appState.progresso.avaliacoes = prog.avaliacoes;
        if (prog.ultimaSessaoId) {
          appState.progresso.ultimaSessaoId = prog.ultimaSessaoId;
          appState.currentSessionId = prog.ultimaSessaoId;
        }

        if (Array.isArray(dadosImportadosTemp.catalogoAssistidos)) {
          appState.catalogoAssistidos = new Set(dadosImportadosTemp.catalogoAssistidos);
        }
        if (Array.isArray(dadosImportadosTemp.catalogoPraticados)) {
          appState.catalogoPraticados = new Set(dadosImportadosTemp.catalogoPraticados);
        }

        salvarProgresso();
        salvarCatalogoTracking();
        alert("✔ Dados substituídos com sucesso!");
        previewBox.style.display = "none";
        fileInput.value = "";
        dadosImportadosTemp = null;
        updateDashboardStats();
        renderAdvancementStatus();
        renderHistory();
      });
    }
  }

  // 14. INICIALIZAÇÃO GERAL
  function init() {
    console.log("Inicializando Curso de Violão — Método Tríade (Offline)...");
    carregarDadosLocais();
    setupNavigation();
    setupTimer();
    updateDashboardStats();
    setupCatalogControls();
    setupSessionView();
    setupExerciseView();
    setupDiarioView();

    // Carregar primeira sessão
    carregarSessaoNoCard(appState.currentSessionId);
    console.log("Aplicação pronta!");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
