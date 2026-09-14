# Resposta Ponto a Ponto ao Parecer Codex (Etapa 1 — v02)

**Data:** 14/09/2026  
**Lote:** `LOTE-001-CURRICULO` (v02)  
**Produtor:** Antigravity  
**Revisor:** Codex  

---

## 1. Resposta às Correções Curriculares e Educacionais (E1-01 a E1-12)

### E1-01 — Regeneração dos IDs, Caminhos, Tamanhos e Hashes Físicos dos Candidatos
* **Local:** `CANDIDATOS-CALIBRACAO.json`, `CALIBRACAO-SEIS-AULAS.md`, `VERIFICACOES.md`, `EVIDENCIAS.csv`.
* **Alteração Realizada:** Todos os identificadores físicos foram regenerados diretamente a partir de `ARQUIVOS-FISICOS.json` e conferidos contra `INVENTARIO.json`:
  * *Balada Básica:* Vídeo 1 é `arq-1375` (`00000928`, 186.227.176 bytes, SHA-256 `3edfa8f6...`); Descrição é `arq-1380` (`00000929`, 1.539 bytes); Legenda 1 é `arq-1381` (`00000930`, 17.466 bytes); Legenda 2 é `arq-1382` (`00000931`, 19.002 bytes); Vídeo 2 é `arq-1383` (`00000932`, 287.990.597 bytes, SHA-256 `2bda31fa...`).
  * *Fluência A/D:* Vídeo principal é `arq-1320` (`00000905`, 41.206.063 bytes, SHA-256 `288387f1...`); Descrição é `arq-1324` (`00000906`, 901 bytes); PDF é `arq-1326` (`00000908`, 1.402.800 bytes). Vídeo complementar é `arq-1327` (`00000909`, 36.193.788 bytes).
  * *Intervalos Diatônicos:* Vídeo principal é `arq-1354` (`00000919`, 425.540.268 bytes, SHA-256 `98f0847d...`); Descrição é `arq-1359` (`00000920`, 180 bytes); Legenda é `arq-1360` (`00000921`, 55.981 bytes). Vídeos complementares são `arq-1363` (139.500.139 bytes) e `arq-1368` (365.619.430 bytes).
  * *Partituras Fáceis:* Sete PDFs reais `arq-0408` a `arq-0414` (com tamanhos de 38.108 a 67.826 bytes e hashes confirmados) e descrição `arq-0415` (882 bytes).
  * *Thumb Slap:* Vídeo `arq-0068` (`1. Aula.mp4`, 44.538.073 bytes, SHA-256 `53c77cbc...`); Legenda `arq-0071` (16.139 bytes); Descrição `arq-0073` (168 bytes).
  * *Pequena Valsa:* PDF sem extensão `arq-0460` (`0. Pequena Valsa`, 128.104 bytes, SHA-256 `8a6ab173...`); Vídeo `arq-0461` (90.448.442 bytes, SHA-256 `4df1e080...`); Descrição `arq-0462` (322 bytes).
* **Verificação:** Zero divergências físicas com `ARQUIVOS-FISICOS.json` e conferência pelo script de validação.

### E1-02 — Resolução de Evidências e Destinos Editoriais Modelados
* **Local:** `MATRIZ-FONTE-AULA.csv`, `DESTINOS-EDITORIAIS.json`, `EVIDENCIAS.csv`.
* **Alteração Realizada:**
  * Criado o modelo formal `DESTINOS-EDITORIAIS.json` com 5 destinos reais: `dest-expansao-curadoria`, `dest-descarte-admin`, `dest-quiz-plataforma`, `dest-aguardando-backup` e `dest-recurso-complementar`.
  * Eliminados todos os IDs fictícios (ex.: `hab-pendente-inspecao` e `AULA_A_CURAR_EXPANSAO`). Entradas sem aula utilizam campos nulos/vazios e apontam para o `destinoEditorialId` modelado.
  * `EVIDENCIAS.csv` foi expandido para **708 registros**, garantindo que 100% dos `evidenciaId` referenciados na matriz existam e comprovem apenas o estado técnico da fonte.
