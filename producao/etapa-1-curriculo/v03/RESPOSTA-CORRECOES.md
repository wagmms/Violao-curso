# Resposta às Correções e Pareceres do Codex — Etapa 1 (v03)

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex  
**Referência:** `producao/etapa-1-curriculo/REVISAO-CODEX-v02.md` e `BRIEF-ETAPA-2A-INSPECAO.md`

---

## 1. Respostas Ponto a Ponto (F-01 a F-07)

### F-01: Fontes de `aula-prop-022` e `aula-prop-023` e Validação de Todas as Fontes
- **Ação Implementada:**
  - Em `AULAS-PROPOSTAS.json`, os identificadores incorretos foram substituídos pelos IDs canônicos existentes no inventário:
    - `aula-prop-022`: corrigido de `aula-kaiser-2-2-batida-de-choro` para `aula-kaiser-12-2-batida-de-choro` ("2. Batida de Choro", 6 arquivos locais incluindo vídeo e legendas).
    - `aula-prop-023`: corrigido de `aula-kaiser-3-1-batida-de-baiao-nivel-1` para `aula-kaiser-17-4-batida-de-baiao` ("4. Batida de Baião", 6 arquivos locais).
  - Todas as 33 aulas propostas e 29 habilidades tiveram suas listas de `fontesCandidatas` validadas via script contra `INVENTARIO.json`. 100% das fontes existem na base física e canônica.

### F-02: Relações da Matriz de Fontes vs Propostas
- **Ação Implementada:**
  - A `MATRIZ-FONTE-AULA.csv` foi regenerada com cardinalidade livre ($0..n$), assegurando que **toda relação fonte-aula declarada em `AULAS-PROPOSTAS.json` possui uma linha explícita na matriz**.
  - Foram adicionadas as relações que faltavam na versão anterior:
    - `aula-mod-1-15` $\rightarrow$ `aula-prop-013` (além de sua relação com `aula-prop-012`).
    - `aula-kaiser-36-4-aula-da-levada-1-exercicio-2-batida-co` $\rightarrow$ `aula-prop-024` (além de sua relação com `aula-prop-021`).
    - `aula-kaiser-12-2-batida-de-choro` $\rightarrow$ `aula-prop-022`.
    - `aula-kaiser-17-4-batida-de-baiao` $\rightarrow$ `aula-prop-023`.
  - Todas as 631 entradas canônicas estão devidamente representadas, totalizando 633 linhas de dados na matriz.

### F-03: Submissão Anexada e Relatos Fatuais da Etapa 0
- **Ação Implementada:**
  - Conforme detalhado em `producao/etapa-0-inventario/v04/RESPOSTA-CORRECOES.md`, os equívocos narrativos foram retificados sem mascaramento:
    - `arq-0027` é um vídeo MP4 legítimo de Regra Três (6.924.525 bytes, cabeçalho `ftypisom`), e não `descricao.md`.
    - O arquivo `descricao.md` de Kaiser 124 é `arq-0415` (882 bytes, texto HTML íntegro iniciando com `<p><strong>Agora...`).
    - As partituras em PDF de Kaiser 124 são `arq-0408` a `arq-0414` (PDFs sem extensão no nome de arquivo, cabeçalho `%PDF-1.7`).
    - `arq-0018` é a descrição de Asa Branca (151 bytes).
  - Todas as métricas foram geradas diretamente das tabelas físicas e scripts de auditoria.

### F-04: Validadores e Schemas JSON Draft 2020-12
- **Ação Implementada:**
  - O validador `validar-curriculo.cjs` foi aprimorado com suporte a:
    - Verificação de `minLength: 1` em propriedades textuais obrigatórias, rejeitando strings vazias.
    - Avaliação de regras condicionais via `allOf` com `if / then` por disciplina pedagógica.
    - Validação de integridade referencial bidirecional (proposta $\rightarrow$ matriz e proposta $\rightarrow$ inventário).
  - Foi implementada e executada a **bateria de 7 testes negativos intencionais**, cobrindo:
    1. Fonte candidata inexistente em proposta.
    2. Relação proposta-matriz ausente.
    3. Campo textual obrigatório vazio (`""`).
    4. Regra condicional de disciplina (percepção auditiva sem gabarito ou referência sonora).
    5. Arquivo físico atribuído a entrada errada.
    6. Ciclo no grafo DAG de aulas.
    7. Divergência de tamanho em bytes de candidato de calibração.
  - Todos os 7 testes negativos passaram com sucesso, comprovando a sensibilidade do validador.

### F-05: Schema de Aula Completa (`aula-pedagogica.schema.json`)
- **Ação Implementada:**
  - O schema de aula completa foi enriquecido com:
    - Autoria, status e proveniência obrigatórios.
    - `minLength: 1` em todos os campos de texto.
    - Critérios de saída (`criteriosSaida`), resultado esperado (`resultadoEsperado`) e próxima ação recomendada (`proximaAcao`).
    - Passos da aula estruturados com duração em minutos (`duracaoMinutos`) e identificador de recurso (`recursoId`).
    - Condicionais formais: se `disciplina == "ouvido"`, exige `especificacaoAuditiva` (com referência sonora e gabarito); se `disciplina == "ritmo"`, exige `especificacaoRitmica` (fórmula de compasso, subdivisão e padrão de contagem).

### F-06: Expansão Curricular e Cobertura dos Nós
- **Ação Implementada:**
  - Foi explicitado formalmente em `MAPA-CURRICULAR.md` e `RESUMO.md` que as **33 propostas de aula compõem o núcleo vertebral inicial do curso**, demonstrando a viabilidade pedagógica dos 8 domínios e 29 habilidades.
  - As demais 588 entradas do catálogo original permanecem formalmente alocadas em destinos editoriais (`dest-expansao-curadoria`, `dest-aguardando-backup`, etc.), constituindo a fila ampla de expansão curricular para os lotes subsequentes.

### F-07: Calibração e Inspeção Audiovisual Real
- **Ação Implementada:**
  - A inspeção concreta das fontes foi conduzida no âmbito da **Etapa 2A** (`producao/etapa-2-calibracao/v01-inspecao/`), documentando com rigor instrumental:
    - A transição A/D: nota Lá (220 Hz) na 3ª corda 2ª casa como nota comum; o dedo 1 como pivô foi documentado como uma *variante motora opcional*, não dogma universal.
    - O candidato Kaiser 124: 7 peças em PDF para leitura autodirigida sem vídeo local, selecionando-se trechos didáticos enxutos ("Brilha Brilha Estrelinha" e "Cai Cai Balão").
    - O candidato Thumb Slap: classificado como técnica percussiva intermediária no Módulo 12, analisando-se pré-requisitos de acompanhamento básico.
    - Limitações do ambiente headless CLI registradas com transparência técnica (análise via legendas VTT, ffprobe e extração de PDFs).
