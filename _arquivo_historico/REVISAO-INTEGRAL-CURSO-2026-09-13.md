# Diagnóstico e plano de revisão integral do curso

Data: 13/09/2026. Objeto principal: `interface-v2/`, comparada com `interface/`, catálogo, guias e decisões vigentes. Este documento planeja a revisão e registra evidências; não altera o site.

**Parecer: a base do curso é aproveitável, mas a versão atual ainda não é confiável como ambiente principal de estudo.** Há defeitos que impedem restaurar progresso legítimo, atividades disponíveis com sessão incompleta, fontes sem destino funcional e cortes de conteúdo no celular. A sequência recomendada é estabilizar dados e sessões, corrigir a experiência essencial e só então ampliar as aulas.

## 1. O que foi efetivamente examinado

- Código dos componentes principais: inicialização, estado, backup, recomendação, revisão espaçada, timer, telas, áudio, ouvido, CSS e HTML.
- Estrutura das 300 entradas do catálogo e presença dos 128 guias ativos da interface anterior.
- Metas, critérios, exemplos e estrutura das 11 atividades complementares. Revisão textual e de coerência interna; não execução física integral no violão.
- Documentos de escopo, plano pedagógico, análise anterior e propostas dos módulos 4–5. Amostras dos guias; não revalidação audiovisual de todos os guias.
- Cinco telas em navegador Chromium headless, perfil descartável e dados simulados, em 1366, 375 e 320 pixels; capturas em tema claro e uma captura adicional em tema escuro.
- Dezesseis verificações dirigidas de comportamento, incluindo fontes, interrupção, restauração, revisão, níveis, avaliação, ouvido, busca e impressão.
- Validadores existentes: catálogo geral aprovado, 128 guias aprovados estruturalmente, piloto com 24 erros. Os 24 erros são mensagens do validador, não 24 defeitos independentes.

**Limites:** não foram abertos os vídeos/PDFs remotos, testadas permissões atuais do Drive, ouvidos os sons produzidos, usado microfone real, testados Safari/Firefox nem feita homologação com leitor de tela. Não há medição de aprendizagem real ou desempenho em dispositivo móvel físico. As recomendações didáticas são propostas de desenho, não afirmações de eficácia comprovada deste curso.

Evidências: [resultados do navegador](auditoria-curso-2026-09-13/resultados.json), [roteiro reproduzível](auditoria-curso-2026-09-13/auditar.cjs), [mapa das 300 entradas](auditoria-curso-2026-09-13/COBERTURA-300-AULAS.md) e [identificação dos arquivos examinados](auditoria-curso-2026-09-13/snapshot-sha256.json). Os testes simulam passagem do tempo por timestamps; não representam dez minutos de espera real.

## 2. Cobertura curricular e integração

“Entrada catalogada”, “arquivo utilizável”, “guia textual” e “atividade pronta” são unidades diferentes. As contagens não devem ser apresentadas como se todas fossem aulas completas.

| Parte do catálogo | Entradas | Com arquivo no inventário | Sem arquivo | Guias carregados na v1 |
|---|---:|---:|---:|---:|
| Módulo 1 | 46 | 46 | 0 | 46 |
| Módulo 2 | 38 | 37 | 1 | 38 |
| Módulo 3 | 44 | 42 | 2 | 44 |
| Módulo 4 | 37 | 12 | 25 | 0 |
| Módulo 5 | 35 | 13 | 22 | 0 |
| Módulo 6 | 30 | 4 | 26 | 0 |
| Mês 7 | 19 | 6 | 13 | 0 |
| Mês 8 | 19 | 11 | 8 | 0 |
| Mês 9 | 19 | 13 | 6 | 0 |
| Complemento de escalas | 11 | 11 | 0 | 0 |
| Links, aula mensal e sorteio | 2 | 2 | 0 | 0 |
| **Total** | **300** | **197** | **103** | **128** |

