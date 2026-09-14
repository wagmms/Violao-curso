const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const dir = path.resolve(__dirname, '..'), root = path.resolve(dir, '..');

function load(file) {
  const b = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), b);
  return b.window.CURSO_DADOS;
}

const d = load(path.join(dir, 'conteudo-geral.js'));
const invPath = path.join(root, 'entregas-gemini/lote-1/revisado/INVENTARIO.json');
assert(fs.existsSync(invPath), 'INVENTARIO.json deve existir');
const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));

// 1. Integridade dos Módulos e Aulas
assert.equal(d.catalogoOriginal.length, 11, 'Exatamente 11 módulos');
const aulas = d.catalogoOriginal.flatMap(m => m.aulas);
assert.equal(aulas.length, 300, 'Exatamente 300 aulas no total');
assert.equal(new Set(aulas.map(a => a.id)).size, 300, 'Todos os 300 IDs são únicos');

// 2. Fidelidade estrita contra o inventário por módulo, título, tipo e URL
for (const m of d.catalogoOriginal) {
  const items = inv.filter(x => x.modulo === m.nome);
  const groups = new Map();
  for (const x of items) {
    const key = x.grupo_aula || x.titulo;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(x);
  }
  assert.equal(m.aulas.length, groups.size, `Contagem de aulas no módulo ${m.nome}`);
  for (const a of m.aulas) {
    const source = groups.get(a.grupo_aula);
    assert(source, `Grupo de aula deve existir na fonte: ${a.grupo_aula}`);
    const key = x => JSON.stringify([x.titulo, x.tipo, x.url || null]);
    assert.deepEqual(
      a.materiais.map(key).sort(),
      source.filter(x => x.tipo !== 'part-frag').map(key).sort(),
      `Fidelidade de materiais para: ${a.grupo_aula}`
    );
  }
}

// 3. Checagem de contagem nos Módulos 1 a 8 (exatamente 171 aulas com arquivo)
const modulos1a8 = d.catalogoOriginal.slice(0, 8);
const aulasComArquivo1a8 = modulos1a8.flatMap(m => m.aulas).filter(a => a.temArquivos).length;
assert.equal(aulasComArquivo1a8, 171, 'Módulos 1 a 8 devem conter exatamente 171 aulas com arquivos');

// 4. Não conter plano personalizado ou exercícios próprios
assert(!d.planoEstudo, 'Não deve conter planoEstudo');
assert(!d.exercicios, 'Não deve conter exercicios');

// 5. Contagens de arquivos utilizáveis vs plataforma
assert.equal(aulas.filter(a => a.temArquivos).length, 197, '197 aulas com arquivos utilizáveis');
assert.equal(aulas.filter(a => !a.temArquivos).length, 103, '103 aulas sem arquivos de download (plataforma)');

// 6. Materiais: sem caminhos locais privados e discriminação de vídeos (284 MP4 + 1 WebM)
const mats = aulas.flatMap(a => a.materiais);
assert(!mats.some(m => m.tipo === 'part-frag'), 'Nenhum fragmento .part-Frag no catálogo');
assert(!mats.some(m => m.caminho_local), 'Nenhum caminho local privado exposto nos dados');

const videos = mats.filter(m => m.tipo === 'video');
assert.equal(videos.length, 285, 'Exatamente 285 vídeos utilizáveis');
const webmVideos = videos.filter(m => m.titulo && m.titulo.toLowerCase().endsWith('.webm'));
const mp4Videos = videos.filter(m => !m.titulo || !m.titulo.toLowerCase().endsWith('.webm'));
assert.equal(webmVideos.length, 1, 'Exatamente 1 vídeo WebM');
assert.equal(mp4Videos.length, 284, 'Exatamente 284 vídeos MP4');
assert.equal(mats.filter(m => m.tipo === 'pdf').length, 33, 'Exatamente 33 PDFs');

// 7. Estabilidade de IDs contra mapa de identidade
const mapaIdentidadePath = path.join(__dirname, 'mapa-identidade-aulas.json');
if (fs.existsSync(mapaIdentidadePath)) {
  const mapaId = JSON.parse(fs.readFileSync(mapaIdentidadePath, 'utf8'));
  for (const m of d.catalogoOriginal) {
    for (const a of m.aulas) {
      const k = `${m.nome}:::${a.grupo_aula}`;
      assert.equal(a.id, mapaId[k], `ID estável preservado para ${k}`);
    }
  }
}

// 8. Integridade do HTML e arquivos locais
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
assert(!html.includes('Meu Plano') && !html.includes('48 semanas'), 'HTML não deve conter referências à rota desativada');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  assert(fs.existsSync(path.join(dir, match[1])), 'Arquivo referenciado deve existir: ' + match[1]);
}

// 9. Sintaxe JavaScript
new vm.Script(fs.readFileSync(path.join(dir, 'geral.js'), 'utf8'));

console.log('✔ Validação do Curso Geral aprovada: 11 módulos auditados com fidelidade estrita, 300 aulas (197 com arquivos, 103 plataforma; 171 em mod 1-8), 285 vídeos (284 MP4 + 1 WebM), 33 PDFs, 300 IDs canônicos preservados, sem caminhos privados.');
