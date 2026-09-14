# Resumo de Diferenças — Lote 1 Revisado

> Revisão Codex: cobertura dos 705 caminhos físicos confirmada. Corrigidos neste lote a referência à aula 34/MD do M4, a contagem de 197 grupos no mapa e uma associação de PDF no inventário. Limites e decisões constam em ../../lote-2/REVISAO-CODEX.md.

**Executor:** Antigravity / Gemini  
**Destinatário:** Codex (Arquiteto Pedagógico)  
**Data:** 12 de setembro de 2026  
**Referência:** `CORRECOES-PARA-GEMINI.md` e `REVISAO-CODEX.md`  

---

Esta revisão corrige as divergências apontadas pelo Codex, preservando a entrega original do Lote 1 e disponibilizando os novos arquivos na pasta `entregas-gemini/lote-1/revisado/`.

### 1. Reconciliação Epistemológica e de Metadados
- **Origem da evidência:** Os manifestos `manifest.json` e `katomart_manifest.json` foram reenquadrados como relatórios técnicos de backup (`kind: katomart-rclone-backup`, com hashes SHA-256 idênticos), e não como auditoria independente da plataforma Hotmart.
- **Supressão de alegações de integridade:** Foram retiradas todas as afirmações de "integridade total" e "verificação direta da plataforma". Separou-se categoricamente a existência física do arquivo, a viabilidade de abertura e o exame direto de seu conteúdo.

### 2. Correção Rigorosa das Contagens e Nomenclaturas
- **Aulas no manifesto (300):** 195 classificadas como vídeo e 105 como texto.
- **Aulas com arquivos (197):** 195 de vídeo e 2 de texto (Módulo 4 aula 34 com descrição MD e Módulo 11 aula 1 com MD).
- **Aulas sem arquivo (103):** Todas de texto com duração zero no manifesto (86 nos Módulos 4–7).
- **Padronização:** Nomes duplicados de módulos (ex.: "04. 4. Módulo 4") foram corrigidos para o padrão "04. Módulo 4".

### 3. Inventário Físico Completo (808 Registros)
- O `INVENTARIO.json` foi expandido para cobrir os **705 arquivos físicos do backup** mais as **103 aulas sem arquivo**:
  - 285 vídeos (284 MP4 + 1 WebM).
  - 33 PDFs e 244 legendas VTT.
  - 81 descrições MD, 2 imagens e 2 manifestos JSON.
  - 58 fragmentos `.part-Frag` classificados como `excluido_uso_didatico` (pedaços corrompidos de download HTTP de 102–464 bytes, preservados sem exclusão).
- Adicionado o campo `caminho_local` e mapeamento por `module_index` e `lesson_index`.

### 4. Rastreabilidade das Aulas Prioritárias
- Associados os caminhos físicos exatos de vídeos, legendas e PDFs de cada aula prioritária com sínteses das evidências observadas.
- Desvinculada expressamente a leitura de legendas de qualquer inspeção visual de digitações (vídeos não foram assistidos visualmente).

### 5. Módulo 11 (Lives e Sorteio)
- Tabela detalhada reestruturada no `MAPA-FONTES.md`, diferenciando a Aula 1 (texto com MD de sorteio) da Aula 2 (vídeo com 2 MP4s, 1 WebM e MD de descrição). Enquadradas como lives institucionais opcionais para a Sessão D.

### 6. Apostila dos Meses 4 ao 9 como Pendência Aberta
- A busca pela apostila citada na aula 2 do Módulo 4 foi declarada formalmente como **pendência documental aberta**, e não encerrada. Registrada a necessidade de busca na plataforma original ou complementação curricular própria.

### 7. Ajustes Conceituais e Musicais
- Eliminadas referências infundadas ("80% da MPB", CAGED E/A sem diagrama verificado e alegação de salto da Unidade 2 à 9).
- Carga semanal ajustada para 120–160 minutos (três sessões obrigatórias de 40 min e quarta opcional).
- Aula de Escala Maior condicionada a uma ponte didática autocontida prévia.
- Garota de Ipanema delimitada como levada de acompanhamento com citações melódicas pontuais nos acordes (nível 3), sem arranjo solo contínuo no acervo.

