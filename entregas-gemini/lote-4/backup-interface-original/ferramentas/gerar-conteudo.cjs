/**
 * gerar-conteudo.cjs
 * 
 * Gerador estritamente local e sem dependências externas (Node.js puro)
 * que lê os documentos oficiais do curso e gera interface/conteudo.js
 * com a variável global window.CURSO_DADOS.
 * 
 * Atualização de Escopo (13/09/2026):
 * - Nome: Curso de Violão — Método Tríade (Formação em Violão de Nylon)
 * - Duas organizações: Curso Original (300 aulas catalogadas do Método Tríade)
 *   e Meu Plano de Estudo (48 semanas, 12 unidades, exercícios próprios homologados).
 * 
 * Fontes autorizadas:
 * - ESCOPO-CURSO-GERAL.md
 * - CURSO-VIOLAO-SOLO-MPB.md (v1.3)
 * - INICIO-4-SEMANAS.md
 * - INDICE-METODO-TRIADE.md
 * - entregas-gemini/lote-1/revisado/INVENTARIO.json
 * - entregas-gemini/lote-1/revisado/MAPA-FONTES.md
 * - entregas-gemini/lote-2/REVISAO-CODEX.md
 * - entregas-gemini/lote-3/revisado/UNIDADE-02.md
 * - entregas-gemini/lote-3/revisado/UNIDADE-03.md
 * - entregas-gemini/lote-3/revisado/EXERCICIOS.md
 * - entregas-gemini/lote-3/revisado/EVENTOS.json
 * - entregas-gemini/lote-3/revisado/TABLATURAS-COMPLETAS.md
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const LOTE1_DIR = path.join(ROOT_DIR, 'entregas-gemini/lote-1/revisado');
const REVISADO_DIR = path.join(ROOT_DIR, 'entregas-gemini/lote-3/revisado');

function readFile(relPath) {
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(ROOT_DIR, relPath);
  return fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
}

console.log('--- Iniciando geração de conteúdo do Lote 4 (Escopo Geral + Plano de Estudo) ---');

// =========================================================================
// PARTE 1: CATÁLOGO DO CURSO ORIGINAL (MÉTODO TRÍADE)
// =========================================================================
const inventarioRaw = JSON.parse(readFile(path.join(LOTE1_DIR, 'INVENTARIO.json')));

// Mapeamento dos módulos na ordem original
const modulosOrdem = [
  { id: 'mod-1', nome: '01. Módulo 1', titulo: 'Módulo 1 — Fundamentos e Primeiros Acordes', tipo: 'pedagogico' },
  { id: 'mod-2', nome: '02. Módulo 2', titulo: 'Módulo 2 — Ritmos Básicos e Percepção', tipo: 'pedagogico' },
  { id: 'mod-3', nome: '03. Módulo 3', titulo: 'Módulo 3 — Dedilhados, Teoria e Acordes', tipo: 'pedagogico' },
  { id: 'mod-4', nome: '04. Módulo 4', titulo: 'Módulo 4 — Campo Harmônico e Rítmica', tipo: 'pedagogico' },
  { id: 'mod-5', nome: '05. Módulo 5', titulo: 'Módulo 5 — Pestanas, Simplificações e Canções', tipo: 'pedagogico' },
  { id: 'mod-6', nome: '06. Módulo 6', titulo: 'Módulo 6 — Harmonia Funcional e Repertório', tipo: 'pedagogico' },
  { id: 'mod-7', nome: '07. Mês 7', titulo: 'Mês 7 — Inversões e Preparação Fingerstyle', tipo: 'pedagogico' },
  { id: 'mod-8', nome: '08. Mês 8', titulo: 'Mês 8 — Extensões, Tensões e Repertório', tipo: 'pedagogico' },
  { id: 'mod-9', nome: '09. Mês 9', titulo: 'Mês 9 — Peças Solo e Fingerstyle Avançado', tipo: 'pedagogico' },
  { id: 'mod-10', nome: '10. UPGRADE 5.0 Escala Maior Definitiva', titulo: 'Diretório 10 — Complemento: Escala Maior Definitiva', tipo: 'complemento_escalas' },
  { id: 'mod-11', nome: '11. Links da AULA MENSAL e SORTEIO', titulo: 'Diretório 11 — Lives, Sorteios e Links Administrativos', tipo: 'administrativo_lives' }
];

const catalogoModulos = {};
modulosOrdem.forEach((m, idx) => {
  catalogoModulos[m.nome] = {
    id: m.id,
    ordem: idx + 1,
    nome: m.nome,
    titulo: m.titulo,
    tipo: m.tipo,
    aulas: {}
  };
});

let totalArquivosContados = 0;
let totalVideos = 0;
let totalPdfs = 0;
let totalDescricoes = 0;
let totalLegendas = 0;
let totalPartFrag = 0;
let totalAulasSemArquivo = 0;

for (const item of inventarioRaw) {
  if (item.modulo === 'Raiz do Backup') continue;
  totalArquivosContados++;

  const modObj = catalogoModulos[item.modulo];
  if (!modObj) continue;

  const grupoNome = item.grupo_aula || item.titulo;
  if (!modObj.aulas[grupoNome]) {
    modObj.aulas[grupoNome] = {
      id: `aula-${modObj.id}-${Object.keys(modObj.aulas).length + 1}`,
      grupo_aula: grupoNome,
      module_index: item.module_index,
      lesson_index: item.lesson_index,
      temArquivos: false,
      statusAula: 'disponivel',
      materiais: []
    };
  }

  const aulaRef = modObj.aulas[grupoNome];
  const isPartFrag = item.tipo === 'part-frag';
  const hasFile = !!item.caminho_local && !isPartFrag;

  if (item.caminho_local) {
    aulaRef.temArquivos = true;
  }
  if (item.tipo === 'aula_texto_plataforma' || item.status_verificacao === 'indisponivel') {
    aulaRef.statusAula = 'indisponivel_backup';
    totalAulasSemArquivo++;
  }

  if (item.tipo === 'video') totalVideos++;
  else if (item.tipo === 'pdf') totalPdfs++;
  else if (item.tipo === 'descricao') totalDescricoes++;
  else if (item.tipo === 'legenda') totalLegendas++;
  else if (item.tipo === 'part-frag') totalPartFrag++;

  aulaRef.materiais.push({
    titulo: item.titulo,
    tipo: item.tipo,
    caminho_local: item.caminho_local || null,
    url: item.url || null,
    status_verificacao: item.status_verificacao,
    observacoes: item.observacoes || '',
    utilizavel: hasFile && !isPartFrag
  });
}

// Converter aulas em arrays ordenados por lesson_index
const catalogoOriginal = modulosOrdem.map(m => {
  const modData = catalogoModulos[m.nome];
  const aulasArray = Object.values(modData.aulas).sort((a, b) => {
    if (a.lesson_index !== null && b.lesson_index !== null) {
      return a.lesson_index - b.lesson_index;
    }
    return a.grupo_aula.localeCompare(b.grupo_aula);
  });

  return {
    id: modData.id,
    ordem: modData.ordem,
    nome: modData.nome,
    titulo: modData.titulo,
    tipo: modData.tipo,
    totalAulas: aulasArray.length,
    aulasComArquivo: aulasArray.filter(a => a.temArquivos).length,
    aulasSemArquivo: aulasArray.filter(a => !a.temArquivos).length,
    aulas: aulasArray
  };
});

const estatisticasCatalogo = {
  totalModulos: catalogoOriginal.length,
  totalAulas: catalogoOriginal.reduce((acc, m) => acc + m.totalAulas, 0),
  aulasComArquivo: catalogoOriginal.reduce((acc, m) => acc + m.aulasComArquivo, 0),
  aulasSemArquivo: catalogoOriginal.reduce((acc, m) => acc + m.aulasSemArquivo, 0),
  totalArquivos: totalArquivosContados,
  arquivosVideos: totalVideos,
  arquivosPdfs: totalPdfs,
  arquivosPartFragExcluidos: totalPartFrag,
  arquivosDescricoes: totalDescricoes,
  arquivosLegendas: totalLegendas
};

console.log(`✔ Catálogo Original estruturado: ${estatisticasCatalogo.totalAulas} aulas em ${estatisticasCatalogo.totalModulos} módulos.`);
console.log(`  - Aulas com arquivo utilizável: ${estatisticasCatalogo.aulasComArquivo}`);
console.log(`  - Aulas sem arquivo (indisponíveis no backup): ${estatisticasCatalogo.aulasSemArquivo}`);
console.log(`  - Arquivos de vídeo: ${estatisticasCatalogo.arquivosVideos} | PDFs: ${estatisticasCatalogo.arquivosPdfs}`);

// =========================================================================
// PARTE 2: CADERNO DE EXERCÍCIOS E TABLATURAS (HOMOLOGADOS)
// =========================================================================
const eventosJson = JSON.parse(readFile(path.join(REVISADO_DIR, 'EVENTOS.json')));
const tablaturasMd = readFile(path.join(REVISADO_DIR, 'TABLATURAS-COMPLETAS.md'));

const tablaturasPorId = {};
const tabSections = tablaturasMd.split(/\n(?=## ex)/);
for (const sec of tabSections) {
  const headerMatch = sec.match(/^##\s+(ex\d(?:-s)?)/m);
  if (headerMatch) {
    const exId = headerMatch[1].toLowerCase();
    const codeMatch = sec.match(/```text\n([\s\S]*?)```/);
    if (codeMatch) {
      tablaturasPorId[exId] = codeMatch[1].trim();
    }
  }
}

const exercicios = [];
const exDefs = [
  { id: 'ex1', sId: 'ex1-s', unidade: 2, numero: 1, titulo: 'Melodia Cantabile de "Primeiro Canto"', bpm: '50–60 BPM', compassos: 8 },
  { id: 'ex2', sId: 'ex2-s', unidade: 2, numero: 2, titulo: '"Primeiro Canto" a Duas Vozes (Melodia e Baixo)', bpm: '50–56 BPM', compassos: 8 },
  { id: 'ex3', sId: 'ex3-s', unidade: 2, numero: 3, titulo: '"Primeiro Canto" Completo (Arranjo em Três Camadas)', bpm: '50–56 BPM', compassos: 8 },
  { id: 'ex4', sId: 'ex4-s', unidade: 3, numero: 1, titulo: 'Tríades e Inversões em Três Cordas com Melodia Superior', bpm: '50–56 BPM', compassos: 8 },
  { id: 'ex5', sId: 'ex5-s', unidade: 3, numero: 2, titulo: 'Condução Linear de Baixos por Notas Comuns (Reconstruído)', bpm: '50–56 BPM', compassos: 4 },
  { id: 'ex6', sId: 'ex6-s', unidade: 3, numero: 3, titulo: 'Estudo Polifônico com Duas Inversões Justificadas', bpm: '50–56 BPM', compassos: 8 }
];

for (const def of exDefs) {
  const jsonEx = eventosJson.exercicios.find(e => e.id === def.id);
  const jsonSEx = jsonEx ? (jsonEx.variantes || []).find(v => v.id === def.sId) : null;

  exercicios.push({
    id: def.id,
    unidadeId: `u${def.unidade}`,
    tipo: 'principal',
    numero: def.numero,
    titulo: def.titulo,
    tituloCompleto: `${def.id.toUpperCase()}: ${def.titulo} (Versão Principal)`,
    andamento: def.bpm,
    formula: '4/4',
    totalCompassos: def.compassos,
    tablatura: tablaturasPorId[def.id] || '',
    eventos: jsonEx ? jsonEx.eventos : [],
    statusEntrega: def.id === 'ex3' ? 'entrega_final_unidade_2' : (def.id === 'ex6' ? 'entrega_final_unidade_3' : 'exercicio_estudo'),
    avisoPedagogico: def.id === 'ex6' ? 'A entrega oficial da Unidade 3 exige esta versão integral de 8 compassos demonstrada em duas sessões distintas.' : null
  });

  exercicios.push({
    id: def.sId,
    unidadeId: `u${def.unidade}`,
    tipo: 'simplificada',
    numero: def.numero,
    titulo: `${def.titulo} (Simplificada)`,
    tituloCompleto: `${def.sId.toUpperCase()}: ${def.titulo} (Versão Simplificada)`,
    andamento: def.bpm,
    formula: '4/4',
    totalCompassos: def.id === 'ex6' ? 4 : def.compassos,
    tablatura: tablaturasPorId[def.sId] || '',
    eventos: jsonSEx ? (jsonSEx.eventos || []) : [],
    statusEntrega: def.sId === 'ex6-s' ? 'parcial_preparatoria' : 'simplificacao_imediata',
    avisoPedagogico: def.sId === 'ex6-s' ? 'ATENÇÃO: A versão 6-S (4 compassos) é estritamente uma preparação parcial. Não é considerada entrega final da Unidade 3.' : null
  });
}

// Exercícios da Unidade 1 (INICIO-4-SEMANAS.md)
const u1Exercicios = [
  {
    id: 'u1-ex1',
    unidadeId: 'u1',
    tipo: 'principal',
    numero: 1,
    titulo: 'Exercício 1 — Melodia sobre baixo sustentado',
    tituloCompleto: 'U1-EX1: Melodia sobre baixo sustentado',
    andamento: '50–60 BPM',
    formula: '4/4',
    totalCompassos: 2,
    tablatura: `4/4; cada coluna representa um pulso. Número = ataque; = = sustentação; . = silêncio.
c.     1               |2               
pulso  1   2   3   4   |1   2   3   4   
1ª     0   3   0   .   |.   .   0   .   
2ª     .   .   .   3   |1   3   .   1   
3ª     .   .   .   .   |.   .   .   .   
4ª     .   .   .   .   |.   .   .   .   
5ª     3   =   =   =   |3   =   =   =   
6ª     .   .   .   .   |.   .   .   .   `,
    descricao: 'Baixo: C em 5/3, com p, no pulso 1; sustentar por 4 pulsos. Melodia nas cordas agudas, uma nota por pulso, alternando i–m. O baixo e a primeira nota começam juntos. Não tocar cordas intermediárias.',
    simplificacao: 'Versão reduzida do c.1: E (1/0), D (2/3), C (2/1), D (2/3), sobre o mesmo baixo C.',
    statusEntrega: 'exercicio_estudo'
  },
  {
    id: 'u1-ex2',
    unidadeId: 'u1',
    tipo: 'principal',
    numero: 2,
    titulo: 'Exercício 2 — Ataques independentes',
    tituloCompleto: 'U1-EX2: Ataques independentes (Pausas e colcheias)',
    andamento: '50–60 BPM',
    formula: '4/4',
    totalCompassos: 1,
    tablatura: `4/4; contagem 1 e 2 e 3 e 4 e. Nota = ataque de colcheia; . = pausa da melodia.
pulso  1   e   2   e   3   e   4   e   
1ª     .   0   3   .   0   .   .   .   
2ª     .   .   .   .   .   3   1   .   
5ª     3   =   =   =   =   =   =   =   `,
    descricao: 'Mesmo baixo C (5/3) sustentado. Contagem "1 e 2 e 3 e 4 e". Notas da melodia duram uma colcheia; pausas são silêncio da melodia enquanto o baixo continua.',
    simplificacao: 'Preparação mais simples: conservar os mesmos ataques e pausas usando apenas a 2ª corda: pausa, C (2/1), D (2/3), pausa, C (2/1), D (2/3), C (2/1), pausa.',
    statusEntrega: 'exercicio_estudo'
  },
  {
    id: 'u1-ex3',
    unidadeId: 'u1',
    tipo: 'principal',
    numero: 3,
    titulo: 'Exercício 3 — Acrescentar uma voz interna',
    tituloCompleto: 'U1-EX3: Três vozes integradas',
    andamento: '50–60 BPM',
    formula: '4/4',
    totalCompassos: 2,
    tablatura: `4/4; voz interna G (3/0) no pulso 3 do compasso 1.
c.     1               |2               
pulso  1   2   3   4   |1   2   3   4   
1ª     0   3   0   .   |.   .   0   .   
2ª     .   .   .   3   |1   3   .   1   
3ª     .   .   0   =   |.   .   .   .   
5ª     3   =   =   =   |3   =   =   =   `,
    descricao: 'No pulso 3 do c.1, toque também G em 3/0 com i, enquanto m toca E em 1/0. A nota interna dura dois pulsos, mais suave que a melodia.',
    simplificacao: 'Praticar o par G (3/0) + E (1/0) isolado em ataques simultâneos lentos (i-m ou i-a) antes de somar o baixo.',
    statusEntrega: 'exercicio_estudo'
  },
  {
    id: 'u1-estudo',
    unidadeId: 'u1',
    tipo: 'principal',
    numero: 4,
    titulo: 'Estudo de Oito Compassos da Unidade 1',
    tituloCompleto: 'U1-ESTUDO: Estudo Preparatório de Oito Compassos',
    andamento: '50–60 BPM',
    formula: '4/4',
    totalCompassos: 8,
    tablatura: `Estrutura formal do estudo de 8 compassos:
c. 1–2: Exercício 1 (melodia + baixo C sustentado)
c. 3–4: Exercício 1 com a voz interna do Exercício 3 no pulso 3
c. 5–6: Exercício 1 executado em dinâmica suave (piano)
c. 7: Primeiro compasso do Exercício 1
c. 8: Resolução — C em 5/3 e C em 2/1 atacados juntos, sustentados por 4 pulsos`,
    descricao: 'Estudo preparatório integrando controle de dinâmica, sustentação do baixo e três vozes.',
    statusEntrega: 'entrega_final_unidade_1',
    avisoPedagogico: 'A entrega oficial da Unidade 1 exige este estudo de 8 compassos demonstrado em duas sessões distintas.'
  }
];

// =========================================================================
// PARTE 3: SESSÕES DE ESTUDO (48 SESSÕES DAS UNIDADES 1 A 3)
// =========================================================================
function parseUnitSessions(unitNumber, mdContent) {
  const sessions = [];
  const rawSections = mdContent.split(/\n(?=## Semana)/).filter(s => s.startsWith('## Semana'));

  for (const sec of rawSections) {
    const lines = sec.split('\n');
    const headerLine = lines[0].replace('## ', '').trim();
    
    const headerMatch = headerLine.match(/Semana\s+(\d+)\s*·\s*Sessão\s+([ABCD])(?:\s*\((Opcional)\))?\s*—\s*(.*)/i);
    if (!headerMatch) continue;

    const weekNum = parseInt(headerMatch[1], 10);
    const letter = headerMatch[2].toUpperCase();
    const isOptional = !!headerMatch[3] || letter === 'D';
    const sessionTitle = headerMatch[4].trim();
    const sessionId = `sess-${weekNum}${letter.toLowerCase()}`;

    const getField = (pattern) => {
      const m = sec.match(pattern);
      return m ? m[1].trim() : '';
    };

    const objetivo = getField(/\*\*Objetivo:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);
    const prerequisito = getField(/\*\*Pré-requisito:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);
    const instrucao = getField(/\*\*Instrução Executável:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);
    const dificuldade = getField(/\*\*Dificuldade Possível:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);
    const simplificacao = getField(/\*\*Simplificação Imediata:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);
    const criterioSaida = getField(/\*\*Critério de Saída:\*\*\s*([\s\S]*?)(?=\n-|\n#|\n\||\Z)/);

    const blocos = [];
    const blockRegex = /\|\s*(\d+–\d+\s*min)\s*\|\s*(\d+\s*min)\s*\|\s*(.*?)\s*\|/g;
    let bMatch;
    let totalMinutos = 0;
    while ((bMatch = blockRegex.exec(sec)) !== null) {
      const minNum = parseInt(bMatch[2].replace('min', '').trim(), 10);
      totalMinutos += minNum;
      blocos.push({
        intervalo: bMatch[1].trim(),
        duracaoMin: minNum,
        atividade: bMatch[3].trim()
      });
    }

    let exercicioId = null;
    if (unitNumber === 2) {
      if (weekNum === 5) exercicioId = 'ex1';
      else if (weekNum === 6) exercicioId = 'ex2';
      else if (weekNum === 7 || weekNum === 8) exercicioId = 'ex3';
    } else if (unitNumber === 3) {
      if (weekNum === 9 || weekNum === 10) exercicioId = 'ex4';
      else if (weekNum === 11) exercicioId = 'ex5';
      else if (weekNum === 12) exercicioId = 'ex6';
    }

    sessions.push({
      id: sessionId,
      unidadeId: `u${unitNumber}`,
      semana: weekNum,
      sessao: letter,
      tipo: isOptional ? 'opcional' : 'obrigatoria',
      titulo: sessionTitle,
      tituloCompleto: headerLine,
      objetivo,
      prerequisito,
      blocos,
      totalMinutos,
      instrucao,
      dificuldade,
      simplificacao,
      criterioSaida,
      exercicioAssociadoId: exercicioId,
      andamentoSugeridoBPM: '50–56 BPM'
    });
  }
  return sessions;
}

const u2Sessions = parseUnitSessions(2, readFile(path.join(REVISADO_DIR, 'UNIDADE-02.md')));
const u3Sessions = parseUnitSessions(3, readFile(path.join(REVISADO_DIR, 'UNIDADE-03.md')));

// Sessões da Unidade 1
const u1SessionsData = [
  {
    semana: 1, sessao: 'A', tipo: 'obrigatoria', titulo: 'Diagnóstico de Entrada no Violão Solo',
    objetivo: 'Mapear o ponto de partida motor e perceptivo registrando ritmo, sustentação do baixo e afinação inicial.',
    prerequisito: 'Violão afinado na afinação padrão EADGBE.',
    exercicioAssociadoId: 'u1-ex1',
    blocos: [
      { intervalo: '00–04 min', duracaoMin: 4, atividade: 'Afinar e ajustar postura no violão de nylon.' },
      { intervalo: '04–10 min', duracaoMin: 6, atividade: 'Tocar um trecho de música que você já conhece e observar memória.' },
      { intervalo: '10–16 min', duracaoMin: 6, atividade: 'Dedilhar progressão C–Am–Dm–G7 lentamente com clareza tímbrica.' },
      { intervalo: '16–22 min', duracaoMin: 6, atividade: 'Tocar uma melodia conhecida de ouvido nas cordas agudas.' },
      { intervalo: '22–28 min', duracaoMin: 6, atividade: 'Executar o Exercício 1: baixo sustentado e melodia audível.' },
      { intervalo: '28–34 min', duracaoMin: 6, atividade: 'Localizar notas C, D, E, F, G, A, B e leitura de notas.' },
      { intervalo: '34–40 min', duracaoMin: 6, atividade: 'Ouvir a gravação de teste e registrar 2 prioridades no diário.' }
    ],
    instrucao: 'Grave a sessão pelo celular sem filtros. Pontue cada dimensão de 0 a 3.',
    dificuldade: 'Tensão na mão esquerda tentando segurar acordes com muita força.',
    simplificacao: 'Reduzir para apenas o baixo e a melodia do c.1 do Exercício 1.',
    criterioSaida: 'Diagnóstico preenchido no diário com notas atribuídas.'
  },
  {
    semana: 1, sessao: 'B', tipo: 'obrigatoria', titulo: 'Exercício 1: Camadas Separadas e Junção',
    objetivo: 'Praticar o baixo isolado, a melodia isolada e a junção coordenada com baixo sustentado.',
    prerequisito: 'Sessão 1A realizada.',
    exercicioAssociadoId: 'u1-ex1',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação e postura.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Técnica: alternância estrita i–m nas cordas agudas e ataque limpo de p.' },
      { intervalo: '10–15 min', duracaoMin: 5, atividade: 'Percepção: cantar as notas da melodia antes de atacar as cordas.' },
      { intervalo: '15–37 min', duracaoMin: 22, atividade: 'Repertório: praticar compassos 1 e 2 do Exercício 1 separados e juntos.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Preenchimento do diário de bordo.' }
    ],
    instrucao: 'Mantenha o polegar atacando o baixo C (5/3) e se afastando; o som sustenta pela pressão do dedo da mão esquerda na casa.',
    dificuldade: 'O baixo é interrompido no momento em que a mão esquerda troca de corda na melodia.',
    simplificacao: 'Usar a versão reduzida do compasso 1: E, D, C, D sobre o baixo.',
    criterioSaida: 'Tocar os dois compassos 3 vezes seguidas com o baixo soando por 4 pulsos.'
  },
  {
    semana: 1, sessao: 'C', tipo: 'obrigatoria', titulo: 'Gravação de Dois Compassos e Escuta Crítica',
    objetivo: 'Gravar dois compassos contínuos do Exercício 1 e verificar se o som do baixo permanece vivo por 4 pulsos.',
    prerequisito: 'Sessão 1B praticada.',
    exercicioAssociadoId: 'u1-ex1',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação cuidadosa.' },
      { intervalo: '03–08 min', duracaoMin: 5, atividade: 'Técnica: sustentação mecânica do dedo 3 ou 2 em 5/3.' },
      { intervalo: '08–13 min', duracaoMin: 5, atividade: 'Leitura e solfejo rítmico dos 2 compassos.' },
      { intervalo: '13–30 min', duracaoMin: 17, atividade: 'Execução continuada a 50 BPM com metrônomo.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Gravação de áudio no celular e escuta com fones.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Anotação no diário das falhas de sustentação identificadas.' }
    ],
    instrucao: 'Na escuta da gravação, observe se o baixo C não é abafado antes do pulso 4.',
    dificuldade: 'Oscilação métrica acelerando na melodia.',
    simplificacao: 'Reduzir o andamento para 48 BPM.',
    criterioSaida: 'Áudio gravado contendo 2 compassos estáveis.'
  },
  {
    semana: 1, sessao: 'D', tipo: 'opcional', titulo: 'Tocar Repertório Já Conhecido (Opcional)',
    objetivo: 'Manter a motivação e prazer ao instrumento sem cobrança de novos conteúdos.',
    prerequisito: 'Nenhum.',
    exercicioAssociadoId: null,
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Aquecimento livre.' },
      { intervalo: '10–30 min', duracaoMin: 20, atividade: 'Tocar músicas favoritas por prazer sem interrupção.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Escuta apreciativa de violão brasileiro.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Registro livre de sensações.' }
    ],
    instrucao: 'Toque pelo prazer de produzir som no instrumento.',
    dificuldade: 'Cobrar-se perfeição técnica durante a sessão de relaxamento.',
    simplificacao: 'Tocar apenas progressões simples de acordes abertos.',
    criterioSaida: 'Sessão concluída com relaxamento muscular.'
  },
  {
    semana: 2, sessao: 'A', tipo: 'obrigatoria', titulo: 'Acervo Fingerstyle e Exercício 1 Consolidado',
    objetivo: 'Consultar o vídeo Preparação para Fingerstyle para observar o ataque e sustentação do baixo sobre a escala.',
    prerequisito: 'Semana 1 concluída.',
    exercicioAssociadoId: 'u1-ex1',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Técnica de ataque apoiado suave x toque livre no polegar.' },
      { intervalo: '10–18 min', duracaoMin: 8, atividade: 'Consulta ao vídeo Preparação para Fingerstyle (observar relação melodia e baixo).' },
      { intervalo: '18–35 min', duracaoMin: 17, atividade: 'Aplicação no instrumento dos compassos 1 e 2 com toque livre.' },
      { intervalo: '35–38 min', duracaoMin: 3, atividade: 'Leitura rítmica.' },
      { intervalo: '38–40 min', duracaoMin: 2, atividade: 'Preenchimento do diário.' }
    ],
    instrucao: 'Assista ao vídeo atentando para a mão direita. Não presuma que a tablatura do vídeo corresponda à do exercício próprio.',
    dificuldade: 'Encostar o polegar de volta na 5ª corda antes do fim do compasso, cortando o som.',
    simplificacao: 'Tocar o baixo e levantar a mão direita mantendo apenas a esquerda.',
    criterioSaida: '2 compassos executados observando a postura do acervo.'
  },
  {
    semana: 2, sessao: 'B', tipo: 'obrigatoria', titulo: 'Exercício 2: Contar, Tocar Melodia e Somar Baixo',
    objetivo: 'Dominar os ataques em colcheia e respeitar estritamente as pausas de colcheia da melodia.',
    prerequisito: 'Sessão 2A realizada.',
    exercicioAssociadoId: 'u1-ex2',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Contagem rítmica verbal "1 e 2 e 3 e 4 e".' },
      { intervalo: '10–15 min', duracaoMin: 5, atividade: 'Melodia isolada no ar ou solfejada respeitando pausas.' },
      { intervalo: '15–37 min', duracaoMin: 22, atividade: 'Exercício 2 no instrumento: melodia com pausas somada ao baixo sustentado.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Preenchimento do diário.' }
    ],
    instrucao: 'Para interromper a corda solta na pausa, recoste suavemente a polpa de um dedo da mão direita nela, sem encostar no baixo.',
    dificuldade: 'Transformar pausas escritas em ressonância livre involuntária.',
    simplificacao: 'Preparação na 2ª corda: pausa, C (2/1), D (2/3), pausa, C (2/1), D (2/3), C (2/1), pausa.',
    criterioSaida: 'Quatro compassos do Exercício 2 executados respeitando as pausas.'
  },
  {
    semana: 2, sessao: 'C', tipo: 'obrigatoria', titulo: 'Gravação do Exercício 2: Respeito às Pausas',
    objetivo: 'Gravar 4 compassos do Exercício 2 e auditar se o silêncio da melodia é nítido enquanto o baixo vibra.',
    prerequisito: 'Sessão 2B praticada.',
    exercicioAssociadoId: 'u1-ex2',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–08 min', duracaoMin: 5, atividade: 'Técnica de alívio de pressão sem tirar contato na mão esquerda.' },
      { intervalo: '08–13 min', duracaoMin: 5, atividade: 'Leitura e precisão de término no "e".' },
      { intervalo: '13–30 min', duracaoMin: 17, atividade: 'Prática contínua dos 4 compassos a 52 BPM.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Gravação e escuta atenta das pausas.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Registro no diário.' }
    ],
    instrucao: 'No "e" após pulso 2 (G em 1/3) e pulso 4 (C em 2/1), alivie a pressão mantendo contato para não soar corda solta.',
    dificuldade: 'Tirar o dedo totalmente da casa fazendo a corda solta soar involuntariamente.',
    simplificacao: 'Treinar o alívio de pressão isolado na casa 1 da 2ª corda.',
    criterioSaida: 'Gravação de 4 compassos com pausas melódicas audíveis.'
  },
  {
    semana: 2, sessao: 'D', tipo: 'opcional', titulo: 'Escuta de MPB e Cantarolar a Linha Melódica (Opcional)',
    objetivo: 'Desenvolver a percepção da melodia em gravações profissionais de MPB solo ou cantada.',
    prerequisito: 'Nenhum.',
    exercicioAssociadoId: null,
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação e toque livre.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Revisão leve de dedilhados.' },
      { intervalo: '10–30 min', duracaoMin: 20, atividade: 'Escutar 2 faixas de violão brasileiro e cantarolar a linha do canto/melodia.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Tentar achar 3 notas dessa melodia na 1ª ou 2ª corda.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Anotações no diário.' }
    ],
    instrucao: 'Cante em voz alta para conectar ouvido interno com a emissão musical.',
    dificuldade: 'Confundir notas de acompanhamento com a melodia principal.',
    simplificacao: 'Escolher uma canção com linha vocal muito clara (ex.: canções de Tom Jobim ou Caymmi).',
    criterioSaida: 'Melodia cantarolada com segurança.'
  },
  {
    semana: 3, sessao: 'A', tipo: 'obrigatoria', titulo: 'Exercício 3: Voz Interna e Três Camadas',
    objetivo: 'Adicionar a voz interna G (3/0) no pulso 3 com dinâmica mais suave que a melodia.',
    prerequisito: 'Semana 2 concluída.',
    exercicioAssociadoId: 'u1-ex3',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Técnica de ataque simultâneo i–m (ou i–a) em cordas não adjacentes.' },
      { intervalo: '10–18 min', duracaoMin: 8, atividade: 'Prática isolada do par G (3/0) + E (1/0).' },
      { intervalo: '18–35 min', duracaoMin: 17, atividade: 'Junção do baixo C (5/3), da voz interna e da melodia nos compassos 1 e 2.' },
      { intervalo: '35–38 min', duracaoMin: 3, atividade: 'Escuta da hierarquia de volume (melodia > baixo > interna).' },
      { intervalo: '38–40 min', duracaoMin: 2, atividade: 'Diário de bordo.' }
    ],
    instrucao: 'Se a nota interna encobrir a melodia, retire-a temporariamente e retome depois.',
    dificuldade: 'A voz interna soar mais forte que a melodia ou fazer o baixo parar.',
    simplificacao: 'Tocar separadamente baixo + melodia e baixo + nota interna.',
    criterioSaida: 'Ouvir nitidamente três funções sonoras nos compassos 1 e 2.'
  },
  {
    semana: 3, sessao: 'B', tipo: 'obrigatoria', titulo: 'Montagem do Estudo de Oito Compassos',
    objetivo: 'Articular a forma do estudo preparatório de 8 compassos (c.1-2 básico, c.3-4 voz interna, c.5-6 suave, c.7 retorno, c.8 acorde final).',
    prerequisito: 'Sessão 3A realizada.',
    exercicioAssociadoId: 'u1-estudo',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação e aquecimento.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Passagem rápida de c.1-2 e c.3-4.' },
      { intervalo: '10–18 min', duracaoMin: 8, atividade: 'Estudo dos compassos 5 e 6 com toque em dinâmica suave (piano).' },
      { intervalo: '18–35 min', duracaoMin: 17, atividade: 'Estudo de c.7 e fechamento em c.8 com o acorde C duplo (5/3 + 2/1 por 4 pulsos).' },
      { intervalo: '35–40 min', duracaoMin: 5, atividade: 'Execução contínua dos 8 compassos a 50 BPM e diário.' }
    ],
    instrucao: 'Mantenha o andamento estável mesmo ao produzir o contraste suave nos compassos 5 e 6.',
    dificuldade: 'Desacelerar ou perder o ritmo ao entrar no trecho mais suave.',
    simplificacao: 'Tocar todo o estudo na mesma dinâmica antes de tentar o contraste de volume.',
    criterioSaida: 'Executar os 8 compassos sem pausas entre as seções.'
  },
  {
    semana: 3, sessao: 'C', tipo: 'obrigatoria', titulo: 'Auditoria Polifônica: Onde Desaparece Cada Voz',
    objetivo: 'Tocar o estudo completo de 8 compassos e mapear conscientemente em quais compassos o baixo ou a melodia são cortados.',
    prerequisito: 'Sessão 3B praticada.',
    exercicioAssociadoId: 'u1-estudo',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–08 min', duracaoMin: 5, atividade: 'Técnica de sustentação nos compassos 3 e 4.' },
      { intervalo: '08–13 min', duracaoMin: 5, atividade: 'Solfejo silencioso do estudo.' },
      { intervalo: '13–30 min', duracaoMin: 17, atividade: 'Duas execuções completas com gravação de controle.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Escuta crítica e anotação no diário dos compassos com cortes involuntários.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Definição da próxima ação corretiva.' }
    ],
    instrucao: 'Não se preocupe com erros de afinação; concentre-se na permanência do som do baixo.',
    dificuldade: 'Ignorar pequenos cortes mecânicos na sustentação do baixo.',
    simplificacao: 'Repetir apenas os compassos anotados como deficientes.',
    criterioSaida: 'Diário com os pontos de interrupção claramente anotados.'
  },
  {
    semana: 3, sessao: 'D', tipo: 'opcional', titulo: 'Revisão sem Conteúdo Novo (Opcional)',
    objetivo: 'Retrabalhar com calma a passagem mais frágil do estudo sem adicionar nenhuma matéria nova.',
    prerequisito: 'Nenhum.',
    exercicioAssociadoId: null,
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Alongamento e relaxamento de ombros e mãos.' },
      { intervalo: '10–30 min', duracaoMin: 20, atividade: 'Prática em loop lentíssimo da pior transição do estudo.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Escuta de gravação de referência.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Diário de autoavaliação.' }
    ],
    instrucao: 'Toque na metade da velocidade habitual, priorizando som aveludado e relaxamento total.',
    dificuldade: 'Tentar acelerar antes de estabilizar a transição.',
    simplificacao: 'Tocar apenas uma nota por pulso a 40 BPM.',
    criterioSaida: 'Transição repetida 5 vezes sem tensão muscular.'
  },
  {
    semana: 4, sessao: 'A', tipo: 'obrigatoria', titulo: 'Resolução da Pior Transição do Estudo',
    objetivo: 'Eliminar o travamento na transição mais difícil entre compassos do estudo de 8 compassos.',
    prerequisito: 'Semana 3 concluída.',
    exercicioAssociadoId: 'u1-estudo',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Técnica de transição: preparar o dedo antes do ataque.' },
      { intervalo: '10–18 min', duracaoMin: 8, atividade: 'Isolar os 2 compassos críticos (ex.: c.2 para c.3 ou c.4 para c.5).' },
      { intervalo: '18–35 min', duracaoMin: 17, atividade: 'Prática contextualizada: 1 compasso antes + transição + 1 compasso depois.' },
      { intervalo: '35–38 min', duracaoMin: 3, atividade: 'Execução a 50 BPM sem parar na emenda.' },
      { intervalo: '38–40 min', duracaoMin: 2, atividade: 'Diário.' }
    ],
    instrucao: 'Mantenha a digitação estável; não troque de dedo a cada repetição.',
    dificuldade: 'Hesitar no pulso 1 ao mudar de textura.',
    simplificacao: 'Diminuir o andamento em 6 BPM durante a transição.',
    criterioSaida: 'Transição executada 3 vezes com fluência métrica.'
  },
  {
    semana: 4, sessao: 'B', tipo: 'obrigatoria', titulo: 'Ensaio Geral da Execução Completa (1ª Tomada)',
    objetivo: 'Consolidar a execução dos 8 compassos com início definido, andamento estável e final claro no compasso 8.',
    prerequisito: 'Sessão 4A realizada.',
    exercicioAssociadoId: 'u1-estudo',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação precisa.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Aquecimento mental e respiração profunda.' },
      { intervalo: '10–18 min', duracaoMin: 8, atividade: 'Passagem lenta do estudo completo a 50 BPM.' },
      { intervalo: '18–32 min', duracaoMin: 14, atividade: 'Primeira tomada oficial de gravação do estudo de 8 compassos.' },
      { intervalo: '32–37 min', duracaoMin: 5, atividade: 'Avaliação na rubrica de 4 dimensões da 1ª tomada.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Registro no diário.' }
    ],
    instrucao: 'Se cometer um erro, não recomece do início: continue tocando até o final do compasso 8.',
    dificuldade: 'Parar e reiniciar ao menor deslize técnico.',
    simplificacao: 'Tocar a 48 BPM sem dinâmica para priorizar o fluxo contínuo.',
    criterioSaida: 'Gravação da 1ª tomada concluída do início ao fim.'
  },
  {
    semana: 4, sessao: 'C', tipo: 'obrigatoria', titulo: 'Segunda Tomada de Demonstração e Decisão de Avanço',
    objetivo: 'Realizar a 2ª tomada em data distinta da Sessão 4B, pontuar as 4 dimensões da rubrica e avaliar avanço para a Unidade 2.',
    prerequisito: 'Sessão 4B concluída em data anterior.',
    exercicioAssociadoId: 'u1-estudo',
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–08 min', duracaoMin: 5, atividade: 'Aquecimento com arpejos suaves.' },
      { intervalo: '08–15 min', duracaoMin: 7, atividade: 'Revisão dos pontos de atenção da tomada anterior.' },
      { intervalo: '15–28 min', duracaoMin: 13, atividade: 'Segunda tomada oficial gravada do estudo de 8 compassos.' },
      { intervalo: '28–37 min', duracaoMin: 9, atividade: 'Autoavaliação formal na rubrica (continuidade, som, equilíbrio, autonomia).' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Decisão de avanço ou extensão por mais uma semana.' }
    ],
    instrucao: 'Para sugerir avanço, é obrigatório atingir nota >= 2 em todas as 4 dimensões nesta 2ª sessão distinta.',
    dificuldade: 'Avaliar-se com excesso de benevolência ou rigor paralisante.',
    simplificacao: 'Se alguma nota for < 2, planejar repetir a Semana 4 antes da Unidade 2.',
    criterioSaida: 'Rubrica pontuada e decisão de avanço fundamentada.'
  },
  {
    semana: 4, sessao: 'D', tipo: 'opcional', titulo: 'Exploração de Peças Candidatas para a Unidade 2 (Opcional)',
    objetivo: 'Escutar canções candidatas de MPB e experimentar dedilhar 4 compassos de uma delas.',
    prerequisito: 'Nenhum.',
    exercicioAssociadoId: null,
    blocos: [
      { intervalo: '00–03 min', duracaoMin: 3, atividade: 'Afinação.' },
      { intervalo: '03–10 min', duracaoMin: 7, atividade: 'Tocar o estudo de 8 compassos por pura satisfação musical.' },
      { intervalo: '10–30 min', duracaoMin: 20, atividade: 'Escutar canções candidatas e testar acordes simples nas cordas 1 a 3.' },
      { intervalo: '30–37 min', duracaoMin: 7, atividade: 'Anotar preferências harmônicas.' },
      { intervalo: '37–40 min', duracaoMin: 3, atividade: 'Fechamento do diário da Unidade 1.' }
    ],
    instrucao: 'Escolha canções que tenham melodia nítida e que você já consiga cantarolar com facilidade.',
    dificuldade: 'Escolher um arranjo comercial com saltos gigantescos incompatíveis com o nível básico.',
    simplificacao: 'Limitar o teste a melodias em Dó Maior ou Lá Menor.',
    criterioSaida: 'Duas canções candidatas anotadas para o próximo ciclo.'
  }
];

const u1Sessions = u1SessionsData.map(s => ({
  id: `sess-${s.semana}${s.sessao.toLowerCase()}`,
  unidadeId: 'u1',
  semana: s.semana,
  sessao: s.sessao,
  tipo: s.tipo,
  titulo: s.titulo,
  tituloCompleto: `Semana ${s.semana} · Sessão ${s.sessao}${s.tipo === 'opcional' ? ' (Opcional)' : ''} — ${s.titulo}`,
  objetivo: s.objetivo,
  prerequisito: s.prerequisito,
  blocos: s.blocos,
  totalMinutos: s.blocos.reduce((acc, b) => acc + b.duracaoMin, 0),
  instrucao: s.instrucao,
  dificuldade: s.dificuldade,
  simplificacao: s.simplificacao,
  criterioSaida: s.criterioSaida,
  exercicioAssociadoId: s.exercicioAssociadoId,
  andamentoSugeridoBPM: '50–60 BPM'
}));

const todasSessoes = [...u1Sessions, ...u2Sessions, ...u3Sessions];

// =========================================================================
// PARTE 4: AS 12 UNIDADES DA ROTA DE 48 SEMANAS (ARQUITETURA v1.3)
// =========================================================================
const unidades = [
  {
    id: 'u1',
    numero: 1,
    titulo: 'Som e duas vozes',
    semanas: 'Semanas 1–4',
    status: 'disponivel',
    statusDescricao: 'Conteúdo detalhado e executável disponível (16 sessões).',
    objetivo: 'Destacar uma melodia enquanto o polegar sustenta um baixo no violão de nylon.',
    prerequisito: 'Nível básico informado; violão de nylon com afinação padrão.',
    entregaPrevista: 'Estudo original de oito compassos, com melodia reconhecível e baixo controlado.',
    criterioAvanco: 'Duas execuções contínuas em sessões/datas diferentes com nota >= 2 em todas as 4 dimensões da rubrica.',
    baseTriade: 'M1 (Postura/Nível); M3 (Primeiros Dedilhados I/II); M7 (Preparação para Fingerstyle).',
    exerciciosAssociados: ['u1-ex1', 'u1-ex2', 'u1-ex3', 'u1-estudo']
  },
  {
    id: 'u2',
    numero: 2,
    titulo: 'Primeira peça solo',
    semanas: 'Semanas 5–8',
    status: 'disponivel',
    statusDescricao: 'Conteúdo detalhado e executável disponível (16 sessões). Homologado na revisão do Lote 3.',
    objetivo: 'Concluir uma peça autônoma em versão reduzida ("Primeiro Canto") com melodia, baixo e harmonia em três camadas.',
    prerequisito: 'Conclusão da Unidade 1 demonstrada em duas sessões distintas.',
    entregaPrevista: 'Peça didática original "Primeiro Canto" (8 compassos com repetição = 16 compassos, 69–77 segundos a 50–56 BPM).',
    criterioAvanco: 'Execução contínua sem quebras graves, recuperando erros sem voltar ao início, com nota >= 2 nas 4 dimensões em duas sessões distintas (8B e 8C).',
    baseTriade: 'M3 (dedilhados e leitura); M5 (Simplificando Acordes e Quais Cordas Dedilhar).',
    exerciciosAssociados: ['ex1', 'ex1-s', 'ex2', 'ex2-s', 'ex3', 'ex3-s']
  },
  {
    id: 'u3',
    numero: 3,
    titulo: 'Acordes a serviço da melodia',
    semanas: 'Semanas 9–12',
    status: 'disponivel',
    statusDescricao: 'Conteúdo detalhado e executável disponível (16 sessões). Homologado na revisão do Lote 3.',
    objetivo: 'Encontrar acordes pequenos que deixem a melodia na voz superior, dominando tríades, inversões e condução por notas comuns.',
    prerequisito: 'Conclusão da Unidade 2 demonstrada em duas sessões distintas.',
    entregaPrevista: 'Estudo polifônico de 8 compassos com pelo menos duas inversões justificadas (Exercício 6).',
    criterioAvanco: 'Demonstração dos 8 compassos integrais de Ex. 6 com nota >= 2 nas 4 dimensões em duas sessões/datas distintas (ex.: 12C repetida em outro dia). Versão 6-S (4 compassos) é apenas parcial e não libera avanço.',
    baseTriade: 'M3 (Formação de Acordes e Pestana); M4 (Formação de Acordes II); M7 (Inversões na Prática).',
    exerciciosAssociados: ['ex4', 'ex4-s', 'ex5', 'ex5-s', 'ex6', 'ex6-s']
  },
  {
    id: 'u4',
    numero: 4,
    titulo: 'Ritmo, acompanhamento e duas camadas',
    semanas: 'Semanas 13–16',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Comparar compasso simples/composto, arpejo folk/canção e células brasileiras; manter baixo e melodia com ataques não coincidentes.',
    prerequisito: 'Conclusão da Unidade 3 com inversões justificadas.',
    entregaPrevista: 'O mesmo trecho em versão ritmicamente simples e em versão sincopada.',
    criterioAvanco: 'Conseguir contar a subdivisão em voz alta e manter o pulso constante em ambas as versões.',
    baseTriade: 'M2 (6/8 Simplificada para contraste métrico); M3 (Semínima/Pausa/Colcheia e Batida Baião); M4 (Colcheia I).',
    exerciciosAssociados: []
  },
  {
    id: 'u5',
    numero: 5,
    titulo: 'Harmonia tonal aplicada',
    semanas: 'Semanas 17–20',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Funções I–IV–V, cadência ii–V–I e introdução à tonalidade menor; contraste com blues de 12 compassos e improvisação com notas do acorde.',
    prerequisito: 'Conclusão da Unidade 4.',
    entregaPrevista: 'Tocar Dm7–G7–C7M em duas disposições pequenas e incorporá-las a um trecho com melodia.',
    criterioAvanco: 'Explicar o papel harmônico dos acordes e demonstrar auditivamente a resolução sem travamentos.',
    baseTriade: 'M3 (X7M); M4 (Campo Harmônico); M6 (Esse Acorde Existe e Nome para Esse Desenho).',
    exerciciosAssociados: []
  },
  {
    id: 'u6',
    numero: 6,
    titulo: 'Repertório e interpretação entre estilos',
    semanas: 'Semanas 21–24',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Trabalhar peça principal (MPB ou outra linguagem) e comparar fraseado com trecho clássico/folk; praticar escuta e dinâmica.',
    prerequisito: 'Conclusão da Unidade 5.',
    entregaPrevista: 'Primeira peça completa e estável (1 a 3 minutos) e demonstração curta de acompanhamento.',
    criterioAvanco: 'Melodia expressiva identificável, contrastes dinâmicos intencionais e domínio de 3 pontos de reinício da memória.',
    baseTriade: 'M5 (Vilarejo, Pra Melhorar e Como Decorar).',
    exerciciosAssociados: []
  },
  {
    id: 'u7',
    numero: 7,
    titulo: 'Braço, baixos e transposição',
    semanas: 'Semanas 25–28',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Conectar regiões do braço do violão, desenhar linhas de baixos de passagem diatônicos e transpor frases.',
    prerequisito: 'Conclusão da Unidade 6.',
    entregaPrevista: 'Oito compassos com linha de baixo planejada e uma frase transposta.',
    criterioAvanco: 'Preservar a melodia limpa e saber nomear e localizar todas as tônicas utilizadas.',
    baseTriade: 'M5 (A Oitava e Revisão Domine o Braço); M7 (Inversões); M3 (Escala Maior como revisão teórica).',
    exerciciosAssociados: []
  },
  {
    id: 'u8',
    numero: 8,
    titulo: 'Três vozes e arranjo',
    semanas: 'Semanas 29–32',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Separar com total independência motora a melodia cantábile, o preenchimento harmônico interno e o baixo sustentado.',
    prerequisito: 'Conclusão da Unidade 7.',
    entregaPrevista: 'Arranjo próprio de 16 compassos ou seção equivalente de uma canção brasileira conhecida.',
    criterioAvanco: 'Conseguir retirar a voz interna e reconhecer a estrutura; recolocá-la sem perder a clareza tímbrica.',
    baseTriade: 'M7 (Preparação para Fingerstyle); M9 (Dedilhado Blocado 1 e variação). Recurso opcional: trecho de O Poderoso Chefão (M8).',
    exerciciosAssociados: []
  },
  {
    id: 'u9',
    numero: 9,
    titulo: 'Projeto de repertório solo',
    semanas: 'Semanas 33–36',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Estudo de peça fingerstyle (Certas Coisas ou estudo clássico/tradicional substituto equivalente), adaptando acordes ao nível.',
    prerequisito: 'Conclusão da Unidade 8.',
    entregaPrevista: 'Uma seção íntegra e bem preparada da peça escolhida.',
    criterioAvanco: 'Ritmo contínuo, digitações consistentes nas transições e clareza nos ataques de polegar.',
    baseTriade: 'M9 (Certas Coisas FINGERSTYLE e material associado).',
    exerciciosAssociados: []
  },
  {
    id: 'u10',
    numero: 10,
    titulo: 'Bossa e extensões',
    semanas: 'Semanas 37–40',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Empregar tensões harmônicas com escuta contextual (9, b9, 13, b13) e resolver dominantes com condução de vozes.',
    prerequisito: 'Conclusão da Unidade 9.',
    entregaPrevista: 'Seção de bossa nova ou estudo original de oito compassos com tensão deliberadamente escolhida.',
    criterioAvanco: 'Explicar teoricamente e demonstrar auditivamente a resolução da tensão, sem sacrificar a tocabilidade.',
    baseTriade: 'M8 (X7(13)/X7(b13)); M9 (9as, dominantes e Garota de Ipanema em 3 níveis).',
    exerciciosAssociados: []
  },
  {
    id: 'u11',
    numero: 11,
    titulo: 'Autonomia musical',
    semanas: 'Semanas 41–44',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Tirar melodia e harmonia de ouvido, organizando introdução curta, repetição com variação e encerramento coerente.',
    prerequisito: 'Conclusão da Unidade 10.',
    entregaPrevista: 'Arranjo próprio de 16 a 32 compassos, documentado por tablatura rítmica ou diagrama de eventos.',
    criterioAvanco: 'Conseguir reconstruir a peça musical dias depois a partir exclusivamente do registro anotado.',
    baseTriade: 'M2 (percepção de intervalos/acordes); M8 (Ditados Lacuna); revisão de harmonia.',
    exerciciosAssociados: []
  },
  {
    id: 'u12',
    numero: 12,
    titulo: 'Pequeno recital e consolidação',
    semanas: 'Semanas 45–48',
    status: 'planejada',
    statusDescricao: 'Unidade planejada na arquitetura (48 semanas). Aulas detalhadas serão produzidas em lote posterior.',
    objetivo: 'Reunir pequeno repertório consistente (2 a 4 peças, 6 a 12 minutos) cobrindo linguagens estudadas e planejar o próximo ciclo formativo.',
    prerequisito: 'Conclusão da Unidade 11.',
    entregaPrevista: 'Gravação contínua do recital completo e confronto comparativo com o diagnóstico inicial da Semana 1.',
    criterioAvanco: 'Continuidade de performance, expressividade cantábile da melodia e clareza na identificação do próximo plano de estudos.',
    baseTriade: 'Revisões específicas do método e práticas de gravação sem cortes.',
    exerciciosAssociados: []
  }
];

// Catálogo de Fontes
const fontesCatalogo = [
  {
    id: 'fonte-apresentacao',
    modulo: 'Geral',
    titulo: 'Apresentação do Método Tríade',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1pDpkPUBhabDCmMOtsaB68_KDjahZEz0T/view',
    statusVerificacao: 'Legenda conferida na auditoria',
    citadoEm: ['CURSO-VIOLAO-SOLO-MPB.md'],
    notaPedagogica: 'Apresenta a tríade de teoria, prática e motivação. Aulas de acompanhamento não equivalem a arranjos solo.'
  },
  {
    id: 'fonte-prep-fingerstyle',
    modulo: 'Módulo 7',
    titulo: 'Preparação para Fingerstyle',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1NyMR99FA2t53zKpi__CsWj-HUfjCRqz3/view',
    urlAlternativa: 'https://drive.google.com/file/d/1za8BEl6Uon_oKLsPFReIu7ul2n6VJjDY/view',
    statusVerificacao: 'Legenda conferida; vídeo verificado no catálogo',
    citadoEm: ['CURSO-VIOLAO-SOLO-MPB.md', 'INICIO-4-SEMANAS.md (Sessão 2A)'],
    notaPedagogica: 'Demonstra a escala de Dó maior com sustentação de baixos. Não presuma que a tablatura dos exercícios coincida com o vídeo.'
  },
  {
    id: 'fonte-m3-dedilhados-1',
    modulo: 'Módulo 3',
    titulo: '27 - Violão - 12.1 - Seus PRIMEIROS Dedilhados I (batida).mp4',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1McaJUwVSeLyqvGW7QvOQ6fFeiyGJ-n_B/view?usp=drivesdk',
    statusVerificacao: 'Metadados confirmados no inventário; trecho não verificado visualmente',
    citadoEm: ['UNIDADE-02.md (Sessões 5A, 6A)'],
    notaPedagogica: 'Use para observar postura e ataque dos dedos da mão direita. Assistir pertence ao orçamento de 40 minutos.'
  },
  {
    id: 'fonte-m3-dedilhados-2',
    modulo: 'Módulo 3',
    titulo: '28 - Violão - 12.2 - Seus PRIMEIROS Dedilhados II (batida).mp4',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1HteJ42zDSjS1aZp_yS_Y2l_WpW4eZq3l/view?usp=drivesdk',
    statusVerificacao: 'Confirmado no inventário; trecho não verificado visualmente',
    citadoEm: ['UNIDADE-02.md (Sessão 7A)'],
    notaPedagogica: 'Dedilhado básico de acompanhamento; aplicar princípios de ataque sem abandonar a independência da melodia.'
  },
  {
    id: 'fonte-m5-simplificando',
    modulo: 'Módulo 5',
    titulo: '14 - Violão - 18.5 - UPGRADE 6.0 simplificando acordes.mp4',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1xZcZZlyQtfvZ_a-MOZ5Z2k_pQW8lWzY7/view?usp=drivesdk',
    statusVerificacao: 'Confirmado no inventário',
    citadoEm: ['UNIDADE-02.md (Sessão 8A)'],
    notaPedagogica: 'Orientações para simplificar posições em caso de dor ou tensão muscular excessiva.'
  },
  {
    id: 'fonte-m3-formacao-acordes',
    modulo: 'Módulo 3',
    titulo: '26 - H P - 12 - Formação de Acordes - Pág 31 (UPGRADE 2023).mp4',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1-kNNrr_Qh2SQdtkd3hm28fc_BGtqR-ME/view?usp=drivesdk',
    statusVerificacao: 'Confirmado no inventário; trecho não verificado visualmente',
    citadoEm: ['UNIDADE-03.md (Sessão 9A)'],
    notaPedagogica: 'Estruturação intervalar 1–3–5. Lembre-se de mapear as notas no braço do violão.'
  },
  {
    id: 'fonte-m7-inversoes',
    modulo: 'Mês 7',
    titulo: '07 - Violão - 26.3 - Inversões na Prática.mp4',
    tipo: 'video',
    url: 'https://drive.google.com/file/d/1C9nM3SVa0kx2zgkGO9VbM_sFwT8lZ2Yl/view?usp=drivesdk',
    statusVerificacao: 'Duração declarada de 191s no manifesto do acervo',
    citadoEm: ['UNIDADE-03.md (Sessão 10A)'],
    notaPedagogica: 'Vídeo curto de demonstração de inversões práticas; aplicar imediatamente às 3 cordas de Ex. 4.'
  }
];

// Objeto Geral de Dados
const cursoDados = {
  meta: {
    versao: '1.3-lote4',
    dataGeracao: new Date().toISOString(),
    titulo: 'Curso de Violão — Método Tríade',
    subtitulo: 'Formação em Violão de Nylon • Catálogo Original & Meu Plano de Estudo',
    alunoPerfil: 'Básico a intermediário, violão de nylon, preferência por MPB e formação musical abrangente. Rotina: 3 sessões obrigatórias de 40 min + 1 opcional.',
    disponibilidadeSemanal: {
      sessoesObrigatorias: 3,
      duracaoSessaoMin: 40,
      sessaoOpcional: 1,
      totalObrigatorioMin: 120,
      totalComOpcionalMin: 160
    },
    rubricaPlano: {
      descricao: 'Rubrica pedagógica oficial em 4 dimensões (0 a 3) exclusiva do plano personalizado de estudos.',
      criterioAvanco: 'Avanço sugerido apenas quando as 4 dimensões atingirem pelo menos nota 2 em duas datas/sessões distintas.',
      dimensoes: [
        { id: 'continuidade', nome: 'Continuidade Rítmica', desc: 'Manter o pulso constante sem interrupções nas trocas.' },
        { id: 'clareza', nome: 'Clareza Sonora', desc: 'Notas limpas, sem ruídos, com sustentação e término intencional.' },
        { id: 'equilibrio', nome: 'Equilíbrio entre Vozes', desc: 'Melodia audivelmente destacada à frente do acompanhamento.' },
        { id: 'autonomia', nome: 'Compreensão e Autonomia', desc: 'Domínio da estrutura e capacidade de recuperar erros sem parar.' }
      ]
    }
  },
  estatisticasCatalogo,
  catalogoOriginal,
  planoEstudo: {
    unidades,
    sessoes: todasSessoes
  },
  exercicios: [...exercicios, ...u1Exercicios],
  fontes: fontesCatalogo
};

const outputPath = path.join(ROOT_DIR, 'interface/conteudo.js');
const outputContent = `/**
 * ARTEFATO GERADO AUTOMATICAMENTE POR interface/ferramentas/gerar-conteudo.cjs
 * DATA: ${new Date().toISOString()}
 * 
 * Contém o catálogo original do Método Tríade (300 aulas agrupadas)
 * e o plano personalizado de 48 semanas com exercícios homologados.
 */

window.CURSO_DADOS = ${JSON.stringify(cursoDados, null, 2)};
`;

fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log('✔ Arquivo interface/conteudo.js gerado com sucesso!');
console.log(`- Módulos do Método Tríade: ${catalogoOriginal.length}`);
console.log(`- Total de Aulas Agrupadas: ${estatisticasCatalogo.totalAulas} (197 com arquivo, 103 sem arquivo)`);
console.log(`- Unidades do Plano de Estudo: ${unidades.length} (3 disponíveis, 9 planejadas)`);
console.log(`- Sessões de 40 min: ${todasSessoes.length}`);
console.log(`- Exercícios e versões: ${exercicios.length + u1Exercicios.length}`);
console.log('--- Concluído com sucesso ---');
