# Lote 4 — interface HTML local do curso

## Atualização de escopo — prevalece sobre as instruções anteriores

Leia `ESCOPO-CURSO-GERAL.md`. Nome da interface: **Curso de Violão — Método Tríade**. O produto principal é o curso geral já existente no Drive, preservando sua estrutura, sem restrição por nylon, MPB ou solo. O plano personalizado de 48 semanas e os exercícios próprios são complementos numa área separada, “Meu plano de estudo”. O instrumento e as preferências do aluno adaptam recomendações, não limitam o catálogo.

Implementar duas navegações: **Curso original** (todos os módulos/aulas e materiais utilizáveis catalogados) e **Meu plano de estudo** (rotina, semanas e complementos aprovados). Gerar o catálogo a partir de `INDICE-METODO-TRIADE.md`, `entregas-gemini/lote-1/revisado/INVENTARIO.json` e `MAPA-FONTES.md`, respeitando as correções de `entregas-gemini/lote-2/REVISAO-CODEX.md`. Não incluir o manifesto privado integral no produto: gerar somente títulos, agrupamentos, tipos, status e links de estudo necessários.

O mapa do inventário tem aulas com vários arquivos; não contar cada vídeo complementar como aula nova. Preservar módulos, ordem e títulos originais, agrupando materiais pelo identificador real. Disponibilizar pesquisa por título/módulo e filtros por tipo de material. Indicar aulas sem arquivo como indisponíveis no backup; não fabricar links nem habilitar fragmentos .part-Frag. Diretório 10 é complemento de escalas, e 11 contém lives/links/itens administrativos; apresentar conforme catalogado. Catálogo completo não implica recuperação ou inspeção integral do curso.

Marcação de assistido/praticado no curso original deve ser independente da avaliação de entregas do plano. As regras de duas sessões e rubrica pertencem ao plano personalizado, não devem ser atribuídas como critérios oficiais do Método Tríade. Verificar catálogo gerado contra índice e inventário, incluindo grupos com vídeos complementares, PDFs e aulas sem material; registrar contagens por aula e arquivo separadamente. Não sintetizar conteúdo das aulas só pelo título. Apresentar como catalogado quando não inspecionado.

As instruções seguintes de implementação, backup, acessibilidade e impressão permanecem válidas. Onde houver título ou escopo mais estreito, esta atualização e ESCOPO-CURSO-GERAL.md prevalecem.

Instrução para Antigravity/Gemini. Produção autorizada pelo usuário em 13/09/2026. Execute o grosso da implementação; Codex fará a revisão pedagógica e de funcionamento após a entrega.

## Resultado esperado

Construir um curso navegável em português, aberto por duplo clique em `interface/index.html`, sem instalação, servidor ou login. Deve funcionar por `file://` em Chrome e Edge no Windows, com conteúdo, CSS e JavaScript locais. Não depender de CDN, fontes remotas, chamadas fetch para arquivos locais, módulos ES carregados por file:// ou internet para exibir aulas e exercícios. Links do Drive naturalmente exigem conexão e o acesso já existente do aluno.

Aluno básico/intermediário; violão nylon; formação geral, com preferência por MPB e objetivo importante de violão solo; 40 minutos três vezes por semana e quarta opcional. Nome da interface: **Formação em Violão de Nylon**. Abranger técnica, leitura, ritmo/acompanhamento, harmonia, ouvido, repertório entre estilos, improvisação/criação e prática solo/conjunto conforme arquitetura v1.3. Interface confortável no computador e celular, discreta, com boa tipografia e pouca distração. Não acrescentar conteúdo musical para preencher telas.

## Fontes vigentes — preservar

