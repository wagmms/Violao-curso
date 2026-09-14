# Relatório de Verificação e Evidências de Teste — Lote 4 Revisado

## 1. Ambiente e Metodologia de Teste

- **Sistema Operacional:** Windows
- **Ambiente de Runtime:** Node.js v26.7.0 (CommonJS / Vanilla JS nativo)
- **Navegadores Auditados:** 
  - Google Chrome (binário nativo: `C:\Program Files\Google\Chrome\Application\chrome.exe`)
  - Microsoft Edge (binário nativo: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`)
- **Protocolo de Carregamento:** Estritamente local via `file:///c:/Users/wmors/Documents/ChatGPT/Violão/interface/index.html`.
- **Dependências Externas:** Nenhuma (zero pacotes npm, zero requisições CDN, zero fontes remotas, zero chamadas `fetch` locais).

---

## 2. Resultados da Suíte Automatizada (`validar-interface.cjs`)

A suíte de testes importa diretamente o módulo compartilhado `CursoRegras` e audita a estrutura de `conteudo.js`, comparando com os dados canônicos de `EVENTOS.json` do Lote 3.

**Resultado Consolidado:**
- **Total de Testes Executados:** 62
- **Sucessos:** 62
- **Falhas:** 0

### Detalhamento por Grupo de Teste:

1. **Grupo 1 — Catálogo Original do Método Tríade (9 testes):**
   - 11 módulos catalogados com títulos originais do Drive (`01. Módulo 1`, ..., `07. Mês 7`, `08. Mês 8`, `09. Mês 9`, etc.).
   - Notas editoriais separadas identificando o conteúdo.
   - Contagens auditadas: 300 aulas no manifesto, 197 aulas utilizáveis, 103 sem arquivo, 285 vídeos utilizáveis, 33 PDFs, 0 fragmentos `.part-Frag` habilitados.
2. **Grupo 2 — Unidades do Plano de Estudo (12 testes):**
   - 12 unidades na rota de 48 semanas: exatamente 3 disponíveis (`u1`, `u2`, `u3`) e 9 planejadas (`u4` a `u12`).
   - Unidades planejadas sem aulas fictícias, contendo objetivos, pré-requisitos, base Tríade e entregas formais.
3. **Grupo 3 — Sessões de Estudo e Continuidade Temporal (5 testes):**
   - Exatamente 48 sessões estruturadas.
   - Todas as 48 sessões totalizam exatamente 40 minutos.
   - Todos os blocos temporais possuem intervalos contínuos de 0 a 40 min (ex: 0–5, 5–15, 15–28, 28–36, 36–40).
   - Instruções operacionais e critérios de saída presentes em 100% das sessões.
4. **Grupo 4 — Exercícios e Correspondência Musical com EVENTOS.json (5 testes):**
   - 16 versões de exercícios catalogadas.
   - Ex. 4 possui exatamente 4 compassos derivados de `EVENTOS.json`.
   - Total de compassos dos exercícios 1 a 6 corresponde rigorosamente ao `EVENTOS.json` do Lote 3.
   - Ex. 6-S configurado estritamente como `parcial_preparatoria`.
   - 13 exercícios contendo notas pedagógicas detalhadas (amortecimento, voicings, encadeamento linear).
5. **Grupo 5 — Módulo Compartilhado CursoRegras (31 testes):**
   - **Validação de Backup:** aceita explicitamente `versao_backup: 1`; rejeita versão 2, string "1", null, entradas nulas em arrays, notas fora de 0–3, notas decimais, IDs desconhecidos e datas fora do padrão ISO.
   - **Mesclagem Determinística (Merge):** preserva registro local em caso de conflito de IDs; deduplica duplicatas internas do backup; mantém sessões distintas na mesma data (datas não deduplicam); une conjuntos de acompanhamento do catálogo.
   - **Substituição (Replace):** substitui o estado integralmente pelo backup importado.
   - **Motor de Avanço:** duas tomadas no mesmo dia com nota máxima NÃO liberam avanço (`mesmaDataApenas: true`); duas tomadas em datas distintas com notas >= 2 liberam avanço; versão parcial `ex6-s` não certifica avanço (`temParcialApenas: true`); Unidade 2 exige confirmação explícita de 16 compassos (`pendenteExecucaoIntegralU2: true` quando desmarcada).
   - **Sanitização e Links Seguros:** links do Google Drive e URLs HTTP(S) convertidos em nós de link seguros; payloads maliciosos convertidos em texto puro e entidades HTML seguras sem injeção XSS.

---

## 3. Verificação em Navegadores Reais (Chrome e Edge Headless)

Foi executado o dump completo do DOM renderizado via comando headless real em ambos os navegadores.

### Evidências Concretas:

| Parâmetro de Auditoria | Google Chrome | Microsoft Edge | Conformidade |
|---|---|---|---|
| Comando | `chrome.exe --headless=new --disable-gpu --dump-dom` | `msedge.exe --headless=new --disable-gpu --dump-dom` | Idêntico |
| Tamanho do DOM Renderizado | 51.488 bytes | 51.488 bytes | 100% idêntico |
| Título da Aplicação | "Curso de Violão — Método Tríade" | "Curso de Violão — Método Tríade" | Conforme |
| "Formação em Violão de Nylon" no cabeçalho | Ausente (removido) | Ausente (removido) | Conforme |
| Título Original do Módulo 1 | "01. Módulo 1" presente | "01. Módulo 1" presente | Conforme |
| Carga de `nucleo-regras.js` | Confirmada antes de `app.js` | Confirmada antes de `app.js` | Conforme |
| Checkbox `rubricConfirmU2Full` | Presente no DOM | Presente no DOM | Conforme |
| Seção `exercisePedagogicalNotesSection` | Presente no DOM | Presente no DOM | Conforme |
| Erros de Console / JavaScript | 0 erros | 0 erros | Conforme |
| Requisições de Rede Bloqueadas | 0 requisições externas | 0 requisições externas | Conforme |
