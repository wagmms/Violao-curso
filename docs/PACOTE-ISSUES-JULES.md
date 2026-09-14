# Pacote de Issues Autônomas para o Jules (GitHub)

Este arquivo contém o conjunto completo de **8 issues projetadas para o Jules trabalhar em segundo plano no repositório wagmms/Violao-curso**.

Cada issue foi desenhada para ser **independente**, evitando conflitos de mesclagem e respeitando rigorosamente a arquitetura offline (`file://`).

---

## 📋 Lista de Tarefas Prontas para o Jules

| # | Título da Issue | Área de Impacto | Arquivos Alvo |
|---|---|---|---|
| **1** | `feat(audio): implementar afinador cromático por microfone via Web Audio` | Prática & Áudio | `app/audio-motor.js`, `app/views.js`, `app/estilo.css` |
| **2** | `feat(ux): adicionar atalhos de teclado ergonômicos para estudo com violão no colo` | Usabilidade & Ergonomia | `app/app.js`, `app/views.js` |
| **3** | `feat(storage): exportar e importar arquivo de backup JSON com 1 clique` | Persistência & Dados | `app/storage.js`, `app/views.js` |
| **4** | `feat(audio): player de levadas e ritmos da MPB em loop (Bossa, Samba e Baião)` | Rítmica & Acompanhamento | `app/audio-motor.js`, `app/views.js` |
| **5** | `feat(ui): implementar Modo Estante de Partitura em tela cheia com alta legibilidade` | Interface & Visibilidade | `app/views.js`, `app/estilo.css` |
| **6** | `feat(didatica): homologar e estruturar completamente as atividades 7 a 11` | Conteúdo Pedagógico | `app/dados-atividades.js`, `app/ferramentas/validar-piloto.cjs` |
| **7** | `feat(harmonia): expandir biblioteca de acordes da Bossa Nova no Laboratório Harmônico` | Harmonia Aplicada | `app/views.js` |
| **8** | `feat(estudo): caderno de anotações técnicas do aluno por atividade` | Recursos de Estudo | `app/storage.js`, `app/views.js` |

---

## 📦 Detalhamento das Issues (Copiar e Colar no GitHub)

### Issue 1: Afinador Cromático por Microfone
**Título:**
```text
feat(audio): implementar afinador cromático por microfone via Web Audio
```
**Descrição:**
```markdown
### Contexto
O aplicativo possui o botão "Afinador E2" na barra de status inferior da sidebar (derivado do design do Stitch), mas ele ainda não realiza a leitura sonora do instrumento. O aluno precisa poder conferir a afinação das 6 cordas de nylon antes de iniciar seus 40 minutos de estudo.

### Objetivo
Implementar um afinador cromático leve, 100% offline e reativo usando a Web Audio API nativa:
1. Ao clicar no botão de afinador na barra lateral (ou em um botão na tela Aprender/Praticar), abrir um modal/painel com o afinador.
2. Solicitar permissão de microfone (`navigator.mediaDevices.getUserMedia({ audio: true })`).
3. Conectar a entrada a um `AnalyserNode` e implementar um detector de frequência fundamental baseado em autocorrelação no domínio do tempo (time-domain autocorrelation).
4. Exibir:
   - Nome da nota mais próxima afinada (E2, A2, D3, G3, B3, E4 ou qualquer nota cromática).
   - Frequência detectada em Hertz (ex: 82.4 Hz).
   - Marcador visual de ponteiro / régua de centésimos de tom (-50 a +50 cents).
   - Indicador visual verde luminoso quando a nota estiver afinada dentro de ±3 cents.
5. Botão explícito de "Desligar Microfone" que fecha todos os tracks de áudio ao sair para economizar bateria e garantir privacidade.

### Regras Inegociáveis
- 100% JavaScript nativo, sem bibliotecas externas ou CDNs.
- Funcionamento estrito via `file://`.
- Tratamento gracioso de erro quando o microfone for negado ou indisponível.
```

---

### Issue 2: Atalhos de Teclado Ergonômicos
**Título:**
```text
feat(ux): adicionar atalhos de teclado ergonômicos para estudo com violão no colo
```
**Descrição:**
```markdown
### Contexto
Durante a sessão de 40 minutos, o estudante está com o violão no colo e as duas mãos ocupadas. Ter que pegar no mouse para pausar o timer, mudar de bloco ou trocar de nível quebra a imersão do estudo.

### Objetivo
Adicionar escuta global de teclado em `app/app.js` (desativada quando o foco estiver em `<input>`, `<textarea>` ou campos editáveis):
1. **Barra de Espaço**: Pausar / Retomar o timer da sessão e o metrônomo simultaneamente.
2. **Seta para a Direita / Tecla 'N'**: Avançar para o próximo bloco/passo da sessão.
3. **Seta para a Esquerda / Tecla 'P'**: Retornar para o bloco anterior.
4. **Teclas 1, 2 e 3**: Alternar instantaneamente entre os níveis [1] Preparação, [2] Alvo e [3] Variação na tela Aprender.
5. **Teclas 4 e 5**: No modal de resultado do passo, registrar rapidamente 'Consegui' (4) ou 'Repetir' (5).
6. **Feedback Visual**: Exibir um pequeno toast ou badge discreto na tela indicando a ação disparada pelo atalho (ex: "Timer pausado [Espaço]").

