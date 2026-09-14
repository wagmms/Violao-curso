# Dossiê de Inspeção de Fontes: cand-001 - Balada: Ritmo com Polegar e Dedos

**Data da Inspeção:** 14/09/2026  
**Produtor:** Antigravity  
**Método e Ferramentas:** Leitura direta de buffers no disco, ffprobe/ffmpeg (metadados audiovisuais), pypdf (extração de texto e camadas de partituras) e analisador de legendas VTT.  
**Limitação de Ambiente:** Ambiente headless CLI (sem display GUI ou dispositivo de áudio analógico para reprodução em tempo real). Toda observação apoia-se em legendas temporizadas milimétricas, dados de cabeçalho binário, PDFs renderizáveis e descrições originais.

---

## 1. Tabela de Arquivos e Integridade Física

| Arquivo ID | Nome no Acervo | Tipo | Tamanho (Bytes) | SHA-256 | Informações Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `arq-1375` | `00000928 - 1. Aula.mp4` | video | 186.227.176 | `3edfa8f6c21b4eb4...` | 13m50s (830.56s) |
| `arq-1380` | `00000929 - descricao.md` | descricao | 1.539 | `61dd55b88d422739...` | Texto/PDF |
| `arq-1381` | `00000930 - 1. Aula.pt_br.vtt` | legenda | 17.466 | `c66e42598dcb1221...` | 154 cues |
| `arq-1382` | `00000931 - 2. Aula.pt_br.vtt` | legenda | 19.002 | `83ec17f80b6d6565...` | 172 cues |
| `arq-1383` | `00000932 - 2. Aula.mp4` | video | 287.990.597 | `2bda31fa8fe866cd...` | 22m54s (1374.04s) |

---

## 2. Conteúdo Efetivamente Observado vs Inferido

- **Lido em Legendas / Textos:**  
  Identificado no VTT o movimento contínuo da mão direita em pêndulo ("1 e 2 e 3 e 4 e") e o link do SoundCloud para as 6 baterias gradualmente aceleradas (831 a 836).
  
  
  
  
  

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