As propostas dos módulos 4 e 5 existem no lote 7, mas não estão nos guias carregados. O módulo 6 tem a maior lacuna proporcional: apenas 4 de 30 entradas com arquivo. Isso não prova que faltem 26 habilidades: antes é preciso distinguir quiz, texto, referência, material administrativo e aula essencial.

A v2 carrega o catálogo, mas não os 128 guias. Também não oferece os controles anteriores de assistido, praticado e anotação por aula, embora consiga importar esses registros para `legado`. Preservar bytes no backup não basta: o aluno precisa consultar e continuar esses estudos. A nova interface mantém 11 atividades complementares, não uma conversão das 300 entradas.

Recomendação curricular: manter módulos 1–9 como curso original, o complemento de escalas como extensão e os itens administrativos em extras. Relacionar cada atividade à aula e habilidade correspondentes sem forçar equivalência. Para cada lacuna, registrar se bloqueia um pré-requisito e qual alternativa verificada permite continuar.

## 3. Defeitos prioritários e correções propostas

Prioridades: **P0** compromete a recuperação do histórico; **P1** impede ou distorce o estudo; **P2** prejudica clareza, manutenção ou qualidade. “Reproduzido” significa observado no navegador com dados isolados. “Código” indica evidência estática, ainda sem teste completo do fluxo real.

