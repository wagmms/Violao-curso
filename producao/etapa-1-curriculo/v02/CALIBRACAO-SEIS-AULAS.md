# Especificação Provisória para Calibração Didática das Seis Aulas Candidatas

**Data de Emissão:** 14/09/2026  
**Versão do Documento:** v02 (Revisada em conformidade com o Parecer Codex)  
**Produtor:** Antigravity  
**Revisor:** Codex  
**Status:** Especificação Provisória para Auditoria  

---

## 1. Diretrizes Metodológicas da Calibração

A calibração pedagógica tem por objetivo submeter seis unidades candidatas representativas de diferentes especialidades musicais (ritmo fundamental, mecânica de acordes abertos, percepção auditiva de intervalos, leitura de partitura, acompanhamento percussivo e violão solo polifônico) ao crivo do **Contrato Didático de 14 Itens**.

> [!IMPORTANT]
> **Honestidade Epistemológica e Nível de Inspeção Real:**  
> Todas as informações físicas e metadados deste documento foram extraídos diretamente de `ARQUIVOS-FISICOS.json` e `INVENTARIO.json`.  
> As inspeções reais realizadas limitaram-se à análise documental das descrições, descompressão dos arquivos PDF e leitura integral dos arquivos de legendas WebVTT locais disponíveis. O ambiente de linha de comando não executa reprodução gráfica de vídeo. Por conseguinte, os candidatos são mantidos em status de **calibração provisória / não confirmada**, com hipóteses explícitas de minutagem e trechos a serem auditados presencialmente na Etapa 2.

---

## 2. Manifesto das Seis Aulas Candidatas

A tabela abaixo sintetiza o manifesto estruturado em `CANDIDATOS-CALIBRACAO.json`:

| Candidato ID | Aula Proposta ID | Entrada Origem | Título da Aula Proposta | Domínio Musical | Habilidade Principal | Nível de Inspeção Atual |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cand-01-ritmo-balada` | `aula-prop-008` | `aula-mod-1-17` | A Batida Balada Básica e o Pêndulo Contínuo | Ritmo | `hab-rit-003` | `legenda_indexada` |
| `cand-02-tecnica-troca-ad` | `aula-prop-005` | `aula-mod-1-10` | Fluência e Troca de Acordes: Lá e Ré com Dedo Guia | Técnica | `hab-tec-003` | `metadados_catalogo` |
| `cand-03-ouvido-intervalos` | `aula-prop-012` | `aula-mod-1-15` | Reconhecimento Auditivo de Intervalos de 2ª e 3ª Maior | Ouvido | `hab-ouv-002` | `legenda_indexada` |
| `cand-04-leitura-partituras` | `aula-prop-017` | `aula-kaiser-124-3` | Iniciação à Clave de Sol: As Sete Partituras Fáceis | Leitura | `hab-lei-003` | `metadados_catalogo` |
| `cand-05-acompanhamento-thumb-slap` | `aula-prop-030` | `aula-kaiser-18-5` | Thumb Slap e Percussão no Fingerstyle Moderno | Ritmo | `hab-rit-004` | `legenda_indexada` |
| `cand-06-solo-pequena-valsa` | `aula-prop-029` | `aula-kaiser-137-10` | Polifonia a Duas Vozes: Pequena Valsa de Carulli | Solo/Arranjo | `hab-sol-001` | `metadados_catalogo` |

---

## 3. Detalhamento Físico e Pedagógico por Candidato

### 3.1. Candidato 1: Ritmo Fundamental — A Batida Balada Básica
* **IDs:** Candidato `cand-01-ritmo-balada` | Aula Proposta `aula-prop-008` | Entrada `aula-mod-1-17` (Tríade Módulo 1)
* **Habilidade Principal:** `hab-rit-003` (Execução da Levada Balada Básica)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-1375`: `00000928 - 1. Aula.mp4` (Vídeo, 186.227.176 bytes, SHA-256: `3edfa8f6c21b4eb4ad70aa2bf5c96c05956b95915a6132980505901fe475e529`)
  * `arq-1380`: `00000929 - descricao.md` (Descrição, 1.539 bytes, SHA-256: `61dd55b88d422739714af882f23f46cd9ce2bfd3b113baf8fc6d579b7da2061c`)
  * `arq-1381`: `00000930 - 1. Aula.pt_br.vtt` (Legenda WebVTT, 17.466 bytes, SHA-256: `c66e42598dcb12219e2064b3fc01bc9fb9e8656135ec69e7b7e9f425835d8dd4`)
  * `arq-1382`: `00000931 - 2. Aula.pt_br.vtt` (Legenda WebVTT, 19.002 bytes, SHA-256: `83ec17f80b6d656540d9804faf58433bf965d9ebb17136c73d7c3574f0e89263`)
  * `arq-1383`: `00000932 - 2. Aula.mp4` (Vídeo, 287.990.597 bytes, SHA-256: `2bda31fa8fe866cd0f8ea98a4d2d49b236e336e0aeccc26f1f37f31eb22ca3c7`)
