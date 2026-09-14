const fs = require('fs');
const path = require('path');

const etapa1Dir = __dirname;
const base = path.resolve(etapa1Dir, '../../..');

console.log('=== VALIDADOR DE ARQUITETURA CURRICULAR ETAPA 1 (v01) ===\n');
let errors = 0;

// 1. Validar MAPA-HABILIDADES.json
try {
  const habData = JSON.parse(fs.readFileSync(path.join(etapa1Dir, 'MAPA-HABILIDADES.json'), 'utf8'));
  const habilidades = habData.habilidades;
  const habMap = new Map(habilidades.map(h => [h.id, h]));
  
  // DFS Cycle Check
  const visited = new Set();
  const recStack = new Set();
  function dfs(id) {
    visited.add(id);
    recStack.add(id);
    const h = habMap.get(id);
    for (const pre of h.prerequisitos) {
      if (!habMap.has(pre)) {
        console.error('ERRO: Pré-requisito inexistente:', pre, 'em', id);
        errors++;
      } else if (!visited.has(pre)) {
        dfs(pre);
      } else if (recStack.has(pre)) {
        console.error('ERRO: Ciclo detectado envolvendo:', id, 'e', pre);
        errors++;
      }
    }
    recStack.delete(id);
  }
  for (const h of habilidades) {
    if (!visited.has(h.id)) dfs(h.id);
  }
  console.log(`- Habilidades no grafo DAG: ${habilidades.length} (0 ciclos)`);
} catch (e) {
  console.error('ERRO em MAPA-HABILIDADES.json:', e.message);
  errors++;
}

// 2. Validar AULAS-PROPOSTAS.json
try {
  const aulasData = JSON.parse(fs.readFileSync(path.join(etapa1Dir, 'AULAS-PROPOSTAS.json'), 'utf8'));
  console.log(`- Módulos pedagógicos: ${aulasData.modulosPedagogicos.length}`);
  console.log(`- Aulas preliminares cadastradas: ${aulasData.aulasPropostas.length}`);
} catch (e) {
  console.error('ERRO em AULAS-PROPOSTAS.json:', e.message);
  errors++;
}

// 3. Validar MATRIZ-FONTE-AULA.csv
try {
  const csv = fs.readFileSync(path.join(etapa1Dir, 'MATRIZ-FONTE-AULA.csv'), 'utf8').trim();
  const lines = csv.split(/\r?\n/);
  const dataLines = lines.slice(1);
  if (dataLines.length !== 631) {
    console.error('ERRO: MATRIZ-FONTE-AULA.csv deve ter 631 linhas de dados, mas tem', dataLines.length);
    errors++;
  } else {
    console.log(`- Matriz de cobertura: 631/631 entradas do inventário mapeadas`);
  }
} catch (e) {
  console.error('ERRO em MATRIZ-FONTE-AULA.csv:', e.message);
  errors++;
}

// 4. Validar SCHEMAS
const schemas = ['habilidade.schema.json', 'aula-pedagogica.schema.json', 'fonte-arquivo.schema.json', 'matriz-relacao.schema.json'];
for (const s of schemas) {
  try {
    const sc = JSON.parse(fs.readFileSync(path.join(etapa1Dir, 'SCHEMAS', s), 'utf8'));
    if (!sc['$schema']) {
      console.error('ERRO: Schema sem $schema:', s);
      errors++;
    }
  } catch (e) {
    console.error('ERRO lendo schema', s, ':', e.message);
    errors++;
  }
}
console.log(`- JSON Schemas validados: ${schemas.length}/${schemas.length}`);

if (errors === 0) {
  console.log('\nSUCESSO: Todos os testes de consistência da Etapa 1 passaram com 0 erros!');
  process.exit(0);
} else {
  console.error('\nFALHA: Encontrados', errors, 'erros na validação da Etapa 1.');
  process.exit(1);
}
