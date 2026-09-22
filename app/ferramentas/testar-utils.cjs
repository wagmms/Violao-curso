const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const utils = require('../utils.js');

async function criarAmbienteDOM() {
  const htmlPath = path.resolve(__dirname, '../index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html.replace(/<script[\s\S]*?<\/script>/g, ''), {
    url: 'https://curso.test/',
    runScripts: 'outside-only',
    virtualConsole: new VirtualConsole()
  });
  const w = dom.window;
  w.scrollTo = () => {};
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; };

  // Set up global scope variables needed by utils functions
  w.state = { anotacoes: {} };
  w.salvarEstado = () => { w.estadoSalvo = true; };

  const scripts = ['utils.js'];
  for (const script of scripts) {
    const scriptPath = path.resolve(__dirname, '..', script);
    new vm.Script(fs.readFileSync(scriptPath, 'utf8'), { filename: script }).runInContext(dom.getInternalVMContext());
  }

  return { dom, w, run: code => vm.runInContext(code, dom.getInternalVMContext()) };
}

async function main() {
  console.log('=== Executando Testes de Unidade: app/utils.js ===\n');
  let totalTestes = 0;
  let erros = 0;

  function testar(nome, fn) {
    totalTestes++;
    try {
      fn();
      console.log(`  ✓ ${nome}`);
    } catch (err) {
      erros++;
      console.error(`  ✕ ${nome}`);
      console.error(err);
    }
  }

  async function testarAsync(nome, fn) {
    totalTestes++;
    try {
      await fn();
      console.log(`  ✓ ${nome}`);
    } catch (err) {
      erros++;
      console.error(`  ✕ ${nome}`);
      console.error(err);
    }
  }

  // 1. escapeHTML
  testar('escapeHTML - deve retornar string vazia para null ou undefined', () => {
    assert.equal(utils.escapeHTML(null), '');
    assert.equal(utils.escapeHTML(undefined), '');
  });

  testar('escapeHTML - deve escapar caracteres especiais HTML', () => {
    assert.equal(utils.escapeHTML('<script>alert("xss")&\'</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&amp;&#39;&lt;/script&gt;');
  });

  testar('escapeHTML - deve converter numeros e outros tipos para string escapada', () => {
    assert.equal(utils.escapeHTML(123), '123');
    assert.equal(utils.escapeHTML(0), '0');
    assert.equal(utils.escapeHTML(false), 'false');
  });

  // 2. obterDataLocal
  testar('obterDataLocal - deve retornar data atual em formato YYYY-MM-DD', () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataEsperada = `${ano}-${mes}-${dia}`;
    assert.equal(utils.obterDataLocal(), dataEsperada);
    assert.equal(utils.obterDataLocal(0), dataEsperada);
  });

  testar('obterDataLocal - deve aplicar deslocamento de dias positivo e negativo', () => {
    const d1 = new Date();
    d1.setDate(d1.getDate() + 5);
    const m1 = String(d1.getMonth() + 1).padStart(2, '0');
    const dia1 = String(d1.getDate()).padStart(2, '0');
    assert.equal(utils.obterDataLocal(5), `${d1.getFullYear()}-${m1}-${dia1}`);

    const d2 = new Date();
    d2.setDate(d2.getDate() - 10);
    const m2 = String(d2.getMonth() + 1).padStart(2, '0');
    const dia2 = String(d2.getDate()).padStart(2, '0');
    assert.equal(utils.obterDataLocal(-10), `${d2.getFullYear()}-${m2}-${dia2}`);
  });

  // 3. urlDriveValida
  testar('urlDriveValida - deve validar URLs validas do Google Drive HTTPS', () => {
    assert.equal(utils.urlDriveValida('https://drive.google.com/file/d/123/view'), true);
    assert.equal(utils.urlDriveValida('https://drive.google.com/open?id=123'), true);
  });

  testar('urlDriveValida - deve rejeitar URLs invalidas ou de outros dominios', () => {
    assert.equal(utils.urlDriveValida('http://drive.google.com/file/d/123'), false); // HTTP
    assert.equal(utils.urlDriveValida('https://dropbox.com/file/123'), false); // Host incorreto
    assert.equal(utils.urlDriveValida('not-a-url'), false); // URL malformada
    assert.equal(utils.urlDriveValida(''), false); // String vazia
    assert.equal(utils.urlDriveValida(null), false); // null
  });

  // 4. atividadeTemSessao
  testar('atividadeTemSessao - deve validar atividade com sessao de 40min valida', () => {
    const ativValida = {
      id: 'ativ-test',
      statusOperacional: 'ativo',
      sessao40min: [
        { fase: 'Preparar', minutos: 3, instrucao: 'Ins1' },
        { fase: 'Recuperar', minutos: 5, instrucao: 'Ins2' },
        { fase: 'Consultar', minutos: 7, instrucao: 'Ins3' },
        { fase: 'Praticar', minutos: 15, instrucao: 'Ins4' },
        { fase: 'Aplicar', minutos: 7, instrucao: 'Ins5' },
        { fase: 'Registrar', minutos: 3, instrucao: 'Ins6' }
      ]
    };
    assert.equal(utils.atividadeTemSessao(ativValida), true);
  });

  testar('atividadeTemSessao - deve rejeitar rascunhos ou estrutura invalida', () => {
    assert.equal(utils.atividadeTemSessao(null), false);
    assert.equal(utils.atividadeTemSessao(undefined), false);

    // rascunho
    assert.equal(utils.atividadeTemSessao({ statusOperacional: 'rascunho', sessao40min: [] }), false);

    // menos ou mais de 6 blocos
    assert.equal(utils.atividadeTemSessao({
      statusOperacional: 'ativo',
      sessao40min: [{ fase: 'Praticar', minutos: 40, instrucao: 'x' }]
    }), false);

    // soma de minutos != 40
    const somaInvalida = {
      statusOperacional: 'ativo',
      sessao40min: [
        { fase: 'Preparar', minutos: 5, instrucao: 'Ins1' },
        { fase: 'Recuperar', minutos: 5, instrucao: 'Ins2' },
        { fase: 'Consultar', minutos: 7, instrucao: 'Ins3' },
        { fase: 'Praticar', minutos: 15, instrucao: 'Ins4' },
        { fase: 'Aplicar', minutos: 7, instrucao: 'Ins5' },
        { fase: 'Registrar', minutos: 3, instrucao: 'Ins6' }
      ]
    };
    assert.equal(utils.atividadeTemSessao(somaInvalida), false);

    // blocos com minutos <= 0 ou sem instrucao/fase
    const blocoInvalido = {
      statusOperacional: 'ativo',
      sessao40min: [
        { fase: 'Preparar', minutos: 0, instrucao: 'Ins1' },
        { fase: 'Recuperar', minutos: 8, instrucao: 'Ins2' },
        { fase: 'Consultar', minutos: 7, instrucao: 'Ins3' },
        { fase: 'Praticar', minutos: 15, instrucao: 'Ins4' },
        { fase: 'Aplicar', minutos: 7, instrucao: 'Ins5' },
        { fase: 'Registrar', minutos: 3, instrucao: 'Ins6' }
      ]
    };
    assert.equal(utils.atividadeTemSessao(blocoInvalido), false);
  });

  // 5. novoId
  testar('novoId - deve gerar ID com o prefixo informado', () => {
    const id1 = utils.novoId('rev');
    assert.ok(id1.startsWith('rev-'));
    assert.ok(id1.length > 5);

    const id2 = utils.novoId('dif');
    assert.ok(id2.startsWith('dif-'));
  });

  // 6. sanitizarAnotacaoPratica
  testar('sanitizarAnotacaoPratica - deve escapar conteudo HTML', () => {
    assert.equal(utils.sanitizarAnotacaoPratica('<b>nota</b>'), '&lt;b&gt;nota&lt;/b&gt;');
  });

  // 7. Interacao DOM ($ e Modais)
  const env = await criarAmbienteDOM();

  testar('Selector $ - deve selecionar elemento do DOM por ID', () => {
    const el = env.run("$('modal-alerta')");
    assert.ok(el !== null);
    assert.equal(el.id, 'modal-alerta');
  });

  await testarAsync('mostrarAlerta - deve preencher e exibir modal-alerta', async () => {
    const p = env.run("mostrarAlerta('Mensagem de teste\\nlinha 2', 'Titulo Teste')");
    const dialog = env.run("$('modal-alerta')");
    assert.equal(dialog.open, true);
    assert.equal(env.run("$('alerta-titulo').textContent"), 'Titulo Teste');
    assert.equal(env.run("$('alerta-corpo').innerHTML"), 'Mensagem de teste<br>linha 2');
    assert.equal(env.run("$('btn-alerta-cancelar').style.display"), 'none');

    // Clicar OK
    env.run("$('btn-alerta-ok').onclick()");
    const res = await p;
    assert.equal(res, true);
    assert.equal(dialog.open, false);
  });

  await testarAsync('mostrarAlerta - deve fechar e retornar false ao clicar no botao fechar', async () => {
    const p = env.run("mostrarAlerta('Aviso de fechar')");
    env.run("$('btn-fechar-alerta').onclick()");
    const res = await p;
    assert.equal(res, false);
  });

  await testarAsync('mostrarConfirmacao - deve preencher e permitir ok/cancelar', async () => {
    const p1 = env.run("mostrarConfirmacao('Deseja continuar?')");
    assert.equal(env.run("$('btn-alerta-cancelar').style.display"), '');
    env.run("$('btn-alerta-ok').onclick()");
    assert.equal(await p1, true);

    const p2 = env.run("mostrarConfirmacao('Deseja excluir?')");
    env.run("$('btn-alerta-cancelar').onclick()");
    assert.equal(await p2, false);
  });

  // 8. Annotations / State Functions (salvarAnotacaoPratica e atividadeTemAnotacao)
  testar('salvarAnotacaoPratica e atividadeTemAnotacao', () => {
    env.run("state = { anotacoes: {} }; estadoSalvo = false;");

    assert.equal(env.run("atividadeTemAnotacao('ativ-1')"), false);

    // Salvar nota
    env.run("salvarAnotacaoPratica('ativ-1', '  Minha anotação <script>  ')");
    assert.equal(env.run("atividadeTemAnotacao('ativ-1')"), true);
    assert.equal(env.run("state.anotacoes['ativ-1']"), '  Minha anotação &lt;script&gt;  ');
    assert.equal(env.run("estadoSalvo"), true);

    // Salvar nota vazia ou com espacos deve excluir
    env.run("salvarAnotacaoPratica('ativ-1', '    ')");
    assert.equal(env.run("atividadeTemAnotacao('ativ-1')"), false);
    assert.equal(env.run("state.anotacoes['ativ-1']"), undefined);
  });

  // 9. hidratarFonte e hidratarFontes
  testar('hidratarFonte e hidratarFontes', () => {
    env.run(`
      CURSO_DADOS = {
        catalogoOriginal: [
          {
            nome: 'Módulo 1',
            aulas: [
              {
                id: 'aula-1',
                grupo_aula: 'Aula de Teste 1',
                materiais: [
                  {
                    utilizavel: true,
                    url: 'https://drive.google.com/file/d/abc/view',
                    tipo: 'pdf',
                    status_verificacao: 'Verificado OK'
                  }
                ]
              }
            ]
          }
        ]
      };
    `);

    const fonte = { aulaId: 'aula-1', trecho: 'Início' };
    const fonteHidratada = env.run(`hidratarFonte(${JSON.stringify(fonte)})`);

    assert.equal(fonteHidratada.modulo, 'Módulo 1');
    assert.equal(fonteHidratada.tituloAula, 'Aula de Teste 1');
    assert.equal(fonteHidratada.url, 'https://drive.google.com/file/d/abc/view');
    assert.equal(fonteHidratada.tipo, 'pdf');
    assert.equal(fonteHidratada.statusVerificacao, 'Verificado OK');

    // Aula sem fonte ou inexistente
    const fonteInexistente = { aulaId: 'aula-inexistente' };
    assert.deepEqual(JSON.parse(JSON.stringify(env.run(`hidratarFonte(${JSON.stringify(fonteInexistente)})`))), fonteInexistente);

    // Atividade sem fontes
    const ativSemFontes = { id: 'a1' };
    assert.deepEqual(JSON.parse(JSON.stringify(env.run(`hidratarFontes(${JSON.stringify(ativSemFontes)})`))), ativSemFontes);

    // Atividade com array de fontes
    const ativComFontes = { id: 'a2', fontes: [fonte] };
    const ativHidratada = env.run(`hidratarFontes(${JSON.stringify(ativComFontes)})`);
    assert.equal(ativHidratada.fontes[0].modulo, 'Módulo 1');
  });

  console.log(`\n========================================`);
  console.log(`Finalizado: ${totalTestes - erros}/${totalTestes} aprovados`);
  if (erros > 0) {
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Erro fatal executando os testes:', err);
  process.exitCode = 1;
});
