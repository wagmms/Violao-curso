# Relatório de Revisão Musicológica e Pedagógica — cand-004 v02

Data: 14/09/2026. Versão: v02-aula-completa. Candidato: cand-004 (Leitura na 1ª Posição).

---

## 1. Precisão Notacional e Calibragem da Clave de Sol (AC-01)

Na versão v01, o revisor Codex constatou que o glifo da Clave de Sol (`\U0001D11E` na fonte *Segoe UI Symbol*) estava posicionado de modo que a espiral interna envolvia a linha inferior (Linha 1 / Mi 4), e não a Linha 2 (Sol 4), gerando contradição direta com o conteúdo ensinado.

### Diagnóstico e Solução Aplicada
- No arquivo `scratch/test_clef_offset.py`, foram renderizados 10 testes com variações de deslocamento vertical (de -35 a +10 pixels escalados).
- Comprovou-se visual e geometricamente que o centro da espiral do glifo situa-se ligeiramente abaixo do seu ponto médio de renderização padrão.
- Ao aplicar o deslocamento vertical calibrado (`y_clef = line2_y - 10 * scale`), a espiral central abraça **exatamente a segunda linha da pauta** (`lines[3]`), alinhando-se com a nota Sol 4 (196,0 Hz sonoro / G3 no violão).
- Esse ajuste foi replicado em **todos** os recursos gráficos:
  1. `pauta-limpa.png` e `pauta-limpa.svg`
  2. `pauta-anotada.png`
  3. `pauta-celular.png`
  4. `sistema-1-c1-c2.png` e `sistema-2-c3-c4.png`
  5. `recursos/tarefa-transferencia/transferencia-pauta-limpa.png` e `.svg`
  6. `recursos/tarefa-transferencia/transferencia-pauta-gabarito.png`

---

## 2. Parâmetros Acústicos e Convenção de Oitava do Violão

- **Convenção de Oitava:** O violão soa uma 8ª abaixo do escrito na Clave de Sol.
- **Tabela de Alturas e Frequências Conferidas:**

| Nota Escrita | Posição na Pauta | Altura Sonora | Frequência Teórica | Frequência no Áudio WAV | Corda | Casa | Dedo |
|---|---|---|---|---|---|---|---|
| **Dó 4 (C4)** | 1ª linha suplementar inf. | Dó 3 (C3) | 130,81 Hz | 130,81 Hz | 5ª corda | Casa 3 | Dedo 3 |
| **Ré 4 (D4)** | Espaço abaixo da 1ª linha | Ré 3 (D3) | 146,83 Hz | 146,83 Hz | 4ª corda | Solta (0) | — |
| **Mi 4 (E4)** | 1ª linha da pauta | Mi 3 (E3) | 164,81 Hz | 164,81 Hz | 4ª corda | Casa 2 | Dedo 2 |
| **Fá 4 (F4)** | 1º espaço da pauta | Fá 3 (F3) | 174,61 Hz | 174,61 Hz | 4ª corda | Casa 3 | Dedo 3 |
| **Sol 4 (G4)** | 2ª linha da pauta | Sol 3 (G3) | 196,00 Hz | 196,00 Hz | 3ª corda | Solta (0) | — |
| **Lá 4 (A4)** | 2º espaço da pauta | Lá 3 (A3) | 220,00 Hz | 220,00 Hz | 3ª corda | Casa 2 | Dedo 2 |

---

## 3. Gradação Mecânica do Amortecimento (AC-07)

- **Fase de Preparação (48 BPM):** O aluno prioriza a precisão da localização da nota e o pulso contínuo. A ressonância simultânea da 3ª corda solta é tolerada sem penalização.
- **Fase Alvo (60 BPM):** Introduz-se o gesto natural da mão direita: ao atacar o Fá na 4ª corda (tempo 1 do c.3), o dedo indicador ou polegar da mão direita encosta suavemente na 3ª corda para calar o Sol residual, limpando o encadeamento sonoro.

---

## 4. Estruturação das Variações Melódicas (AC-03)

- **Variação A (Inversão dos Sistemas):** Tocar c.3-c.4 (`Fá Fá Mi Mi | Ré Ré Dó(2)`) seguido de c.1-c.2 (`Dó Dó Sol Sol | Lá Lá Sol(2)`). Mantém 100% das mesmas notas e figuras, mas quebra o padrão motor decorado.
- **Variação B (Dinâmica em Eco):** Executar c.1-c.2 em $mf$ e c.3-c.4 em $p$. Exercita o controle fino de intensidade da mão direita sem adicionar complexidade de notas novas.
