# Dossiê de Inspeção de Fontes: cand-004 (v03-inspecao)

**Data da Inspeção:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex  
**Entrada de Origem Canônica:** `aula-kaiser-124-3-partituras-faceis-para-iniciantes` ("3. Partituras fáceis para iniciantes")  
**Mapeamento Curricular Oficial (Etapa 1 v03):**  
- **Aula Proposta:** `aula-prop-017` ("Iniciação à Clave de Sol: As Sete Partituras Fáceis")  
- **Módulo Pedagógico:** `mod-ped-05` ("05. Leitura Musical Integrada: Cifra, Tablatura e Partitura")  
- **Habilidade Principal:** `hab-lei-003` ("Leitura de Partitura Musical: Clave de Sol na 1ª Posição")  
- **Matriz de Fontes:** Mapeado explicitamente na linha correspondente de `producao/etapa-1-curriculo/v03/MATRIZ-FONTE-AULA.csv`  
- **Conferência Automatizada:** Script `validar-cand004.cjs` atesta 100% de integridade com as tabelas da Etapa 1 v03.

---

## 1. Identificação Física do Recurso Original no Acervo

- **Identificador do Arquivo:** `arq-0408`
- **Caminho Relativo no Acervo:** `Curso Kaiser/LEITURA DE PARTITURA/1. Leitura de Partitura/3. Partituras fáceis para iniciantes/0. 1`
- **Nome do Arquivo no Disco:** `0. 1`
- **Tipo de Arquivo:** Partitura em formato PDF (sem extensão no nome do arquivo original)
- **Tamanho Físico:** 51.500 bytes (conferido em disco em 14/09/2026)
- **Hash SHA-256:** `decfdf2e34bb85eded08973c14754138257835957d96a01fcc2cb6bcf535dbd8` (conferido via Node.js `crypto.createHash` em 14/09/2026)
- **Cabeçalho Binário:** `%PDF-1.7`
- **Arquivo Textual Complementar:** `arq-0415` (`descricao.md`, 882 bytes, SHA-256 `17416017aa4be87674bb030647c3c40f0b6fcc2766a2453a09625fd9b1ca365e`)
- **Imagem Renderizada para Auditoria da Fonte:** `producao/etapa-2-calibracao/revisao-codex/arq-0408.png` (renderizada pelo revisor Codex via Poppler em 14/09/2026)

---

## 2. Conteúdo Observado na Fonte vs Adaptação Autoral

### A. Observação Factual da Imagem da Fonte (`arq-0408.png`)
A inspeção visual da primeira página da partitura original revela os seguintes grupos delimitados por barras de compasso (sem inferir regularidade métrica ou preencher pausas não escritas):

| Grupo na Fonte | Eventos Escritos Observados | Soma em Tempos de Semínima | Observações Fatuais |
| :---: | :--- | :---: | :--- |
| **Grupo 1** | Dó (semínima), Dó (semínima) | 2 tempos | **Início incompleto na fonte.** Causa desconhecida (pode ser intenção de anacruse ou problema de diagramação editorial). A dúvida é preservada honestamente. |
| **Grupo 2** | Sol (semínima), Sol (semínima), Lá (semínima), Lá (semínima) | 4 tempos | Grupo isócrono de 4 semínimas. |
| **Grupo 3** | Sol (mínima), Fá (semínima), Fá (semínima) | 4 tempos | 1 mínima (2 tempos) + 2 semínimas (2 tempos) = 4 tempos. |
| **Grupo 4** | Mi (semínima), Mi (semínima), Ré (semínima), Ré (semínima) | 4 tempos | Grupo isócrono de 4 semínimas. |
| **Grupo 5** | Dó (mínima), Sol (semínima), Sol (semínima) | 4 tempos | 1 mínima (2 tempos) + 2 semínimas (2 tempos) = 4 tempos. |

> **Nota Crítica de Fidelidade Factual:**  
> Os quatro primeiros grupos da fonte contêm 13 eventos articulados e totalizam 14 tempos de semínima. **Não são quatro compassos regulares de 4/4**. O PDF não contém sinal 8 explícito sob a clave de sol.

### B. Adaptação Autoral Regularizada para o Curso Integrado
Para assegurar a progressão pedagógica do estudante iniciante sem a fricção cognitiva de um início incompleto de métrica ambígua, foi adotada a seguinte decisão editorial:
- **Identificação:** **Adaptação autoral para leitura em quatro compassos regulares em fórmula 4/4**.
- **Frase Musical Adaptada:**  
  `Dó Dó Sol Sol | Lá Lá Sol(2) | Fá Fá Mi Mi | Ré Ré Dó(2)`
- **Métrica da Adaptação:** Exatamente 4 compassos de 4 tempos cada = 16 tempos de semínima, totalizando 14 eventos articulados.
- **Pauta Autoral Entregue:** Uma pauta visualmente legível, renderizada e vetorialmente editável (`pauta-adaptada.png`, `pauta-adaptada.pdf`, `pauta-adaptada.svg`, `pauta-adaptada.musicxml`), evitando adulterar o PDF original do acervo.

---

## 3. Declaração Factual de Limites e Ausências Técnicas
- **Vídeo Local:** Não existe gravação em vídeo para esta entrada no acervo. Metadados de vídeo foram expurgados.
- **Áudio Gravado Local:** Não existe gravação de áudio humano no acervo.
- **Referência Sonora Autoral:** Para fornecer suporte auditivo de comparação de alturas e andamento, foi sintetizado o arquivo `referencia-audio-sintese.wav` (16 segundos a 60 BPM). Este arquivo é rotulado estritamente como **referência métrico-frequencial sintetizada**, não como demonstração instrumental humana.
