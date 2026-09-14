/**
 * Script de validação automatizada e reproduzível da Etapa 0 (v02).
 * Execução: node producao/etapa-0-inventario/v02/validar-inventario.cjs
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const acervoRoot = 'C:/Users/wmors/Videos/KatoMart Acelerado';

const inv = JSON.parse(fs.readFileSync(path.join(dir, 'INVENTARIO.json'), 'utf8'));
const arqs = JSON.parse(fs.readFileSync(path.join(dir, 'ARQUIVOS-FISICOS.json'), 'utf8'));
const csv = fs.readFileSync(path.join(dir, 'COBERTURA.csv'), 'utf8').trim().split(/\r?\n/);

console.log('=== VALIDADOR DE RECONCILIAÇÃO ETAPA 0 (v02) ===\n');

const errors = [];

// 1. Metadata check
if (!inv.metadata || inv.metadata.versaoDocumento !== '2.0.0') {
  errors.push('Metadata ausente ou versão divergente de 2.0.0 em INVENTARIO.json');
}

// 2. Totais check
if (inv.totais.totalEntradas !== 631 || inv.totais.totalTriade !== 300 || inv.totais.totalKaiser !== 331) {
  errors.push('Contagem de entradas divergente de 631 (300 Tríade / 331 Kaiser)');
}
if (inv.totais.comMaterialLocal !== 520) {
  errors.push('comMaterialLocal divergente de 520 (encontrado ' + inv.totais.comMaterialLocal + ')');
}
if (inv.totais.comPdfLocal !== 85) {
  errors.push('comPdfLocal divergente de 85 (encontrado ' + inv.totais.comPdfLocal + ')');
}
if (inv.totais.semMaterialLocal !== 111) {
  errors.push('semMaterialLocal divergente de 111 (encontrado ' + inv.totais.semMaterialLocal + ')');
}

// 3. Entradas check
if (inv.entradas.length !== 631) {
  errors.push('Quantidade de entradas no array é ' + inv.entradas.length + ', esperado 631');
}

// 4. Physical files check
if (arqs.totais.totalArquivosFisicos !== 2090) {
  errors.push('Total de arquivos físicos é ' + arqs.totais.totalArquivosFisicos + ', esperado 2090');
}
if (arqs.totais.naoAssociados !== 276) {
  errors.push('Arquivos não associados é ' + arqs.totais.naoAssociados + ', esperado 276');
}

const arqIdMap = new Map(arqs.arquivos.map(a => [a.id, a]));
for (const e of inv.entradas) {
  for (const f of e.arquivos) {
    if (!arqIdMap.has(f.arquivoId)) {
      errors.push('Entrada ' + e.id + ' faz referência a arquivoId inexistente: ' + f.arquivoId);
    }
  }
}

// 5. CSV check
if (csv.length !== 632) {
  errors.push('Linhas do CSV são ' + csv.length + ', esperado 632 (cabeçalho + 631 entradas)');
}

// 6. Check physical existence on disk
let diskVerified = 0;
for (const a of arqs.arquivos) {
  const full = path.join(acervoRoot, a.caminhoRelativo);
  if (!fs.existsSync(full)) {
    errors.push('Arquivo físico não encontrado no disco: ' + a.caminhoRelativo);
  } else {
    diskVerified++;
    const s = fs.statSync(full);
    if (s.size !== a.tamanhoBytes) {
      errors.push('Tamanho divergente em ' + a.caminhoRelativo + ': declarado ' + a.tamanhoBytes + ', real ' + s.size);
    }
    if (!/^[a-f0-9]{64}$/.test(a.sha256)) {
      errors.push('Hash SHA-256 em formato inválido para ' + a.caminhoRelativo + ': ' + a.sha256);
    }
  }
}

console.log('- Entradas validadas: ' + inv.entradas.length + '/631');
console.log('- Arquivos físicos verificados no disco: ' + diskVerified + '/2090');
console.log('- Total de referências cruzadas arquivoId: ' + inv.totais.totalReferenciasArquivos);
console.log('- Linhas de COBERTURA.csv: ' + (csv.length - 1) + ' entradas + 1 cabeçalho');
console.log('- Erros encontrados: ' + errors.length);

if (errors.length > 0) {
  console.error('\nFALHA NA VALIDAÇÃO:');
  errors.forEach(e => console.error('  [ERRO] ' + e));
  process.exit(1);
} else {
  console.log('\nSUCESSO: Todos os requisitos de reconciliação de dados da Etapa 0 (v02) foram atendidos!');
  process.exit(0);
}
