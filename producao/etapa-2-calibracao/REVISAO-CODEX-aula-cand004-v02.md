# Parecer Codex — aula completa cand-004 v02

Data: 14/09/2026. **Corrigir e reenviar. Conteúdo próximo do fechamento; modelo e integração ainda não homologados.**

## Avanços conferidos

Lidos JSON, seções de Markdown, verificações, pendências e código do validador; observadas pauta limpa e sistema móvel isolado. Validador do produtor executado e aprovado no escopo que testa.

- Clave agora alinhada à linha de Sol nas duas imagens observadas; não reabrir esse ajuste sem novo problema. Não foi conferida cada imagem desta versão.
- JSON materializa 14 seções; diagnóstico, gradação, níveis e planejamento ficaram mais completos.
- Respostas parentéticas foram retiradas da saída; gabarito separado presente.
- Revisão posterior, pausa/registro e cronogramas de 40/20 min foram acrescentados.
- Os dois WAVs são byte a byte idênticos aos da v01, anteriormente conferidos numericamente. Não houve escuta humana pelo revisor.

## Correções finais obrigatórias

| ID | Problema | Correção verificável |
|---|---|---|
| FINA-01 | Fonte arq-0408 aparece como `Kaiser - Partituras 1.pdf`, hash `90bfeff1...`, tanto no JSON quanto no anexo; contradiz inventário. | Nome original é `0. 1`, 51.500 bytes, hash `decfdf2e34bb85eded08973c14754138257835957d96a01fcc2cb6bcf535dbd8`. Gerar proveniência da tabela física, validar ID/caminho/hash reais e distinguir nome de exibição de nome físico. `mat-lei-001` exige definição própria se permanecer. Não trocar hash para fazer narrativa coincidir. |
| FINA-02 | ID pedagógico mudou de `aula-ped-017-leitura-clave-sol` na v01 para `cand-004`. | Restaurar ID pedagógico estável; manter cand-004 como candidatoId separado. Validar estabilidade entre versões, vínculo com proposta/módulo/habilidade e referências dependentes. |
| FINA-03 | Sistema móvel 1 contém `Dó Dó Sol Sol | Lá Lá Sol` no cabeçalho: fornece resposta na imagem destinada à leitura limpa. | Remover nomes de notas de ambos os sistemas limpos. Versões anotadas podem mantê-los, claramente separadas. Verificar saída/transferência com todos os recursos vinculados, incluindo texto dentro das imagens, não somente AULA.md. |
| FINA-04 | JSON e Markdown dizem que sucesso em 24–48h prova retenção em memória de longo prazo. | Dizer “a tarefa foi recuperada com sucesso nesta revisão; seguir com nova prática e revisões ajustáveis”. Não inferir domínio/armazenamento definitivo. No alvo, a pergunta sobre Hz não mede leitura elementar: remover frequência como critério obrigatório ou movê-la ao anexo técnico. |
| FINA-05 | Relatório diz que imagem de 800 px reduz apenas 14% em área de 343 px. | Fator correto é 343/800 = 42,9% do tamanho, redução de 57,1%. Uma imagem 1600 px reduz a 21,4% das dimensões de pixels. Corrigir cálculo, informar tamanho final real de notas/texto e anexar simulação em 343 px visualizada; não afirmar conforto a distância sem teste correspondente. |
| FINA-06 | “Concordância bidirecional” verifica presença de seções/strings, não identidade do conteúdo. Testes negativos usam objetos/textos artificiais e funções separadas do validador real. | Definir JSON canônico e gerar Markdown de seu conteúdo (preferido), ou comparar todos os campos de conteúdo relevantes. Testes negativos devem chamar a mesma função de validação usada na entrega oficial com cópia alterada: hash errado, ID alterado, resposta em recurso de saída, texto divergente, início/duração incorretos e link quebrado. Mostrar erro esperado, sem escrever em artefatos oficiais. |

O verificador de 14 chaves não equivale a validação formal de schema completo. A pendência de motor compatível permanece antes da aprovação técnica para integração; não adiá-la automaticamente à Etapa 3 como se a dependência tivesse sido aprovada. Pode fechar o conteúdo antes disso, com limite explícito.

## Encaminhamento

Entregar v03-aula-completa/cand-004, respondendo FINA-01 a FINA-06 em uma rodada. Preservar clave corrigida, música e referências sonoras. Não refazer currículo ou inventário. Conteúdo será aprovado quando proveniência/IDs, avaliação limpa e alegações de retenção estiverem corrigidos e a concordância puder ser conferida; integração requer também validação técnica adequada.
