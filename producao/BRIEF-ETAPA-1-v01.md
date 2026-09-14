# Briefing Antigravity — correção da Etapa 0 e arquitetura provisória da Etapa 1

Data: 14/09/2026. Produtor: Antigravity. Revisor: Codex.

Leia `docs/PLANO-PRODUCAO-CURADORIA.md` e `producao/etapa-0-inventario/REVISAO-CODEX-v01.md`, além da evidência JSON do revisor. O parecer é “corrigir e reenviar”, não aprovação integral. Execute agora as correções E0-01 a E0-09 e prepare o currículo provisório. Não produzir aulas completas, alterar `app/` ou modificar o acervo.

## A. Corrigir a Etapa 0

Preservar v01 e entregar `producao/etapa-0-inventario/v02/` com os seis arquivos corrigidos, `ARQUIVOS-FISICOS.json`, schema validável, script de reconciliação e `RESPOSTA-CORRECOES.md` por ID do parecer. Registrar método, ferramenta, data e limitações.

Reconciliação obrigatória: 631 IDs com catálogo; vínculos Tríade com manifesto original; relações Kaiser com caminhos reais; 2.090 arquivos ou diferença temporal justificada; arquivos não associados classificados explicitamente; totais JSON/CSV/Markdown concordantes; valores de todas as amostras extraídos da base; candidatos existentes; hashes/duplicatas com escopo reproduzível. Detectar alterações no acervo entre rodadas sem regravá-lo.

SHA-256 integral pode ser demorado: registrar execução e erros, não simular resultados. Se não recalcular tudo, separar hashes herdados do manifesto, calculados nesta rodada e pendentes. Não declarar hash calculado sem registro. Fragmentos ficam inventariados e fora das fontes didáticas utilizáveis.

## B. Construir o mapa curricular provisório

Salvar em `producao/etapa-1-curriculo/v01/`. Usar as 631 entradas como universo de proveniência, sem fixar número final de aulas. O curso geral permanece abrangente; nylon, nível básico/intermediário e MPB orientam adaptações, sem excluir conteúdos de outras modalidades.

### 1. MAPA-HABILIDADES.json

Por habilidade: ID estável, nome claro, domínio (ritmo, ouvido, leitura, técnica, acompanhamento, harmonia, solo/arranjo, expressão/criação), ação observável, condições, evidência esperada, pré-requisitos por ID, tarefa diagnóstica proposta, rota de recuperação e fontes candidatas. Distinguir conhecer um conceito de executar um gesto, reconhecer de entoar e ler de tocar.

Não inventar uma habilidade por arquivo nem usar “assistiu à aula” como pré-requisito musical. Verificar ciclos, IDs inexistentes e dependências de conteúdos indisponíveis. Evidências e critérios ainda não calibrados ficam explicitamente propostos.

### 2. MAPA-CURRICULAR.md e AULAS-PROPOSTAS.json

Propor módulos e sequência, justificando alterações nos 12 módulos atuais. Para cada aula proposta: ID estável independente da posição, objetivo principal, habilidades, pré-requisitos, fontes candidatas, decisão editorial, nível, forma de prática/saída planejada e inspeção ainda necessária.

Uma aula pode ter várias fontes; uma fonte pode apoiar várias aulas. Fundamentar agrupamento pelo objetivo e pelo nível, não por rótulo “parte”, “upgrade” ou duração. Preservar módulo/título original. Descrever percurso inicial, exploração livre, revisões e passagens ao intermediário. Mapear lacunas e alternativas autorais propostas, sem falsa atribuição.

### 3. MATRIZ-FONTE-AULA.csv

Campos mínimos: entradaOrigemId, arquivoId quando aplicável, aulaPropostaId ou destino editorial, habilidadeId, tipoRelacao, decisaoProvisoria, justificativa, nivelInspecao, evidenciaId, pendenciaId. Permitir várias linhas por entrada. Todas as 631 entradas devem ter ao menos um destino ou pendência justificada, incluindo extras, suporte e desconhecidos.

Itens “sem arquivo” permanecem sem arquivo; não os chamar automaticamente de quiz nem inventar substitutos. Arquivar significa mudar a posição editorial proposta, não apagar dados ou acervo.

### 4. CALIBRACAO-SEIS-AULAS.md

Selecionar candidatos para ritmo/pulso, ouvido, troca de acordes, leitura, acompanhamento e melodia com baixo/solo. Corrigir IDs e caminhos usando inventário v02. Para cada candidato: objetivo limitado, pré-requisitos, por que é representativo, arquivo/hash, estado real de inspeção, recursos existentes e recursos autorais necessários.

Inspecionar o material necessário para justificar a escolha e localizar trechos reais. Registrar início/fim observados, sem repetir timestamps não comprovados da proposta v01. Se a ferramenta não permite ver/ouvir, registrar bloqueio e apresentar candidato ainda não confirmado. Não redigir demonstração ou técnica como se tivesse sido observada. Fonte avançada pode calibrar um formato intermediário sem ser colocada no início do curso.

### 5. SCHEMAS/ e DECISOES-DADOS.md

Propor JSON Schemas para habilidades, fontes/arquivos, relações e aula pedagógica. Definir o artefato canônico e geração da versão legível. Schema de aula contempla o contrato de 14 itens do plano, com regras por disciplina: ouvido com áudio/gabarito; ritmo com eventos/durações; acordes com posições; leitura com notação; solo com vozes.

Definir separação do índice automático e conteúdo curado; integração futura com GUIAS_AULAS/PILOTO_ATIVIDADES; IDs pedagógicos; progresso por fonte versus por habilidade/aula; migração compatível sem fabricar domínio. Nesta etapa, propor, não implementar.

### 6. EVIDENCIAS, VERIFICACOES e PENDENCIAS

Entregar `EVIDENCIAS.csv`, `VERIFICACOES.md`, `PENDENCIAS.md` e `RESUMO.md`. Evidência distingue metadados, legenda, PDF em páginas, vídeo/áudio em trechos e inspeção integral. Registrar autor/ferramenta/data/extensão e o que cada observação comprova. Nenhum estado de inspeção decorre automaticamente da presença do arquivo.

## C. Critérios de aceite da Etapa 1

- Etapa 0 corrigida e reconciliada, sem divergências narrativas ocultas.
- Todas as entradas contabilizadas na matriz; relações e IDs válidos; nenhum ciclo de pré-requisitos.
- Habilidades obrigatórias com proposta de ensino, prática e saída alinhadas; lacunas explícitas.
- Fusão/divisão justificadas e grau de inspeção transparente; hipóteses não apresentadas como decisões homologadas.
- Seis candidatos existentes, adequados ao nível declarado e com evidência suficiente para seleção ou bloqueio explícito.
- Schemas executáveis e verificações reproduzíveis; separação índice/curadoria e progresso descrita.
- Nenhum conteúdo curado sobrescrito; nenhuma alteração no acervo ou aplicativo nesta rodada.

Atualizar `producao/CONTROLE-LOTES.csv` preservando linhas anteriores: revisão v01 como corrigir_e_reenviar; v02 e etapa 1 como aguardando_revisao quando entregues. Entregar lista de arquivos, resumo de mudanças e resposta a cada correção. Encerrar para revisão do Codex antes das seis aulas de calibração.