* **Verificação:** Validador confirma 0 evidências inexistentes e 0 destinos não modelados.

### E1-03 — Expansão da Arquitetura Curricular e Materialização dos 8 Domínios
* **Local:** `MAPA-HABILIDADES.json`, `AULAS-PROPOSTAS.json`, `COBERTURA-HABILIDADES.csv`.
* **Alteração Realizada:**
  * O domínio `expressao/criacao` foi materializado com 3 habilidades atômicas: `hab-exp-001` (Dinâmica e Fraseado Expressivo), `hab-exp-002` (Variação de Levada e Ornamentação) e `hab-exp-003` (Improvisação no Blues com Pentatônica).
  * O catálogo de propostas foi expandido de 13 para **33 propostas de aulas/unidades**, cobrindo 100% das 29 habilidades (incluindo as 9 que estavam sem proposta: Bossa, Samba/Choro, Baden, Tríades, Tirar de Ouvido, Condução de Baixos, Campo Harmônico, CAGED e Arranjo Fingerstyle).
  * Criado o arquivo `COBERTURA-HABILIDADES.csv` mapeando plano de ensino, prática, saída, fonte candidata e lacuna assumida para cada habilidade.
* **Verificação:** Zero habilidades sem proposta associada.

### E1-04 — Eliminação de Bloqueios e Adoção de Navegação Livre com Recomendações
* **Local:** `MAPA-CURRICULAR.md`, `DECISOES-DADOS.md`.
* **Alteração Realizada:**
  * Removida qualquer regra de bloqueio compulsório de interface ou "desbloqueio por módulo". O estudante pode navegar e praticar qualquer aula livremente.
  * Eliminadas inferências automáticas de "domínio pleno" e de perda de competência por tempo decorrido.
  * O modelo passa a registrar práticas autodeclaradas, checklists observáveis e recomendações de revisão espaçada.
* **Verificação:** Documentação atualizada e auditada contra o plano autorizado.

### E1-05 — Justificativa de Pré-Requisitos e Flexibilização Pedagógica
* **Local:** `PREREQUISITOS-JUSTIFICADOS.csv`, `MAPA-HABILIDADES.json`.
* **Alteração Realizada:**
  * Criado o arquivo `PREREQUISITOS-JUSTIFICADOS.csv` categorizando e fundamentando cada relação de dependência entre 'necessário' (técnico/mecânico estrito) e 'recomendado' (conceitual/facilitador).
  * Tablatura não bloqueia partitura; partitura não bloqueia solo por imitação; bossa nova não bloqueia samba/choro; ouvido e leitura podem ser desenvolvidos concomitantemente à mecânica de acordes desde o início.
* **Verificação:** Grafos verificados e sem ciclos.

### E1-06 — Correção Musical Rigorosa e Separação de Objetivos de Ouvido
* **Local:** `CALIBRACAO-SEIS-AULAS.md`, `MAPA-HABILIDADES.json`.
* **Alteração Realizada:**
  * Corrigida a nota na 3ª corda (Sol): na 2ª casa soa a nota **Lá (A)** (e não Ré).
  * Retirada a menção incorreta de "deslizar dedo 1 na 3ª corda entre casas 2 e 3" para Ré Maior. O dedo 1 permanece como pivô na casa 2 da 3ª corda (Lá) enquanto os dedos 2 e 3 se acomodam.
  * Separada formalmente a identificação sensorial cega de intervalos (`hab-ouv-002`) da emissão e entoação vocal afinada (`hab-ouv-003`).
* **Verificação:** Conceitos musicais revisados e harmonizados com a afinação padrão.

### E1-07 — Honestidade Epistemológica nas Fontes e Lacunas dos Candidatos
* **Local:** `CANDIDATOS-CALIBRACAO.json`, `CALIBRACAO-SEIS-AULAS.md`.
* **Alteração Realizada:**
  * Eliminadas quaisquer afirmações sobre gestos do professor ou lacunas de vídeo que não tenham sido comprovadas por observação direta.
  * Registrada a inspeção real executada (leitura de legendas WebVTT locais com minutagens reais e descompressão de PDFs).
  * Declarada com clareza a limitação do terminal (não reprodução gráfica de vídeo) e o status provisório/não confirmado dos candidatos até a Etapa 2.
