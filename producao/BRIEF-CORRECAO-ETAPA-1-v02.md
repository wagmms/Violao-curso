# Briefing Antigravity — correção e fechamento da arquitetura provisória

Leia integralmente `producao/etapa-1-curriculo/REVISAO-CODEX-v01.md` e o JSON de evidências correspondente. A Etapa 1 v01 e a documentação da Etapa 0 v02 receberam **corrigir e reenviar**. Etapa 2 ainda não autorizada. O plano vigente continua `docs/PLANO-PRODUCAO-CURADORIA.md`.

## Ordem de execução

1. **Restabelecer concordância factual.** Corrigir documentação da etapa 0 em `producao/etapa-0-inventario/v03/`. Preservar versões e dados físicos que conferem. Gerar tabelas de hashes/tamanhos e exemplos da base, corrigir cabeçalho falso de Markdown e resposta com hash errado. Fornecer checagem das narrativas geradas contra dados canônicos. Não alegar recálculo integral sem registro.
2. **Corrigir referências da etapa 1.** Entregar em `producao/etapa-1-curriculo/v02/`. Usar exatamente os IDs físicos de ARQUIVOS-FISICOS, conferindo que pertencem à entrada original; recursos que não existem ficam ausentes/pendentes. Gerar um manifesto de candidatos em JSON e derivar a tabela Markdown dele.
3. **Resolver evidências e destinos.** Fazer matriz com cardinalidade livre, sem exigência artificial de exatamente 631 linhas. Cada uma das 631 entradas terá destino real ou decisão/pendência específica. Relações sem aula/habilidade/arquivo usam null e destino editorial modelado; não IDs inventados. Evidência técnica só comprova a operação executada, não tese educacional.
4. **Completar o mapa provisório.** Não escrever centenas de fichas completas. Propor unidades e aulas suficientes para cobrir habilidades de todos os módulos, inclusive expressão/criação, harmonia/sétimas/Drop 2, estilos, ouvido e leitura. Para cada habilidade obrigatória, apontar plano de ensino, prática e saída ou lacuna assumida. Classificar as 13 propostas anteriores como subconjunto inicial. Para fontes ainda não inspecionadas, justificar destino provisório por tema e declarar que fusão/divisão depende de inspeção.
5. **Rever progressão.** Recomendações por pré-requisito de tarefa, com exploração livre sempre. Retirar estados de domínio automático, bloqueios, diagnóstico de erro sem observação e perda automática de competência por tempo. Distinguir pré-requisito necessário/recomendado, resultado autodeclarado e revisão posterior.
6. **Conferir música e adequação dos candidatos.** Corrigir Ré/Lá e exercício A/D. Para cada um dos seis candidatos, verificar fonte pertinente por observação audiovisual/PDF real e registrar trecho/página, método e extensão observada. Se a ferramenta não conseguir inspecionar, registrar a limitação e manter candidato não confirmado; não inventar “lacunas do vídeo”. Priorizar acompanhamento básico adequado antes de escolher uma técnica percussiva adicional. Separar entoação de reconhecimento no objetivo de ouvido.
7. **Fortalecer schemas e validação.** Implementar validador Draft 2020-12, schema de proposta e wrappers, regras por disciplina e referências cruzadas. Não usar presença de `$schema` como validação. Validar instâncias e CSV interpretado corretamente. Testes negativos: evidência inexistente; arquivo de outra entrada; habilidade inexistente; estado de inspeção inválido; ciclo; objeto vazio; candidato com hash/tamanho divergente. O validador deve falhar nesses casos e passar na entrega corrigida.
8. **Responder ao parecer e encerrar para revisão.** Responder E1-01 a E1-12 com arquivo/local, alteração e verificação. Atualizar controle de lotes com corrigir_e_reenviar para rodadas revistas e aguardando_revisao para novas rodadas. Nenhuma alteração em app/ ou acervo.

## Entrega v02 da Etapa 1

Todos os artefatos do briefing original, revisados: mapa de habilidades; mapa curricular; propostas; matriz; calibração; schemas; decisões de dados; evidências; verificações; pendências; resumo. Acrescentar:

- `CANDIDATOS-CALIBRACAO.json`: fonte, arquivoId, caminho, tamanho, hash, inspeção real, recurso necessário, hipótese e bloqueio separados.
- `DESTINOS-EDITORIAIS.json`: extras, suporte, pendências e destinos provisórios modelados com ID e justificativa.
- `COBERTURA-HABILIDADES.csv`: habilidade, obrigatória/opcional, aula/unidade proposta, ensino, prática, saída, fonte candidata e lacuna.
- `PREREQUISITOS-JUSTIFICADOS.csv`: habilidade/tarefa, antecedente, necessário ou recomendado, justificativa e evidência/hipótese.
- `RESPOSTA-CORRECOES.md`: resposta item a item.
- Script de validação e testes negativos reproduzíveis, com relatório fiel ao escopo.

## Critérios para liberar a Etapa 2

Nenhuma referência física/evidencial quebrada; documentação da etapa 0 concordante; todas as entradas contabilizadas sem falsa cobertura; habilidades anunciadas representadas e vinculadas a planos; objetivos e pré-requisitos coerentes; navegação livre preservada; seis candidatos comprovados ou bloqueios resolvidos; schemas e testes negativos executados; nenhum fato sobre fonte atribuído sem observação. A aprovação permanece com o Codex.
