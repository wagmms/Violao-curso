# Ambiente de aprendizagem — Tríade e Kaiser

Abra `index.html` por duplo clique. O aplicativo funciona sem servidor; links do Drive exigem internet e acesso à conta.

- **Biblioteca:** 12 módulos e 631 entradas. Use **Aprender esta aula** para abrir o percurso do curso.
- **Aprender:** aula selecionada, materiais, roteiro autoral em revisão, transcrições disponíveis e registro de consulta, prática e notas. Também exibe a sessão complementar quando uma atividade é selecionada.
- **Hoje/Praticar:** 11 atividades complementares com três níveis e ferramentas de estudo.
- **Progresso:** resultados das atividades, dificuldades, revisões e backups. O registro por aula é independente da avaliação das atividades.

## Arquivos do curso

- `dados-catalogo.js`: catálogo integrado; IDs e proveniência preservados.
- `dados-atividades.js`: 11 atividades complementares em revisão.
- `dados-guias-aulas.js`: roteiros das 631 entradas, arquivos locais e legendas indexadas.
- `curso-aprender.js`: orientações dos 12 módulos, percurso por aula e diagramas específicos.
- `storage.js`: persistência, validação e importação de backups.

A raiz local padrão é `C:\Users\wmors\Videos\KatoMart Acelerado`; ajuste em **Materiais desta aula** se mover o acervo. Os arquivos originais não são alterados.

## Validação, a partir da raiz do projeto

```powershell
node app/ferramentas/validar-piloto.cjs
node app/ferramentas/testar-confiabilidade.cjs
node app/ferramentas/testar-curso-aprender.cjs
```

Os testes de DOM usam `jsdom` em `ferramentas/node_modules`. A suíte de navegador anterior permanece em `ferramentas/testar-interface-v2.cjs`; sua execução não faz parte da homologação visual desta entrega.

Para atualizar o índice local:

```powershell
node app/ferramentas/gerar-guias-curso.cjs 'C:\Users\wmors\Videos\KatoMart Acelerado'
```

Consulte `../docs/IMPLEMENTACAO-CURSO-INTEGRADO.md`. Os roteiros usam perfis por tema e fontes indexadas; a curadoria integral e a homologação musical ainda estão pendentes.
