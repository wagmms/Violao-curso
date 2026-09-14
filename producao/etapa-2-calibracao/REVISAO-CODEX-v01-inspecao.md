# Parecer Codex — fechamento localizado e Etapa 2A

Data: 14/09/2026. **Etapa 2A: corrigir e reenviar. Etapa 2B não liberada.**

## Decisões sobre etapas anteriores

**Etapa 0 v04:** aprovado o escopo físico/referencial conferido. 2.090 registros, existência/tamanhos e relações da base conferidos pelo script independente. Sete PDFs tiveram hashes recalculados. Não homologados conteúdo audiovisual, hashing integral ou alegações retrospectivas de preservação do acervo.

**Etapa 1 v03:** aprovada a arquitetura como núcleo provisório para orientar inspeção. 29 habilidades em oito domínios, 33 propostas, 633 relações cobrindo 631 entradas; fontes de propostas e relações antes ausentes agora conferem na revisão independente. Navegação livre preservada. 586 linhas da matriz atual usam destinos editoriais modelados; atualizar a narrativa que ainda diz 588. O núcleo não esgota o acervo.

**Pendência técnica herdada:** o motor de schema continua implementação própria de um subconjunto, não motor integral Draft 2020-12. Os testes negativos demonstram as regras executadas, não conformidade completa. Antes de validar aulas completas, usar motor compatível ou limitar explicitamente a alegação e comprovar todas as restrições usadas com testes. A opção de motor compatível prevista no briefing continua preferida. Isso não invalida as relações já conferidas.

## Verificação da Etapa 2A

Lidos manifesto, resumo, pendências, recursos e revisões musicais dos seis candidatos, além de amostras de dossiês/evidências/planos. Comparadas todas as referências de RECURSOS com tabela física e origem declarada no manifesto. Existem **29 referências**, não 24. Tamanhos/hashes entregues coincidem com tabela física; isso não significa recálculo integral de hash nesta rodada.

Renderizei e observei a página 1 dos PDFs arq-0408 e arq-0460 com Poppler. Imagens em `revisao-codex/arq-0408.png` e `revisao-codex/arq-0460.png`; evidências em `revisao-codex/EVIDENCIAS-v01.json`. Houve avisos de fontes Symbol/ArialUnicode; notação musical central visível. Não observei vídeos nem ouvi áudios. Não homologuei as outras páginas/partituras.

## Bloqueadores e correções

