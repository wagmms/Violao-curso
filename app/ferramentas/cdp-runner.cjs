const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

let WebSocket;
try {
  WebSocket = require('ws');
} catch (e) {
  console.error('Este script exige o pacote ws. Rode: npm install ws');
  process.exit(1);
}

class CDPClient {
  constructor(port, proc, profileDir) {
    this.port = port;
    this.proc = proc;
    this.profileDir = profileDir;
    this.ws = null;
    this.msgId = 1;
    this.pending = new Map();
  }

  static async launch(browserExe, port, url) {
    const profileDir = path.join(process.env.TEMP || 'C:\\temp', `cdp_v2_${port}_${Date.now()}`);
    fs.mkdirSync(profileDir, { recursive: true });

    const proc = spawn(browserExe, [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      '--disable-gpu',
      '--no-first-run',
      url
    ]);

    proc.stderr.on('data', () => {});
    const client = new CDPClient(port, proc, profileDir);

    for (let i = 0; i < 40; i++) {
      try {
        const json = await client.fetchTargets();
        const page = json.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
        if (page) {
          await client.connect(page.webSocketDebuggerUrl);
          // Aguarda renderização inicial
          for (let j = 0; j < 30; j++) {
            const pronto = await client.evaluate(`Boolean(window.__APP_TEST_API && document.getElementById('view-hoje'))`);
            if (pronto) break;
            if (j === 29) {
              const err = await client.evaluate(`document.body.innerHTML.substring(0, 1000) + '...'`);
              console.log('BROWSER FATAL ERROR:', err);
            }
            await new Promise(r => setTimeout(r, 100));
          }
          return client;
        }
      } catch (e) {
        await new Promise(r => setTimeout(r, 250));
      }
    }
    proc.kill();
    throw new Error(`Falha ao conectar no CDP na porta ${port}`);
  }

  fetchTargets() {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${this.port}/json`, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      }).on('error', reject);
    });
  }

  connect(wsUrl) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = err => reject(err);
      this.ws.onmessage = msg => {
        const data = JSON.parse(msg.data);
        if (data.id && this.pending.has(data.id)) {
          const { resolve, reject } = this.pending.get(data.id);
          this.pending.delete(data.id);
          if (data.error) reject(new Error(JSON.stringify(data.error)));
          else resolve(data.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res && res.exceptionDetails) {
      throw new Error(`Erro na avaliação JS: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res && res.result ? res.result.value : undefined;
  }

  async reload() {
    await this.send('Page.reload');
    for (let j = 0; j < 30; j++) {
      await new Promise(r => setTimeout(r, 100));
      const pronto = await this.evaluate(`Boolean(window.__APP_TEST_API && document.getElementById('view-hoje'))`);
      if (pronto) break;
    }
  }

  async setViewport(width, height) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width <= 768
    });
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    if (res && res.data) {
      fs.writeFileSync(outputPath, Buffer.from(res.data, 'base64'));
    }
  }

  close() {
    try { if (this.ws) this.ws.close(); } catch (e) {}
    try { this.proc.kill(); } catch (e) {}
    try { fs.rmSync(this.profileDir, { recursive: true, force: true }); } catch (e) {}
  }
}

module.exports = { CDPClient };