* **Nível de Inspeção Atual:** `legenda_indexada`
* **Inspeção Realizada:** Leitura integral das legendas locais `00000930` (duração 13:44) e `00000931` (duração 22:48). O professor estabelece como pilar central o conceito do **movimento contínuo da mão direita como um pêndulo**, que nunca para de oscilar mesmo nos tempos em que não há toque nas cordas.
* **Hipótese de Amostragem para a Etapa 2:** Minutos 02:00 a 05:00 de `00000928` para verificar visualmente o ângulo de ataque da palheta/unhas e a amplitude do movimento pendular do antebraço.
* **Bloqueios e Limitações:** Vídeos MP4 não foram reproduzidos no terminal. As legendas fornecem evidência textual, mas a conferência biomecânica do movimento depende da inspeção presencial.
* **Planejamento do Contrato Didático Autoral (14 Itens):**
  * *Entrada:* Verificar manutenção de pulso isócrono (`hab-rit-001`) e digitação estática dos acordes abertos fundamentais.
  * *Prática Guiada:* 1) Movimento pendular contínuo no ar sem tocar as cordas; 2) Aplicação do padrão com toques em cordas abafadas; 3) Execução sobre o acorde de Mi Menor (Em) a 60 BPM.
  * *Verificação de Saída:* Sustentar 8 ciclos consecutivos da levada balada básica no andamento de 60 a 72 BPM com tolerância zero para paradas do movimento pendular.

---

