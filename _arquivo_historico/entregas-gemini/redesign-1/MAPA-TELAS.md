# Mapa de Telas e Arquitetura de Navegação — Redesign 1 (Piloto v2 Revisado)

Este documento especifica a arquitetura de informação, fluxos de navegação, comportamento de componentes, estados de interface e regras de interação do ambiente de aprendizagem de violão implementado em `interface-v2/index.html`.

---

## 1. Visão Geral da Arquitetura

O ambiente adota uma arquitetura centrada na **rotina ativa de estudo semanal (3 a 4 sessões de 40 minutos)**, estruturada em 5 áreas funcionais:

```
                          [ Topo da Aplicação ]
          Status da Sessão Diária | Timer 40:00 (Iniciar / Pausar / Reiniciar)
                                     │
      ┌──────────────┬───────────────┼──────────────┬───────────────┐
      ▼              ▼               ▼              ▼               ▼
  [ 1. HOJE ]  [ 2. APRENDER ]  [ 3. PRATICAR ]  [ 4. PROGRESSO ]  [ 5. BIBLIOTECA ]
  (Recomendação  (Sessão Guiada  (Central dos     (Caderno de       (Acervo Geral
   e Início de    em 6 Passos e   6 Exercícios     Dificuldades,     300 Aulas
   40 Minutos)    Ferramentas)    nos 3 Níveis)    Revisão e Backup) do Drive)
```

---

## 2. Mapa Detalhado de Telas e Comportamentos

### 2.1. Tela 1: Hoje (`#view-hoje`)
- **Propósito**: Eliminar a paralisia de escolha. O estudante abre a aplicação e encontra a atividade ideal para sua sessão de 40 minutos, selecionada por regras determinísticas transparentes.
- **Hierarquia do Motor de Recomendação**:
  1. *Atividade Escolhida pelo Aluno*: Se selecionou ou diagnosticou uma atividade específica (ex: `ativ-4`) e o alvo ainda não foi demonstrado.
  2. *Retomada de Sessão*: Sessão pausada com tempo decorrido (`elapsedMs > 0`).
  3. *Recuperação*: Dificuldade aberta no Caderno de Dificuldades (sugere prática em nível de Preparação).
  4. *Revisão Espaçada*: Revisão do ciclo (2, 7 ou 21 dias) com data prevista para hoje ou anterior.
  5. *Sequência Curricular*: Próxima atividade da trilha com pré-requisitos demonstrados.
- **Componentes**:
  - *Cartão Herói de Prática do Dia*: Título, meta observável, justificativa explícita de recomendação e tempo estimado (40 min).
  - *Botão Primário de Ação*: `[⏱ Começar meus 40 minutos]` — inicia imediatamente o temporizador regressivo e direciona para a tela Aprender.
  - *Botão Secundário*: `[Ajustar Nível (Diagnóstico)]` — abre o modal de calibragem inicial.
  - *Grade de Alternativas*: Atalhos para retomar sessão pausada, abrir o Caderno de Dificuldades ou explorar o acervo.
- **Adaptação Responsiva**: No computador (1366px), grade horizontal de metadados; no celular (375px), empilhamento vertical com botão primário em largura total.

### 2.2. Tela 2: Aprender (`#view-aprender`)
- **Propósito**: Execução focada da aula nos blocos de tempo planejados.
- **Estrutura Desktop (Duas Colunas)**:
  - *Coluna Esquerda (Instrução e Roteiro)*:
    - Fita de Passos (Stepper) da sessão de 40 min:
      1. Preparar (3 min): postura e afinação.
      2. Recuperar (5 min): toque livre e revisão prévia.
      3. Explicar e Ouvir (7 min): conceito central e modelo auditivo.
      4. Prática Dirigida (15 min): execução dos 3 níveis progressivos.
      5. Aplicação Musical (7 min): contexto musical ou cadência real.
      6. Registro (3 min): autoavaliação e anotações.
    - Bloco de Explicação Teórica com termos definidos no ponto de uso.
    - Bloco de Fontes do Acervo: links seguros para o Google Drive (`https://drive.google.com/...`), status de verificação da fonte (`catalogado`) e declaração de autoria explícita.
  - *Coluna Direita (Exercício Visual e Ferramentas Interativas)*:
    - Seletor dos 3 níveis: `[1. Preparação]`, `[2. Alvo Principal]`, `[3. Variação / Desafio]`.
    - Contêiner de Partitura/Tablatura em fonte mono de alto contraste com contagem e digitação indicada.
    - Dica de execução e ponto de foco.
    - Painel Interativo Contextual:
      - Atividades 1, 2, 3, 5, 6: **Metrônomo Web Audio** com slider de BPM (40-180), contagem inicial e indicação visual de pulsos por dots dinâmicos.
      - Atividade 4: **Treinador de Ouvido** com série formal de 10 perguntas, subconjuntos de intervalos por nível (2 na preparação, 4 no alvo, 6 na variação), tônica Dó4 (261.63 Hz), botão "Próxima Pergunta" e placar de primeira tentativa.
    - Erros Observáveis e Ações Corretivas proativas.
    - Botões de Ação de Rodapé: `[⚠️ Anotar Dificuldade]` e `[✓ Concluir Sessão]`.
- **Estrutura Mobile (375px)**: Coluna única contínua, com a tablatura contendo rolagem horizontal independente sem estourar o viewport.

