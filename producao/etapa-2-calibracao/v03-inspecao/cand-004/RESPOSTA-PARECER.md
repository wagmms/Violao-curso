# Resposta Ponto a Ponto ao Parecer Codex: cand-004 (v03-inspecao)

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex  
**Referência:** `producao/etapa-2-calibracao/REVISAO-CODEX-cand004-v02.md`

---

### Resposta a C4-01 — Vínculo Curricular Incorreto
- **Diagnóstico do Apontamento:** Na entrega v02, o candidato foi equivocadamente associado a `aula-prop-014` / `mod-ped-06` / `hab-not-001`. Conforme demonstrado pelo Codex, a Etapa 1 v03 contém os seguintes IDs canônicos:
  - `aula-prop-017` ("Iniciação à Clave de Sol: As Sete Partituras Fáceis")
  - Módulo `mod-ped-05` ("05. Leitura Musical Integrada: Cifra, Tablatura e Partitura")
  - Habilidade `hab-lei-003` ("Leitura de Partitura Musical: Clave de Sol na 1ª Posição")
- **Correção Efetuada com Localização e Prova:**
  - Todos os artefatos (`DOSSIE-FONTES.md`, `REVISAO-MUSICAL.md`, `RECURSOS.json`, `PLANO-AULA.md`, `EVENTOS.json`, `MANIFESTO.json`) foram retificados para os IDs canônicos `aula-prop-017`, `mod-ped-05` e `hab-lei-003`.
  - Foi criado o script de teste automatizado `validar-cand004.cjs` que lê `producao/etapa-1-curriculo/v03/AULAS-PROPOSTAS.json`, `MAPA-HABILIDADES.json` e `MATRIZ-FONTE-AULA.csv`, comprovando programaticamente o vínculo exato da fonte `aula-kaiser-124-3-partituras-faceis-para-iniciantes` com a aula proposta `aula-prop-017` e a habilidade `hab-lei-003`.

---

### Resposta a C4-02 — Barras de Compasso e Durações não Correspondem à Fonte
- **Diagnóstico do Apontamento:** O PDF original (`arq-0408.png`) apresenta grupos de notas delimitados por barras com início incompleto (Grupo 1 possui apenas 2 semínimas em Dó = 2 tempos). Dizer na v02 que os "compassos 1–4 foram copiados do PDF" foi factualmente incorreto, pois os 4 primeiros grupos da fonte possuem 13 eventos e 14 tempos, enquanto a frase proposta possui 14 eventos e 16 tempos.
- **Correção Efetuada com Localização e Prova:**
  - **Fidelidade Factual à Fonte:** No `DOSSIE-FONTES.md` (seção 2.A) e em `EVIDENCIAS.csv` (linhas `evid-cand004-mus-src-01` a `05`), os grupos da fonte original foram descritos exatamente como observados na imagem, mantendo a dúvida sobre a causa do início incompleto (intenção de anacruse vs diagramação editorial) como desconhecida, sem preencher pausas invisíveis nem culpar o autor.
  - **Identificação da Adaptação:** A frase `Dó Dó Sol Sol | Lá Lá Sol(2) | Fá Fá Mi Mi | Ré Ré Dó(2)` foi formalmente classificada como **adaptação autoral para leitura em quatro compassos regulares de 4/4**.
  - **Publicação de Pauta Própria:** Foram gerados e entregues recursos de pauta próprios para a adaptação (`pauta-adaptada.png`, `pauta-adaptada.pdf`, `pauta-adaptada.svg`, `pauta-adaptada.musicxml` e `pauta-adaptada.ly`), identificados separadamente da imagem original da fonte (`arq-0408.png`).
  - **Tabela de Eventos:** O arquivo `EVENTOS.json` aponta como recurso visual para a pauta autoral adaptada (`rec-cand004-pauta-autoral`), com 14 eventos que somam exatamente 16 tempos em 4 compassos isócronos de 4/4.

---

