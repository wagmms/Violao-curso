# Especificação Provisória para Calibração Didática das Seis Aulas Candidatas

**Data de Emissão:** 14/09/2026  
**Etapa do Projeto:** Etapa 1 — Arquitetura Curricular Provisória (v01)  
**Produtor Responsável:** Antigravity  
**Revisor Designado:** Codex  
**Status do Documento:** Especificação Provisória para Auditoria  

---

## 1. Diretrizes Metodológicas da Calibração

A calibração pedagógica tem por objetivo submeter seis aulas candidatas representativas de diferentes domínios musicais (ritmo, técnica de acordes, percepção auditiva, leitura musical com partitura, acompanhamento percussivo e violão solo polifônico) ao crivo do **Contrato Didático de 14 Itens**.

> [!IMPORTANT]
> **Honestidade Epistemológica e Nível de Inspeção:**  
> Todas as seis aulas candidatas encontram-se atualmente classificadas no **Nível 1 de Inspeção (Sumário Técnico e Metadados)**. As minutagens, trechos de áudio e páginas de partitura citadas neste documento constituem **hipóteses orientadas de inspeção** para a amostragem da Etapa 2, e não declarações de escuta/visualização presencial já consumadas.

---

## 2. Detalhamento das Seis Aulas Candidatas

### Aula Candidata 1: Ritmo Fundamental — A Batida Balada Básica
* **ID da Aula Proposta:** `aula-prop-007` (`mod-ped-03`)
* **ID da Entrada de Origem:** `aula-mod-1-17` (Tríade Módulo 1)
* **Habilidade Principal:** `hab-rit-003` (Execução da Levada Balada Básica)
* **Arquivos Físicos Associados:**
  * Vídeo principal: `00000932.mp4` (`arq-0056`, 115.248.349 bytes, SHA-256: `601ea313ccefa566b69cf944a95b86650db89d81d2ee649ef2c2c019d0e2fb72`)
  * Legenda: `00000932.vtt` (`arq-0057`, 3.018 bytes, SHA-256: `3b0b57e7939ce848529ea4995cf586c95cfd59828e83348eaebfef44e64f7df5`)
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem a Inspecionar:** 00:00 a 03:20 (orientação de movimento do polegar e indicador), 03:21 a 07:45 (sincronização com metrônomo e acentos).
* **Lacunas do Material Original:**
  * O vídeo original demonstra o padrão rítmico, mas não isola o treino motor da virada do compasso (transição do último toque para o primeiro do ciclo seguinte).
  * Não há metrônomo visual integrado ou contagem falada simultânea contínua.
  * Falta diagnóstico explícito para o erro clássico de antecipar o tempo 3 da balada.
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Verificar se o aluno sustenta pulso isócrono a 60 BPM em cordas abafadas (`hab-rit-001`).
  * *Prática Guiada em 3 Tempos:* Toque na mesa/tampo -> toque em cordas abafadas com contagem -> execução com acorde único.
  * *Antecipação de Erro:* Sinal observável: acelerar o movimento ascendente no tempo 'e'. Causa: pressa para voltar à posição inicial. Intervenção: manter o braço relaxado como um pêndulo contínuo.
  * *Verificação de Saída:* Executar 8 ciclos ininterruptos da levada balada a 65 BPM sem oscilar o tempo.

---

### Aula Candidata 2: Mecânica de Acordes — Fluência e Troca Instantânea A e D
* **ID da Aula Proposta:** `aula-prop-005` (`mod-ped-02`)
* **IDs das Entradas de Origem:** Fusão de `aula-mod-1-10` ("Treino de Fluência") e `aula-mod-1-11` ("Como treinar a troca de acordes") (Tríade Módulo 1)
* **Habilidade Principal:** `hab-tec-003` (Troca Mecânica Fluente de Acordes com Dedo Guia)
* **Arquivos Físicos Associados:**
  * Vídeo 1: `00000905.mp4` (`arq-0036`, 59.882.802 bytes, SHA-256: `f23989c490a16b9b3297a73f8487e9ecbf669ff6e01a88b8fa87f3b89b4f9106`)
  * Legenda 1: `00000905.vtt` (`arq-0037`, 3.518 bytes)
  * Vídeo 2: `00000910.mp4` (`arq-0038`, 48.016.920 bytes, SHA-256: `4e6fcfeb8a1835bc3fe896b0144f8373b5df510ec1f2bf29a67a835bfe26cfcf`)
  * Legenda 2: `00000910.vtt` (`arq-0039`, 3.003 bytes)
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem a Inspecionar:** 01:10 a 04:30 em `00000905` (mecanismo do dedo 1 ou 2 como pivô); 00:45 a 03:15 em `00000910` (treino de troca no compasso com metrônomo).
* **Lacunas do Material Original:**
  * O material explica o conceito do dedo guia, mas não decompõe a troca em câmera lenta motora (fase de alívio de pressão, deslizamento sem descolar da corda, aterrissagem simultânea dos outros dedos).
  * Não fornece rotina de recuperação para o aluno cujo dedo 3 levanta excessivamente (sinergia muscular indesejada).
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Verificar montagem estática correta de Lá Maior e Ré Maior com som limpo de cada corda.
  * *Tríade de Exercícios:* Preparação (deslizar dedo 1 na 3ª corda entre casas 2 e 3 sem pressionar); Alvo (troca A -> D em semibreves no metrônomo a 50 BPM); Variação (troca em mínimas e semínimas).
  * *Verificação de Saída:* 8 trocas consecutivas A-D em semínimas a 60 BPM, sem abafamento acidental da 1ª corda no D.

