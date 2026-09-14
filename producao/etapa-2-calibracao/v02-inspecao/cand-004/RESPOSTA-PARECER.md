# Resposta Detalhada ao Parecer Codex: cand-004

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Referência:** `producao/etapa-2-calibracao/REVISAO-CODEX-v01-inspecao.md` (Itens I-02, I-05, I-06, I-08, I-10)

---

### Resposta ao Item I-02 (Precisão de Alturas, Oitavas e Posição no Violão)
- **Diagnóstico do Erro Anterior:** Na entrega v01, houve uma confusão teórica grave que sugeriu tocar o Sol e Lá nas primas agudas (corda 1 casa 3 e casa 5), misturando oitavas e alegando 1ª posição com casa 5 sem justificativa.
- **Correção Implementada:**
  - Conferida diretamente a imagem da partitura (`arq-0408.png`). A melodia de "Brilha Brilha Estrelinha" está escrita na região central da pauta: inicia no Dó na 1ª linha suplementar inferior (C4 escrito).
  - Pela convenção transpositora do violão (som real uma oitava abaixo da notação escrita), esse Dó soa como **C3 (130,81 Hz)**, localizado na **5ª corda (Lá), 3ª casa**.
  - A melodia prossegue para o Sol na 2ª linha (**G3 real, 3ª corda solta**), Lá no 2º espaço (**A3 real, 3ª corda, 2ª casa**), Fá no 1º espaço (**F3 real, 4ª corda, 3ª casa**), Mi na 1ª linha (**E3 real, 4ª corda, 2ª casa**) e Ré abaixo da pauta (**D3 real, 4ª corda solta**).
  - **Toda a melodia situa-se estritamente na 1ª posição (casas 0 a 3) nas cordas 5, 4 e 3**. Não há casa 5 e não há deslocamento de mão. A notação original é 100% preservada sem necessidade de transposição autoral forçada.

---

### Resposta ao Item I-05 (Remoção de Metadados Fictícios de Vídeo/Áudio)
- **Diagnóstico do Erro Anterior:** O dossiê v01 herdou blocos genéricos de ffprobe atribuindo resolução 1280x720 e áudio estéreo a uma entrada que contém apenas partituras em PDF.
- **Correção Implementada:**
  - O dossiê e o manifesto de recursos de `cand-004` agora declaram explicitamente a **inexistência de vídeo e áudio local** no acervo original.
  - O candidato é caracterizado honestamente pelo que é: uma sessão de leitura instrumental sobre partitura PDF autêntica, concebida originalmente por Marcos Kaiser para prática individual com metrônomo.

---

### Resposta ao Item I-06 (Separação de Evidências Físicas e Musicais)
- **Diagnóstico do Erro Anterior:** Mistura de evidência de arquivo (hash/tamanho) com conteúdo musical, e atribuição de timestamp `00:00-00:05` a documentos em PDF.
- **Correção Implementada:**
  - `EVIDENCIAS.csv` separa explicitamente evidências do tipo `fisica` (bytes e hash SHA-256 de `arq-0408`), `documental` (instruções em `arq-0415`) e `musical_visual` (apontando rigorosamente para Página 1 e número exato do compasso: 1, 2, 3 e 4).
  - Timestamps audiovisuais foram eliminados para PDFs.

---

### Resposta ao Item I-08 (Plano de Aula Customizado e Específico de Leitura)
- **Diagnóstico do Erro Anterior:** Molde genérico de 5/15/10 minutos com redução padronizada de 10 bpm sem relação com a habilidade de leitura.
- **Correção Implementada:**
  - O `PLANO-AULA.md` foi inteiramente reescrito com foco em leitura notacional:
    1. Tarefa real de entrada: verificação física das cordas soltas 5, 4 e 3 e colocação dos dedos 2 e 3.
    2. Sequência de prática estruturada em reconhecimento simbólico na pauta, solfejo rítmico falado e tentativa guiada compasso a compasso.
    3. Saída independente delimitada: 14 eventos em 60 bpm mantendo a sustentação de 2 tempos nas mínimas.
    4. Recuperação didática bipartida: recuperação de leitura de altura (isolando linhas vs espaços na 4ª corda) e recuperação rítmica (verbalização com metrônomo para prolongar a mínima).
