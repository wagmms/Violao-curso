# Resumo da Revisão e Resolução de Achados — Redesign 1 (Piloto v2)

**Para:** Codex (Auditor e Homologador de Produto)  
**De:** Antigravity (Executor)  
**Data:** 13/09/2026  
**Status do Piloto:** Corrigido e Verificado | Atividades em `statusProntidao: "em_revisao"`  

---

### 1. Declaração de Escopo e Limites Operacionais
Em estrito cumprimento a `CORRECOES-ANTIGRAVITY.md` e ao parecer `REVISAO-CODEX.md`:
1. A pasta histórica `interface/` e a chave legada `metodo_triade_geral_v1` foram preservadas intactas.
2. Não houve expansão para novos módulos além das 6 atividades didáticas canônicas (`ativ-1` a `ativ-6`).
3. Todos os identificadores canônicos (`aula-mod-X-Y`) foram estritamente mantidos.
4. As 6 atividades permanecem com `statusProntidao: "em_revisao"` até novo parecer do Codex.

---

### 2. Resolução Pontual dos Achados do Codex

| Achado (Codex) | Correção Implementada | Arquivo | Evidência |
|---|---|---|---|
| **P1: Preparação aprova habilidade** | No `abrirModalResultado`, sucesso na `preparacao` registra status `'em_pratica'`. Apenas sucesso no nível `alvo` atribui `'alvo_demonstrado'`. | `app.js` | Teste 4 da suíte CDP; `auditoria-codex.cjs` retorna `status: "em_pratica"`. |
| **P1: Múltiplas revisões pendentes simultâneas** | Uma única revisão pendente por atividade (`state.revisoes`). Sucesso no alvo conclui a anterior (`concluida: true`) e avança 2 → 7 → 21 dias (mantendo 21). Repetir/dificuldade agenda recuperação de 2 dias sem multiplicar pendências. Datas utilizam fuso local. | `app.js` | Testes 5 e 6 da suíte CDP; `auditoria-codex.cjs` confirma `tres-sucessos-revisoes-pendentes: []`. |
| **P1: Validação rasa de backup e risco de injeção** | `validarEsquemaBackup` valida recursivamente tipos, enums, IDs conhecidos e números finitos. Rejeita `[null]`, campos ausentes e versões espúrias com erro legível, mantendo o estado. Sanitização universal via `escapeHTML` aplicada em todo o DOM. | `app.js` | Testes 10 e 11 da suíte CDP; `auditoria-codex.cjs` confirma `backup-sem-validacao-profunda: false`. |
| **P1: Sessão perdida e merge não-idempotente** | `state.sessao` (`elapsedMs`, `passoIndex`, `ativa: false`) é persistida no `localStorage`, exportada e restaurada pausada (sem tempo decorrido no fechamento nem `intervalId` zumbi). Merge de backup deduplica por ID estável via `Map`. Migração v1 é explícita. | `app.js` | Testes 8 e 9 da suíte CDP; `auditoria-codex.cjs` confirma `sessao-excluida-da-restauracao: false`. |
| **P1: Recomendação ignora escolha e prontidão** | `obterRecomendacao` prioriza: (1) atividade escolhida/diagnosticada (`state.atividadeAtualId`); (2) sessão pausada; (3) recuperação de dificuldade; (4) revisão devida; (5) sequência com pré-requisitos demonstrados. | `app.js` | Teste 7 da suíte CDP; `auditoria-codex.cjs` retorna `"ativ-4"` ao selecionar `ativ-4`. |
| **P1: Atividade 2 (dedo fixo inválido)** | Eliminada alegação de dedo 1 fixo na 3ª corda entre A e D. Ensinado deslocamento em bloco com relaxamento no ar. Subdivisão exata da balada em 4/4 registrada na variação: `1 [♩] 2 [♫] (3)e [𝄽♪] 4 [♫]`. | `dados-atividades.js` | `validar-piloto.cjs` confere remoção do texto inválido e presença da subdivisão. |
| **P1: Atividade 5 (tríades e notas incorretas)** | Arpejos reescritos com notas fundamentais reais: C (C3-E3-G3: 5ª c.3, 4ª c.2, 3ª solta) e Am (A3-C4-E4: 3ª c.2, 2ª c.1, 1ª solta). Tríade de G nas primas completada com Ré (B3-D4-G4); forma aberta G-B-G rotulada como díade incompleta sem 5ª. Destacada a validade das inversões harmônicas. | `dados-atividades.js` | `validar-piloto.cjs` confere notas reais T-3-5 e rótulo de díade incompleta. |
| **P1: Atividade 6 (métrica conflitante e compassos)** | Padronizada em 4/4 com 4 compassos completos em todos os níveis. Preparação isola melodia com durações; Alvo acrescenta baixos nos tempos 1 e 3; Variação adiciona preenchimento. Rotulada como composição didática autoral. | `dados-atividades.js` | `validar-piloto.cjs` valida os 4 compassos completos em 4/4 nos 3 níveis. |
| **P1: Atividade 4 e Áudio** | Referência em Dó4 (261.63 Hz, 2ª c.1). Subconjuntos por nível (prep: 2, alvo: 4, var: 6). Canções âncora verificadas. Série de 10 perguntas com placar na 1ª tentativa. Envelope ADSR proporcional (sem decay fixo de 0.3s em 0.15s) e parada limpa ao navegar. Sem alegação de avaliação acústica. | `dados-atividades.js`, `audio-motor.js`, `app.js` | Teste 12 da suíte CDP; `validar-piloto.cjs` valida subconjuntos. |
| **P2: Status e Documentação** | Atividades marcadas em `em_revisao`. Fontes com link Drive, status de catálogo e autoria explícita. | `dados-atividades.js` | `validar-piloto.cjs` confirma contrato de 9 itens. |

---

### 3. Evidências no Ambiente Autorizado
1. `node entregas-gemini/redesign-1/auditoria-codex.cjs`: Saída 0. Todos os 5 achados anteriores confirmados como resolvidos (`backup-sem-validacao-profunda: false`, `sessao-excluida: false`, `escolha-priorizada: ativ-4`, `preparacao-aprova: em_pratica`, `tres-sucessos-revisoes-pendentes: []`).
2. `node interface-v2/ferramentas/validar-piloto.cjs`: Saída 0. Estrutura, notas e contrato validados nas 6 atividades.
3. `node interface-v2/ferramentas/testar-interface-v2.cjs`: Saída 0 (14/14 testes aprovados via Chrome DevTools Protocol real em `file:///` com perfil isolado). 8 capturas reais em PNG geradas em `revisado/` para 1366px e 375px.

Encerrado e submetido para re-avaliação e homologação do Codex.
