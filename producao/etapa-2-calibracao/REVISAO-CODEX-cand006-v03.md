# Parecer Codex — cand-006 v03-inspecao

Data: 14/09/2026. **Corrigir e reenviar em entrega localizada. Aula completa ainda não liberada.**

## Avanços conferidos

Fonte real arq-0460 recalculada em leitura: 128.104 bytes, SHA-256 `8a6ab1739f7eec07f758aec998244e82d891b280ba43bf87b003e78328252b32`. Compasso 3/8, baixo pontuado e separação de evidências corrigidos. Vídeo explicitamente não observado. Plano específico de solo e status aguardando_revisao presentes.

Lidos eventos, recursos, dossiê, plano, revisões, evidências, pendências e código do validador. Observadas página 1 renderizada, recorte c.4 e partitura gerada. Executados validadores cand-006 (82 checks/zero erros, cinco negativos anunciados) e cand-004 preservado (zero erros). Este resultado não comprova preservação retrospectiva integral nem correção de todos os dados musicais.

Conferência separada em `revisao-codex/auditar-cand006-v03.cjs`, evidências em `EVIDENCIAS-cand006-v03.json`. Header PCM do WAV é mono, 44,1 kHz, 16 bits, 6 segundos. Não houve escuta humana nem análise espectral nesta rodada; tamanho/duração não comprovam alturas ou sustentação correta no áudio.

## Correções localizadas obrigatórias

### C6-01 — divergência pauta/tablatura no compasso 4

No recorte da fonte, as cabeças do c.4 estão sobre a quarta, terceira e segunda linhas da clave de Sol: **D5, B4, G4 escritos**. A tablatura mostra **1ª corda casa 3, 1ª corda solta, 3ª corda solta**, implicando **G5, E5, G4 escritos** pela convenção de oitava do violão. A entrega adota a tablatura, mas afirma que essa mesma sequência foi observada na pauta. Isso não confere com a imagem examinada.

Registrar as duas leituras lado a lado e preservar a causa desconhecida. Não afirmar erro editorial ou de renderização sem evidência. Pode manter G–E–G como decisão autoral **baseada na tablatura**, com registro explícito, ou delimitar o exercício aos c.1–3 e deixar c.4 pendente. Se usar outra renderização do PDF para investigar, declarar ferramenta, página e resultado; nunca modificar o original.

Atualizar dossiê, evid-mus-007, eventos, revisão, plano e recurso próprio para que atribuição e escolha coincidam. O áudio deverá representar a escolha declarada, sem alegar transcrição literal de toda a fonte.

### C6-02 — partitura própria sem referência notacional

PNG gerado não exibe **clave nem fórmula 3/8**. Um título contendo “3/8” não substitui a fórmula na pauta. Entregar clave corretamente posicionada, fórmula, números de compassos e legenda clara de vozes. Pausas adicionadas para completar o modelo de duas vozes são decisões analíticas/autorais; não afirmá-las como símbolos impressos onde a fonte não os mostra. No c.4, ausência de ataque de bordão não comprova uma pausa explicitamente notada.

Conferir visualmente PNG e SVG e comparar alturas com EVENTOS.json. Cores podem apoiar a análise, mas não devem ser a única forma de distinguir as vozes.

### C6-03 — negativos e validação temporal incompletos

O teste negativo 4 altera o caminho declarado, mas ignora o resultado dessa instância e testa outro diretório inexistente. Rejeição de diretório vazio não demonstra rejeição do link alterado. O validador usa lista fixa de arquivos, não os caminhos declarados.

A conferência separada comprovou que a mesma função aceita indevidamente: **link declarado inexistente, início absoluto alterado e corda incompatível com a altura**. Somar três colcheias não garante ocupação correta do compasso nem ausência de sobreposição/lacuna na mesma voz.

Validar caminhos declarados; início/fim absoluto e local por compasso/voz; duração em segundos; alinhamento simultâneo de bicordes; nota/MIDI/frequência nominal/corda/casa coerentes. Testar início, duração, corda e link modificados na mesma função usada oficialmente, preferencialmente com cópias físicas. Cada teste deve exigir erro correspondente, sem trocar a falha por arquivo ou diretório vazio. Conferir vínculos também em AULAS-PROPOSTAS/MAPA-HABILIDADES, incluindo módulo e secundária, além da matriz.

### C6-04 — entrada, saída e recuperação proporcional ao objetivo

O diagnóstico exige 120 BPM de colcheia, acima dos 90 usados na preparação e aceitos na saída. Fazer diagnóstico de capacidades separadas com andamento inicial ajustável; 120 é referência autoral, não pré-requisito obrigatório ou prova de domínio. Formular a saída como evidência daquela tentativa, não aquisição definitiva de hab-sol-001.

Remover a distância fixa de afastamento do polegar (1–2 cm) como prescrição. Pedir afastamento suficiente para não reencostar na corda, sem tensão, observar/escutar a cauda do baixo e interromper se houver desconforto. Sensação de vibração do tampo não isola nem comprova duração do baixo. Hipótese de ancoragem deve ser verificada junto de outras causas, como liberação do dedo da mão esquerda.

## Encaminhamento

Não refazer inventário, arquitetura ou cand-004. Manter avanços e música dos c.1–3. Entregar cand-006 v04-inspecao com C6-01 a C6-04; próximo briefing em `producao/BRIEF-CAND006-v04.md`. Após conferência desses itens, decidir liberação individual para Etapa 2B. Validação formal de schemas continua pendente antes de integração; nenhuma integração autorizada agora.
