# Parecer do Lote 6

**Decisão: integração do mapa e do guia do Módulo 1 aceita quanto à estrutura; guias 2/3 aguardam correções de evidência e validação antes da ativação.** Manter somente 46 aulas guiadas na interface por enquanto. O curso geral e seus materiais continuam acessíveis.

## Conferências realizadas

Executei ferramentas/conferir-lote-6.cjs: 38 aulas do Módulo 2, 44 do Módulo 3, zero erros relatados de título, ID e URL, 46 guias do Módulo 1 no script local. Examinei o código do compilador e da renderização: os guias estão separados do catálogo, e o mapa usa renderizador local. Nenhum servidor ou rota de 48 semanas foi reintegrado.

O resultado da conferência é mais limitado que o resumo: o teste de orçamento apenas procura a expressão “40 min/minutos”, sem somar os blocos. O teste de evidência apenas verifica que o campo não está vazio. Portanto, esses testes não atestam duração exata ou veracidade dos objetivos documentados. Os testes CDP foram entregues pelo executor e não reproduzidos nesta revisão devido à restrição anterior de navegação local.

## Correções necessárias

1. **Evidência localizável:** os guias trazem sínteses e tamanhos em MB/bytes, mas não os trechos localizáveis pedidos no brief. Exemplo: Módulo 2, aula de intervalos, afirma inspeção de descrição/legenda/apostila, sem timestamp observado ou passagem/ seção identificada. Não transformar tamanho de arquivo em evidência do conteúdo. Para objetivos documentados, fornecer arquivo e referência curta verificável; se não houver inspeção real, classificar como proposta provisória e não inventar evidência retroativa.
2. **Orçamentos:** substituir procura de texto por soma de blocos numéricos, distinguindo sessão completa, sessão agrupada e várias sessões de 40 minutos. A referência da aula agrupada deve apontar para o orçamento da parceira, sem contar sessão extra. Conferir os tempos com os arquivos fonte, não apenas textos da interface.
3. **Portabilidade do compilador:** gerar-dados-guias.cjs usa caminho absoluto do computador. Derivar raiz de __dirname, remover autocópia desnecessária e permitir fontes homologadas explicitamente. Preservar IDs/progresso e não compilar guias em revisão automaticamente.
4. **Limites da homologação na interface:** o compilador não preserva o aviso geral de evidência do piloto. Atualizei o disclaimer em geral.js para informar que aprovação de guia não é inspeção integral das fontes pelo Codex. Manter esse limite ao ampliar os guias; default sem fonte não deve afirmar que “material foi consultado e homologado”.
5. **Plataforma sem arquivo:** no quiz do Módulo 2, “Arquivo de suporte local / Plataforma” pode sugerir arquivo recuperado inexistente. Identificar como registro catalogado sem arquivo associado. Não afirmar que texto oficial do quiz foi lido, nem reconstruí-lo como oficial.

## Próxima ação

Corrigir somente os guias 2/3 e ferramentas conforme CORRECOES-GEMINI.md. Não iniciar Módulos 4–8 neste ciclo. Após nova revisão, compilar e ativar os guias aprovados. O piloto do Módulo 1 permanece disponível para estudo, com o limite de evidência explícito.
