# Relatório de Verificação Algorítmica e Simbólica — Lote 3 (Revisado)

**Data:** 13/09/2026  
**Status:** AUDITORIA COMPUTACIONAL CONCLUÍDA SEM ERROS  
**Arquivo de Dados:** `EVENTOS.json` | **Tabelas:** `EXERCICIOS.md` | **Script:** `validar.cjs`

---

## 1. Distinção Metodológica: O que foi Executado, Conferido Manualmente e Não Verificado

> [!IMPORTANT]
> **Declaração de Transparência Epistemológica:**
> 1. **Executado por Script (`validar.cjs` via Node.js):**
>    - Auditoria de continuidade temporal e fechamento estrito de 4.0 pulsos por compasso em todas as vozes ativas.
>    - Verificação exata da altura soante em SPN contra afinação teórica de cada corda e casa (`open[corda] + casa`).
>    - Escaneamento geométrico de colisões físicas (zero sobreposições temporais na mesma corda; ausência de mesmo dedo esquerdo em casas distintas simultâneas; ausência de mesmo dedo direito em ataques simultâneos).
>    - Correspondência unívoca campo a campo entre os 276 eventos das 12 tabelas em Markdown e as 12 versões estruturadas no JSON (6 principais e 6 variantes).
>    - Verificação das notas constituintes nos acordes corrigidos (C, G/B, Am, C/G em Ex. 5; G/B, C/G, C/E em Ex. 6) e confirmação de que a voz melódica ocupa a posição estritamente superior.
>    - Verificação dos 32 blocos de sessão de 40 minutos em `UNIDADE-02.md` e `UNIDADE-03.md` (contiguidade e soma de 40 min).
> 2. **Conferido Manualmente:**
>    - Alinhamento visual das tablaturas em texto compasso a compasso por pulso, diferenciando ataque, sustentação (`===`) e pausas.
>    - Correção dos textos pedagógicos da Semana 11 e Semana 12 (distinção entre tríade completa e voicing contextual incompleto; F4 em 1ª corda casa 1; encerramento conjunto no c.8).
>    - Identificação de links de vídeo e especificação de durações declaradas no manifesto sem invenção de minutagem medida.
> 3. **Não Verificado (Limitações Intransponíveis em Validação Simbólica):**
>    - **Teste físico no instrumento real com mãos humanas:** A viabilidade geométrica não substitui a experimentação motora do aluno.
>    - **Audição musical e intenção expressiva:** Um script não avalia timbre, beleza acústica ou dinâmica cantabile.
>    - **Vídeos integrais do acervo:** Não foram assistidos integralmente; trechos são marcados como não verificados além dos metadados catalogados.

## 2. Sistema de Afinação e Convenção de Oitava (SPN)

O sistema adota afinação padrão de concerto (A4 = 440 Hz). As alturas são expressas em **Scientific Pitch Notation (SPN)** das **alturas reais soantes**:

| Corda | Nome Tradicional | Altura Real Soante (SPN) | Frequência Fundamental | Notação Convencional de Violão |
|:---:|:---:|:---:|:---:|:---|
| 6ª | Mi bordão | **E2** (MIDI 40) | 82,41 Hz | Notada uma oitava acima (E3) na clave de sol |
| 5ª | Lá | **A2** (MIDI 45) | 110,00 Hz | Notada uma oitava acima (A3) |
| 4ª | Ré | **D3** (MIDI 50) | 146,83 Hz | Notada uma oitava acima (D4) |
| 3ª | Sol | **G3** (MIDI 55) | 196,00 Hz | Notada uma oitava acima (G4) |
| 2ª | Si | **B3** (MIDI 59) | 246,94 Hz | Notada uma oitava acima (B4) |
| 1ª | Mi prima | **E4** (MIDI 64) | 329,63 Hz | Notada uma oitava acima (E5) |

