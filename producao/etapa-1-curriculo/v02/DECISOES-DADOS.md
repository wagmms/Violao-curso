# Decisões de Arquitetura e Modelagem de Dados Pedagógicos

**Data de Emissão:** 14/09/2026  
**Versão do Documento:** v02 (Revisada em conformidade com o Parecer Codex)  
**Produtor:** Antigravity  
**Revisor:** Codex  

---

## 1. Arquitetura Lógica de Dados para Uso Offline

Em conformidade com a natureza local e offline do aplicativo e ferramentas atuais, o modelo de dados pedagógico é estruturado como um **Document Store JSON Normalizado com Chaves Estrangeiras Declarativas**, dispensando a imposição de bancos de dados relacionais pesados em servidores externos.

### 1.1. Separação Rígida em Duas Camadas (Ingestão vs. Domínio)
1. **Camada de Ingestão e Auto-Índice (Somente Leitura):**
   * O acervo de mídia em disco e o arquivo `ARQUIVOS-FISICOS.json` são imutáveis e puramente técnicos.
   * Scripts de reindexação do acervo operam estritamente sobre arquivos físicos e geram metadados brutos.
2. **Camada de Domínio Curatorial (Autoral):**
   * Os arquivos `MAPA-HABILIDADES.json`, `AULAS-PROPOSTAS.json`, `DESTINOS-EDITORIAIS.json` e a matriz de fontes pertencem à esfera pedagógica.
   * Nenhuma rotina de indexação automática tem permissão para sobregravar ou truncar dados curriculares autorais.

---

## 2. Modelagem do Contrato Didático de 14 Itens com Suporte a Disciplinas

O contrato didático de 14 itens (`SCHEMAS/aula-pedagogica.schema.json`) acomoda as especificidades de cada disciplina musical:

* **Aulas Instrumentais (Mecânica e Repertório):** Exigem especificação de digitação de mão esquerda/direita, cordas, casas, padrão métrico e andamento sugerido em BPM.
* **Aulas de Percepção / Ouvido:** Exigem gabarito auditivo, número de repetições, notas de referência e separação estrita entre identificação cega e entoação vocal.
* **Aulas de Leitura e Notação:** Exigem indicação de pauta/clave, figuras rítmicas e exercícios preparatórios sem metrônomo prévio antes da sincronização rítmica.
* **Antecipação de Erros:** Exige ao menos dois erros plausíveis documentados por aula, cada qual com seu sinal observável, causa mecânica provável e intervenção sugerida.
* **Transferência em Novo Contexto:** O item de retenção exige uma tarefa aplicada em contexto musical inédito (outra canção ou tonalidade), diferenciando-se da mera repetição mecânica.

---

## 3. Rastreamento de Progresso e Navegação

* **Autodeclaração com Critérios:** O progresso do estudante é baseado no preenchimento de checklists objetivos de autoavaliação após as sessões de estudo.
* **Sem Falso Diagnóstico Automático:** O sistema não alega possuir sensores de áudio/vídeo capazes de detectar erros motores sem observação direta; rotas de recuperação são oferecidas com base em sintomas selecionados pelo próprio estudante.
* **Revisão Espaçada Ativa:** Lembretes periódicos de prática apoiam a retenção da memória muscular e auditiva, sem penalidades ou rebaixamento automático de competência por tempo decorrido.