* **Verificação:** Textos reescritos de forma neutra e orientada a evidências documentais.

### E1-08 — Remoção de Alegações Infundadas sobre Lesões e Evasão
* **Local:** `MAPA-CURRICULAR.md`, `CALIBRACAO-SEIS-AULAS.md`.
* **Alteração Realizada:**
  * Removidas afirmações sem respaldo empírico sobre representatividade mercadológica de cursos, taxas de evasão e promessas clínicas de prevenção de tendinite.
  * O tópico de pestana foi renomeado para "Montagem de Pestana Mecânica com Alavanca" (`hab-tec-005`).
  * Desconforto muscular é tratado como indicação objetiva para pausa e relaxamento, e não como diagnóstico clínico.
* **Verificação:** Textos ajustados com rigor ético e didático.

### E1-09 — Implementação de Schemas Completos e Testes Negativos Rigorosos
* **Local:** `SCHEMAS/`, `validar-curriculo.cjs`.
* **Alteração Realizada:**
  * Criados schemas formais Draft 2020-12 para instâncias individuais e wrappers de catálogo (`mapa-habilidades-wrapper.schema.json`, `aulas-propostas-wrapper.schema.json`, `candidatos-calibracao.schema.json`, `destinos-editoriais.schema.json`, `fonte-arquivo.schema.json`, `matriz-relacao.schema.json`).
  * O script de validação inclui parser CSV robusto e uma **bateria de 7 testes negativos automáticos** comprovando que falhas (evidência inexistente, arquivo trocado, habilidade fora do mapa, estado de inspeção inválido, ciclo no DAG, objeto vazio e divergência de hash/tamanho) são devidamente interceptadas e rejeitadas.
* **Verificação:** Execução bem-sucedida da bateria de testes negativos seguida da aprovação da base oficial com zero erros.

### E1-10 — Fortalecimento do Contrato Didático de 14 Itens
* **Local:** `SCHEMAS/aula-pedagogica.schema.json`, `DECISOES-DADOS.md`.
* **Alteração Realizada:**
  * Schema exige discriminação por disciplina, obrigatoriedade de ao menos dois erros plausíveis com sinal/causa/intervenção, tarefa de transferência aplicada em novo contexto e registro de resultado do estudante.
  * Arrays vazios e campos não preenchidos são invalidados pelo schema.
* **Verificação:** Validação estrutural do schema contra o contrato formal de 14 itens.

### E1-11 — Modelo de Dados Lógico sem Imposição Relacional Externa
* **Local:** `DECISOES-DADOS.md`.
* **Alteração Realizada:**
  * Substituído o modelo SQL impositivo por um modelo lógico de documentos JSON normalizados com chaves estrangeiras declarativas, perfeitamente compatível com o ecossistema offline do projeto.
  * Roteamento de recuperação remodelado para depender de sintomas reportados pelo aluno em sua autoavaliação, e não de um inexistente diagnóstico automático por IA.
* **Verificação:** Documento revisado e harmonizado com a realidade do repositório.

### E1-12 — Ajustes de Precisão nos Objetivos e Afirmações de Resumo
* **Local:** `AULAS-PROPOSTAS.json`, `RESUMO.md`, `VERIFICACOES.md`.
* **Alteração Realizada:**
  * Cada proposta de aula recebeu objetivo principal explícito e vínculo com sua habilidade correspondente (afinação vinculada à identificação de cordas/alturas `hab-lei-001`/`hab-ouv-001`).
  * Thumb slap reposicionado no Módulo 12 para não concorrer com o acompanhamento básico do Módulo 03.
  * Afirmações infladas ("cumpre integralmente", "100% validado") foram retificadas para refletir o escopo exato dos testes realizados.
* **Verificação:** Todas as métricas foram conferidas e documentadas fielmente.
