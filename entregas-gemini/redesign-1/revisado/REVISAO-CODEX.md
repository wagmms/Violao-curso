# Segunda revisão do Codex — Redesign 1

13/09/2026. **Correções parcialmente aceitas; piloto ainda não homologado.** Manter a interface anterior e o limite de seis atividades. Executar CORRECOES-ANTIGRAVITY-2.md antes de expandir.

## O que melhorou e foi conferido

Revisados o resumo enviado, matriz, verificação, código, dados, validadores e capturas selecionadas. A preparação agora registra `em_pratica`, sem aprovar o alvo. Três sucessos no alvo produzem intervalos 2/7/21 com uma única revisão pendente. A migração automática v1 foi removida. Sessão passou a constar da serialização/restauração; IDs foram acrescentados às tentativas. As interpolações de IDs de dificuldades/revisões receberam escape. O dedo-guia incompatível A–D foi corrigido. Arpejos escritos de C3–E3–G3 e A3–C4–E4 correspondem às cordas/casas descritas; G agudo passou a incluir Ré. Referências auditivas instrumentais foram alinhadas a Dó4 e conjuntos por nível foram implementados. Envelope curto de áudio foi ajustado e existe cancelamento de sons na navegação.

Essas melhorias são aceitas individualmente; não equivalem à aprovação da aprendizagem ou do fluxo inteiro.

## Testes independentes e limites

Executados em Node o validador estático e auditoria-codex.cjs: ambos saíram com código 0. Criada e executada auditoria-codex-2.cjs, neste diretório, com código real em VM, DOM mínimo e relógio simulado. Sem navegador, sem armazenamento do aluno e sem áudio real. Saída de diagnóstico não constitui teste de aprovação.

A auditoria anterior realiza três **preparações**, portanto `revisoes: []` não demonstra progressão 2/7/21. Na auditoria nova os sucessos no alvo funcionaram, mas o resultado posterior na preparação encerrou a revisão de 21 dias e deixou zero pendentes. O timer exibiu 30:00 após dez minutos simulados, com elapsedMs salvo igual a zero; ao completar, exibiu 00:00 e continuou salvando zero.

Os testes de Chrome/file:// continuam como evidência do executor. Não os reproduzi por CDP: o bloqueio de file:// no navegador disponível permanece. Inspecionei screenshot-aprender-375.png, screenshot-aprender-1366.png e screenshot-hoje-375.png. Conforto físico, escuta, teclado, impressão e demais estados visuais não estão homologados.

## Pendências que impedem o aceite

| Prioridade | Local | Evidência / problema |
|---|---|---|
| P1 | app.js, obterRecomendacao, final | `ativEscolhida` foi declarada dentro do primeiro if e usada fora dele. Após as seis habilidades demonstradas e sem pendências/sessão, lança `ativEscolhida is not defined`. |
| P1 | abrirModalResultado | A revisão existente é concluída antes de verificar nível/resultado. Sucesso na preparação ou variação encerra a revisão do alvo sem reposição. Falha em preparação também pode consumir revisão do alvo. |
| P1 | salvarEstado / atualizarTimer / exportarBackupJSON | Persistem elapsedMs de base, sem incorporar o trecho ativo. O tick só atualiza currentMs local; ao salvar transição e ao terminar não consolida esse tempo. Fechar sem pausa ou exportar durante execução perde progresso. |
| P1 | validarEsquemaBackup / merge | Backup completo malformado foi aceito com tentativa sem ID e BPM -100, ciclo `abc`, dataPrevista objeto, legado com assistidos numérico e praticados nulo, passo -20 e tempo `Infinity`. IDs ausentes podem colapsar tentativas no Map; legado inválido pode quebrar importação. Não há validação de habilidades/perfil/datas, faixas e unicidade suficiente. |
| P1 | processarArquivoBackup | Registro importado com mesmo ID substitui o local, inclusive observações e revisão já concluída. Backups de datas diferentes podem reabrir revisão e acumular duas pendentes por atividade. Nota legada conflitante do arquivo é descartada. Deduplicação por ID não é resolução de conflitos. |
| P1 | obterRecomendacao / navegação | Seleção corrente é tratada como prioridade permanente antes da retomada, recuperação e revisão. Não há teste operacional de prontidão ou pré-requisitos; continua prometendo alinhamento que não verifica. Troca de atividade apenas muda atividadeId da sessão e conserva tempo/ID anterior, atribuindo minutos de uma atividade a outra. |
| P1 | Atividade 6, alvo/variação | c.4 contém um único baixo em 1, apesar da exigência nos tempos 1 e 3. Durações melódicas sumiram no alvo; c.2 mantém nota de dois tempos em 1, mas MD marca p+m em 3 enquanto nova melodia só vem em 4 na escrita. Variação rearticula a corda 3 usada pela melodia e não demonstra preservação das durações/vozes. |
| P1 | Captura Aprender 375px / estilo.css | Cartões do roteiro e instruções se estendem além da borda direita e aparecem cortados. `overflow-x: hidden` no body não prova ausência de transbordamento. Desktop mostra título e minutos comprimidos/colados. |
| P2 | Resultado / treino de ouvido | O modal continua aceitando `consegui` sem confirmar itens do critério ou vincular série auditiva. Treino guarda só placar/índice em variável volátil, não perguntas/primeiras respostas; renderizar sorteia de novo, conservando placar de outro nível. Reiniciar não restaura o botão Próxima substituído no fim da série. |

A atividade 3 melhorou a grade, mas sua variação mudou para baixo regular mais linha aguda inteira. É uma proposta distinta válida se explicitada; duas vozes exigem durações e pausas independentes, inclusive abafamento do baixo. Atividade 5 mantém `3/4 ou 4/4` sem duração de cada ataque/repetição; especificar uma métrica ou assumir exercício livre. Atividade 1 ainda precisa distinguir pausas por voz de sustentação. A tabela de eventos e geração única de dados/documentação, solicitadas na primeira correção, não foram entregues.

Fontes continuam `catalogado`; não há evidência localizável de nova inspeção que sustente descrição visual ou atribuição oficial. Escrever C–E ao lado do nome de uma canção não comprova sua verificação: fornecer referência/trecho ou remover analogia. Não auditei essas melodias externas nesta revisão. Perfil ainda fixa meta MPB/solo e textos retomam nylon como formação; manter curso geral e tratar instrumento/gostos como preferências editáveis.

## Por que a suíte não detectou tudo

Testes de ciclos agora acionam o botão real, uma melhoria importante. Contudo, não testam preparação após alvo, conclusão total do piloto ou fim de sessão. Teste de persistência pausa antes de reload. Casos de backup omitem outros campos obrigatórios e podem ser rejeitados antes de alcançar o defeito nomeado. O teste auditivo repete clique mas apenas verifica feedback visível, não invariância do placar nem série completa. Responsividade mede largura do documento com conteúdo oculto; não examina a legibilidade dos cartões. Corrigir escopo das afirmações de VERIFICACAO.md e não declarar cancelamento/validação universais por esses testes.

## Decisão

Reutilizar a implementação e as correções válidas. Não marcar as seis atividades como prontas, substituir interface/ ou ampliar conteúdo. Próximo lote é a correção final dos estados e dos exemplos, com testes que observem os resultados reais e capturas dos conteúdos completos. A aprovação final permanece pendente.
