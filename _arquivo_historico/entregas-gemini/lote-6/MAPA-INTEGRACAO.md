# Mapa de Integração dos Guias Pedagógicos e Módulos 2 e 3 (Lote 6)

> **Documento de Engenharia e Integração Pedagógica — Lote 6**  
> Submetido para homologação do Codex conforme as diretrizes de `BRIEF-MODULOS-02-03.md`.  
> **Status:** Integração do Módulo 1 e Mapa Geral concluída na interface; Módulos 2 e 3 produzidos e aguardando parecer.

---

## 1. Arquitetura da Integração Offline na Interface

### 1.1 Princípio de Operação Local e Segurança (`file://`)
A interface opera 100% offline em Chrome e Edge sob protocolo `file://`, preservando a soberania e a privacidade dos dados do estudante:
- **Zero Requisições de Rede para Estrutura:** Não utiliza `fetch`, nem chamadas HTTP locais, nem CDNs externos.
- **Carregamento Clássico de Scripts:** Os dados foram compilados para o script síncrono local `interface/guias-dados.js`, carregado no `index.html` imediatamente após `conteudo-geral.js` e antes de `geral.js`.
- **Preservação de Dados Existentes:** Todos os 300 identificadores canônicos (`aula-mod-X-Y`), as marcações de aulas assistidas/praticadas e as anotações no `localStorage` (`metodo_triade_geral_v1`) foram rigorosamente preservados.

### 1.2 Mapa Curricular e de Estudo Acessível
- **Disponibilidade Global:** Adicionado o botão **"Mapa de Estudo do Curso"** (`#btn-mapa`) na barra de ferramentas principal.
- **Visualizador Nativo:** Implementado via elemento nativo HTML5 `<dialog id="modal-mapa">`, com renderizador leve de Markdown integrado diretamente em `geral.js`.
- **Conteúdo Fiel:** Exibe o documento integral `MAPA-ESTUDO-CURSO-GERAL.md` (homologado no Lote 5/revisado), com tabela quantitativa oficial de 11 módulos e 300 aulas, sem caminhos privados e sem distorções de escopo.

### 1.3 Renderização dos Guias nas Aulas (Regra Anti-Fantasma)
- **Renderização Condicional Estrita:** A interface consulta `window.CURSO_GUIAS[a.id]`. Somente as 46 aulas do Módulo 1 (homologadas pelo Codex) geram o painel retrátil `<details class="guia-estudo">`.
- **Zero Botões Fantasmas:** As aulas dos Módulos 2 a 11 não exibem botões vazios ou placeholders. Mantêm acesso integral aos seus arquivos e vídeos reais do Drive.
- **Estrutura Visual do Guia por Aula:**
  1. *Subtítulo Editorial:* contextualização temática e nível de aplicação.
  2. *Status do Objetivo e Evidência:* badge `[Confirmado]` ou `[Provisório]` com indicação da fonte consultada (vídeo, apostila HP1, descrição ou legenda).
  3. *Objetivo Pedagógico da Aula:* síntese conceitual ou motora.
  4. *Gestão do Tempo (40 Minutos):* modelo 5+10+20+5 ou desmembramento explícito em 2 sessões.
  5. *Roteiro de Prática Deliberada:* orientações técnicas aplicadas ao nylon e MPB quando cabível.
  6. *Ponto Crítico de Atenção / Biomecânica:* postura, relaxamento e prevenção de lesões.
  7. *Disclaimer Pedagógico:* nota explícita de que o vídeo do professor Heitor Castro é a referência primária, sendo o guia um complemento de estudo.
- **Filtro Rápido:** Novo filtro **"Com guia de estudo"** no seletor de tipos, isolando instantaneamente as 46 aulas do Módulo 1.

---

## 2. Síntese dos Novos Guias Produzidos (Módulos 2 e 3)

Os guias dos Módulos 2 e 3 foram redigidos em formato Markdown rigoroso, alinhados com o inventário factual e as fontes do acervo, aguardando parecer do Codex para integração aos dados da interface:

| Módulo | Arquivo de Entrega | Aulas Totais | Com Arquivo | Itens de Plataforma (Sem Arquivo) | Status de Homologação |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **02. Módulo 2** | `entregas-gemini/lote-6/GUIA-MODULO-02.md` | 38 | 37 | 1 (Aula 01: Quiz) | Produzido; aguardando parecer do Codex |
| **03. Módulo 3** | `entregas-gemini/lote-6/GUIA-MODULO-03.md` | 44 | 42 | 2 (Aula 01: Quiz; Aula 44: Suporte) | Produzido; aguardando parecer do Codex |

### 2.1 Módulo 2 (38 Aulas):
- **Núcleo Técnico:** Acordes menores fundamentais (Em, Am, Dm), introdução biomecânica à pestana com o acorde de Si menor (Bm), levada de Balada e Rock Inglês, leitura melódica nas cordas 1 e 2, dedilhado preliminar.
- **Tratamento de Agrupamentos:** Aulas complementares (ex: 07+08, 14+15, 24+25, 28+29, 34+35) compartilham um único orçamento conjunto de 40 minutos.
- **Tratamento de Itens sem Mídia (Aula 01 - Quiz):** Não instrui salto automático; orienta diagnóstico de pré-requisitos do Módulo 1 (tríades A, D, E, G, C e Batida Balada limpa).

### 2.2 Módulo 3 (44 Aulas):
- **Núcleo Técnico:** Consolidação e intensivão de pestana (Bm e paralelismo na 5ª corda), batida Pop com variação percussiva 'Tchac', dedilhados I e II (P-i-m-a e arpejos), dedilhado direto (bossa/MPB), acorde com sétima maior (X7M), condução rítmica de Baião e solo melódico de Wicked Game.
- **Tratamento de Aulas Extensas:** Bônus ao vivo de Harmonia Prática (Aulas 38, 40, 41, 42) com instrução expressa para divisão em 2 sessões de 40 minutos.
- **Tratamento de Itens sem Mídia:**
  - *Aula 01 (Quiz para ir ao mês 3):* Avaliação diagnóstica das competências do Mês 2.
  - *Aula 44 (VIOLÃO - ACONTECEU ALGUMA COISA_):* Checklist de encerramento do nível básico e saneamento de dúvidas técnicas.

---

## 3. Matriz de Rastreabilidade e Auditoria

A ferramenta automatizada `entregas-gemini/lote-6/ferramentas/conferir-lote-6.cjs` e a suíte CDP em navegador `entregas-gemini/lote-6/ferramentas/testar-navegador-cdp.mjs` atestam:
- **Títulos e IDs:** 100% de correspondência entre os cabeçalhos dos guias e o catálogo canônico (0 divergências).
- **URLs de Materiais:** Todos os links apontam para os arquivos reais auditados no Drive.
- **Gestão do Tempo:** Todas as sessões fecham rigorosamente em 40 minutos (ou 2x40 min em aulas longas).
- **Interatividade em Navegador:** 12 testes ponta a ponta executados em navegador real sob perfil isolado, confirmando abertura de guias, filtros, modal do mapa, persistência de notas pós-reload e estilos de impressão.
