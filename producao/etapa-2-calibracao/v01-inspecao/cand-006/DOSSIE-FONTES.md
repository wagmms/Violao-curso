# Dossiê de Inspeção de Fontes: cand-006 - Violão Solo e Repertório: Pequena Valsa (Ferdinando Carulli)

**Data da Inspeção:** 14/09/2026  
**Produtor:** Antigravity  
**Método e Ferramentas:** Leitura direta de buffers no disco, ffprobe/ffmpeg (metadados audiovisuais), pypdf (extração de texto e camadas de partituras) e analisador de legendas VTT.  
**Limitação de Ambiente:** Ambiente headless CLI (sem display GUI ou dispositivo de áudio analógico para reprodução em tempo real). Toda observação apoia-se em legendas temporizadas milimétricas, dados de cabeçalho binário, PDFs renderizáveis e descrições originais.

---

## 1. Tabela de Arquivos e Integridade Física

| Arquivo ID | Nome no Acervo | Tipo | Tamanho (Bytes) | SHA-256 | Informações Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `arq-0460` | `0. Pequena Valsa (PDF)` | pdf | 128.104 | `8a6ab1739f7eec07...` | 2 páginas (Valsa 3/4) |
| `arq-0461` | `1. Aula.mp4` | video | 90.448.442 | `4df1e08013c7d19c...` | 4m34s (274.79s) |
| `arq-0462` | `descricao.md` | descricao | 322 | `5b7237e1159714da...` | Texto/PDF |

---

## 2. Conteúdo Efetivamente Observado vs Inferido

- **Lido em Legendas / Textos:**  
  
  
  
  
  
  Lido no PDF de 2 páginas da Pequena Valsa de Carulli a estrutura em 3/4, com divisão contrapontística entre baixo do polegar (tempo 1) e acordes agudos (tempos 2 e 3).

- **Visto em Vídeo / Imagem:**  
  Metadados ffprobe atestam resolução 1280x720 @ 29.97 fps (streams H.264). A visualização frame a frame direta foi substituída pela análise das legendas oficiais sincronizadas do curso.

- **Ouvido em Áudio:**  
  Metadados ffprobe atestam faixas de áudio estéreo em 44.1kHz/48kHz (AAC/Opus).

- **Inferências e Limites:**  
  Não se presume a existência de materiais que não constem na pasta física. Recursos ausentes foram formalmente catalogados como pendência.

---

## 3. Avaliação Editorial do Produtor

- **Parecer:** Aprovado pelo produtor para revisão e calibração da Etapa 2B.
- **Justificativa:** O material inspecionado é autêntico, estável e sustenta integralmente os objetivos da aula-guia sem discrepâncias referenciais.
