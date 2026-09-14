# Análise do curso e proposta de melhoria

13/09/2026 — análise da organização local, dos guias e do piloto interativo.

O projeto tem uma base aproveitável: acervo organizado, guias complementares, exercícios em três níveis e uma proposta de sessão regular. O principal trabalho agora é tornar confiável e claro o percurso entre observar um exemplo, tocar, identificar uma dificuldade, corrigi-la e demonstrar o resultado em outro dia. A aparência profissional deve apoiar esse percurso.

**Escopo desta análise:** documentos de direção, código das duas interfaces, amostra dos guias ativos, dados das seis atividades piloto, revisão anterior e captura desktop arquivada. Executei o validador estático e a auditoria de lógica existente contra o código atual, em Node com DOM mínimo e relógio simulado. Não assisti às 300 entradas do acervo nem conferi o acesso atual ao Drive. A política do navegador bloqueou a abertura local; não há nova homologação visual, acústica ou de acessibilidade. A captura analisada é histórica. Este documento contém recomendações; não modifica a aplicação.

## 1. O que existe e merece ser preservado

- O catálogo carrega 300 entradas em 11 módulos. Isso descreve a organização do acervo, não 300 experiências completas de aprendizagem.
- A interface anterior mantém marcações separadas de assistido e praticado, com aviso de que não certificam domínio.
- Os guias ativos acrescentam objetivos, orçamento e prática. O histórico registra 128 guias nos módulos 1–3; não são equivalentes às seis atividades do piloto nem devem ser descartados.
- As seis atividades trabalham pulso, acordes, leitura, ouvido, tríades e integração de melodia/baixo. Preparação, alvo e variação são uma boa estrutura, desde que cada nível tenha instruções completas e critérios próprios.
- Metrônomo, caderno de dificuldades, links do acervo e funcionamento local são recursos úteis. A navegação Hoje / Aprender / Praticar / Progresso / Biblioteca tem uma organização coerente.

O mapa local informa 197 entradas com mídia e 103 sem mídia associada. Essa informação exige cuidado ao planejar a continuidade dos módulos, mas não constitui verificação atual dos arquivos remotos. Cada lacuna precisa ser classificada antes de decidir se falta uma habilidade essencial ou apenas um item administrativo.

## 2. Problemas atuais que mais afetam o aprendizado

| Prioridade | Evidência no projeto atual | Consequência | Correção proposta |
|---|---|---|---|
| Alta | `interface-v2/app.js`, `abrirModalResultado`: conclui a revisão pendente antes de verificar o nível praticado. A auditoria reproduziu zero revisões pendentes depois de sucesso na preparação. | A prática fácil pode apagar a necessidade de revisar o alvo. | Vincular revisão a atividade, nível e tentativa; preparação não encerra revisão do alvo. |
| Alta | Três sucessos no alvo, registrados na mesma execução da auditoria, avançam 2 → 7 → 21 dias. Não se exige passagem real de dias. | Repetições imediatas podem parecer retenção ao longo do tempo. | Distinguir repetição na sessão de revisão em outra data; limitar avanço do ciclo por data e preservar histórico. |
| Alta | O formulário começa com “Consegui”; o código aprova pelo nível e status, sem consultar `criterioSaida` nem a série auditiva. | É possível marcar domínio sem confirmar compassos, andamento ou acertos. | Começar sem resposta selecionada; mostrar critérios específicos; separar autoavaliação instrumental de resultado medido pelo treinador. |
| Alta | `renderizarTelaAprender` não apresenta os campos estruturados `exercicio.instrucoes`, `dedilhacaoMD`, `niveis.*.repeticoes` e `criterioSaida`. Parte das informações reaparece em outros textos, mas não de modo consistente. | Dados completos no arquivo não garantem uma tarefa executável na tela. | Mostrar explicitamente como tocar, quantas vezes, como terminar e como avaliar o nível atual. |
| Alta | `obterRecomendacao` anuncia pré-requisitos alinhados, mas verifica apenas se a habilidade já tem status demonstrado. A escolha corrente também precede recuperação e revisão. | A recomendação pode insistir numa atividade e sugerir preparo que não foi verificado. | Modelar dependências e testes curtos; explicar o motivo real; manter exploração livre. |
| Alta | Em Hoje e Praticar, a atividade da sessão é substituída sem criar nova sessão ou zerar/separar o tempo anterior. | Minutos de um exercício podem acompanhar outro. | Guardar tentativas e sessões por atividade; oferecer retomada inequívoca. |
| Média | Treino de ouvido mantém placar e intervalo em memória; a troca de nível reapresenta opções sem reinicializar necessariamente a pergunta existente. | Uma pergunta pode não pertencer às alternativas do novo nível; o histórico não documenta a série. | Série com ID, nível, perguntas e primeiras respostas; reiniciar ou retomar explicitamente ao mudar de nível. |