---

### Aula Candidata 3: Percepção Auditiva — Intervalos Diatônicos de 2ª e 3ª Maior
* **ID da Aula Proposta:** `aula-prop-009` (`mod-ped-04`)
* **IDs das Entradas de Origem:** Fusão de `aula-mod-1-15` ("Intervalos diatônicos") e `aula-mod-1-16` ("Exercícios de fixação") (Tríade Módulo 1)
* **Habilidades:** `hab-ouv-002` (Reconhecimento de Intervalos 2ªM e 3ªM) e `hab-ouv-003` (Entoação Vocal)
* **Arquivos Físicos Associados:**
  * Vídeos: `00000919.mp4` (`arq-0046`, 147.258.980 bytes), `00000924.mp4` (`arq-0048`, 42.493.593 bytes), `00000925.mp4` (`arq-0050`, 42.493.593 bytes), `00000929.mp4` (`arq-0052`, 22.399.715 bytes).
  * Legendas correspondentes: `arq-0047`, `arq-0049`, `arq-0051`, `arq-0053`.
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem a Inspecionar:** 02:00 a 06:10 em `00000919` (comparação acústica tom vs dois tons); 01:00 a 04:00 em `00000929` (gabarito do ditado auditivo).
* **Lacunas do Material Original:**
  * O instrutor toca os intervalos e apresenta as respostas, mas não treina ativamente a voz do aluno como ferramenta de calibração auditiva.
  * Falta um teste cego interativo que garanta que o aluno não está apenas olhando para a mão do professor.
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Discriminação de grave/agudo (`hab-ouv-001`).
  * *Prática Guiada:* 1) Ouvir a nota Dó; 2) Cantar a 2ªM (Ré); 3) Conferir no violão (2ª casa da 3ª corda). Repetir para a 3ªM (Mi).
  * *Verificação de Saída:* Ditado auditivo às cegas com 10 intervalos aleatórios de 2ªM e 3ªM. Critério de corte: mínimo de 8 acertos.

---

### Aula Candidata 4: Leitura Notacional — Partituras Fáceis para Iniciantes
* **ID da Aula Proposta:** `aula-prop-010` (`mod-ped-05`)
* **ID da Entrada de Origem:** `aula-kaiser-124-3-partituras-faceis-para-iniciantes` (Kaiser Módulo 8)
* **Habilidade Principal:** `hab-lei-002` (Tablatura) e `hab-lei-003` (Clave de Sol em Primeira Posição)
* **Arquivos Físicos Associados:**
  * Vídeo: `00000414.mp4` (`arq-0803`, 128.513.684 bytes, SHA-256: `f61e8913953e5e408ec21768f7736e65bb8972ca30510fc56ee3fc471d4bf52c`)
  * Legenda: `00000414.vtt` (`arq-0804`, 14.526 bytes)
  * 7 Partituras em PDF (sem extensão, magic bytes PDF-1.7):
    * `0. 1` (`arq-0805`, 59.988 bytes, SHA-256: `decfdf2e34bb85ed4fdfd8d47b594bca4e659b85c2c77d290c0570b55146c05d`)
    * `1. 2` (`arq-0806`, 60.106 bytes)
    * `2. 3` (`arq-0807`, 59.907 bytes)
    * `3. 4` (`arq-0808`, 59.734 bytes)
    * `4. 5` (`arq-0809`, 59.761 bytes)
    * `5. 6` (`arq-0810`, 59.563 bytes)
    * `6. 7` (`arq-0811`, 59.593 bytes)
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem e Página a Inspecionar:** 00:30 a 05:00 do vídeo `00000414` e página 1 do PDF `0. 1` (`arq-0805`).
* **Lacunas do Material Original:**
  * O vídeo aborda as peças diretamente, mas não explicita a técnica de leitura prévia (separar a leitura do ritmo da digitação das notas).
  * A partitura não traz indicação detalhada de dedilhado para a mão direita (alternância i-m).
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Localizar Mi, Fá e Sol na 1ª corda e Si, Dó e Ré na 2ª corda no braço do violão.
  * *Prática Guiada em 3 Tempos:* 1) Bater o ritmo da partitura falando os tempos; 2) Falar o nome das notas no tempo; 3) Tocar no violão com alternância rigorosa de indicador e médio.
  * *Verificação de Saída:* Leitura e execução contínua da peça da partitura `0. 1` em tempo estrito sem olhar para a mão esquerda por mais de 50% do tempo.

