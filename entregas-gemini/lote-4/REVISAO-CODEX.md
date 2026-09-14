# Parecer do Lote 4 — interface

**Decisão: integração aprovada como protótipo; homologação final pendente de correções e testes da aplicação real.** Revisão em 13/09/2026. A entrega preserva duas navegações, catálogo original e plano complementar, com scripts locais e materiais musicais homologados das U2/U3.

Li o walkthrough enviado, os documentos da entrega, o gerador, o validador e os trechos da aplicação responsáveis por sessões, avaliação, armazenamento e backup. Executei `node interface/ferramentas/validar-interface.cjs`: 37 sucessos, zero falhas. Contudo, parte desses testes executa implementações simuladas, não o código da aplicação. Assim, o resultado não comprova os comportamentos de importação, avaliação e sanitização da interface.

Não consegui realizar uma inspeção visual local: a ferramenta de navegador bloqueou a navegação file:// por política de URL. Não tentei contornar esse bloqueio. As alegações de testes em Edge/Chrome e impressão são relatos do executor; não foram reproduzidas nesta revisão. Isso não indica que a interface falha ao abrir no navegador do usuário.

## Pendências encontradas

1. **Escopo e nome:** o resumo e várias documentações ainda acrescentam “Formação em Violão de Nylon”. Remover essa denominação do produto; nylon é informação do perfil. O catálogo deve usar os títulos originais dos módulos; descrições editoriais como “Fingerstyle Avançado” não devem aparecer como nomes oficiais sem comprovação.
2. **Teste não corresponde ao backup real:** o validador usa `versao`, `diario` e `notas`; a aplicação exporta `versao_backup: 1`, `dados.progresso.sessoesPraticadas` e avaliações com `scores`. O teste atual pode passar mesmo se a importação real estiver quebrada. Extrair lógica compartilhada e testar as funções usadas pela aplicação.
3. **Importação permissiva:** o leitor verifica apenas duas arrays. Registros nulos, datas inválidas, notas fora de 0–3 ou campos com tipos inesperados podem quebrar renderização e avaliação. A versão exportada não é validada. Datas importadas são interpoladas em innerHTML no parecer de avanço, sem escape. Validar e normalizar todo o esquema antes de alterar dados; usar texto seguro ao apresentar datas. Arquivo inválido deve deixar o estado intacto.
4. **Mesclagem/substituição:** os conjuntos de IDs usados na mesclagem não são atualizados durante a inclusão, permitindo duplicatas no próprio arquivo. Substituição conserva ultimaSessaoId e tracking do catálogo se o campo importado estiver ausente. Definir substituição integral do estado validado e mesclagem determinística por ID; data igual não significa registro duplicado.
5. **Ex.4:** o gerador define oito compassos para principal e simplificada; JSON e tabs originais têm quatro. Derivar quantidade da fonte JSON. O estudo U1 tem um resumo estrutural no campo tablatura; não declarar que é tablatura completa conferida.
6. **Instruções musicais incompletas na conversão:** as tabelas/tabs de U2/U3 são importadas, mas as explicações de notas comuns, voicings incompletos e amortecimento precisam ser preservadas junto dos exercícios. Não reduzir a integração a título, andamento e eventos.
7. **Links nas sessões:** os blocos são renderizados com textContent. Links Markdown provenientes das sessões aparecem como texto literal, não como links clicáveis. Separar texto de fonte e renderizar anchors seguros; não recorrer a innerHTML irrestrito.
8. **Unidade 1:** suas 16 sessões detalhadas foram escritas diretamente no gerador, embora a fonte inicial tenha uma grade resumida e rotinas gerais. Isso é produção nova/adaptação, não extração de sessões previamente homologadas. Entregar esse texto em Markdown revisável e mapear cada sessão à origem; conferir fidelidade antes de homologá-lo.
9. **Avaliação U2:** o seletor diz “Completo (8 compassos)”, mas a entrega requer repetição de oito = 16 compassos. Tornar a versão oficial explícita. O código avalia notas/versão; não presume que a duração integral foi cumprida só por marcar ex3. Registrar confirmação de execução integral.

## Respostas às dúvidas do executor

- Padronizar eventos SPN da U1 é útil, mas deve ser uma entrega musical revisável; não impede a interface de mostrar corretamente o material textual atual.
- D não é pré-requisito de avanço. Repetir 12C em outra data se necessário.
- Para 6-S, manter c.1–4 como preparação e trabalhar c.5–8 em pequenos trechos na sessão 12B, juntando depois. Não retornar às semanas 5/6 da U2 automaticamente.
- O complemento de escalas é ligado principalmente à U7 e introduzido por diagnóstico; não é pré-requisito obrigatório de U5.
- Mesclar por ID: preservar o registro local existente; mesmo dia pode conter registros distintos. Informar conflitos e quantidade incluída. Substituir aplica o backup completo após confirmação e validação.

## Próximo passo

Executar CORRECOES-GEMINI.md desta pasta. Manter o protótipo acessível, mas não anunciar cumprimento integral do brief ou segurança integral enquanto as pendências acima não estiverem resolvidas. O curso original está catalogado; a existência da interface não torna todas as aulas conferidas nem completa a produção de sessões guiadas.
