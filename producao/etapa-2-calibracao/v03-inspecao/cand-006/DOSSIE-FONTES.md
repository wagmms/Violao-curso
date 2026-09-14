# Dossiê de Fontes e Inspeção Analítica — cand-006 (Pequena Valsa de Carulli)

Data: 14/09/2026. Produtor: Antigravity. Revisor: Codex.  
Status da Entrega: `aguardando_revisao`.

---

## 1. Identificação e Proveniência Física da Fonte

Os metadados da fonte documental física foram verificados diretamente na base canônica `ARQUIVOS-FISICOS.json` da Etapa 0 v04:

- **ID do Arquivo:** `arq-0460`
- **Nome Original no Sistema de Arquivos:** `0. Pequena Valsa` (arquivo PDF sem extensão nominal no disco)
- **Caminho Relativo no Acervo:** `Curso Kaiser/Repertório Nível 1/1. Repertório Nível 1/10. Pequena Valsa (Ferdinando Carulli) - Violão Clássico/0. Pequena Valsa`
- **Tamanho Físico em Bytes:** 128.104 bytes
- **Hash SHA-256:** `8a6ab1739f7eec07f758aec998244e82d891b280ba43bf87b003e78328252b32`
- **Origem no Acervo:** Kaiserplay
- **Tipo Detectado:** PDF (Partitura e Tablatura)
- **Entrada do Catálogo Reconciliada:** `aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol`
- **Fontes de Origem Declaradas:** `fontesOrigem: ["aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol"]`

---

## 2. Vínculos Curriculares na Arquitetura da Etapa 1 (v03)

O mapeamento curricular foi validado na mesma linha de `MATRIZ-FONTE-AULA.csv`:
- **ID da Proposta Curricular:** `aula-prop-029` (*Polifonia a Duas Vozes: Pequena Valsa de Carulli*)
- **Módulo Pedagógico:** `mod-ped-12` (*12. Violão Solo e Arranjo Fingerstyle*)
- **Habilidade Principal:** `hab-sol-001` (*Melodia com Baixo Simultâneo / Textura Polifônica a Duas Vozes*)
- **Habilidade Secundária:** `hab-tec-004` (*Técnica de Dedilhado e Arpejos*)
- **Decisão Editorial:** `manter_aula_individual`

---

## 3. Afirmações Factualmente Observadas no Documento (`arq-0460`)

A inspeção visual foi realizada sobre a renderização gráfica de alta resolução da página 1 do PDF (`producao/etapa-2-calibracao/revisao-codex/arq-0460.png`). Foram observados:

1. **Cabeçalho:** Título "Valsa", compositor "F. Carulli", indicação "Standard tuning" e faixa instrumental "N-Gt" (violão com cordas de nylon).
2. **Fórmula de Compasso:** Grafada explicitamente como **3/8** tanto na pauta musical (clave de Sol) quanto na tablatura (6 linhas).
3. **Armadura de Clave:** Ausência total de sustenidos ou bemóis na armadura (tonalidade de Dó Maior / Lá menor).
4. **Indicação Dinâmica e Estrutural:** Marcação $mf$ (*mezzoforte*) abaixo do compasso 1 e rótulo "Primeira Parte" com barra de repetição (`|:`).
5. **Compasso 1 (Sistema 1):**
   - **Voz 2 (Baixo):** Nota Dó central (C4 escrito) na 1ª linha suplementar inferior com haste para baixo e ponto de aumento (`.`), indicando **semínima pontuada**. Na tablatura correspondente, consta o número `3.` (5ª corda) com ponto de aumento.
   - **Voz 1 (Agudos):** Haste vertical subindo no tempo 1 até a barra horizontal de ligação; tempos 2 e 3 apresentam bicordes em colcheia compostos por Dó5 escrito (2ª corda casa 1) e Mi5 escrito (1ª corda solta).
6. **Compasso 2 (Sistema 1):**
   - **Voz 2 (Baixo):** Nota Ré4 escrito (4ª corda solta) com haste para baixo e ponto de aumento (`0.` na tablatura).
   - **Voz 1 (Agudos):** Bicordes em colcheia nos tempos 2 e 3 compostos por Si4 escrito (2ª corda solta) e Fá5 escrito (1ª corda casa 1).
