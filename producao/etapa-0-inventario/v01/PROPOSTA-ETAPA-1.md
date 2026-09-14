# Proposta Provisória para a Etapa 1 (Mapa de Habilidades e Currículo)

**Data:** 14/09/2026  
**Responsáveis:** Antigravity (Produtor Principal) / Codex (Orquestrador e Revisor)  
**Workspace:** `C:\Users\wmors\Documents\ChatGPT\Violão`  
**Acervo:** `C:\Users\wmors\Videos\KatoMart Acelerado` (somente leitura)  
**Versão:** `v01` (Proposta Provisória para Parecer do Codex)

---

## 1. Princípios de Arquitetura Curricular

A Etapa 1 tem como objetivo transformar o catálogo de 631 entradas em uma **trilha pedagógica progressiva orientada a competências observáveis**, superando a organização puramente comercial dos módulos originais sem apagar a proveniência dos materiais.

### 1.1 Separação entre Proveniência e Sequência Pedagógica
- Os identificadores originais (`id` e metadados de origem) permanecem como campos de rastreabilidade (`fontesOrigem[]`).
- As novas aulas curadas receberão IDs pedagógicos estáveis e sequenciais (ex: `aula-curada-001`), evitando confusão entre numeração histórica e ordem de aprendizado.
- O curso será estruturado em torno do contrato didático definido na seção 6 do Plano:  
  **Objetivo observável → Fonte comprovada → Demonstração → Prática guiada → Exercício executável → Feedback com causa provável → Aplicação musical → Tarefa de saída independente → Rota de recuperação/revisão.**

### 1.2 Entregáveis Previstos para a Etapa 1
1. `MAPA-HABILIDADES.json`: Catálogo formal de competências, pré-requisitos, evidências observáveis e níveis de domínio.
2. `MAPA-CURRICULAR.md`: Sequenciamento modular com distribuição de temas, justificativa pedagógica e rotas de recuperação.
3. `MATRIZ-FONTE-AULA.csv`: Mapeamento n-para-n vinculando as entradas originais do acervo às aulas curadas, registrando decisões editoriais (manter, fundir, dividir, revisar ou arquivar).

---

## 2. Critérios Editoriais de Fusão, Divisão e Arquivamento

Com base no inventário exaustivo da Etapa 0, propõem-se os seguintes critérios objetivos:

### 2.1 Critério de Fusão (Merge)
- **Quando aplicar:**
  1. Entradas que representam "Partes" de uma mesma obra ou estudo (ex: Parte 1 e Parte 2 de "O Poderoso Chefão", "Born This Way", etc.).
  2. Aulas que apresentam um conceito básico acompanhadas de uma aula de "Upgrade" ou "Reforço" (ex: "Chiado na troca" acoplado à aula de troca mecânica de acordes).
  3. Pares teóricos de Harmonia/Percepção onde uma entrada é a explicação e outra é a aplicação prática direta.
- **Resultado:** Uma única aula curada com objetivo claro, consolidando os trechos pertinentes das fontes originais.

### 2.2 Critério de Divisão (Split)
- **Quando aplicar:**
  1. Vídeos extensos (>30-40 minutos) que misturam teoria densa, múltiplos formatos de acordes e repertório complexo na mesma gravação.
  2. Aulas em que o professor apresenta um fundamento técnico e, sem transição, salta para uma peça musical intermediária/avançada.
- **Resultado:** Divisão em duas ou mais aulas encadeadas, respeitando a carga cognitiva e permitindo sessões práticas de 20 a 40 minutos.

### 2.3 Critério de Manutenção Individual
- **Quando aplicar:** Aulas com foco temático único, duração compatível (10 a 25 minutos), demonstração clara e exercício imediato executável.

### 2.4 Critério de Isolamento e Arquivo (Descarte do Fluxo Regular)
- **Quando aplicar:**
  1. Itens administrativos ou comerciais (como cancelar assinatura, pesquisas de opinião com 3 perguntas, sorteios antigos de violão).
  2. Quizzes nativos de plataforma sem mídia (devem ser substituídos por rubricas formativas autorais dentro da própria aplicação).

---

## 3. Fontes Candidatas para as Seis Aulas de Calibração (Etapa 2)

Para calibrar o modelo didático e a metodologia de revisão antes de produzir em escala, foram selecionadas seis áreas representativas com fontes locais plenamente disponíveis e verificadas:

