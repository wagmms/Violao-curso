# Parecer do Codex — Redesign 1

Data: 13/09/2026. **Piloto ainda não homologado. Direção de produto mantida; corrigir antes de expandir ou substituir a interface anterior.**

A separação Hoje / Aprender / Praticar / Progresso / Biblioteca atende à arquitetura desejada. A entrega contém seis propostas, exercícios, ferramentas de áudio e registros separados do catálogo. Isso representa avanço de produto, mas não comprova seis atividades prontas nem progressão confiável. A revisão não alterou arquivos de interface/ ou interface-v2/.

## Evidências e limites

Examinados RESUMO-REVISAO.md, ATIVIDADES-PILOTO.md, MAPA-TELAS.md, MODELO-DADOS.md, VERIFICACAO.md e a implementação/dados/scripts indicados, em confronto com BRIEF-ANTIGRAVITY.md. Executado `node interface-v2/ferramentas/validar-piloto.cjs`: saída 0. Esse script verifica sobretudo presença/comprimento de campos e soma de minutos; não valida notas, durações, ergonomia, persistência ou coerência didática. Sua conclusão de cumprimento rigoroso é excessiva.

Executado `node entregas-gemini/redesign-1/auditoria-codex.cjs`: código real carregado em Node VM com elementos mínimos simulados, sem navegador, áudio ou armazenamento do aluno. Resultado em RESULTADO-AUDITORIA-CODEX.json. Reproduziu aceitação de backup malformado, exclusão da sessão na restauração, prioridade ignorando atividade escolhida, aprovação pela preparação e revisões 2/7/7 simultaneamente pendentes. O script registra defeitos observados; sua saída 0 não significa aprovação do produto.

Os 14 testes de navegador são evidências declaradas pelo executor, não reproduzidas nesta revisão. O acesso file:// foi bloqueado pela política do navegador disponível; não utilizei CDP alternativo para contornar o bloqueio. Aparência, teclado, impressão, escuta e conforto no instrumento não estão homologados. Não há inspeção nova dos vídeos do Drive nesta revisão.

## Achados que impedem aprovação

| Prioridade | Local / evidência | Consequência |
|---|---|---|
| P1 | app.js, abrirModalResultado: qualquer `consegui` marca `demonstrado`, sem verificar nível ou critério | Sucesso na preparação aprova o objetivo completo. |
| P1 | Mesmo handler: busca primeira revisão e acrescenta outra sem concluir a anterior | Três sucessos geram 2, 7, 7 dias; a revisão vencida pode voltar indefinidamente. Não existe atribuição de `concluida: true` no fluxo. |
| P1 | validarEsquemaBackup aceita `dificuldades:[null]`, IDs inexistentes e níveis arbitrários | Pode quebrar renderização/recomendação. IDs importados são interpolados sem escape em atributos HTML; há caminho de injeção por backup. Não foi executado payload no navegador. |
| P1 | Restaurador e exportador omitem sessao; merge concatena arrays | Sessão não retoma após recarregar; reimportar duplica tentativas/revisões/dificuldades. Migração automática diverge do brief de importação explícita. |
| P1 | obterRecomendacao não testa pré-requisitos/prontidão; diagnóstico ignora resposta auditiva | Justificativa promete alinhamento que a lógica não verifica. Selecionar ativ-4 não muda a primeira recomendação de sequência. |
| P1 | dados-atividades.js, atividade 2 | A coloca dedo 1 na corda 4; D coloca dedo 1 na corda 3. A instrução de mantê-lo como guia na 3ª corda é incompatível com essas digitações. |
| P1 | Atividade 5, alvo e variação | Alvo de C apresenta C4 e E3 simultâneos sob rótulo de terça; Am termina na 3ª corda casa 2 = A3, não E. O desenho G agudo contém G–B–G: falta D para ser tríade completa. |
| P1 | Atividade 6 | Meta em 4/4 e baixos em 1/3; exercício em 3/4 com baixo em 1. Preparação não especifica durações; alvo omite o Dó do c.2 e acrescenta terceira voz no c.4; variação promete 4 compassos e mostra 2. |
| P1 | app.js, sortearNovoIntervalo / dados atividade 4 | Sorteio usa sempre cinco intervalos: não segue preparação de dois, alvo de quatro ou variação com sexta. Não registra série de 10 respostas para sustentar o critério de saída. |
| P2 | Atividades e modelo de dados | `catalogado` não demonstra inspeção, acessibilidade atual nem prontidão. Documentação chama as seis de prontas antes da revisão, sem estado operacional que impeça recomendações indevidas. |

Detalhes musicais adicionais: no alvo da atividade 5, a dedilhação p/i/m declarada não acompanha as cordas efetivamente escritas. A regra de que o baixo de toda tríade deve ser a tônica ignora inversões; restringir explicitamente este exercício ao estado fundamental. Referência Dó4 sintetizada na atividade 4 não coincide em oitava com Dó3 na 5ª corda/casa 3 e Mi3 na 4ª/2; explicar ou alinhar registros. Associações maior/luminoso e menor/triste não devem substituir definições intervalares. Referências a canções precisam de trecho/notas verificáveis ou remoção.

A atividade 3 tem células descritas que somam quatro pulsos, mas a variação escreve as duas cordas como E sem grade temporal conjunta; padronizar vozes, pulsos e abafamentos. Nas seis atividades, a existência de uma string de tablatura não prova que se possa tocar sem adivinhar. A variação deve ser opcional quando o alvo ainda não foi atingido, redistribuindo o tempo da sessão.

## Cobertura insuficiente dos testes entregues

O cenário 8 de testar-interface-v2.cjs insere tentativa, habilidade e revisão diretamente por `__APP_TEST_API.setState`; não exercita o botão de conclusão nem ciclos sucessivos. Testar texto HTML no campo de dificuldade não testa IDs/números importados. Conferir arrays após reload não testa retomada de sessão. Largura de documento não substitui inspeção visual, teclado ou impressão. Ajustar VERIFICACAO.md para refletir precisamente essas diferenças.

## Decisão

Executar CORRECOES-ANTIGRAVITY.md neste diretório. Manter seis atividades e o curso geral; nylon/MPB são preferências do aluno, não recorte curricular nem meta fixa do perfil. Não converter módulos adicionais neste ciclo. O próximo aceite exige exercícios coerentes, progressão real, backup/retomada confiáveis e evidências correspondentes aos fluxos reais.
