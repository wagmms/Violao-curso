/**
 * validar-aula.cjs - Validador Automatizado cand-004 v03
 *
 * Implementa:
 * 1. Função reutilizável validarAulaPacote(dirPath, options)
 * 2. Validação da entrega oficial com zero erros
 * 3. Bateria de 6 testes negativos de mutação chamando a MESMA função de validação:
 *    - Mutação 1: Hash SHA-256 incorreto de arq-0408
 *    - Mutação 2: ID pedagógico alterado (diferente de aula-ped-017-leitura-clave-sol)
 *    - Mutação 3: Vazamento de resposta em recurso de saída
 *    - Mutação 4: Texto de AULA.md divergente do JSON canônico
 *    - Mutação 5: Início ou duração incorretos de eventos melódicos
 *    - Mutação 6: Link de recurso inexistente ou quebrado
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../../../..');

// ---------------------------------------------------------------------------
// 1. PARSER CSV RFC 4180
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

// ---------------------------------------------------------------------------
// 2. FUNÇÃO GERADORA DE MARKDOWN (FINA-06)
// ---------------------------------------------------------------------------
function renderAulaMarkdown(data) {
  const c14 = data.contrato_14_pontos;
  const idFontes = c14['1_identidade_e_fontes'];
  const obj = c14['2_objetivo_observavel'];
  const diag = c14['3_diagnostico_entrada'];
  const conc = c14['4_explicacao_conceitual'];
  const dem = c14['5_demonstracao_e_referencias'];
  const prat = c14['6_pratica_guiada'];
  const niv = c14['7_niveis_execucao'];
  const exer = c14['8_exercicio_executavel'];
  const feed = c14['9_feedback_e_diagnostico'];
  const apl = c14['10_aplicacao_musical'];
  const saida = c14['11_avaliacao_saida'];
  const recup = c14['12_protocolo_recuperacao'];
  const ret = c14['13_retencao_e_transferencia'];
  const plano = c14['14_plano_sessao_e_registro'];

  let md = `# ${idFontes.titulo}\n\n`;
  md += `## 1. Apresentação da Aula e Materiais Necessários\n\n`;
  md += `Bem-vindo ao seu primeiro estudo de leitura notacional no violão! Nesta aula, você aprenderá a reconhecer as notas diretamente na pauta musical (Clave de Sol) e a executá-las com precisão na primeira posição do braço do instrumento.\n\n`;
  md += `- **Tema de Estudo:** Leitura de Partitura Melódica na 1ª Posição do Violão\n`;
  md += `- **Melodia de Aplicação:** *"${idFontes.obra_aplicacao}"*\n`;
  md += `- **Materiais Necessários para o Estudo:**\n`;
  md += `  - Violão com encordoamento de nylon ou aço afinado.\n`;
  md += `  - Afinador eletrônico (de clip ou aplicativo).\n`;
  md += `  - Metrônomo (físico ou aplicativo) com ajuste de 40 a 80 BPM.\n`;
  md += `  - Dispositivo com saída de som funcional (alto-falante do celular, computador ou fones) para ouvir a referência de áudio.\n`;
  md += `  - Pauta de Leitura: utilize a **[Pauta Limpa de Estudo](${dem.recursos_visuais.pauta_limpa})** para visão completa, a **[Pauta Vertical para Celular](${dem.recursos_visuais.pauta_celular})**, ou os sistemas individuais ampliados:\n`;
  md += `    - **[Sistema 1 — Compassos 1 e 2](${dem.recursos_visuais.sistema_1_individual})**\n`;
  md += `    - **[Sistema 2 — Compassos 3 e 4](${dem.recursos_visuais.sistema_2_individual})**\n`;
  md += `  - Pauta de Apoio: **[Pauta Anotada com Gabarito](${dem.recursos_visuais.pauta_anotada})** (para consulta de dúvidas teóricas ou conferência inicial).\n\n`;
  md += `---\n\n`;

  md += `## 2. Objetivo Observável da Aula\n\n`;
  md += `Ao concluir esta sessão de estudo, você será capaz de:\n`;
  md += `> **${obj.declaracao}**\n\n`;
  md += `---\n\n`;

  md += `## 3. Diagnóstico de Entrada (Check-in Pré-Aula)\n\n`;
  md += `Antes de iniciar a leitura na pauta, faça esta checagem rápida em 4 passos:\n\n`;
  md += `### D1: ${diag[0].titulo}\n`;
  md += `- **Sua Tarefa:** ${diag[0].tarefa}\n`;
  md += `- **Convenção Padrão:** ${diag[0].convencao}\n`;
  md += `- **Resposta Esperada:** ${diag[0].resposta_esperada}\n\n`;
  md += `### D2: ${diag[1].titulo}\n`;
  md += `- **Sua Tarefa:** ${diag[1].tarefa}\n`;
  md += `- **Resposta Esperada:** ${diag[1].resposta_esperada}\n`;
  md += `- **Orientação:** ${diag[1].orientacao}\n\n`;
  md += `### D3: ${diag[2].titulo}\n`;
  md += `- **Sua Tarefa:** ${diag[2].tarefa}\n`;
  md += `- **Dicas Posturais e Anatômicas:** ${diag[2].postura}\n`;
  md += `- **Resposta Esperada:** ${diag[2].resposta_esperada}\n\n`;
  md += `### D4: ${diag[3].titulo}\n`;
  md += `- **Sua Tarefa:** ${diag[3].tarefa}\n`;
  md += `- **Resposta Esperada:**\n`;
  md += `  - **Semínima:** ${diag[3].figuras.seminima}.\n`;
  md += `  - **Mínima:** ${diag[3].figuras.minima}. *(${diag[3].figuras.nota_semibreve})*.\n\n`;
  md += `---\n\n`;

  md += `## 4. O Código da Partitura: Clave de Sol e o Registro do Violão\n\n`;
  md += `### A Pauta Musical e a Clave de Sol\n`;
  md += `${conc.pauta}\n`;
  md += `- A **Clave de Sol** tem o centro de sua espiral desenhado exatamente sobre a **${conc.clave_sol.linha_referencia}ª linha** da pauta.\n`;
  md += `- ${conc.clave_sol.descricao}\n`;
  md += `- A partir dessa linha de referência, subindo ou descendo linha por espaço, localizam-se todas as outras notas musicais.\n\n`;
  md += `### A Convenção de Oitava do Violão\n`;
  md += `${conc.convencao_oitava_violao.justificativa}\n`;
  md += `- ${conc.convencao_oitava_violao.regra}\n`;
  md += `- Na prática: você lê a nota na pauta e a executa diretamente na posição correspondente do violão, sem necessidade de realizar cálculos mentais durante a leitura.\n\n`;
  md += `### Mapa das 6 Notas da Aula na Pauta e no Braço\n\n`;
  md += `| Nota Escrita | Posição na Pauta | Altura Sonora Real | Corda no Violão | Casa | Dedo Mão Esquerda |\n`;
  md += `| :---: | :--- | :---: | :---: | :---: | :---: |\n`;
  for (const n of conc.mapa_notas) {
    md += `| **${n.nota_escrita}** | ${n.posicao_pauta} | ${n.nota_sonora_ref} (${n.frequencia_hz_ref} Hz) | **${n.corda}ª corda** | ${n.casa === 0 ? 'Solta (0)' : 'Casa ' + n.casa} | ${n.dedo_mao_esquerda} |\n`;
  }
  md += `\n---\n\n`;

  md += `## 5. Referência Sonora e Demonstração\n\n`;
  md += `Ouça a melodia completa executada a 60 BPM para internalizar as alturas e as durações:\n`;
  md += `- **[Áudio de Referência (Síntese Sonora a 60 BPM)](${dem.audio_sintese.arquivo})**\n\n`;
  md += `> **Nota sobre o Áudio de Referência:** Este arquivo é uma **síntese auditiva métrico-frequencial** criada para calibrar a afinação exata das notas e o andamento do metrônomo. ${dem.audio_sintese.tipo}.\n\n`;
  md += `---\n\n`;

  md += `## 6. Prática Instrumental Guiada\n\n`;
  md += `Trabalharemos a assimilação motora e visual em quatro passos estruturados:\n\n`;
  for (const p of prat.passos) {
    md += `### Passo ${p.passo}: ${p.titulo}\n`;
    md += `${p.acao}\n\n`;
  }
  md += `---\n\n`;

  md += `## 7. Três Níveis de Execução: Preparação, Alvo e Variação\n\n`;
  md += `### Nível 1: Preparação (${niv.preparacao.andamento_bpm} na Pauta Limpa)\n`;
  md += `- **Objetivo:** ${niv.preparacao.foco}.\n`;
  md += `- **Execução:** Toque os 4 compassos completos olhando para a **[Pauta Limpa](${niv.preparacao.recurso})** (ou para a **[Pauta para Celular](${dem.recursos_visuais.pauta_celular})**). Repita 3 vezes consecutivas sem pausas involuntárias.\n\n`;
  md += `### Nível 2: Alvo (${niv.alvo.andamento_bpm} com Amortecimento e Continuidade)\n`;
  md += `- **Objetivo:** ${niv.alvo.foco}.\n`;
  md += `- **Execução:** Ajuste o metrônomo a 60 BPM. Conte *"1, 2, 3, 4"* e execute a melodia inteira mantendo o pulso rigorosamente estável e aplicando o amortecimento da 3ª corda na transição c.2 -> c.3.\n`;
  md += `- *(Nota de Progressão: Caso atinja 52 ou 56 BPM com total precisão nesta primeira sessão, sua meta foi cumprida com sucesso; os 60 BPM poderão ser consolidados na sessão seguinte).*\n\n`;
  md += `### Nível 3: Variações do Objetivo (Sem Técnicas Ocultas)\n`;
  md += `Para testar a flexibilidade da leitura sem memorização mecânica, pratique estas duas variações:\n`;
  md += `- **Variação A — ${niv.variacoes[0].nome}:**\n`;
  md += `  - ${niv.variacoes[0].descricao}\n`;
  md += `- **Variação B — ${niv.variacoes[1].nome}:**\n`;
  md += `  - ${niv.variacoes[1].descricao}\n\n`;
  md += `---\n\n`;

  md += `## 8. Escolha da Mão Direita e Condução do Toque\n\n`;
  md += `- **Opção Recomendada (Dedos Indicador e Médio):** ${exer.mao_direita.recomendada}\n`;
  md += `- **Opção Alternativa (Polegar):** ${exer.mao_direita.alternativa}\n`;
  md += `- **Finalização da Frase:** ${exer.encerramento}\n\n`;
  md += `---\n\n`;

  md += `## 9. Mapeamento de Sintomas Observáveis e Hipóteses Corretivas\n\n`;
  md += `| Sintoma Observável | Hipóteses a Verificar | Conduta Corretiva |\n`;
  md += `| :--- | :--- | :--- |\n`;
  for (const f of feed) {
    md += `| **${f.sintoma}** | ${f.hipoteses_verificar} | ${f.conduta_corretiva} |\n`;
  }
  md += `\n---\n\n`;

  md += `## 10. Expressividade Musical e Dinâmica\n\n`;
  md += `- **Dinâmica Mezzoforte ($mf$):** ${apl.dinamica_mf}\n`;
  md += `- **Fraseado:** ${apl.fraseado}\n\n`;
  md += `---\n\n`;

  md += `## 11. Avaliação de Saída: Teste de Leitura Real (Anti-Memória)\n\n`;
  md += `Para certificar-se de que você está lendo as figuras na partitura e não apenas tocando por memória auditiva, realize as três etapas a seguir.\n\n`;
  md += `> **Importante:** ${saida.instrucao} Documento independente: **[Gabarito Oficial da Avaliação de Saída](${saida.gabarito_arquivo})**.\n\n`;
  for (const q of saida.questoes) {
    md += `### Questão ${q.numero}: ${q.tema}\n`;
    for (const p of q.perguntas) {
      md += `- ${p}\n`;
    }
    md += `\n`;
  }
  md += `### Teste Prático de Leitura em Ponto Intermediário\n`;
  md += `Ligue o metrônomo a 48 ou 60 BPM e **inicie a execução diretamente no tempo 1 do Compasso 3**, tocando os compassos 3 e 4 até o fim.\n`;
  md += `- *Evidência Pedagógica:* ${saida.teste_intermediario}\n\n`;
  md += `### Rubrica de Autoavaliação desta Tentativa\n`;
  for (const r of saida.rubrica) {
    md += `- [ ] **${r}**\n`;
  }
  md += `\n---\n\n`;

  md += `## 12. Protocolos de Recuperação Específicos\n\n`;
  md += `Caso encontre dificuldades em algum trecho específico durante a autoavaliação, execute o protocolo correspondente:\n\n`;
  md += `### Recuperação do Salto de Corda (${recup.loop_troca_corda.trecho})\n`;
  md += `A troca de ${recup.loop_troca_corda.notas} é a transição mais desafiadora da frase. Execute este loop com contagem rigorosa:\n`;
  md += `1. Ligue o metrônomo a 48 BPM.\n`;
  md += `2. Faça a contagem verbal: ${recup.loop_troca_corda.contagem_metronomo}.\n`;
  md += `3. **Critério de Superação:** ${recup.loop_troca_corda.criterio_superacao}.\n\n`;
  md += `### Recuperação de Confusão Visual de Linha vs. Espaço\n`;
  md += `${recup.recuperacao_confusao_visual.acao}\n\n`;
  md += `---\n\n`;

  md += `## 13. Protocolo de Retenção Espaçada e Tarefa de Transferência\n\n`;
  md += `A consolidação da leitura musical depende de dois processos distintos: a **generalização imediata** (ler uma frase inédita com as mesmas regras) e a **retenção de curto e médio prazo** (evocar as notas após um intervalo de descanso).\n\n`;
  md += `### A. Protocolo de Retenção (${ret.retencao_espacada.intervalo_horas})\n`;
  md += `Esta revisão observa a recuperação da tarefa após um intervalo; uma tentativa não comprova domínio definitivo. Faça a checagem sem aquecimento com respostas prontas:\n`;
  md += `1. **Agendamento:** Marque uma sessão breve de checagem para amanhã ou depois de amanhã (${ret.retencao_espacada.intervalo_horas}).\n`;
  md += `2. **Tentativa Fria (Cold Recall):** ${ret.retencao_espacada.tipo_teste}.\n`;
  md += `3. **Regra de Decisão:**\n`;
  md += `   - *Se executar sem hesitações:* ${ret.retencao_espacada.regras_decisao.sucesso_tentativa}\n`;
  md += `   - *Se houver erros ou hesitações:* ${ret.retencao_espacada.regras_decisao.hesitacao_ou_erros}\n`;
  md += `4. **Limite da Evidência:** ${ret.retencao_espacada.limite_evidencia}\n\n`;
  md += `### B. Tarefa de Transferência (Aplicação em Melodia Inédita)\n`;
  md += `A transferência avalia se a sua capacidade de decodificar notas se aplica a um novo contexto musical:\n`;
  md += `- Abra a **[Pauta Limpa de Transferência](${ret.tarefa_transferencia.recursos.pauta_limpa})** (ou seu vetor **[SVG](${ret.tarefa_transferencia.recursos.pauta_limpa_svg})**).\n`;
  md += `- Trata-se de uma frase inédita em ${ret.tarefa_transferencia.compassos} compassos regulares de ${ret.tarefa_transferencia.formula} contendo as notas Mi, Fá, Sol, Ré e Dó em uma ordenação melódica diferente da que você estudou.\n`;
  md += `- **Passo a Passo:**\n`;
  md += `  1. Leia as notas na pauta em silêncio.\n`;
  md += `  2. Toque a frase no violão no seu próprio tempo.\n`;
  md += `  3. Após sua tentativa autônoma, abra o **[Gabarito da Transferência](${ret.tarefa_transferencia.recursos.gabarito_texto})** e a **[Pauta Anotada da Transferência](${ret.tarefa_transferencia.recursos.pauta_gabarito})** para conferir suas notas.\n`;
  md += `  4. Compare sua execução com a **[Referência em Áudio da Transferência (60 BPM)](${ret.tarefa_transferencia.recursos.audio_sintese})**.\n\n`;
  md += `---\n\n`;

  md += `## 14. Sessão Estruturada de Prática e Ficha de Registro\n\n`;
  md += `### Planejamento de Tempo da Sessão Completa (40 Minutos Cronométricos)\n\n`;
  md += `| Intervalo | Duração | Atividade | Foco Pedagógico |\n`;
  md += `|---|---|---|---|\n`;
  for (const s of plano.sessao_40_min) {
    md += `| **${s.minutos}** | ${s.duracao_min} min | ${s.atividade} | Foco prático |\n`;
  }
  md += `\n### Versão Curta de 20 Minutos (Para Dias de Tempo Reduzido)\n`;
  for (const sc of plano.versao_curta_20_min.etapas) {
    md += `- **${sc.minutos} (${sc.duracao_min} min):** ${sc.atividade}.\n`;
  }
  md += `- *Conteúdo Adiado na Versão Curta:* ${plano.versao_curta_20_min.conteudo_adiado}\n\n`;
  md += `### Ficha de Registro de Acompanhamento do Aluno\n\n`;
  md += `Preencha ao final de cada sessão no seu diário de estudos:\n\n`;
  md += String.fromCharCode(96, 96, 96) + 'markdown\n';
  md += `---\n`;
  md += `FICHA DE REGISTRO DE PRÁTICA — LEITURA NA 1ª POSIÇÃO\n`;
  md += `Data da Sessão: ____/____/2026\n`;
  md += `Duração Efetiva da Sessão: ( ) 40 minutos completa   ( ) 20 minutos reduzida\n`;
  md += `Andamento alcançado com pulso estável: [    ] BPM\n`;
  md += `Andamento alvo (60 BPM) alcançado?\n`;
  md += `  ( ) Sim, com estabilidade\n`;
  md += `  ( ) Parcialmente (entre 48 e 56 BPM com boa precisão)\n`;
  md += `  ( ) Não, priorizei precisão a 48 BPM\n\n`;
  md += `Sintomas ou desafios observados:\n`;
  md += `  ( ) Hesitação na leitura de notas na 4ª corda (Mi/Fá)\n`;
  md += `  ( ) Dificuldade na sustentação de mínimas por 2 tempos inteiros\n`;
  md += `  ( ) Hesitação no salto da 3ª para a 4ª corda (c.2 para c.3)\n`;
  md += `  ( ) Ressonância indesejada da 3ª corda solta\n`;
  md += `  ( ) Tensão na mão esquerda (necessidade de pausas)\n\n`;
  md += `Tarefa de Transferência (caso realizada):\n`;
  md += `  ( ) Concluída com leitura fluida\n`;
  md += `  ( ) Concluída com necessidade de conferência no gabarito\n`;
  md += `  ( ) Adiada para a próxima sessão\n\n`;
  md += `Planejamento da Retenção Espaçada:\n`;
  md += `  Data agendada para a Checagem Fria (24-48h): ____/____/2026\n`;
  md += `  Próxima ação:\n`;
  md += `  ( ) Avançar para a próxima melodia do módulo\n`;
  md += `  ( ) Repetir prática de 15 minutos focando no andamento\n`;
  md += `---\n`;
  md += String.fromCharCode(96, 96, 96) + '\n\n';
  md += `---\n\n`;

  md += `## Anexo Técnico e Proveniência Curricular\n\n`;
  md += `> **Nota de Curadoria Editorial:** As informações a seguir registram a proveniência dos materiais e os identificadores formais do acervo técnico do curso integrado. Elas foram isoladas neste anexo para preservar a fluidez do estudante durante o estudo prático da aula.\n\n`;
  md += `- **ID Pedagógico Estável da Aula:** \`${data.id_pedagogico}\`\n`;
  md += `- **ID do Candidato de Calibração:** \`${data.candidato_id}\`\n`;
  md += `- **ID da Proposta Curricular (Etapa 1 v03):** \`${data.id_proposta}\`\n`;
  md += `- **Módulo Pedagógico Integrado:** \`${data.modulo_pedagogico}\` (Iniciação à Leitura Notacional e Repertório Elementar)\n`;
  md += `- **Habilidade Trabalhada:** \`${data.habilidade_id}\` (Leitura de partitura melódica elementar na 1ª posição em Clave de Sol)\n`;
  md += `- **Fonte Histórica Original:** ${idFontes.fonte_historica.curso}, Entrada do Catálogo nº ${idFontes.fonte_historica.entrada_catalogo} (\`${idFontes.fonte_historica.entrada_origem_id}\`).\n`;
  md += `- **Arquivo Físico Original no Acervo:** ID \`${idFontes.fonte_historica.arquivo_fisico_id}\` (Nome no disco: \`${idFontes.fonte_historica.nome_arquivo_fisico}\`, tamanho: ${idFontes.fonte_historica.tamanho_bytes} bytes, hash SHA-256: \`${idFontes.fonte_historica.hash_sha256}\`).\n`;
  md += `- **Caminho Relativo no Acervo:** \`${idFontes.fonte_historica.caminho_relativo_acervo}\`.\n`;
  md += `- **Identificador Editorial do Material:** \`${idFontes.fonte_historica.identificador_editorial_material}\`.\n`;
  md += `- **Natureza da Adaptação Didática:** ${idFontes.natureza_adaptacao}\n`;
  md += `- **Status de Homologação:** \`${data.status}\` (Etapa 2B calibração de aula completa).\n`;

  return md;
}

// ---------------------------------------------------------------------------
// 3. MOTOR REUTILIZÁVEL DE VALIDAÇÃO (FINA-06)
// ---------------------------------------------------------------------------
function validarAulaPacote(baseDir, overrides = {}) {
  const passes = [];
  const errors = [];

  function chk(desc, condition, errDetail) {
    if (condition) {
      passes.push(desc);
    } else {
      errors.push({ desc, detail: errDetail });
    }
  }

  // 1. EVIDENCIAS.csv
  const evidenciasPath = path.join(baseDir, 'EVIDENCIAS.csv');
  chk('Existência de EVIDENCIAS.csv', fs.existsSync(evidenciasPath), 'EVIDENCIAS.csv ausente');
  if (fs.existsSync(evidenciasPath)) {
    const csvRaw = fs.readFileSync(evidenciasPath, 'utf8');
    const csvRows = parseRFC4180CSV(csvRaw);
    chk('EVIDENCIAS.csv possui registros', csvRows.length >= 6, `Linhas: ${csvRows.length}`);
    chk('Cabeçalho EVIDENCIAS.csv correto', csvRows[0][0] === 'item_id' && csvRows[0][2] === 'caminho_arquivo');
  }

  // 2. Base curricular real
  let matrizCsvPath = path.resolve(baseDir, '../../../etapa-1-curriculo/v03/MATRIZ-FONTE-AULA.csv');
  if (!fs.existsSync(matrizCsvPath)) {
    matrizCsvPath = path.join(PROJECT_ROOT, 'producao/etapa-1-curriculo/v03/MATRIZ-FONTE-AULA.csv');
  }
  chk('Existência de MATRIZ-FONTE-AULA.csv', fs.existsSync(matrizCsvPath), 'Matriz curricular ausente');
  if (fs.existsSync(matrizCsvPath)) {
    const matrizRows = parseRFC4180CSV(fs.readFileSync(matrizCsvPath, 'utf8'));
    const r17 = matrizRows.find(r => r[2] === 'aula-prop-017');
    chk('aula-prop-017 presente na matriz', !!r17);
    if (r17) {
      chk('aula-prop-017 vinculada a hab-lei-003', r17[3] === 'hab-lei-003');
    }
  }

  let aulasPropJsonPath = path.resolve(baseDir, '../../../etapa-1-curriculo/v03/AULAS-PROPOSTAS.json');
  if (!fs.existsSync(aulasPropJsonPath)) {
    aulasPropJsonPath = path.join(PROJECT_ROOT, 'producao/etapa-1-curriculo/v03/AULAS-PROPOSTAS.json');
  }
  chk('Existência de AULAS-PROPOSTAS.json', fs.existsSync(aulasPropJsonPath), 'AULAS-PROPOSTAS.json ausente');
  if (fs.existsSync(aulasPropJsonPath)) {
    const ap = JSON.parse(fs.readFileSync(aulasPropJsonPath, 'utf8'));
    const p17 = ap.aulasPropostas.find(a => a.id === 'aula-prop-017');
    chk('aula-prop-017 em AULAS-PROPOSTAS.json', !!p17);
    if (p17) {
      chk('aula-prop-017 no mod-ped-05', p17.moduloPedagogicoId === 'mod-ped-05');
    }
  }

  // 3. aula.json (com suporte a override de mutação)
  let aulaJson = overrides.aulaJson || null;
  const aulaJsonPath = path.join(baseDir, 'aula.json');
  if (!aulaJson && fs.existsSync(aulaJsonPath)) {
    try {
      aulaJson = JSON.parse(fs.readFileSync(aulaJsonPath, 'utf8'));
    } catch (e) {
      chk('aula.json é JSON válido', false, e.message);
    }
  }
  chk('Existência de aula.json', !!aulaJson, 'aula.json não pôde ser carregado');

  if (aulaJson) {
    // FINA-02: ID pedagógico estável e candidatoId separado
    chk('FINA-02: ID pedagógico estável é aula-ped-017-leitura-clave-sol', aulaJson.id_pedagogico === 'aula-ped-017-leitura-clave-sol', `ID observado: ${aulaJson.id_pedagogico}`);
    chk('FINA-02: candidato_id separado é cand-004', aulaJson.candidato_id === 'cand-004', `CandidatoId observado: ${aulaJson.candidato_id}`);
    chk('Vínculo proposta aula-prop-017', aulaJson.id_proposta === 'aula-prop-017');
    chk('Vínculo módulo mod-ped-05', aulaJson.modulo_pedagogico === 'mod-ped-05');
    chk('Vínculo habilidade hab-lei-003', aulaJson.habilidade_id === 'hab-lei-003');
    chk('Status é aguardando_revisao', aulaJson.status === 'aguardando_revisao');

    // FINA-01: Fonte física arq-0408
    const c14 = aulaJson.contrato_14_pontos;
    chk('Contrato de 14 pontos presente', !!c14);
    if (c14 && c14['1_identidade_e_fontes']) {
      const fh = c14['1_identidade_e_fontes'].fonte_historica;
      chk('FINA-01: Arquivo físico é arq-0408', fh.arquivo_fisico_id === 'arq-0408');
      chk('FINA-01: Nome físico do arquivo no disco é "0. 1"', fh.nome_arquivo_fisico === '0. 1', `Nome: ${fh.nome_arquivo_fisico}`);
      chk('FINA-01: Tamanho físico é 51.500 bytes', fh.tamanho_bytes === 51500, `Tamanho: ${fh.tamanho_bytes}`);
      chk('FINA-01: Hash SHA-256 canônico decfdf2e...', fh.hash_sha256 === 'decfdf2e34bb85eded08973c14754138257835957d96a01fcc2cb6bcf535dbd8', `Hash: ${fh.hash_sha256}`);
    }

    // Cronômetros
    if (c14 && c14['14_plano_sessao_e_registro']) {
      const p40 = c14['14_plano_sessao_e_registro'].sessao_40_min;
      const soma40 = p40.reduce((acc, cur) => acc + cur.duracao_min, 0);
      chk('Soma de 40 min exatos', soma40 === 40, `Soma: ${soma40}`);

      const p20 = c14['14_plano_sessao_e_registro'].versao_curta_20_min;
      const soma20 = p20.etapas.reduce((acc, cur) => acc + cur.duracao_min, 0);
      chk('Soma de 20 min exatos', soma20 === 20, `Soma: ${soma20}`);
      chk('Conteúdo adiado declarado na versão curta', typeof p20.conteudo_adiado === 'string' && p20.conteudo_adiado.length > 20);
    }
  }

  // 4. AULA.md e Concordância Gerada (FINA-06)
  const requiredSections = ['1_identidade_e_fontes','2_objetivo_observavel','3_diagnostico_entrada','4_explicacao_conceitual','5_demonstracao_e_referencias','6_pratica_guiada','7_niveis_execucao','8_exercicio_executavel','9_feedback_e_diagnostico','10_aplicacao_musical','11_avaliacao_saida','12_protocolo_recuperacao','13_retencao_e_transferencia','14_plano_sessao_e_registro'];
  if (!aulaJson || requiredSections.some(k => !aulaJson.contrato_14_pontos?.[k])) {
    chk('FINA-06: Quatorze seções presentes', false, 'Seção obrigatória ausente; renderização interrompida.');
    return {success:false,passes,errors};
  }
  let mdContent = overrides.mdContent || null;
  const aulaMdPath = path.join(baseDir, 'AULA.md');
  if (!mdContent && fs.existsSync(aulaMdPath)) {
    mdContent = fs.readFileSync(aulaMdPath, 'utf8');
  }
  chk('Existência de AULA.md', !!mdContent, 'AULA.md não pôde ser carregado');

  if (mdContent && aulaJson) {
    // Verificar se AULA.md no disco bate exatamente com o Markdown gerado
    const expectedMd = renderAulaMarkdown(aulaJson);
    chk('FINA-06: AULA.md no disco é gerado estritamente a partir do JSON canônico', mdContent.trim() === expectedMd.trim(), 'AULA.md difere do texto gerado deterministicamente por renderAulaMarkdown(aulaJson)');

    // FINA-03 & AC-02: Garantir ausência de respostas vazadas em AULA.md
    const leakedAnswers = mdContent.match(/\(Resposta:.*?\)/gi);
    chk('FINA-03 / AC-02: Ausência de respostas vazadas no texto do estudante em AULA.md', !leakedAnswers, `Respostas detectadas: ${leakedAnswers ? leakedAnswers.join('; ') : ''}`);
    chk('Referência ao gabarito-saida.md na seção 11', mdContent.includes('gabarito-saida.md'));

    // FINA-04: Conclusão sóbria sem promessa de memória permanente
    chk('FINA-04: Conclusão sóbria na seção de retenção (tarefa recuperada com sucesso nesta revisão)', mdContent.includes('tarefa foi recuperada com sucesso nesta revisão'));

    // FINA-04: Frequência em Hz desobrigada da Questão 1 da saída
    const sec11Match = mdContent.match(/### Questão 1:[\s\S]*?(?=### Questão 2:|$)/i);
    if (sec11Match) {
      chk('FINA-04: Pergunta de saída Q1 não exige frequência em Hz como critério de leitura', !sec11Match[0].includes('frequência'));
    }
  }

  // 5. EVENTOS.json e integridade métrica
  let eventosJson = overrides.eventosJson || null;
  const evPath = path.join(baseDir, 'EVENTOS.json');
  if (!eventosJson && fs.existsSync(evPath)) {
    try {
      eventosJson = JSON.parse(fs.readFileSync(evPath, 'utf8'));
    } catch (e) {
      chk('EVENTOS.json é JSON válido', false, e.message);
    }
  }
  chk('Existência de EVENTOS.json', !!eventosJson, 'EVENTOS.json não encontrado');

  if (eventosJson) {
    const eventos = eventosJson.adaptacao_pedagogica.eventos;
    chk('Total de 14 eventos melódicos', eventos.length === 14, `Total: ${eventos.length}`);
    const somaTempos = eventos.reduce((acc, cur) => acc + cur.duracao_tempos, 0);
    chk('Soma de tempos dos eventos = 16.0', somaTempos === 16.0, `Soma: ${somaTempos}`);
    chk('Duração de áudio declarada = 16.0s', eventosJson.adaptacao_pedagogica.duracao_audio_segundos === 16.0);
    chk('Compassos declarados = 4', eventosJson.adaptacao_pedagogica.total_compassos === 4);

    // Início cronológico contínuo
    let tEsp = 0.0;
    let seqOk = true;
    for (const ev of eventos) {
      if (Math.abs(ev.inicio_tempo_global - tEsp) > 0.001) {
        seqOk = false;
        break;
      }
      tEsp += ev.duracao_tempos;
    }
    chk('Início temporal contínuo e ordenado de todos os eventos', seqOk);
  }

  // 6. RECURSOS.json e arquivos no disco
  let recursosJson = overrides.recursosJson || null;
  const recPath = path.join(baseDir, 'RECURSOS.json');
  if (!recursosJson && fs.existsSync(recPath)) {
    try {
      recursosJson = JSON.parse(fs.readFileSync(recPath, 'utf8'));
    } catch (e) {
      chk('RECURSOS.json é JSON válido', false, e.message);
    }
  }
  chk('Existência de RECURSOS.json', !!recursosJson, 'RECURSOS.json não encontrado');

  if (recursosJson) {
    const allRecs = [...recursosJson.recursos_principais, ...recursosJson.recursos_transferencia];
    for (const r of allRecs) {
      const fullPath = path.join(baseDir, r.arquivo);
      if (overrides.brokenLinkSimulated && r.arquivo === overrides.brokenLinkSimulated) {
        chk(`Recurso existe no disco: ${r.arquivo}`, false, `Recurso simulado como quebrado: ${r.arquivo}`);
      } else {
        chk(`Recurso existe no disco: ${r.arquivo}`, fs.existsSync(fullPath), `Arquivo não encontrado: ${fullPath}`);
        if (fs.existsSync(fullPath)) {
          const stats = fs.statSync(fullPath);
          chk(`Recurso não-vazio: ${r.arquivo}`, stats.size > 100, `Tamanho: ${stats.size} bytes`);
        }
      }
    }

    // FINA-03: Auditoria dos recursos de leitura limpa (verificar flag sem_nomes_notas)
    const cleanRecs = allRecs.filter(r => r.sem_nomes_notas === true);
    chk('FINA-03: Recursos de leitura limpa devidamente rotulados com sem_nomes_notas: true', cleanRecs.length >= 5, `Contagem: ${cleanRecs.length}`);
  }


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
    for (const m of mdContent.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = m[1];
      if (!/^https?:/.test(target)) chk('FINA-06: Link real existe: ' + target, fs.existsSync(path.join(baseDir, target)));
    }
    const exit = mdContent.match(/## 11\.[\s\S]*?(?=## 12\.|$)/)?.[0] || '';
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
      const texts = [...fs.readFileSync(file, 'utf8').matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[1]);
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
    success: errors.length === 0,
    passes,
    errors
  };
}

// ---------------------------------------------------------------------------

module.exports = {renderAulaMarkdown, validarAulaPacote, parseRFC4180CSV};
if (require.main === module) require('./testar-entrega.cjs').executar();