| ID / prioridade | Diagnóstico e evidência | Mudança necessária e aceite |
|---|---|---|
| D01 / P0 | **Reproduzido:** estudar, trocar atividade e reabrir. `trocarAtividade`, em `srs-engine.js`, grava status `interrompida`; `validarEsquemaBackup`, em `storage.js`, rejeita esse status. A reabertura voltou à atividade 1, com zero tentativas restauradas. | Unificar contratos de escrita/leitura, aceitar interrupção e manter cópia recuperável quando a validação falhar. Aceite: exportar, importar e reabrir histórico com interrupções preserva todos os registros. |
| D02 / P0 | **Reproduzido em ativ-7; mesma restrição para 8–11:** `app.js` permite no backup somente IDs 1–6, enquanto a interface oferece 11. | Derivar IDs da base; versionar alterações. Aceite: toda atividade selecionável produz estado restaurável, inclusive suas dificuldades e revisões. |
| D03 / P0 | **Reproduzido:** o formulário aceitou BPM -9 e aprovou o Alvo; o validador de backup rejeita BPM negativo. Os atributos HTML não são verificados pelo manipulador do botão. | Validar números antes da mutação, com limites coerentes e mensagens no campo; distinguir vazio de zero. Aceite: entradas inválidas não entram no histórico nem aprovam habilidade. |
| D04 / P1 | **Reproduzido em ativ-7:** timer lança `Cannot read properties of undefined (reading 'fase')`. Atividades 7–11 têm `sessao40min: []`. | Completar roteiros ou retirar essas propostas da fila de sessões prontas, preservando rascunhos. Timer precisa de fallback explícito. Aceite: nenhuma atividade oferecida quebra ao iniciar. |
| D05 / P1 | **Reproduzido:** links da atividade 1 têm `href=""`. `hidratarFonte` procura `CATALOGO_DADOS` plano, mas a base real é `CURSO_DADOS.catalogoOriginal`, com módulos, aulas e materiais. | Resolver aula e material canônicos; mostrar título, destino e situação reais. Aceite: nenhuma fonte vira link vazio ou aponta para a própria página. |
| D06 / P1 | **Reproduzido:** após simular dez minutos ativos sem outra ação e recarregar, o tempo voltou a zero. Há serialização correta quando `salvarEstado` é chamado, mas falta salvamento periódico/de ciclo de vida. | Checkpoints e tratamento de saída/suspensão, com política explícita para tempo fora da página. Aceite: perda máxima limitada e testada, inclusive fechamento inesperado. |
| D07 / P1 | **Reproduzido:** exportação durante sessão guardou 0 ms, enquanto `salvarEstado` consolidou 600.000 ms no mesmo cenário. | Exportar pelo mesmo serializador consolidado. Aceite: arquivo e estado salvo representam o mesmo instante de estudo. |
| D08 / P1 | **Reproduzido:** resultado `repetir` na Preparação encerrou revisão vencida do Alvo e criou outra em dois dias. O retorno antecipado protege sucesso na Preparação, mas não seu fracasso. | Separar lógica por nível antes de qualquer operação de revisão. Aceite: os três resultados da Preparação e da Variação não alteram a agenda do Alvo. |
| D09 / P1 | **Reproduzido:** concluir a avaliação mantém `sessao.ativa=true`. Há caminhos de retorno sem encerrar a sessão. | Definir transição de conclusão, congelar duração e vincular tentativa a sessão/nível; preservar possibilidade de conclusão antecipada declarada. Aceite: sessão concluída não continua contando nem reaparece como interrompida. |
| D10 / P1 | **Reproduzido:** troca de atividade preservou Variação na tela, mas registrou Preparação na sessão. “Hoje” recomendou recuperação em Preparação e abriu Alvo. | Uma única fonte para o nível e comandos explícitos de recuperar/revisar/retomar. Aceite: motivo, exercício, sessão e resultado concordam. |
| D11 / P2 | **Reproduzido:** clicar “Começar meus 40 minutos” numa sessão já ativa a pausa. O botão chama uma função de alternância. | Ação e texto dependentes do estado: iniciar, continuar ou retomar. Aceite: “começar/continuar” nunca pausa. |
| D12 / P1 | **Reproduzido:** compassos e checklist permanecem preenchidos ao abrir avaliação de outra atividade. `abrirModalResultado` também tenta ler critérios em `ativ.niveis`, caminho inexistente, e cai no critério geral do Alvo. | Reinicializar formulário e modelar critérios por nível. Aceite: Preparação recebe sua própria meta, sem dados herdados. |
| D13 / P1 | **Código:** ouvido não vincula série de 10 perguntas ao registro de sucesso; resultado pode ser declarado por checkbox sem o placar exigido. A série está só em memória. | Persistir série, primeira resposta, nível e data; usar o resultado real da ferramenta quando disponível. Aceite: o indicador de 8/10 corresponde à série registrada. |
| D14 / P2 | **Reproduzido:** responder ao ouvido, sair e voltar conserva `respondido=true`, mas esconde feedback e Próxima Pergunta. | Restaurar estado visual completo. Aceite: retomar permite seguir sem responder novamente. |
| D15 / P1 | **Reproduzido visualmente:** em 375 px, textos de Aprender e Biblioteca são cortados; a barra inferior excede a largura. `overflow-x:hidden` em `html,body` faz a métrica global aparentar sucesso. | Conter grids com largura mínima adequada, quebrar textos e dar rolagem própria apenas à notação. Aceite: todo controle e texto ficam alcançáveis em 320/375 px; medir retângulos e inspecionar captura, não só `scrollWidth`. |
| D16 / P1 | **Visual e código:** Hoje usa fundo branco fixo com texto claro do tema escuro. A dica de execução também tem cor de texto fixa incompatível com o fundo escuro. | Cores semânticas de tema e teste de contraste por componente. Aceite: títulos, dicas, botões e formulários legíveis em ambos os temas. |
| D17 / P2 | **Reproduzido:** caracteres corrompidos aparecem no DOM e na captura, como `OpçÁµes` e `â€”`; não é apenas codificação do terminal. | Corrigir conteúdo UTF-8 na origem e verificar strings renderizadas. Aceite: nenhuma sequência corrompida em navegação, modais, feedback ou backup. |
| D18 / P2 | **Reproduzido:** impressão mostra as cinco telas visitadas, pois `.view-panel` recebe `display:block!important`. | Imprimir somente aula/atividade selecionada, com quebra de página e tema apropriados. Aceite: impressão não inclui Biblioteca e telas fora do contexto. |