*Esclarecimento de transposição:* O violão é um instrumento transpositor por oitava inferior. Qualquer notação convencional em pauta representa as notas uma oitava acima do som real que ressoa no ar. A notação em pauta não foi exigida nesta entrega.

## 3. Resumo dos Resultados do Verificador `validar.cjs`

A execução automatizada de `validar.cjs` no ambiente Node.js produziu:

- **Erros Detectados:** **0 (Zero)**
- **Versões de Exercício Verificadas:** 12 (6 principais + 6 variantes)
- **Tabelas em Markdown Auditadas:** 12 tabelas correspondentes (276 eventos totais)
- **Sessões Verificadas:** 32 sessões de 40 minutos (16 em U2 e 16 em U3)
- **Duração de 16 Compassos a 50–56 BPM:** `[68.57 s, 76.80 s]` (~69 a 77 segundos, sem contagem inicial)

## 4. Auditoria Harmônica dos Acordes Corrigidos

| Exercício / Compasso | Acorde / Inversão | Baixo | Voz Interna | Melodia (Topo) | Notas Constituintes | Posição Melódica Superior? |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Ex. 5 c.1 | C fundamental | C3 (5/3) | G3 (3/0) | E4 (1/0) | C, G, E (Tríade completa) | ✅ Sim (E4 > G3 > C3) |
| Ex. 5 c.2 | G/B (1ª inversão) | B2 (5/2) | G3 (3/0) | D4 (2/3) | B, G, D (Tríade completa) | ✅ Sim (D4 > G3 > B2) |
| Ex. 5 c.3 | Am fundamental | A2 (5/0) | E3 (4/2) | C4 (2/1) | A, E, C (Tríade completa) | ✅ Sim (C4 > E3 > A2) |
| Ex. 5 c.4 | C/G (2ª inversão) | G2 (6/3) | C4 (2/1) | E4 (1/0) | G, C, E (Tríade completa) | ✅ Sim (E4 > C4 > G2) |
| Ex. 6 c.2 | G/B (Inversão 1) | B2 (5/2) | G3 (3/0) | D4 (2/3) | B, G, D (Tríade completa) | ✅ Sim (D4 > G3 > B2) |
| Ex. 6 c.4 | C/G (Inversão 2) | G2 (6/3) | C4 (2/1) | E4 (1/0) | G, C, E (Tríade completa) | ✅ Sim (E4 > C4 > G2) |
| Ex. 6 c.7 | C/E (Inversão 3) | E3 (4/2) | G3 (3/0) | C4 (2/1) | E, G, C (Tríade completa) | ✅ Sim (C4 > G3 > E3) |

## 5. Auditoria de Término do Som e Encerramento Conjunto

- **Ex. 2 e Ex. 3 (Compasso 8):** O baixo C3 foi ajustado para duração nominal de 3.0 pulsos (término 4.0), seguido de pausa de semínima no pulso 4.0 (término 5.0). A melodia C4 e a voz interna G3 seguem a mesma métrica (ataque no pulso 1.0, término 4.0, pausa de 4.0 a 5.0).
- **Diferenciação de Dedos no Ataque Final (Ex. 3 c.8):** Baixo com polegar (*p*), voz interna com indicador (*i*), melodia com médio (*m*). Zero conflitos de dedos simultâneos da mão direita.
- **Amortecimento Ativo:** A cessação do som no pulso 4.0 é explicada como amortecimento ativo com a mão direita, eliminando qualquer presunção de sustentação por apoio do polegar.

## Complemento Codex — 13/09/2026

Corrigida a contagem para 276 eventos por representação (JSON e Markdown). As seis tabs principais foram regeneradas dos eventos com colunas de um pulso; TABLATURAS-COMPLETAS.md inclui também as variantes. Corrigidos classificação de G3, explicações de voicings e critérios de avaliação. A validação de acorde do script examina sete compassos principais; não é uma interpretação harmônica de todos os exercícios.
