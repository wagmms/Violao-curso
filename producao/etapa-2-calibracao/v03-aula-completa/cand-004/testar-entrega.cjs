const fs = require('fs');
const path = require('path');
const os = require('os');
const {validarAulaPacote} = require('./validar-aula.cjs');
const dir = __dirname;
function executar() {
  const official = validarAulaPacote(dir);
  const results = [];
  const mutateJSON = (d, name, change) => {
    const p = path.join(d, name); const j = JSON.parse(fs.readFileSync(p,'utf8'));
    change(j); fs.writeFileSync(p, JSON.stringify(j,null,2)+'\n');
  };
  const mutations = [
    ['hash errado', d => mutateJSON(d,'aula.json',a => a.contrato_14_pontos['1_identidade_e_fontes'].fonte_historica.hash_sha256 = '0'.repeat(64)), 'Hash SHA-256 canônico'],
    ['ID alterado', d => mutateJSON(d,'aula.json',a => a.id_pedagogico = 'aula-alterada'), 'ID pedagógico estável'],
    ['resposta em SVG de saída', d => {const p=path.join(d,'recursos/pauta-limpa.svg'); fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('</svg>','<text x="10" y="20">Dó Dó Sol Sol</text></svg>'));}, 'SVG sem respostas nominais'],
    ['PNG de saída alterado após inspeção', d => fs.appendFileSync(path.join(d,'recursos/sistema-1-c1-c2.png'), Buffer.from('Resposta: Dó Dó Sol Sol')), 'Recurso gráfico inspecionado permanece íntegro'],
    ['texto divergente', d => fs.appendFileSync(path.join(d,'AULA.md'),'\nTexto divergente.'), 'gerado estritamente'],
    ['início incorreto', d => mutateJSON(d,'EVENTOS.json',e => e.adaptacao_pedagogica.eventos[1].inicio_tempo_global += 0.5), 'Início temporal contínuo'],
    ['duração incorreta', d => mutateJSON(d,'EVENTOS.json',e => e.adaptacao_pedagogica.eventos[0].duracao_tempos += 0.5), 'Soma de tempos'],
    ['link quebrado no Markdown', d => fs.appendFileSync(path.join(d,'AULA.md'),'\n[Recurso](recursos/inexistente.png)'), 'Link real existe'],
    ['campo contratual ausente', d => mutateJSON(d,'aula.json',a => delete a.contrato_14_pontos['10_aplicacao_musical']), 'Quatorze seções']
  ];
  for (const [name, mutate, expected] of mutations) {
    const scratch = fs.mkdtempSync(path.join(os.tmpdir(),'cand004-fina-'));
    try {
      // Somente cópias físicas isoladas são alteradas.
      fs.cpSync(dir,scratch,{recursive:true});
      mutate(scratch);
      let r;
      try {r=validarAulaPacote(scratch);} catch(error) {r={success:false,errors:[{desc:'Exceção de estrutura',detail:error.message}]};}
      const matched = r.errors.filter(e => e.desc.includes(expected));
      const ok = !r.success && matched.length > 0;
      results.push({teste:name,rejeitado:ok,erro_esperado:expected,erros:r.errors});
    } finally {
      const resolved=path.resolve(scratch); const parent=path.resolve(os.tmpdir())+path.sep;
      if (!resolved.startsWith(parent) || !path.basename(resolved).startsWith('cand004-fina-')) throw Error('Diretório temporário fora do escopo');
      fs.rmSync(resolved,{recursive:true,force:true});
    }
  }
  const report={status:'aguardando_revisao',validacao_formal_schema:'pendente_antes_integracao',oficial:official,mutacoes:results};
  fs.writeFileSync(path.join(dir,'RESULTADO-VALIDACAO.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({erros_oficiais:official.errors,checks_aprovados:official.passes.length,mutacoes:results.map(t=>({teste:t.teste,rejeitado:t.rejeitado}))},null,2));
  if (!official.success || results.some(r=>!r.rejeitado)) process.exitCode=1;
}
module.exports={executar};
if(require.main===module) executar();