O caso D01 inicialmente impede restauração; o conteúdo inválido ainda pode permanecer no armazenamento até a próxima gravação. Por isso a correção precisa recuperar dados e evitar sobrescrever silenciosamente o histórico rejeitado, além de acertar o validador.

## 4. UX/UI por tela

| Tela | Avaliação atual | Revisão proposta |
|---|---|---|
| Hoje | Uma recomendação principal ajuda, mas a justificativa inicial cita diagnóstico mesmo antes de respondê-lo. Texto longo repete informações. O nível e o botão podem contradizer a sessão. | Mostrar tarefa curta, motivo verdadeiro, duração escolhida e ação inequívoca. Exibir revisão prevista e continuação como alternativas compactas. |
| Aprender | Concentra roteiro, teoria, fontes, exercício e controles. No desktop a tablatura empurra a coluna de roteiro para uma faixa estreita; no celular o exercício começa aproximadamente 1.390 px abaixo do topo no caso medido. | Colocar exercício, modelo e ação do passo atual primeiro. Roteiro completo e fontes em detalhes. Mostrar andamento, repetições, dedos e encerramento explicitamente; oferecer ampliação da notação. |
| Praticar | Diz “seis atividades”, exibe 11 e não distingue prontidão. Falta agrupamento por habilidade, pré-requisito e dificuldade. | Separar atividades prontas e propostas; filtros simples por habilidade/nível, mantendo exploração livre. Cartão com tarefa, requisito e resultado esperado. |
| Progresso | Tem caderno, agenda e gráfico de BPM por atividade, mas falta histórico consultável de tentativas, evidências das habilidades e interpretação do gráfico. Duas tentativas já desenham curva sem valores/datas. | Mostrar andamento com data, nível e resultado, tentativas recentes, próxima ação e habilidades em prática/manutenção. Gráfico acompanhado de tabela; não interpretar BPM crescente como domínio por si só. |
| Biblioteca | Preserva estrutura e filtros, mas abre todos os módulos e mistura vídeos, descrições e legendas indisponíveis. Exibe IDs técnicos. Busca por `ritmica` não retorna equivalentes com acento; filtros se perdem ao sair. | Preferir conteúdo estudável na entrada, com acesso explícito ao catálogo completo. Agrupar materiais auxiliares, preservar filtros/posição, normalizar busca e mostrar contagem. Restaurar notas e marcações por aula; IDs ficam nos detalhes. |
| Diagnóstico | Apenas ritmo, acordes e ouvido; não preenche respostas anteriores e pode não salvar mudança de perfil quando `trocarAtividade` retorna cedo por já estar na mesma atividade. | Carregar respostas existentes, salvar perfil independentemente da troca, acrescentar leitura e independência com pequenos testes opcionais. |
| Avaliação | Começa em “Consegui”, usa checklist instrumental até para ouvido e mistura desconforto com hesitação musical. | Resposta inicialmente vazia; formulário específico do objetivo, critérios observáveis e nota curta. Separar desconforto de dificuldade musical, para não recomendar aumento de carga como resposta automática. |
| Modais | Uso de `dialog` é positivo; faltam nomes acessíveis explícitos e tratamento de Escape nas Promises de alerta/confirmação. | Rótulos, foco inicial e retorno ao acionador; resolver cancelamento por Escape. Validar com teclado e leitor de tela. |

Também falta navegação por URL/histórico: recarregar abre Hoje, e Voltar não reproduz o percurso interno. Propor rotas leves com atividade/nível, preservando dados locais. Separar tempo de estudo de tempo de navegação na Biblioteca.