### 2.3. Tela 3: Praticar (`#view-praticar`)
- **Propósito**: Catálogo dos 6 exercícios práticos disponíveis no piloto.
- **Componentes**: Grade com 6 cards detalhando área técnica, meta observável, status operacional (`em_revisao`) e botão para carregar o exercício na tela Aprender.

### 2.4. Tela 4: Meu Progresso (`#view-progresso`)
- **Propósito**: Acompanhamento pedagógico autêntico baseado em autoavaliação e retenção motora.
- **Componentes**:
  - *Caderno de Dificuldades*: Lista de registros (data, atividade, trecho, problema). O botão `[Recuperar]` direciona imediatamente para a versão de Preparação da atividade vinculada; botão `[✓ Resolver]` marca como resolvida.
  - *Agenda de Revisão Espaçada (2 / 7 / 21 Dias)*: Exibe rigorosamente **uma revisão pendente por atividade**. Sucesso no Alvo avança 2 → 7 → 21 dias; repetir/dificuldade agenda recuperação de 2 dias sem multiplicar pendências. Datas usam o fuso local do aluno.
  - *Painel de Backup e Migração*:
    - `[💾 Exportar Backup Completo (JSON)]`: gera arquivo com todas as tentativas, dificuldades, revisões e o estado atual da sessão (tempo decorrido preservado).
    - `[📂 Carregar Arquivo de Backup]`: importador com validação profunda e merge idempotente via `Map`.
    - `[🔄 Importar dados da interface anterior (v1)]`: botão explícito para migração não-destrutiva de notas históricas sob a chave `metodo_triade_geral_v1`.

### 2.5. Tela 5: Biblioteca (`#view-biblioteca`)
- **Propósito**: Acervo de consulta secundária completo dos 11 módulos e 300 aulas originais do Método Tríade.
- **Componentes**:
  - Barra de busca instantânea por título, módulo ou termo teórico.
  - Seletor por Módulo e filtro por tipo de material.
  - Acordeões expansíveis com links e identificadores canônicos (`aula-mod-X-Y`).

---

## 3. Estados de Interface e Resiliência

| Estado | Onde ocorre | Comportamento e Apresentação Visual |
|---|---|---|
| **Vazio: Caderno de Dificuldades** | Tela Progresso | Mensagem sóbria: *"Nenhuma dificuldade em aberto. Ótimo trabalho!"*. |
| **Vazio: Agenda de Revisão** | Tela Progresso | Mensagem: *"Nenhuma revisão pendente no momento."*. |
| **Vazio: Busca na Biblioteca** | Tela Biblioteca | Mensagem: *"Nenhuma aula encontrada para os filtros selecionados."*. |
| **Erro: Armazenamento Bloqueado** | Topo do App | Banner amarelo discreto: *"Armazenamento local indisponível ou bloqueado neste navegador. O ambiente continua funcionando na memória desta sessão; lembre-se de exportar seu backup antes de fechar."*. O app opera em RAM sem travar. |
| **Erro: Backup Inválido/Corrompido** | Diálogo de Importação | Mensagem explicativa do validador profundo (ex: *"Registro de dificuldade nulo ou inválido"* ou *"Atividade atual inválida"*), mantendo o estado local intacto. |
| **Sessão: Em Andamento** | Topo e Tela Aprender | Timer regressivo atualizado via `Date.now()`, botão alternado para *"Pausar"*, passo ativo destacado na fita de passos. |
| **Sessão: Pausada** | Topo do App | Timer congelado na contagem exata de milissegundos restantes, botão alternado para *"Retomar"*. Ao recarregar a página, a sessão retoma pausada sem acumular tempo fechado. |
| **Sessão: Concluída** | Topo do App | Ao atingir 00:00, alerta e convida o estudante a registrar o resultado. |

---

## 4. Modais e Diálogos de Interação

1. **Modal de Diagnóstico Inicial (`#modal-diagnostico`)**:
   - Questionário em 3 eixos: Rítmica, Acordes e Ouvido.
   - Direciona o ponto de partida do aluno sem registrar conclusões fictícias.
2. **Modal de Anotação de Dificuldade (`#modal-dificuldade`)**:
   - Campos: Atividade atual, Trecho/Versão e Descrição do problema.
   - Grava o item imediatamente no Caderno de Dificuldades com sanitização contra XSS.
3. **Modal de Conclusão e Avaliação (`#modal-resultado`)**:
   - Campos: Status de desempenho (*"Consegui com estabilidade"*, *"Preciso repetir"*, *"Senti desconforto/hesitação"*), BPM alcançado e anotações.
   - **Lógica Rigorosa de Demonstração**:
     - Sucesso na *Preparação*: registra status `'em_pratica'`. NÃO aprova o objetivo Alvo.
     - Sucesso no *Alvo*: registra status `'alvo_demonstrado'` e avança o ciclo da revisão espaçada (2 → 7 → 21 dias).
     - *Repetir/Dificuldade*: agenda revisão de recuperação para 2 dias sem duplicar pendências.

---

## 5. Regras de Impressão (@media print)

- Ao imprimir (`Ctrl+P`), todos os elementos de controle são ocultados (barra de navegação, temporizador, metrônomo e botões de ação).
- A aula, explicações e tablaturas são formatadas em fundo branco com contraste preto, preservando quebras de página naturais para uso na estante de partitura.
