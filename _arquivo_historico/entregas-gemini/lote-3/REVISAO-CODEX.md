# Parecer do Lote 3

Data: 13/09/2026. **Decisão: estrutura pedagógica aprovada; materiais musicais ainda não homologados para uso integral.** Este parecer prevalece sobre as alegações de aprovação em RESUMO-REVISAO.md e VERIFICACAO.md. A próxima produção autorizada é a correção deste lote, conforme CORRECOES-GEMINI.md; não avançar às unidades seguintes com estas versões.

## O que foi conferido e pode ser aproveitado

Conferidos os seis arquivos do lote contra BRIEF-LOTE-3.md, a arquitetura v1.2 e as decisões do lote 2. A organização em duas unidades, cada uma com 12 sessões obrigatórias e quatro opcionais, está correta. Os 32 quadros de tempo somam 40 minutos, com intervalos contíguos. A preparação cumulativa de uma composição na Unidade 2, passando de melodia a duas e depois três vozes, é adequada ao objetivo do aluno.

O verificador local `validar.cjs`, executado com Node, conferiu os 167 eventos das seis versões principais no JSON e os 275 eventos das 12 tabelas do Markdown. As seis tabelas principais correspondem aos eventos do JSON. As alturas soantes correspondem às cordas/casas, as vozes fecham quatro pulsos por compasso e não foram detectadas sobreposições de corda nem uso simultâneo do mesmo dedo esquerdo em casas distintas. Isso não valida toda a digitação, a harmonia ou o conforto físico. Tablaturas desenhadas em texto não foram certificadas pelo script.

## Correções obrigatórias

| Local | Constatação | Decisão |
|---|---|---|
| Resumo e orientações de gravação da U2 | 16 compassos de 4/4 têm 64 pulsos: a 50–56 BPM duram 68,57–76,8 segundos, sem contagem inicial. | Usar aproximadamente 69–77 segundos. Manter a janela arquitetural de 45–90 segundos; não exigir corte em um minuto. |
| Ex. 3, c.8, pulso 1 | Melodia e voz interna indicam o dedo direito i simultaneamente. | Usar m na melodia e i na interna, sincronizando todas as representações. |
| Ex. 2/3, c.8 | O baixo dura quatro pulsos; orientações de encerramento pedem silêncio final. A pausa melódica não silencia o baixo. | Para encerramento conjunto, baixo com três pulsos e pausa explícita no quarto. Conferir também versões simplificadas, tabela e tab. |
| Ex. 5 e semana 11 | C4 não pertence à tríade G–B–D. B2–G3–C4 não demonstra G/B como tríade simples; C3–G3–C4 também omite a terça. | Reescrever a condução e a explicação. G3 pode ser nota comum entre C e G/B; C4 não pode ser apresentado assim. Usar proposta concreta no brief. |
| Ex. 6, c.4 e c.7 | G2–G3–E4 e E3–G3–E4 não contêm C. Não demonstram inequivocamente as inversões de C anunciadas. | Inserir C4 na voz interna do c.4 e na melodia do c.7. Atualizar digitação, análise, sessões, variantes e tab. |
| Ex. 4/6, demais voicings | Há duplicações e notas omitidas; por exemplo, no Ex.6 c.5 falta a quinta e no c.6 falta a terça de G7. | Distinguir tríade completa de voicing incompleto contextual. Não afirmar que quaisquer três notas constituem uma tríade completa. |
| U3, semana 12B | F4 é associado à primeira corda solta, que produz E4. | F4 fica na primeira corda, casa 1. Na redução a baixo e melodia, omitir a terceira corda, em vez de mandá-la soar solta. |
| Ex. 6-S | Quatro compassos são apresentados como suficientes para a entrega de oito. | Aceitar somente como preparação/registro parcial; não como conclusão da unidade. |
| EVENTOS.json | Faltam as seis versões simplificadas presentes no Markdown. | Incluir as variantes e conferir todas as 12 versões. |
| Fontes de vídeo | Indicações genéricas de recortes não identificam precisamente aula/arquivo e trecho verificado. | Localizar a fonte ou marcar trecho não verificado e fornecer explicação própria. Sete minutos de atividade não comprovam sete minutos de vídeo; Inversões 1 tem 191 segundos declarados no manifesto. |
| Progressão | Critérios locais enfatizam andamento e gravação única. | Manter os critérios da arquitetura: andamento adaptável e confirmação em duas sessões distintas; D não contém aprendizagem indispensável. |

## Limites da aprovação

Aprovados o formato das sessões e o projeto cumulativo; não liberadas as partituras/tabs, a teoria da semana 11 nem a entrega final de inversões na forma atual. Os arquivos recebidos foram preservados para rastrear a revisão. As correções acima são decisões de arquitetura, ainda a implementar nos materiais pelo Gemini.

O resultado reproduzível está em RESULTADO-VALIDACAO.json. A execução termina com código 1 pelas pendências detectadas; isso é o resultado esperado da auditoria do original, não uma aprovação. O script compara dados e tabelas e detecta alguns conflitos, mas não interpreta as afirmações harmônicas do texto nem valida os recortes de vídeo. Não houve teste físico ou audição dos exercícios nem nova inspeção dos vídeos. As afirmações do relatório original de consistência harmônica integral não foram aceitas.
