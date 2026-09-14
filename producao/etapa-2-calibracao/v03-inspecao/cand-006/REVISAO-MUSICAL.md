# Revisão de Precisão Musical e Estrutura Notacional — cand-006

Data: 14/09/2026. Produtor: Antigravity. Revisor: Codex.  
Referência da Fonte: `arq-0460` (*0. Pequena Valsa*, F. Carulli, Kaiserplay).

---

## 1. Métrica, Compasso e Unidade de Contagem (Correção I-04)

- **Fórmula de Compasso Canônica:** **3/8** (três colcheias por compasso).
- **Unidade de Pulso e Contagem:** A unidade básica de subdivisão é a **colcheia** ($rac{1}{8}$ de semibreve).
- **Contagem Didática do Compasso:**
  $$\mathbf{1} \quad - \quad \mathbf{2} \quad - \quad \mathbf{3}$$
  - Tempo 1: Ataque do baixo no bordão pelo polegar (sustentado ao longo dos tempos 2 e 3).
  - Tempo 2: Ataque do primeiro bicorde (ou nota melódica).
  - Tempo 3: Ataque do segundo bicorde (ou nota melódica).
- **Andamento de Calibração:**
  - Pulso de colcheia: $120\text{ BPM}$ ($0{,}50\text{ s}$ por colcheia).
  - Duração de cada compasso de 3 colcheias: $1{,}50\text{ s}$.
  - Duração total do trecho de 4 compassos: $6{,}00\text{ s}$ ($12\text{ colcheias}$).

---

## 2. Textura Polifônica a Duas Vozes

Ao contrário de uma simplificação homofônica ou de um padrão rítmico percussivo de valsa popular, a peça de Carulli é uma **obra polifônica para violão solo clássico**, estruturada em duas vozes independentes com condução própria:

1. **Voz 2 (Baixo / Bordão — Hastes para Baixo na Notação Tradicional):**
   - No compasso 1 e 3, o baixo é a nota **Dó central (C4 escrito / C3 sonoro)** na 5ª corda, casa 3.
   - Figura rítmica: **Semínima pontuada** (duração exata de 3 colcheias, ou seja, o compasso inteiro).
   - O baixo **não é repetido 3 vezes** e **não é abafado** após o primeiro tempo: ele deve continuar ressoando enquanto os dedos tocam os agudos.
   - No compasso 2, o baixo move-se para a nota **Ré4 escrito / Ré3 sonoro** (4ª corda solta), igualmente sustentada como semínima pontuada.
   - No compasso 4, a voz do baixo faz uma pausa de compasso completo (3 colcheias de silêncio), deixando a frase melódica brilhar nos agudos.

2. **Voz 1 (Agudos / Bicordes e Melodia — Hastes para Cima na Notação Tradicional):**
   - Nos compassos 1, 2 e 3, o tempo 1 contém uma **pausa de colcheia**, permitindo que o ataque do baixo ressoe com pureza no tempo forte.
   - Os tempos 2 e 3 contêm **bicordes em colcheias**:
     - Compassos 1 e 3: $[\text{Dó5, Mi5}]$ escrito ($[\text{Dó4, Mi4}]$ sonoro), dedilhado com indicador na 2ª corda (casa 1) e 1ª corda solta.
     - Compasso 2: $[\text{Si4, Fá5}]$ escrito ($[\text{Si3, Fá4}]$ sonoro), dedilhado com 2ª corda solta e indicador na 1ª corda (casa 1).
   - No compasso 4, a voz superior assume a liderança com uma **frase melódica em 3 colcheias contínuas**:
     - Tempo 1: Sol5 escrito / Sol4 sonoro ($392{,}00\text{ Hz}$), 1ª corda, casa 3.
     - Tempo 2: Mi5 escrito / Mi4 sonoro ($329{,}63\text{ Hz}$), 1ª corda solta.
     - Tempo 3: Sol4 escrito / Sol3 sonoro ($196{,}00\text{ Hz}$), 3ª corda solta.

