import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserExe = fs.existsSync(edgePath) ? edgePath : chromePath;

console.log(`Usando navegador para automação: ${browserExe}`);

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'violao-browser-test-'));
const htmlPath = path.resolve('interface/index.html');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

console.log(`Perfil temporário isolado: ${tmpDir}`);
console.log(`URL de teste: ${fileUrl}`);

const port = 9223;
const browserProc = spawn(browserExe, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tmpDir}`,
  '--no-first-run',
  '--no-default-browser-check',
  fileUrl
], { stdio: 'ignore' });

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function waitForEndpoint() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find(x => x.type === 'page');
        if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch (e) {}
    await delay(300);
  }
  throw new Error('Não foi possível conectar à porta CDP do navegador');
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Erro na avaliação: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    this.ws.close();
  }
}

async function runTests() {
  const steps = [];
  try {
    const wsUrl = await waitForEndpoint();
    console.log(`CDP conectado em: ${wsUrl}`);
    const client = new CdpClient(wsUrl);
    await client.connect();
    await client.send('Runtime.enable');
    await client.send('Page.enable');

    // 1. Verificar carregamento e título
    const title = await client.eval('document.title');
    steps.push({ step: '1. Carregamento da página', ok: title === 'Curso de Violão — Método Tríade', details: title });

    // 2. Verificar total de aulas catalogadas no DOM (apenas cards de aula)
    const totalAulas = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '2. Renderização de aulas iniciais', ok: totalAulas === 300, details: `${totalAulas} aulas no catálogo` });

    // 3. Verificar presença do Mapa de Estudo no modal
    await client.eval('document.getElementById("btn-mapa").click()');
    const modalAberto = await client.eval('document.getElementById("modal-mapa").open');
    const modalTexto = await client.eval('document.getElementById("corpo-mapa").textContent.slice(0, 80)');
    steps.push({ step: '3. Abertura do Modal de Mapa de Estudo', ok: modalAberto && modalTexto.includes('Curso de Violão'), details: modalTexto });

    // Fechar modal
    await client.eval('document.getElementById("fechar-mapa").click()');
    const modalFechado = await client.eval('!document.getElementById("modal-mapa").open');
    steps.push({ step: '4. Fechamento do Modal de Mapa de Estudo', ok: modalFechado, details: 'Modal fechado com sucesso' });

    // 5. Testar abertura do Guia de Estudo da Aula 01 (aula-mod-1-1)
    const temGuiaAula1 = await client.eval(`(() => {
      const card = document.querySelector('#catalogo > section > details');
      const guia = card ? card.querySelector('.guia-estudo') : null;
      return Boolean(guia);
    })()`);
    steps.push({ step: '5. Presença do Guia Homologado na Aula 1', ok: temGuiaAula1, details: 'Elemento .guia-estudo encontrado' });

    // Abrir guia e ler conteúdo
    const guiaConteudo = await client.eval(`(() => {
      const card = document.querySelector('#catalogo > section > details');
      const guia = card.querySelector('.guia-estudo');
      guia.open = true;
      const editorial = guia.querySelector('.guia-editorial')?.textContent;
      const obj = guia.textContent.includes('Objetivo Pedagógico');
      const orc = guia.textContent.includes('Gestão do Tempo');
      const prat = guia.textContent.includes('Sugestão de Prática');
      const dif = guia.textContent.includes('Ponto Crítico');
      return { editorial, ok: Boolean(editorial && obj && orc && prat && dif) };
    })()`);
    steps.push({ step: '6. Inspeção dos campos obrigatórios do Guia', ok: guiaConteudo.ok, details: guiaConteudo.editorial });

    // 6. Verificar ausência de botão fantasma em aula do Módulo 2
    const guiasMod2 = await client.eval(`(() => {
      const sections = document.querySelectorAll('#catalogo section');
      const secMod2 = Array.from(sections).find(s => s.querySelector('h2')?.textContent.includes('Módulo 2'));
      const guias = secMod2 ? secMod2.querySelectorAll('.guia-estudo').length : -1;
      return guias;
    })()`);
    steps.push({ step: '7. Ausência de guias fantasmas no Módulo 2', ok: guiasMod2 === 0, details: `Total guias renderizados no Módulo 2: ${guiasMod2} (zero fantasma)` });

    // 7. Testar filtros (filtro com_guia)
    await client.eval(`(() => {
      const sel = document.getElementById('tipo');
      sel.value = 'com_guia';
      sel.dispatchEvent(new Event('change'));
    })()`);
    const countGuias = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '8. Filtro "Com guia de estudo"', ok: countGuias === 46, details: `${countGuias} aulas exibidas (exatamente as 46 do Módulo 1)` });

    // Resetar filtro de tipo antes de buscar texto no catálogo todo
    await client.eval(`(() => {
      const sel = document.getElementById('tipo');
      sel.value = 'todos';
      sel.dispatchEvent(new Event('change'));
    })()`);

    // 8. Testar busca textual
    await client.eval(`(() => {
      const busca = document.getElementById('busca');
      busca.value = 'pestana';
      busca.dispatchEvent(new Event('input'));
    })()`);
    const countBusca = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '9. Busca textual por "pestana"', ok: countBusca > 0, details: `${countBusca} aulas encontradas` });

    // Limpar filtros
    await client.eval(`(() => {
      document.getElementById('busca').value = '';
      document.getElementById('busca').dispatchEvent(new Event('input'));
      document.getElementById('tipo').value = 'todos';
      document.getElementById('tipo').dispatchEvent(new Event('change'));
    })()`);

    // 9. Salvar anotação e marcações na aula-mod-1-1
    await client.eval(`(() => {
      const card = document.querySelector('details');
      const chkAssistida = card.querySelector('input[data-field="assistidos"]');
      const chkPraticada = card.querySelector('input[data-field="praticados"]');
      const nota = card.querySelector('textarea');
      chkAssistida.checked = true;
      chkAssistida.dispatchEvent(new Event('change'));
      chkPraticada.checked = true;
      chkPraticada.dispatchEvent(new Event('change'));
      nota.value = 'Anotação de teste do Lote 6: afinação perfeita e postura conferida.';
      nota.dispatchEvent(new Event('input'));
    })()`);

    const salvoNoStorage = await client.eval(`(() => {
      const raw = localStorage.getItem('metodo_triade_geral_v1');
      const data = JSON.parse(raw);
      return {
        assistidos: data.assistidos.includes('aula-mod-1-1'),
        praticados: data.praticados.includes('aula-mod-1-1'),
        nota: data.notas['aula-mod-1-1']
      };
    })()`);
    steps.push({
      step: '10. Gravação em localStorage (persistência real)',
      ok: salvoNoStorage.assistidos && salvoNoStorage.praticados && salvoNoStorage.nota.includes('Lote 6'),
      details: salvoNoStorage.nota
    });

    // 10. Recarregar a página (Page.reload) e verificar se dados foram preservados!
    await client.send('Page.reload');
    await delay(1000);

    const aposReload = await client.eval(`(() => {
      const card = document.querySelector('details');
      const chkAssistida = card.querySelector('input[data-field="assistidos"]');
      const chkPraticada = card.querySelector('input[data-field="praticados"]');
      const nota = card.querySelector('textarea');
      return {
        assistida: chkAssistida.checked,
        praticada: chkPraticada.checked,
        nota: nota.value
      };
    })()`);
    steps.push({
      step: '11. Reload preservando anotações e marcações',
      ok: aposReload.assistida && aposReload.praticada && aposReload.nota.includes('Lote 6'),
      details: `Preservado: assistida=${aposReload.assistida}, praticada=${aposReload.praticada}, nota="${aposReload.nota}"`
    });

    // 11. Testar emulação de print
    await client.send('Emulation.setEmulatedMedia', { media: 'print' });
    const printOk = await client.eval(`(() => {
      const timerDisplay = window.getComputedStyle(document.querySelector('.timer')).display;
      const toolbarDisplay = window.getComputedStyle(document.querySelector('.toolbar')).display;
      return timerDisplay === 'none' && toolbarDisplay === 'none';
    })()`);
    steps.push({ step: '12. Estilos de impressão (@media print)', ok: printOk, details: 'Timer e Toolbar ocultados corretamente para impressão' });

    client.close();
  } finally {
    browserProc.kill('SIGTERM');
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }

  console.log('\n=== RESULTADO DOS TESTES DE NAVEGADOR (CDP) ===');
  let allOk = true;
  for (const s of steps) {
    const mark = s.ok ? '✔' : '❌';
    console.log(`${mark} ${s.step} -> ${s.details}`);
    if (!s.ok) allOk = false;
  }

  const report = {
    navegador: browserExe,
    data: new Date().toISOString(),
    passou: allOk,
    passos: steps
  };
  fs.writeFileSync('entregas-gemini/lote-6/TESTES-NAVEGADOR.json', JSON.stringify(report, null, 2), 'utf8');
  return allOk;
}

runTests().then(ok => {
  if (!ok) {
    console.error('Falha nos testes de navegador');
    process.exit(1);
  } else {
    console.log('\nTodos os testes de navegador passaram com 100% de conformidade!');
    process.exit(0);
  }
}).catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
