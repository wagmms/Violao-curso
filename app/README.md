# Ambiente de Aprendizagem de Violão — Piloto v2 (Método Tríade)

Este diretório contém o piloto funcional da nova interface de aprendizagem de violão, desenvolvida pelo Antigravity em cumprimento ao brief `entregas-gemini/redesign-1/BRIEF-ANTIGRAVITY.md` e ao plano pedagógico `PLANO-EXPERIENCIA-APRENDIZAGEM.md`.

---

## Como Abrir e Usar

1. **Abertura Direta**:
   - Abra o arquivo `index.html` diretamente por **duplo clique** no Windows Explorer ou navegador de sua preferência (protocolo `file://`).
   - Não requer conexão com internet para funcionamento do ambiente, nem instalação de servidores locais, compilações ou frameworks.
   - Vídeos e materiais originais do acervo mantêm links diretos para o Google Drive (exigem internet e acesso da sua conta).

2. **Navegação Principal**:
   - **Hoje**: Sessão do dia com recomendação transparente por regras pedagógicas, botão "Começar meus 40 minutos" e diagnóstico inicial opcional.
   - **Aprender**: Sessão guiada de 40 minutos em 6 blocos com timer regressivo de alta precisão (`Date.now()`), instrução à esquerda e exercício/ferramenta interativa à direita.
   - **Praticar**: Central com as 6 atividades completas do piloto, com alternância imediata entre os 3 níveis (Preparação, Alvo, Variação).
   - **Progresso**: Caderno de Dificuldades com ação de recuperação direta, Agenda de Revisão Espaçada (2, 7 e 21 dias não punitiva) e exportação/importação de backups em JSON.
   - **Biblioteca**: Acervo secundário completo dos 11 módulos e 300 aulas originais do Método Tríade catalogadas, com filtros por tipo de material e busca em tempo real.

---

## Estrutura de Arquivos

- `index.html`: Página principal semântica, responsiva e pronta para impressão (`@media print`).
- `estilo.css`: Folha de estilos moderna com contraste acessível, layout desktop com barra lateral e mobile com barra inferior (validado em 375px e 1366px sem overflow).
- `dados-catalogo.js`: Catálogo oficial de referência (11 módulos, 300 aulas).
- `dados-atividades.js`: Base de dados estruturada das 6 atividades didáticas do piloto cumprindo rigorosamente os 9 itens do contrato pedagógico e o orçamento de 40 minutos.
- `audio-motor.js`: Motor de síntese Web Audio API nativo com metrônomo de alta precisão via `AudioContext.currentTime` e sintetizador de intervalos para treino de ouvido.
- `app.js`: Controlador principal da aplicação, persistência sob chave versionada `metodo_triade_v2`, migração não-destrutiva de backups `v1`, proteção contra XSS e resiliência a bloqueios de armazenamento.
- `ferramentas/`:
  - `validar-piloto.cjs`: Validador estático de integridade de dados e contrato didático.
  - `testar-interface-v2.cjs`: Suíte automatizada de testes reais via Chrome DevTools Protocol (CDP) em protocolo `file://`.

---

## Testes Automatizados

Para executar os testes de integridade e navegador:

```bash
# 1. Validação estática de contratos e tempos (Node.js)
node interface-v2/ferramentas/validar-piloto.cjs

# 2. Testes end-to-end em navegador real via CDP
node interface-v2/ferramentas/testar-interface-v2.cjs
```
