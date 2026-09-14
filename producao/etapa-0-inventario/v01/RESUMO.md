# Resumo Executivo do Inventário — Etapa 0

**Data:** 14/09/2026  
**Responsáveis:** Antigravity (Produtor Principal) / Codex (Orquestrador e Revisor)  
**Workspace:** `C:\Users\wmors\Documents\ChatGPT\Violão`  
**Acervo:** `C:\Users\wmors\Videos\KatoMart Acelerado` (somente leitura)  
**Versão:** `v01` (Aguardando Revisão do Codex)

---

## 1. Totais Reconciliados do Catálogo e do Acervo

A auditoria computacional e documental da Etapa 0 reconciliou integralmente as **631 entradas** do curso integrado:

| Métrica | Método Tríade | Kaiserplay | Total Reconciliado | Índice Anterior (`COBERTURA-GUIAS-AULAS.json`) | Variação / Discrepância |
|---|---:|---:|---:|---:|---|
| **Total de Entradas no Catálogo** | 300 | 331 | **631** | 631 | 0 (Consistência total) |
| **Entradas com Vídeo ou PDF Local** | 195 | 325 | **520** | 422 | **+98** entradas com material recuperadas |
| **Entradas com Vídeo Local** | 195 | 324 | **519** | — | — |
| **Entradas com PDF Local** | 32 | 1 | **33** | 32 | +1 aula com PDFs (7 partituras sem extensão) |
| **Entradas com Legendas (.vtt/.srt)** | 168 | 120 | **288** | 207 | **+81** legendas locais indexadas |
| **Entradas com Apenas Descrição (.md)** | 2 | 6 | **8** | — | Documentação textual sem mídia |
| **Entradas sem Mídia nem Documentação** | 103 | 0 | **103** | 209 | Quizzes/plataforma Hotmart sem download |
| **Total de Entradas sem Mídia Local** | 105 | 6 | **111** | 209 | Redução de 98 pendências falsas |
| **Entradas com Links Remotos Preservados** | 194 | 0 | **194** | — | Google Drive URLs originais preservadas |
| **Arquivos Físicos no Acervo** | 906 | 1.184 | **2.090** | 1.486 | +604 arquivos indexados e identificados |
| **Volume Físico no Disco** | 46,02 GB | 36,68 GB | **82,70 GB** | — | 100% dos arquivos com hash SHA-256 |

---

## 2. Método Utilizado

O inventário seguiu estritamente as diretrizes do `docs/PLANO-PRODUCAO-CURADORIA.md`:

1. **Leitura e Auditoria Estruturada do Catálogo:** Extração direta de `app/dados-catalogo.js` (`window.CURSO_DADOS.catalogoOriginal`), mapeando todas as 631 entradas, títulos, metadados e vínculos originais.
2. **Varredura Recursiva do Acervo:** Varredura física profunda em `C:\Users\wmors\Videos\KatoMart Acelerado` utilizando APIs nativas do Node.js v26.7 (`fs.readdirSync`, `fs.statSync`), registrando tamanho exato em bytes e caminho relativo de 2.090 arquivos.
3. **Hashing Criptográfico Integral (SHA-256):** Todos os 82,70 GB de arquivos físicos foram processados via streams criptográficos (`crypto.createHash('sha256')`), garantindo identificação inequívoca de cada arquivo e detecção de colisões.
4. **Reconciliação Biparamétrica do Manifesto KatoMart:** Resolução do mapeamento entre o manifesto `00001571 - katomart_manifest...` (que usa índices originais de módulo 0..10 e aula 0..45) e os identificadores canônicos `aula-mod-M-L`.
5. **Inspeção de Assinaturas Binárias (Magic Bytes):** Verificação de cabeçalhos binários para detectar arquivos salvos sem extensão ou com extensões anômalas (ex: `%PDF-1.7` em arquivos numerados do módulo de leitura do Kaiser).
6. **Classificação Editorial e Nível Real de Inspeção:** Atribuição sistemática de categorias pedagógicas, status de disponibilidade e separação rigorosa entre consulta de metadados/legendas e inspeção instrumental direta.

---

## 3. Discrepâncias em Relação ao Índice Anterior

O relatório anterior (`docs/COBERTURA-GUIAS-AULAS.json`, gerado por `app/ferramentas/gerar-guias-curso.cjs` em 14/09/2026) reportava apenas **422 entradas com material local** e **209 entradas sem material local**. O inventário atual comprovou a existência de material reproduzível em **520 entradas** (+98).