| # | Área Didática | Objetivo Observável Proposto | Fonte Candidata Principal | Materiais Locais Verificados | Pré-requisitos Declarados | Inspeção Necessária na Etapa 2 |
|---|---|---|---|---|---|---|
| **1** | **Ritmo / Pulso** | Sustentar pulso quaternário e célula de balada básica com cordas abafadas e acordes abertos em 60-70 BPM | Tríade `aula-mod-1-17` ("Violão - 3.1 - Batida Balada Básica") | Vídeo `00000933` (110 MB), Legenda VTT, Apostila HP1 pág 10 | Postura estável e toque com polegar/indicador | Inspecionar minutos 02:15 a 06:40 para isolar a direção das palhetadas/toques |
| **2** | **Ouvido / Percepção** | Identificar por escuta e entoar intervalos de 2ª maior e 3ª maior sem apoio visual do instrumento | Tríade `aula-mod-1-15` ("H P - 3.1 Intervalos Diatônicos") | Vídeo `00000926` (85 MB), Legenda VTT, Apostila HP1 págs 7-8 | Diferenciação básica de grave/agudo | Auditar os áudios de referência nos minutos 04:00 a 08:30 |
| **3** | **Troca de Acordes** | Executar a transição rítmica entre A (Lá Maior) e D (Ré Maior) no tempo 1 do compasso sem interrupção do pulso | Tríade `aula-mod-1-10` ("Violão - 2.2 - Fluência no A e D") | Vídeo `00000905` (120 MB), PDF de apoio (1,4 MB) | Formatos de A e D memorizados com som limpo | Checar movimento do dedo guia/pivô demonstrado na fonte |
| **4** | **Leitura de Notação** | Ler e tocar melodia em 1ª posição em compasso 4/4 identificando cordas soltas e presas nas casas 1 a 3 | Kaiserplay `aula-kaiser-124-3-partituras-faceis-para-iniciantes` + Tríade `aula-mod-1-26` | 7 PDFs identificados (`0. 1` a `0. 7`), Descrição MD | Nomes das cordas soltas do violão | Inspecionar a primeira partitura (`0. 1`) e diagramas de notas naturais |
| **5** | **Acompanhamento** | Executar levada de acompanhamento com marcação de baixo no polegar e acorde nos dedos indicadores/médio | Kaiserplay `aula-kaiser-5-5-thumb-slap-batida-fingerstyle` (ou Levada Pop Swing) | Vídeo local de 42,5 MB (`1. Aula.mp4`), Descrição MD | Troca estável de acordes básicos (Em, G, C) | Verificar gesto do polegar e conferir se não há tensão nociva no punho |
| **6** | **Melodia com Baixo / Solo** | Tocar pequeno estudo a duas vozes mantendo a linha melódica audível e o baixo soando na cabeça do compasso | Kaiserplay `aula-kaiser-134-3-pequena-valsa` (Repertório Nível 1) | Vídeo local de 68 MB (`1. Aula.mp4`), Tablatura/Partitura | Dedilhado básico (p-i-m-a) e controle de dinâmica | Analisar partitura/tablatura e verificar dedilhado da mão esquerda |

> **Nota de Integridade:** As fontes acima foram confirmadas no disco quanto à existência, integridade de tamanho e hash SHA-256. O conteúdo audiovisual específico de cada trecho será inspecionado e documentado no dossiê de evidências somente durante a execução da Etapa 2.

---

## 4. Dependências Técnicas e Pedagógicas

1. **Aprovação da Etapa 0 pelo Codex:** Nenhum trabalho de redação curricular ou produção didática deve começar antes da emissão do parecer oficial do Codex sobre o inventário.
2. **Definição dos Schemas de Dados:** Antes da Etapa 2, o schema de `aula.json` e a estrutura canônica de `AULA.md` devem ser revisados para contemplar as particularidades de cada disciplina (ouvido necessita de gabarito e áudio; leitura necessita de notação/tablatura; acompanhamento necessita de diagramas rítmicos).
3. **Substituição dos Componentes Estáticos de UI:** O aplicativo precisará de componentes dinâmicos para renderizar os dados de acordes e partituras das novas aulas, eliminando o SVG fixo em Am auditado anteriormente.
4. **Tratamento das 111 Entradas sem Mídia Local:** Na matriz da Etapa 1, cada uma dessas 111 entradas receberá uma definição: espera de backup, substituição por exercício autoral explicitamente identificado, ou descarte fundamentado.