**Atualização em relação ao parecer anterior:** a variável usada ao terminar as seis atividades está corrigida no código atual. O teste do timer agora salva 600.000 ms após dez minutos e 2.400.000 ms ao terminar. O backup malformado do teste foi rejeitado por ciclo inválido. Esses resultados retiram três evidências antigas do conjunto de falhas reproduzidas, mas não comprovam todos os cenários de backup, conflito ou retomada.

O validador estático passou mesmo com problemas acima. Ele confirma estrutura e algumas condições; não demonstra que o aluno recebe instrução correta ou aprende.

## 3. Revisão didática dos seis exemplos

| Atividade | Melhoria necessária |
|---|---|
| Pulso e subdivisão | Separar visualmente duração do baixo e ataques da voz aguda. A descrição de semínimas sobrepostas a colcheias precisa de duas vozes ou explicação explícita. Simplificar termos como “isócrono” e “encerramento formal”. |
| Troca A–D | A meta diz 16 trocas e a prática diz 16 compassos alternados: são 15 transições internas, salvo retorno adicional especificado. Unificar a contagem; apresentar diagramas e cordas que devem soar. |
| Leitura rítmica | A meta promete leitura à primeira vista, mas o aluno repete a mesma grade. Usar a grade para treino e um exemplo novo, equivalente, para avaliar leitura. Introduzir a variação com duas vozes somente após o padrão simples. |
| Ouvido | Vincular o resultado à série; ensinar comparações sonoras antes de cobrar identificação. As analogias com canções se declaram verificadas sem apresentar trecho verificável: conferir ou retirar essa afirmação. Introduzir outras notas de partida gradualmente. |
| Tríades | “3/4 ou 4/4” com três notas e BPM não define duração nem ciclo. Escolher uma métrica e escrever ataques/sustentação, ou assumir exercício livre sem meta rítmica. |
| Melodia e baixo | A preparação diz cordas 2 e 1, mas a tablatura usa também a 3. O alvo pede baixos em 1 e 3, mas o quarto compasso só escreve baixo em 1. Definir durações e dedos por evento; conferir a variação contra a melodia original. |

Produzir cada exemplo musical a partir de uma única tabela de eventos — compasso, momento do ataque, duração, corda, casa, dedo e voz — permitiria gerar tablatura e referência sonora coerentes. Depois, alguém precisa conferir a execução musical: consistência de dados sozinha não atesta conforto ou qualidade sonora.

## 4. Como a experiência deveria ensinar

Cada aula deve oferecer um objetivo curto, um modelo observável, uma tentativa, uma comparação e uma próxima ação. A tela pode começar com “Hoje: trocar A e D mantendo quatro batidas”, seguida do exercício grande, do andamento e dos controles. Explicação extensa e autoria ficam acessíveis em detalhes.

| Recurso | Comportamento útil ao aluno | Ordem |
|---|---|---|
| Demonstração curta | Ouvir/ver o trecho lento e no andamento proposto; nos vídeos do curso, indicar o trecho após inspeção real. | Primeiro |
| Tablatura e diagramas legíveis | Compassos alinhados, números de corda, dedos e legenda; destaque sincronizado ao modelo; ampliação sem cortar conteúdo. | Primeiro |
| Repetição de trecho | Selecionar um ou dois compassos; contagem inicial; modelo → silêncio para tocar → modelo novamente. | Primeiro |
| Correção orientada | Botões “atraso na troca”, “nota abafada”, “perdi o pulso”; cada escolha abre uma prática curta e depois retorna ao alvo. | Primeiro |
| Revisão real | Tentar recordar/tocar antes de revelar o modelo; registrar resultado em outra data. | Primeiro |
| Gravação comparativa | Gravação opcional e reprodução lado a lado, com perguntas sobre continuidade e clareza. | Depois |
| Braço interativo | Localizar uma nota, montar uma tríade e ouvir a resposta, conectado à aula em estudo. | Depois |
| Pequena criação | Alterar o final de uma frase ou criar dois compassos com as notas/acordes trabalhados. | Depois |

A proposta de planejar, monitorar e avaliar a própria prática tem apoio em pesquisa sobre autorregulação musical. Um estudo de 2024 examinou esse processo em quatro violoncelistas de mestrado; é uma referência para o desenho, não prova de eficácia deste aplicativo para um estudante de violão. [López-Íñiguez e McPherson, 2024](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1368074/full).