---

### Aula Candidata 5: Acompanhamento Percussivo — Thumb Slap e Batida Fingerstyle
* **ID da Aula Proposta:** `aula-prop-012` (`mod-ped-03`)
* **ID da Entrada de Origem:** `aula-kaiser-18-5-thumb-slap-batida-fingerstyle` (Kaiser Módulo 1)
* **Habilidade Principal:** `hab-rit-004` (Levada Pop Swing / Thumb Slap)
* **Arquivos Físicos Associados:**
  * Vídeo: `00000057.mp4` (`arq-0447`, 92.484.582 bytes, SHA-256: `b70743b17c99252c89283f3e1bfbb1e5ff078c544d6735cfaeb63c12eb69446f`)
  * Legenda: `00000057.vtt` (`arq-0448`, 4.885 bytes)
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem a Inspecionar:** 01:20 a 04:50 (mecânica do golpe de slap com a lateral do polegar contra as cordas graves).
* **Lacunas do Material Original:**
  * Falta um alerta ergonômico explícito sobre tensão no punho: muitos alunos golpeiam com excesso de rigidez no antebraço, arriscando tendinite.
  * Falta isolar o golpe percussivo do toque simultâneo dos dedos agudos (puxada das cordas primas).
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Domínio do arpejo básico p-i-m-a (`hab-tec-004`).
  * *Alerta Ergonômico Autoral:* O slap não decorre de força muscular bruta do punho, mas de um movimento de rotação relaxada do antebraço (como girar uma maçaneta). Se houver impacto doloroso no traste, a mecânica está incorreta.
  * *Verificação de Saída:* Sustentar 8 compassos da levada com slap preciso nos tempos 2 e 4 em andamento de 70 BPM.

---

### Aula Candidata 6: Violão Solo Polifônico — Pequena Valsa (Ferdinando Carulli)
* **ID da Aula Proposta:** `aula-prop-013` (`mod-ped-12`)
* **ID da Entrada de Origem:** `aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol` (Kaiser Módulo 9)
* **Habilidade Principal:** `hab-sol-001` (Textura Polifônica a Duas Vozes no Violão Solo)
* **Arquivos Físicos Associados:**
  * Vídeo: `00000452.mp4` (`arq-0879`, 181.764.120 bytes, SHA-256: `3b3a0c5fbf967520e5c9475080c984ca3b30e12d486be51086e1eec50e6402ea`)
  * Legenda: `00000452.vtt` (`arq-0880`, 15.111 bytes)
  * PDF sem extensão: `0. Ferdinando Carulli - Pequena Valsa` (`arq-0881`, 63.456 bytes, SHA-256: `416d8e27c1328325a7749007fef7b5a837562095f9d1a3c7a36cb0cf0ea58a74`)
* **Nível de Inspeção Atual:** `nivel_1_sumario_tecnico`
* **Hipótese de Minutagem e Trecho a Inspecionar:** 00:00 a 03:30 de `00000452.mp4` (exposição da Seção A, compassos 1 a 8) e página única do PDF `arq-0881`.
* **Lacunas do Material Original:**
  * A execução original trata a peça em bloco sem ensinar a independência dinâmica entre a melodia superior (cantabile, primeiro plano sonoro) e os baixos de acompanhamento (segundo plano).
  * Ausência de instruções para amortecer ressonâncias indesejadas de cordas graves soltas.
* **Especificação Autoral a Desenvolver (14 Itens):**
  * *Entrada:* Leitura de partitura em primeira posição (`hab-lei-003`) e dedilhado simples (`hab-tec-004`).
  * *Tríade de Exercícios:* Preparação (tocar apenas a melodia com dedos i-m com apoio); Alvo (tocar melodia e baixo simultâneos a 60 BPM em 3/4); Variação (ajustar dinâmica: melodia mf / baixo p).
  * *Verificação de Saída:* Performance completa da Seção A (8 compassos) com equilíbrio sonoro claro entre melodia e baixo, sem interrupções rítmicas nas viradas de compasso.
