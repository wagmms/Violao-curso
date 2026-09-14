# Instruções de Abertura e Uso — Interface Local do Curso

**Curso de Violão — Método Tríade (Formação em Violão de Nylon)**  
*Lote 4 — Versão 1.3 • Execução Estritamente Local e Offline*

---

## 1. Como Abrir o Curso

A aplicação foi construída para funcionar sem nenhuma necessidade de instalação de programas, bibliotecas, servidores web, Node.js ou criação de conta.

1. Navegue até a pasta `interface/` deste projeto.
2. Dê um **duplo clique no arquivo `index.html`** (ou clique com o botão direito e selecione *Abrir com* → *Microsoft Edge* ou *Google Chrome*).
3. A aplicação será carregada instantaneamente pelo protocolo local `file://`.

---

## 2. Compatibilidade e Requisitos

- **Sistemas Operacionais:** Windows 10/11 (Edge e Google Chrome testados e homologados). Funciona igualmente em navegadores modernos no macOS e Linux.
- **Conexão com a Internet:** A interface, os exercícios, as tablaturas, os cronômetros, os diários e os planos funcionam **100% offline**.
- **Acesso ao Google Drive:** Apenas a abertura dos links dos vídeos do acervo original do Método Tríade exige conexão com a internet e o acesso já existente do aluno à pasta no Drive. Todos os links externos abrem em uma nova aba com proteção de segurança (`target="_blank" rel="noopener noreferrer"`).
- **Sem CDNs ou Dependências:** A tipografia utiliza fontes do sistema e glifos padronizados. Nenhum arquivo remoto é requisitado.

---

## 3. Duas Navegações Complementares

A interface está organizada em duas visões fundamentais:

1. **Curso Original (Método Tríade):**
   - Biblioteca completa do Método Tríade contendo as **300 aulas catalogadas** distribuídas nos 11 módulos do acervo (Módulos 1 a 9 pedagógicos, Módulo 10 de escalas e Módulo 11 de lives/sorteios).
   - Agrupamento fiel de materiais por aula real (vídeos principais, vídeos complementares e materiais em PDF).
   - Ferramentas de busca por palavra-chave e filtros por tipo (com vídeo, com PDF, disponíveis ou indisponíveis no backup).
   - Marcação independente de estudo (*Assistido* e *Praticado*).

2. **Meu Plano de Estudo (48 Semanas):**
   - Rota personalizada de 48 semanas adaptada para o perfil do aluno (violão de nylon, preferência por MPB e formação musical abrangente).
   - Rotina semanal de 3 sessões obrigatórias de 40 minutos (A, B, C) e 1 sessão opcional de relaxamento/repertório (D).
   - **Sessões Detalhadas (Semanas 1 a 12 / Unidades 1 a 3):** Distribuição exata dos 40 minutos em blocos contíguos cronometrados, instruções executáveis, dificuldades esperadas, simplificações imediatas e critérios de saída.
   - **Unidades Planejadas (Semanas 13 a 48 / Unidades 4 a 12):** Mapa curricular transparente com objetivos, pré-requisitos, base do acervo e entregas previstas da arquitetura v1.3, sem botões de aulas fictícias.

---

## 4. Temporizador de 40 Minutos e Persistência

- **Temporizador Resiliente:** Localizado no cabeçalho superior, o temporizador calcula o tempo pelo relógio real do sistema (`Date.now()`). O tempo continua correndo com precisão mesmo que você mude de aba no navegador, minimize a janela ou troque de tela dentro da aplicação.
- **Armazenamento Local (`localStorage`):** Seu diário, registros de prática e avaliações de entrega são gravados automaticamente no navegador deste dispositivo.
- **Aviso de Limpeza e Backup JSON:** Se você limpar o cache/dados de navegação do seu navegador, esses registros poderão ser apagados. Para garantir a segurança do seu histórico, utilize o botão **Baixar Arquivo JSON de Backup** na aba *Diário & Avaliação*. O arquivo exportado pode ser importado a qualquer momento em outro navegador ou computador.

---

## 5. Impressão de Folhas de Estudo

Para estudar desconectado do computador ou praticar junto à estante de partituras:
1. Abra a sessão de estudo ou o exercício desejado.
2. Pressione `Ctrl + P` (ou clique no botão *Imprimir Folha de Estudo*).
3. A folha de estilo de impressão (@media print) remove automaticamente menus, botões, temporizadores e fundos coloridos, gerando uma folha limpa em preto e branco de alto contraste, formatada para papel A4 sem quebra inadequada de tablaturas.
