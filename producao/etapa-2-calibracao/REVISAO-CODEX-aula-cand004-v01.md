# Parecer — aula completa cand-004 v01

Data: 14/09/2026. **Corrigir e reenviar. Não homologado ainda o modelo de aula completa; integração pendente.**

Preservar a adaptação, os eventos e referências sonoras conferidos. O restante exige ajustes de avaliação, completude e apresentação, não reinício do candidato.

## Verificação e partes aprovadas

Li AULA.md, aula.json, código do validador, verificações e pendências; observei pauta limpa, celular e transferência. Validador do produtor passou. Conferência independente em `revisao-codex/conferir-aula-cand004-v01.py`, resultado `EVIDENCIAS-aula-cand004-v01.json`.

- Frase principal: 14 eventos, quatro compassos, 16 tempos; inícios, alturas por corda/casa e durações racionais conferem.
- MusicXML principal tem alturas/durações concordantes com eventos.
- Transferência: sete eventos, dois compassos, oito tempos; dados de alturas/inícios/durações conferem.
- WAV principal de 16 segundos e transferência de oito segundos; picos de frequência medidos por evento compatíveis com notas sonoras previstas. Análise numérica, não escuta humana, nem validação integral de articulação/ataques.
- Fonte e adaptação identificadas; versões sem nomes de notas/dedos existem. Diagnóstico separado e recuperação de leitura/ritmo são avanços reais.

Não executei aula com aluno, em navegador ou em tela de celular real. Inspeção da imagem grande não comprova legibilidade a 375 px. Não comprovo retrospectivamente a alegação de escuta humana pelo produtor.

## Auditoria dos 14 itens

| Item do contrato | Estado | Observação |
|---|---|---|
| Identidade/fontes | Adequado | Manter códigos técnicos fora do texto principal do aluno quando dispensáveis |
| Objetivo | Parcial | Leitura adequada; amortecimento preciso aumenta carga e precisa de gradação |
| Entrada | Adequado com ajustes | Numeração deve ser da corda mais fina à mais grossa, sem depender de cima/baixo; figuras precisam incluir haste/contexto |
| Explicação | Parcial | Clave na imagem contradiz posição ensinada; cabeça vazada sozinha também pode ser semibreve |
| Demonstração | Adequado no escopo | Síntese de notas/ritmo rotulada; não demonstra gesto instrumental |
| Prática guiada | Adequado com ajustes | Preparação a 48 BPM e retirada de ajuda estão presentes |
| Preparação/alvo/variação | Parcial | Falta variação explícita do mesmo objetivo e redução real de dificuldade além de andamento |
| Exercício executável | Adequado com ajustes | Definir mão direita/dedos propostos e encerramento sem exigência oculta |
| Feedback | Parcial | Causas psicológicas/motoras apresentadas como certeza em alguns pontos |
| Aplicação musical | Parcial | Explicitar que mf é intensidade relativa, não “firme/cantábile”; escolha expressiva não entra na aprovação inicial |
| Saída | Insuficiente | Respostas impressas junto das perguntas; afirma consolidação com evidência limitada |
| Recuperação | Adequado com ajustes | O loop Sol→Fá precisa de contagem/duração de Fá e reinício definidos |
| Retenção/transferência | Parcial | Transferência existe; tarefa posterior de recuperação sem consultar e intervalo ajustável ausentes |
| Sessão/registro | Parcial | Soma de 40 min correta; registro sem tempo reservado e versão curta sem pausa/revisão previstas |

## Correções obrigatórias

| ID | Prioridade | Ação |
|---|---|---|
| AC-01 | Bloqueador | Corrigir posicionamento da clave em pauta limpa, anotada, celular e transferência. Nas imagens observadas, a espiral central ainda envolve a linha inferior, não a segunda linha ocupada por Sol. Renderizar por motor de notação ou calibrar efetivamente glifo; conferir coordenada de Sol e a linha abraçada, não só declarar ajuste. |
| AC-02 | Bloqueador | Retirar respostas parentéticas das perguntas de saída e colocá-las em gabarito separado, acessado após tentativa. Não declarar “leitura consolidada” por entrar no compasso 3 nem “provar que aprendeu” por uma frase. Usar evidência limitada desta tentativa, separada da revisão posterior. |
| AC-03 | Alta | Completar retenção: revisão em outro dia, primeiro sem pauta anotada/áudio/gabarito; tarefa, comparação e próxima ação explícitas. Agenda ajustável. Transferência não substitui retenção. Acrescentar variação do mesmo objetivo, mudando uma dimensão e sem técnica nova oculta. |
| AC-04 | Bloqueador para modelo integrado | aula.json não representa o contrato completo: faltam explicação, demonstração, passos guiados, níveis, erros/correções, recuperação, revisão, sessão/registro em dados completos. Declarar uma fonte canônica e gerar/verificar a outra. A frase que chama Markdown de mestre e JSON de canônico sem concordância testada não resolve. Não integrar um resumo como se fosse aula completa. |
| AC-05 | Alta | Reservar minutos para registro e revisão breve no plano de 40 min, mantendo soma. Na versão curta, indicar o que é adiado e manter pausa/registro adequados. Não exigir 60 BPM para todo aluno concluir uma primeira sessão; registrar resultado e rota. |
| AC-06 | Alta | Reescrever diagnósticos: cabeça preenchida com haste sem bandeira versus vazada com haste, neste exercício; mf como moderadamente forte relativo. Não afirmar ansiedade ou aperto como causa certa de erro/dor. Usar possíveis causas, orientação de pausa/revisão e gesto confortável sem prescrição rígida de dedo perpendicular. |
| AC-07 | Alta | Amortecimento avançado ao objetivo inicial: preparação prioriza altura/pulso; alvo orienta ressonância sem perfeição temporal obrigatória. Definir gesto simples compatível com dedos da mão direita escolhidos; não pedir “relaxar indicador” sem informar sua posição. Dar contagem ao loop de recuperação e definir quando repetir. |
| AC-08 | Alta | Validador diz parser CSV real, mas usa split por linha/vírgula. Usar parser que respeite aspas/newlines; conferir relações no arquivo curricular real e IDs, não só constantes. Verificar concordância Markdown/JSON, links relativos ao diretório de cada arquivo e recursos/gabaritos. Testes negativos devem detectar vazamento de resposta quando modelado, campo obrigatório ausente e incoerência de duração/altura. |
| AC-09 | Alta para uso | Conferir imagens a largura de celular real ou simulação documentada de 375 px. Separar sistemas em recursos próprios se a leitura ficar pequena. Registrar o ambiente; “responsiva” não é propriedade comprovada de um PNG. Rever fone obrigatório (escuta com saída disponível basta) e remover códigos de acervo do fluxo do aluno, preservando proveniência em seção própria. |

Motor formal de schema permanece pendência técnica declarada. Não é motivo para alegar validação completa do JSON; resolver antes de aprovação técnica para integração ou registrar precisamente qual validação parcial foi feita.

## Encaminhamento

Entregar v02-aula-completa/cand-004, preservando v01. Corrigir o conjunto em uma rodada, sem redesenhar a música conferida. Revisor avaliará saída, retenção, dados e imagens antes de homologar o modelo. Demais candidatos seguem inspeção, sem replicar esta aula como template aprovado.