As três causas raízes dessa discrepância foram identificadas e documentadas:

1. **Incompatibilidade de Índices no Gerador (`gerar-guias-curso.cjs` linha 48):**
   - O gerador filtrava o manifesto com:  
     `f.module_index === aula.module_index && f.lesson_index === aula.lesson_index`
   - Ocorre que em `dados-catalogo.js`, `aula.module_index` havia sido renumerado para corresponder aos 12 novos módulos temáticos (0 a 11), enquanto o manifesto KatoMart registra o módulo cronológico original (0 a 10).
   - Por consequência, 193 aulas de Tríade falharam no casamento de índices por mera incompatibilidade de numeração, caindo falsamente na lista de "sem material".
2. **Sobrescrita de Chaves no `Map` por Arquivos `.parte-04-de-04` (246 arquivos de 0 bytes):**
   - O gerador construía um mapa:  
     `new Map(arquivos.map(f => [msgId, f]))`
   - Para mensagens que possuíam tanto o arquivo de vídeo íntegro quanto partes vazias (`.parte-01-de-04` a `.parte-04-de-04`), o `Map` sobrescrevia o vídeo legítimo pelo fragmento vazio.
   - Na linha seguinte, o filtro `!/\.part/i` descartava o fragmento, deixando a aula com lista de arquivos vazia (ex: `aula-mod-1-2`, que possui vídeo de 258 MB no disco, foi marcada como "sem material").
3. **Não Detecção de PDFs sem Extensão em Kaiserplay:**
   - Na aula `aula-kaiser-124-3-partituras-faceis-para-iniciantes`, os 7 arquivos de partituras/tablaturas foram salvos pelo KatoMart como `0. 1`, `0. 2`, etc.
   - O gerador buscava estritamente pela extensão `.pdf`, ignorando essas partituras válidas.

---

## 4. Verificações Efetivamente Executadas

| Verificação | Ferramenta / Método | Objeto Auditado | Resultado |
|---|---|---|---|
| Existência Física de Arquivos | Node.js `fs.statSync` | 2.090 arquivos no acervo local | 100% conferidos com tamanho exato |
| Hashing Criptográfico | Node.js `crypto.createHash('sha256')` | 2.090 arquivos (82,70 GB) | 100% catalogados com SHA-256 |
| Reconciliação de IDs | Parser regex / chaves canônicas | 631 IDs do catálogo | 0 IDs duplicados; 631/631 mapeados |
| Reconciliação Tríade vs. Manifesto | Script de confronto bidirecional | 300 aulas Tríade | 300/300 correlacionadas ao manifesto |
| Validação de Duplicatas por Hash | Agrupamento por SHA-256 | Base de hashes | 107 grupos de duplicatas exatas identificados (3,05 GB) |
| Inspeção de Magic Bytes | `fs.readSync` buffer 8-16 bytes | Arquivos sem extensão | 7 PDFs identificados com magic bytes `%PDF-1.7` |
| Preservação de Links Remotos | Extração de arrays `materiais[].url` | 631 entradas | 194 URLs preservadas sem alterações |
| Modo Somente Leitura do Acervo | Auditoria de operações de escrita | `C:\Users\wmors\Videos\KatoMart Acelerado` | Nenhuma modificação, renomeação ou exclusão |

---

## 5. Limitações Declaradas da Etapa 0

Em conformidade estrita com o princípio da transparência editorial:
- **Inspeção Audiovisual:** Nenhum dos 519 vídeos locais foi assistido na íntegra nesta rodada. O inventário atesta a existência física, tamanho e hash do contêiner, não a qualidade pedagógica da gravação.
- **Legendas WebVTT:** As transcrições automáticas locais (288 entradas) foram consultadas documentalmente; **não foram tratadas como prova visual/instrumental** de postura, dedilhado ou digitação em corda/casa.
- **Conectividade Remota:** Os 194 links do Google Drive foram catalogados e preservados no estado em que estavam; não foram testados por requisições HTTP para evitar bloqueios por taxa de consulta e falsas confirmações.
- **Isolamento de Código:** Nenhuma alteração foi realizada em `app/` nem nos roteiros de `app/dados-guias-aulas.js`. O aplicativo permanece inalterado aguardando o parecer do Codex.
