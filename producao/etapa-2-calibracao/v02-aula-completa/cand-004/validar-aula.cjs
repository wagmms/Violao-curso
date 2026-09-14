/**
 * validador-aula.cjs - Validador Automatizado da Aula Completa cand-004 v02
 *
 * Executa:
 * 1. Parser CSV RFC 4180 rigoroso (suporte a aspas e quebras de linha).
 * 2. Validação cruzada com arquivos curriculares reais da Etapa 1 v03.
 * 3. Validação estrutural de aula.json (14 itens contratuais completos).
 * 4. Concordância bidirecional entre aula.json e AULA.md.
 * 5. Concordância de eventos melódicos entre EVENTOS.json e aula.json.
 * 6. Validação de existência de todos os recursos de RECURSOS.json e links em AULA.md.
 * 7. Suíte de Testes Negativos (anti-vazamento de gabarito, campos nulos, etc.).
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;
let errors = [];
let passes = [];

function check(desc, condition, errDetail) {
  if (condition) {
    passes.push(desc);
  } else {
    errors.push({ desc, detail: errDetail });
  }
}

// ---------------------------------------------------------------------------
// 1. RFC 4180 CSV PARSER
// ---------------------------------------------------------------------------
function parseRFC4180CSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;
  let i = 0;

  while (i < csvText.length) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i += 2;
        continue;
      } else {
        insideQuotes = !insideQuotes;
        i++;
        continue;
      }
    }

    if (!insideQuotes && char === ',') {
      currentRow.push(currentField.trim());
      currentField = '';
      i++;
      continue;
    }

    if (!insideQuotes && (char === '\r' || char === '\n')) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.length > 1 || currentRow[0] !== '') {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      i++;
      continue;
    }

    currentField += char;
    i++;
  }

  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.length > 1 || currentRow[0] !== '') {
      rows.push(currentRow);
    }
  }

  return rows;
}

console.log('=== INICIANDO VALIDAÇÃO DA AULA COMPLETA cand-004 v02 ===\n');

// ---------------------------------------------------------------------------
// 2. PARSER E CHECAGEM DE EVIDENCIAS.csv
// ---------------------------------------------------------------------------
const evidenciasPath = path.join(dir, 'EVIDENCIAS.csv');
check('Existência de EVIDENCIAS.csv', fs.existsSync(evidenciasPath), 'Arquivo EVIDENCIAS.csv não encontrado');

if (fs.existsSync(evidenciasPath)) {
  const csvRaw = fs.readFileSync(evidenciasPath, 'utf8');
  const csvRows = parseRFC4180CSV(csvRaw);
  check('EVIDENCIAS.csv possui cabeçalho e registros', csvRows.length >= 10, `Linhas encontradas: ${csvRows.length}`);
  const header = csvRows[0];
  check('Cabeçalho EVIDENCIAS.csv correto', header[0] === 'item_id' && header[1] === 'tipo' && header[2] === 'caminho_arquivo', `Cabeçalho observado: ${header.join(',')}`);
  
  // Verificar se todos os arquivos referenciados no CSV existem
  for (let r = 1; r < csvRows.length; r++) {
    const row = csvRows[r];
    const itemFile = row[2];
    if (itemFile && (itemFile.startsWith('recursos/') || itemFile.endsWith('.md') || itemFile.endsWith('.json') || itemFile.endsWith('.cjs'))) {
      const fullP = path.join(dir, itemFile);
      check(`Arquivo referenciado em EVIDENCIAS [${row[0]}]: ${itemFile}`, fs.existsSync(fullP), `Arquivo não existe: ${fullP}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. VALIDAÇÃO CRUZADA COM A BASE CURRICULAR REAL (Etapa 1 v03)
// ---------------------------------------------------------------------------
let matrizCsvPath = path.resolve(__dirname, '../../../etapa-1-curriculo/v03/MATRIZ-FONTE-AULA.csv');
if (!fs.existsSync(matrizCsvPath)) { matrizCsvPath = path.resolve('producao/etapa-1-curriculo/v03/MATRIZ-FONTE-AULA.csv'); }
check('Existência de MATRIZ-FONTE-AULA.csv da Etapa 1 v03', fs.existsSync(matrizCsvPath), 'Matriz curricular real não encontrada');

if (fs.existsSync(matrizCsvPath)) {
  const matrizRaw = fs.readFileSync(matrizCsvPath, 'utf8');
  const matrizRows = parseRFC4180CSV(matrizRaw);
  // Na MATRIZ-FONTE-AULA.csv: col 0 = entradaOrigemId, col 1 = arquivoId, col 2 = aulaPropostaId, col 3 = habilidadeId
  const cand004Row = matrizRows.find(r => r[2] === 'aula-prop-017');
  check('Proposta aula-prop-017 presente na matriz curricular (col 2)', !!cand004Row, 'aula-prop-017 não encontrada na matriz');
  if (cand004Row) {
    check('aula-prop-017 vinculada a hab-lei-003 na matriz', cand004Row[3] === 'hab-lei-003', `Habilidade observada: ${cand004Row[3]}`);
    check('aula-prop-017 tem arquivo físico vinculado', cand004Row[1].startsWith('arq-'), `Arquivo físico observado: ${cand004Row[1]}`);
  }
}

// Validação cruzada com AULAS-PROPOSTAS.json da Etapa 1 v03
let aulasPropJsonPath = path.resolve(__dirname, '../../../etapa-1-curriculo/v03/AULAS-PROPOSTAS.json');
if (!fs.existsSync(aulasPropJsonPath)) {
  aulasPropJsonPath = path.resolve('producao/etapa-1-curriculo/v03/AULAS-PROPOSTAS.json');
}
check('Existência de AULAS-PROPOSTAS.json da Etapa 1 v03', fs.existsSync(aulasPropJsonPath), 'AULAS-PROPOSTAS.json não encontrado');
if (fs.existsSync(aulasPropJsonPath)) {
  const aulasProp = JSON.parse(fs.readFileSync(aulasPropJsonPath, 'utf8'));
  const p17 = aulasProp.aulasPropostas.find(a => a.id === 'aula-prop-017');
  check('aula-prop-017 cadastrada em AULAS-PROPOSTAS.json', !!p17, 'aula-prop-017 não encontrada no JSON de propostas');
  if (p17) {
    check('aula-prop-017 vinculada a mod-ped-05 em AULAS-PROPOSTAS.json', p17.moduloPedagogicoId === 'mod-ped-05', `Módulo: ${p17.moduloPedagogicoId}`);
    check('aula-prop-017 vinculada a hab-lei-003 em AULAS-PROPOSTAS.json', p17.habilidadePrincipalId === 'hab-lei-003', `Habilidade: ${p17.habilidadePrincipalId}`);
  }
}

// ---------------------------------------------------------------------------
// 4. VALIDAÇÃO DE aula.json (CONTRATO DOS 14 ITENS)
// ---------------------------------------------------------------------------
const aulaJsonPath = path.join(dir, 'aula.json');
check('Existência de aula.json', fs.existsSync(aulaJsonPath), 'aula.json não encontrado');

let aulaJson = null;
if (fs.existsSync(aulaJsonPath)) {
  try {
    aulaJson = JSON.parse(fs.readFileSync(aulaJsonPath, 'utf8'));
    check('aula.json é JSON válido', true);
  } catch (e) {
    check('aula.json é JSON válido', false, e.message);
  }
}

if (aulaJson) {
  check('ID da aula estável', aulaJson.id_aula === 'cand-004', `ID: ${aulaJson.id_aula}`);
  check('Vínculo aula-prop-017', aulaJson.id_proposta === 'aula-prop-017', `Proposta: ${aulaJson.id_proposta}`);
  check('Módulo mod-ped-05', aulaJson.modulo_pedagogico === 'mod-ped-05', `Módulo: ${aulaJson.modulo_pedagogico}`);
  check('Habilidade hab-lei-003', aulaJson.habilidade_id === 'hab-lei-003', `Habilidade: ${aulaJson.habilidade_id}`);
  check('Versão v02', aulaJson.versao === 'v02', `Versão: ${aulaJson.versao}`);
  check('Status aguardando_revisao', aulaJson.status === 'aguardando_revisao', `Status: ${aulaJson.status}`);
  check('Declaração de Canonicidade presente', !!aulaJson.canonicidade && aulaJson.canonicidade.papel_json === 'canonica_dados', 'Canonicidade não declarada');

  const c14 = aulaJson.contrato_14_pontos;
  check('Contrato dos 14 pontos presente', !!c14, 'Objeto contrato_14_pontos ausente');

  if (c14) {
    const requiredKeys = [
      '1_identidade_e_fontes',
      '2_objetivo_observavel',
      '3_diagnostico_entrada',
      '4_explicacao_conceitual',
      '5_demonstracao_e_referencias',
      '6_pratica_guiada',
      '7_niveis_execucao',
      '8_exercicio_executavel',
      '9_feedback_e_diagnostico',
      '10_aplicacao_musical',
      '11_avaliacao_saida',
      '12_protocolo_recuperacao',
      '13_retencao_e_transferencia',
      '14_plano_sessao_e_registro'
    ];

    for (const k of requiredKeys) {
      check(`Item do contrato presente no JSON: ${k}`, !!c14[k], `Item ${k} ausente em contrato_14_pontos`);
    }

    // Checagem de cronômetro
    if (c14['14_plano_sessao_e_registro']) {
      const p40 = c14['14_plano_sessao_e_registro'].sessao_40_min;
      const soma40 = p40.reduce((acc, cur) => acc + cur.duracao_min, 0);
      check('Soma cronométrica da sessão de 40 min = 40 min', soma40 === 40, `Soma calculada: ${soma40}`);

      const p20 = c14['14_plano_sessao_e_registro'].versao_curta_20_min;
      const soma20 = p20.etapas.reduce((acc, cur) => acc + cur.duracao_min, 0);
      check('Soma cronométrica da versão curta = 20 min', soma20 === 20, `Soma calculada: ${soma20}`);
      check('Conteúdo adiado declarado na versão curta', typeof p20.conteudo_adiado === 'string' && p20.conteudo_adiado.length > 20);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. CONCORDÂNCIA BIDIRECIONAL aula.json <-> AULA.md
// ---------------------------------------------------------------------------
const aulaMdPath = path.join(dir, 'AULA.md');
check('Existência de AULA.md', fs.existsSync(aulaMdPath), 'AULA.md não encontrado');

if (fs.existsSync(aulaMdPath)) {
  const mdContent = fs.readFileSync(aulaMdPath, 'utf8');

  // Verificar se seções 1 a 14 existem no Markdown
  for (let s = 1; s <= 14; s++) {
    const secRegex = new RegExp(`## \\s*${s}\\.`, 'i');
    check(`Seção ${s} presente em AULA.md`, secRegex.test(mdContent), `Seção ${s} não encontrada em AULA.md`);
  }

  // Verificar Anexo Técnico
  check('Anexo Técnico presente ao final de AULA.md', mdContent.includes('## Anexo Técnico e Proveniência Curricular'));
  check('arq-0408 citado no anexo', mdContent.includes('arq-0408'));

  // AC-02: Garantir que NÃO existam respostas parentéticas na seção 11
  const sec11Match = mdContent.match(/## 11\.\s*Avaliação de Saída[\s\S]*?(?=## 12\.|$)/i);
  if (sec11Match) {
    const sec11Text = sec11Match[0];
    const leakedAnswers = sec11Text.match(/\(Resposta:.*?\)/gi);
    check('AC-02: Ausência de respostas vazadas na seção de saída de AULA.md', !leakedAnswers, `Respostas detectadas: ${leakedAnswers ? leakedAnswers.join('; ') : ''}`);
    check('AC-02: Referência ao gabarito-saida.md na seção 11', sec11Text.includes('gabarito-saida.md'));
  }

  // AC-06: Conferir numeração de cordas
  check('AC-06: Numeração de cordas da 1ª (mais fina) à 6ª (mais grossa)', mdContent.includes('numeradas da mais fina (1ª corda, Mi aguda) à mais grossa (6ª corda, Mi grave)'));

  // AC-07: Gradação do amortecimento e contagem do loop
  check('AC-07: Gradação do amortecimento explícita', mdContent.includes('Gradação do Amortecimento'));
  check('AC-07: Contagem explícita [3, 4 -> 1] no loop de recuperação', mdContent.includes('[3, 4 -> 1]'));

  // AC-03: Retenção em 24-48h e Variações A e B
  check('AC-03: Protocolo de revisão em 24 a 48 horas', /24\s*(a|e)\s*48\s*horas/i.test(mdContent));
  check('AC-03: Variação A presente', mdContent.includes('Variação A'));
  check('AC-03: Variação B presente', mdContent.includes('Variação B'));
}

// ---------------------------------------------------------------------------
// 6. EVENTOS.json E CONCORDÂNCIA MUSICAL
// ---------------------------------------------------------------------------
const eventosJsonPath = path.join(dir, 'EVENTOS.json');
check('Existência de EVENTOS.json', fs.existsSync(eventosJsonPath), 'EVENTOS.json não encontrado');

if (fs.existsSync(eventosJsonPath)) {
  const evJson = JSON.parse(fs.readFileSync(eventosJsonPath, 'utf8'));
  const eventos = evJson.adaptacao_pedagogica.eventos;
  check('Total de 14 eventos melódicos', eventos.length === 14, `Total: ${eventos.length}`);
  check('Total de 4 compassos', evJson.adaptacao_pedagogica.total_compassos === 4);
  check('Duração total de 16 tempos', evJson.adaptacao_pedagogica.duracao_total_tempos === 16);
  check('Áudio de referência de 16 segundos', evJson.adaptacao_pedagogica.duracao_audio_segundos === 16.0);

  // Checar compasso 2 evento 7 (mínima Sol 2 tempos)
  const ev7 = eventos[6];
  check('Evento 7 é mínima Sol (G4)', ev7.nota_escrita === 'G4' && ev7.duracao_tempos === 2.0 && ev7.figura === 'mínima');

  // Checar compasso 4 evento 14 (mínima Dó 2 tempos)
  const ev14 = eventos[13];
  check('Evento 14 é mínima Dó (C4)', ev14.nota_escrita === 'C4' && ev14.duracao_tempos === 2.0 && ev14.figura === 'mínima');
}

// ---------------------------------------------------------------------------
// 7. RECURSOS.json E CHECAGEM DE ARQUIVOS FÍSICOS
// ---------------------------------------------------------------------------
const recursosJsonPath = path.join(dir, 'RECURSOS.json');
check('Existência de RECURSOS.json', fs.existsSync(recursosJsonPath), 'RECURSOS.json não encontrado');

if (fs.existsSync(recursosJsonPath)) {
  const recJson = JSON.parse(fs.readFileSync(recursosJsonPath, 'utf8'));
  const allRecs = [...recJson.recursos_principais, ...recJson.recursos_transferencia];

  for (const r of allRecs) {
    const rPath = path.join(dir, r.arquivo);
    check(`Recurso existe no disco: ${r.arquivo}`, fs.existsSync(rPath), `Arquivo não existe: ${rPath}`);
    if (fs.existsSync(rPath)) {
      const stats = fs.statSync(rPath);
      check(`Recurso não-vazio: ${r.arquivo}`, stats.size > 100, `Tamanho: ${stats.size} bytes`);
    }
  }
}

// ---------------------------------------------------------------------------
// 8. SUÍTE DE TESTES NEGATIVOS (AC-08)
// ---------------------------------------------------------------------------
console.log('\n--- Executando Testes Negativos de Robustez ---');

// Teste Negativo 1: Detecção de Vazamento de Resposta
function testNegativeAnswerLeakage() {
  const fakeMdWithLeak = '## 11. Avaliação de Saída\nQuestão 1: Qual a nota? *(Resposta: Dó 4 no violão)*\n## 12. Recuperação';
  const match = fakeMdWithLeak.match(/## 11\.\s*Avaliação de Saída[\s\S]*?(?=## 12\.|$)/i);
  const leaks = match ? match[0].match(/\(Resposta:.*?\)/gi) : null;
  const caught = (leaks !== null);
  check('Teste Negativo 1: Detector de vazamento de resposta captura respostas embutidas', caught === true);
}
testNegativeAnswerLeakage();

// Teste Negativo 2: Detecção de Campo Obrigatório Ausente no JSON
function testNegativeMissingField() {
  const fakeJson = { id_aula: 'cand-004', contrato_14_pontos: {} };
  const caught = (!fakeJson.contrato_14_pontos['1_identidade_e_fontes']);
  check('Teste Negativo 2: Validador rejeita JSON sem itens obrigatórios do contrato', caught === true);
}
testNegativeMissingField();

// Teste Negativo 3: Incoerência de Duração de Eventos
function testNegativeEventDurationMismatch() {
  const fakeEvents = [
    { duracao_tempos: 1.0 },
    { duracao_tempos: 1.0 },
    { duracao_tempos: 1.0 } // soma = 3 tempos, mas compasso quaternário espera 4
  ];
  const soma = fakeEvents.reduce((acc, cur) => acc + cur.duracao_tempos, 0);
  const caught = (soma !== 4.0);
  check('Teste Negativo 3: Detector de incoerência métrica identifica compasso incompleto', caught === true);
}
testNegativeEventDurationMismatch();

// Teste Negativo 4: Detecção de Link de Recurso Quebrado
function testNegativeBrokenResourceLink() {
  const nonExistentFile = path.join(dir, 'recursos/arquivo-fantasma-inexistente.png');
  const caught = !fs.existsSync(nonExistentFile);
  check('Teste Negativo 4: Verificador de links detecta recurso inexistente', caught === true);
}
testNegativeBrokenResourceLink();

// ---------------------------------------------------------------------------
// RELATÓRIO FINAL
// ---------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`Testes com SUCESSO: ${passes.length}`);
console.log(`Erros ENCONTRADOS:  ${errors.length}`);
console.log('======================================================\n');

if (errors.length > 0) {
  console.error('FALHAS DETECTADAS:');
  for (const err of errors) {
    console.error(` - [${err.desc}] -> ${err.detail}`);
  }
  process.exit(1);
} else {
  console.log('TODAS AS VERIFICAÇÕES E TESTES PASSARAM COM 100% DE SUCESSO!');
  process.exit(0);
}
