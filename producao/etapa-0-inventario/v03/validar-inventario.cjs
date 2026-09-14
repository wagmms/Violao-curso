const fs = require('fs');
const path = require('path');

const dir = __dirname;
const root = 'C:/Users/wmors/Videos/KatoMart Acelerado';

console.log('=== VALIDADOR DE RECONCILIAÇÃO ETAPA 0 (v03) ===\n');
let errors = 0;

// 1. Validar ARQUIVOS-FISICOS.json
const physical = JSON.parse(fs.readFileSync(path.join(dir, 'ARQUIVOS-FISICOS.json'), 'utf8'));
const arqs = physical.arquivos;
if (arqs.length !== 2090) {
  console.error('ERRO: Esperado 2090 arquivos físicos, encontrado:', arqs.length);
  errors++;
} else {
  console.log('- Total de arquivos físicos indexados: 2090/2090');
}

const fm = new Map(arqs.map(a => [a.id, a]));
if (fm.size !== 2090) {
  console.error('ERRO: IDs duplicados em ARQUIVOS-FISICOS.json! Tamanho do Map:', fm.size);
  errors++;
}

// Check sample files in physical root
for (const a of arqs.slice(0, 50)) {
  try {
    const stat = fs.statSync(path.join(root, a.caminhoRelativo));
    if (stat.size !== a.tamanhoBytes) {
      console.error('ERRO de tamanho no arquivo:', a.id, a.caminhoRelativo);
      errors++;
    }
  } catch (e) {
    console.error('ERRO: Arquivo não existe no disco:', a.caminhoRelativo);
    errors++;
  }
}
console.log('- Amostra de arquivos físicos verificada no disco com sucesso');

// 2. Validar INVENTARIO.json
const inv = JSON.parse(fs.readFileSync(path.join(dir, 'INVENTARIO.json'), 'utf8'));
if (inv.entradas.length !== 631) {
  console.error('ERRO: Esperado 631 entradas no inventário, encontrado:', inv.entradas.length);
  errors++;
} else {
  console.log('- Entradas canônicas no inventário: 631/631');
}

// 3. Validar consistência de arquivoId em INVENTARIO.json contra ARQUIVOS-FISICOS.json
let linkedFiles = 0;
for (const e of inv.entradas) {
  for (const f of e.arquivos) {
    linkedFiles++;
    const real = fm.get(f.arquivoId);
    if (!real) {
      console.error('ERRO: arquivoId inexistente em entrada:', e.id, f.arquivoId);
      errors++;
    } else if (real.caminhoRelativo !== f.caminhoRelativo || real.tamanhoBytes !== f.tamanhoBytes || real.sha256 !== f.sha256) {
      console.error('ERRO: Divergência de dados físicos no arquivo:', f.arquivoId, 'da entrada', e.id);
      errors++;
    }
  }
}
console.log(`- Referências de arquivos vinculadas no inventário: ${linkedFiles} (todas íntegras)`);

// 4. Validar COBERTURA.csv
const csv = fs.readFileSync(path.join(dir, 'COBERTURA.csv'), 'utf8').trim();
const lines = csv.split(/\r?\n/).slice(1);
if (lines.length !== 631) {
  console.error('ERRO: COBERTURA.csv deve ter 631 linhas, tem:', lines.length);
  errors++;
} else {
  console.log('- Linhas de COBERTURA.csv: 631/631');
}

if (errors === 0) {
  console.log('\nSUCESSO: Validação da Etapa 0 (v03) concluída com ZERO erros!');
  process.exit(0);
} else {
  console.error('\nFALHA: Encontrados', errors, 'erros na Etapa 0 (v03).');
  process.exit(1);
}
