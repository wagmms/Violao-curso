# Interface exclusiva do curso geral

13/09/2026. A pedido do usuário, retirada a rota personalizada de MPB/solo/48 semanas da interface ativa. Mantido somente o curso geral Método Tríade: 11 módulos, 300 aulas catalogadas, seus materiais e marcações de estudo. O histórico de produção permanece arquivado; não representa um segundo curso ativo.

## Revisão da entrega do Antigravity

Executei a suíte revisada: 62 sucessos, zero falhas. O núcleo compartilhado atende à correção estrutural solicitada, e Ex.4 passou a usar quatro compassos. A homologação das funções da rota antiga perdeu relevância para o produto atual, pois essa rota foi retirada. Não aprovar “AABB” como indicação da repetição da peça original: a orientação homologada era repetir os oito compassos completos; esses exercícios não estão mais no produto ativo.

## Alterações efetivamente realizadas

- Novo index.html apenas para o curso geral, com busca/módulo/filtros, materiais de cada aula, assistida/praticada, anotações, cronômetro e backup JSON com validação dos IDs reais.
- Conteúdo ativo em conteudo-geral.js, sem unidades, sessões ou exercícios personalizados; títulos e IDs do catálogo preservados. Sem caminhos locais privados ou fragmentos .part-Frag nos dados ativos.
- Marcações do catálogo anterior recuperadas quando disponíveis no mesmo navegador. Os registros antigos não são apagados. Backup novo usa esquema próprio do curso geral; não importar backups da rota antiga como se fossem o mesmo esquema.
- Cópia prévia em arquivo-plano-personalizado/. Os arquivos pedagógicos históricos não foram destruídos.

Executei validar-geral.cjs: contagens, IDs contra catálogo recebido, ausência de plano, integridade de referências locais e sintaxe JavaScript aprovadas. Esta é uma verificação estática/dados; não comprova interação, persistência ou impressão em navegador. Teste visual de file:// continua não reproduzido neste ambiente devido ao bloqueio anterior da ferramenta de navegação. O usuário pode abrir index.html no navegador comum e recarregar a aba existente.

## Próximo passo

Antigravity deve finalizar/verificar a interface geral e preparar um mapa de estudo das aulas originais conforme BRIEF-CURSO-GERAL.md. Não continuar produzindo apostilas da rota MPB retirada. Conteúdo do curso é o acervo real; as lacunas continuam explícitas. Catalogado não significa assistido, conferido ou plenamente recuperado.
