# Parecer Codex — Etapa 0 v03 e Etapa 1 v02

Data: 14/09/2026. **Decisão: corrigir e reenviar para fechamento formal. Autorizada a Etapa 2A de inspeção e preparação de evidências. Aulas completas, integração e homologação continuam pendentes.**

O avanço é material: as referências dos seis candidatos foram corrigidas, os destinos editoriais foram modelados, os oito domínios têm habilidades e a navegação livre foi restabelecida. Não é necessário refazer essas partes. Há correções localizadas que podem ocorrer enquanto o produtor inspeciona as fontes.

## O que foi verificado

Revisor executou os dois validadores, leu seu código e fez verificação independente com `node producao/revisar-etapa-1.cjs v02 v03`. Evidências em `EVIDENCIAS-REVISAO-CODEX-v02.json`. Nenhum vídeo reproduzido ou PDF renderizado pelo revisor nesta rodada.

- 2.090 registros físicos, IDs únicos, existência e tamanho conferidos integralmente nesta revisão; referências da base concordam com tabela física. Sete hashes de PDFs Kaiser 124 recalculados e coincidentes. Isso não homologa decodificação ou hashing integral de todo o acervo.
- 29 habilidades, oito domínios efetivos, 33 propostas. Grafos de habilidades e aulas sem ciclos; todas as habilidades existentes aparecem como principais ou secundárias nas propostas. Cobertura dos nós não prova completude de todo o conteúdo dos cursos.
- 631 entradas únicas na matriz. 588 linhas usam destinos editoriais existentes, com aula/habilidade vazias legitimamente. Não são 588 erros referenciais: são conteúdo ainda não transformado em propostas específicas. Nenhuma linha ficou sem aula nem destino modelado; nenhuma habilidade preenchida é inexistente.
- As referências de evidência da matriz agora existem. Existência do registro não comprova a afirmação pedagógica que ele contém.
- Os seis manifestos de candidatos concordam com caminhos, tamanhos e hashes da tabela física e pertencem às entradas originais declaradas. O candidato de leitura tem sete PDFs e descrição, sem vídeo/legenda inventados.
- Os sete testes negativos do produtor passaram e o teste positivo passou. O código melhorou a checagem de relações, mas deixa de testar relações e regras importantes descritas abaixo.
- Navegação livre, ausência de diagnóstico automático e de rebaixamento temporal constam dos documentos revisados.

## Pendências para fechamento

| ID | Prioridade | Local | Correção e critério de resolução |
|---|---|---|---|
| F-01 | Alta | AULAS-PROPOSTAS, fontes de aula-prop-022/023 | IDs `aula-kaiser-2-2-batida-de-choro` e `aula-kaiser-3-1-batida-de-baiao-nivel-1` não existem. Candidatos reais por título: `aula-kaiser-12-2-batida-de-choro` e `aula-kaiser-17-4-batida-de-baiao`. Conferir conteúdo antes de confirmar equivalência. Validar todo fontesCandidatas contra inventário e também fontesCandidatas de habilidades. |
| F-02 | Alta | Matriz versus propostas | Faltam relações declaradas para aula-prop-013 → aula-mod-1-15; aula-prop-024 → aula-kaiser-36-4-aula-da-levada-1-exercicio-2-batida-co; além das duas fontes inexistentes anteriores. Acrescentar relações reais ou retirar propostas não sustentadas, com justificativa. Uma entrada pode ter várias linhas; exatamente 631 linhas não é requisito. |
| F-03 | Alta | Submissão anexada e relatos da etapa 0 | A mensagem anexada continua factualmente errada: arq-0027 é `2. Aula.mp4` de Regra Três, 6.924.525 bytes, cabeçalho MP4 `ftyp`, não descricao.md/PDF; `0. 1` de Kaiser 124 é arq-0408, PDF de 51.500 bytes, não arq-0018/Matroska. Retificar a submissão, sem reinterpretar arquivos para justificar erro narrativo. Gerar resumo da base canônica. Não usar mensagens anexadas como fonte da verdade. |
| F-04 | Alta | validadores e SCHEMAS | `validateSchema` é um verificador parcial próprio: suporta type/enum/pattern/required/properties/minItems/items, mas não resolve `$ref`, condicionais, minLength ou outras regras de Draft 2020-12. Não chamá-lo de implementação integral desse padrão. Usar motor compatível, validar os próprios schemas e instâncias/wrappers; testar strings vazias, condicionais por disciplina, fontes inexistentes e relações ausentes. |
| F-05 | Alta | Schema de aula completa | Exigir autoria/status/proveniência, campos não vazios, critérios de saída, resultado e próxima ação, passos com duração e recursos existentes. Adicionar regras de ouvido com referência sonora/gabarito e de ritmo com contagem/durações/pausas/repetições quando pertinentes. O schema atual não implementa condicionais por disciplina nem comprova essas exigências só por ter campo disciplina. |
| F-06 | Média | Expansão e cobertura | 33 propostas são um núcleo inicial. Manter explícita a fila ampla de expansão, classificando as entradas futuras por tema/unidade candidata à medida que a inspeção avance. Não declarar que 33 aulas esgotam as 631 entradas ou que cobertura de nós equivale a currículo completo. |
| F-07 | Alta na produção | Calibração e inspeção | Fontes permanecem sem observação audiovisual. Gestos, lacunas do original, digitação-pivô, ritmo e áudio não ficam homologados por metadados/legenda. Dedo 1 fixo em A/D depende das digitações escolhidas; não é regra universal. Inspecionar e registrar a variante demonstrada. Thumb Slap é candidato de técnica percussiva, não substitui por si o exemplo de acompanhamento básico da calibração. |

O arquivo exato `descricao.md` de Kaiser 124 é arq-0415: li seus bytes iniciais, que começam com `<p><strong>Agora pratique sua leitura...`, não `%PDF`. A conferência foi registrada na evidência JSON do revisor. Corrigir a narrativa anterior sem afirmar anomalia da plataforma sem evidência.

## Encaminhamento prático

Entregar fechamento documental da etapa 0 em v04 e ajustes da etapa 1 em v03, sem reescrever dados já conferidos. Responder F-01 a F-07. Em paralelo, iniciar a Etapa 2A conforme `producao/BRIEF-ETAPA-2A-INSPECAO.md`: inspeção e dossiês dos seis candidatos, sem publicar aulas.

A aprovação da arquitetura é editorial e provisória; não certificação educacional externa. A Etapa 2B de seis aulas completas será liberada após fechamento dessas referências e demonstração de que os dossiês sustentam objetivos e exercícios. Se uma fonte não puder ser vista/ouvida, registrar bloqueio daquela parte e avançar nas fontes acessíveis.
