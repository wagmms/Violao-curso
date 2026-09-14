# Homologação do Lote 3 corrigido

13/09/2026 — **Unidades 2 e 3 aprovadas para uso como material didático, com os ajustes locais desta revisão.** Esta pasta revisada é a versão vigente; os originais do Lote 3 permanecem históricos e não devem ser usados como apostila.

Conferidos UNIDADE-02.md, UNIDADE-03.md, EXERCICIOS.md, EVENTOS.json, VERIFICACAO.md, RESUMO-REVISAO.md e o código do validador contra o parecer e o brief de correções. Executei `node validar.cjs`: código de saída 0, 12 versões equivalentes às 12 tabelas, 32 sessões de 40 minutos, alturas e durações consistentes e nenhum conflito detectado de corda ou dedos. A contagem correta é **276 eventos em cada representação**, não 275. O verificador faz comparação simbólica e checagem de sete compassos harmônicos selecionados; não certifica automaticamente todo o texto, tabs ou conforto físico.

As correções principais foram aceitas: Ex.5 apresenta C–G/B–Am–C/G com tríades completas e notas comuns corretamente explicadas; Ex.6 c.4 contém G–C–E e c.7 contém E–G–C. O ataque final do Ex.3 usa p–i–m. O encerramento de Ex.2/3 contém pausa conjunta no quarto pulso. Variantes estão no JSON; 6-S permanece preparação parcial. A duração de 16 compassos a 50–56 BPM é aproximadamente 69–77 segundos. Os cinco links utilizados coincidem com o índice local; seus recortes continuam não verificados visualmente.

## Ajustes aplicados pelo Codex

- Corrigido G3 de “quinta” para oitava/tônica no acorde de Sol.
- Esclarecidas as notas omitidas em Ex.4 e Ex.6, inclusive a entrada de F4 somente no terceiro pulso do c.6. Ex.4-S c.3 não é uma tríade completa.
- Regeneradas as seis tablaturas principais a partir do JSON com uma coluna por pulso; acrescentado TABLATURAS-COMPLETAS.md com todas as 12 versões. As tabelas continuam sendo a referência para voz, dedos e término exato.
- Removidos limite de dez segundos para nomear notas e BPM fixo no critério de saída de Ex.4. BPMs da U3 são sugestões ajustáveis.
- Explicitada a avaliação da U3: se a primeira entrega completa ocorrer em 12C, repetir essa sessão obrigatória em outro dia, sem depender de D. Avanço requer pelo menos 2 nas quatro dimensões da rubrica em duas sessões distintas.
- Substituídas descrições universais da sonoridade por comparação auditiva do próprio aluno. Corrigida a contagem de eventos nos relatórios.

O script ajustes-codex.cjs registra a transformação desta entrega; não é necessário executá-lo novamente para estudar ou validar. O teste simbólico foi repetido após as mudanças e passou. Não houve execução física dos exercícios, audição de uma performance ou inspeção integral dos vídeos nesta revisão.

## Uso e próximo lote

Usar UNIDADE-02.md com Ex.1–3 e UNIDADE-03.md com Ex.4–6 desta pasta. Realizar A/B/C em dias distintos, D opcional. Repetir semanas ou sessões quando necessário; o calendário é referência, não prazo obrigatório.

A conclusão desta revisão libera o material para estudo e o planejamento do Lote 4. A produção de novas unidades deve seguir um brief próprio; esta homologação não aprova antecipadamente materiais ainda não produzidos.
