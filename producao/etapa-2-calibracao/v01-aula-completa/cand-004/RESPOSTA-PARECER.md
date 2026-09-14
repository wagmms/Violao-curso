# Resposta Detalhada aos Cinco Ajustes Obrigatórios do Parecer Codex v03

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex  
**Referência:** `producao/etapa-2-calibracao/REVISAO-CODEX-cand004-v03.md`

---

### Ajuste 1: Pauta Limpa, Ajuste Visual da Clave e Formatação Mobile
- **Apontamento do Codex:** Gerar versão de estudo sem legendas de notas/dedos para a saída de leitura; manter versão anotada como ajuda/gabarito; ajustar o alinhamento da espiral da Clave de Sol na 2ª linha; separar rótulos encostados e prever formatação legível para celular.
- **Implementação e Prova:**
  - Foi gerada a **[Pauta Limpa de Estudo](recursos/pauta-limpa.png)** e seu código vetorial **[pauta-limpa.svg](recursos/pauta-limpa.svg)**, completamente isentos de legendas ou respostas, utilizada formalmente nas seções 7 e 10 de `AULA.md` como recurso de avaliação.
  - A **[Pauta Anotada](recursos/pauta-anotada.png)** foi mantida com espaçamento ampliado (sem colisões de texto) estritamente como material de apoio/gabarito.
  - O desenho da Clave de Sol foi corrigido programaticamente para que a espiral central envolva exatamente a 2ª linha da pauta (Sol).
  - Foi gerada a **[Pauta Otimizada para Celular](recursos/pauta-celular.png)**, formatada verticalmente em 2 sistemas (c.1-2 e c.3-4) com notas aumentadas, garantindo legibilidade perfeita em smartphones.

---

### Ajuste 2: Encerramento de Notas, Amortecimento Simples e Conforto Físico
- **Apontamento do Codex:** Ensinar gesto concreto e simples de amortecimento sem impor precisão temporal idealizada como pré-requisito oculto. Não atribuir som ruim automaticamente à curvatura do dedo: verificar proximidade do traste, ponto de contato e pressão mínima, tratando desconforto como sinal para interromper/relaxar.
- **Implementação e Prova:**
  - Em `AULA.md` (seções 3.D3, 6.Etapa 2 e 8.Erro 3), ensina-se o gesto simples e concreto de amortecimento: ao pinçar a 4ª corda no compasso 3, encostar suavemente a lateral da mão direita na 3ª corda para silenciá-la, sem exigência de precisão milimétrica inalcançável para iniciantes.
  - Na seção 3.D3 e 8.Erro 4, o diagnóstico de som limpo orienta explicitamente checar a colocação logo atrás do traste e o uso de pressão mínima necessária, com o aviso claro: *"Não aperte com força excessiva! Se sentir cansaço ou tensão, solte o braço ao lado do corpo, balance a mão e descanse"*.

---

### Ajuste 3: Leitura versus Memória (Mecanismos Anti-Memória e Transferência)
- **Apontamento do Codex:** Como a melodia é familiar, o estudante pode tocar puramente de memória. A saída deve pedir identificação de elementos na pauta e entrada em ponto indicado; a transferência deve usar trecho autoral novo nas mesmas seis notas sem respostas impressas.
- **Implementação e Prova:**
  - Em `AULA.md` (seção 10), o Teste 1 exige a identificação prévia de 3 notas específicas diretamente na pauta limpa, e o Teste 2 exige a **entrada direta no Compasso 3**, quebrando a reprodução puramente memorizada do início.
  - Na seção 12 e no diretório `recursos/tarefa-transferencia/`, foi entregue uma frase autoral inédita (`Mi Fá Sol Mi | Ré Ré Dó`) com **[Pauta Limpa Inédita](recursos/tarefa-transferencia/transferencia-pauta-limpa.png)**, mantendo o **[Gabarito](recursos/tarefa-transferencia/transferencia-gabarito.md)** e o **[Áudio](recursos/tarefa-transferencia/transferencia-audio-sintese.wav)** estritamente separados da tentativa inicial do aluno.

---

### Ajuste 4: Rubrica Multidimensional e Registro de Prática
- **Apontamento do Codex:** 14/14 e 60 BPM são metas deste exercício, não medidas universais de domínio definitivo. Descrever como o aluno compara resultados e registra tentativa/dificuldade. A continuidade deve considerar todas as transições entre compassos.
- **Implementação e Prova:**
  - Em `AULA.md` (seção 10, Teste 3), a rubrica explicita que o sucesso na tarefa é um marco local e cumulativo, não um atestado de domínio universal do instrumento.
  - A avaliação de continuidade abrange explicitamente todas as três passagens (`c.1->c.2`, `c.2->c.3` e `c.3->c.4`).
  - Na seção 13, foi fornecida a **Ficha de Registro de Prática** para diário de bordo do aluno, registrando tentativa, andamento atingido, maior desafio, compasso crítico e próxima ação.

---

### Ajuste 5: Validação Automatizada com Parser CSV Real e Declaração de Limites
- **Apontamento do Codex:** O validador deve verificar a relação da matriz por parser CSV real na mesma linha, conferir inícios/durações e formatos entregues, e registrar a pendência do motor formal de schema sem declarar conformidade integral antecipada.
- **Implementação e Prova:**
  - Foi criado o script **[validar-aula.cjs](validar-aula.cjs)** utilizando parser CSV de linha inteira com divisão por vírgulas, comprovando que a linha exata de `aula-kaiser-124...` mapeia para `aula-prop-017` e `hab-lei-003` na mesma linha.
  - O script confere as coordenadas temporais de início e duração de todos os eventos da adaptação e da transferência.
  - Em `PENDENCIAS.md`, declara-se honestamente que o motor formal de validação de schemas em lote permanece como dependência técnica para a etapa de integração, sem falsa alegação de homologação integral.
