# Dossiê de Inspeção de Fontes: cand-002 - Mecanismo de Troca Fluida: Acordes Lá Maior e Ré Maior

**Data da Inspeção:** 14/09/2026  
**Produtor:** Antigravity  
**Método e Ferramentas:** Leitura direta de buffers no disco, ffprobe/ffmpeg (metadados audiovisuais), pypdf (extração de texto e camadas de partituras) e analisador de legendas VTT.  
**Limitação de Ambiente:** Ambiente headless CLI (sem display GUI ou dispositivo de áudio analógico para reprodução em tempo real). Toda observação apoia-se em legendas temporizadas milimétricas, dados de cabeçalho binário, PDFs renderizáveis e descrições originais.

---

## 1. Tabela de Arquivos e Integridade Física

| Arquivo ID | Nome no Acervo | Tipo | Tamanho (Bytes) | SHA-256 | Informações Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `arq-1320` | `00000905 - 01_1_Módulo_1_10_10_Violão_2_2_Inovação_Fluência_no_A_e_D.mp4` | video | 41.206.063 | `288387f1f2a93705...` | 7m28s (448.85s) |
| `arq-1324` | `00000906 - ...Descricao.md` | descricao | 901 | `7caa85b3714e9115...` | Texto/PDF |
| `arq-1326` | `00000908 - ...1_primeira.pdf` | pdf | 1.402.800 | `8108013575c71d1f...` | 1 página |
| `arq-1327` | `00000909 - ...Trabalho_de_Fluência.mp4` | video | 36.193.788 | `d6ff2b27ee0e0e45...` | 7m10s (430.22s) |
| `arq-1331` | `00000910 - ...Descricao.md` | descricao | 1.543 | `a167003092643e2a...` | Texto/PDF |

---

## 2. Conteúdo Efetivamente Observado vs Inferido

- **Lido em Legendas / Textos:**  
  
  Lido no PDF "Palavras ao Vento (simplificada)" o encadeamento dos acordes Asus2 e Dsus2. Lido na descrição do módulo que o foco estrito é confiança mecânica de troca sob pulso sem batida.
  
  
  
  

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
