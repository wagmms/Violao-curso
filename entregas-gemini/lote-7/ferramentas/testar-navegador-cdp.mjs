import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserExe = fs.existsSync(edgePath) ? edgePath : chromePath;

console.log(`Usando navegador para automação CDP: ${browserExe}`);

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'violao-browser-lote7-'));
const htmlPath = path.resolve('interface/index.html');
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

console.log(`Perfil temporário isolado: ${tmpDir}`);
console.log(`URL de teste: ${fileUrl}`);

const port = 9224;
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

    // 1. Verificar carregamento e título da aplicação
    const title = await client.eval('document.title');
    steps.push({ step: '1. Carregamento da página', ok: title === 'Curso de Violão — Método Tríade', details: title });

    // 2. Verificar total de aulas catalogadas no DOM (300 aulas originais)
    const totalAulas = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '2. Renderização do catálogo completo', ok: totalAulas === 300, details: `${totalAulas} aulas no catálogo` });

    // 3. Verificar abertura e integridade do Mapa de Estudo no modal
    await client.eval('document.getElementById("btn-mapa").click()');
    const modalAberto = await client.eval('document.getElementById("modal-mapa").open');
    const modalTexto = await client.eval('document.getElementById("corpo-mapa").textContent.slice(0, 80)');
    steps.push({ step: '3. Abertura do Modal do Mapa de Estudo', ok: modalAberto && modalTexto.includes('Curso de Violão'), details: modalTexto });

    // 4. Fechar modal
    await client.eval('document.getElementById("fechar-mapa").click()');
    const modalFechado = await client.eval('!document.getElementById("modal-mapa").open');
    steps.push({ step: '4. Fechamento do Modal do Mapa de Estudo', ok: modalFechado, details: 'Modal fechado com sucesso' });

    // 5. Verificar presença e integridade de guias ativos no Módulo 1 (Aula 1)
    const guiaAula1 = await client.eval(`(() => {
      const card = document.querySelector('#catalogo > section > details');
      const guia = card ? card.querySelector('.guia-estudo') : null;
      if (!guia) return { ok: false };
      guia.open = true;
      const editorial = guia.querySelector('.guia-editorial')?.textContent;
      const obj = guia.textContent.includes('Objetivo Pedagógico');
      const orc = guia.textContent.includes('Gestão do Tempo');
      return { ok: Boolean(editorial && obj && orc), editorial };
    })()`);
    steps.push({ step: '5. Presença de Guia Homologado no Módulo 1', ok: guiaAula1.ok, details: guiaAula1.editorial });

    // 6. Verificar ausência estrita de guias fantasmas no Módulo 4
    const guiasMod4 = await client.eval(`(() => {
      const sections = document.querySelectorAll('#catalogo section');
      const secMod4 = Array.from(sections).find(s => s.querySelector('h2')?.textContent.includes('Módulo 4'));
      return secMod4 ? secMod4.querySelectorAll('.guia-estudo').length : -1;
    })()`);
    steps.push({ step: '6. Isolamento estrito do Módulo 4', ok: guiasMod4 === 0, details: `Guias renderizados no Módulo 4: ${guiasMod4} (zero guias na interface)` });

    // 7. Verificar ausência estrita de guias fantasmas no Módulo 5
    const guiasMod5 = await client.eval(`(() => {
      const sections = document.querySelectorAll('#catalogo section');
      const secMod5 = Array.from(sections).find(s => s.querySelector('h2')?.textContent.includes('Módulo 5'));
      return secMod5 ? secMod5.querySelectorAll('.guia-estudo').length : -1;
    })()`);
    steps.push({ step: '7. Isolamento estrito do Módulo 5', ok: guiasMod5 === 0, details: `Guias renderizados no Módulo 5: ${guiasMod5} (zero guias na interface)` });

    // 8. Testar filtro "Com guia de estudo" (exatamente 128 aulas ativas dos Módulos 1 a 3)
    await client.eval(`(() => {
      const sel = document.getElementById('tipo');
      sel.value = 'com_guia';
      sel.dispatchEvent(new Event('change'));
    })()`);
    const countGuias = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '8. Filtro "Com guia de estudo"', ok: countGuias === 128, details: `${countGuias} aulas exibidas (exatamente 128 dos Módulos 1 a 3 homologados)` });

    // Resetar filtro
    await client.eval(`(() => {
      const sel = document.getElementById('tipo');
      sel.value = 'todos';
      sel.dispatchEvent(new Event('change'));
    })()`);

    // 9. Testar busca textual ("balada")
    await client.eval(`(() => {
      const busca = document.getElementById('busca');
      busca.value = 'balada';
      busca.dispatchEvent(new Event('input'));
    })()`);
    const countBusca = await client.eval('document.querySelectorAll("#catalogo > section > details").length');
    steps.push({ step: '9. Busca textual por termo do curso ("balada")', ok: countBusca > 0, details: `${countBusca} aulas encontradas` });

    // Limpar busca
    await client.eval(`(() => {
      document.getElementById('busca').value = '';
      document.getElementById('busca').dispatchEvent(new Event('input'));
    })()`);

    // 10. Testar persistência real de anotações e progresso em localStorage
    await client.eval(`(() => {
      const card = document.querySelector('details');
      const chkAssistida = card.querySelector('input[data-field="assistidos"]');
      const chkPraticada = card.querySelector('input[data-field="praticados"]');
      const nota = card.querySelector('textarea');
      chkAssistida.checked = true;
      chkAssistida.dispatchEvent(new Event('change'));
      chkPraticada.checked = true;
      chkPraticada.dispatchEvent(new Event('change'));
      nota.value = 'Teste automatizado de persistência Lote 7: acordes e postura OK.';
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
      step: '10. Gravação em localStorage',
      ok: salvoNoStorage.assistidos && salvoNoStorage.praticados && salvoNoStorage.nota.includes('Lote 7'),
      details: salvoNoStorage.nota
    });

    // 11. Recarregar a página e verificar restauração do estado
    await client.send('Page.reload');
    await delay(1200);

    const restaurado = await client.eval(`(() => {
      const card = document.querySelector('details');
      const chkAssistida = card.querySelector('input[data-field="assistidos"]');
      const chkPraticada = card.querySelector('input[data-field="praticados"]');
      const nota = card.querySelector('textarea');
      return {
        assistido: chkAssistida ? chkAssistida.checked : false,
        praticado: chkPraticada ? chkPraticada.checked : false,
        nota: nota ? nota.value : ''
      };
    })()`);
    steps.push({
      step: '11. Restauração de dados após reload',
      ok: restaurado.assistido && restaurado.praticado && restaurado.nota.includes('Lote 7'),
      details: `Marcado e restaurado: ${restaurado.nota}`
    });

    // 12. Testar integridade do estado e esquema de backup em localStorage
    const backupExportado = await client.eval(`(() => {
      const raw = localStorage.getItem('metodo_triade_geral_v1');
      return raw ? JSON.parse(raw) : null;
    })()`);
    steps.push({
      step: '12. Integridade do esquema de backup',
      ok: backupExportado && backupExportado.versao === 1 && backupExportado.assistidos.length > 0,
      details: `Versão do esquema: ${backupExportado?.versao}, aulas assistidas: ${backupExportado?.assistidos?.length}`
    });

    client.close();
  } finally {
    browserProc.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }

  const allPassed = steps.every(s => s.ok);
  const resultadoFinal = {
    data_execucao: new Date().toISOString(),
    motor_navegador: browserExe,
    todas_etapas_passaram: allPassed,
    total_etapas: steps.length,
    etapas_com_sucesso: steps.filter(s => s.ok).length,
    etapas: steps
  };

  const outputJsonPath = path.resolve('entregas-gemini/lote-7/TESTES-NAVEGADOR.json');
  fs.writeFileSync(outputJsonPath, JSON.stringify(resultadoFinal, null, 2), 'utf8');

  // Copia o script para entregas-gemini/lote-7/ferramentas/testar-navegador-cdp.mjs
  const toolsDir = path.resolve('entregas-gemini/lote-7/ferramentas');
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.copyFileSync(new URL(import.meta.url), path.join(toolsDir, 'testar-navegador-cdp.mjs'));

  console.log('\n======================================================');
  console.log('   RESULTADO DOS TESTES EM NAVEGADOR REAL (CDP)');
  console.log('======================================================');
  steps.forEach(s => {
    console.log(`${s.ok ? '✔' : '❌'} ${s.step}: ${s.details}`);
  });
  console.log(`\nStatus final: ${allPassed ? 'TODOS OS TESTES PASSARAM COM SUCESSO' : 'FALHA EM UMA OU MAIS ETAPAS'}`);

  if (!allPassed) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Erro fatal na execução dos testes de navegador:', err);
  process.exit(1);
});
