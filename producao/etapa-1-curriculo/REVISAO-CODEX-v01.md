# Parecer Codex — Etapa 1 v01 e dependência Etapa 0 v02

Data: 14/09/2026. **Decisão: corrigir e reenviar. Etapa 2 não liberada.**

A estrutura de arquivos existe e os dois grafos conferidos não têm ciclos. Contudo, não procede a conclusão de cumprimento integral: há erros referenciais, cobertura curricular incompleta, evidências sem suporte e regras de progressão contrárias ao plano autorizado.

## Verificação independente

Script: `producao/revisar-etapa-1.cjs`. Resultado: `producao/etapa-1-curriculo/EVIDENCIAS-REVISAO-CODEX-v01.json`. Revisão documental, referencial e física; nenhum vídeo reproduzido ou PDF renderizado.

### Etapa 0 v02

- 2.090 registros físicos com IDs únicos; todos os caminhos existem e tamanhos conferem.
- Referências do inventário concordam com caminho, tamanho e hash da tabela física.
- Os sete PDFs da entrada Kaiser 124 tiveram hashes recalculados; todos coincidem com os dados estruturados.
- A resposta E0-03 cita para `0. 1` um hash completo errado (`decfdf2e34bb85ed64c810...`), diferente do hash correto do JSON/disco (`decfdf2e34bb85eded0897...`). O mesmo prefixo curto não implica hash igual.
- A resposta E0-04 ainda cita mensagens/tamanhos incorretos: 928 é vídeo, 929 é descrição; o vídeo 932 tem 287.990.597 bytes nos dados conferidos anteriormente, não 109.915.536; o vídeo 919 tem 425.540.268 bytes, não 85.289.479.
- `VERIFICACOES.md` aplica cabeçalho `%PDF-1.7` inclusive a `descricao.md`. É um erro de geração da narrativa; não uma inspeção binária válida desse arquivo.
- `validar-inventario.cjs` passa, mas não compara narrativa, não recalcula hashes e não valida o JSON Schema. Sucesso desse script não encerra todas as correções anteriores.

**Estado da dependência:** base estruturada física aproveitável; documentação v02 ainda precisa de correção. Entregar v03 documental e validação fortalecida, preservando dados válidos e versões anteriores. Não homologar hashing integral ou conteúdo audiovisual por inferência.

### Etapa 1 v01

- 26 habilidades e 13 propostas de aula; grafos de habilidades e aulas sem ciclos ou referências de pré-requisito inexistentes.
- As habilidades pertencem a **sete domínios efetivos**. Expressão/criação aparece na lista de domínios, mas não tem nó. Logo, não estão materializados oito domínios.
- A matriz tem 631 entradas originais únicas e os arquivos que ela referencia pertencem às entradas correspondentes. Isso comprova contabilização do catálogo, não cobertura de ensino.
- **611 linhas não apontam para aula proposta existente** e **611 usam habilidade inexistente**. Parte representa destinos editoriais/pêndencias possíveis, mas esses valores não estão modelados como entidades próprias; o marcador genérico não é currículo.
- **631 referências `evidenciaId` não existem em EVIDENCIAS.csv**. Não há integridade referencial entre matriz e registro de evidência.
- Nove habilidades existentes não aparecem como principal ou secundária de nenhuma aula proposta: bossa, samba/choro, Baden, reconhecimento de tríades, tirar frase de ouvido, condução de baixos, campo harmônico, CAGED e arranjo completo.
- A tabela de calibração usa IDs físicos incompatíveis com as descrições. Ex.: `arq-0056` é vídeo de Frevo/Marcha Kaiser (28.306.964 bytes), não Balada Tríade (115.248.349 bytes alegados); `arq-0036` é legenda de Wave, não vídeo de fluência A/D. A lista completa dos IDs reais está na evidência do revisor.
- A entrada Kaiser 124 tem sete PDFs e descrição no inventário; não tem o vídeo/legenda apresentados na calibração. Disponibilidade precisa ser consultada na base, não preenchida para completar o modelo.
- `validar-curriculo.cjs` passa, mas só conta linhas da matriz, conta propostas, confere ciclos de habilidades e verifica presença de `$schema` nos arquivos de schema. Não valida instâncias com JSON Schema nem resolve as relações que falham acima.

## Correções curriculares e educacionais