7. **Compasso 3 (Sistema 1):** Idêntico ao Compasso 1 (Baixo C4 pontuado + bicordes [Dó5, Mi5]).
8. **Compasso 4 (Início do Sistema 2):**
   - Numerado com "4" no início do segundo sistema.
   - Apresenta frase melódica em 3 colcheias unidas por barra superior: Sol5 escrito (1ª corda casa 3), Mi5 escrito (1ª corda solta) e Sol4 escrito (3ª corda solta).
   - Não há nota de baixo atacada nos bordões neste compasso.

---

## 4. Afirmações Inferidas e Contexto Teórico

1. **Tonalidade e Cadência Harmônica:** O contexto musical comprova com segurança a tonalidade de **Dó Maior**:
   - Compasso 1: Tônica Dó Maior ($I$, acorde C).
   - Compasso 2: Dominante Sol com sétima com baixo na 5ª justa ($V^4_3$ ou $V_7/D$, trítono sensível Si-Fá sobre o baixo Ré).
   - Compasso 3: Resolução tônica em Dó Maior ($I$).
   - Compasso 4: Condução melódica sobre o arpejo tônico descendente (Sol - Mi - Sol).
2. **Convenção Sonora do Violão:** A música para violão soa uma oitava abaixo da notação escrita em clave de Sol:
   - C4 escrito = C3 sonoro (130,81 Hz) na 5ª corda casa 3.
   - D4 escrito = D3 sonoro (146,83 Hz) na 4ª corda solta.
   - C5 escrito = C4 sonoro (261,63 Hz) na 2ª corda casa 1.
   - E5 escrito = E4 sonoro (329,63 Hz) na 1ª corda solta.
   - B4 escrito = B3 sonoro (246,94 Hz) na 2ª corda solta.
   - F5 escrito = F4 sonoro (349,23 Hz) na 1ª corda casa 1.
   - G5 escrito = G4 sonoro (392,00 Hz) na 1ª corda casa 3.
   - G4 escrito = G3 sonoro (196,00 Hz) na 3ª corda solta.
3. **Ergonomia e Digitação Recomendada:**
   - Mão esquerda na 1ª posição fixa: dedo 3 no baixo C3 (corda 5 casa 3); dedo 1 no C4 (corda 2 casa 1); no c.2, o dedo 1 move-se para Fá4 (corda 1 casa 1); no c.4, o dedo 3 (ou 4) ataca Sol4 (corda 1 casa 3).
   - Mão direita: polegar ($p$) nos bordões (cordas 5, 4 e 3); indicador ($i$) e médio ($m$) nos bicordes e melodia.

---

## 5. Decisões Autorais do Produtor

1. **Delimitação Didática do Trecho:** Para calibração da habilidade `hab-sol-001`, delimitou-se estritamente a primeira semifrase da peça: **Compassos 1 a 4** (total de 12 colcheias por voz).
2. **Separação Rigorosa de Vozes:** Cada voz (Voz 1 - agudos e Voz 2 - baixo) é contabilizada com exatamente **3 colcheias por compasso** em `EVENTOS.json`, totalizando 12 colcheias em 4 compassos. A sobreposição temporal entre o baixo sustentado (semínima pontuada = 3 colcheias) e os bicordes nos tempos 2 e 3 reflete fielmente a textura polifônica do violão solo.
3. **Áudio de Síntese:** Gerado `recursos/referencia-audio-sintese.wav` com ondas senoidais puras para aferição objetiva de pulso e alturas sonoras. Declarado explicitamente como referência acústica de alturas/tempos, sem pretensão de demonstrar timbre acústico ou técnica de mão.

---

## 6. Método e Limitações Honestamente Declaradas

- **Inspeção Documental:** A auditoria baseia-se na partitura `arq-0460`.
- **Conteúdo Audiovisual Pendente:** O arquivo `arq-0461` (`1. Aula.mp4`) não foi assistido ou analisado auditivamente nesta etapa de calibração preliminar. Nenhuma indicação postural, dica verbal ou demonstração gestual do professor Kaiserplay é afirmada como observada.
- **Status:** O pacote cand-006 encerra-se formalmente com status **`aguardando_revisao`** do revisor Codex.
