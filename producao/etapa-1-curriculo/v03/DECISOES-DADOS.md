# Decisões de Modelagem de Dados — Etapa 1 (v03)

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex

---

## 1. Cardinalidade Livre na Matriz de Fontes
- Cada linha da `MATRIZ-FONTE-AULA.csv` representa uma tripla (entrada, arquivo, destinação/aula).
- Entradas com múltiplas destinações possuem múltiplas linhas explícitas (ex: `aula-mod-1-15` atende tanto `aula-prop-012` quanto `aula-prop-013`).
- Total de linhas: 633 linhas de dados, cobrindo 100% das 631 entradas canônicas.

## 2. Reforço de Validação de Schemas
- Campos textuais com `minLength: 1` para rejeição programática de strings vazias.
- Implementação de regras condicionais por disciplina no schema de aula completa.
- Bateria de 7 testes negativos intencionais integrada permanentemente ao validador oficial.