### 3.2. Candidato 2: Mecânica de Acordes — Fluência e Troca Lá e Ré com Dedo Guia
* **IDs:** Candidato `cand-02-tecnica-troca-ad` | Aula Proposta `aula-prop-005` | Entradas `aula-mod-1-10` e `aula-mod-1-11` (Tríade Módulo 1)
* **Habilidade Principal:** `hab-tec-003` (Troca Mecânica Fluente de Acordes com Dedo Guia)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-1320`: `00000905 - 01_1_Módulo_1_10_10_Violão_2_2_Inovação_Fluência_no_A_e_D.mp4` (Vídeo, 41.206.063 bytes, SHA-256: `288387f1f2a9370570a52baab7e0cf295f0ea2f627f4ed5eafdc864d5f7b493a`)
  * `arq-1324`: `00000906 - 01_1_Módulo_1_10_10_Violão_2_2_Inovação_Fluência_no_A_e_D_Descricao.md` (Descrição, 901 bytes, SHA-256: `7caa85b3714e9115d6f23d0aa19f6ea4dcc8f968d520345ff57e4d8499abb6d5`)
  * `arq-1326`: `00000908 - 01_1_Módulo_1_10_10_Violão_2_2_Inovação_Fluência_no_A_e_D_1_primeira.pdf` (PDF de cifras/estudo, 1.402.800 bytes, SHA-256: `8108013575c71d1f2901fe6b09c2e9bea7069f84e581c3495dff8783d25a4fa9`)
  * `arq-1327`: `00000909 - 01_1_Módulo_1_11_11_Violão_2_3_Inovação_Trabalho_de_Fluência.mp4` (Vídeo, 36.193.788 bytes, SHA-256: `d6ff2b27ee0e0e453aa624389506d150e1285072abf0572ea9d7f43bb735cf70`)
  * `arq-1331`: `00000910 - 01_1_Módulo_1_11_11_Violão_2_3_Inovação_Trabalho_de_Fluência_Descricao.md` (Descrição, 1.543 bytes, SHA-256: `a167003092643e2a19feac95f9b86f0571831fe9d23ceb06fd3362ebb8d2561f`)
  * `arq-1332` e `arq-1335`: vídeos complementares de aula (`00000911` e `00000912`).
* **Nível de Inspeção Atual:** `metadados_catalogo`
* **Inspeção Realizada:** Leitura das descrições `00000906` e `00000910` e inspeção estrutural do PDF `00000908`. O texto salienta a proposta prática de alcançar fluência imediata entre dois acordes.
* **Correção Musical e Teórica:**
  * Em afinação padrão, na 3ª corda (Sol), a 2ª casa é a nota **Lá (A)** (e não Ré).
  * No acorde de Lá Maior (A), montado com dedos 1, 2 e 3 na casa 2, a nota Lá está na 3ª corda (casa 2). No acorde de Ré Maior (D), a nota Lá também está na 3ª corda (casa 2), pressionada pelo dedo 1.
  * O princípio do dedo guia consiste na manutenção do dedo 1 sobre a 3ª corda na casa 2 durante a transição, servindo como pivô estático de referência enquanto os dedos 2 e 3 se reposicionam (dedo 2 para a 1ª corda, casa 2 [Fá#], e dedo 3 para a 2ª corda, casa 3 [Ré]). Não há deslizamento para a casa 3 na 3ª corda.
* **Hipótese de Amostragem para a Etapa 2:** Minutos 03:00 a 07:00 de `00000905` para auditar a digitação específica recomendada pelo instrutor para os dedos de Lá Maior.
* **Bloqueios e Limitações:** Não existem legendas WebVTT locais nestas entradas; vídeos não assistidos no terminal. Candidato classificado como provisório.

---

### 3.3. Candidato 3: Percepção Auditiva — Reconhecimento de Intervalos Diatônicos
* **IDs:** Candidato `cand-03-ouvido-intervalos` | Aula Proposta `aula-prop-012` | Entradas `aula-mod-1-15` e `aula-mod-1-16` (Tríade Módulo 1)
* **Habilidade Principal:** `hab-ouv-002` (Reconhecimento Auditivo de Intervalos Diatônicos de 2ªM e 3ªM)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-1354`: `00000919 - 01_1_Módulo_1_15_15_H_P_3_1_Intervalos_Diatônicos_pág_07_UPGRADE.mp4` (Vídeo, 425.540.268 bytes, SHA-256: `98f0847dc1fd7905a6cc5e6cf0d2f94b8e7d52cc8edb4e0fa05ac12d6dc99d19`)
  * `arq-1359`: `00000920 - ...md` (Descrição com errata de leitura no min 10:10, 180 bytes)
  * `arq-1360`: `00000921 - ...vtt` (Legenda WebVTT, 55.981 bytes)
  * `arq-1363` e `arq-1368`: vídeos adicionais de aula (`00000924` com 139 MB e `00000925` com 365 MB).
  * `arq-1373` e `arq-1374`: vídeo de fixação (`00000926`, 1,9 MB) e descrição (`00000927`).
