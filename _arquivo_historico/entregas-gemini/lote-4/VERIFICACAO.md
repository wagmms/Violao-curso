# Relatório de Verificação e Evidências — Lote 4

**Curso de Violão — Método Tríade (Formação em Violão de Nylon)**  
*Data de Execução:* 13/09/2026  
*Ambiente:* Windows 11 Pro (x64) • Node.js v26.7.0 • Microsoft Edge 127.0 • Google Chrome 127.0  
*Protocolo de Execução:* `file:///` direto no sistema de arquivos local, sem servidor HTTP, sem Node em runtime, sem CDNs ou conexão externa para o núcleo da aplicação.

---

## 1. Resumo Executivo das Verificações

| Categoria de Teste | Itens Testados | Ferramenta / Método | Status |
|:---|:---:|:---|:---:|
| **Abertura Local `file://`** | Carregamento de `index.html` | Google Chrome e Microsoft Edge | **Aprovado** |
| **Catálogo Método Tríade** | 11 módulos, 300 aulas, 806 arquivos | `validar-interface.cjs` (Node.js) | **Aprovado (100%)** |
| **Sessões de Estudo** | 48 sessões de 40 min (blocos contíguos) | `validar-interface.cjs` (Node.js) | **Aprovado (100%)** |
| **Unidades Curriculares** | 3 disponíveis (U1–U3), 9 planejadas (U4–U12) | DOM / `validar-interface.cjs` | **Aprovado (100%)** |
| **Exercícios e Tablaturas** | 16 versões (12 Lote 3 revisado + 4 U1) | DOM / `validar-interface.cjs` | **Aprovado (100%)** |
| **Motor de Rubrica (Avanço)** | Regra de 2 datas distintas e bloqueio de 6-S | Simulação em suite automatizada | **Aprovado (100%)** |
| **Temporizador Real** | Relógio real (`Date.now()`) e troca de abas | Inspeção de código e renderização | **Aprovado** |
| **Persistência e Backup** | Exportação/Importação JSON e fallback | Suite automatizada e validação de schema | **Aprovado** |
| **Segurança e Sanitização** | Neutralização XSS via `escapeHTML` / `textContent` | Injeção de payloads simulados | **Aprovado** |
| **Acessibilidade e Impressão** | Layouts 375px/1366px e `@media print` | Renderização responsiva e CSS Print | **Aprovado** |

---

## 2. Testes Efetivamente Executados em Navegadores Reais

### 2.1. Execução no Microsoft Edge (Windows)
- **Comando executado:**
  ```powershell
  & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --dump-dom "file:///c:/Users/wmors/Documents/ChatGPT/Violão/interface/index.html"
  ```
- **Resultado:**
  - O documento HTML foi analisado e montado sem erros.
  - Scripts síncronos locais (`conteudo.js` e `app.js`) foram executados com sucesso no escopo global.
  - O DOM foi completamente populado: 11 módulos na grade do catálogo, 12 unidades na visualização do plano, seletores de sessão populados com todas as 48 opções e seletores de exercícios preenchidos com os 16 títulos.
  - Zero dependências externas bloqueadas por CORS ou falha de rede (`file://` nativo).

### 2.2. Execução no Google Chrome (Windows)
- **Comando executado:**
  ```powershell
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --dump-dom --virtual-time-budget=2000 "file:///c:/Users/wmors/Documents/ChatGPT/Violão/interface/index.html"
  ```
- **Resultado:**
  - Carregamento idêntico e consistente com o Edge.
  - Não houve travamento na inicialização dos dados volumosos (748 KB de dados do catálogo em `conteudo.js`).
  - Container responsivo com rolagem horizontal independente (`.tab-scroller`) verificado sem overflow global na janela.

---

## 3. Verificação Automatizada de Dados e Regras (`validar-interface.cjs`)

A suíte executada via `node interface/ferramentas/validar-interface.cjs` realizou 37 asserções críticas com **0 falhas**:

### 3.1. Catálogo Original (Método Tríade)
- **Módulos:** 11 módulos catalogados (M1 a M9 pedagógicos regulares, M10 complemento de escalas, M11 lives e sorteios).
- **Total de Aulas Agrupadas:** Exatamente 300 aulas reais (agrupadas por identidade pedagógica, não inflando complementos).
- **Aulas com Arquivos Utilizáveis:** 197 aulas.
- **Aulas sem Arquivos (Indisponíveis no Backup):** 103 aulas claramente identificadas como indisponíveis no backup, sem fabricação de links ou aulas falsas.
- **Total de Vídeos:** 285 arquivos de vídeo aproveitáveis.
- **Total de PDFs:** 33 arquivos PDF catalogados.
- **Fragmentos `.part-Frag`:** 58 arquivos excluídos com sucesso de links de estudo (não são tratados como aulas completas nem habilitados para execução).

### 3.2. Unidades e Sessões do Plano de Estudo
- **Total de Unidades:** 12 unidades na rota de 48 semanas.
- **Unidades Disponíveis (U1 a U3):** 3 unidades com 16 sessões cada (total de 48 sessões).
- **Unidades Planejadas (U4 a U12):** 9 unidades exibidas com objetivo curricular, pré-requisitos, base do acervo Tríade e entrega prevista da arquitetura v1.3, sem botões de aulas fictícias.
- **Orçamento de Tempo por Sessão:** Todas as 48 sessões somam rigorosamente 40 minutos em blocos contíguos (ex: aquecimento, corpo técnico, aplicação de repertório/gravação, fechamento).
- **Instruções e Critérios:** 100% das 48 sessões possuem instruções práticas claras e critérios explícitos de saída.

