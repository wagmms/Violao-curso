# Revisão Codex — cand-004, v02-inspecao

Data: 14/09/2026. **Parecer: corrigir e reenviar, com método parcialmente validado.** Não liberada a aula completa ainda. Correções restantes são localizadas; manter o mapa de alturas/cordas já corrigido.

## Conferência realizada

Li os seis artefatos e voltei a observar a imagem da página 1 do PDF arq-0408. Conferi os vínculos contra AULAS-PROPOSTAS e MAPA-HABILIDADES da etapa 1 v03. A imagem havia sido renderizada pelo revisor com Poppler; a nova revisão visual considera também as barras de compasso, não só alturas.

### Partes aprovadas

- Identidade da fonte: entrada Kaiser 124, arq-0408 e arq-0415, caminho e valores coerentes com a base física anteriormente conferida. Não recalculei os hashes nesta rodada.
- Ausência de vídeo/áudio local declarada; remoção de metadados inventados.
- Mapa escrito C4–A4 para sonoro C3–A3 em convenção de violão transpositor de oitava; cordas/casas e frequências nominais declaradas estão coerentes com essa convenção.
- Executabilidade das notas propostas nas cordas 5, 4 e 3, casas 0–3. A convenção transpositora é adotada editorialmente; o PNG mostra clave de sol sem sinal 8 explícito, portanto não a tratar como detalhe gráfico diretamente observado.
- Separação dos tipos de evidência e melhora da especificidade da prática e recuperação.
- A sequência de 14 eventos proposta soma 16 semínimas: quatro compassos válidos **na proposta reconstruída**. A aritmética correta não comprova que as barras/durações foram copiadas da fonte.

## Correções restantes

### C4-01 — vínculo curricular incorreto

A etapa 1 v03 contém:

- `aula-prop-017`: Iniciação à Clave de Sol: As Sete Partituras Fáceis.
- Módulo `mod-ped-05`.
- Habilidade `hab-lei-003`.

`aula-prop-014` é Percepção de Tríades Maiores e Menores, no módulo 04. `hab-not-001` não existe nessa versão. Corrigir dossiê, plano, resposta e manifesto; incluir checagem automática desses vínculos. Não renumerar o currículo para acomodar o dossiê.

### C4-02 — barras de compasso e durações não correspondem à fonte

A imagem mostra os seguintes **grupos delimitados por barras**, contando o grupo inicial como primeiro para localizar a fonte, sem afirmar regularidade métrica:

| Grupo na fonte | Eventos escritos | Soma em tempos de semínima |
|---|---|---:|
| 1 | Dó semínima, Dó semínima | 2 |
| 2 | Sol semínima, Sol semínima, Lá semínima, Lá semínima | 4 |
| 3 | Sol mínima, Fá semínima, Fá semínima | 4 |
| 4 | Mi semínima, Mi semínima, Ré semínima, Ré semínima | 4 |
| 5 | Dó mínima, Sol semínima, Sol semínima | 4 |

O dossiê reorganiza o início como `Dó Dó Sol Sol | Lá Lá Sol(2) | Fá Fá Mi Mi | Ré Ré Dó(2)`. É uma frase didaticamente possível em quatro compassos, **mas é uma reescrita das barras/durações**, não os compassos 1–4 observados no PDF. Os quatro primeiros grupos da fonte contêm 13 eventos e 14 tempos, não 14 eventos e 16 tempos.

O grupo inicial incompleto pode ser intenção de anacruse ou problema editorial; não há evidência suficiente nesta inspeção para decidir a causa. Preservar essa dúvida. Não preencher pausas invisíveis nem atribuir erro ao autor como fato comprovado.

**Decisão editorial recomendada:** manter a frase regularizada de quatro compassos como **adaptação autoral para leitura inicial**, publicar uma pauta própria coerente com os 14 eventos e usar a imagem original apenas como referência de origem/comparação. Explicitar a regularização, sem afirmar transcrição literal. Alternativa: seguir as barras da fonte, ensinando o início incompleto com justificativa e contagem própria, o que aumenta a complexidade para esta calibração.

Corrigir evidências musicais: o que o PNG mostra fica separado do que o produtor decidiu adaptar. A tabela de eventos da adaptação aponta para recurso autoral, não falsamente para o compasso correspondente do PDF.

### C4-03 — critério e contagem da mínima

Uma mínima iniciada no tempo 3 dura os tempos 3 e 4 e cede lugar ao próximo evento no tempo 1 seguinte. A frase “sem cortar o som no tempo 1 do compasso seguinte” sugere sustentação além da duração e deve ser corrigida.

Usar contagem “1, 2, 3, 4”; atacar a mínima em 3, manter em 4, atacar a próxima nota no 1 seguinte. Não usar “3-e-4” sem ensinar que “e” representa subdivisão, nem mandar “desligar o violão”. Dizer “deixe o instrumento de lado e conte/bata o pulso”. Distinguir ritmo de ataques e sustentação sonora; indicar como encerrar notas para evitar sobreposição involuntária.

### C4-04 — diagnóstico e critério de saída

Não saber o nome das cordas não equivale a instrumento desafinado. Diagnóstico deve separar identificação, afinação e execução. Verificar também Fá/Mi na quarta corda, pois são exigidos na tarefa, e compreensão de semínima/mínima com resposta esperada.

Critério de saída inclui **alturas corretas**, ritmo, duração e continuidade. 60 BPM é alvo proposto de calibração; oferecer andamento confortável como preparação, sem interpretar todo fracasso como problema de ritmo.

### C4-05 — escopo de recursos e evidência física

Trocar “PDF íntegro”/confiança “absoluta” por “hash/tamanho conferidos” com método/data. Separar arquivo existente, inspeção de página e validação pedagógica.

A aula completa não exige construir widget interativo novo: pauta estática legível, metrônomo existente e referência de áudio autoral corretamente rotulada podem bastar. Produzir primeiro conteúdo revisável fora de app/. Schema/motor continuam dependência de validação antes da integração.

## Próximo passo

Entregar `v03-inspecao/cand-004/` preservando v02. Acrescentar recurso de pauta autoral regularizada, `EVENTOS.json`, resposta C4-01 a C4-05 e verificações de vínculos/altura/duração. Renderizar a pauta e conferi-la visualmente. Após aprovação desse candidato, liberar sua aula completa em 2B e usar o método nos outros dossiês.
