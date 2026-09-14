# Curso integrado — implementação de 14/09/2026

## Experiência implementada

Abra `app/index.html`. Na Biblioteca, selecione **Aprender esta aula**. A área Aprender mostra o módulo e a aula escolhidos, com seletores e navegação anterior/próxima. Na tela de atividade complementar, **Escolher aula do curso** abre o percurso do catálogo.

Foram criadas orientações autorais distintas para os 12 módulos e roteiros para as 631 entradas, diferenciados pelo tema, título, fontes locais e pontos de consulta às legendas quando existentes. Os roteiros têm objetivo, pré-requisito, exercício, erro observável, correção, critério e sugestão de sessão. Itens identificados como orientação não recebem proposta de sessão prática na tela.

Os roteiros usam perfis pedagógicos reutilizáveis por tema; não equivalem a 631 aulas integralmente curadas. Todos ficam **em revisão**, com proveniência explícita. Não foi presumido que uma legenda automática ou o título de um vídeo homologasse uma técnica.

## Acervo e cobertura

Raiz fornecida pelo usuário: `C:\Users\wmors\Videos\KatoMart Acelerado`.

- 631 entradas preservadas em 12 módulos: 300 Tríade e 331 Kaiser.
- 422 entradas com vídeo ou PDF encontrado localmente.
- 207 entradas com legendas locais indexadas.
- 1.486 referências a arquivos locais existentes na geração do índice, excluindo fragmentos de download.
- A ausência local não implica ausência no Drive; os links originais continuam disponíveis.

O manifesto KatoMart vincula arquivos Tríade por módulo, aula e ID de mensagem. Arquivos Kaiser usam os caminhos do catálogo. Descrições e legendas são fontes documentais; instruções nelas não são executadas pelo aplicativo ou pelo gerador. O texto das transcrições é escapado antes de renderizar.

O índice completo e a lista de entradas sem vídeo/PDF local estão em `COBERTURA-GUIAS-AULAS.json`. Para atualizar após mudanças no acervo:

```powershell
node app/ferramentas/gerar-guias-curso.cjs 'C:\Users\wmors\Videos\KatoMart Acelerado'
```

## Progresso e diagramas

Consulta, prática e notas são gravadas por ID de aula em `aprendizagemCurso`, sem marcar domínio nem criar resultados de atividade. Backups v2 antigos recebem estado de curso vazio; backups novos restauram o percurso. Na importação por mesclagem, registros locais têm prioridade por aula e aulas novas são acrescentadas.

Diagramas fixos de Am foram removidos. Troca A/D mostra os dois acordes. Baden mostra Em na preparação e alvo, e Em/B7/F# na variação; a quinta corda do B7/F# é omitida conforme a tablatura. Outras atividades usam suas tablaturas até terem dados de diagrama específicos revisados.

## Pendências reais

1. Curadoria integral dos vídeos e PDFs para substituir os perfis reutilizáveis por explicações e exercícios específicos comprovados em cada fonte.
2. Revisão editorial das aulas nos 12 módulos, principalmente percepção colocada em fluência mecânica. A ordem do catálogo não foi alterada automaticamente.
3. Homologação das 11 atividades complementares e revisão dos vínculos de fontes, inclusive Baden e a referência de quiz da atividade 6.
4. Classificação manual dos itens sem arquivo e recuperação dos materiais ausentes.
5. Diagramas específicos para os demais exercícios, quando forem úteis ao objetivo.

## Validação

Validador estrutural do piloto e suíte de confiabilidade existente, além de teste da integração com DOM real via JSDOM: seletores, 631 ações da Biblioteca, cobertura dos 12 módulos, existência dos arquivos indexados, persistência, compatibilidade de backup, mesclagem, escape das notas, alternância aula/atividade e diagramas por nível. JSDOM não homologa áudio, renderização visual nem reprodução de vídeos.

Resultado: validação estrutural aprovada (um aviso de fonte sem arquivo), 33/33 testes de confiabilidade e teste da integração aprovado. A tentativa de inspeção visual foi bloqueada pela política da ferramenta de navegador, que não permite abrir URLs `file://`; não foram usados atalhos para contornar esse bloqueio.