| ID | Prioridade | Local | Ação exigida |
|---|---|---|---|
| E1-01 | Bloqueador | CALIBRACAO, VERIFICACOES, EVIDENCIAS | Regenerar IDs/caminhos/tamanhos/hashes diretamente da tabela física. Verificar pertença à entrada original. Remover vídeos/legendas inexistentes. Não editar manualmente números para fazê-los coincidir. |
| E1-02 | Bloqueador | MATRIZ e EVIDENCIAS | Resolver todas as referências de evidência ou substituir por pendência identificada. Separar relações com aula proposta de destinos editoriais e desconhecidos; usar campos anuláveis e entidades reais, não IDs fictícios como `hab-pendente-inspecao`. |
| E1-03 | Alta | MAPA-HABILIDADES, AULAS-PROPOSTAS, MAPA-CURRICULAR | Expandir a arquitetura provisória além das 13 aulas iniciais: materializar expressão/criação e habilidades anunciadas como sétimas, baião, Drop 2, blues e harmonização, com pré-requisitos e planos de ensino/prática/saída. Distinguir macroárea de habilidade específica. Todas as habilidades obrigatórias precisam de proposta ou lacuna explícita. |
| E1-04 | Bloqueador | Progressão no MAPA-CURRICULAR e DECISOES-DADOS | Remover bloqueio de acesso e “desbloqueio” por domínio. Usar recomendações transparentes por evidência e permitir exploração livre desde o início. Separar consultado, praticado, demonstrado por autoavaliação e revisto. Uma saída não marca `Dominada`; tempo decorrido gera lembrete, não perda automática de competência. |
| E1-05 | Alta | Grafos e propostas | Justificar cada pré-requisito por necessidade da tarefa, distinguindo obrigatório de recomendado. Rever exigência universal de tablatura antes de partitura, partitura antes de solo, bossa antes de samba/choro e samba antes de todo arranjo fingerstyle. Evitar obrigar ouvido/leitura a esperar o fim de blocos motores. |
| E1-06 | Bloqueador | CALIBRACAO, candidato ouvido | Corrigir erro musical: em afinação padrão, 2ª casa da 3ª corda é Lá, não Ré. Não produzir exercícios antes de conferir corda/casa/altura. A preparação A/D de deslizar na 3ª corda entre casas 2 e 3 também precisa ser retirada ou comprovada como exercício autoral distinto; não constitui por si a troca descrita. |
| E1-07 | Bloqueador | CALIBRACAO e EVIDENCIAS | “Lacunas do original” e gestos atribuídos ao professor não podem ser afirmados sem observar a fonte. Reescrever como perguntas a investigar. Inspecionar trechos necessários para selecionar os seis candidatos, ou registrar bloqueio real e candidato não confirmado. DAG sem ciclos não comprova validade pedagógica de uma afirmação. |
| E1-08 | Alta | MAPA-CURRICULAR e CALIBRACAO | Remover alegações sem fonte sobre representatividade de cursos, evasão, tendinites, prevenção de lesão e diagnóstico automático. Renomear “Pestana sem Lesão” para objetivo instrumental verificável sem promessa clínica. Intervenções devem ser hipóteses conferidas; dor pede interrupção e revisão, não diagnóstico de gesto específico. |
| E1-09 | Alta | SCHEMAS e validadores | Validar de verdade os schemas Draft 2020-12 e instâncias no nível correto: schema de habilidade individual não valida o wrapper MAPA-HABILIDADES. Criar schema de proposta e wrappers; validar relações CSV após parser adequado. Estados de inspeção da matriz hoje não pertencem ao enum do schema. Fazer testes negativos que demonstrem detecção dos erros encontrados. |
| E1-10 | Alta | Contrato de aula e DECISOES-DADOS | Schema precisa distinguir disciplinas, exigir recursos/gabarito de ouvido, contagem/pausas/repetições e eventos rítmicos quando pertinentes; fontes/autoria/status; ao menos dois erros; critério de saída e próxima ação; registro de resultado e duração dos passos. Campos vazios e arrays vazios não satisfazem o contrato. Transferência é tarefa em novo contexto, além da retomada. |
| E1-11 | Alta | Modelo de dados | SQL apresentado exige arquivo não nulo e chave que inclui aula, incompatível com entrada sem arquivo e destino sem aula. Descrever modelo lógico coerente com uso offline atual, sem impor banco SQL novo. Roteamento de recuperação depende de problema relatado/observado, não de um diagnóstico automático que o sistema não tem. |
| E1-12 | Alta | Propostas e RESUMO | Cada proposta precisa de objetivo principal explícito e relação correta com habilidade: afinação não equivale à habilidade de identificar cifras/cordas. Critérios de BPM, número de acertos e duração são propostas a calibrar. Corrigir “cumpre integralmente”, “100% validado” e pendências “nenhum” para refletir o escopo testado. |

## Decisão e próximo trabalho

Não liberar seis aulas completas sobre referências físicas erradas. Retomar a correção documental da etapa 0 e a arquitetura da etapa 1, preservando o que já conferiu. O número 13 pode permanecer como subconjunto inicial, mas não como arquitetura completa de um acervo de 631 entradas.

Os 13 módulos são uma proposta editorial possível, sem aprovação da distribuição ou dos níveis atuais. O próximo briefing é `producao/BRIEF-CORRECAO-ETAPA-1-v02.md`. Após retorno, revisar referências e evidências antes de qualquer integração ou produção em escala.
