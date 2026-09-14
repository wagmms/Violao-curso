# Guia de Design System e Prompts para o Google Stitch

Este guia fornece as diretrizes estéticas, design tokens e **prompts prontos para copiar e colar no Google Stitch** para desenhar o ambiente de aprendizagem de violão (`app/`).

---

## 1. Identidade Visual: Conceito "Studio Acústico"

O ambiente deve transmitir a sensação de um estúdio musical profissional para violão de nylon e MPB: sofisticado, focado, sem distrações e com alto contraste para permitir a leitura de partituras e tablaturas a 1 metro de distância (com o instrumento no colo).

### Design Tokens (Cores e Tipografia)

```css
:root {
  /* Cores Principais - Tema Studio Acústico */
  --bg-app: #121110;             /* Grafite profundo com leve calor */
  --bg-surface: #1c1a18;         /* Superfície de cards e painéis */
  --bg-surface-elevated: #262320;/* Menus, modais e elementos destacados */
  --border-subtle: #38332e;      /* Linhas sutis de divisão */
  --border-focus: #e59850;       /* Foco em dourado/âmbar quente */

  /* Tipografia & Contraste */
  --text-main: #f5f2eb;          /* Branco marfim (legibilidade máxima, sem fadiga) */
  --text-muted: #a69e94;         /* Cinza quente para legendas e instruções secundárias */
  --text-inverse: #121110;

  /* Destaques e Estados Musicais */
  --accent-nylon: #d97736;       /* Âmbar clássico (remete ao tampo de cedro/nylon) */
  --accent-hover: #eb8b4a;
  --accent-glow: rgba(217, 119, 54, 0.2);
  --success: #38a169;            /* Conclusão de ciclo / acerto */
  --warning: #d69e2e;            /* Dificuldade / repetição recomendada */
  --danger: #e53e3e;             /* Erro crítico ou desconforto físico */

  /* Tipografia */
  --font-ui: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-music: "JetBrains Mono", "Fira Code", monospace; /* Para cifras, tablaturas e contagem */
}
```

---

## 2. Prompts Prontos para Usar no Google Stitch

Copie os prompts abaixo diretamente no **Google Stitch** para gerar as telas e componentes:

### Prompt 1: Tela Principal — "Hoje" (Dashboard da Sessão Diária)

```text
Crie a interface de uma tela de início (Dashboard) para um aplicativo desktop e mobile de estudo de violão clássico/MPB chamado "Método Tríade - Ambiente de Estudo".
Estilo visual: Tema escuro refinado "Studio Acústico" (fundo grafite quente #121110, cards #1c1a18, acentos em âmbar madeira #d97736, texto marfim #f5f2eb).

A tela deve conter:
1. Cabeçalho compacto: Logo minimalista com silhueta de violão/cordas, título "Minha Prática", indicador de data, status de sequência diária (fogo/streak) e botão discreto de alternar tema.
2. Card Hero Principal (Destaque Central):
   - Título da lição do dia (ex: "Módulo 3: Independência de Polegar e Dedilhado P-I-M-A").
   - Tag de justificativa pedagógica transparente: "Sugerido porque você concluiu o aquecimento básico há 2 dias".
   - Badge com a duração fixa da sessão: "Sessão de 40 minutos (6 blocos guiados)".
   - Botão de ação proeminente em âmbar: "Iniciar meus 40 minutos" com ícone de play.
   - Lista resumida dos 6 blocos (3m Preparação, 5m Recuperação, 7m Demonstração, 15m Prática, 7m Aplicação, 3m Registro).
3. Linha secundária de cards rápidos:
   - Card "Caderno de Dificuldades": mostra 1 trecho pendente de superação com botão "Praticar 5 min".
   - Card "Revisão Espaçada": alerta "1 revisão para hoje (Garota de Ipanema - Compasso 5-8)".
   - Card "Estudo Livre / Biblioteca": link para o catálogo com 300 aulas do curso.
4. Navegação: Barra lateral elegante para desktop com ícones (Hoje, Aprender, Praticar, Progresso, Biblioteca) e barra inferior equivalente para mobile.
Design responsivo, sem sombras pesadas, foco em bordas sutis e tipografia cristalina.
```

---

### Prompt 2: Tela de Aula — "Aprender" (Layout Dual com Timer e Notação)