### Resposta a C4-03 — Critério e Contagem da Mínima
- **Diagnóstico do Apontamento:** A frase anterior "sem cortar o som no tempo 1 do compasso seguinte" sugeria prolongamento indevido além da duração. O uso de "3-e-4" introduzia subdivisão antes do tempo e a instrução "desligar o violão" era inapropriada.
- **Correção Efetuada com Localização e Prova:**
  - No `PLANO-AULA.md` (seção 3, Passo 1 e Passo 2) e em `REVISAO-MUSICAL.md` (seção 3):
    1. A contagem fundamental estabelecida é estritamente **"1, 2, 3, 4"**.
    2. A mínima atacada no tempo 3 é sustentada durante os tempos 3 e 4 e cessa precisamente no início do tempo 1 do compasso seguinte, quando a próxima nota é atacada.
    3. Foi incluída a explicação sobre como encerrar notas (abafamento manual da mão direita ou relaxamento da pressão da mão esquerda) para evitar sobreposição involuntária de sons ao trocar de corda (ex: transição da corda 3 para a corda 4 entre os compassos 2 e 3).
    4. A instrução foi retificada para: "coloque o instrumento de lado sobre o colo ou suporte e realize a contagem e marcação de pulso".

---

### Resposta a C4-04 — Diagnóstico Separado e Critério de Saída
- **Diagnóstico do Apontamento:** Não saber o nome das cordas não equivale a instrumento desafinado. Faltava verificar Fá e Mi na 4ª corda, que são necessários na melodia, e o critério de saída precisava contemplar alturas corretas e andamento de calibração flexibilizado para preparação.
- **Correção Efetuada com Localização e Prova:**
  - No `PLANO-AULA.md` (seção 2), o diagnóstico foi dividido em 4 etapas independentes:
    - **D1 (Identificação):** Nomes das cordas 5ª (Lá), 4ª (Ré) e 3ª (Sol).
    - **D2 (Afinação):** Checagem com afinador eletrônico.
    - **D3 (Som Limpo nas 6 Notas):** Verificação física das 6 notas da partitura, testando expressamente Mi (4ª corda c.2) e Fá (4ª corda c.3).
    - **D4 (Leitura Rítmica):** Diferenciação conceitual e prática entre semínima (1 tempo) e mínima (2 tempos).
  - No `PLANO-AULA.md` (seção 4), o critério de saída foi estruturado como rubrica multidimensional que avalia **alturas corretas (14/14)**, ritmo/durações corretas e continuidade métrica. O andamento de **60 BPM** é mantido como alvo proposto da calibração, com preparação autorizada em andamento confortável (45 a 48 BPM).

---

### Resposta a C4-05 — Escopo de Recursos e Evidência Física
- **Diagnóstico do Apontamento:** Termos como "confiança absoluta" ou inferir integridade de PDF apenas por hash são metodologicamente incorretos. A aula completa não exige widget interativo novo; pauta estática legível, metrônomo e áudio de referência autoral rotulado bastam.
- **Correção Efetuada com Localização e Prova:**
  - No `EVIDENCIAS.csv` e `RECURSOS.json`, eliminou-se o termo "confiança absoluta". O registro físico declara: "Hash SHA-256 e tamanho de 51.500 bytes conferidos no disco local em 14/09/2026 via rotina fs.statSync e crypto.createHash".
  - A partitura autoral adaptada foi entregue em formatos estáticos de alta resolução (`pauta-adaptada.png`, `pauta-adaptada.pdf`) e formatos editáveis (`pauta-adaptada.svg`, `pauta-adaptada.musicxml`, `pauta-adaptada.ly`).
  - Foi gerada uma faixa de áudio de síntese senoidal (`referencia-audio-sintese.wav`, 16.0s a 60 BPM) rotulada explicitamente como **referência métrico-frequencial sintetizada**, e não demonstração humana.
  - Nenhuma modificação foi feita em `app/` ou no acervo original.
