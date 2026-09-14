# Correção do Lote 4 — delegação para Antigravity

Leia REVISAO-CODEX.md desta pasta e ESCOPO-CURSO-GERAL.md. Corrija o protótipo em interface/, preservando os documentos pedagógicos e um backup dos arquivos da interface antes das mudanças. Entregue documentação nova em entregas-gemini/lote-4/revisado/. Não produzir novas unidades ou publicar o site.

## Trabalho obrigatório

1. Resolver as nove pendências do parecer. Nome do produto: Curso de Violão — Método Tríade. Títulos originais dos módulos como referência; descrições editoriais separadas e identificadas. Perfil do aluno pode informar nylon/MPB.
2. Extrair lógica real de backup, merge e avaliação para módulo local compartilhado, compatível com scripts clássicos e Node, sem dependências ou build obrigatório. Testes devem importar as mesmas funções executadas pela interface, não reproduzi-las em simuladores.
3. Backup: aceitar explicitamente versão_backup 1 e seu esquema real; validar objetos, IDs, datas ISO válidas, scores inteiros de 0–3, campos textuais, minutos/BPM finitos e IDs de sessão/unidade/exercício conhecidos. Campos opcionais recebem defaults documentados. Rejeitar arrays/objetos inesperados e registros nulos antes da alteração. Mostrar prévia de diário, avaliações e tracking. Não descartar dados silenciosamente.
4. Datas/observações/referências importadas devem ser renderizadas como texto seguro. Remover interpolação de valores importados em innerHTML; usar nós de texto. Mesclar deduplica inclusive dentro do backup e mantém local em conflito por ID; não deduplicar pela data. Substituir troca o estado completo normalizado, inclusive catálogo e última sessão. Arquivo inválido não altera o estado.
5. Corrigir quantidade de compassos de Ex.4 a partir do JSON. Preservar as explicações pedagógicas homologadas do caderno dos exercícios na UI, incluindo pausas/abafamento, notas comuns e voicings. Entregar conteúdo U1 adaptado em SESSOES-U1-ADAPTADAS.md e mapear a origem, sem chamá-lo de extração literal homologada. Não inventar tablatura completa onde há apenas resumo de forma.
6. Renderizar links de Drive nos blocos da sessão como anchors clicáveis com URL validada e nova aba. Conservar texto legível sem Markdown cru. Entrega U2 deve indicar 16 compassos (8 com repetição), e exigir confirmação explícita de execução integral para avaliação de avanço. Planejar esquema/migração se esse campo for novo: registros antigos sem confirmação não são automaticamente comprovados, nem apagados.

## Testes reais exigidos

- Exportar o estado real e reimportar sem perda; merge com conflitos/duplicatas; replace limpa estado anterior; JSON inválido, versão incompatível, null em arrays, datas maliciosas/invalidas, scores -1/4/string e tipos errados não alteram dados.
- Usar o mesmo motor da aplicação para notas insuficientes, datas iguais/distintas, versão parcial e execução incompleta; mistura de unidades não libera outra unidade. Confirmar independente do catálogo assistido.
- Comparar todos os eventos e compassos importados às fontes JSON, todas as tabs às fontes aprovadas e links ao índice; verificar intervalos contíguos das sessões, além da soma.
- Testar a UI via file:// no navegador disponível: navegação, fontes clicáveis, salvar/reload, importação/exportação, timer pausado/retomado e troca de tela. Registrar ações e resultados concretos. DOM montado sozinho não comprova esses fluxos.
- Conferir visualmente 375px/1366px e impressão de uma sessão, exercício curto e tabela longa; relatar cortes e correções. Não afirmar que page-break-inside: avoid sozinho resolve tabela maior que uma página.

## Entrega

Atualizar index.html e arquivos locais para abertura por duplo clique. Entregar RESUMO-REVISAO.md até 800 palavras, VERIFICACAO.md com evidências distinguindo executado/inspecionado, mapa de origem atualizado e SESSOES-U1-ADAPTADAS.md em lote-4/revisado/. Não repetir alegação de 37 testes de segurança integral: registrar exatamente o que os novos testes exercitam. Encerrar para revisão do Codex.
