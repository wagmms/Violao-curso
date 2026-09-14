# Parecer do Lote 5

**Decisão: catálogo geral aprovado quanto à correspondência com o inventário; guia piloto e mapa pedagógico não homologados.** A interface pode continuar sendo usada como biblioteca do curso. Não expandir os guias aos demais módulos antes de corrigir o piloto.

## Verificação realizada

Li o walkthrough, o mapa, o piloto e os scripts de geração/validação. Executei validar-geral.cjs e conferir-fontes.cjs. A segunda checagem compara cada agrupamento e todos os títulos/tipos/URLs de materiais com o inventário revisado, não apenas totais. O catálogo ativo corresponde à fonte, com 11 módulos e 300 aulas. A ausência do plano personalizado está preservada.

Os 56 resultados de interação em Chrome/Edge são evidências entregues pelo executor; não executei seu script CDP. A ferramenta de navegador havia bloqueado file:// e não foi usado outro mecanismo para contornar essa restrição. Assim, a inspeção visual/interativa nesta revisão permanece não reproduzida; isso não invalida o relato do executor, mas limita a homologação independente de UI.

## Erros impeditivos no conteúdo pedagógico

- A tabela do mapa mantém o total geral, mas redistribui aulas/arquivos entre módulos sem corresponder às fontes. Módulo 2 tem 38 aulas, não 24; Módulo 3 tem 44, não 20; Módulo 11 tem duas, não 36. O diretório 10 contém 11 aulas com arquivos, não uma lacuna total. Módulos 1–8 contêm 171 aulas com arquivos, não 182. Usar CONFERENCIA-FONTES.json como resultado reproduzível.
- O mapa renomeia Mês 7/8/9 e os diretórios 10/11 como módulos genéricos, contrariando a preservação de títulos. “Completo” com base em 100% de aulas com arquivo não comprova integridade do curso ou do backup.
- O guia tem dez títulos diferentes dos grupos catalogados. Exemplo: sua aula 1 é “Apresentação e Caderno de Estudos”, enquanto o grupo do catálogo é o item de apostilas/apresentação. Não aprovar esses títulos como originais. As divergências estão no JSON de conferência.
- O guia afirma ter consultado vídeos e marca objetivos como confirmados, mas não fornece links diretos nem trechos observados por aula que permitam rastrear essas afirmações. A alegação de inspeção do executor precisa de evidência, não de um status repetido. Onde não houver evidência, classificar como proposta de estudo provisória, sem atribuição ao professor.
- Quantidades como “10 min de vídeo” e “15 min de vídeo” aparecem como dosagens sem identificar recortes. Orçamento sugerido não é duração medida da mídia. Ao agrupar aulas, recompor uma única sessão de 40 minutos; não somar dois roteiros completos. Incluir preparação/registro no orçamento, em vez de presumir que 30 minutos de prática mais dez de vídeo sempre comportam tudo.
- A descrição “285 vídeos MP4” é incorreta: o inventário auditado registra 284 MP4 e um WebM. IDs são preservados nesta geração, mas sua construção por ordem de inserção não garante estabilidade em atualizações do inventário. Adicionar teste de identidade histórica e migração quando necessário.

## Próximo passo

Antigravity deve corrigir somente mapa e piloto, com rastreabilidade de fonte e tempos, e fortalecer a manutenção de IDs conforme CORRECOES-GEMINI.md. Os guias corrigidos devem ser devolvidos para revisão; ainda não integrar objetivos/roteiros provisórios à interface como conteúdo aprovado. É possível estudar as aulas reais do Drive enquanto isso.