### Regras Inegociáveis
- Não usar jQuery ou bibliotecas de atalhos.
- Garantir `e.preventDefault()` apenas nas teclas mapeadas quando ativas para não bloquear a rolagem natural da página.
```

---

### Issue 3: Backup & Exportação/Importação em 1 Clique
**Título:**
```text
feat(storage): exportar e importar arquivo de backup JSON com 1 clique
```
**Descrição:**
```markdown
### Contexto
O histórico de tentativas, revisões espaçadas (SRS) e trechos críticos fica salvo no `localStorage` sob a chave `metodo_triade_v2`. Se o aluno limpar os dados do navegador ou quiser sincronizar o progresso entre o computador e o celular, precisa de um arquivo de backup confiável.

### Objetivo
Na tela **Progresso** (e no menu de configurações), adicionar uma seção "Segurança & Dados":
1. **Botão "Exportar Backup Completo"**:
   - Serializa o estado atual com a função `serializarEstado()`.
   - Dispara o download automático no navegador de um arquivo chamado `metodo-triade-backup-YYYY-MM-DD.json`.
2. **Botão "Importar Backup"**:
   - Abre o seletor de arquivos do sistema (`<input type="file" accept=".json">`).
   - Lê o conteúdo do arquivo via `FileReader`.
   - Valida a integridade dos dados usando a função existente `validarEsquemaBackup(dados)`.
   - Executa a mesclagem idempotente (não duplica tentativas nem revisões que já existam).
   - Recarrega a visualização da tela com mensagem de sucesso.

### Regras Inegociáveis
- 100% executável offline em `file://`.
- Validação profunda contra arquivos corrompidos ou malformados com feedback de erro em caso de falha.
```

---

### Issue 4: Player de Levadas Brasileiras (Bossa, Samba e Baião)
**Título:**
```text
feat(audio): player de levadas e ritmos da MPB em loop (Bossa, Samba e Baião)
```
**Descrição:**
```markdown
### Contexto
O curso é voltado para Violão Solo e MPB em cordas de nylon. Tocar apenas com um clique simples de metrônomo não desenvolve a sensação de balanço, síncope e divisão rítmica da música brasileira.

### Objetivo
Em `app/audio-motor.js` e na Central de Prática (`app/views.js`):
1. Criar um motor de síntese percussiva leve usando a Web Audio API nativa:
   - Som de Tamborim / Estalo agudo (filtro passa-alta + decaimento curto de ruído branco).
   - Som de Surdo / Baixo (onda senoidal curta com queda rápida de pitch).
   - Som de Vassourinha / Chocalho (filtro passa-faixa com envelope suave).
2. Implementar 4 padrões rítmicos em loop com BPM regulável:
   - **Bossa Nova (2/4 sincopado)**: O padrão clássico de João Gilberto (baixo nos tempos e tamborim sincopado).
   - **Samba / Partido Alto**: Divisão em 2/4 com acento característico no contratempo.
   - **Baião / Forró**: Padrão sincopado de zabumba e triângulo em 2/4.
   - **Dedilhado 6/8**: Pulso ternário composto para toadas e baladas de MPB.
3. Adicionar interface de controle com seletor de ritmo, slider de BPM e botão Tocar/Pausar na aba **Praticar**.

### Regras Inegociáveis
- Síntese de áudio 100% matemática em tempo real no Web Audio (sem carregar arquivos MP3 ou WAV externos pesados).
- Sem drift de tempo (usar o Lookahead Scheduler já existente em `audio-motor.js`).
```

---

### Issue 5: Modo Estante de Partitura em Tela Cheia
**Título:**
```text
feat(ui): implementar Modo Estante de Partitura em tela cheia com alta legibilidade
```
**Descrição:**
```markdown
### Contexto
Quando o estudante coloca o laptop ou tablet sobre uma estante de partitura a 1,5 ou 2 metros de distância, as fontes pequenas e a barra lateral de navegação ocupam espaço desnecessário e dificultam a leitura da tablatura e das posições de acordes.

### Objetivo
1. Adicionar um botão no cabeçalho superior: **"Modo Estante"** (ou atalho tecla 'F').
2. Ao ativar o modo:
   - Ocultar a barra lateral (sidebar) e cabeçalhos secundários.
   - Expandir a área do exercício para 100% da largura.
   - Aumentar proporcionalmente o tamanho da tablatura, o diagrama do braço SVG e o timer dos 40 minutos em fontes monoespaçadas de alto contraste.
   - Solicitar tela cheia via API nativa (`document.documentElement.requestFullscreen()`), com fallback caso negado.
