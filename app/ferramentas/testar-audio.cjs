const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

function createMockAudioContextClass() {
  class MockAudioNode {
    connect() {}
    disconnect() {}
  }

  class MockParam {
    constructor() { this.value = 0; }
    setValueAtTime(val) { this.value = val; }
    linearRampToValueAtTime(val) { this.value = val; }
    exponentialRampToValueAtTime(val) { this.value = val; }
  }

  class MockOscillator extends MockAudioNode {
    constructor() {
      super();
      this.type = 'sine';
      this.frequency = new MockParam();
      this.onended = null;
    }
    start() {}
    stop() {
      if (typeof this.onended === 'function') this.onended();
    }
  }

  class MockGain extends MockAudioNode {
    constructor() {
      super();
      this.gain = new MockParam();
    }
  }

  class MockBufferSource extends MockAudioNode {
    constructor() {
      super();
      this.buffer = null;
      this.onended = null;
    }
    start() {}
    stop() {
      if (typeof this.onended === 'function') this.onended();
    }
  }

  class MockBiquadFilter extends MockAudioNode {
    constructor() {
      super();
      this.type = 'lowpass';
      this.frequency = new MockParam();
      this.Q = new MockParam();
    }
  }

  return class MockAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.sampleRate = 44100;
      this.destination = new MockAudioNode();
    }
    resume() { return Promise.resolve(); }
    createOscillator() { return new MockOscillator(); }
    createGain() { return new MockGain(); }
    createBufferSource() { return new MockBufferSource(); }
    createBiquadFilter() { return new MockBiquadFilter(); }
    createBuffer(channels, length, sampleRate) {
      return {
        getChannelData() { return new Float32Array(length); }
      };
    }
  };
}

function setupEnvironment() {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'https://curso.test/',
    runScripts: 'outside-only'
  });
  const window = dom.window;
  window.AudioContext = createMockAudioContextClass();

  const code = fs.readFileSync(path.join(__dirname, '../audio-motor.js'), 'utf8');
  vm.runInContext(code, dom.getInternalVMContext());

  return { window, AudioMotor: window.AudioMotor };
}

async function runTests() {
  const tests = [];

  function test(name, fn) {
    try {
      fn();
      tests.push({ name, ok: true });
    } catch (err) {
      tests.push({ name, ok: false, err });
    }
  }

  test('AudioMotor dispoinibilidade e inicialização', () => {
    const { AudioMotor } = setupEnvironment();
    assert.equal(AudioMotor.isDisponivel(), true);
    AudioMotor.init();
  });

  test('Metrônomo: alterar e obter BPM', () => {
    const { AudioMotor } = setupEnvironment();
    AudioMotor.setBpm(120);
    assert.equal(AudioMotor.getBpm(), 120);

    // Clamping entre 30 e 240
    AudioMotor.setBpm(10);
    assert.equal(AudioMotor.getBpm(), 30);
    AudioMotor.setBpm(300);
    assert.equal(AudioMotor.getBpm(), 240);
  });

  test('Metrônomo: iniciar e parar', () => {
    const { AudioMotor } = setupEnvironment();
    const iniciado = AudioMotor.iniciarMetronomo(100, 4, false, null);
    assert.equal(iniciado, true);
    assert.equal(AudioMotor.isAtivo(), true);

    AudioMotor.pararMetronomo();
    assert.equal(AudioMotor.isAtivo(), false);
  });

  test('Controle de Ritmo: iniciar, parar e obter/definir estado', () => {
    const { AudioMotor } = setupEnvironment();
    const ok = AudioMotor.iniciarRitmo('bossa', 90);
    assert.equal(ok, true);
    assert.equal(AudioMotor.isRitmoAtivo(), true);
    assert.equal(AudioMotor.getRitmoAtual(), 'bossa');
    assert.equal(AudioMotor.getRitmoBpm(), 90);

    AudioMotor.setRitmoBpm(110);
    assert.equal(AudioMotor.getRitmoBpm(), 110);

    AudioMotor.pararRitmo();
    assert.equal(AudioMotor.isRitmoAtivo(), false);
  });

  test('Controle de Ritmo: padrão inexistente é tratado com segurança', () => {
    const { AudioMotor } = setupEnvironment();
    // Tenta iniciar com padrão inválido
    AudioMotor.iniciarRitmo('padrao_invalido_xyz', 80);
    assert.equal(AudioMotor.isRitmoAtivo(), true);
    assert.equal(AudioMotor.getRitmoAtual(), 'padrao_invalido_xyz');

    // Executar pararRitmo e pararTodosSons
    AudioMotor.pararTodosSons();
    assert.equal(AudioMotor.isRitmoAtivo(), false);
  });

  test('Síntese e Notificações', () => {
    const { AudioMotor } = setupEnvironment();
    AudioMotor.tocarFrequencia(440, 0.5, 0, 'sine');
    AudioMotor.tocarIntervalo(261.63, 4, 'melodico');
    AudioMotor.tocarIntervalo(261.63, 7, 'harmonico');
    AudioMotor.tocarSinalFase();
    AudioMotor.tocarSurdo(0, 0.8);
    AudioMotor.tocarTamborim(0, 0.8);
    AudioMotor.tocarVassourinha(0, 0.8);
    AudioMotor.pararTodosSons();
  });

  console.log('=== Testes AudioMotor ===');
  let aprovados = 0;
  for (const t of tests) {
    if (t.ok) {
      aprovados++;
      console.log(`✓ ${t.name}`);
    } else {
      console.error(`✗ ${t.name}`, t.err);
    }
  }
  console.log(`${aprovados}/${tests.length} aprovados`);
  if (aprovados !== tests.length) {
    process.exitCode = 1;
  }
}

runTests().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