```text
Crie uma interface de sala de estudo musical para aplicativo web/desktop ("Tela Aprender") focada na execução de uma sessão guiada de 40 minutos no violão.
Estilo visual: Tema escuro premium "Studio Acústico" com contraste alto para leitura em estante de partitura.

Layout em duas colunas (Desktop):
- Coluna da Esquerda (Roteiro e Timer - 40% de largura):
  * Timer regressivo no topo com display grande em fonte monoespaçada: "14:58 restantes", indicador do bloco atual ("Bloco 4/6: Prática Dirigida - 15 min").
  * Controles de timer: botões discretos de Pausar, Retomar e Avançar Bloco.
  * Meta observável em destaque: "Executar o dedilhado P-I-M no acorde de Am mantendo pulso contínuo a 60 BPM".
  * Passo a passo da atividade em acordeões ou cartões verticais enumerados.
  * Seção de "Erros Comuns e Correções": dicas em caixas destacadas (ex: "Polegar abafando a 3ª corda? Ajuste a curvatura do punho").
- Coluna da Direita (Material Visual Interativo - 60% de largura):
  * Seletor de Nível (Tabs): [Preparação (Facilitado)] | [Alvo (Oficial)] | [Variação (Desafio)].
  * Visualizador de Diagramas de Acordes e Braço de Violão: representação limpa em vetor das 6 cordas do violão, indicando os trastes, os dedos (P, i, m, a / 1, 2, 3, 4) e cordas soltas.
  * Área de Tablatura/Partitura: notação limpa e legível em fonte monoespaçada com contagem rítmica abaixo (1 e 2 e 3 e 4 e).
  * Metrônomo compacto integrado no rodapé: controle deslizante de BPM (40 a 120), seletor de compasso (2/4, 3/4, 4/4) e botão visual de batida (LED pulsante).
  * Botão de término do bloco: "Registrar Desempenho e Avançar".

No mobile: as colunas devem se empilhar perfeitamente sem quebrar a tablatura.
```

---

### Prompt 3: Componente "Braço de Violão Interativo" (Fretboard SVG)

```text
Desenvolva um componente de UI vetorial interativo de um Braço de Violão de Nylon (Fretboard horizontal).
Características:
- 6 cordas horizontais (Mi, Si, Sol, Ré, Lá, Mi) com espessuras proporcionais (cordas graves mais grossas).
- 12 trastes verticais com marcadores tradicionais de ponto (trastes 3, 5, 7, 9 e duplo ponto no 12).
- Traste zero (pestana/nut) em destaque com cor marfim osso.
- Bolinhas de notas coloridas clicáveis sobre as casas com identificação:
  * Fundamental (Tônica): fundo âmbar #d97736, texto escuro.
  * Terça: fundo verde esmeralda #38a169.
  * Quinta: fundo azul aço #3182ce.
  * Sétima: fundo roxo discreto #805ad5.
- Painel de controle superior:
  * Dropdown: "Selecione a Escala ou Acorde" (ex: Escala Maior de Dó, Tríades de Ré menor, Tétrades com Baixo Invertido).
  * Toggle: Mostrar Notas (C, D, E...) ou Graus (1, b3, 5, 7M) ou Dedos (1, 2, 3, 4).
- Visual limpo, responsivo, sem texturas de madeira falsa, focado em clareza analítica moderna.
```

---

### Prompt 4: Tela de Progresso e Caderno de Dificuldades

```text
Crie uma interface para o "Caderno de Dificuldades e Revisão Espaçada" de um curso de violão.
Tema escuro "Studio Acústico".

A tela contém 3 seções principais:
1. Visão Geral de Domínio:
   - Gráfico de barras horizontais simples ou radar de 5 habilidades reais: Ritmo e Pulso, Troca de Acordes, Dedilhados/Independência, Leitura e Reconhecimento Auditivo (apresentando dados observados, sem pontuações inventadas).
2. O Caderno de Dificuldades (Central de Superação):
   - Tabela de trechos registrados como desafiadores pelo aluno.
   - Cada linha contém: Trecho/Compasso, Lição de Origem, Problema relatado ("Dificuldade em mudar de C para F sem parar o compasso"), Último BPM atingido e botão "Treinar Trecho Isolado".
3. Fila de Revisão Espaçada (SRS):
   - Cards com contagem regressiva em dias (ex: "Revisar em 2 dias", "Revisar hoje", "Revisar em 21 dias").
   - Botões de autoavaliação pós-prática: [Preciso Repetir], [Ficou Confortável], [Dominei no BPM Alvo].
4. Backup & Dados:
   - Área no rodapé com botões limpos: "Exportar Progresso em JSON" e "Restaurar Backup", com aviso de privacidade: "Seus dados ficam 100% salvos no seu computador".
```

---

## 3. Como Exportar do Stitch e Entregar ao Antigravity

Quando você gerar os designs no Google Stitch:
1. **Copie o código HTML e CSS gerado** (ou tire prints dos componentes se o Stitch fornecer visual).
2. **Salve os trechos de estilo em uma pasta temporária** ou cole diretamente para o Antigravity.
3. O **Antigravity irá converter** os estilos para variáveis nativas em `app/estilo.css` e os templates para as funções em `app/views.js`, mantendo 100% de compatibilidade com a abertura local `file://`.
