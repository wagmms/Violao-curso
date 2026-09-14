// Reproduz somente o fechamento FINA-01 a FINA-06 desta entrega.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const dir = __dirname;
const root = path.resolve(dir, '../../../..');
const json = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, v) => fs.writeFileSync(path.join(dir, p), typeof v === 'string' ? v : JSON.stringify(v, null, 2) + '\n');
const inventory = json(path.join(root, 'producao/etapa-0-inventario/v04/ARQUIVOS-FISICOS.json'));
const physical = inventory.arquivos.find(a => a.id === 'arq-0408');
const a = json(path.join(dir, 'aula.json'));
const fh = a.contrato_14_pontos['1_identidade_e_fontes'].fonte_historica;
Object.assign(fh, {arquivo_fisico_id: physical.id, nome_arquivo_fisico: physical.nomeArquivo,
  tamanho_bytes: physical.tamanhoBytes, hash_sha256: physical.sha256,
  caminho_relativo_acervo: physical.caminhoRelativo, entrada_origem_id: physical.entradaId,
  base_proveniencia: 'producao/etapa-0-inventario/v04/ARQUIVOS-FISICOS.json'});
a.id_pedagogico = 'aula-ped-017-leitura-clave-sol';
a.candidatoId = 'cand-004';
a.candidato_id = 'cand-004'; // Alias legado explícito, conferido pelo validador.
a.canonicidade.declaracao = 'aula.json contém os dados canônicos desta aula; AULA.md é gerado por renderAulaMarkdown(). A igualdade da renderização é conferida; isto não equivale a validação formal de schema nem eficácia educacional comprovada.';
write('aula.json', a);