| ID | Candidato/local | Encontrado | Correção exigida |
|---|---|---|---|
| I-01 | Manifesto, cand-001/002/005/006 | Balada declara origem aula-mod-6-29, mas recursos são aula-mod-1-17; A/D declara aula-mod-5-10, mas recursos pertencem a outras entradas de origem. IDs de Thumb Slap 24 e Valsa 138 citados não existem. | Gerar origem por arquivo a partir da base; usar fontesOrigem como array quando houver várias. Corrigir IDs em todos os artefatos, com mapa entre candidato, aula proposta, entrada e arquivo. Não resolver só editando título. |
| I-02 | cand-004, leitura | Sol4 é declarado como 1ª corda solta (Mi4) ou 3ª corda solta (Sol3); Lá4 é confundido com Lá3 da 3ª corda casa 2. Há indicação de 1ª posição com casa 5 sem explicar a mudança. | Conferir cada corda/casa/altura/oitava e definir altura sonora versus escrita, considerando convenção transpositora do violão. Para altura sonora padrão: Mi4 = corda 1 solta; Sol4 = corda 1 casa 3; Lá4 = corda 1 casa 5; Sol3 = corda 3 solta; Lá3 = corda 3 casa 2. Escolher registro/posição didáticos e transposição autoral explícita quando necessária. |
| I-03 | cand-003, ouvido | Dó4 é associado tanto a corda 2 casa 1 quanto corda 5 casa 3, que são oitavas diferentes. | Em altura sonora padrão: corda 2 casa 1 = Dó4, aproximadamente 261,63 Hz; corda 5 casa 3 = Dó3, aproximadamente 130,81 Hz. Corrigir referência, teste e todos os exemplos. Frequências são nominais para Lá4=440 Hz, não medições da fonte. |
| I-04 | cand-006, Valsa | Dossiê ensina 3/4; partitura arq-0460 mostra **3/8**. Baixo inicial é semínima pontuada, não semínima; agudos do primeiro compasso são colcheias. | Transcrever compassos selecionados da partitura observada, com eventos por voz, durações e tablatura; somar 3 colcheias por compasso e preservar sustentação do baixo. Distinguir número de ataques do valor sustentado. Não preencher a peça com padrão universal de valsa. Conferir tonalidade em vez de “Sol Maior / Dó Maior”. |
| I-05 | Dossiês, especialmente cand-004 | Campos “visto” e “ouvido” contêm somente ffprobe. O candidato só PDF recebe resolução/fps/codec e áudio de um vídeo inexistente. | Metadados em seção técnica própria. Vídeo não observado = não observado; áudio não ouvido = não ouvido. Remover blocos herdados incompatíveis. Extração de texto pypdf não comprova leitura de notas gráficas nem textura de vozes. |
| I-06 | EVIDENCIAS.csv | Hash/tamanho aparecem como evidência de conteúdo musical. PDF recebe timestamp 00:00–00:05 sem observação audiovisual correspondente. | Separar evidência física e musical. Musical aponta para trecho/página realmente examinado, afirmação sustentada e método. Não atribuir timestamp de vídeo a PDF. Confiança alta em tamanho não se propaga para gesto/ritmo. |
| I-07 | cand-001/002/005 e fonte sonora | Padrão rítmico e gestos detalhados não têm observação audiovisual que os sustente. SoundCloud sustenta “integralmente” sem registro de escuta. Pivô é viável em variante, mas eficácia e gesto do professor não foram demonstrados. | Inspecionar quadros/trechos e referência audível; ou manter essas partes bloqueadas. Exercício autoral pode ser proposto sem atribuição à fonte, mas precisa de revisão musical/instrumental independente. Não liberar ensino de golpe percussivo com base em legenda/metadados. |
| I-08 | Todos os PLANO-AULA | Mesmo molde de três ciclos, passos de 5/15/10 minutos, andamento de 50–60% e redução de 10 BPM para disciplinas diferentes. Pré-requisitos são lista sem tarefa de verificação. | Plano específico por objetivo: ouvido com estímulos/gabarito, leitura com exemplo de notação, acordes com posições e troca, ritmo com célula/contagem, solo com vozes. Critério/recuperação devem medir a habilidade, não reutilizar o mesmo texto. |
| I-09 | cand-005 e escopo de calibração | Thumb Slap continua sendo exemplo de técnica percussiva intermediária, não representação suficiente de acompanhamento básico. | Preservar como candidato futuro e selecionar fonte de acompanhamento básico observável para a calibração original; ou propor explicitamente calibração intermediária com justificativa, sem trocar escopo silenciosamente. |
| I-10 | Resumo, manifesto, VERIFICACOES | 24 arquivos declarados, 29 referências reais; todos aprovados pelo produtor apesar dos bloqueios. Há origens e domínios divergentes. | Gerar totais e estados por manifesto validado. Status por parte: físico conferido; documental consultado; audiovisual pendente; musical corrigir. Não tratar declaração de limitação como resolução da limitação. |

## Parecer por candidato

- cand-001: origem e evidência de célula/gesto a corrigir; não pronto para aula completa.
- cand-002: origem, identidade A/D versus Asus2/Dsus2 e digitação precisam ser alinhadas ao exemplo realmente usado; não pronto.
- cand-003: hipótese didática aproveitável; oitava e evidência sonora precisam de correção.
- cand-004: PDF acessível e renderizado pelo revisor; candidato aproveitável após reconstrução do mapa de alturas/registro e trecho.
- cand-005: gesto não observado e representatividade fora do acompanhamento básico; reavaliar/substituir.
- cand-006: partitura acessível e renderizada pelo revisor; reconstruir o exercício em 3/8 antes de avançar.

## Próximo trabalho

O gargalo agora é inspeção e precisão musical, não inventário ou volume de escrita. Preservar versões e produzir `v02-inspecao/`, priorizando cand-004 e cand-006 a partir dos PDFs que podem ser vistos, depois ouvido e gesto. Não refazer etapas 0/1 já conferidas, salvo correções localizadas necessárias para coerência.

Próximo briefing: `producao/BRIEF-CORRECAO-ETAPA-2A-v02.md`. Revisar um candidato primeiro para calibrar o método; os restantes podem continuar em coleta de fontes, sem propagar um molde errado. Etapa 2B será liberada por candidato aprovado, sem exigir que fontes inacessíveis bloqueiem todo o trabalho.