- `CURSO-VIOLAO-SOLO-MPB.md` v1.3: arquitetura das 12 unidades, cobertura geral e rubrica. O nome histórico do arquivo não limita o escopo. Usar os títulos atualizados das unidades e o novo perfil; documentos mais antigos não prevalecem sobre a ampliação do usuário.
- `INICIO-4-SEMANAS.md`: material da Unidade 1, incluindo correções incorporadas. Não presumir que seu formato já seja idêntico ao das Unidades 2/3; adaptar a apresentação sem inventar sessões ou instruções ausentes.
- `INDICE-METODO-TRIADE.md`: links catalogados, sem certificação automática dos vídeos.
- `entregas-gemini/lote-3/revisado/`: UNIDADE-02.md, UNIDADE-03.md, EXERCICIOS.md, EVENTOS.json, TABLATURAS-COMPLETAS.md e REVISAO-CODEX.md. Utilizar estes, nunca os originais do Lote 3.
- Pareceres dos lotes 1/2, somente para resolver status de fonte e restrições.

Conteúdo detalhado disponível: semanas 1–12. Unidades 4–12 são **planejadas**, com objetivos e entregas extraídos da arquitetura, não aulas prontas. O curso possui 48 semanas planejadas; não anunciar produção integral concluída. Homologação de material não é conclusão do aluno.

## Navegação e telas

1. **Início:** continuar a última sessão aberta, selecionar unidade/semana/sessão, disponibilidade semanal e resumo do progresso demonstrado. Sem bloqueio de navegação por calendário.
2. **Curso:** 12 unidades, distinguindo material disponível de unidade planejada. Para as futuras, mostrar objetivo, pré-requisito e entrega prevista, sem botão de aula fictícia.
3. **Sessão de estudo:** objetivo, instrução, exercício associado, quadro dos blocos de minutos, simplificação e critério de saída. A/B/C obrigatórias e D opcional claramente identificadas. Vídeo pertence ao orçamento de 40 minutos. Exibir o andamento como sugestão ajustável.
4. **Exercícios:** versões principal/simplificada, alturas soantes, tablatura monoespaçada, eventos por voz, andamento e instrução de término/abafamento. Não compactar horizontalmente ao ponto de desalinhamento; em telas estreitas permitir rolagem do exercício e manter leitura dos compassos. Mostrar que Ex.6-S é preparação parcial, não entrega completa.
5. **Fontes:** links reais, forma de verificação e indicação de que assistir a vídeo de acompanhamento não comprova execução solo. Abrir fontes externas em outra aba. Não tentar incorporar vídeos privados ou solicitar credenciais.
6. **Diário e avaliação:** data, minutos reais, BPM pessoal, dificuldade principal, próxima ação e rubrica de quatro dimensões de 0 a 3. Registros de entrega com data, versão e referência/nome de gravação (arquivo de áudio não é armazenado). Consultar histórico por unidade.

Pode combinar telas para reduzir complexidade. A interface de estudo deve priorizar a tarefa atual; arquivos de auditoria e termos de produção ficam na documentação de manutenção, fora do fluxo principal do aluno.

## Temporizador e progresso

- Temporizador de sessão com iniciar, pausar, retomar e encerrar. Pausar tempo de estudo quando solicitado, usando relógio real e compensando intervalos do navegador; não contar apenas ticks. Mudança de tela não perde a sessão. Não usar som obrigatório.
- Separar sessão aberta, vídeo assistido, sessão praticada e entrega demonstrada. Abrir um link ou finalizar o timer não marca automaticamente uma entrega como demonstrada.
- Avanço sugerido quando a entrega completa obtém pelo menos 2 em continuidade rítmica, clareza sonora, equilíbrio entre vozes e compreensão/autonomia, em **duas datas/sessões distintas**. Duas tomadas na mesma sessão não bastam. Permitir registrar e explorar livremente mesmo sem atingir a meta.
- Não contar D como requisito. Unidade 3 pode exigir repetir 12C em outro dia. Não considerar os quatro compassos de 6-S como entrega final de oito.
- Persistir em localStorage com chave própria, versão de esquema e IDs estáveis. Explicar que o progresso fica nesse navegador/dispositivo e pode ser perdido ao limpar seus dados; não prometer sincronização entre navegadores ou cópias do arquivo.
- Backup JSON exportável/importável com versão, validação de estrutura, prévia de quantidade de registros e opção clara de mesclar ou substituir. Substituição exige ação explícita; exportação não deve apagar dados. Tratamento de localStorage indisponível deve manter o estudo acessível e informar que a persistência não está ativa.
- Diário/importações são texto: renderizar com textContent ou escape, nunca como HTML executável. Rejeitar URLs de fonte com esquemas executáveis. Não executar conteúdo de JSON importado.

