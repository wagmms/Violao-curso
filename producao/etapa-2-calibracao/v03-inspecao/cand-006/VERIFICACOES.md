# Relatório de Verificações Analíticas e Métrica 3/8 — cand-006

Data: 14/09/2026. Produtor: Antigravity. Revisor: Codex.  
Status: `aguardando_revisao`.

---

## 1. Auditoria da Fórmula de Compasso e Métrica em 3/8 (Item I-04)

- **Compasso da Fonte:** 3/8 visualmente comprovado na página 1 de `arq-0460.png`.
- **Cálculo de Tempos por Compasso:**
  - Cada colcheia $= 1{,}0$ tempo da métrica.
  - Cada compasso contém exatamente $3{,}0$ colcheias.
  - Em 4 compassos: $4 \times 3{,}0 = \mathbf{12{,}0\text{ colcheias}}$ por voz.
- **Conferência em EVENTOS.json:**
  - Voz 1 (Agudos):
    - c.1: $1{,}0\text{ (pausa)} + 1{,}0\text{ (bicorde)} + 1{,}0\text{ (bicorde)} = 3{,}0\text{ colcheias}$
    - c.2: $1{,}0\text{ (pausa)} + 1{,}0\text{ (bicorde)} + 1{,}0\text{ (bicorde)} = 3{,}0\text{ colcheias}$
    - c.3: $1{,}0\text{ (pausa)} + 1{,}0\text{ (bicorde)} + 1{,}0\text{ (bicorde)} = 3{,}0\text{ colcheias}$
    - c.4: $1{,}0\text{ (G4)} + 1{,}0\text{ (E4)} + 1{,}0\text{ (G3)} = 3{,}0\text{ colcheias}$
    - **Total Voz 1:** $12{,}0\text{ colcheias}$
  - Voz 2 (Baixo):
    - c.1: $3{,}0\text{ colcheias (C3 pontuado sustentado)}$
    - c.2: $3{,}0\text{ colcheias (D3 pontuado sustentado)}$
    - c.3: $3{,}0\text{ colcheias (C3 pontuado sustentado)}$
    - c.4: $3{,}0\text{ colcheias (pausa pontuada)}$
    - **Total Voz 2:** $12{,}0\text{ colcheias}$

A métrica fecha com $100\%$ de rigor aritmético em ambas as vozes.

---

## 2. Auditoria da Convenção Sonora do Violão

- Altura escrita C4 (Dó central, 1ª linha suplementar inferior) $\rightarrow$ Altura sonora C3 ($130{,}81\text{ Hz}$, 5ª corda casa 3).
- Altura escrita D4 (Ré, abaixo da 1ª linha) $\rightarrow$ Altura sonora D3 ($146{,}83\text{ Hz}$, 4ª corda solta).
- Altura escrita B4 (Si, 3ª linha) $\rightarrow$ Altura sonora B3 ($246{,}94\text{ Hz}$, 2ª corda solta).
- Altura escrita C5 (Dó, 3º espaço) $\rightarrow$ Altura sonora C4 ($261{,}63\text{ Hz}$, 2ª corda casa 1).
- Altura escrita E5 (Mi, 4º espaço) $\rightarrow$ Altura sonora E4 ($329{,}63\text{ Hz}$, 1ª corda solta).
- Altura escrita F5 (Fá, 5ª linha) $\rightarrow$ Altura sonora F4 ($349{,}23\text{ Hz}$, 1ª corda casa 1).
- Altura escrita G5 (Sol, espaço superior) $\rightarrow$ Altura sonora G4 ($392{,}00\text{ Hz}$, 1ª corda casa 3).
- Altura escrita G4 (Sol, 2ª linha) $\rightarrow$ Altura sonora G3 ($196{,}00\text{ Hz}$, 3ª corda solta).

Todas as notas sonoras obedecem à regra $\text{MIDI}_{\text{sonoro}} = \text{MIDI}_{\text{escrito}} - 12$.

---

## 3. Auditoria do Áudio Sintético

- Arquivo: `recursos/referencia-audio-sintese.wav`
- Formato: WAV PCM linear, 1 canal (mono), 16 bits, 44.100 Hz.
- Duração total: exatamente $6{,}00\text{ s}$ ($264.600\text{ amostras}$).
- Rótulo de Uso: Referência estritamente métrico-frequencial de apoio analítico.
