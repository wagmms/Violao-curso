# Guia de Operação e Delegação para o Jules (GitHub Agent)

Este guia define as regras de engenharia, governança e **templates de issues prontos para delegar tarefas ao Jules** no repositório [`wagmms/Violao-curso`](https://github.com/wagmms/Violao-curso).

---

## 1. Como o Jules Atua no Projeto

O **Jules** é o engenheiro autônomo baseado em nuvem do Google que atua diretamente nas Issues e Pull Requests do GitHub.
Ele opera assincronamente em segundo plano:
1. Você (ou o Antigravity) cria uma **Issue no GitHub** com especificações técnicas bem delimitadas.
2. O Jules assume a issue, cria uma branch dedicada (`feat/...` ou `fix/...`), implementa as alterações de código e testes.
3. O Jules abre um **Pull Request (PR)** documentado.
4. As ações do GitHub Actions (`ci-validacao.yml`) rodam automaticamente para conferir se o código do Jules quebrou algum contrato didático ou de interface.
5. O Antigravity ou você aprova e faz o merge para a branch `main`.

---

## 2. As Regras de Ouro da Codebase (Para incluir nas instruções do Jules)

Toda tarefa delegada ao Jules deve respeitar impreterivelmente estes 4 princípios:

1. **Regra Inegociável do `file://`**:
   - A aplicação em `app/` DEVE funcionar perfeitamente com um **duplo clique** direto no arquivo `index.html` no Windows Explorer ou navegador.
   - NUNCA introduza dependências de compilação obrigatória (`npm run build`), servidores Node.js/Python para rodar localmente ou fontes/bibliotecas externas via CDN que falhem offline ou por bloqueio de CORS em `file://`.
2. **Modularidade em JavaScript Puro**:
   - Mantenha a separação em arquivos limpos (`app.js`, `audio-motor.js`, `srs-engine.js`, `storage.js`, `views.js`, `utils.js`).
   - Evite frameworks pesados (React, Vue, Angular). Toda reatividade deve ser em DOM nativo ou SVG manipulável.
3. **Preservação de Dados e Migração Segura**:
   - A persistência local do aluno é armazenada sob a chave `metodo_triade_v2`. Qualquer alteração na estrutura de dados do `localStorage` deve conter migração não-destrutiva e fallback para navegação anônima/privada.
4. **Contrato de 40 Minutos**:
   - Qualquer atividade ou lição injetada ou manipulada em `dados-atividades.js` deve somar rigorosamente **40 minutos** no somatório de seus blocos.

---

## 3. Templates de Issues Prontos para Atribuir ao Jules

Copie e cole estes modelos de Issue diretamente no GitHub para que o Jules comece a trabalhar:

---

### Issue Modelo 1: Correção de Regressões nos Testes de Interface
**Título**: `fix(tests): resolver falhas nos testes 1, 5 e 7 do runner CDP local`

**Descrição para colar na Issue**:
```markdown
### Contexto
Ao executar a suíte real de testes via Chrome DevTools Protocol (`node app/ferramentas/testar-interface-v2.cjs`), 11 testes passaram, mas 3 apresentaram falhas de asserção:

1. **Teste 1**: Justificativa da recomendação na tela Hoje ("Comece pelos fundamentos...") não foi aceita pela regex de regra didática.
2. **Teste 5**: O avanço do ciclo SRS (2 -> 7 -> 21 dias) após conclusão do nível Alvo não encontrou a revisão de 7 dias com status correto.
3. **Teste 7**: A seleção explícita de uma atividade (ex: `ativ-4`) via URL ou clique não sobrepôs a sugestão padrão de `ativ-1`.

### Objetivo
- Analisar `app/app.js`, `app/srs-engine.js` e `app/ferramentas/testar-interface-v2.cjs`.
- Ajustar a lógica de orquestração e as mensagens de justificativa para que os 14 testes da suíte passem com 100% de sucesso.
- Garantir que a execução local continue funcionando sem servidor, mantendo compatibilidade com `file://`.

### Critérios de Aceite
- Executar `node app/ferramentas/testar-interface-v2.cjs` e obter: `Resultado da Suíte CDP Real: 14 passaram, 0 falharam`.
```

---

### Issue Modelo 2: Atalhos Globais de Teclado para Prática
**Título**: `feat(ux): adicionar atalhos de teclado ergonômicos para estudo com violão no colo`

**Descrição para colar na Issue**:
```markdown
### Contexto
O estudante pratica com o violão no colo e as duas mãos ocupadas no instrumento. Tirar a mão para mexer no mouse a cada compasso quebra a concentração do estudo de 40 minutos.

### Objetivo
Implementar atalhos de teclado simples e de tecla única (quando não estiver digitando em campos de texto):
- **Barra de Espaço**: Pausar / Retomar o timer da sessão e o metrônomo simultaneamente.
- **Seta para a Direita / Letra 'N'**: Avançar para o próximo bloco de tempo da sessão de 40 minutos.
- **Seta para Cima / Baixo**: Aumentar / Diminuir o andamento do metrônomo em passos de 2 BPM.
- **Teclas 1, 2, 3**: Alternar instantaneamente entre os níveis [Preparação], [Alvo] e [Variação].

### Critérios de Aceite
- Os atalhos não devem disparar caso o foco esteja em um `<input>` ou `<textarea>` de anotação.
- Feedback visual sutil (toast ou destaque temporário na tela) indicando a ação acionada pelo atalho.
- Suporte nativo em `app/app.js` sem qualquer biblioteca externa.
```

---

### Issue Modelo 3: Componente Fretboard SVG (Braço de Violão)
**Título**: `feat(components): implementar gerador visual SVG de braço de violão com digitação`

**Descrição para colar na Issue**:
```markdown
### Contexto
Conforme especificado em `GUIA-STITCH-DESIGN-SYSTEM.md`, precisamos de um visualizador leve em SVG para renderizar diagramas de acordes e digitação de escalas nas atividades da tela Aprender.

### Objetivo
- Criar uma função em `app/views.js` ou módulo complementar `app/fretboard.js` que receba uma lista de posições `[{corda: 5, traste: 3, dedo: '3', nota: 'C', fundamental: true}]` e gere um elemento `<svg>` responsivo.
- 6 cordas horizontais (ou verticais com toggle), espessura das cordas correspondente ao violão de nylon (bordões 4ª, 5ª, 6ª mais espessos que as primas 1ª, 2ª, 3ª).
- Marcador de pestana e números dos trastes visíveis.

### Critérios de Aceite
- Renderização vetorial leve, sem canvas pesado nem bibliotecas externas.
- Testado e visualmente legível em 375px (mobile) e 1366px (desktop).
```
