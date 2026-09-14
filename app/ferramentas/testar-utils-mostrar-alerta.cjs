const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {JSDOM, VirtualConsole} = require('jsdom');
const dir = path.resolve(__dirname, '..');

async function ambiente(htmlConteudo = '<dialog id="modal-alerta"></dialog>') {
  const dom = new JSDOM(htmlConteudo, { runScripts: 'outside-only' });
  const w = dom.window;

  w.HTMLDialogElement.prototype.showModal = function() { this.open = true; };
  w.HTMLDialogElement.prototype.close = function() { this.open = false; };

  const utilsCode = fs.readFileSync(path.join(dir, 'utils.js'), 'utf8');
  new vm.Script(utilsCode).runInContext(dom.getInternalVMContext());

  return { dom, w, run: code => vm.runInContext(code, dom.getInternalVMContext()) };
}

async function testarModalInexistente() {
  const a = await ambiente('<div></div>'); // sem modal-alerta
  a.w.alert = (msg) => { a.w.alertLog = msg; };

  const promise = a.run('mostrarAlerta("Mensagem de erro")');
  const result = await promise;

  assert.equal(a.w.alertLog, 'Mensagem de erro');
  assert.equal(result, true);
  console.log('OK: Modal inexistente usa alert nativo');
}

async function testarModalExistenteFluxoOk() {
  const a = await ambiente(`
    <dialog id="modal-alerta">
      <h2 id="alerta-titulo"></h2>
      <div id="alerta-corpo"></div>
      <button id="btn-alerta-cancelar">Cancelar</button>
      <button id="btn-alerta-ok">OK</button>
      <button id="btn-fechar-alerta">X</button>
    </dialog>
  `);

  const promise = a.run('mostrarAlerta("Minha mensagem\\ncom quebra", "Meu Titulo")');

  const modal = a.w.document.getElementById('modal-alerta');
  assert.equal(modal.open, true);
  assert.equal(a.w.document.getElementById('alerta-titulo').textContent, 'Meu Titulo');
  assert.equal(a.w.document.getElementById('alerta-corpo').innerHTML, 'Minha mensagem<br>com quebra');
  assert.equal(a.w.document.getElementById('btn-alerta-cancelar').style.display, 'none');

  // simula click no OK
  a.w.document.getElementById('btn-alerta-ok').onclick();
  const result = await promise;

  assert.equal(modal.open, false);
  assert.equal(result, true);
  console.log('OK: Modal existente fluxo OK');
}

async function testarModalExistenteFluxoFechar() {
  const a = await ambiente(`
    <dialog id="modal-alerta">
      <h2 id="alerta-titulo"></h2>
      <div id="alerta-corpo"></div>
      <button id="btn-alerta-cancelar">Cancelar</button>
      <button id="btn-alerta-ok">OK</button>
      <button id="btn-fechar-alerta">X</button>
    </dialog>
  `);

  const promise = a.run('mostrarAlerta("Msg", "Titulo")');
  const modal = a.w.document.getElementById('modal-alerta');

  // simula click no Fechar
  a.w.document.getElementById('btn-fechar-alerta').onclick();
  const result = await promise;

  assert.equal(modal.open, false);
  assert.equal(result, false);
  console.log('OK: Modal existente fluxo Fechar (X)');
}

async function testarEscapeHtml() {
    const a = await ambiente(`
      <dialog id="modal-alerta">
        <h2 id="alerta-titulo"></h2>
        <div id="alerta-corpo"></div>
        <button id="btn-alerta-cancelar"></button>
        <button id="btn-alerta-ok"></button>
        <button id="btn-fechar-alerta"></button>
      </dialog>
    `);

    a.run('mostrarAlerta("<script>alert(1)</script>&\\"\'", "Titulo")');
    assert.equal(a.w.document.getElementById('alerta-corpo').innerHTML, '&lt;script&gt;alert(1)&lt;/script&gt;&amp;"\'');
    console.log('OK: Escape HTML');
}

async function main() {
  await testarModalInexistente();
  await testarModalExistenteFluxoOk();
  await testarModalExistenteFluxoFechar();
  await testarEscapeHtml();
  console.log('Todos os testes passaram!');
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
