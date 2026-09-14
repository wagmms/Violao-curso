/**
 * Compilador offline de dados dos guias pedagógicos homologados.
 * Gera interface/guias-dados.js definindo window.CURSO_MAPA_ESTUDO e window.CURSO_GUIAS.
 * Executa sem dependências externas (Node vanilla), com caminhos relativos portáteis.
 */
const fs = require('fs');
const path = require('path');

// Raiz derivada de __dirname para total portabilidade em qualquer ambiente
const repoDir = path.resolve(__dirname, '../..');
const mapaPath = path.join(repoDir, 'entregas-gemini/lote-5/revisado/MAPA-ESTUDO-CURSO-GERAL.md');
const guiaMod1Path = path.join(repoDir, 'entregas-gemini/lote-5/revisado/GUIA-MODULO-01.md');
const outputPath = path.join(repoDir, 'interface/guias-dados.js');

// Lista explícita de módulos homologados pelo Codex (apenas Módulo 1 ativo no catálogo por enquanto)
const MODULOS_HOMOLOGADOS = [1, 2, 3];

const mapaMd = fs.readFileSync(mapaPath, 'utf8');
const fontesGuias = [guiaMod1Path,
  path.join(repoDir, 'entregas-gemini/lote-6/revisado/GUIA-MODULO-02.md'),
  path.join(repoDir, 'entregas-gemini/lote-6/revisado/GUIA-MODULO-03.md')];
const guiaMod1Md = fontesGuias.map(p => fs.readFileSync(p, 'utf8')).join('\n\n');

// Parse GUIA-MODULO-01.md
const lines = guiaMod1Md.split(/\r?\n/);
const guias = {};
let current = null;

for (const line of lines) {
  const m = line.match(/^#### Aula (\d+) \(`([^`]+)`\):\s*(.+)$/);
  if (m) {
    if (current) {
      guias[current.id] = current;
    }
    current = {
      ordem: parseInt(m[1], 10),
      id: m[2],
      titulo_original: m[3].trim(),
      editorial: '',
      evidencia: '',
      status_obj: 'Provisório',
      obj: '',
      orcamento: '',
      pratica: '',
      dificuldade: '',
      fontes: []
    };
    continue;
  }
  if (!current) continue;
  
  if (!current.editorial && line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
    current.editorial = line.slice(1, -1).trim();
  } else if (line.startsWith('- **Evidência do que foi Consultado:**')) {
    current.evidencia = line.replace('- **Evidência do que foi Consultado:**', '').trim();
  } else if (line.startsWith('- **Objetivo da Aula:**')) {
    const raw = line.replace('- **Objetivo da Aula:**', '').trim();
    const stMatch = raw.match(/^\*\[(.*?)\]\*\s*(.*)$/);
    if (stMatch) {
      current.status_obj = stMatch[1];
      current.obj = stMatch[2];
    } else {
      current.obj = raw;
    }
  } else if (line.startsWith('- **Orçamento de Estudo (Sessão de 40 Minutos')) {
    current.orcamento = line.replace(/^- \*\*Orçamento de Estudo \(Sessão de 40 Minutos[^\)]*\):\*\*/, '').trim();
  } else if (/^\s+- \*Sessão \d+ \(40 min\):\*/.test(line)) {
    current.orcamento += '\n' + line.trim();
  } else if (line.startsWith('- **Sugestão de Prática Complementar:**')) {
    current.pratica = line.replace('- **Sugestão de Prática Complementar:**', '').trim();
  } else if (line.startsWith('- **Registro de Dificuldade / Auto-observação:**')) {
    current.dificuldade = line.replace('- **Registro de Dificuldade / Auto-observação:**', '').trim();
  } else if (line.trim().startsWith('- `') && line.includes('(')) {
    current.fontes.push(line.trim().replace(/^- /, ''));
  }
}
if (current) {
  guias[current.id] = current;
}

const totalAulasGuiadas = Object.keys(guias).length;
console.log(`Compiladas ${totalAulasGuiadas} aulas guiadas dos Módulos ${MODULOS_HOMOLOGADOS.join(', ')}.`);

// Constrói arquivo JS compatível com file://
const jsContent = `// Gerado automaticamente por gerar-dados-guias.cjs - Lote 6 (Portátil)
// Dados estruturados dos guias pedagógicos homologados e mapa geral do curso
(function() {
  'use strict';
  window.CURSO_MAPA_ESTUDO = ${JSON.stringify(mapaMd)};
  window.CURSO_GUIAS = ${JSON.stringify(guias, null, 2)};
  window.CURSO_GUIAS_METADATA = {
    versao: '1.0.1',
    modulos_homologados: ${JSON.stringify(MODULOS_HOMOLOGADOS)},
    total_aulas_com_guia: ${totalAulasGuiadas},
    modulos_em_revisao: [],
    status_revisao: 'Módulos 1, 2 e 3 aprovados como guias complementares; evidências conforme relato do executor, sem inspeção integral independente do Codex.'
  };
})();
`;

fs.writeFileSync(outputPath, jsContent, 'utf8');
console.log(`Arquivo gravado com sucesso: ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
