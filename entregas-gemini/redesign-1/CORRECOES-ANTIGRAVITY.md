# Redesign 1 — execução das correções

Leia REVISAO-CODEX.md e o brief original. Corrija o piloto existente em interface-v2/; preserve interface/, IDs canônicos e dados do aluno. Codex permanece responsável pela homologação. Não expandir módulos, publicar ou adicionar novas ferramentas antes deste aceite.

## 1. Conteúdo que se possa executar

Revisar as seis atividades e seus três níveis. Adotar uma fonte de dados única para gerar documentação e apresentação, com comandos portáteis documentados. Para exemplos instrumentais, registrar compasso, unidade de pulso, ataques/durações/pausas, corda/casa, altura sonora, MD/ME quando aplicável, repetições e finalização. Gerar grade visual legível e conferir a soma por voz; exercícios livres/auditivos usam sequência e critérios próprios, sem tablatura fictícia obrigatória.

- Atividade 2: corrigir a relação A–D entre dedos. Se usar dedo fixo, escolher e demonstrar digitações compatíveis; caso contrário ensinar deslocamento sem chamá-lo fixo. Escrever a subdivisão exata da variação.
- Atividade 5: reescrever arpejos isolados de C e Am com T–3–5 reais, alturas e dedos coerentes. Completar a quinta de G ou rotular textura incompleta, sem contá-la como tríade completa. Explicar que inversões são válidas e que o estado fundamental é uma restrição deste exercício.
- Atividade 6: escolher uma única métrica, preferencialmente 4/4 conforme a meta, e produzir quatro compassos completos em todos os níveis. Usar frase própria identificada como complemento, sem atribuir transcrição não verificada ao método. Preparação preserva a melodia; alvo acrescenta baixo; variação acrescenta voz definida. Metas, contagem, metrônomo, dedilhação e exemplos devem coincidir.
- Atividade 3: alinhar linhas de cordas 1 e 6 na mesma grade; distinguir ataque de abafamento e silêncio. Atividade 1: explicitar durações e encerramento, não apenas posições de ataque.
- Atividade 4: alinhar oitavas de referências sintetizadas/instrumentais; definir conjuntos de intervalos por nível. Remover analogias de canções não verificadas ou fornecer notas e trecho que as sustentem. Registrar perguntas, primeira resposta, resultado e total da série; repetir áudio não conta nova resposta nem acerto. Feedback explica semitons; retomada não sorteia silenciosamente outra pergunta. Não alegar avaliação da execução no violão.
- Demonstrar fontes relacionadas com evidências localizáveis de inspeção, sem inventar acesso/timestamps. Separar acessibilidade, verificação e prontidão. Complemento próprio pode ser autocontido, mas não deve ser rotulado conteúdo confirmado do vídeo.

## 2. Progressão e sessões

Implementar estados explícitos de habilidade: em prática, alvo demonstrado por autoavaliação, revisão necessária. Preparação bem executada registra progresso sem aprovar o alvo. Exibir critério do nível e coletar confirmação dos itens, BPM/repetições pertinentes; não aprovar por tempo decorrido. Não exigir variação para concluir o alvo.

Diagnóstico deve registrar respostas por habilidade, incluindo ouvido, e propor uma checagem prática básica/intermediária. A escolha inicial precisa influenciar a recomendação. Implementar prioridade de sessão pausada, recuperação, revisão devida e próxima atividade elegível; usar pré-requisitos e prontidão estruturados, explicar motivo real e permitir escolher outra atividade. Não criar bloqueio total por dificuldade/revisão antiga.

Sessão tem ID, atividade/nível, blocos, tempo estudado e estado próprios. Salvar pontos de retomada ao pausar/transitar e durante execução. Reabrir retoma pausada, sem contar tempo com aplicativo fechado ou restaurar intervalId. Backup inclui sessão. Trocar atividade exige preservar ou encerrar a sessão anterior de forma clara. Usar durações dos dados, não limiares duplicados no controlador. Manter 40 minutos; tempo de variação retorna ao alvo/recuperação quando necessário. Semana de três sessões e quarta opcional, sem obrigatoriedade diária.

Uma revisão pendente por atividade: concluir a revisão vinculada somente ao registrar seu resultado; sucesso no alvo avança 2 → 7 → 21 dias, e depois mantém 21 como manutenção ajustável. Repetir/dificuldade mantém recuperação e reprograma próxima data sem apagar histórico. Abrir não conclui. Permitir reagendar e não multiplicar dívida. Datas de agenda são locais, não dias UTC truncados.

## 3. Dados, segurança e áudio

Validar esquema profundo antes de qualquer mutação: tipos, enums, IDs conhecidos, datas, números finitos/faixas, referências e limites razoáveis de tamanho. Rejeitar registros nulos/malformados com erro legível, mantendo estado anterior. Conteúdo importado deve permanecer texto; não interpolar IDs ou outros campos não confiáveis em HTML.

Dar IDs estáveis a tentativas/sessões, fazer merge idempotente e preservar versões de notas conflitantes. Oferecer importação explícita com resumo; não importar automaticamente a chave antiga. Testar backup antigo real e estado v2 com apenas notas. Nunca escrever na chave antiga. Exportação/restauração precisam cobrir todos os dados prometidos. No erro de armazenamento, manter estudo e exportação disponíveis.

Metrônomo deve seguir compasso e BPM do nível, parar claramente e não continuar ao trocar ferramenta sem indicação. Cancelar referências/temporizadores pendentes quando sair do treino auditivo. Conferir envelopes de sons curtos de transição: tocarFrequencia hoje agenda decay fixo de 0,3 s até para som de 0,15 s; ajustar envelope à duração. Não declarar precisão acústica apenas por existência de AudioContext.

## 4. Evidências para reenvio

Criar testes de regressão pelos fluxos reais: preparação não aprova alvo; resultado salva tentativa; revisões percorrem 2/7/21 sem duplicar; dificuldade/reagendamento; diagnóstico e elegibilidade; sessão pausa/recarrega/exporta/importa; mesmo backup importado duas vezes; importação inválida/nula/HTML em todos os campos; falha de armazenamento. Testes podem semear condições iniciais, mas devem executar a ação sob teste, não inserir seu resultado esperado diretamente.

Conferir eventos musicais e coerência entre dados, guia e interface. Fazer teste manual com violão quando possível; registrar explicitamente o que não foi tocado. No ambiente autorizado do executor, testar file:// com perfil isolado, fluxo de áudio, teclado, 375px, 1366px e impressão. Entregar capturas locais reais identificadas por tela/viewport; não usar só ausência de overflow como prova visual. Não contornar bloqueios de ferramentas.

Entregar em entregas-gemini/redesign-1/revisado/: RESUMO-REVISAO.md, matriz CORRECAO → arquivo → teste/evidência, VERIFICACAO.md corrigido e evidências; atualizar documentos de atividades/modelo/mapa para refletirem o código. Resumo até 800 palavras. Tratar as atividades como em revisão até novo parecer. Encerrar e solicitar revisão do Codex.
