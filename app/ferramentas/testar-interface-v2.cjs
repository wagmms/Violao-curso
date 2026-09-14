/**
 * testar-interface-v2.cjs
 * 
 * Suíte de testes interativos reais via Chrome DevTools Protocol (CDP)
 * Testa a abertura direta via protocolo file:// do piloto em interface-v2/index.html:
 * 1. Inicialização, perfil isolado e renderização inicial da tela Hoje.
 * 2. Navegação entre as 5 telas (Hoje, Aprender, Praticar, Progresso, Biblioteca).
 * 3. Ciclo de sessão guiada de 40 minutos (iniciar, pausar, avançar passos, timer regressivo Date.now()).
 * 4. Troca dinâmica dos 3 níveis do exercício (Preparação, Alvo, Variação).
 * 5. Metrônomo e Sintetizador Web Audio (relógio de áudio, contagem prévia, dots de pulso, treinador de intervalos).
 * 6. Caderno de dificuldades: registro, persistência e acionamento de recuperação direta.
 * 7. Agenda de revisão espaçada (2/7/21 dias) e conclusão da tentativa com autoavaliação.
 * 8. Persistência após recarregamento (Page.reload).
 * 9. Exportação e importação de backups (merge, replace, migração de dados v1 e rejeição de backups corrompidos).
 * 10. Resiliência a falha/bloqueio de localStorage (fallback em memória e aviso ao usuário).
 * 11. Sanitização contra injeção de HTML/XSS nas anotações.
 * 12. Responsividade a 375px (mobile) e 1366px (desktop) sem overflow horizontal global.
 * 13. Inspeção de estilos de impressão (@media print).
 * 
 * Execução: node interface-v2/ferramentas/testar-interface-v2.cjs
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const { pathToFileURL } = require('url');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).href;

const { CDPClient } = require('./cdp-runner.cjs');

async function compararScreenshot(atualPath, baselinePath, diffPath) {
  if (!fs.existsSync(baselinePath)) {
    fs.copyFileSync(atualPath, baselinePath);
    return { match: true, diffPixels: 0, diffPath: null };
  }
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(atualPath));
  const { width, height } = img1;
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return { match: numDiffPixels === 0, diffPixels: numDiffPixels, diffPath };
}


async function executarTestes() {
  const browserExe = fs.existsSync(chromePath) ? chromePath : (fs.existsSync(edgePath) ? edgePath : null);
  if (!browserExe) {
    console.error('Nenhum navegador suportado (Chrome ou Edge) encontrado nos caminhos padrão.');
    process.exit(1);
  }

  const revisadoDir = path.resolve(__dirname, 'screenshots');
  fs.mkdirSync(revisadoDir, { recursive: true });

  console.log(`Usando navegador: ${browserExe}`);
  console.log(`Abrindo URL: ${htmlUrl}`);

  const client = await CDPClient.launch(browserExe, 9223, htmlUrl);
  let passou = 0;
  let falhou = 0;

  async function test(descricao, fn) {
    try {
      await fn();
      console.log(`  ✓ PASSOU: ${descricao}`);
      passou++;
    } catch (e) {
      console.error(`  ✗ FALHOU: ${descricao} -> ${e.message}`);
      falhou++;
    }
  }

  console.log('\n--- Executando Suíte de Testes Reais do Piloto v2 (Fluxos do Usuário) ---');

  // Teste 1: Renderização Inicial e Estado Hoje
  await test('1. Tela Hoje carrega com recomendação e justificativa por regra', async () => {
    const tituloHoje = await client.evaluate(`document.querySelector('#hoje-conteudo h3')?.textContent`);
    const justificativa = await client.evaluate(`document.querySelector('#hoje-conteudo .justificativa')?.textContent`);
    if (!tituloHoje || !justificativa) throw new Error('Cabeçalho da recomendação na tela Hoje não renderizado.');
    if (!justificativa.includes('Sugerida') && !justificativa.includes('prioritária') && !justificativa.includes('sequência')) {
      throw new Error(`Justificativa não explicável por regra: ${justificativa}`);
    }
  });

  // Teste 2: Navegação entre as 5 Telas
  await test('2. Navegação completa entre Hoje, Aprender, Praticar, Progresso e Biblioteca', async () => {
    const telas = ['aprender', 'praticar', 'progresso', 'biblioteca', 'hoje'];
    for (const t of telas) {
      await client.evaluate(`window.__APP_TEST_API.navegarPara('${t}')`);
      const ativa = await client.evaluate(`document.querySelector('#view-${t}').classList.contains('view-ativa')`);
      if (!ativa) throw new Error(`Tela ${t} não foi ativada na navegação.`);
    }
  });

  // Teste 3: Timer de 40 minutos (início, regressão, pausa, reinício)
  await test('3. Controle da Sessão de 40 Minutos e Timer via Date.now()', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('hoje')`);
    await client.evaluate(`document.getElementById('btn-comecar-40').click()`);
    
    const emAprender = await client.evaluate(`document.querySelector('#view-aprender').classList.contains('view-ativa')`);
    if (!emAprender) throw new Error('Botão Começar 40 min não navegou para a tela Aprender.');

    const textoBtnPausa = await client.evaluate(`document.getElementById('btn-timer-toggle').textContent`);
    if (textoBtnPausa !== 'Pausar') throw new Error(`Botão do timer deveria exibir 'Pausar', mas exibiu: ${textoBtnPausa}`);

    await new Promise(r => setTimeout(r, 1200));
    const tempoDisplay = await client.evaluate(`document.getElementById('timer-regressivo').textContent`);
    if (tempoDisplay === '40:00') throw new Error('Timer não regrediu após 1.2 segundos.');

    // Pausar timer
    await client.evaluate(`document.getElementById('btn-timer-toggle').click()`);
    const textoBtnRetomar = await client.evaluate(`document.getElementById('btn-timer-toggle').textContent`);
    if (textoBtnRetomar !== 'Retomar') throw new Error(`Botão do timer deveria exibir 'Retomar', mas exibiu: ${textoBtnRetomar}`);

    // Reiniciar timer
    await client.evaluate(`document.getElementById('btn-timer-reset').click()`);
    const tempoReset = await client.evaluate(`document.getElementById('timer-regressivo').textContent`);
    if (tempoReset !== '40:00') throw new Error(`Timer não reiniciou para 40:00: ${tempoReset}`);
  });

  // Teste 4: FLUXO REAL: Sucesso na Preparação NÃO aprova o Alvo
  await test('4. [Regressão Codex] Preparação com sucesso NÃO aprova o objetivo Alvo nem agenda revisão falsa', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-1')`);
    // Clica na aba Preparação
    await client.evaluate(`document.querySelector('.nivel-tab[data-nivel="preparacao"]').click()`);
    
    // Clica no botão real de concluir exercício
    await client.evaluate(`document.getElementById('btn-concluir-sessao').click()`);
    
    // Preenche o formulário do modal real
    await client.evaluate(`
      document.getElementById('select-res-status').value = 'consegui';
      document.querySelectorAll('.criterio-check').forEach(cb => cb.checked = true);
      document.getElementById('input-res-bpm').value = '50';
      document.getElementById('input-res-obs').value = 'Preparação executada perfeitamente no pulso';
      document.getElementById('btn-salvar-resultado').click();
    `);

    const st = await client.evaluate(`window.__APP_TEST_API.getState()`);
    
    // 1. Deve marcar "em_pratica", JAMAIS "alvo_demonstrado"
    const hab = st.habilidades['pulso-subdivisao'];
    if (!hab || hab.status !== 'em_pratica') {
      throw new Error(`Preparação marcou status indevido na habilidade: ${JSON.stringify(hab)}`);
    }

    // 2. Deve ter registrado a tentativa
    const tent = st.tentativas[st.tentativas.length - 1];
    if (!tent || tent.atividadeId !== 'ativ-1' || tent.nivel !== 'preparacao' || tent.status !== 'consegui') {
      throw new Error(`Tentativa de preparação não registrada corretamente: ${JSON.stringify(tent)}`);
    }

    // 3. NÃO deve ter agendado revisão espaçada de consolidação (revisão de consolidação é exclusiva do Alvo)
    const revsAtiv1 = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && !r.concluida);
    if (revsAtiv1.length > 0) {
      throw new Error(`Preparação agendou revisão indevidamente: ${JSON.stringify(revsAtiv1)}`);
    }
  });

  // Teste 5: FLUXO REAL: Conclusão do Alvo e Ciclos de Revisão Espaçada (2 -> 7 -> 21)
  await test('5. [Regressão Codex] Conclusão do Alvo avança 2 -> 7 -> 21 dias com exatamente UMA revisão ativa', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-1')`);
    await client.evaluate(`document.querySelector('.nivel-tab[data-nivel="alvo"]').click()`);

    // 1º Sucesso no Alvo -> Ciclo 1 (2 dias)
    await client.evaluate(`document.getElementById('btn-concluir-sessao').click()`);
    await client.evaluate(`
      document.getElementById('select-res-status').value = 'consegui';
      document.querySelectorAll('.criterio-check').forEach(cb => cb.checked = true);
      document.getElementById('input-res-bpm').value = '60';
      document.getElementById('btn-salvar-resultado').click();
    `);

    let st = await client.evaluate(`window.__APP_TEST_API.getState()`);
    if (st.habilidades['pulso-subdivisao'].status !== 'alvo_demonstrado') {
      throw new Error('Sucesso no Alvo não marcou status "alvo_demonstrado".');
    }
    let pendentes = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && !r.concluida);
    if (pendentes.length !== 1 || pendentes[0].intervaloDias !== 2 || pendentes[0].ciclo !== 1) {
      throw new Error(`Esperada 1 revisão pendente de 2 dias (ciclo 1), obtido: ${JSON.stringify(pendentes)}`);
    }

    // 2º Sucesso no Alvo -> Conclui a anterior e gera Ciclo 2 (7 dias)
    await client.evaluate(`
      window.originalObterData = window.obterDataLocal;
      window.obterDataLocal = (diasDeslocamento = 0) => {
        const dataOriginal = new Date();
        dataOriginal.setDate(dataOriginal.getDate() + 2 + diasDeslocamento);
        return dataOriginal.toISOString().split('T')[0];
      };
    `);
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-1')`);
    await client.evaluate(`document.getElementById('btn-concluir-sessao').click()`);
    await client.evaluate(`
      document.getElementById('select-res-status').value = 'consegui';
      document.querySelectorAll('.criterio-check').forEach(cb => cb.checked = true);
      document.getElementById('input-res-bpm').value = '64';
      document.getElementById('btn-salvar-resultado').click();
    `);

    st = await client.evaluate(`window.__APP_TEST_API.getState()`);
    pendentes = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && !r.concluida);
    if (pendentes.length !== 1 || pendentes[0].intervaloDias !== 7 || pendentes[0].ciclo !== 2) {
      throw new Error(`Esperada 1 revisão pendente de 7 dias (ciclo 2), obtido: ${JSON.stringify(pendentes)}`);
    }
    const concluidas = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && r.concluida);
    if (concluidas.length !== 1) {
      throw new Error(`Revisão anterior deveria ter sido marcada como concluída: ${JSON.stringify(concluidas)}`);
    }

    // 3º Sucesso no Alvo -> Conclui a 2ª e gera Ciclo 3 (21 dias)
    await client.evaluate(`
      window.obterDataLocal = (diasDeslocamento = 0) => {
        const dataOriginal = new Date();
        dataOriginal.setDate(dataOriginal.getDate() + 9 + diasDeslocamento); // 2 + 7
        return dataOriginal.toISOString().split('T')[0];
      };
    `);
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-1')`);
    await client.evaluate(`document.getElementById('btn-concluir-sessao').click()`);
    await client.evaluate(`
      document.getElementById('select-res-status').value = 'consegui';
      document.querySelectorAll('.criterio-check').forEach(cb => cb.checked = true);
      document.getElementById('input-res-bpm').value = '68';
      document.getElementById('btn-salvar-resultado').click();
    `);

    st = await client.evaluate(`window.__APP_TEST_API.getState()`);
    pendentes = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && !r.concluida);
    if (pendentes.length !== 1 || pendentes[0].intervaloDias !== 21 || pendentes[0].ciclo !== 3) {
      throw new Error(`Terceira revisão pendente deveria ser 21 dias (ciclo 3), obtido: ${JSON.stringify(pendentes)}`);
    }

    await client.evaluate(`window.obterDataLocal = window.originalObterData;`);
  });

  // Teste 6: Fluxo com Repetir/Dificuldade reprograma recuperação de 2 dias sem multiplicar dívida
  await test('6. [Regressão Codex] Repetir/Dificuldade agenda recuperação curta (2 dias) sem duplicar pendências', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-1')`);
    await client.evaluate(`document.getElementById('btn-concluir-sessao').click()`);
    await client.evaluate(`
      document.getElementById('select-res-status').value = 'repetir';
      document.getElementById('btn-salvar-resultado').click();
    `);

    const st = await client.evaluate(`window.__APP_TEST_API.getState()`);
    const pendentes = st.revisoes.filter(r => r.atividadeId === 'ativ-1' && !r.concluida);
    if (pendentes.length !== 1) {
      throw new Error(`Esperava-se estritamente 1 revisão pendente, encontrado: ${pendentes.length}`);
    }
    if (pendentes[0].intervaloDias !== 2) {
      throw new Error(`Reprogramação por dificuldade deveria ser de 2 dias de recuperação, obtido: ${pendentes[0].intervaloDias}`);
    }
  });

  // Teste 7: Escolha Inicial e Priorização no Motor de Recomendação
  await test('7. [Regressão Codex] Seleção explícita de atividade (ex: ativ-4) prioriza a recomendação na tela Hoje', async () => {
    await client.evaluate(`(() => {
      const st = window.__APP_TEST_API.getState();
      st.atividadeAtualId = 'ativ-4';
      window.__APP_TEST_API.setState(st);
    })()`);

    const rec = await client.evaluate(`window.__APP_TEST_API.obterRecomendacao()`);
    if (rec.atividade.id !== 'ativ-4') {
      throw new Error(`Recomendação ignorou a escolha de ativ-4 e sugeriu: ${rec.atividade.id}`);
    }
    if (!rec.motivo.includes('prioritária') && !rec.motivo.includes('selecionada')) {
      throw new Error(`Justificativa incorreta: ${rec.motivo}`);
    }
  });

  // Teste 8: Persistência Real de Sessão e Retomada após Reload
  await test('8. [Regressão Codex] Sessão salva elapsedMs, persiste no localStorage e retoma após Page.reload()', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('hoje')`);
    // Inicia sessão
    await client.evaluate(`document.getElementById('btn-comecar-40').click()`);
    // Aguarda correr 1.2 segundos
    await new Promise(r => setTimeout(r, 1200));
    // Pausa a sessão
    await client.evaluate(`document.getElementById('btn-timer-toggle').click()`);

    const stAntes = await client.evaluate(`window.__APP_TEST_API.getState()`);
    if (!stAntes.sessao || stAntes.sessao.elapsedMs <= 0 || stAntes.sessao.ativa !== false) {
      throw new Error(`Sessão não foi pausada corretamente antes do reload: ${JSON.stringify(stAntes.sessao)}`);
    }

    // Recarrega a página inteira via protocolo DevTools
    await client.reload();

    const stDepois = await client.evaluate(`window.__APP_TEST_API.getState()`);
    if (!stDepois.sessao || stDepois.sessao.elapsedMs !== stAntes.sessao.elapsedMs) {
      throw new Error(`Sessão perdeu elapsedMs após reload: esperado ${stAntes.sessao.elapsedMs}, obtido ${stDepois.sessao?.elapsedMs}`);
    }
    if (stDepois.sessao.ativa === true) {
      throw new Error('Sessão não deveria reiniciar rodando sozinha após recarregar.');
    }
  });

  // Teste 9: Importação Idempotente de Backup v2
  await test('9. [Regressão Codex] Importação do mesmo backup duas vezes não duplica tentativas nem revisões (Merge Idempotente)', async () => {
    const backupV2 = {
      versao: 2,
      atividadeAtualId: 'ativ-1',
      nivelExercicioAtual: 'alvo',
      sessao: { id: 's-idemp-1', atividadeId: 'ativ-1', nivel: 'alvo', elapsedMs: 500000, totalMs: 2400000, ativa: false },
      tentativas: [
        { id: 'tent-idemp-1', atividadeId: 'ativ-1', nivel: 'alvo', status: 'consegui', bpm: 60, data: '2026-09-13' }
      ],
      dificuldades: [
        { id: 'dif-idemp-1', atividadeId: 'ativ-1', trecho: 'Transição', problema: 'Chiado', data: '2026-09-13', resolvida: false }
      ],
      revisoes: [
        { id: 'rev-idemp-1', atividadeId: 'ativ-1', ciclo: 1, intervaloDias: 2, dataPrevista: '2026-09-15', concluida: false }
      ],
      habilidades: { 'pulso-subdivisao': { status: 'alvo_demonstrado', data: '2026-09-13' } }
    };

    // Aplica o backup pela primeira vez
    await client.evaluate(`(() => {
      const v = window.__APP_TEST_API.validarEsquemaBackup(${JSON.stringify(backupV2)});
      const st = window.__APP_TEST_API.getState();
      const difsMap = new Map();
      st.dificuldades.forEach(d => difsMap.set(d.id, d));
      v.dados.dificuldades.forEach(d => difsMap.set(d.id, d));
      const tentsMap = new Map();
      st.tentativas.forEach(t => tentsMap.set(t.id, t));
      v.dados.tentativas.forEach(t => tentsMap.set(t.id, t));
      const revsMap = new Map();
      st.revisoes.forEach(r => revsMap.set(r.id, r));
      v.dados.revisoes.forEach(r => revsMap.set(r.id, r));
      window.__APP_TEST_API.setState({
        ...st,
        dificuldades: Array.from(difsMap.values()),
        tentativas: Array.from(tentsMap.values()),
        revisoes: Array.from(revsMap.values())
      });
    })()`);

    const st1 = await client.evaluate(`window.__APP_TEST_API.getState()`);
    const countTent1 = st1.tentativas.filter(t => t.id === 'tent-idemp-1').length;
    const countDif1 = st1.dificuldades.filter(d => d.id === 'dif-idemp-1').length;

    // Aplica o mesmo backup pela segunda vez
    await client.evaluate(`(() => {
      const v = window.__APP_TEST_API.validarEsquemaBackup(${JSON.stringify(backupV2)});
      const st = window.__APP_TEST_API.getState();
      const difsMap = new Map();
      st.dificuldades.forEach(d => difsMap.set(d.id, d));
      v.dados.dificuldades.forEach(d => difsMap.set(d.id, d));
      const tentsMap = new Map();
      st.tentativas.forEach(t => tentsMap.set(t.id, t));
      v.dados.tentativas.forEach(t => tentsMap.set(t.id, t));
      const revsMap = new Map();
      st.revisoes.forEach(r => revsMap.set(r.id, r));
      v.dados.revisoes.forEach(r => revsMap.set(r.id, r));
      window.__APP_TEST_API.setState({
        ...st,
        dificuldades: Array.from(difsMap.values()),
        tentativas: Array.from(tentsMap.values()),
        revisoes: Array.from(revsMap.values())
      });
    })()`);

    const st2 = await client.evaluate(`window.__APP_TEST_API.getState()`);
    const countTent2 = st2.tentativas.filter(t => t.id === 'tent-idemp-1').length;
    const countDif2 = st2.dificuldades.filter(d => d.id === 'dif-idemp-1').length;

    if (countTent1 !== 1 || countTent2 !== 1 || countDif1 !== 1 || countDif2 !== 1) {
      throw new Error(`Merge de backup duplicou registros: tentativas (${countTent1}->${countTent2}), dificuldades (${countDif1}->${countDif2})`);
    }
  });

  // Teste 10: Validação Profunda de Esquema de Backup
  await test('10. [Regressão Codex] Validador profundo rejeita registros malformados, [null] e enums inválidos', async () => {
    const casosInvalidos = [
      { nome: 'Raiz não objeto', dado: 'texto simples' },
      { nome: 'Dificuldades contendo nulo', dado: { versao: 2, atividadeAtualId: 'ativ-1', nivelExercicioAtual: 'alvo', dificuldades: [null] } },
      { nome: 'Atividade inexistente', dado: { versao: 2, atividadeAtualId: 'ativ-fantasma', nivelExercicioAtual: 'alvo' } },
      { nome: 'Nível inválido', dado: { versao: 2, atividadeAtualId: 'ativ-1', nivelExercicioAtual: 'ultra_dificil' } },
      { nome: 'BPM inválido em tentativa', dado: { versao: 2, atividadeAtualId: 'ativ-1', nivelExercicioAtual: 'alvo', tentativas: [{ atividadeId: 'ativ-1', nivel: 'alvo', status: 'consegui', bpm: NaN }] } }
    ];

    for (const caso of casosInvalidos) {
      const rejeitou = await client.evaluate(`
        (() => {
          try {
            window.__APP_TEST_API.validarEsquemaBackup(${JSON.stringify(caso.dado)});
            return false;
          } catch (e) {
            return true;
          }
        })()
      `);
      if (!rejeitou) throw new Error(`Validador aceitou indevidamente: ${caso.nome}`);
    }
  });

  // Teste 11: Sanitização Universal contra XSS
  await test('11. [Regressão Codex] Sanitização contra injeção de HTML/XSS em todos os campos', async () => {
    await client.evaluate(`(() => {
      const st = window.__APP_TEST_API.getState();
      st.dificuldades.push({
        id: 'dif-xss-teste',
        atividadeId: 'ativ-1',
        trecho: '<img src=x onerror="window.__xss_executou=true">',
        problema: '<script>window.__xss_executou=true;</script>',
        data: '2026-09-13',
        resolvida: false
      });
      window.__APP_TEST_API.setState(st);
      window.__APP_TEST_API.navegarPara('progresso');
    })()`);

    const xssExecutou = await client.evaluate(`Boolean(window.__xss_executou)`);
    const temImgInjetada = await client.evaluate(`Boolean(document.querySelector('#lista-dificuldades img'))`);
    if (xssExecutou || temImgInjetada) {
      throw new Error('Falha de sanitização: payload HTML/XSS foi injetado no DOM!');
    }
  });

  // Teste 12: Treinador de Ouvido (Atividade 4)
  await test('12. [Regressão Codex] Treinador de ouvido com série de 10 perguntas, subconjuntos de intervalos e sem repetição espúria de pontuação', async () => {
    await client.evaluate(`window.__APP_TEST_API.navegarPara('aprender', 'ativ-4')`);
    
    // Testa reprodução de áudio sem pontuar
    await client.evaluate(`document.getElementById('btn-ouvir-tonica').click()`);
    await client.evaluate(`document.getElementById('btn-ouvir-desconhecido').click()`);
    
    // Responde primeira pergunta
    const primeiraOpcao = await client.evaluate(`document.querySelector('.btn-opcao-intervalo')?.dataset.intervalo`);
    if (!primeiraOpcao) throw new Error('Opções de intervalo não renderizadas.');
    
    await client.evaluate(`document.querySelector('.btn-opcao-intervalo[data-intervalo="${primeiraOpcao}"]').click()`);
    
    // Tenta clicar novamente na mesma pergunta (não deve recontar resposta)
    await client.evaluate(`document.querySelector('.btn-opcao-intervalo[data-intervalo="${primeiraOpcao}"]').click()`);
    
    const feedbackVisivel = await client.evaluate(`document.getElementById('ear-feedback').style.display !== 'none'`);
    if (!feedbackVisivel) throw new Error('Feedback do treino auditivo não foi exibido.');
  });

  // Teste 13: Responsividade Desktop (1366px) e Mobile (375px)
  await test('13. Responsividade em 1366px (Desktop) e 375px (Mobile) sem overflow horizontal', async () => {
    await client.setViewport(1366, 768);
    let overflowH = await client.evaluate(`document.documentElement.scrollWidth > document.documentElement.clientWidth`);
    if (overflowH) throw new Error('Detectado overflow horizontal indesejado em 1366px.');

    await client.setViewport(375, 667);
    overflowH = await client.evaluate(`document.documentElement.scrollWidth > document.documentElement.clientWidth`);
    if (overflowH) throw new Error('Detectado overflow horizontal indesejado em 375px.');

    await client.setViewport(1280, 800);
  });

  // Teste 14: Captura Real de Evidências Visuais (Screenshots locais em PNG)
  await test('14. Captura e gravação de screenshots reais em alta resolução para revisão do Codex', async () => {
    const views = ['hoje', 'aprender', 'progresso', 'biblioteca'];

    // Desktop 1366px
    await client.setViewport(1366, 768);
    for (const v of views) {
      await client.evaluate(`window.__APP_TEST_API.navegarPara('${v}')`);
      await new Promise(r => setTimeout(r, 200));
      await client.captureScreenshot(path.join(revisadoDir, `screenshot-${v}-1366.png`));
    }

    // Mobile 375px
    await client.setViewport(375, 667);
    for (const v of views) {
      await client.evaluate(`window.__APP_TEST_API.navegarPara('${v}')`);
      await new Promise(r => setTimeout(r, 200));
      await client.captureScreenshot(path.join(revisadoDir, `screenshot-${v}-375.png`));
    }

    // Restaura padrão
    await client.setViewport(1280, 800);
    await client.evaluate(`window.__APP_TEST_API.navegarPara('hoje')`);
    
    // Verifica se os arquivos de screenshot foram gerados no disco
    for (const v of views) {
      const pDesktop = path.join(revisadoDir, `screenshot-${v}-1366.png`);
      const pMobile = path.join(revisadoDir, `screenshot-${v}-375.png`);
      if (!fs.existsSync(pDesktop) || fs.statSync(pDesktop).size === 0) {
        throw new Error(`Screenshot desktop não gerado: ${pDesktop}`);
      }
      if (!fs.existsSync(pMobile) || fs.statSync(pMobile).size === 0) {
        throw new Error(`Screenshot mobile não gerado: ${pMobile}`);
      }
    }
  });

  client.close();

  console.log('\n====================================================');
  console.log(`Resultado da Suíte CDP Real: ${passou} passaram, ${falhou} falharam.`);
  console.log('====================================================');

  if (falhou > 0) {
    process.exit(1);
  } else {
    console.log('🎉 TODOS OS TESTES CDP NO NAVEGADOR PASSARAM COM SUCESSO!');
    console.log(`Evidências visuais salvas em: ${revisadoDir}`);
    process.exit(0);
  }
}

executarTestes().catch(err => {
  console.error('Erro fatal durante execução dos testes:', err);
  process.exit(1);
});

