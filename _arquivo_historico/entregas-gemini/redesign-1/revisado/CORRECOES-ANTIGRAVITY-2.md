# Redesign 1 — segunda rodada de correções

Leia REVISAO-CODEX.md deste diretório. Corrigir somente interface-v2/ e documentos relacionados. Preservar interface/, chaves antigas, IDs e histórico do aluno. Não expandir módulos nem novas ferramentas. O objetivo é fechar o piloto funcional, sem refazer suas partes já aceitas.

## Fluxos e persistência

1. Corrigir escopo da variável no retorno de manutenção do recomendador. Testar seis alvos demonstrados sem pendências, com revisão devida e com sessão concluída.
2. Separar resultado de prática e resultado de revisão: nível preparatório/variação nunca consome revisão do alvo. Vincular revisão a tentativa adequada; sucesso avança 2/7/21, falha reprograma recuperação, abrir não conclui. Apenas uma pendente por atividade também após merge. Permitir reagendar sem duplicar histórico. Sucesso preparatório depois de revisão de 21 dias preserva a pendência.
3. Consolidar elapsedMs ativo em snapshots sem dupla contagem. Salvar checkpoints durante execução e nas transições; ao completar, armazenar totalMs e estado concluído. Exportar durante execução inclui minutos estudados até o clique. Reload retoma pausada e não conta tempo fechado. Criar novo ID por sessão; troca de atividade não altera a autoria dos minutos já estudados. Dar escolha clara de retomar/preservar ou encerrar antes de outra sessão.
4. Prioridade normal: sessão pausada → recuperação → revisão → próxima elegível. Escolha explícita é ação do aluno, não condição permanente baseada em `atividadeAtualId !== ativ-1`. Estruturar prontidão e pré-requisitos/checagens; justificativa corresponde à regra real. Piloto em revisão pode ter acesso manual explícito, sem ser chamado de conteúdo homologado. Diagnóstico básico/intermediário precisa de checagem prática por habilidade.
5. Mostrar itens verificáveis do critério por nível no modal e registrar confirmação/medidas pertinentes. Não inferir execução acústica; aprovação permanece autoavaliação guiada. Preparação registra progresso parcial, variação é opcional.

## Backup completo, idempotente e sem perdas

6. Validar todos os objetos, IDs e referências antes da mutação: tentativas têm ID estável; datas reais no formato local; números finitos/faixas; passo válido; habilidades com slugs/estados conhecidos; perfil e legado com tipos corretos; unicidade de IDs, limite de tamanho e invariantes. Não converter `Infinity`, números negativos ou objetos malformados em dados aparentemente válidos. Registros antigos sem ID exigem migração determinística explícita para não colapsarem no Map.
7. Testar cada defeito alterando **um campo de backup válido completo**. Rejeição por outro campo não conta prova da validação que se queria testar. Erro mantém o estado anterior. Backups v1 reais continuam aceitos com IDs canônicos/textos preservados.
8. Merge resolve conflitos sem sobrescrever silenciosamente notas locais, sem reabrir revisão concluída e sem criar duas pendências da mesma atividade. Preservar versões conflitantes ou oferecer escolha clara, com resumo antes da aplicação. Mesclar arquivo antigo após registros novos, e vice-versa, precisa manter histórico. Reimportar duas vezes mantém os mesmos resultados. Sessão local ativa não é substituída sem tratamento explícito.

## Exercícios, áudio e experiência visual

9. Entregar eventos instrumentais estruturados e usar uma fonte única para dados, tabelas e interface, com gerador portátil. Validar alturas/corda-casa, início/duração/pausas de cada voz e soma por compasso, colisões de corda/MD e preservação da melodia nas simplificações. Não testar teoria musical buscando uma frase que foi acrescentada ao texto.
10. Na atividade 6, corrigir baixo de c.4 em 3 e sincronizar os ataques reais com MD/durações. Não rearticular a melodia sustentada ao acrescentar preenchimento na mesma corda. Produzir quatro compassos integralmente executáveis nos três níveis e finalização explícita. Na atividade 3 definir baixo com duração/pausas e abafamento próprio. Na atividade 5 definir pulso/métrica/durações dos arpejos ou indicar treino livre sem alegar soma de compassos; na atividade 1 especificar sustentação/silêncio por voz.
11. Treino auditivo: armazenar série por atividade/nível com perguntas e primeiras respostas; retomada preserva pergunta/placar; novo nível inicia série própria. Não permitir pontuação após término. Reiniciar restaura controles de avanço e habilita segunda série completa. Resultado aponta total/acertos da série adequada; áudio repetido não conta tentativa. Referências externas têm evidência verificável ou são removidas. Documentar limites da síntese.
12. Corrigir largura e quebra dos cartões do roteiro, especialmente `.step-detalhes` e título/minutos; não usar ocultação global para esconder conteúdo. A 375px todo texto e botão fica alcançável; somente exercício largo pode ter rolagem própria. No desktop equilibrar colunas e separar minutos do título. Capturas de Aprender incluem roteiro e exercício/ferramenta completos, com estados alvo, recuperação e série concluída. Conferir teclado e impressão no ambiente autorizado; não contornar bloqueios.
13. Retirar meta curricular fixa MPB/nylon. Perfil guarda essas preferências como editáveis; curso continua geral. Inspecionar fontes necessárias ou registrar limites e autoria própria honestamente, mantendo acessibilidade, verificação e prontidão separadas.

## Entrega e aceite

Criar regressões pelos fluxos reais para os itens acima. Usar auditoria-codex-2.cjs como conjunto de reproduções, não como selo de aprovação pela saída 0. Acrescentar teste de falha de armazenamento, exportação durante timer ativo, reload sem pausa e conclusão aos 40 minutos. Testar série auditiva completa duas vezes, troca/retomada e placar após cliques repetidos.

Entregar em `entregas-gemini/redesign-1/revisado-2/`: RESUMO-REVISAO.md até 800 palavras, MATRIZ-CORRECOES.md, VERIFICACAO.md, saídas dos testes e capturas reais. Atualizar documentos de atividades/modelo/mapa e README de acordo com o código. Separar executado, inspeção estática, teste de navegador, inspeção musical e não verificado. Manter atividades em revisão e encerrar para novo parecer do Codex.
