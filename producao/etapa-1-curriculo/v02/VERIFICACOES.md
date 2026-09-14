# Relatório de Verificações e Testes de Integridade (v02)

**Data de Realização:** 14/09/2026  
**Lote Auditado:** `LOTE-001-CURRICULO` (v02)  
**Produtor:** Antigravity  
**Revisor:** Codex  

---

## 1. Verificação dos Grafos DAG (0 Ciclos e 0 Dependências Quebradas)

* **Grafo de Habilidades (`MAPA-HABILIDADES.json`):**
  * Total de habilidades: **29 habilidades** distribuídas em **8 domínios** (ritmo, ouvido, leitura, técnica, acompanhamento, harmonia, solo/arranjo, expressao/criacao).
  * Todos os 8 domínios possuem nós materializados no grafo.
  * Validação algorítmica via DFS: **0 ciclos** e **0 pré-requisitos inexistentes**.
* **Grafo de Aulas Propostas (`AULAS-PROPOSTAS.json`):**
  * Total de aulas propostas: **33 aulas/unidades** distribuídas nos **13 módulos pedagógicos**.
  * Validação algorítmica via DFS: **0 ciclos** e **0 pré-requisitos de aula inexistentes**.
* **Cobertura Total de Habilidades:**
  * Todas as 29 habilidades aparecem como principal ou secundária em ao menos uma proposta de aula. **Zero habilidades órfãs**.

---

## 2. Integridade Referencial da Matriz e Evidências

* **Cobertura Exaustiva da Matriz (`MATRIZ-FONTE-AULA.csv`):**
  * Todas as 631 entradas canônicas do inventário possuem registro na matriz.
  * Cada entrada possui destinação modelada: aula proposta válida OU destino editorial modelado em `DESTINOS-EDITORIAIS.json` (`dest-expansao-curadoria`, `dest-descarte-admin`, `dest-quiz-plataforma`, `dest-aguardando-backup`, `dest-recurso-complementar`).
  * **Zero IDs fictícios** (eliminados marcadores como `hab-pendente-inspecao` ou `AULA_A_CURAR_EXPANSAO`).
* **Conformidade dos Arquivos Físicos:**
  * Todos os `arquivoId` referenciados na matriz pertencem comprovadamente à respectiva entrada no inventário.
* **Integridade Referencial de Evidências (`EVIDENCIAS.csv`):**
  * 100% dos identificadores `evidenciaId` referenciados na matriz e nos documentos existem como linhas em `EVIDENCIAS.csv`.

---

## 3. Conformidade com JSON Schemas e Manifesto de Candidatos

* Schemas Draft 2020-12 implementados tanto para instâncias individuais quanto para wrappers de catálogo.
* Os seis candidatos a calibração possuem arquivos locais, tamanhos em bytes e hashes SHA-256 rigorosamente coincidentes com `ARQUIVOS-FISICOS.json`.
