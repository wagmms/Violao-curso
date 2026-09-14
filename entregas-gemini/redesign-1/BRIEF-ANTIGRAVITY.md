# Redesign 1 — transformar catálogo em ambiente de aprendizagem

Execute este brief e PLANO-EXPERIENCIA-APRENDIZAGEM.md. O usuário solicitou melhor didática/interface e funções além do curso. Codex planeja e revisa; Antigravity executa o grosso. Esta prioridade antecede a expansão mecânica dos guias de módulos. Preservar entregas já produzidas e histórico.

## Entrega concreta

Produzir piloto funcional em interface-v2/index.html, aberto por duplo clique, sem substituir interface/ antes da revisão. Não publicar. Preservar o curso geral completo como biblioteca secundária. Tela inicial centrada em “Hoje”, com sessão de 40 minutos e próxima ação. Implementar Aprender, Praticar, Progresso e Biblioteca conforme plano.

Criar seis atividades didáticas completas: pulso/subdivisão; troca de acordes com continuidade; leitura rítmica simples; reconhecimento auditivo de intervalos; montagem/compreensão de tríades; aplicação curta com melodia e acompanhamento. Selecionar fontes reais do acervo relacionadas ao objetivo, inspecionar o necessário e registrar autoria dos complementos. Cada atividade cumpre os nove itens do contrato de aula pronta, incluindo exercício concreto, versão preparatória e critério de saída. Não inventar timestamp ou conteúdo oficial para preencher lacuna.

As seis atividades são um recorte de produto para revisão, não um curso exclusivo de solo ou MPB. Diagnóstico permite escolher ponto inicial básico/intermediário. Não exigir que cada atividade ocupe necessariamente uma sessão inteira; explicitar composição da sessão e orçamento sem duplicação.

Implementar no piloto: recomendação explicável por regras, sessão em passos, timer de blocos, metrônomo com contagem inicial, caderno de dificuldades, agenda de revisão 2/7/21 dias ajustável, exercício visual com preparação/alvo, registro de resultado e backup. Treinador de ouvido do piloto pode oferecer notas de referência sintetizadas e resposta comentada; não declarar avaliação automática da execução. Microfone não é requisito do piloto.

Biblioteca: vídeos/PDFs utilizáveis como materiais primários; legendas/descrições recolhidas como auxiliares. Não recomendar entradas sem material acessível e roteiro pronto. Itens indisponíveis e administrativos continuam consultáveis em filtros próprios. Acessibilidade de fonte é diferente de arquivo catalogado. Não retirar módulo por estilo ou pelo instrumento do aluno.

## Artefatos de arquitetura e conteúdo

Em entregas-gemini/redesign-1/ entregar:

- MAPA-TELAS.md com navegação, comportamento e estados vazio/erro/retomada.
- ATIVIDADES-PILOTO.md com as seis atividades completas e referências localizáveis; separar fontes verificadas de propostas próprias.
- MODELO-DADOS.md com entidades, IDs, estados de prontidão/verificação e esquema de migração/backup.
- VERIFICACAO.md e evidências visuais desktop/celular/impressão, distinguindo executado e não verificado.
- RESUMO-REVISAO.md até 800 palavras com arquivos, decisões, testes reais e pendências.

Em interface-v2/ entregar arquivos locais necessários e geradores portáteis com README. JavaScript em módulos lógicos de arquivos clássicos, dados separados, sem frameworks/build obrigatórios para o aluno. Todos os assets de interface locais. Não copiar vídeos privados para distribuição nem incorporar credenciais.

## Migração e persistência

Usar chave nova versionada no piloto. Oferecer importação explícita do backup do curso geral, preservando IDs e textos; não escrever nas chaves antigas. Validar backup antes de alterar estado; merge não perde anotações locais. Exportar sessão/dificuldade/revisão e marcações. Reiniciar/revisitar o piloto não apaga progresso. Armazenamento indisponível mantém estudo acessível com exportação manual.

## Qualidade didática e técnica

Conferir alturas, corda/casa quando presentes, soma das durações, posição das vozes e simplificações. Conteúdo de áudio com referências teoricamente corretas; não prometer timbre natural. Metrônomo usa relógio de áudio quando disponível, inicia mediante clique e encerra claramente; testar ritmo/pausa/retomada. Timer não usa contagem ingênua de ticks.

Recomendação não escolhe aula indisponível ou não pronta. Revisão vencida não bloqueia acesso nem produz dívida infinita. “Assistido” não aprova habilidade. Sem gráfico ou ganho de nível com dados fictícios. Toda atividade deve oferecer recuperação quando o aluno marcar dificuldade.

Testar efetivamente file:// em navegador disponível, perfil isolado: iniciar sessão, executar etapas, trocar versão do exercício, ouvir referência/metrônomo, pausar, registrar dificuldade, concluir tentativa, recarregar, revisar e restaurar backup. Testar falha de armazenamento, importação inválida, entrada textual com HTML, teclado e impressão. Validar a 375px e 1366px sem overflow global; exercícios podem ter rolagem própria. Não declarar prova de aprendizagem apenas porque o teste de DOM passou.

## Limite deste lote

Entregar o piloto completo e encerrar para revisão. Não substituir a interface atual, converter todos os módulos, produzir análise automática de áudio, instalar serviço pago ou publicar. O grosso do desenvolvimento e da criação dos seis exemplos fica neste lote do Antigravity; Codex revisará o resultado e definirá a expansão.
