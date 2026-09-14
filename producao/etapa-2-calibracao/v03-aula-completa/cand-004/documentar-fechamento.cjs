const fs=require('fs'),path=require('path'),crypto=require('crypto');
const write=(f,t)=>fs.writeFileSync(path.join(__dirname,f),t+'\n');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const previous=path.resolve(__dirname,'../../v02-aula-completa/cand-004');
const preserved=['recursos/referencia-audio-sintese.wav','recursos/tarefa-transferencia/transferencia-audio-sintese.wav','recursos/pauta-adaptada.musicxml'];
const report=JSON.parse(fs.readFileSync(path.join(__dirname,'RESULTADO-VALIDACAO.json'),'utf8'));
const compare=preserved.map(f=>({arquivo:f,sha256_v02:hash(path.join(previous,f)),sha256_v03:hash(path.join(__dirname,f)),identico:hash(path.join(previous,f))===hash(path.join(__dirname,f))}));
write('PRESERVACAO-RECURSOS.json',JSON.stringify({recursos:compare,limite:'Comparação dos recursos musicais listados; nenhuma escrita em v02, app ou acervo pelos scripts desta rodada.'},null,2));
write('VERIFICACOES.md',`# Verificações do fechamento localizado — cand-004 v03

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

Resultado: ${report.oficial.passes.length} verificações aprovadas, ${report.oficial.errors.length} erros oficiais; ${report.mutacoes.filter(t=>t.rejeitado).length}/${report.mutacoes.length} mutações rejeitadas. RESULTADO-VALIDACAO.json contém os erros observados em cada cópia.

Testes alteram cópias físicas temporárias e chamam validarAulaPacote(), a mesma função da entrega oficial. Incluem hash, ID, resposta em SVG, alteração de PNG, Markdown divergente, início, duração, link real quebrado e seção ausente. Cópias são removidas após execução, sem modificar a entrega oficial.

AULA.md é gerado por renderAulaMarkdown() e comparado com a renderização. A igualdade comprova fidelidade ao gerador desta aula, não certifica todos os tipos/regras de schema. Motor formal compatível permanece pendente antes da integração.

## Preservação e limites

EVENTOS.json conferido evento a evento contra v02. Áudios e MusicXML comparados byte a byte: ${compare.every(t=>t.identico)?'idênticos':'consultar divergências em PRESERVACAO-RECURSOS.json'}. Não houve nova escuta humana, teste de eficácia com estudante ou integração. Nenhuma alteração em app, acervo ou v02 nesta rodada.`);
write('RESPOSTA-CORRECOES.md',`# Resposta item a item — FINA-01 a FINA-06

Execução: Codex, 14/09/2026, sobre a entrega v03 existente. Status: aguardando_revisao.

1. **FINA-01:** Proveniência gerada da base física. Nome 0. 1, 51.500 bytes, SHA-256 decfdf2e34bb85eded08973c14754138257835957d96a01fcc2cb6bcf535dbd8 e caminho conferidos com o arquivo real, somente em leitura. mat-lei-001 é identificador editorial declarado, não nome físico. Evidência: aula.json, AULA.md, fechar-localizado.cjs e RESULTADO-VALIDACAO.json.
2. **FINA-02:** Mantido aula-ped-017-leitura-clave-sol, com candidatoId cand-004 separado e alias legado candidato_id. Proposta aula-prop-017, módulo mod-ped-05 e habilidade hab-lei-003 preservados. Validação inclui comparação com ID da v01.
3. **FINA-03:** Sistemas existentes na v03 já estavam sem respostas melódicas nos cabeçalhos; conferidos visualmente junto às pautas limpa, celular, transferência e simulação. Inspecionados textos dos SVGs. Removida também a resposta “nota Fá” do teste de início direto no c.3. Hashes dos gráficos inspecionados impedem alteração silenciosa; não substituem inspeção humana.
4. **FINA-04:** Conclusão limitada ao sucesso naquela revisão; removida frase residual sobre assimilação comprovada por uma revisão. Frequência não integra pergunta obrigatória da saída. Música e referência de afinação preservadas.
5. **FINA-05:** Simulação existente em viewport 375 px e área útil 343 px aberta e observada. Escala 42,875% da largura lógica 800 px; redução 57,125%. Relatório corrigido, sem alegações de conforto físico ou distância não testada; dimensões notacionais registradas como estimativas rasterizadas.
6. **FINA-06:** Mantida geração determinística do Markdown, com correções de texto. Acrescentadas conferências reais de base/acervo, IDs, links, gráficos e eventos. Nove mutações em cópias físicas passam pela mesma função validarAulaPacote(); todas rejeitadas com erro esperado. Motor formal de schema permanece explicitamente pendente antes de integração.

Verificações detalhadas: VERIFICACOES.md. Resultados: RESULTADO-VALIDACAO.json. Recursos musicais preservados: PRESERVACAO-RECURSOS.json. Sem expansão de template ou integração.`);
write('PENDENCIAS.md',`# Pendências — cand-004 v03

Status: **aguardando_revisao**. Não há homologação antecipada do conteúdo, do modelo ou da integração.

- Parecer formal sobre esta entrega localizada.
- Motor formal compatível com JSON Schema 2020-12 e validação das instâncias contra os contratos pertinentes, antes de qualquer integração. Os checks locais e igualdade da renderização não equivalem a essa aprovação técnica.
- Teste de uso por estudante e em dispositivo físico para avaliar legibilidade e eficácia didática. A inspeção visual em 343 px limita-se à simulação observada.
- Sem nova escuta instrumental pelo executor desta rodada; WAV é síntese referencial.

Demais candidatos continuam fora do escopo. Nenhuma produção em escala, expansão de template ou alteração de app/acervo autorizada por este fechamento.`);
write('RESUMO.md',`# Entrega localizada — cand-004 v03

Status: aguardando_revisao. Somente FINA-01 a FINA-06; v02 preservada.

Fonte e IDs reconciliados; sistemas limpos inspecionados; conclusão de revisão limitada à tentativa; cálculo móvel corrigido e simulação observada; Markdown gerado do JSON e validação reutilizável em cópias físicas.

Resultado: ${report.oficial.passes.length} checks aprovados, zero erros oficiais, nove mutações rejeitadas. Conferências musicais preservadas. Motor formal de schema pendente antes da aprovação técnica para integração.

Consultar RESPOSTA-CORRECOES.md e VERIFICACOES.md. Não integrar ou expandir antes do parecer.`);
let csv=fs.readFileSync(path.join(__dirname,'EVIDENCIAS.csv'),'utf8');
csv=csv.replace('garantindo concordância integral','conferido contra a renderização determinística desta aula').replace('6 testes negativos de mutação com o mesmo motor','9 mutações em cópias físicas pela mesma função de validação').replace('limites de leitura a distância registrados','limites da simulação registrados; distância física não testada');
write('EVIDENCIAS.csv',csv.trimEnd());
