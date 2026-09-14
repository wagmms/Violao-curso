# Relatório de Verificação Algorítmica e Simbólica — Lote 3

**Data:** 12/09/2026  
**Status Geral:** APROVADO COM RIGOR SIMBÓLICO  
**Arquivo de Dados:** `EVENTOS.json` | **Tabelas:** `EXERCICIOS.md`

---

## 1. Declaração Metodológica e Limitação de Validação

> [!IMPORTANT]
> **Limitação Fundamental:** As verificações apresentadas neste documento são de natureza estritamente **simbólica, matemática, geométrica e algorítmica**. Elas asseguram que a notação é coerente, que a soma das durações por voz fecha a métrica sem sobras nem faltas, que não há duas notas soando ao mesmo tempo na mesma corda física e que as posições anatômicas sugeridas são geometricamente viáveis no braço padrão do violão clássico (cordas de nylon).
> 
> **Esta validação formal NÃO substitui nem equivale ao teste físico em um instrumento real com as mãos do aluno.** As digitações de mão esquerda (ME) e mão direita (MD) são proposições didáticas recomendadas, cabendo ao aluno e ao professor ajustá-las conforme sua conformação e conforto motor, sem presunção de superioridade anatômica absoluta.

## 2. Sistema de Afinação e Alturas Sonoras (SPN)

O gerador computacional utiliza afinação padrão de concerto (A4 = 440 Hz). As alturas no `EVENTOS.json` e nas tabelas utilizam a **Scientific Pitch Notation (SPN)** das **alturas reais soantes**:

| Corda | Nome Tradicional | Altura Real Soante (SPN) | Frequência Fundamental | Notação em Partitura de Violão (Clave de Sol) |
|:---:|:---:|:---:|:---:|:---|
| 6ª | Mi bordão | **E2** (MIDI 40) | 82,41 Hz | Escrita no 3º espaço suplementar inferior (E3) |
| 5ª | Lá | **A2** (MIDI 45) | 110,00 Hz | Escrita na 2ª linha suplementar inferior (A3) |
| 4ª | Ré | **D3** (MIDI 50) | 146,83 Hz | Escrita logo abaixo da 1ª linha da pauta (D4) |
| 3ª | Sol | **G3** (MIDI 55) | 196,00 Hz | Escrita na 2ª linha da pauta (G4) |
| 2ª | Si | **B3** (MIDI 59) | 246,94 Hz | Escrita na 3ª linha da pauta (B4) |
| 1ª | Mi prima | **E4** (MIDI 64) | 329,63 Hz | Escrita no 4º espaço da pauta (E5) |

*Nota de transposição:* O violão é um instrumento transpositor por oitava inferior. Qualquer leitura tradicional de partitura representa as notas uma oitava acima do som real que vibra nas cordas acústicas.

## 3. Auditoria Algorítmica das Somas de Pulsos por Voz e Compasso

Em compasso 4/4 quaternário simples, a unidade de tempo é a semínima (= 1.0 pulso). Cada compasso exige rigorosamente **4.0 pulsos** por voz ativa.

### EX1 — Melodia Cantabile de Primeiro Canto

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 5 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 6 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 7 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 8 | melodia | **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


### EX2 — Primeiro Canto a Duas Vozes (Melodia e Baixo)

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 5 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 6 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 7 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 8 | baixo, melodia | **baixo**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


### EX3 — Primeiro Canto Completo — Arranjo em Três Camadas

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 5 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 6 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 7 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 8 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


### EX4 — Tríades e Inversões em Três Cordas com Melodia Superior

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


### EX5 — Condução Linear de Baixos por Notas Comuns

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


### EX6 — Estudo Polifônico com Duas Inversões Justificadas

| Compasso | Vozes Ativas | Somas por Voz (pulsos) | Soma Correta (= 4.0)? | Colisões de Mesma Corda |
|:---:|:---|:---|:---:|:---|
| 1 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 2 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 3 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 4 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 5 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 6 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 7 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |
| 8 | baixo, interna, melodia | **baixo**: 4.0, **interna**: 4.0, **melodia**: 4.0 | ✅ Sim (4.0) | Nenhuma (Zero conflitos) |


## 4. Auditoria de Colisões Físicas de Corda

- **Critério de Colisão Física:** Duas notas com intervalos de tempo sobrepostos `[pulso_entrada, termino_pulso[` atribuídas à mesma corda física violam a lei acústica do instrumento (uma única corda não pode vibrar em dois comprimentos diferentes simultaneamente).
- **Resultado do Escaneamento:** **Zero colisões detectadas em todos os 6 exercícios.** Em passagens polifônicas simultâneas, baixos, vozes internas e melodia superior ocupam cordas distintas e independentes.
  - *Exemplo Ex. 3 (c.2):* Baixo na 5ª corda (A2), Voz Interna na 3ª corda (G3), Melodia na 2ª corda (C4) — Três cordas distintas.
  - *Exemplo Ex. 4 (c.2 C/E):* Baixo na 4ª corda (E3), Voz Interna na 3ª corda (G3), Melodia na 2ª corda (C4) — Três cordas distintas.
  - *Exemplo Ex. 6 (c.2 G/B):* Baixo na 5ª corda (B2), Voz Interna na 3ª corda (G3), Melodia na 2ª corda (D4) — Três cordas distintas.

## 5. Auditoria de Término do Som e Articulação

O modelo de dados implementa explicitamente os três estados físicos de finalização sonora exigidos pelo Codex:

1. **Sustentação por Duração:** O dedo permanece na casa ou a corda solta ressoa durante toda a duração nominal da nota (`termino_pulso = pulso_entrada + duracao_pulsos`).
2. **Corte por Novo Ataque:** A nota anterior cessa automaticamente quando a mesma corda é reatacada para produzir uma nova nota.
3. **Pausa e Abafamento Intencional:** As pausas são eventos formais de duração. O término sonoro ocorre por amortecimento deliberado (abafamento com polpa da mão direita ou relaxamento da pressão do dedo da mão esquerda sem retirá-lo da corda), garantindo o silêncio e a respiração musical antes da próxima frase.

## 6. Consistência entre `EVENTOS.json` e `EXERCICIOS.md`

Todas as tabelas de eventos em `EXERCICIOS.md` derivam diretamente dos mesmos objetos e vetores estruturados em `EVENTOS.json`:
- Mesmas vozes (`melodia`, `baixo`, `interna`).
- Mesmos pulsos de entrada e término.
- Mesmas cordas, casas e alturas soantes em SPN.
- Mesmas digitações sugeridas (ME e MD).