let code = fs.readFileSync(path.join(dir, 'validar-aula.cjs'), 'utf8').replace(/\r\n/g, '\n');
if (code.includes('const PROJECT_ROOT =')) {
  // Uma execução posterior só atualiza proveniência/Markdown, sem duplicar checks
  // nem renovar hashes gráficos que exigem nova inspeção visual.
  write('AULA.md', require('./validar-aula.cjs').renderAulaMarkdown(a));
  return;
}
const tail = code.indexOf('// 4. EXECUÇÃO DA VALIDAÇÃO OFICIAL');
if (tail !== -1) code = code.slice(0, tail);
code = code.replace('const fs = require(\'fs\');', "const fs = require('fs');\nconst crypto = require('crypto');\nconst PROJECT_ROOT = path.resolve(__dirname, '../../../..');");
// path precisa ser declarado antes de PROJECT_ROOT.
code = code.replace("const PROJECT_ROOT = path.resolve(__dirname, '../../../..');\nconst path = require('path');", "const path = require('path');\nconst PROJECT_ROOT = path.resolve(__dirname, '../../../..');");
code = code.replace(/path\.resolve\('producao\/etapa-1-curriculo\/(.*?)'\)/g, "path.join(PROJECT_ROOT, 'producao/etapa-1-curriculo/$1')");
code = code.replace('A leitura só é considerada assimilada quando você consegue executá-la após um intervalo temporal, sem aquecimento com respostas prontas:', 'Esta revisão observa a recuperação da tarefa após um intervalo; uma tentativa não comprova domínio definitivo. Faça a checagem sem aquecimento com respostas prontas:');
code = code.replace('a **retenção de longo prazo** (evocar as notas após um intervalo de descanso)', 'a **recuperação após um intervalo** (tentar ler novamente após o descanso, sem inferir armazenamento definitivo)');
code = code.replace('** (nota Fá), tocando', '**, tocando');
// Vincula cada dimensão da pauta limpa à avaliação antes de conferir os recursos.
code = code.replace('  return {\n    success: errors.length === 0,', `
  const base = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'producao/etapa-0-inventario/v04/ARQUIVOS-FISICOS.json'), 'utf8'));
  const source = base.arquivos.find(x => x.id === 'arq-0408');
  if (aulaJson) {
    const f = aulaJson.contrato_14_pontos?.['1_identidade_e_fontes']?.fonte_historica;
    chk('FINA-01: Proveniência corresponde à base física', !!f && f.nome_arquivo_fisico === source.nomeArquivo && f.tamanho_bytes === source.tamanhoBytes && f.hash_sha256 === source.sha256 && f.caminho_relativo_acervo === source.caminhoRelativo && f.entrada_origem_id === source.entradaId);
    const actual = fs.readFileSync(path.join(base.acervoRaiz, source.caminhoRelativo));
    chk('FINA-01: Bytes e hash reais do acervo conferidos em leitura', actual.length === source.tamanhoBytes && crypto.createHash('sha256').update(actual).digest('hex') === source.sha256);
    const old = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'producao/etapa-2-calibracao/v01-aula-completa/cand-004/aula.json'), 'utf8'));
    chk('FINA-02: ID preservado da v01 e candidato separado', aulaJson.id_pedagogico === old.metadadosPedagogicos.id && aulaJson.candidatoId === 'cand-004' && aulaJson.candidato_id === aulaJson.candidatoId);
    chk('FINA-06: Quatorze seções presentes', Object.keys(aulaJson.contrato_14_pontos || {}).length === 14);
    for (const s of Object.values(aulaJson.contrato_14_pontos || {})) chk('FINA-06: Seção não vazia', !!s && Object.keys(s).length > 0);
  }
  if (mdContent) {
    for (const m of mdContent.matchAll(/!?\\[[^\\]]*\\]\\(([^)]+)\\)/g)) {
      const target = m[1];
      if (!/^https?:/.test(target)) chk('FINA-06: Link real existe: ' + target, fs.existsSync(path.join(baseDir, target)));
    }
    const exit = mdContent.match(/## 11\\.[\\s\\S]*?(?=## 12\\.|$)/)?.[0] || '';
    chk('FINA-03: Saída sem nota de partida fornecida', !exit.includes('(nota Fá)'));
    chk('FINA-04: Sem promessa de memória de longo prazo', !/retida na memória de longo prazo|só é considerada assimilada/i.test(mdContent));
  }
  const reviewed = JSON.parse(fs.readFileSync(path.join(baseDir, 'INSPECAO-GRAFICOS.json'), 'utf8'));
  for (const r of reviewed.recursos) {
    const file = path.join(baseDir, r.arquivo);
    chk('FINA-03: Recurso gráfico inspecionado permanece íntegro: ' + r.arquivo,
      fs.existsSync(file) && crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') === r.sha256,
      'Recurso alterado após inspeção visual; reinspecionar antes de atualizar hash.');
    if (fs.existsSync(file) && file.endsWith('.svg')) {
      const texts = [...fs.readFileSync(file, 'utf8').matchAll(/<text[^>]*>([\\s\\S]*?)<\\/text>/g)].map(m => m[1]);
      chk('FINA-03: SVG sem respostas nominais: ' + r.arquivo, !texts.some(t => /Dó Dó|Lá Lá|Mi Fá|Ré Ré|C4 C4/.test(t)));
    }
  }
  if (eventosJson) {
    const evs = eventosJson.adaptacao_pedagogica.eventos;
    const original = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'producao/etapa-2-calibracao/v02-aula-completa/cand-004/EVENTOS.json'), 'utf8')).adaptacao_pedagogica.eventos;
    chk('FINA-06: Música conferida preservada evento a evento', JSON.stringify(evs) === JSON.stringify(original));
    for (let c = 1; c <= 4; c++) chk('FINA-06: Compasso ' + c + ' soma quatro tempos', evs.filter(e => e.compasso === c).reduce((n,e) => n + e.duracao_tempos, 0) === 4);
  }
  return {
    success: errors.length === 0,`);
code += "\nmodule.exports = {renderAulaMarkdown, validarAulaPacote, parseRFC4180CSV};\nif (require.main === module) require('./testar-entrega.cjs').executar();\n";
write('validar-aula.cjs', code);

const inspected = ['pauta-limpa.png','pauta-limpa.svg','pauta-celular.png','sistema-1-c1-c2.png','sistema-2-c3-c4.png','simulacao-mobile-343px.png','tarefa-transferencia/transferencia-pauta-limpa.png','tarefa-transferencia/transferencia-pauta-limpa.svg'];
write('INSPECAO-GRAFICOS.json', {data:'2026-09-14', metodo:'Inspeção visual dos PNGs e leitura de todos os elementos text dos SVGs. Hash impede alterações silenciosas; não é OCR nem avaliação automática da notação.', recursos: inspected.map(f => ({arquivo:'recursos/'+f,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,'recursos',f))).digest('hex')}))});
const render = require('./validar-aula.cjs').renderAulaMarkdown;
write('AULA.md', render(a));
