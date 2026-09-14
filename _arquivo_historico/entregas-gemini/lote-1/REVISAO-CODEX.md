# Revisão do arquiteto — lote 1

Data: 12/09/2026. Resultado: **aprovado parcialmente, com correções; auditoria integral não homologada**.

## O que foi conferido

Li o resumo, as quatro propostas, o mapa e o inventário, cruzando-os com a arquitetura e o índice original. Conferi os dois manifestos e a contagem física da pasta local do Drive G:, além das legendas de Garota de Ipanema (três partes) e Os Desenhos 1 e 3. Não reproduzi a inspeção de PDFs relatada pelo Gemini nem assisti integralmente aos vídeos. Estados de inspeção do executor não significam verificação independente do Codex.

O JSON é válido, tem 420 registros e preserva os 315 IDs de arquivos do índice sem duplicação ou perda. Contém 284 registros de vídeo, 33 PDFs e 103 aulas sem arquivo; dois vídeos têm URL nula. É um catálogo parcial de materiais, não o inventário dos 705 arquivos físicos.

## Achados que exigem correção

1. **Origem da evidência:** os manifestos têm `kind: katomart-rclone-backup` e SHA-256 idêntico (`727E2EF74CEBB85DE21F849441A6A037BB5C1E9720C6151A37921892A29E269C`). São cópias do mesmo backup. Não houve conferência direta do Hotmart nesta revisão. Não chamar de três fontes primárias independentes nem de manifesto oficial da plataforma.
2. **Contagens:** são 195 aulas classificadas como vídeo e 105 como texto. Há 197 aulas com algum arquivo associado, incluindo duas classificadas como texto com descrição MD. Portanto, 103 é a quantidade sem arquivo associado, não o total de aulas de texto. M4–7 somam 87 aulas de texto; 86 sem arquivo. Ver CONTAGENS-CONFERIDAS.json.
3. **Integridade não demonstrada:** `content_text: null`, duração zero e ausência de mídia não provam que uma página original seja dispensável. Entre os itens está “APOSTILA de H_P e de Violão (Meses 4 ao 9)”. Não encerrar a busca por esse material. Presença de arquivo também não comprova reprodução íntegra; não foram testados todos os MP4s/PDFs.
4. **Inventário incompleto:** omite registros próprios das 244 VTTs, 81 MDs, 1 WebM, imagens e fragmentos. Não associa caminhos de legendas às alegações de leitura. Os nomes de módulos dos itens de texto estão duplicados, como “04. 4. Módulo 4”. A contagem de grupos disponíveis no JSON é 195 por módulo + grupo, não 194. O módulo 11 tem dois registros MP4 da mesma live; sua tabela detalhada vazia contradiz o balanço. Inclui também WebM e descrições no disco.
5. **Limites das conclusões musicais:** o nível 3 de Garota de Ipanema menciona notas da melodia nos acordes, contrariando “em nenhuma parte é apresentada a melodia”. As legendas sustentam uso como acompanhamento, não uma exclusão absoluta de conteúdo melódico. Os “80% da MPB” não têm suporte. A aula dos Desenhos 1 e 3 pressupõe conteúdos anteriores, e não deve ser apresentada como entrada autocontida.

## Decisões sobre as propostas

| Proposta | Decisão |
|---|---|
| 1 — Garota de Ipanema | Aceita com correção: laboratório de harmonia/levada; estudo solo com composição original de oito compassos como complemento. Arranjo da canção seria adaptação, não composição original. |
| 2 — Escalas | Aceita parcialmente: um desenho por vez, priorizando 1 e 3 após suprir pré-requisitos. Excluídos percentual de cobertura e associação CAGED não verificada. A rotina é de 120–160 minutos semanais, não 40. |
| 3 — Poderoso Chefão | Aceito apenas como candidato opcional na Unidade 8, condicionado à inspeção da partitura. Substitui tarefa equivalente. A alegação de salto direto da Unidade 2 à 9 é incorreta: já há progressão nas Unidades 3–8 e peça completa na 6. |
| 4 — Integridade | Rejeitada: não homologar 100% de integridade nem irrelevância das páginas sem conteúdo recuperado. |

## Incorporação e próximo passo

Atualizei o currículo para versão 1.1, mantendo 48 semanas, três sessões obrigatórias e uma opcional. Para a Unidade 2, a produção terá uma composição didática original como alternativa garantida à MPB escolhida. O roteiro inicial não precisava de alteração por este lote.

As entregas originais foram preservadas com aviso de revisão. Antes de ampliar a produção, o Gemini deve aplicar CORRECOES-PARA-GEMINI.md e entregar um resumo das diferenças. Em seguida, seguir o lote 2, concentrando a inspeção visual nos arranjos e digitações pendentes.