* **Nível de Inspeção Atual:** `legenda_indexada`
* **Inspeção Realizada:** Leitura integral da legenda `00000921` (duração 44:57). O instrutor aborda a percepção de intervalos como uma "aula sensorial", cantando as relações diatônicas familiares (Dó-Ré, Dó-Mi, Dó-Fá...) a partir da escala maior e propondo ditados práticos.
* **Distinção Pedagógica Fundamental:**
  * A habilidade `hab-ouv-002` foca no **reconhecimento sensorial receptivo** (ouvir dois sons consecutivos e identificar se a distância é uma 2ª Maior ou 3ª Maior).
  * A habilidade `hab-ouv-003` foca na **reprodução expressiva e entoação vocal** (ouvir uma tônica e emitir com a voz o intervalo solicitado, conferindo no instrumento).
  * Essas duas dimensões foram formalmente desmembradas em habilidades e propostas distintas.
* **Hipótese de Amostragem para a Etapa 2:** Minutos 04:00 a 10:00 de `00000919` para extrair os trechos de áudio de comparação e verificar a errata descrita para o minuto 10:10.
* **Bloqueios e Limitações:** Vídeo de 425 MB não reproduzido no terminal; avaliação baseada no conteúdo textual indexado.

---

### 3.4. Candidato 4: Leitura Notacional — Iniciação à Clave de Sol (As Sete Partituras Fáceis)
* **IDs:** Candidato `cand-04-leitura-partituras` | Aula Proposta `aula-prop-017` | Entrada `aula-kaiser-124-3-partituras-faceis-para-iniciantes` (Kaiser Módulo 8 / Leitura de Partitura)
* **Habilidade Principal:** `hab-lei-003` (Leitura de Partitura em Clave de Sol na 1ª Posição)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-0415`: `descricao.md` (Orientações de estudo, 882 bytes, SHA-256: `17416017aa4be87674bb030647c3c40f0b6fcc2766a2453a09625fd9b1ca365e`)
  * Sete partituras em PDF sem extensão (magic bytes `%PDF-1.7`, 1 página cada):
    * `arq-0408`: `0. 1` — Brilha Brilha Estrelinha (51.500 bytes, SHA-256: `decfdf2e34bb85eded08973c14754138257835957d96a01fcc2cb6bcf535dbd8`)
    * `arq-0409`: `0. 2` — Parabéns pra Você (46.488 bytes)
    * `arq-0410`: `0. 3` — Atirei o Pau no Gato (38.108 bytes)
    * `arq-0411`: `0. 4` — Escravos de Jó (66.155 bytes)
    * `arq-0412`: `0. 5` — Noite Feliz (67.826 bytes)
    * `arq-0413`: `0. 6` — O Cravo Brigou com a Rosa (47.791 bytes)
    * `arq-0414`: `0. 7` — Cai Cai Balão (com 3 sustenidos, tom de Lá Maior, 52.762 bytes)
* **Nível de Inspeção Atual:** `metadados_catalogo`
* **Inspeção Realizada:** Leitura da descrição e descompressão dos fluxos binários dos 7 arquivos PDF. A descrição original orienta expressamente: *"Pegue as obras abaixo e leia sozinho... Recomendo praticar com metrônomo"*.
* **Declaração de Realidade do Acervo:**
  * Esta entrada **NÃO POSSUI arquivos de vídeo nem legendas** no acervo local. Consiste exclusivamente no conjunto de partituras para autoestudo prático.
  * O curso integrado fornecerá a estruturação pedagógica de leitura prévia (solfejo rítmico com palmas -> identificação de alturas -> digitação no instrumento).
* **Hipótese de Amostragem para a Etapa 2:** Conferir a notação de compasso e digitação da partitura `0. 1` (Brilha Brilha Estrelinha).

---

### 3.5. Candidato 5: Acompanhamento Percussivo — Thumb Slap e Batida Fingerstyle
* **IDs:** Candidato `cand-05-acompanhamento-thumb-slap` | Aula Proposta `aula-prop-030` | Entrada `aula-kaiser-18-5-thumb-slap-batida-fingerstyle` (Kaiser Módulo 1 / Acompanhamento)
* **Habilidade Principal:** `hab-rit-004` (Levada com Elemento Percussivo — Thumb Slap)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-0068`: `1. Aula.mp4` (Vídeo, 44.538.073 bytes, SHA-256: `53c77cbc8f1eab1f75d24db49c264dc0c8c8ad4bfa5b0c45d81cacd724a0b5b4`)
  * `arq-0071`: `1. Aula.mp4.pt-orig.vtt` (Legenda WebVTT, 16.139 bytes, SHA-256: `1336474f123e6f0273511b9e6fd29f33d3f0fdfc453a51347da55a9ff97dd24a`)
  * `arq-0073`: `descricao.md` (Descrição, 168 bytes, SHA-256: `2f2a80e2ac1f0da2a57fa641cee0f16c965544bcf25f99014b8b58b9b036c1a4`)
  * Legendas em outros idiomas: `arq-0069`, `arq-0070`, `arq-0072`.
