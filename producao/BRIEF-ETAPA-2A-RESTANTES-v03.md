# Antigravity — retomada da inspeção dos cinco candidatos

## Objetivo e autorização

Leia `producao/etapa-2-calibracao/REVISAO-CODEX-aula-cand004-v03.md` e os itens I-01 a I-10 de `REVISAO-CODEX-v01-inspecao.md`. Cand-004 teve fechamento localizado; seu modelo ainda não está homologado para escala. Não repetir FINA-01 a FINA-06 nem usar seu texto como molde universal.

Trabalhar somente inspeção da Etapa 2A, preservando versões anteriores, arquitetura curricular, app e acervo. Não gerar aulas completas, integrar ou atribuir eficácia comprovada.

## Primeira entrega: cand-006

Produzir `producao/etapa-2-calibracao/v03-inspecao/cand-006/`, sem sobrescrever cand-004 existente nesse diretório.

1. Localizar arq-0460 na tabela física da Etapa 0 v04; gerar origem, caminho, nome original, tamanho e hash da base e conferir bytes reais. Localizar proposta/módulo/habilidade na Etapa 1 v03 e relação na mesma linha da matriz; não reaproveitar o ID de origem inválido da v01.
2. Inspecionar visualmente a partitura. A primeira página renderizada existe em `revisao-codex/arq-0460.png`. Identificar página, sistema e compassos escolhidos; consultar novas páginas apenas se utilizadas.
3. Delimitar dois a quatro compassos úteis à aprendizagem. Registrar **3/8**, unidade de contagem proposta, tonalidade sustentada pela armadura e contexto observado, vozes e articulações realmente visíveis.
4. Criar EVENTOS.json por voz com ataque, duração, altura escrita/sonora, corda/casa e relação com tablatura se disponível. Baixo inicial é semínima pontuada sustentada; não substituí-lo por três ataques nem aplicar padrão genérico de valsa. Somar três colcheias por compasso em cada voz completa, incluindo pausas/sustentações; notas de vozes distintas podem soar simultaneamente.
5. Separar literal da fonte e eventual adaptação autoral. Uma simplificação deve ter objetivo, alterações enumeradas e referência própria, sem atribuição falsa ao professor.
6. Entregar plano específico de solo: diagnóstico executável, reconhecimento das vozes, prática separada, combinação progressiva, critério de saída e recuperação de uma dificuldade concreta. Não escrever a aula completa nesta fase.
7. Se criar áudio sintético, rotular como referência de altura/tempo e conferir eventos/duração. Não chamá-lo demonstração de técnica ou timbre instrumental. Sem escuta/visualização disponível, declarar a parte pendente e não ensinar gesto dependente dela como observado.

## Arquivos mínimos de cand-006

- DOSSIE-FONTES.md: afirmações observadas, inferidas e decisões autorais, com método e limites.
- RECURSOS.json: proveniência física gerada da base; fontesOrigem[] quando necessário.
- EVIDENCIAS.csv: evidência física separada da musical; PDF usa página/sistema/compasso, não timestamp de vídeo.
- EVENTOS.json e REVISAO-MUSICAL.md: notas, vozes, durações e validação simbólica.
- PLANO-AULA.md: objetivos, diagnóstico, prática, saída, recuperação e recursos necessários específicos.
- VERIFICACOES.md, PENDENCIAS.md e RESPOSTA-CORRECOES.md: execução fiel e atendimento dos itens I aplicáveis.
- Validador reproduzível: proveniência, vínculos e métrica, com teste de início/duração incorretos pela mesma função. Declarar limite de schema.

Encerrar **aguardando_revisao**. Não declarar candidato aprovado pelo próprio produtor. Submeter somente cand-006 primeiro; aguardar parecer antes de aula completa.

## Coleta dos demais candidatos, sem antecipar produção

| Candidato | Trabalho e evidência necessária |
|---|---|
| cand-003 — ouvido | Corrigir oitavas: corda 2 casa 1 é Dó4 sonoro; corda 5 casa 3 é Dó3. Definir estímulos, duração, ordem e gabarito separado; referências autorais não são áudio observado da fonte. Saída mede discriminação, não execução em BPM genérico. |
| cand-001 — ritmo | Corrigir origem por arquivo; observar célula e sequência de movimentos, com trecho/quadros e referência audível. Registrar compasso, subdivisão, ataques/pausas e contagem. Quadro estático não comprova movimento completo. |
| cand-002 — acordes | Conferir exemplo real A/D versus Asus2/Dsus2, posições, alturas e digitações. Pivô é opção ergonômica, não regra universal. Observar demonstração antes de atribuir gesto à fonte; separar exercício autoral. |
| cand-005 — acompanhamento | Selecionar fonte observável de acompanhamento básico. Preservar Thumb Slap como possibilidade intermediária futura, com justificativa de mudança; não trocar seu conteúdo silenciosamente nem ensinar golpe por metadados/legendas. |

Essas coletas podem avançar, mas entregas devem ser pequenas e rastreáveis, seguindo a prioridade cand-006, cand-003 e candidatos dependentes de gesto. Não é necessário esperar uma fonte inacessível para revisar outro candidato.

## Critérios de aceite do revisor

Origem canônica sem IDs inventados; afirmações musicais sustentadas por evidência examinada; eventos coerentes; objetivo/pré-requisito/saída alinhados; recuperação específica; lacunas honestas com bloqueio apenas da parte dependente. Totais calculados distinguem referências de arquivos únicos. Hash e metadado não comprovam conteúdo didático.

Homologação do modelo, validação formal de schema e piloto da cand-004 serão um lote separado. Não incorporar esses trabalhos à presente inspeção.