---

## 3. Tabela de Verificação Simbólica e Frequencial (Compassos 1 a 4)

| Comp. | Voz | Tempo Início | Duração | Figura | Nota Escrita | Nota Sonora | MIDI Escrito | MIDI Sonoro | Frequência Hz | Corda / Casa |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **c.1** | Voz 2 | 0.0 | 3.0 col | Semín. pont. | C4 | C3 | 60 | 48 | 130,81 Hz | 5ª corda, c.3 |
| c.1 | Voz 1 | 0.0 | 1.0 col | Pausa colch. | Pausa | Silêncio | — | — | — | — |
| c.1 | Voz 1 | 1.0 | 1.0 col | Colcheia | C5 + E5 | C4 + E4 | 72, 76 | 60, 64 | 261,63 + 329,63 | 2ª c.1, 1ª c.0 |
| c.1 | Voz 1 | 2.0 | 1.0 col | Colcheia | C5 + E5 | C4 + E4 | 72, 76 | 60, 64 | 261,63 + 329,63 | 2ª c.1, 1ª c.0 |
| **c.2** | Voz 2 | 0.0 | 3.0 col | Semín. pont. | D4 | D3 | 62 | 50 | 146,83 Hz | 4ª corda, c.0 |
| c.2 | Voz 1 | 0.0 | 1.0 col | Pausa colch. | Pausa | Silêncio | — | — | — | — |
| c.2 | Voz 1 | 1.0 | 1.0 col | Colcheia | B4 + F5 | B3 + F4 | 71, 77 | 59, 65 | 246,94 + 349,23 | 2ª c.0, 1ª c.1 |
| c.2 | Voz 1 | 2.0 | 1.0 col | Colcheia | B4 + F5 | B3 + F4 | 71, 77 | 59, 65 | 246,94 + 349,23 | 2ª c.0, 1ª c.1 |
| **c.3** | Voz 2 | 0.0 | 3.0 col | Semín. pont. | C4 | C3 | 60 | 48 | 130,81 Hz | 5ª corda, c.3 |
| c.3 | Voz 1 | 0.0 | 1.0 col | Pausa colch. | Pausa | Silêncio | — | — | — | — |
| c.3 | Voz 1 | 1.0 | 1.0 col | Colcheia | C5 + E5 | C4 + E4 | 72, 76 | 60, 64 | 261,63 + 329,63 | 2ª c.1, 1ª c.0 |
| c.3 | Voz 1 | 2.0 | 1.0 col | Colcheia | C5 + E5 | C4 + E4 | 72, 76 | 60, 64 | 261,63 + 329,63 | 2ª c.1, 1ª c.0 |
| **c.4** | Voz 2 | 0.0 | 3.0 col | Pausa pont. | Pausa | Silêncio | — | — | — | — |
| c.4 | Voz 1 | 0.0 | 1.0 col | Colcheia | G5 | G4 | 79 | 67 | 392,00 Hz | 1ª corda, c.3 |
| c.4 | Voz 1 | 1.0 | 1.0 col | Colcheia | E5 | E4 | 76 | 64 | 329,63 Hz | 1ª corda, c.0 |
| c.4 | Voz 1 | 2.0 | 1.0 col | Colcheia | G4 | G3 | 67 | 55 | 196,00 Hz | 3ª corda, c.0 |

---

## 4. Auditoria de Regularidade Métrica

$$\sum \text{Duração Voz 1} = 3{,}0 + 3{,}0 + 3{,}0 + 3{,}0 = \mathbf{12{,}0\text{ colcheias}}$$
$$\sum \text{Duração Voz 2} = 3{,}0 + 3{,}0 + 3{,}0 + 3{,}0 = \mathbf{12{,}0\text{ colcheias}}$$

Cada compasso totaliza rigorosamente $3{,}0$ colcheias em ambas as vozes. Não há quebra de métrica nem substituição do baixo sustentado por repetições mecânicas.