* **Nível de Inspeção Atual:** `legenda_indexada`
* **Inspeção Realizada:** Leitura integral da legenda `1. Aula.mp4.pt-orig.vtt` (duração exata de **03:15**). O instrutor ensina a percussão com a base do polegar nos tempos 2 e 4 em compasso 4/4 e, a seguir, demonstra a técnica de golpear com as costas das unhas dos dedos agudos no mesmo instante para soar a melodia simultaneamente ao efeito percussivo.
* **Ajuste Curricular Decorrente do Parecer:**
  * O thumb slap é uma técnica percussiva especializada de fingerstyle moderno.
  * Para priorizar o acompanhamento rítmico básico nos módulos iniciais, esta técnica foi **realocada para o Módulo 12 (Violão Solo e Fingerstyle)**, evitando sobrecarga motora precoce para o iniciante.
* **Hipótese de Amostragem para a Etapa 2:** Minuto 01:00 a 02:30 do vídeo para auditar o movimento do antebraço e certificar que a técnica ensinada não exige rigidez do punho.
* **Bloqueios e Limitações:** Vídeo não visualizado em tela gráfica.

---

### 3.6. Candidato 6: Violão Solo Polifônico — Pequena Valsa (Ferdinando Carulli)
* **IDs:** Candidato `cand-06-solo-pequena-valsa` | Aula Proposta `aula-prop-029` | Entrada `aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol` (Kaiser Módulo 9 / Repertório Nível 1)
* **Habilidade Principal:** `hab-sol-001` (Textura Polifônica a Duas Vozes no Violão Solo)
* **Arquivos Físicos Associados no Acervo Local:**
  * `arq-0460`: `0. Pequena Valsa` (Partitura e Tablatura PDF sem extensão, 128.104 bytes, SHA-256: `8a6ab1739f7eec07f758aec998244e82d891b280ba43bf87b003e78328252b32`)
  * `arq-0461`: `1. Aula.mp4` (Vídeo, 90.448.442 bytes, SHA-256: `4df1e08013c7d19c68c54f9356feb1651a177ebdd48e9deef36b0bfbb62ae395`)
  * `arq-0462`: `descricao.md` (Descrição, 322 bytes, SHA-256: `5b7237e1159714da2601a65dfc9ad2663aeaf8bf60e55e42187890118bd3d5d2`)
* **Nível de Inspeção Atual:** `metadados_catalogo`
* **Inspeção Realizada:** Leitura da descrição e descompressão do PDF `0. Pequena Valsa` (2 páginas com notação em clave de sol e tablatura em compasso 3/4).
* **Hipótese de Amostragem para a Etapa 2:** Minutos 00:00 a 03:00 do vídeo `1. Aula.mp4` e compassos 1 a 8 da página 1 do PDF para mapear a alternância entre melodia superior cantabile e os baixos de apoio nos tempos 1 e 2.
* **Bloqueios e Limitações:** Não existem legendas WebVTT locais nesta entrada; vídeo não assistido no terminal.
