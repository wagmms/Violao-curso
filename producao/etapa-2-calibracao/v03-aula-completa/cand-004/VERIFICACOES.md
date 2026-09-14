# Verificações do fechamento localizado — cand-004 v03

Status: aguardando_revisao. Execução Codex em 14/09/2026, complementando a v03 já existente.

## FINA-01 e FINA-02

Proveniência gerada de ARQUIVOS-FISICOS.json da Etapa 0 v04 por fechar-localizado.cjs. O validador compara ID, nome, caminho, entrada, bytes e SHA-256 com essa base e lê o arquivo original para conferir tamanho e hash. ID pedagógico comparado com a v01; candidatoId separado, com candidato_id como alias legado validado.

## FINA-03 — inspeção dos recursos

Observados diretamente pauta-limpa.png, pauta-celular.png, os dois sistemas isolados, transferencia-pauta-limpa.png e simulacao-mobile-343px.png. Lidos todos os elementos text dos dois SVGs limpos. Cabeçalhos dos sistemas não contêm sequência de respostas. “Clave de Sol” é nome da clave, não resposta melódica. O rodapé celular informa faixa C3–A3, não sequência. Recursos anotados e gabaritos continuam separados.

INSPECAO-GRAFICOS.json registra hashes dos oito recursos inspecionados. Alterações posteriores são rejeitadas até nova inspeção. Isto não é OCR nem prova automática de qualidade da notação; um PNG alterado pode ser detectado pelo hash sem compreender seu texto.

## FINA-04

Saída sem pergunta obrigatória sobre frequência e sem nota fornecida para o início no compasso 3. Conclusão da revisão limita-se à recuperação naquela tentativa. Removida também a frase que condicionava assimilação a uma única revisão posterior.

## FINA-05 — simulação observada

Viewport de 375 px com margens de 16 px: área útil 343 px. Fator lógico 343/800 = 0,42875 = 42,875%; redução de 57,125%. PNG de 1600 px: fator 343/1600 = 21,4375%.

A simulação existente foi aberta e observada. Na representação mostrada, linhas e cabeças permanecem separadas; título, subtítulo e rodapé ficam muito pequenos. Não foi realizado teste com estudante, smartphone físico, distância de leitura, suporte ou iluminação. Não se afirma conforto a 30–40 cm nem legibilidade a um metro.

Estimativas geométricas para o sistema isolado: distância entre linhas de 32 pixels no PNG → 6,86 px na área de 343; cabeça de aproximadamente 32 × 24 pixels → 6,86 × 5,15 px. Estimativas não são medida de acuidade ou conforto. Tamanho de fonte em pontos não deve ser inferido de pixels rasterizados sem parâmetros de renderização. Usar zoom, paisagem ou tela maior se a leitura ficar difícil.

## FINA-06 — execução real

Comando: node producao/etapa-2-calibracao/v03-aula-completa/cand-004/validar-aula.cjs

Resultado: 119 verificações aprovadas, 0 erros oficiais; 9/9 mutações rejeitadas. RESULTADO-VALIDACAO.json contém os erros observados em cada cópia.

Testes alteram cópias físicas temporárias e chamam validarAulaPacote(), a mesma função da entrega oficial. Incluem hash, ID, resposta em SVG, alteração de PNG, Markdown divergente, início, duração, link real quebrado e seção ausente. Cópias são removidas após execução, sem modificar a entrega oficial.

AULA.md é gerado por renderAulaMarkdown() e comparado com a renderização. A igualdade comprova fidelidade ao gerador desta aula, não certifica todos os tipos/regras de schema. Motor formal compatível permanece pendente antes da integração.

## Preservação e limites

EVENTOS.json conferido evento a evento contra v02. Áudios e MusicXML comparados byte a byte: idênticos. Não houve nova escuta humana, teste de eficácia com estudante ou integração. Nenhuma alteração em app, acervo ou v02 nesta rodada.
