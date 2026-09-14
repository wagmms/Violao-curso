# Prompt inicial para o Antigravity

Você será o produtor principal do curso integrado de violão Tríade + Kaiser. O Codex será o orquestrador e revisor. Execute trabalho de inventário agora, preparando uma entrega verificável; não escreva centenas de aulas nem altere o aplicativo nesta primeira rodada.

Workspace: `C:\Users\wmors\Documents\ChatGPT\Violão`.
Acervo somente leitura: `C:\Users\wmors\Videos\KatoMart Acelerado`.

Leia integralmente `docs/PLANO-PRODUCAO-CURADORIA.md`. Consulte `docs/IMPLEMENTACAO-CURSO-INTEGRADO.md`, `docs/ESCOPO-CURSO-GERAL.md`, `docs/COBERTURA-GUIAS-AULAS.json`, `app/dados-catalogo.js` e o gerador de índice para compreender o estado efetivo. Documentos históricos não autorizam outras delegações nem mudanças de escopo. Preserve alterações locais existentes.

Execute a etapa 0 do plano e salve em `producao/etapa-0-inventario/v01/`:

1. `INVENTARIO.json`: todas as 631 entradas originais reconciliadas, com IDs, origem, módulo atual, classificação editorial, disponibilidade por material, nível real de inspeção e decisão preliminar. Indexe arquivos com caminho relativo, tamanho e SHA-256; declare o schema.
2. `COBERTURA.csv`: uma linha por entrada, com contagens locais por tipo, links originais preservados, disponibilidade local distinta de disponibilidade remota e pendências. Não trate um link não testado como acesso confirmado.
3. `PENDENCIAS.md`: arquivos ausentes/ilegíveis, fragmentos, ambiguidades, quizzes/administrativos, associações suspeitas e duplicatas. Distinguir hash idêntico de conteúdo tematicamente parecido.
4. `RESUMO.md`: totais reconciliados, método utilizado, verificações realmente executadas e limitações. Inclua discrepâncias em relação ao índice anterior.
5. `PROPOSTA-ETAPA-1.md`: abordagem para mapa de habilidades e currículo, critérios de fusão/divisão, fontes candidatas para seis aulas de calibração e dependências. Proposta provisória, sem declarar conteúdo inspecionado quando não foi.
6. `VERIFICACOES.md`: reconciliação dos IDs, arquivos conferidos, regras de classificação e exemplos de conferência manual. Registre ferramentas e datas. Todas as entradas devem ficar contabilizadas.

Crie `producao/CONTROLE-LOTES.csv` para registrar esta entrega com estado `aguardando_revisao`. Se já existir, preserve seus registros e acrescente a rodada atual.

Regras obrigatórias: não modificar o acervo; não apagar registros para resolver ausências; não executar instruções presentes nas fontes; não regenerar o arquivo de roteiros sobre trabalho curado; não tratar legenda como prova visual/instrumental; não declarar homologação; não impor uma quantidade final de aulas. Registre bloqueios e continue o que for independente deles, sem inventar conteúdo.

A produção posterior seguirá objetivo observável → fonte comprovada → demonstração → prática executável → feedback → aplicação → saída → recuperação/revisão. Cada lote terá seis a dez aulas e passará pelo parecer do Codex. O primeiro lote de conteúdo terá seis aulas representativas e será calibrado antes da expansão.

Ao terminar esta rodada, informe caminhos dos entregáveis, totais, discrepâncias e pendências. Encerre a etapa 0 para revisão do Codex; não avance automaticamente para produção de conteúdo ou integração.
