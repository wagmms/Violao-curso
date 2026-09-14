# Registro de Pendências e Observações de Acervo — Lote 4

**Curso de Violão — Método Tríade (Formação em Violão de Nylon)**  
*Lote 4 — Versão 1.3 • Data de Registro:* 13/09/2026

Este documento registra formalmente os status conhecidos do acervo, limitações de fontes, divergências de inventário e itens preservados para decisões futuras do arquiteto pedagógico (Codex) e do usuário.

---

## 1. Apostilas dos Meses 4 a 9 do Método Tríade

- **Situação Identificada:**  
  No acervo local baixado da Katomart (`katomart-backup/courses/curso-de-violao-metodo-triade-completo-h_df1da73f/`), foram localizadas e inspecionadas as apostilas em PDF referentes aos **Meses 1 a 3** de Harmonia e Percepção (`00 Apostila HP1 meses 1.pdf`) e Violão Popular (`00 Apostila-Violao-Mese.pdf`), totalizando 35 páginas cada.
- **Pendência:**  
  Os arquivos em PDF correspondentes às apostilas dos **Meses 4 a 9** não constam na pasta física do backup local.
- **Tratamento na Interface:**  
  O catálogo gerado em `interface/conteudo.js` registra a ausência dessas apostilas nos módulos 4 a 9 sem simular documentos fictícios. Caso o usuário localize esses PDFs em outra pasta ou no Drive oficial, eles poderão ser adicionados ao catálogo em atualização futura.

---

## 2. Aulas da Plataforma sem Mídia no Backup Físico (103 Aulas)

- **Situação Identificada:**  
  O catálogo integral do curso possui 300 aulas distribuídas em 11 módulos (conforme `INDICE-METODO-TRIADE.md` e metadados da plataforma). Destas, **197 aulas possuem arquivos de mídia ou PDFs aproveitáveis**, enquanto **103 aulas** correspondem a tópicos textuais, avisos de módulo ou lições cujos arquivos de vídeo não faziam parte do pacote baixado pela ferramenta Katomart.
- **Tratamento na Interface:**  
  Nenhuma aula foi omitida ou apagada do catálogo oficial do Método Tríade. As 103 aulas são exibidas com o indicativo visual **"Indisponível no Backup"**, sem botões de play fictícios e sem links quebrados, preservando a visão transparente do currículo original.

---

## 3. Exclusão de Arquivos Fragmentados (`.part-Frag` — 58 Itens)

- **Situação Identificada:**  
  Na auditoria do Lote 1, foram mapeados 58 arquivos terminados na extensão `.part-Frag`, resultantes de interrupções de download ou partes incompletas de streaming de vídeo.
- **Tratamento na Interface:**  
  Em estrita conformidade com as diretrizes do projeto, nenhum arquivo `.part-Frag` foi considerado como aula completa ou habilitado como link de estudo. Todos foram categorizados como "arquivos excluídos de uso pedagógico" no gerador de conteúdo.

---

## 4. Preservação de Arranjos Comerciais para Unidades Futuras (U6 a U12)

- **Situação Identificada:**  
  O plano personalizado de 48 semanas prevê projetos com repertório de MPB e peças clássicas/populares (*Certas Coisas* de Lulu Santos, tema de *O Poderoso Chefão* de Nino Rota, *Garota de Ipanema*, *Wave*, etc.).
- **Tratamento no Lote 4:**  
  Conforme determinado pelo briefing, as Unidades 4 a 12 são apresentadas como **unidades planejadas**, explicitando objetivos, pré-requisitos e entregas previstas da arquitetura v1.3. Não foram criadas partituras ou tablaturas sintéticas para arranjos comerciais que ainda não passaram por homologação pedagógica completa pelo Codex.

---

## 5. Dependência de Acesso Prévio aos Vídeos do Google Drive

- **Situação Identificada:**  
  Os arquivos de vídeo do Método Tríade estão hospedados no Google Drive compartilhado do curso.
- **Tratamento na Interface:**  
  A interface e todos os exercícios, tablaturas, cronômetros e diários funcionam 100% offline. Para reproduzir os vídeos do acervo, o aluno é direcionado via links seguros para o Google Drive em nova aba (`target="_blank" rel="noopener noreferrer"`), exigindo conexão com a internet e login na conta que possui autorização de acesso ao Drive. A aplicação local não tenta capturar senhas, embutir players fechados ou burlar restrições da plataforma.