Revisar em dias diferentes e tentar recuperar o conteúdo antes de consultá-lo são princípios úteis de estudo. Aplicar isso à execução no violão requer adaptação e acompanhamento; 2/7/21 dias devem permanecer uma regra ajustável, sem promessa de calendário ideal. [The Learning Scientists — espaçamento e recuperação](https://www.learningscientists.org/learning-scientists-podcast/2018/3/7/episode-14-how-students-can-use-spacing-and-retrieval-practice).

## 5. Exemplo concreto de aula reformulada

**Título:** Troque A e D sem perder a contagem.

**Antes de começar:** montar cada acorde e conferir as cordas individualmente. A: tocar da 5ª à 1ª; D: da 4ª à 1ª. Se alguma nota não soar, abrir o diagrama e corrigir essa posição antes da sequência.

**Preparação:** escolher um andamento confortável, começando por 50 BPM como sugestão. Tocar A somente no tempo 1; preparar D durante 2, 3 e 4. Tocar D no próximo 1. Fazer quatro compassos. Aqui, o espaço para mover a mão é deliberado e não representa o alvo final.

**Alvo:** tocar quatro batidas para baixo por compasso, alternando A e D por oito compassos. São sete trocas internas. Preparar a mudança após a batida do tempo 4, chegar no próximo 1 e encerrar no 1 seguinte ao oitavo compasso.

**Observar:** cheguei ao tempo 1 nas sete trocas? As cordas previstas soaram? Mantive a contagem até o final? Registrar andamento real e o trecho que falhou. Uma passagem satisfatória indica sucesso naquela tentativa; repetir em outro dia mostra manutenção.

**Se travar:** repetir somente o par de compassos da troca problemática na preparação; depois recolocar as quatro batidas. O sistema registra a dificuldade específica e recomenda a retomada correspondente.

**Aplicar:** tocar os mesmos oito compassos com contraste suave entre a primeira e a segunda metade, mantendo as trocas. A variação acrescenta intenção musical sem exigir imediatamente uma levada sincopada nova.

**Distribuição sugerida:** 3 min preparar + 5 min recordar a prática anterior + 7 min modelo e explicação + 15 min prática em trechos + 7 min aplicação + 3 min registro = 40 min. O timer orienta; avançar de fase deve depender também de uma decisão do aluno. O curso pode oferecer posteriormente sessões mais curtas para dias com pouca disponibilidade.

## 6. Apresentação e progresso

Na captura desktop arquivada, o roteiro fica estreito, há muita informação antes da interação e o quadro escuro apresenta texto como se fosse código. A proposta é dar mais espaço ao exercício e mostrar um passo principal por vez, com visão geral recolhível. A responsividade atual precisa de nova inspeção quando houver acesso ao navegador local.

Usar linguagem de aluno: “O que você vai conseguir tocar”, “Como fazer” e “Ouça e compare”. Termos técnicos podem aparecer com definição curta no ponto de uso. Origem e estado de revisão devem continuar disponíveis, sem dominar a tarefa prática.

O painel de progresso deve mostrar fatos: andamento registrado para um exercício específico, tentativas em datas distintas, dificuldades resolvidas e gravações comparáveis. Evitar uma porcentagem única de domínio e comparar BPM de tarefas diferentes. Separar desconforto físico de erro musical no registro: hoje aparecem na mesma opção e recebem a mesma lógica de recuperação.

## 7. Sequência recomendada de implementação

1. **Confiabilidade:** corrigir revisão, avaliação, identidade das sessões e troca de nível auditivo. Verificar backups com conflitos e registros inválidos. Aceite: nenhuma tentativa fácil apaga revisão do alvo; sucessos no mesmo dia não simulam semanas de retenção.
2. **Qualidade das seis aulas:** alinhar instruções, tablaturas e critérios; exibir os campos essenciais; adicionar modelos e prática por trechos. Aceite: conseguir iniciar cada exercício sem deduzir ritmo, cordas ou repetições.
3. **Uso real:** observar algumas sessões de estudo, registrar onde o aluno hesita, quanto tempo passa lendo e se sabe dizer o que corrigir. Revisar também teclado, celular e impressão. Esse é o ponto em que se começa a avaliar a utilidade pedagógica real.
4. **Ampliação:** converter grupos pequenos de aulas do acervo, mantendo vínculo com fontes verificadas e pré-requisitos. Integrar repertório e criação, preservando o curso geral e as preferências pessoais como opções editáveis.

A prioridade recomendada é concluir uma experiência curta e confiável nas seis atividades, demonstrando que cada uma ajuda a tocar, avaliar e melhorar. Isso fornece o padrão para ampliar o restante do curso.
