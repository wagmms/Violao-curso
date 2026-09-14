

const $ = id => document.getElementById(id);

const escapeHTML = str => {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
};

function mostrarAlerta(msg, titulo = 'Aviso') {
    return new Promise(resolve => {
      const dialog = $('modal-alerta');
      if (!dialog) { alert(msg); resolve(true); return; }
      $('alerta-titulo').textContent = titulo;
      $('alerta-corpo').innerHTML = escapeHTML(msg).replace(/\n/g, '<br>');
      $('btn-alerta-cancelar').style.display = 'none';
      $('btn-alerta-ok').onclick = async () => { dialog.close(); resolve(true); };
      $('btn-fechar-alerta').onclick = async () => { dialog.close(); resolve(false); };
      dialog.showModal();
    });
  }

function mostrarConfirmacao(msg, titulo = 'Confirmação') {
    return new Promise(resolve => {
      const dialog = $('modal-alerta');
      if (!dialog) { resolve(confirm(msg)); return; }
      $('alerta-titulo').textContent = titulo;
      $('alerta-corpo').innerHTML = escapeHTML(msg).replace(/\n/g, '<br>');
      $('btn-alerta-cancelar').style.display = '';
      $('btn-alerta-ok').onclick = () => { dialog.close(); resolve(true); };
      $('btn-alerta-cancelar').onclick = () => { dialog.close(); resolve(false); };
      $('btn-fechar-alerta').onclick = () => { dialog.close(); resolve(false); };
      dialog.showModal();
    });
  }

function obterDataLocal(diasDeslocamento = 0) {
    const d = new Date();
    if (diasDeslocamento) d.setDate(d.getDate() + diasDeslocamento);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

function hidratarFonte(fonteAtividade) {
    const mod = (window.CURSO_DADOS?.catalogoOriginal || []).find(m => m.aulas.some(a => a.id === fonteAtividade.aulaId));
    const aula = mod?.aulas.find(a => a.id === fonteAtividade.aulaId);
    if (!aula) return fonteAtividade;
    const material = aula.materiais.find(m => m.utilizavel && urlDriveValida(m.url));
    return {
      ...fonteAtividade,
      modulo: mod.nome,
      tituloAula: aula.grupo_aula,
      url: material?.url || '',
      tipo: material?.tipo || '',
      statusVerificacao: material ? (material.status_verificacao || 'Catalogado; acesso não reconferido') : 'Sem arquivo de estudo no catálogo'
    };
  }

function hidratarFontes(atividade) {
    if (!atividade.fontes) return atividade;
    return {
      ...atividade,
      fontes: atividade.fontes.map(hidratarFonte)
    };
  }

function urlDriveValida(url) {
  try { const u = new URL(url); return u.protocol === 'https:' && u.hostname === 'drive.google.com'; }
  catch { return false; }
}

function atividadeTemSessao(ativ) {
  return !!ativ && ativ.statusOperacional !== 'rascunho' && Array.isArray(ativ.sessao40min) && ativ.sessao40min.length === 6 &&
    ativ.sessao40min.every(b => typeof b.minutos === 'number' && b.minutos > 0 && b.fase && b.instrucao) &&
    ativ.sessao40min.reduce((s, b) => s + b.minutos, 0) === 40;
}

function novoId(prefixo) {
  return prefixo + '-' + (window.crypto?.randomUUID?.() || (Date.now() + '-' + Math.random().toString(36).slice(2)));
}

function sanitizarAnotacaoPratica(texto) {
  return escapeHTML((texto ?? '').replace(/\r\n/g, '\n'));
}

function dessanitizarAnotacaoPratica(texto) {
  const area = document.createElement('textarea');
  area.innerHTML = typeof texto === 'string' ? texto : '';
  return area.value;
}

function obterAnotacaoPratica(atividadeId) {
  if (!atividadeId || !state?.anotacoes || typeof state.anotacoes !== 'object') return '';
  return dessanitizarAnotacaoPratica(state.anotacoes[atividadeId] || '');
}

function atividadeTemAnotacao(atividadeId) {
  if (!atividadeId || !state?.anotacoes || typeof state.anotacoes !== 'object') return false;
  return typeof state.anotacoes[atividadeId] === 'string' && state.anotacoes[atividadeId].trim().length > 0;
}

function salvarAnotacaoPratica(atividadeId, texto) {
  if (!atividadeId) return;
  if (!state.anotacoes || typeof state.anotacoes !== 'object') state.anotacoes = {};
  const notaSanitizada = sanitizarAnotacaoPratica(texto);
  if (notaSanitizada.trim().length === 0) delete state.anotacoes[atividadeId];
  else state.anotacoes[atividadeId] = notaSanitizada;
  salvarEstado();
}

function configurarCampoAnotacoesPratica(textarea, atividadeId) {
  if (!textarea || !atividadeId) return;
  textarea.value = obterAnotacaoPratica(atividadeId);
  let debounceId = null;
  const salvarAgora = () => salvarAnotacaoPratica(atividadeId, textarea.value);
  textarea.addEventListener('input', () => {
    if (debounceId) clearTimeout(debounceId);
    debounceId = setTimeout(() => {
      debounceId = null;
      salvarAgora();
    }, 500);
  });
  textarea.addEventListener('blur', () => {
    if (debounceId) clearTimeout(debounceId);
    debounceId = null;
    salvarAgora();
  });
}