**Acessibilidade:** cards alternativos e passos são `div` com `onclick`, sem acionamento equivalente por teclado; busca, filtros e slider precisam de rótulos. `aria-live` sobre toda a área principal, incluindo o timer, merece teste para evitar anúncios excessivos. Priorizar operações completas por teclado e leitura em ordem lógica. Referências de aceite: [W3C — teclado](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [reflow em 320 CSS px](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) e [contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Como meta de contraste: 4,5:1 para texto comum e 3:1 para texto grande, conforme as definições do critério. Isto não é certificação WCAG do produto.

## 5. Didática das 11 atividades

Os três níveis, metas observáveis e correções por erro são uma boa base. Entretanto, presença dos campos no arquivo não garante instrução visível: `exercicio.instrucoes`, `dedilhacaoMD`, `repeticoes`, `aplicacaoMusical` e `recuperacao` precisam ser integrados de forma consistente à tela, além dos textos que eventualmente repetem parte dessas informações.

| Atividade | Diagnóstico específico | Entrega de revisão |
|---|---|---|
| 1 — Pulso e subdivisão | Combina ataques e sustentação de duas vozes, mas a descrição “a 3ª corda sustenta até a próxima colcheia” e o rodapé de meio tempo deixam o abafamento ambíguo. Linguagem como “isócrono” aumenta a carga inicial. | Definir duração por voz, momento de abafamento e exemplo sonoro curto. Explicar primeiro como contar e tocar. |
| 2 — Troca A–D | Meta pede 16 trocas; critério pede 16 compassos alternados, que produzem 15 transições internas sem retorno adicional. | Unificar contagem e encerramento, acrescentar diagramas e cordas permitidas. Critério específico da Preparação, sem exigir a batida do Alvo. |
| 3 — Leitura rítmica | Promete primeira vista com uma única grade que o aluno repete. A avaliação tende a medir memorização da grade. | Separar exemplo de treino e exemplo novo equivalente para avaliação; representar pausas e durações claramente. |
| 4 — Ouvido | Meta de 8/10 não está ligada ao resultado persistido. Exemplos de canções e notas iniciais exigem verificação independente antes de receber status de referência confirmada. | Salvar série; ensinar contraste antes do teste; disponibilizar modelo auditivo. Depois ampliar notas de partida, sem confundir isso com a validação inicial. |
| 5 — Tríades | O texto atual já define exercício analítico a pulso livre; a ambiguidade antiga “3/4 ou 4/4” foi removida. Entretanto, o campo de compasso continua 4/4 e o critério cobra 50 BPM, enquanto a explicação que permite duração livre não é apresentada integralmente na tela. Preparação E/Em e Alvo C/Am precisam de ponte explícita. | Mostrar a escolha de estudo livre e harmonizar ferramenta/critério com ela, ou criar uma versão métrica separada. Demonstrar tônica, terça e quinta e explicar a transferência entre acordes. |
| 6 — Melodia e baixo | O baixo no tempo 3 do quarto compasso, apontado antes como ausente, agora aparece: não repetir esse defeito como atual. Permanecem alinhamentos/dedilhações difíceis de ler e necessidade de conferir as vozes da Variação. | Conferir os eventos de cada voz e a execução integral. Gerar notação e áudio da mesma representação; explicitar quais cordas a melodia usa. |
| 7 — Bossa nova | Sem roteiro nem fontes. Meta cobra baixo antecipado, mas o material não localiza inequivocamente a antecipação. A ferramenta visual/sonora recebe sempre quatro pulsos, embora a atividade declare 2/4. | Escrever eventos em 2/4, marcar antecipação e ligação; escolher fonte inspecionada ou exemplo original revisado e completar seis blocos. |
| 8 — Independência | Meta diz melodia apenas nas colcheias fracas, mas o Alvo escreve ataques também na posição do tempo 2. Critério “independência cristalina” não informa o que contar/observar. | Tornar grade e meta coerentes, especificar quantidade de compassos e erros admissíveis; adaptar metrônomo a 2/4. |
| 9 — Melodia acompanhada | Promete composição de oito compassos; apresenta dois, com instrução explícita de que são os iniciais. “pimba” não esclarece a digitação pretendida. | Escrever a peça completa ou reduzir a meta a um fragmento; definir dedos, vozes e dinâmica. Não exigir material que não foi entregue. |
| 10 — Baixo caminhante | Propõe quatro semínimas, mas a grade mostra ataques alternados adicionais em outra corda; instruções alternam acorde em 1/3 e somente em 1. A Variação permite “tempo 2 ou contratempo do 1”, posições diferentes. | Escolher um padrão exato, numerar eventos e oferecer digitação executável. Substituir instrução de dedos “travados” por descrição precisa de sustentação. |
| 11 — Condução de vozes | A forma C escrita nas cordas 3–1 é Sol–Dó–Mi: não é estado fundamental, como rotulada. F é Lá–Dó–F, também incompatível com o rótulo de segunda inversão. G→C move a voz da 3ª corda de casa 4 para 0, contrariando a meta de no máximo um tom. Nome do Alvo e sequência também divergem. | Corrigir inversões, sequência e limite de movimento; conferir notas de cada voz e duração. Substituir “siga rigorosamente a tablatura” por correção que explique o erro. |

Essas observações musicais derivam do texto e das casas/notas escritas. Ainda é necessária conferência tocada e ouvida, incluindo conforto das digitações e equivalência entre notação e demonstração. Atividades autorais podem existir sem aula original equivalente; nesse caso precisam de autoria, demonstração própria e validação explícitas, em vez de fonte inventada para satisfazer um campo obrigatório.

## 6. Organização do estudo e progressão

A recomendação já prioriza sessão interrompida, dificuldade e revisão vencida. Porém, usa a primeira pendência encontrada, não uma fila ordenada por data, e os pré-requisitos são texto, sem dependências executáveis. Uma dificuldade nunca resolvida pode ocupar indefinidamente a recomendação principal. O estado `alvo_demonstrado` permanece mesmo depois de nova dificuldade; seria mais claro separar demonstração passada da condição atual de manutenção.

Proponho uma rotina configurável, começando pelos 40 minutos existentes e oferecendo posteriormente versões de 15/25 minutos realmente reorçadas. O aluno escolhe dias, tempo e foco. O plano mostra uma tarefa central, uma revisão curta e o próximo passo, com possibilidade de adiar ou trocar sem perder a sessão anterior. “Três sessões” deve ser recomendação editável, não obrigação fixa herdada dos guias.

O timer deve orientar. Atualmente selecionar outro passo só muda `passoIndex`; o próximo tick volta a impor o passo calculado pelo tempo. Separar “passo em consulta”, “passo em execução” e cronômetro, ou permitir avanço manual que ajuste coerentemente o roteiro. Não liberar ou esconder níveis com base apenas no relógio.

Progresso útil: sessões realizadas com duração real, habilidades praticadas, tentativas em datas diferentes, última dificuldade e revisões futuras. Manter assistido/praticado separado de habilidade demonstrada. A curva de BPM deve comparar a mesma atividade e nível, com números, datas e resultado, sem transformar velocidade em medida universal de aprendizagem.

Para cada aula pronta: objetivo curto → pré-requisito verificável → demonstração → exercício definido → comparação → correção → aplicação musical → registro → próxima ação. A revisão deve convidar a uma tentativa antes de revelar o modelo. Os intervalos 2/7/21 permanecem uma regra ajustável do produto; não foram validados como calendário ideal para este aluno.

## 7. Ferramentas, arquitetura e qualidade técnica

- **Metrônomo:** motor aceita quantidade de tempos, mas a tela passa `4` fixo. BPM volta ao padrão ao renderizar nível; a interface pode perder correspondência com áudio ainda ativo. Consolidar compasso, andamento pessoal, contagem e estado do botão. Testar pausas, retorno e mudança de nível ouvindo o resultado.
- **Timer em background:** o Worker é criado e recebe `stop`, mas o início continua por `setInterval` e não envia `start`. O recurso anunciado não está conectado. Além de resolver a conexão, testar suspensão real; um Worker sozinho não demonstra precisão em todos os dispositivos.
- **Treino progressivo e gravador:** seus intervalos são locais à renderização, sem rotina central de descarte. Navegar para outra tela não interrompe explicitamente gravação/stream nem revoga a URL do áudio. A gravação pode continuar até seu limite mesmo após sair. Implementar encerramento, liberação do microfone, revogação de URLs e botão Parar. Evidência de código; sem teste de microfone nesta revisão.
- **Áudio:** listas de osciladores e timeouts crescem durante a utilização e só são esvaziadas ao parar. Limpar elementos encerrados e medir sessão longa; não afirmar vazamento ilimitado sem perfil de memória.
- **Tablatura inteligente:** `index.html` referencia `lib/alphatab.min.js`, inexistente. `alphaTab` ficou indisponível no navegador, e os dados atuais usam texto ASCII. Resolver dependência e integração ou retirar a promessa; a prioridade pedagógica é notação correta e legível, independentemente da biblioteca escolhida.
- **Backup:** mescla deduplica por ID, mas pode manter duas revisões pendentes da mesma atividade oriundas de dispositivos diferentes. A regra da sessão importada também pode substituir sessão local já avançada; perfil importado é validado, mas não aplicado no merge. Definir política de conflitos por entidade, versão e data; testar resumo antes/depois e idempotência. Evidência de código.
- **Validação:** datas são verificadas por formato, permitindo datas impossíveis, e campos importantes de revisão podem faltar. Introduzir validação semântica e reparo explícito, sem descartar todo o histórico por um registro recuperável.
- **Segurança e erros:** uso frequente de `escapeHTML` e `noopener` é positivo. O manipulador global de erro concatena mensagem/stack em `body.innerHTML`, podendo reconstruir a tela e perder handlers; renderizar erros como texto em componente próprio. Links devem validar protocolo e host completos, não apenas prefixo textual. Não foi demonstrada exploração de segurança.
- **Arquitetura:** arquivos separados ainda compartilham estado e funções globais com dependência de ordem. Criar módulos com contratos para sessão, tentativa, habilidade, revisão e conteúdo, sem reescrita ampla antes dos testes de regressão. `app_old.js` precisa estar claramente arquivado para evitar manutenção do arquivo errado.
- **Testes/documentação:** o validador ainda exige seis atividades e fontes completas antes da hidratação; não cobre todos os scripts separados. Atualizar o teste ao contrato real, mantendo os checks que revelam defeitos. A ausência de erro em contagens, sintaxe ou largura global não comprova qualidade didática, recuperação nem ausência de corte visual.
- **Distribuição:** a aplicação é local, com dependência externa para mídia. Não há neste escopo um serviço hospedado/backend para auditar autenticação, permissões de servidor ou sincronização. Documentar abertura, localização dos dados, limitações entre navegadores e recuperação. Antes de uma futura hospedagem, revisar origem do armazenamento, migração e acesso aos arquivos.

## 8. Plano de execução em blocos

Cada bloco deve terminar em uma entrega revisável e em evidências de aceite. Evitar ampliar o catálogo de atividades ao mesmo tempo em que se altera o modelo de histórico.

| Bloco / ordem | Escopo e entrega concreta | Condição de encerramento |
|---|---|---|
| **A — Confiabilidade** | D01–D04, D06–D10 e D12–D13; contrato único de estado, salvamento, recuperação de histórico e transições de sessão/SRS. | Toda atividade oferecida exporta/reimporta/reabre; interrupções não invalidam histórico; Preparação não altera revisão do Alvo; conclusão congela sessão. |
| **B — Jornada essencial** | D05, D11, D15–D18; Hoje→Aprender→Avaliar→Progresso; fontes, celular, temas, linguagem e impressão. | Fluxo completo sem links vazios, corte de controles ou contradição de nível. Capturas em 320/375/768/1366 px, temas e teclado. |
| **C — Fundamentos 1–3** | Revisão musical detalhada de pulso, acordes e leitura, com critérios por nível e demonstrações curtas. | Outro leitor consegue executar sem adivinhar contagem, duração, dedos ou encerramento. Avaliação de leitura usa exemplo novo. |
| **D — Ouvido e integração 4–6** | Série persistida, tríades com métrica definida, melodia/baixo conferidos e modelo sonoro correspondente. | Placar reproduzível, notas/durações corretas e concordância entre texto, notação e áudio. |
| **E — Complementos 7–11** | Uma atividade por vez: roteiro, autoria/fontes, compasso, peça completa, digitação e critérios. | Propostas só entram como prontas após passar contratos, revisão musical e fluxo real. |
| **F — Curso original por módulos** | Adaptar os 128 guias e revisar propostas 4–5; depois 6, 7, 8 e 9 individualmente, escalas e extras. Usar o mapa de 300 linhas para controlar cobertura. | Cada entrada recebe classificação, disponibilidade, pré-requisito e próximo passo. Toda aula declarada pronta tem fonte/demonstração realmente inspecionada. |
| **G — Planejamento e acompanhamento** | Agenda editável, fila de revisão ordenada, retomada, histórico detalhado, evidência de habilidade e acesso ao legado. | Aluno sabe o que estudar, por quê, como retomar e o que mudou desde a última sessão; adiar não duplica pendências. |
| **H — Consolidação** | Descarte de áudio/gravador, compatibilidade, sessões longas, leitor de tela, falhas de armazenamento, documentação e processo de publicação. | Matriz de regressão executada, limitações explícitas, documentação coerente com a versão entregue. |

Dependências: A antes de expandir E/F; B e C consolidam o padrão usado nas próximas aulas; D depende do contrato de tentativas de A; G depende de sessões e revisões estáveis. H consolida o conjunto, mas acessibilidade e limpeza de recursos devem acompanhar cada bloco, não ser adiadas por completo.

Para o bloco F, revisar lotes de aproximadamente 8–12 entradas por vez, ajustados à duração das fontes. Cada ficha deve registrar: ID canônico, tipo real, acesso, objetivo, pré-requisito, trecho da fonte, autoria, exercício, critério, lacuna, relação com outras aulas e parecer. Fechar o módulo com uma revisão de sequência, para não aprovar boas fichas isoladas com saltos de dificuldade entre elas. Não estimar esforço apenas multiplicando as 300 entradas, pois parte delas é administrativa ou indisponível.

## 9. Matriz mínima de aceitação

| Área | Casos necessários |
|---|---|
| Persistência | Estado novo; todas as 11 atividades; interrupção; fechamento; armazenamento cheio/bloqueado; estado parcialmente inválido; exportação ativa; merge entre dois históricos e reimportação repetida. |
| Sessão | Iniciar, pausar, retomar, trocar, concluir antes/depois de 40 min, consultar passo manual, mudar nível e reabrir; sem perda de identidade/duração. |
| Revisão | Cada resultado nos três níveis; revisão vencida/futura; vários sucessos no mesmo dia; falha antecipada; duas pendências importadas da mesma atividade. |
| Conteúdo | Fonte existente, inexistente e sem mídia; autoria própria; notação com ritmo e duração; critérios por nível; prontidão separada de disponibilidade. |
| Interface | Todas as telas e modais; 320/375/768/1366 px; zoom; claro/escuro; teclado; foco; rótulos; impressão apenas do conteúdo escolhido. |
| Ferramentas | 2/4 e 4/4; contagem; andamento personalizado; áudio indisponível; troca de nível/tela; pausa longa; gravação negada e encerrada; reinício do ouvido. |
| Estudo real | Uma sessão acompanhada: tempo até iniciar, dúvidas de instrução, necessidade de procurar fontes e clareza do próximo passo. Ajustar após observar uso; não atribuir nota de aprendizagem a partir de teste de software. |

**Primeira entrega recomendada:** bloco A, seguido da correção de links e cortes de tela de B. O objetivo é permitir uma sessão completa com progresso recuperável e exercício acessível. Depois, usar as atividades 1–3 revisadas como padrão antes de converter o restante do curso.
