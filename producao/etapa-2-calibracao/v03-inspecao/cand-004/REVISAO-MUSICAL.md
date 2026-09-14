# Revisão Musical e Validação Simbólica: cand-004 (v03-inspecao)

**Obra de Referência:** Peça 1 ("Brilha Brilha Estrelinha") de Kaiser 124 (`arq-0408`)  
**Adaptação Autoral:** Frase de 4 compassos regulares em 4/4 (`pauta-adaptada.png`)  
**Data:** 14/09/2026 | **Produtor:** Antigravity | **Revisor:** Codex  

---

## 1. Convenção de Oitava do Violão e Afinação Real

O violão é um **instrumento transpositor de 1 oitava**: toda música notada em Clave de Sol para violão é lida uma oitava acima do som real que o instrumento produz.
- A nota escrita na 1ª linha suplementar inferior da pauta tradicional é o Dó central (C4 escrito).
- No violão, essa nota soa uma oitava abaixo: **Dó 3 (C3)**, com frequência nominal de aproximadamente **130,81 Hz** (considerando afinação padrão Lá4 = 440 Hz).

### Tabela de Correspondência: Escrita vs Sonora vs Braço do Violão

| Nota Escrita na Pauta | Altura Escrita | Altura Sonora Real | Frequência Nominal (Hz) | Corda no Violão | Casa | Dedo da Mão Esquerda |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| 1ª linha suplementar inferior | C4 | **C3** | 130,81 Hz | **5ª corda (Lá)** | **Casa 3** | Dedo 3 (anelar) |
| Espaço abaixo da 1ª linha | D4 | **D3** | 146,83 Hz | **4ª corda (Ré)** | **Solta (Casa 0)** | Nenhum (solta) |
| 1ª linha da pauta | E4 | **E3** | 164,81 Hz | **4ª corda (Ré)** | **Casa 2** | Dedo 2 (médio) |
| 1º espaço da pauta | F4 | **F3** | 174,61 Hz | **4ª corda (Ré)** | **Casa 3** | Dedo 3 (anelar) |
| 2ª linha da pauta | G4 | **G3** | 196,00 Hz | **3ª corda (Sol)** | **Solta (Casa 0)** | Nenhum (solta) |
| 2º espaço da pauta | A4 | **A3** | 220,00 Hz | **3ª corda (Sol)** | **Casa 2** | Dedo 2 (médio) |

> **Validação de Tocabilidade (1ª Posição Estrita):**  
> Todas as 6 notas da melodia residem estritamente entre as cordas 5, 4 e 3 nas casas 0 (soltas), 2 e 3. Não há uso de casa 5 e não há qualquer deslocamento de braço.

---

## 2. Aritmética Rítmica e Estrutura Temporal da Adaptação

Fórmula de compasso: **4/4** (4 semínimas por compasso = 4 tempos inteiros).

### Compasso 1 (4 semínimas = 4 tempos)
- **ev-001:** C4 escrito (C3 real, 5ª corda c.3) — Semínima (1 tempo) — Início: tempo 1.0
- **ev-002:** C4 escrito (C3 real, 5ª corda c.3) — Semínima (1 tempo) — Início: tempo 2.0
- **ev-003:** G4 escrito (G3 real, 3ª corda solta) — Semínima (1 tempo) — Início: tempo 3.0
- **ev-004:** G4 escrito (G3 real, 3ª corda solta) — Semínima (1 tempo) — Início: tempo 4.0
- *Soma do Compasso 1:* $1 + 1 + 1 + 1 = 4$ tempos.

### Compasso 2 (2 semínimas + 1 mínima = 4 tempos)
- **ev-005:** A4 escrito (A3 real, 3ª corda c.2) — Semínima (1 tempo) — Início: tempo 1.0 (abs 5.0)
- **ev-006:** A4 escrito (A3 real, 3ª corda c.2) — Semínima (1 tempo) — Início: tempo 2.0 (abs 6.0)
- **ev-007:** G4 escrito (G3 real, 3ª corda solta) — **Mínima (2 tempos)** — Início: tempo 3.0 (abs 7.0)
- *Soma do Compasso 2:* $1 + 1 + 2 = 4$ tempos.

### Compasso 3 (4 semínimas = 4 tempos)
- **ev-008:** F4 escrito (F3 real, 4ª corda c.3) — Semínima (1 tempo) — Início: tempo 1.0 (abs 9.0)
- **ev-009:** F4 escrito (F3 real, 4ª corda c.3) — Semínima (1 tempo) — Início: tempo 2.0 (abs 10.0)
- **ev-010:** E4 escrito (E3 real, 4ª corda c.2) — Semínima (1 tempo) — Início: tempo 3.0 (abs 11.0)
- **ev-011:** E4 escrito (E3 real, 4ª corda c.2) — Semínima (1 tempo) — Início: tempo 4.0 (abs 12.0)
- *Soma do Compasso 3:* $1 + 1 + 1 + 1 = 4$ tempos.

### Compasso 4 (2 semínimas + 1 mínima = 4 tempos)
- **ev-012:** D4 escrito (D3 real, 4ª corda solta) — Semínima (1 tempo) — Início: tempo 1.0 (abs 13.0)
- **ev-013:** D4 escrito (D3 real, 4ª corda solta) — Semínima (1 tempo) — Início: tempo 2.0 (abs 14.0)
- **ev-014:** C4 escrito (C3 real, 5ª corda c.3) — **Mínima (2 tempos)** — Início: tempo 3.0 (abs 15.0)
- *Soma do Compasso 4:* $1 + 1 + 2 = 4$ tempos.

**Total da Frase Adaptada:** 14 eventos, 4 compassos, 16 tempos de semínima isócronos.

---

## 3. Contagem Métrica e Encerramento Físico de Notas

### A. Contagem da Mínima no Tempo 3
- A contagem pedagógica fundamental deve ser **"1, 2, 3, 4"** (pulso de semínimas contínuo, sem introduzir subdivisões "e" prematuramente).
- Nos compassos 2 e 4, a nota mínima é atacada no **tempo 3** e seu som é sustentado durante todo o **tempo 3 e tempo 4**.
- **Regra de Término:** O som da mínima é **encerrado precisamente no início do tempo 1 do compasso seguinte**, no momento exato em que a próxima nota é atacada. Não há prolongamento além do tempo 4 nem corte prematuro antes do final do tempo 4.

### B. Distinção entre Ataque, Sustentação e Encerramento
1. **Ataque:** O impulso percussivo da mão direita que coloca a corda em vibração.
2. **Sustentação:** A manutenção da vibração livre da corda pelo tempo prescrito pela figura rítmica (1 tempo para semínima, 2 tempos para mínima).
3. **Encerramento de Notas:**
   - **Na mesma corda:** O ataque da nota seguinte interrompe mecanicamente a vibração da nota anterior.
   - **Na mudança de corda (ex: de Sol na corda 3 para Fá na corda 4 no início do compasso 3):** Para evitar que a corda 3 continue ressoando simultaneamente sobre a corda 4 (polifonia indesejada), o estudante aprende a abafar levemente a corda 3 com a mão direita ou soltar a mão esquerda ao entrar no tempo 1 do compasso seguinte.