## Arquitetura técnica e atualização

Entregar `interface/index.html`, `styles.css`, `app.js` e `conteudo.js` carregados como scripts clássicos locais. `conteudo.js` é um artefato gerado com o conteúdo aprovado incorporado, para evitar fetch local. Separar conteúdo de progresso.

Entregar gerador em `interface/ferramentas/gerar-conteudo.cjs`, executável com Node já instalado, sem pacotes extras obrigatórios. O gerador lê apenas as fontes autorizadas, preserva caracteres, links, tabelas, tabs e hierarquia e gera os dados locais. Um conversor Markdown local pode ser usado se seu código estiver incluído e sua licença documentada. O aluno não precisa executar o gerador para estudar.

Definir IDs estáveis por unidade, semana, sessão e exercício. A atualização de conteúdo não apaga diário/progresso. Documento `MAPA-CONTEUDO.md` deve mapear IDs para fonte e trecho, distinguindo aprovado, material inicial e planejado. Registrar divergências de origem em PENDENCIAS.md sem consertar música silenciosamente.

Não usar framework com build obrigatório, serviço externo, analytics, login ou publicação. Não incluir tokens, caches privados, manifesto integral do Drive ou os inventários extensos na interface. Não introduzir metrônomo, geração de áudio ou editor de partituras neste lote: o núcleo é estudar os materiais aprovados.

## Impressão e acessibilidade

Folha de impressão de unidade/sessão/exercício sem menus, botões ou timers; cores legíveis em preto e branco. Evitar separar título da tabela e cortar linhas de tablatura; exercícios longos podem continuar em outra página entre compassos. Não forçar uma tabela longa inteira a caber numa única página. Usar @media print.

Navegação por teclado, foco visível, rótulos em inputs, contraste legível e HTML semântico. Timer não deve anunciar cada segundo ao leitor de tela. Não depender apenas de cores para estados. Layout sem overflow global a 375px e 1366px; tabs podem ter rolagem própria.

## Verificação exigida

Testar efetivamente a abertura de index.html via file:// no navegador disponível, sem servidor. Registrar navegador, ações e resultados; distinguir executado de apenas inspecionado. Conferir:

- Navegação das três unidades disponíveis; todas as sessões existentes e as 12 versões musicais; placeholders de 4–12 sem conteúdo fictício.
- Soma e ordem de blocos de 40 minutos das sessões detalhadas; números, links e tabs equivalentes à origem aprovada. Validar conteúdo gerado contra fontes, sem validar apenas contagens da própria interface.
- Reload mantém progresso; exportar/importar recupera diário; arquivo inválido não altera dados; texto contendo marcação HTML não é executado.
- Duas avaliações no mesmo dia não liberam avanço; duas sessões distintas com quatro notas >=2 sugerem avanço; versão parcial não libera; assistir a vídeo sozinho não libera.
- Timer pausa/retoma e permanece correto após troca de tela e aba; estudo funciona com armazenamento indisponível.
- Visual em computador e celular e prévia de impressão com tabs legíveis. Nenhuma publicação é necessária.

## Entrega e encerramento

Entregar a interface executável em `interface/`; documentação e evidências em `entregas-gemini/lote-4/`: README-ABERTURA.md, MAPA-CONTEUDO.md, VERIFICACAO.md, PENDENCIAS.md (se houver) e RESUMO-REVISAO.md até 800 palavras. No resumo: arquivos, conteúdo integrado, testes realmente executados, limitações e até cinco dúvidas. Não declarar homologação do Codex. Encerrar para revisão.