3. Botão visível ou tecla 'Esc' para retornar ao layout normal instantaneamente.

### Regras Inegociáveis
- CSS nativo e reponsivo com classes utilitárias em `app/estilo.css`.
- Preservar compatibilidade com monitores desktop e tablets.
```

---

### Issue 6: Homologação Completa das Atividades 7 a 11
**Título:**
```text
feat(didatica): homologar e estruturar completamente as atividades 7 a 11
```
**Descrição:**
```markdown
### Contexto
No arquivo `app/dados-atividades.js`, as atividades de ID `ativ-7` a `ativ-11` foram cadastradas como rascunhos (`emElaboracao: true`) e estão temporariamente fora das sessões disponíveis, gerando avisos no script `validar-piloto.cjs`.

### Objetivo
Estruturar e homologar integralmente os 9 pontos do contrato didático para cada uma das 5 atividades:
1. **ativ-7**: *Bossa Nova Básica: Baixo Antecipado e Acordes em Bloco*
2. **ativ-8**: *Independência Rítmica: Baixo em 2/4 com Melodia Sincopada*
3. **ativ-9**: *Melodia Acompanhada: Composição Original em 2 Vozes*
4. **ativ-10**: *Baixo Caminhante com Melodia Fixa*
5. **ativ-11**: *Voice Leading Básico: Condução de Vozes entre I-IV-V*

Para cada atividade, preencher:
- Três níveis consistentes: `preparacao`, `alvo` e `variacao` com tablaturas completas e BPMs realistas.
- Sessão estruturada de 40 minutos fechando exatamente na soma: `3 + 5 + 7 + 15 + 7 + 3 = 40 min`.
- Lista de `errosComuns` com orientações corretivas mecânicas.
- Remover o flag de rascunho e habilitar para estudo na tela **Praticar**.

### Critérios de Aceite
- Executar `node app/ferramentas/validar-piloto.cjs` e garantir que o validador passe com **0 avisos e 0 erros**.
```

---

### Issue 7: Expansão de Acordes da Bossa Nova no Laboratório
**Título:**
```text
feat(harmonia): expandir biblioteca de acordes da Bossa Nova no Laboratório Harmônico
```
**Descrição:**
```markdown
### Contexto
O Laboratório Harmônico agora suporta posições montadas reais com digitação e áudio. Para cobrir o repertório clássico de Bossa Nova e MPB (Tom Jobim, João Gilberto, Baden Powell, Chico Buarque), precisamos enriquecer o seletor com as tétrades mais emblemáticas do estilo.

### Objetivo
Em `app/views.js` (objeto `LH_PRESETS`), adicionar os seguintes acordes com suas respectivas posições montadas (Posição Aberta, Pestana, Drop 2, etc.):
1. **C6 / C6/9 (Dó com 6ª e 9ª)**: O som de resolução mais sofisticado da bossa nova.
2. **Bm7(b5) (Si Meio-Diminuto)**: O clássico acorde ii do modo menor em cadências ii-V-i.
3. **G7(b13) ou G7(b9) (Sol Dominante Alterado)**: Tensão essencial da MPB para preparação de acordes menores.
4. **A7(#9) (Lá Dominante com 9ª Aumentada)**: O famoso acorde de blues/MPB.
5. **F#m7 (Fá Sustenido Menor com 7ª)**: Acorde muito comum nas tonalidades de Mi maior e Ré maior.

Para cada novo acorde:
- Mapear a fórmula intervalar colorida.
- Definir 3 a 4 posições reais jogáveis no braço com indicação de dedos e cordas abafadas (`X`).
- Garantir que o áudio de arpejo e dedilhado soe com perfeição nas frequências corretas.
```

---

### Issue 8: Caderno de Anotações Pessoais por Atividade
**Título:**
```text
feat(estudo): caderno de anotações técnicas do aluno por atividade
```
**Descrição:**
```markdown
### Contexto
Cada aluno possui gargalos anatômicos ou observações individuais que o professor ou a autoavaliação revelam (ex: "relaxar o polegar esquerdo no compasso 3", "usar unha com ângulo de 45° no dedo indicador"). Hoje não há onde salvar essas notas dentro da sessão.

### Objetivo
1. Na tela **Aprender** (abaixo do roteiro de estudo) e no modal de encerramento da sessão:
   - Adicionar uma caixa de texto retrátil: **"Minhas Anotações de Prática"**.
2. Salvar o texto automaticamente no `state.anotacoes[atividadeId]` (com debounce de 500ms ou evento `blur`).
3. Integrar com o `localStorage` no objeto `metodo_triade_v2`.
4. Exibir um pequeno ícone de lápis/bloco nas atividades que tiverem anotações salvas na tela Praticar e na Biblioteca.

### Regras Inegociáveis
- Sanitizar o texto contra injeção de HTML/XSS usando a função existente `escapeHTML()`.
- Preservar os dados durante a exportação e importação de backups.
```
