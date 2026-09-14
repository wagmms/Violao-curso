# Mapa de Integração dos Guias Pedagógicos e Módulos 2 e 3 (Lote 6 Revisado)

> **Documento de Engenharia e Integração Pedagógica — Lote 6 Revisado**  
> Submetido para homologação do Codex conforme diretrizes de `CORRECOES-GEMINI.md` e parecer de `REVISAO-CODEX.md`.  
> **Status:** Compilador tornado estritamente portátil; Módulo 1 ativo; Módulos 2 e 3 com guias corrigidos (100% conformes) aguardando homologação do Codex sem ativação prematura.

---

## 1. Arquitetura da Integração Offline na Interface

### 1.1 Princípio de Operação Local e Segurança (`file://`)
A interface opera 100% offline em Chrome e Edge sob o protocolo `file://`, garantindo total soberania, integridade e privacidade:
- **Zero Requisições de Rede para Estrutura:** Não utiliza `fetch`, nem chamadas HTTP locais, nem CDNs externos.
- **Carregamento Síncrono Clássico:** Dados estruturais compilados para `interface/guias-dados.js`, carregado no `index.html` entre `conteudo-geral.js` e `geral.js`.
- **Preservação de Dados Existentes:** Todos os 300 identificadores canônicos (`aula-mod-X-Y`), as marcações de aulas assistidas/praticadas e as notas no `localStorage` (`metodo_triade_geral_v1`) permanecem intactos.

### 1.2 Portabilidade do Compilador e Isolação de Módulos em Revisão
Em atendimento direto ao parecer do Codex:
1. **Resolução de Caminhos Relativos:** `interface/ferramentas/gerar-dados-guias.cjs` calcula a raiz do repositório via `path.resolve(__dirname, '../..')`, eliminando caminhos absolutos atrelados a usuários de máquina.
2. **Eliminação de Auto-cópia Redundante:** O compilador não sobrescreve a si mesmo; executa de forma idempotente e limpa.
3. **Controle Estrito de Homologação:** A lista de módulos ativos no compilador é mantida explicitamente em:
   ```javascript
   const MODULOS_HOMOLOGADOS = [1]; // Módulos 2 e 3 aguardam parecer do Codex
   ```
   Dessa forma, `interface/guias-dados.js` contém unicamente as 46 aulas do Módulo 1 (já homologadas). Os Módulos 2 e 3 não são ativados prematuramente na interface.

### 1.3 Renderização dos Guias e Prevenção de Botões Fantasmas
- **Renderização Condicional:** A interface consulta `window.CURSO_GUIAS[a.id]`. Quando não há guia homologado cadastrado, **nenhum elemento visual de guia é renderizado** (zero botões fantasmas ou expansíveis vazios).
- **Fallback Transparente em `geral.js`:** A rotina de aviso de status foi sanitizada para não exibir textos enganosos quando o objeto for nulo ou indefinido.
- **Filtro "Com guia de estudo":** Isola exatamente as 46 aulas do Módulo 1 no catálogo.

---

## 2. Padrões Pedagógicos e Correções Aplicadas aos Módulos 2 e 3

### 2.1 Evidências Físicas Locais vs. Metadados de Arquivo
- **Eliminação Total de MB e Bytes:** O tamanho de arquivos (MB/bytes) foi completamente expurgado do campo de evidência pedagógica, pois tamanho de arquivo não constitui prova de conteúdo curricular.
- **Adoção de Referências Localizáveis:** Todas as aulas contam com indicação precisa do material consultado:
  - Arquivos de legenda `.vtt` com marcação temporal observada (`aos MM:SS`).
  - Descrições Katomart com indicação das seções de rotina e metrônomo.
  - Apostilas didáticas com especificação de volume e página (`Apostila HP1 pág. X`).

### 2.2 Status do Objetivo Pedagógico: `[Confirmado]` vs. `[Provisório]`
- **`[Confirmado]`:** Aplicado quando o objetivo curricular é diretamente sustentado por instrução verbalizada pelo professor na legenda, vídeo ou texto oficial da descrição/apostila.
- **`[Provisório]`:** Aplicado estritamente nas seguintes situações:
  1. *Aulas sem transcrição textual/auditiva:* Aulas com apenas vídeo sem legenda (ex: Módulo 3, Aulas 32 e 37).
  2. *Itens de plataforma Hotmart sem arquivo no Drive:* Aulas de quiz ou suporte (Módulo 2, Aula 01; Módulo 3, Aulas 01 e 44).
  - *Salvaguarda:* O texto explicita que o conteúdo da plataforma não foi recuperado no acervo local, oferecendo orientações diagnósticas complementares sem atribuir palavras hipotéticas ao professor.

### 2.3 Orçamento Temporal: Modelo Matemático de 40 Minutos Cravados
Todas as 82 aulas revisadas cumprem rigorosamente a restrição de 40 minutos através da soma exata dos blocos de atividades:
1. **Sessão Padrão Individual (49 aulas):**
   $$\text{Preparação: } 5\text{ min} + \text{Estudo/Vídeo: } 10\text{ min} + \text{Prática: } 20\text{ min} + \text{Registro: } 5\text{ min} = 40\text{ min}$$
2. **Sessões Agrupadas (12 pares = 24 aulas):**
   - *Aula Principal (12 aulas):* Detalha os blocos somando exatamente 40 minutos para a sessão integrada do assunto.
   - *Aula Parceira (12 aulas):* Aponta para a aula principal com a nota: `[Sessão Agrupada]: Cumprida conjuntamente com a Aula XX dentro do orçamento compartilhado de 40 min`. Não duplica nem infla os minutos semanais do aluno.
3. **Aulas Extensas (9 aulas):**
   - Desmembradas explicitamente em **Sessão 1 (40 min)** e **Sessão 2 (40 min)**.
   - Cada sessão possui somatório interno estrito de $5 + 15 + 15 + 5 = 40$ min ou $5 + 10 + 20 + 5 = 40$ min.

---

## 3. Síntese Comparativa dos Módulos 2 e 3

| Módulo | Aulas Totais | Sessões Padrão | Agrupadas (Principal) | Agrupadas (Parceira) | Extensas (2 Sessões) | Confirmados | Provisórios |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Módulo 2** | 38 | 24 | 5 | 5 | 4 | 37 | 1 (Aula 01) |
| **Módulo 3** | 44 | 25 | 7 | 7 | 5 | 40 | 4 (Aulas 01, 32, 37, 44) |
| **Total** | **82** | **49** | **12** | **12** | **9** | **77** | **5** |

---

## 4. Matriz de Auditoria e Verificação

Para garantir a ausência de regressões e a total rastreabilidade, foram desenvolvidos e executados:
1. `entregas-gemini/lote-6/revisado/ferramentas/conferir-lote-6.cjs`:
   - Faz o parsing léxico de todas as 82 aulas.
   - Audita a soma aritmética exata dos blocos de minutos em cada sessão (0 divergências).
   - Verifica a ausência de termos `MB` e `bytes` nas evidências.
   - Valida a correspondência de 100% dos IDs e links canônicos do acervo.
   - Produz `RESULTADO-CONFERENCIA.json`.
2. `entregas-gemini/lote-6/revisado/ferramentas/testar-navegador-cdp.mjs`:
   - Executa 12 testes ponta a ponta automatizados via Chrome DevTools Protocol no Edge/Chrome.
   - Valida a integridade do DOM com 300 aulas, filtros de catálogo, ausência de guias fantasmas no Módulo 2, persistência de dados após recarga e formatação para impressão (`@media print`).
   - Produz `TESTES-NAVEGADOR.json`.
