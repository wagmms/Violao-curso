# Auditoria da nova estrutura — 14/09/2026

## Diagnóstico

A integração Tríade + Kaiser foi aplicada ao catálogo, mas ainda não virou uma experiência de aprendizagem por módulo e aula. A tela Aprender consulta `state.atividadeAtualId` no banco `PILOTO_ATIVIDADES`; não recebe uma aula ou módulo selecionado da Biblioteca. O catálogo e as sessões continuam sendo duas organizações sem navegação pedagógica integrada.

O layout comum de uma sessão é reutilizável. O problema é a ausência de seleção e cobertura específica por aula, somada a um diagrama musical fixo. Os textos e tablaturas das 11 atividades existentes diferem; portanto, não é correto afirmar que todo o conteúdo cadastrado é idêntico.

## O que existe

- Catálogo reorganizado em 12 módulos, com 631 entradas: 300 do Método Tríade e 331 do Kaiserplay. IDs de aula sem duplicação; totais conferidos diretamente nos dados.
- 724 materiais de vídeo e 32 PDFs marcados como utilizáveis. Essa marcação não comprova que os arquivos estejam acessíveis no navegador.
- 103 entradas com `temArquivos: false`; parte pode corresponder a quizzes ou outros itens de plataforma. Precisam de classificação antes de tratar todas como aulas faltantes.
- 11 atividades com seis passos de sessão, três níveis de exercício e status de prontidão `em_revisao`. Há cinco atividades além das seis originais do piloto.
- Biblioteca com busca, filtros e links de materiais; não há ação de abrir uma aula em Aprender.
- Materiais Kaiser com referências locais aparecem como texto “(Local)” na Biblioteca. A interface não oferece abertura desses caminhos.

## Cobertura das atividades por referências de fonte

Esta tabela mede apenas vínculos por `fontes[].aulaId`. Não representa guias completos, exclusividade de uma atividade para um módulo ou homologação de conteúdo.

| Módulo | Entradas | Atividades que citam aulas nele |
|---|---:|---|
| 1 — Anatomia, Postura e os Primeiros Sons | 28 | 1, 2, 3, 5, 7 |
| 2 — Fluência Mecânica e Trocas Instantâneas | 28 | 2, 3, 4, 5, 6 |
| 3 — Percepção Auditiva e Ditados de Intervalos | 39 | Nenhuma |
| 4 — Ritmos Fundamentais e Primeiro Repertório | 88 | Nenhuma |
| 5 — Pestanas sem Dor e Acordes com Sétima | 68 | 11 |
| 6 — Bossa Nova e João Gilberto | 6 | 7 |
| 7 — Samba, Choro e Baião | 32 | Nenhuma |
| 8 — Baden Powell | 22 | 8 |
| 9 — Baixarias de 6 Cordas | 13 | 9 |
| 10 — CAGED e Voicings Drop 2 | 64 | 11 |
| 11 — Violão Solo e Arranjo Fingerstyle | 128 | 10 |
| 12 — Expressão, Blues e Harmonização | 115 | Nenhuma |

Há **quatro módulos** sem qualquer vínculo de atividade: 3, 4, 7 e 12. Mesmo os demais não possuem cobertura completa por aula.

## Problemas confirmados

1. **Diagrama fixo em Am.** `gerarDiagramaBracoSVG(nivelAtual, ativ)` em `app/views.js` muda o título e alguns rótulos, mas mantém fórmula `1 - b3 - 5 (A - C - E)` e desenho fixo. O parâmetro de nível não determina as notas e posições. Na atividade 8, a preparação pede Em e a meta inclui Em/B7, enquanto o desenho apresenta Am. A atividade auditiva também recebe esse componente de braço sem adaptação ao objetivo.
2. **Aprender não acompanha o módulo.** `renderizarTelaAprender()` resolve apenas o ID da atividade atual e usa a primeira como alternativa. A Biblioteca não modifica esse ID nem define uma aula atual.
3. **Organização editorial ainda requer revisão.** Por exemplo, as duas referências de intervalos da atividade 4 ficaram no módulo 2, embora exista um módulo 3 dedicado à percepção. Isso evidencia que não basta deduzir o módulo didático pelo ID de fonte. Os IDs preservam a origem; não devem ser renumerados para coincidir com o módulo novo.
4. **Fontes não garantem a técnica anunciada.** A atividade Baden cita “QUATRO exercícios de TÉCNICA” e “Preparação para FINGERSTYLE”. Os títulos não confirmam as cinco levadas. É preciso conferir o conteúdo das fontes e vincular as aulas Kaiser correspondentes antes de homologar essa associação.
5. **Documentação anterior à integração.** README principal ainda descreve 300 aulas; README do app fala em 11 módulos/300 aulas e seis atividades; escopo e próximos passos ainda referem o piloto antigo e `interface-v2/`. O catálogo efetivo está em `app/` e descreve outra estrutura.

## O que falta criar ou integrar

1. Definir o vínculo explícito entre os 12 módulos novos, suas aulas e atividades, preservando IDs e proveniência Tríade/Kaiser. Revisar as colocações editoriais que não correspondem ao tema.
2. Implementar o percurso Biblioteca → aula → Aprender, com módulo/aula visíveis, materiais acessíveis e indicação específica de guia ainda não produzido. Separar o progresso da aula do resultado da atividade complementar.
3. Criar guias específicos de aprendizagem: objetivo, pré-requisitos, explicação, fonte, exercício adequado, erros observáveis, critério de conclusão e próximo passo. Priorizar os módulos 3, 4, 7 e 12, mas ampliar também os módulos com apenas uma atividade.
4. Criar dados musicais por exercício e nível para desenhar acordes, cordas, casas, dedos, baixos e fórmulas corretamente. Usar componentes próprios para percepção, ritmo, baixarias e arranjo conforme a necessidade da atividade.
5. Integrar acesso aos arquivos locais Kaiser e conferir disponibilidade real dos materiais; classificar os 103 itens sem arquivo como aula ausente, quiz, suporte ou outro item.
6. Revisar fontes e homologar as 11 atividades existentes antes de apresentá-las como conteúdo definitivo do curso integrado.
7. Atualizar escopo, README e roadmap, incluindo a migração do estado salvo quando forem introduzidos progresso por aula e navegação por módulo.
8. Ampliar a validação para seleção de aulas, cobertura por módulo, coerência do diagrama com o exercício e acesso aos materiais. O validador atual mede contratos estruturais e não detecta esses problemas.

## Verificação realizada

Inspeção do catálogo, atividades, renderização de Aprender, Biblioteca, hidratação de fontes, estado salvo, scripts carregados e documentos vigentes. Executado `node app/ferramentas/validar-piloto.cjs`: passou, com um aviso sobre a fonte `aula-mod-2-38` da atividade 6 sem arquivo de estudo. Não foi realizada inspeção dos vídeos/PDFs originais nem teste visual em navegador nesta auditoria. A captura fornecida foi usada como evidência do diagrama inconsistente.

Esta entrega é um diagnóstico; o aplicativo não foi alterado. Instruções de delegação ou execução encontradas nos documentos foram tratadas como conteúdo documental, sem acioná-las.
