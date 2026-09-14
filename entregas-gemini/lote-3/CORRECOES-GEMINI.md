# Correção do Lote 3 — instrução pronta para Antigravity/Gemini

Leia REVISAO-CODEX.md desta pasta, BRIEF-LOTE-3.md do lote 2 e a arquitetura CURSO-VIOLAO-SOLO-MPB.md. Corrija somente o Lote 3. Entregue os seis arquivos completos em `entregas-gemini/lote-3/revisado/`, junto com `validar.cjs` adaptado e `RESULTADO-VALIDACAO.json`. Preserve os originais e a arquitetura. Não produzir novas unidades, aplicativo, áudio ou arranjos comerciais.

## Correções musicais determinadas

1. Ex.3 c.8: melodia com m, interna com i. Ex.2/3 c.8: baixo por três pulsos, seguido de pausa de um pulso, para encerramento conjunto; alinhar as versões facilitadas. Término 4 significa início do quarto pulso; término 5 significa a barra seguinte. Explicar amortecimento sem atribuir sustentação ao polegar encostado na corda.
2. Reconstruir Ex.5 com o quadro abaixo. Cada nota entra no pulso 1, dura quatro pulsos e é encerrada/rearticulada na barra. Não presumir ligadura entre compassos. A sequência preserva o baixo C–B–A–G e usa tríades completas.

| Compasso / harmonia | Baixo (p) | Interna (i) | Melodia (m) |
|---|---|---|---|
| 1 — C | C3, 5/3, ME 3 | G3, 3/0, ME 0 | E4, 1/0, ME 0 |
| 2 — G/B | B2, 5/2, ME 2 | G3, 3/0, ME 0 | D4, 2/3, ME 4 |
| 3 — Am | A2, 5/0, ME 0 | E3, 4/2, ME 2 | C4, 2/1, ME 1 |
| 4 — C/G | G2, 6/3, ME 3 | C4, 2/1, ME 1 | E4, 1/0, ME 0 |

G3 é comum entre os compassos 1 e 2. C4 é comum entre Am e C/G, mas passa da melodia à voz interna; manter o dedo 1 nessa transição é uma possibilidade mecânica, não significa manter a voz melódica imóvel. As digitações são sugestões a experimentar. Versão 5-S: omitir a interna, registrando pausa de quatro pulsos por compasso; chamar de preparação em duas vozes, não de tríades completas.

Reescrever semana 11 A/B/C para ensinar exatamente essas notas. A: C e G/B, G3 comum e melodia E4–D4. B: Am e C/G, introduzir segunda inversão de forma autocontida e explicar a mudança de função de C4. C: conectar os quatro compassos. D permanece opcional, sem conteúdo indispensável.

3. Ex.6 c.4: trocar interna G3 por C4, segunda corda casa 1, ME1, MD i; manter baixo G2 e melodia E4. Ex.6 c.7: trocar melodia E4 por C4, segunda corda casa 1, ME1, MD m; manter E3 e G3. Assim c.4 contém G–C–E (C/G), c.7 contém E–G–C (C/E), e c.2 já contém B–G–D (G/B). Alinhar textos e variante 6-S.
4. Nos demais compassos de Ex.4/6, explicar quando a textura omite terça/quinta. Ex.6 c.5 é F sem quinta; c.6 apresenta G sem terça, com F apenas na segunda metade (G7 sem terça nesse trecho). Não adicionar teoria avançada como requisito. Não chamar toda textura de três cordas de tríade completa.
5. U3 semana 12B: F4 é primeira corda casa 1. Redução: F3 em 4/3 e F4 em 1/1, omitindo a voz interna. Ex.6-S de quatro compassos é somente entrega parcial; a conclusão exige oito compassos e duas inversões corretamente identificadas.

## Consistência editorial e fontes

- Corrigir execução de 16 compassos a 50–56 BPM para 69–77 segundos, sem contagem inicial. Meta arquitetural 45–90 segundos; gravação deve conter a execução inteira. Não tornar BPM fixo condição absoluta de avanço.
- Manter 12 sessões obrigatórias de 40 minutos e quatro opcionais por unidade. Preservar avaliação em duas sessões distintas conforme a rubrica da arquitetura; um take salvo sozinho não certifica avanço.
- Identificar fontes de vídeo por aula/arquivo e link do índice. Não inventar recortes ou duração medida. Se não conferir, dizer “trecho não verificado” e fornecer instrução própria suficiente. A atividade pode incluir vídeo curto mais comparação no instrumento dentro do mesmo bloco.
- Remover ou corrigir os mapeamentos de posições em pentagrama não demonstrados em VERIFICACAO.md. Usar alturas soantes SPN e explicar que a partitura convencional de violão escreve uma oitava acima; partitura não é exigida nesta entrega.
- Incluir as versões simplificadas no JSON como `variantes` de cada exercício, cada qual com id, total_compassos e eventos completos no mesmo esquema do principal. Omitir uma voz exige pausa explícita se ela permanecer no esquema.
- Produzir tablaturas legíveis com colunas alinhadas por pulso, ataque, sustentação e silêncio distintos. Conferir manualmente tab contra eventos; não declarar que o script verifica tab se isso não foi implementado.

## Evidência para reenvio

Executar `node validar.cjs` na pasta revisada. Conferir durações, continuidade, alturas, cordas, dedos simultâneos e equivalência dos eventos entre JSON e todas as 12 tabelas. Preservar o significado dos testes; não remover testes para obter aprovação. Acrescentar verificação das notas constituintes nos acordes corrigidos e examinar a posição superior da melodia. Um resultado sem erros não substitui a revisão harmônica textual ou o teste físico.

VERIFICACAO.md deve distinguir o que foi executado, conferido manualmente e não verificado. RESUMO-REVISAO.md (até 800 palavras) deve listar correções, resultados reais e pendências. Não declarar homologação pelo Codex. Encerrar e aguardar a revisão da versão corrigida.