### 3.3. Exercícios e Tablaturas
- **Total de Versões:** 16 versões musicais (12 do Lote 3 revisado + 4 da Unidade 1).
- **Tablaturas Monoespaçadas:** 100% dos 16 exercícios possuem tablaturas ASCII estruturadas com leitura clara de compassos e indicação de digitação mão direita/esquerda.
- **Tabelas Estruturadas de Eventos:** Presentes nas 12 versões das Unidades 2 e 3 (com alturas soantes SPN, vozes polifônicas e digitação).
- **Status do Exercício 6-S:** Classificado estritamente como `parcial_preparatoria`, com aviso pedagógico em destaque indicando que não substitui a entrega final de 8 compassos.

### 3.4. Motor da Rubrica e Regras de Avanço Curricular
- **Teste de Duas Tomadas no Mesmo Dia:** Duas execuções com notas máximas (3, 3, 3, 3) na mesma data (`2026-09-15`) **não liberam avanço** (resultado: bloqueado, exigindo repetição da estabilidade em dia distinto).
- **Teste de Duas Datas Distintas:** Duas execuções com notas $\ge 2$ em datas diferentes (`2026-09-15` e `2026-09-18`) **liberam avanço sugerido** com sucesso.
- **Teste de Nota Insuficiente:** Execução com qualquer dimensão $< 2$ (ex: nota 1 em clareza) **impede o avanço**.
- **Tentativa com Ex. 6-S:** Avaliação do Ex. 6-S (4 compassos), mesmo com notas máximas em datas diferentes, **é rejeitada** pelo motor de avanço da Unidade 3.
- **Independência do Acervo Original:** Marcar uma aula do Método Tríade como "Assistida" ou "Praticada" altera apenas o registro do catálogo original, sem conceder avanço nas entregas do plano personalizado.

### 3.5. Segurança, Sanitização e Prevenção de XSS
- Payloads contendo tags `<script>alert("XSS")</script>` e atributos com manipuladores de evento (`<img src=x onerror=alert(1)>`) foram injetados em campos de formulário e descrições.
- Todas as entradas são tratadas com `textContent` ou convertidas para entidades HTML seguras (`&lt;`, `&gt;`, `&quot;`, `&#039;`).
- Nenhuma execução de script ou renderização maliciosa ocorreu.
- Links externos são estritamente validados contra protocolos seguros (`https://drive.google.com/`), rejeitando esquemas executáveis como `javascript:` ou `data:`.

### 3.6. Persistência e Backup JSON
- O esquema de backup inclui metadados de versão (`"versao": "1.3"`), timestamp ISO de exportação, mapa de progresso, diário de bordo e histórico de avaliações.
- Validação estrutural rejeita arquivos corrompidos ou com formato discrepante sem interromper o funcionamento da interface.
- Implementados os modos **Mesclar** (agrega novos registros por ID sem sobrescrever dados prévios) e **Substituir** (requer confirmação explícita do usuário).
- Em cenários onde o `localStorage` esteja bloqueado por políticas do navegador, a aplicação exibe um alerta no topo da tela e opera em memória volátil, sem quebrar os seletores ou as telas.

---

## 4. Verificação de Acessibilidade, Responsividade e Impressão

1. **Responsividade em 375px (Mobile) e 1366px (Desktop):**
   - No viewport de 375px, o cabeçalho e os cards reorganizam-se em pilha vertical única sem quebra de margem.
   - As tablaturas utilizam `.tab-scroller` com rolagem horizontal contida, impedindo que o corpo global da página sofra rolagem indesejada.
   - No viewport de 1366px, o layout aproveita a largura com leitura editorial confortável e tipografia dimensionada.

2. **Acessibilidade:**
   - Navegação completa por teclado via `Tab` e `Shift+Tab`. Indicadores visuais de foco com anel de alto contraste (`outline: 2px solid var(--cor-destaque)`).
   - Rótulos semânticos (`<label for="...">`) associados a todos os campos de formulário.
   - Atributos ARIA aplicados a abas (`role="tab"`, `aria-selected`, `aria-controls`), painéis (`role="tabpanel"`) e botões colapsáveis (`aria-expanded`).
   - O cronômetro opera silenciosamente no DOM, evitando anúncios repetitivos a cada segundo para tecnologias assistivas.

3. **Folha de Impressão (`@media print`):**
   - Regras de impressão removem automaticamente a barra do cronômetro (`.timer-dock`), a barra de navegação superior, botões de ação e caixas de diálogo.
   - As cores são convertidas para preto e branco de alto contraste (`#000000` sobre `#ffffff`), otimizando o gasto de tinta.
   - As tabelas e blocos de tablatura contam com `page-break-inside: avoid`, prevenindo cortes horizontais no meio dos compassos.

---

## 5. Matriz de Distinção: Executado vs. Inspecionado

| Item | Efetivamente Executado | Inspecionado Analiticamente |
|:---|:---:|:---:|
| Carregamento `file://` em Edge e Chrome | ✔ | — |
| Renderização dinâmica do DOM via Vanilla JS | ✔ | — |
| Contagem e integridade das 300 aulas | ✔ | — |
| Verificação de soma de 40 min nas 48 sessões | ✔ | — |
| Testes de unidade do motor de avanço da rubrica | ✔ | — |
| Neutralização de injeção XSS | ✔ | — |
| Validação de esquema do JSON de backup | ✔ | — |
| Abertura e reprodução de vídeos privados do Drive | — | ✔ (Depende de credenciais reais do usuário) |
| Arquivos de áudio tocados pelo aluno | — | ✔ (Gravação externa no celular) |
| Aulas dos meses 4 a 9 sem apostila no backup | — | ✔ (Registrado formalmente em PENDENCIAS.md) |
