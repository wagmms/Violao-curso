# RESUMO DE REVISÃO — Redesign-1 / revisado-2

**Data:** 2026-09-13  
**Agente:** Antigravity  
**Arquivos editados:** `interface-v2/app.js`, `interface-v2/dados-atividades.js`, `interface-v2/estilo.css`  
**Referência:** `entregas-gemini/redesign-1/revisado/REVISAO-CODEX.md`

---

## Correções Aplicadas

### P1-1 — `ativEscolhida` fora do escopo
`obterRecomendacao` declarava `ativEscolhida` com `const` dentro do `if`, mas a usava no caminho de fallback (caso 6 — manutenção). Corrigido: variável declarada com `let` no topo da função, acessível em todos os caminhos de retorno.

### P1-2 — Modal de resultado misturava prática e revisão
`abrirModalResultado` consumia revisão pendente em qualquer resultado de qualquer nível. Corrigido: `preparacao` e `variacao` encerram cedo (early return) sem tocar na agenda de revisão. Apenas resultado do nível Alvo avança ou reprograma o ciclo.

### P1-3 — Timer não consolidava bloco ativo ao salvar
`salvarEstado` persistia `elapsedMs` do estado sem capturar o delta do intervalo ativo. `atualizarTimer` acumulava no state causando dupla contagem. Corrigido: `salvarEstado` calcula `elapsedParaSalvar` capturando o delta live antes de serializar; `atualizarTimer` calcula `currentMs` localmente sem modificar state a cada tick; `iniciarOuRetomarSessao` consolida elapsed antes de pausar; troca de atividade via Praticar cria novo session ID e reseta elapsed.

### P1-4 — Prioridade de recomendação incorreta
A escolha ativa (`ativ !== ativ-1`) tinha prioridade permanente sobre sessão pausada. Reordenado para: sessão pausada → recuperação (dificuldade) → revisão vencida → escolha explícita → próxima da sequência → manutenção.

### P1-5 — Modal de resultado não mostrava critério verificável
Modal não diferenciava critérios por nível. Corrigido: texto do critério inserido dinamicamente no modal antes do select, com frases distintas para preparação ("progresso parcial; não aprova o Alvo"), variação ("opcional; não afeta revisão") e alvo (usa `criterioSaida` da atividade).

### P1-6 — `validarEsquemaBackup` aceitava valores inválidos
Corrigido: adicionadas verificações de unicidade de IDs (tentativas, dificuldades, revisões), faixas numéricas explícitas (BPM ≥ 0 ≤ 300, `isFinite`), formato de data YYYY-MM-DD via regex, status de habilidade em conjunto fechado, `intervaloDias` em `{2, 7, 21}` com `isFinite`, `dataPrevista` como string de data válida, `passoIndex` com limite, `elapsedMs` com `isFinite` e limite de 2.400.000, campo `legado.notas` como objeto (não array/null).

### P1-7 — Merge silencioso sobrescrevia notas locais / duplicava revisões
Corrigido: política local-wins para `habilidades`, `legado.notas`, dificuldades e tentativas existentes (arquivo não sobrescreve registros já presentes por ID). Revisões: se ID já existe e local está concluída, não reabre.

### P1-8 — Backup de datas diferentes podia reabrir revisão concluída
Corrigido: revisão localmente `concluida: true` não é substituída pelo arquivo mesmo que o arquivo tenha `concluida: false`. Sessão ativa local não é substituída pela sessão do arquivo. Input de arquivo limpo após importação (permite reimport idempotente). Confirmação exibe resumo das diferenças antes de aplicar.

### P1-9 — Atividade 6: baixo c.4 incompleto e variação invadia melodia
Alvo: c.4 agora tem baixo Dó nos tempos 1 **e** 3 (dois ataques, como os demais compassos); melodia c.4 explicitada como semibreve (4 tempos, sem re-ataque). Preparação: durações melódicas anotadas explicitamente para todos os compassos. Variação: preenchimento harmônico restrito às cordas 4 (D) e 5 (A); corda 3 (G, usada pela melodia) não é rearticada.

### P1-10 — Atividade 3: variação sem duração/pausas do baixo
Variação reescrita como duas vozes verdadeiramente independentes: voz alta (corda 1, i/m) mantém ritmo do Alvo com pausas abafadas; voz baixo (corda 6, p) em semínimas nos tempos 1 e 3 com pausa de semínima **explícita** (`[𝄽]`) nos tempos 2 e 4. Legenda e descrição esclarecem independência das vozes.

### P1-11 — Atividade 5: compasso ambíguo "3/4 ou 4/4"
Campo `compasso` alterado para `"4/4"`. Campo `contagem` e `instrucoes` esclarecem que o exercício é analítico (pulso livre de referência), sem obrigação de preencher 4 tempos por arpejo.

### P1-12 — Atividade 1: sustentação/silêncio por voz não especificados
Preparação e Alvo: durações e sustentação de cada voz adicionadas explicitamente na tablatura e descrição. Encerramento especificado com gesto de abafamento por voz.

### P1-13 — Treinador auditivo: série não armazenada por nível; reiniciar não restaurava botão; áudio repetido contava tentativa
Série agora armazenada com campo `nivel`; ao trocar de nível, a série reinicia. Áudio (ouvir tônica / ouvir pergunta / harmônico) não aciona `checarRespostaIntervalo`. `checarRespostaIntervalo` guarda primeira resposta no `historico[]` e previne pontuação após série encerrada. Ao concluir, botões de resposta são desabilitados. `reiniciarTreinoOuvido` restaura o botão "Próxima Pergunta →" corretamente.

### P1-14 — CSS: `.step-detalhes` transbordava a 375px; `overflow-x: hidden` global
`.step-detalhes` recebeu `min-width: 0` e `overflow: hidden`; `.step-titulo` recebeu `flex-wrap: wrap` e `gap: 4px` para quebrar linha em viewport estreita. `overflow-x: hidden` removido do `.layout-container` (comentado com explicação); `.tablatura-container` já possui `overflow-x: auto` próprio.

---

## Status
Todas as 14 correções P1 aplicadas. Aguardando validação técnica e revisão musical do Codex.
