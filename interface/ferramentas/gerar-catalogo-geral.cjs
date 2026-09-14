/**
 * gerar-catalogo-geral.cjs
 * 
 * Gerador oficial e determinístico do catálogo geral do Método Tríade.
 * Lê diretamente as fontes oficiais revisadas (INVENTARIO.json)
 * e o mapa persistente de identidades (mapa-identidade-aulas.json),
 * produzindo interface/conteudo-geral.js sem qualquer dependência de backups antigos
 * ou código da rota de 48 semanas desativada.
 *
 * Execução: node interface/ferramentas/gerar-catalogo-geral.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const INVENTARIO_PATH = path.join(ROOT_DIR, 'entregas-gemini/lote-1/revisado/INVENTARIO.json');
const MAPA_IDENTIDADE_PATH = path.join(__dirname, 'mapa-identidade-aulas.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'interface/conteudo-geral.js');

if (!fs.existsSync(INVENTARIO_PATH)) {
  console.error('ERRO: Arquivo INVENTARIO.json não encontrado em:', INVENTARIO_PATH);
  process.exit(1);
}

console.log('--- Gerando Catálogo Oficial do Método Tríade ---');
console.log('Origem: entregas-gemini/lote-1/revisado/INVENTARIO.json');

const inventarioRaw = JSON.parse(fs.readFileSync(INVENTARIO_PATH, 'utf8'));

let mapaIdentidade = {};
if (fs.existsSync(MAPA_IDENTIDADE_PATH)) {
  mapaIdentidade = JSON.parse(fs.readFileSync(MAPA_IDENTIDADE_PATH, 'utf8'));
  console.log(`Mapa de identidades carregado: ${Object.keys(mapaIdentidade).length} registros estáveis.`);
} else {
  console.warn('AVISO: mapa-identidade-aulas.json não encontrado. Gerando a partir da ordem.');
}

// 1. Definição dos 11 módulos na ordem original do Drive
const modulosOrdem = [
  { id: 'mod-1', nome: '01. Módulo 1', tituloOriginal: '01. Módulo 1', notaEditorial: 'Fundamentos e Primeiros Acordes (HP1 e Violão meses 1 a 3)', tipo: 'pedagogico' },
  { id: 'mod-2', nome: '02. Módulo 2', tituloOriginal: '02. Módulo 2', notaEditorial: 'Ritmos Básicos e Percepção', tipo: 'pedagogico' },
  { id: 'mod-3', nome: '03. Módulo 3', tituloOriginal: '03. Módulo 3', notaEditorial: 'Dedilhados, Teoria e Acordes', tipo: 'pedagogico' },
  { id: 'mod-4', nome: '04. Módulo 4', tituloOriginal: '04. Módulo 4', notaEditorial: 'Campo Harmônico e Rítmica', tipo: 'pedagogico' },
  { id: 'mod-5', nome: '05. Módulo 5', tituloOriginal: '05. Módulo 5', notaEditorial: 'Pestanas, Simplificações e Canções', tipo: 'pedagogico' },
  { id: 'mod-6', nome: '06. Módulo 6', tituloOriginal: '06. Módulo 6', notaEditorial: 'Harmonia Funcional e Repertório', tipo: 'pedagogico' },
  { id: 'mod-7', nome: '07. Mês 7', tituloOriginal: '07. Mês 7', notaEditorial: 'Inversões na Prática e Preparação Fingerstyle', tipo: 'pedagogico' },
  { id: 'mod-8', nome: '08. Mês 8', tituloOriginal: '08. Mês 8', notaEditorial: 'Extensões, Tensões e Repertório', tipo: 'pedagogico' },
  { id: 'mod-9', nome: '09. Mês 9', tituloOriginal: '09. Mês 9', notaEditorial: 'Peças Solo e Prática Integrada', tipo: 'pedagogico' },
  { id: 'mod-10', nome: '10. UPGRADE 5.0 Escala Maior Definitiva', tituloOriginal: '10. UPGRADE 5.0 Escala Maior Definitiva', notaEditorial: 'Complemento de Escalas', tipo: 'complemento_escalas' },
  { id: 'mod-11', nome: '11. Links da AULA MENSAL e SORTEIO', tituloOriginal: '11. Links da AULA MENSAL e SORTEIO', notaEditorial: 'Lives, Sorteios e Links Administrativos (Não curricular)', tipo: 'administrativo_lives' }
];

const catalogoModulos = {};
modulosOrdem.forEach((m, idx) => {
  catalogoModulos[m.nome] = {
    id: m.id,
    ordem: idx + 1,
    nome: m.nome,
    tituloOriginal: m.tituloOriginal,
    notaEditorial: m.notaEditorial,
    tituloExibicao: `${m.tituloOriginal} — ${m.notaEditorial}`,
    titulo: m.nome,
    tipo: m.tipo,
    aulas: {}
  };
});

let totalArquivosLidos = 0;
let totalVideos = 0;
let totalMp4 = 0;
let totalWebm = 0;
let totalPdfs = 0;
let totalPartFragExcluidos = 0;

for (const item of inventarioRaw) {
  if (item.modulo === 'Raiz do Backup') continue;
  totalArquivosLidos++;

  const modObj = catalogoModulos[item.modulo];
  if (!modObj) continue;

  const grupoNome = item.grupo_aula || item.titulo;
  if (!modObj.aulas[grupoNome]) {
    const mapKey = `${item.modulo}:::${grupoNome}`;
    let aulaId = mapaIdentidade[mapKey];
    if (!aulaId) {
      aulaId = `aula-${modObj.id}-${Object.keys(modObj.aulas).length + 1}`;
      console.log(`[NOVO ID ATRIBUÍDO]: ${mapKey} -> ${aulaId}`);
      mapaIdentidade[mapKey] = aulaId;
    }

    modObj.aulas[grupoNome] = {
      id: aulaId,
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

  if (item.caminho_local && !isPartFrag) {
    aulaRef.temArquivos = true;
  }
  if (item.tipo === 'aula_texto_plataforma' || item.status_verificacao === 'indisponivel') {
    aulaRef.statusAula = 'indisponivel_backup';
  }

  if (isPartFrag) {
    totalPartFragExcluidos++;
    // Excluir sumariamente do catálogo ativo utilizável
    continue;
  }

  if (item.tipo === 'video') {
    totalVideos++;
    if (item.titulo && item.titulo.toLowerCase().endsWith('.webm')) totalWebm++;
    else totalMp4++;
  }
  if (item.tipo === 'pdf') totalPdfs++;

  aulaRef.materiais.push({
    titulo: item.titulo,
    tipo: item.tipo,
    url: item.url || null,
    utilizavel: Boolean(item.url),
    status_verificacao: item.status_verificacao || 'catalogado',
    observacoes: item.observacoes || ''
  });
}

// 2. Ordenação estável e conversão para lista
const catalogoFinal = modulosOrdem.map(mDef => {
  const modData = catalogoModulos[mDef.nome];
  const aulasArray = Object.values(modData.aulas);

  // Ordenar aulas por lesson_index se disponível
  aulasArray.sort((a, b) => {
    if (a.lesson_index !== null && b.lesson_index !== null && a.lesson_index !== undefined && b.lesson_index !== undefined) {
      return a.lesson_index - b.lesson_index;
    }
    return a.grupo_aula.localeCompare(b.grupo_aula, 'pt-BR', { numeric: true });
  });

  return {
    id: modData.id,
    ordem: modData.ordem,
    nome: modData.nome,
    tituloOriginal: modData.tituloOriginal,
    notaEditorial: modData.notaEditorial,
    tituloExibicao: modData.tituloExibicao,
    tipo: modData.tipo,
    aulas: aulasArray
  };
});

// Atualizar mapa de identidades caso tenha havido novos itens
fs.writeFileSync(MAPA_IDENTIDADE_PATH, JSON.stringify(mapaIdentidade, null, 2), 'utf8');

const totalAulas = catalogoFinal.reduce((sum, m) => sum + m.aulas.length, 0);
const aulasComArquivo = catalogoFinal.reduce((sum, m) => sum + m.aulas.filter(a => a.temArquivos).length, 0);
const aulasSemArquivo = totalAulas - aulasComArquivo;

console.log('--- Estatísticas do Catálogo Gerado ---');
console.log(`Módulos: ${catalogoFinal.length}`);
console.log(`Total de Aulas: ${totalAulas}`);
console.log(`Aulas com Arquivos: ${aulasComArquivo}`);
console.log(`Aulas sem Arquivos (Plataforma): ${aulasSemArquivo}`);
console.log(`Vídeos Utilizáveis: ${totalVideos} (${totalMp4} MP4 + ${totalWebm} WebM)`);
console.log(`PDFs Utilizáveis: ${totalPdfs}`);
console.log(`Fragmentos .part-Frag excluídos: ${totalPartFragExcluidos}`);

const outputCode = `/**
 * Catálogo Canônico Oficial do Curso de Violão — Método Tríade
 * Gerado automaticamente a partir de INVENTARIO.json via gerar-catalogo-geral.cjs.
 * Fonte oficial: acervo completo do Drive (11 módulos, 300 aulas).
 * Nenhuma rota personalizada ou arquivo de 48 semanas incluído.
 */

window.CURSO_DADOS = {
  meta: {
    nomeCurso: "Curso de Violão — Método Tríade",
    origem: "entregas-gemini/lote-1/revisado/INVENTARIO.json",
    geradoEm: "${new Date().toISOString()}",
    totalModulos: ${catalogoFinal.length},
    totalAulas: ${totalAulas},
    aulasComArquivos: ${aulasComArquivo},
    aulasSemArquivos: ${aulasSemArquivo},
    videosUtilizaveis: ${totalVideos},
    videosMp4: ${totalMp4},
    videosWebm: ${totalWebm},
    pdfsUtilizaveis: ${totalPdfs},
    partFragExcluidos: ${totalPartFragExcluidos}
  },
  catalogoOriginal: ${JSON.stringify(catalogoFinal, null, 2)}
};
`;

fs.writeFileSync(OUTPUT_PATH, outputCode, 'utf8');
console.log(`Catálogo salvo com sucesso em: ${OUTPUT_PATH}`);
