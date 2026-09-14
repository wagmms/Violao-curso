# VERIFICAÇÃO — Redesign-1 / revisado-2

## Como Verificar

### 1. Verificação Node.js (Sintaxe)

```bash
node --check interface-v2/app.js
node --check interface-v2/dados-atividades.js
```
Resultado esperado: nenhuma saída de erro (exit code 0).

### 2. Verificação Estática (Abrir em Navegador)

1. Abrir `interface-v2/index.html` com duplo clique (file://)
2. Abrir DevTools → Console: nenhum erro JavaScript deve aparecer na carga
3. Navegar pelas 5 telas (Hoje, Aprender, Praticar, Progresso, Biblioteca): sem erros

### 3. Verificação via Navegador — Casos P1

| Caso | Passos | Resultado Esperado |
|------|--------|-------------------|
| **P1-1** | Marcar todos 6 alvos demonstrados via `window.__APP_TEST_API.setState(...)`, chamar `obterRecomendacao()` | Retorna manutenção sem lançar `ativEscolhida is not defined` |
| **P1-2** | Registrar sucesso em `preparacao` de ativ-1 | Nenhuma revisão criada em `state.revisoes` |
| **P1-2** | Registrar sucesso em `variacao` de ativ-2 | Nenhuma revisão criada em `state.revisoes` |
| **P1-3** | Iniciar timer, aguardar 30s, reload da página | `state.sessao.elapsedMs` ≈ 30.000 (dentro de margem de 1s) |
| **P1-3** | Iniciar ativ-1, aguardar 1 min, trocar para ativ-2 | `state.sessao.elapsedMs` ≈ 0 (nova sessão para ativ-2) |
| **P1-4** | Criar sessão pausada com `elapsedMs > 0`, selecionar `atividadeAtualId` diferente | `obterRecomendacao()` retorna a sessão pausada |
| **P1-5** | Abrir modal de resultado em nível `preparacao` | Texto "progresso parcial; não aprova o Alvo" visível acima do select |
| **P1-6** | Importar `{"versao":2,...,"tentativas":[{"bpm":-100,...}]}` | Alert de erro: "BPM inválido na tentativa: -100" |
| **P1-6** | Importar JSON com IDs duplicados em `tentativas` | Alert de erro: "ID de tentativa duplicado: ..." |
| **P1-7** | Importar mesmo backup 2x | Segunda importação mostra "0 tentativas novas" e resultado idêntico |
| **P1-8** | Concluir revisão localmente, importar backup com ela aberta | Revisão permanece concluída localmente |
| **P1-13** | Na atividade 4, trocar nível (Preparação → Alvo) | Pergunta reinicia em 1 de 10, acertos = 0 |
| **P1-13** | Clicar em "Ouvir Pergunta" 3x sem responder | Contador de acertos permanece igual |
| **P1-13** | Completar 10 perguntas, clicar "Reiniciar Série" | Botão "Próxima Pergunta →" reaparece, acertos = 0 |
| **P1-14** | DevTools: simular viewport 375px | Stepper não transborda horizontalmente; título e minutos quebram a linha |

### 4. Verificação Musical (Requer Revisor Humano)

| ID | O que verificar |
|----|-----------------|
| P1-9 | Ativ-6 alvo c.4: 2 ataques de baixo (t.1 e t.3); melodia sustentada 4 tempos sem re-ataque |
| P1-9 | Ativ-6 variacao: nenhuma articulação na corda 3 enquanto melodia sustenta; preenchimento apenas cordas D/A |
| P1-9 | Ativ-6 preparacao: durações corretas para todos os compassos (semínimas c.1; mínimas c.2/c.3; semibreve c.4) |
| P1-10 | Ativ-3 variacao: polegar pausa nos tempos 2 e 4; melodia mantém ritmo próprio sem depender do baixo |
| P1-11 | Ativ-5: campo compasso "4/4"; instrucoes esclarecem que arpejo é analítico sem preenchimento obrigatório |
| P1-12 | Ativ-1 preparacao: duração "1 tempo (semínima)" explícita; ativ-1 alvo: sobreposição p+i explicada |

### 5. Não Verificado / Fora do Escopo deste Ciclo

- Teste de regressão em `audio-motor.js` (sem alterações nesse arquivo)
- `dados-catalogo.js` (sem alterações)
- Testes de acessibilidade (ARIA)
- Teste em dispositivos iOS/Safari
- Novas funções de aprendizagem (Lote B — pós-homologação do piloto)
