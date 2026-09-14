# Parecer Codex — cand-004 v03-inspecao

Data: 14/09/2026. **Aprovado para produção da aula completa na Etapa 2B.** Aprovação do candidato, seus dados musicais e plano; não homologação da aula final, integração ou eficácia educacional.

## Verificação

Inspecionados EVENTOS, plano, pauta PNG, fonte LilyPond e MusicXML, código do validador e resultados. O validador do produtor passou. Conferência independente em `revisao-codex/conferir-cand004-v03.py`, com resultado `revisao-codex/EVIDENCIAS-cand004-v03.json`.

- Vínculos `aula-prop-017 / mod-ped-05 / hab-lei-003` correspondem à versão curricular anteriormente conferida.
- Fonte e adaptação são identificadas separadamente, sem falsa transcrição literal dos quatro primeiros grupos do PDF.
- 14 eventos, quatro compassos de quatro tempos, total de 16 tempos. Inícios absolutos/locais, durações racionais e MIDI por corda/casa conferem.
- MusicXML tem 14 notas com alturas escritas/durações concordantes com EVENTOS.
- PNG observado: notas e figuras correspondem à adaptação; dois eventos de mínima. Há ajustes de legibilidade/clave indicados abaixo.
- WAV PCM: 16 segundos; frequência dominante medida em janela interna de cada evento compatível com a nota sonora prevista. Análise numérica, **não escuta humana**, não valida timbre, articulação ou precisão integral de todos os ataques/encerramentos.
- Entrada distingue identificação, afinação, produção de notas e leitura rítmica; saída inclui alturas/durações/continuidade. O plano deixou de usar o molde genérico do primeiro lote.

Não validei equivalência visual de PDF/SVG/LilyPond renderizado com PNG/MusicXML, nem executei a aula com aluno ou no navegador. Disponibilidade física da fonte foi conferida em rodadas anteriores; não houve recálculo de hashes nesta rodada.

## Ajustes obrigatórios na produção 2B

1. **Pauta:** gerar versão de estudo sem nomes das notas, frequências, cordas/casas e dedos abaixo de cada evento; manter versão anotada como ajuda/gabarito. A saída de leitura usa pauta sem respostas. Verificar visualmente a clave alinhada à segunda linha: no PNG atual o símbolo está deslocado para baixo. Preferir renderização por motor de notação a posicionamento manual de glifo. Separar rótulos que se encostam e verificar leitura em celular; pode dividir em dois sistemas.
2. **Encerramento de notas:** ensinar gesto concreto e simples de amortecimento quando necessário, sem impor precisão temporal idealizada como pré-requisito oculto. Na preparação, priorizar altura/pulso; no alvo, orientar ressonâncias indesejadas. Não atribuir som ruim automaticamente a curvatura do dedo: confira posição, contato e pressão mínima, com desconforto tratado como sinal para interromper/rever.
3. **Leitura versus memória:** como a melodia é familiar, tocar corretamente pode resultar de memória. A saída deve pedir identificação de nota/duração na pauta e entrada em ponto indicado; a transferência usa pequeno trecho autoral novo de dificuldade equivalente, sem respostas impressas.
4. **Rubrica:** os 14/14 e 60 BPM são metas deste exercício, não medidas universais de domínio. Descrever como o aluno compara o resultado e como registra tentativa, dificuldade e próxima ação. Continuidade deve considerar todas as transições, não só c.2→c.3.
5. **Validação:** o script do produtor confere a matriz por presença global de strings; validar a mesma linha/relação com parser CSV. Conferir também início/duração, equivalência dos formatos realmente entregues e recursos usados. Motor de schema segue pendência técnica para validar aula completa/integração; não declarar conformidade integral pelo verificador parcial.

## Liberação

Produzir **uma aula completa**, fora de app/, segundo `producao/BRIEF-ETAPA-2B-CAND004.md`. Os demais candidatos continuam em inspeção/correção. Após entrega, Codex revisa conteúdo e recursos antes de autorizar integração.
