# Ambiente de Aprendizagem de Violão — Método Tríade

Sistema de estudo e prática deliberada de violão (nylon, acompanhamento e MPB solo) com acervos do Método Tríade e Kaiser integrados em 12 módulos e 631 entradas.
Funciona 100% offline via navegador (protocolo `file://`), sem necessidade de servidores, compilações ou instalação de dependências.

---

## 📁 Estrutura do Projeto

```text
├── app/                      # O aplicativo principal (HTML5, Web Audio, CSS e JS modular)
│   ├── index.html            # Ponto de entrada (abra com duplo clique no navegador)
│   ├── estilo.css            # Estilos visuais e temas
│   ├── dados-catalogo.js     # Catálogo integrado: 631 entradas Tríade + Kaiser
│   ├── dados-atividades.js   # 11 atividades complementares de 40 minutos
│   ├── dados-guias-aulas.js  # Roteiros e fontes locais das 631 entradas, em revisão
│   ├── curso-aprender.js    # Percurso por módulo/aula e orientações dos 12 módulos
│   ├── audio-motor.js        # Motor de áudio nativo (metrônomo preciso e sintetizador)
│   ├── srs-engine.js         # Algoritmo de repetição espaçada (SRS de 2, 7 e 21 dias)
│   └── ferramentas/          # Scripts de validação estática e testes CDP
│
├── docs/                     # Guias operacionais e especificações pedagógicas
│   ├── GUIA-STITCH-DESIGN-SYSTEM.md  # Prompts e tokens visuais para o Google Stitch
│   ├── PROMPT-MESTRE-AI-STUDIO.md    # System Prompt e JSON Schema para o AI Studio
│   ├── GUIA-INTEGRACAO-JULES.md      # Regras de código e templates de issues para o Jules
│   └── PLANO-EXPERIENCIA-APRENDIZAGEM.md # Arquitetura pedagógica dos 40 minutos
│
├── _arquivo_historico/       # Lotes anteriores, relatórios de auditoria e versões v1
└── .github/workflows/        # Integração contínua (CI) automatizada
```

---

## 🚀 Como Executar

1. **Uso Imediato (Aluno)**:
   - Dê um **duplo clique** no arquivo [`app/index.html`](file:///c:/Users/wmors/Documents/ChatGPT/Violão/app/index.html).
   - O ambiente abrirá no seu navegador padrão. Não precisa de internet (exceto para assistir aos vídeos hospedados no Google Drive).

2. **Validação Técnica (Desenvolvedor/Auditor)**:
   ```bash
   # Validação estática de contratos didáticos e catálogo:
   node app/ferramentas/validar-piloto.cjs

   # Navegação por aula, fontes locais, progresso e diagramas:
   node app/ferramentas/testar-curso-aprender.cjs

   # Execução da suíte de testes de interface via Chrome DevTools Protocol:
   node app/ferramentas/testar-interface-v2.cjs
   ```

---

## 🛠️ Ecossistema de Ferramentas de IA

O curso é expandido e aprimorado através de um quarteto integrado:

| Ferramenta | Papel Principal | Onde Atua |
|---|---|---|
| **Google Stitch** | Design de UI/UX, componentes visuais e temas | Protótipos visuais gerados via prompts em [`docs/GUIA-STITCH-DESIGN-SYSTEM.md`](docs/GUIA-STITCH-DESIGN-SYSTEM.md) |
| **Google AI Studio** | Ingestão de vídeos/PDFs do Drive e curadoria de conteúdo | Extração de atividades estruturadas em JSON via [`docs/PROMPT-MESTRE-AI-STUDIO.md`](docs/PROMPT-MESTRE-AI-STUDIO.md) |
| **Antigravity** | Arquiteto local, engenharia de frontend e integração | Desenvolvimento em `app/`, Web Audio API, testes locais e git |
| **Jules** | Engenheiro assíncrono no GitHub & QA autônomo | Resolução de issues, testes unitários e PRs via [`docs/GUIA-INTEGRACAO-JULES.md`](docs/GUIA-INTEGRACAO-JULES.md) |
