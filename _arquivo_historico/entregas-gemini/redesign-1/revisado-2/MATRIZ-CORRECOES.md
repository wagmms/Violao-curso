# MATRIZ DE CORREÇÕES — Redesign-1 / revisado-2

| ID | Arquivo | Localização | Bug Raiz | Correção | Testável |
|----|---------|-------------|----------|----------|----------|
| P1-1 | `app.js` | `obterRecomendacao` (~L323) | `ativEscolhida` inacessível no path de manutenção | `let` no escopo da função; acessível em todos os paths | Sim — todas 6 habilidades demonstradas não lança erro |
| P1-2 | `app.js` | `abrirModalResultado` (~L1395) | preparacao/variacao consumiam revisão | Early return para preparacao e variacao antes da lógica de revisão | Sim — registrar preparacao não cria nova revisão |
| P1-3 | `app.js` | `salvarEstado`, `atualizarTimer`, `iniciarOuRetomarSessao`, btn-iniciar-ativ | `elapsedMs` não consolidado antes de salvar; dupla contagem no tick; minutos atribuídos à atividade errada na troca | `salvarEstado` captura delta live; `atualizarTimer` usa `currentMs` local; pausar consolida; trocar atividade cria nova sessão | Sim — iniciar 5 min, reload, verificar elapsed ≈ 5 min |
| P1-4 | `app.js` | `obterRecomendacao` | Escolha ativa antes de sessão pausada | Reordenado: pausada → recuperação → revisão → escolha → sequência | Sim — criar sessão pausada, mudar ativ escolhida: recomenda a pausada |
| P1-5 | `app.js` | `abrirModalResultado` | Modal sem critério verificável por nível | Texto de critério inserido dinamicamente por nível antes do select | Sim — abrir modal em preparacao/alvo/variacao e verificar texto |
| P1-6 | `app.js` | `validarEsquemaBackup` (~L148) | Aceita BPM -100, ciclo "abc", dataPrevista como objeto, IDs duplicados, Infinity | Regex de data, Set de IDs, isFinite, faixas numéricas, status válidos | Sim — importar JSON com BPM -100 → erro |
| P1-7 | `app.js` | `processarArquivoBackup` | Sobrescreve notas locais, duplica revisões | Local-wins: arquivo só adiciona IDs novos; notas locais prevalecem | Sim — importar 2x o mesmo backup: resultado idêntico |
| P1-8 | `app.js` | `processarArquivoBackup` | Backup reabre revisão concluída | Revisão concluída localmente não é substituída pelo arquivo | Sim — concluir revisão, importar backup com ela aberta: permanece concluída |
| P1-9 | `dados-atividades.js` | `ativ-6`, `alvo.tablatura` e `variacao` | c.4 sem baixo no t.3; durações melódicas ausentes; variacao rearticula corda 3 | Baixo c.4 t.1 e t.3; durações explícitas em preparacao; variacao usa cordas D/A | Musical |
| P1-10 | `dados-atividades.js` | `ativ-3`, `variacao` | Baixo da variação sem pausas e durações próprias | Duas vozes independentes com pausa `[𝄽]` explícita no baixo | Musical |
| P1-11 | `dados-atividades.js` | `ativ-5`, `exercicio.compasso` | "3/4 ou 4/4" ambíguo | `"4/4"` fixo; instrucoes esclarecem que arpejo é livre de compasso obrigatório | Musical |
| P1-12 | `dados-atividades.js` | `ativ-1`, preparacao e alvo | Sustentação/silêncio por voz não especificados | Duração e sustentação por voz adicionadas em descrição e tablatura | Musical |
| P1-13 | `app.js` | `treinoOuvido`, `renderizarFerramentaInterativa`, `checarRespostaIntervalo`, `avancarPerguntaTreinoOuvido` | Série não por nível; reiniciar não restaura botão; áudio conta tentativa | Estado com campo `nivel`; reinício por troca de nível; áudio não aciona checar; `reiniciarTreinoOuvido` restaura botão | Sim — trocar nível: série reinicia; ouvir e clicar errado: acertos fixos |
| P1-14 | `estilo.css` | `.layout-container`, `.step-detalhes`, `.step-titulo` | Transbordamento a 375px; overflow-x global | `min-width: 0`, `flex-wrap: wrap`, remoção de `overflow-x: hidden` global | Sim — DevTools 375px: stepper não transborda |
