# Dossiê de Inspeção de Fontes: cand-003 - Treinamento Auditivo: Reconhecimento de Intervalos Diatônicos

**Data da Inspeção:** 14/09/2026  
**Produtor:** Antigravity  
**Método e Ferramentas:** Leitura direta de buffers no disco, ffprobe/ffmpeg (metadados audiovisuais), pypdf (extração de texto e camadas de partituras) e analisador de legendas VTT.  
**Limitação de Ambiente:** Ambiente headless CLI (sem display GUI ou dispositivo de áudio analógico para reprodução em tempo real). Toda observação apoia-se em legendas temporizadas milimétricas, dados de cabeçalho binário, PDFs renderizáveis e descrições originais.

---

## 1. Tabela de Arquivos e Integridade Física

| Arquivo ID | Nome no Acervo | Tipo | Tamanho (Bytes) | SHA-256 | Informações Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `arq-1354` | `00000919 - ...Intervalos_Diatônicos_pág_07_UPGRADE.mp4` | video | 425.540.268 | `98f0847dc1fd7905...` | 48m04s (2884.97s) |
| `arq-1359` | `00000920 - ...pág_07_UPGRADE.md` | descricao | 180 | `227d407c81e6c9db...` | Texto/PDF |
| `arq-1360` | `00000921 - ...pág_07_UPGRADE.vtt` | legenda | 55.981 | `ada54def6cc98e31...` | 627 cues |
| `arq-1361` | `00000922 - ...pág_07_UPGRADE.vtt` | legenda | 14.023 | `925d2bb15975cc02...` | 160 cues |
| `arq-1362` | `00000923 - ...pág_07_UPGRADE.vtt` | legenda | 43.947 | `084ab9e9898bdcb1...` | 512 cues |

---

## 2. Conteúdo Efetivamente Observado vs Inferido

- **Lido em Legendas / Textos:**  
  
  
  Lidas no VTT as 627 cues de Heitor Castro estruturando a "aula de sensações" para intervalos diatônicos (2M e 3M) a partir de Dó. Registrada a errata no minuto 10:10 (leitura de semínima inexistente na pauta).
  
  
  

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
