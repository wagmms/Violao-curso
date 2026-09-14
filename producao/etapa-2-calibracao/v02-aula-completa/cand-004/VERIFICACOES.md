# Relatório de Verificações Técnicas e Validação — cand-004 v02

Data: 14/09/2026. Ambiente: Windows 11 / Node.js v26.7.0 / Python 3.12 (Pillow, Wave).

---

## 1. Verificação Visual e Ergonomia em Tela Mobile (AC-09)

- **Simulação de Viewport Mobile (375 px de largura):**
  - O viewport de 375 px (largura de referência de dispositivos como iPhone SE / Android compactos) foi utilizado para testar a legibilidade dos recursos.
  - Para visualização sem necessidade de zoom ou rolagem horizontal, foram gerados os sistemas isolados:
    - `recursos/sistema-1-c1-c2.png` (800x260 px nativos, 1600x520 px a 2x)
    - `recursos/sistema-2-c3-c4.png` (800x260 px nativos, 1600x520 px a 2x)
  - Em tela de 375 px com margens de 16 px (área útil de 343 px), a imagem do sistema escala com redução de apenas 14%, mantendo as linhas da pauta (2 px de espessura) e as cabeças de nota (16 px de diâmetro) perfeitamente nítidas e confortáveis para leitura à distância de um suporte de partitura.
  - O arquivo `recursos/pauta-celular.png` também permite leitura completa empilhada verticalmente.

---

## 2. Verificação de Concordância Bidirecional aula.json <-> AULA.md (AC-04)

- **Declaração Formal:**
  - `aula.json` é declarado a **estrutura canônica de dados** para o sistema integrado do curso.
  - `AULA.md` é declarado a **renderização instrucional mestre** para o aluno.
- **Concordância Testada:**
  - O validador `validar-aula.cjs` confere a correspondência de:
    1. Título e obra de aplicação.
    2. Identificadores de proposta (`aula-prop-017`), módulo (`mod-ped-05`) e habilidade (`hab-lei-003`).
    3. Todos os 14 itens do contrato presentes em ambas as estruturas.
    4. Correspondência de todos os 14 eventos melódicos entre `EVENTOS.json`, `aula.json` e `AULA.md`.
    5. Correspondência das durações da sessão (40 min e 20 min).

---

## 3. Verificação de Isolamento de Gabaritos e Testes Negativos (AC-02 e AC-08)

- **Detecção de Gabarito Vazado (Anti-Leakage):**
  - A seção de Avaliação de Saída de `AULA.md` foi escaneada para garantir que nenhuma resposta esteja impressa junto das perguntas.
  - Foi criado um teste negativo em `validar-aula.cjs` que injeta uma resposta fictícia e comprova que o validador falha imediatamente se detectar padrões de resposta no texto do aluno.
- **Gabarito Independente:**
  - O gabarito oficial reside exclusivamente em `recursos/gabarito-saida.md`, acessado pelo aluno apenas após a tentativa autônoma.

---

## 4. Verificação de Links Relativos e Existência de Recursos

- Todos os 15 recursos listados em `RECURSOS.json` existem no disco físico e seus caminhos relativos foram verificados.
- Não existem links quebrados em `AULA.md` nem em `aula.json`.
