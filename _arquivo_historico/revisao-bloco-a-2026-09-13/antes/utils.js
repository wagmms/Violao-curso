

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
    const catalogo = window.CATALOGO_DADOS || [];
    const aula = catalogo.find(a => a.id === fonteAtividade.aulaId);
    if (!aula) return fonteAtividade;
    return {
      ...fonteAtividade,
      modulo: aula.modulo,
      tituloAula: aula.titulo,
      url: aula.url,
      tipo: aula.tipo,
      statusVerificacao: aula.statusVerificacao
    };
  }

function hidratarFontes(atividade) {
    if (!atividade.fontes) return atividade;
    return {
      ...atividade,
      fontes: atividade.fontes.map(hidratarFonte)
    };
  }