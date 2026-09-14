# Relatório de Pendências — Etapa 0 (Inventário)

**Data:** 14/09/2026  
**Responsáveis:** Antigravity (Produtor Principal) / Codex (Orquestrador e Revisor)  
**Workspace:** `C:\Users\wmors\Documents\ChatGPT\Violão`  
**Acervo:** `C:\Users\wmors\Videos\KatoMart Acelerado` (somente leitura)  
**Versão:** `v01` (Aguardando Revisão do Codex)

---

## 1. Visão Geral

Durante a execução da Etapa 0 do Plano de Produção e Curadoria (`docs/PLANO-PRODUCAO-CURADORIA.md`), foram auditadas minuciosamente todas as **631 entradas** do catálogo (300 do Método Tríade e 331 do Kaiserplay) em confronto direto com os **2.090 arquivos físicos** do acervo local (82,70 GB), o manifesto estruturado do KatoMart e os registros históricos.

Este documento cataloga de forma exaustiva todas as pendências, incongruências, fragmentos, duplicatas (distinguindo hash idêntico de equivalência temática), itens administrativos e associações suspeitas identificadas.

---

## 2. Entradas sem Material Local (Mídia Reproduzível)

Do universo de 631 entradas, **111 entradas não possuem vídeo nem PDF local reproduzível**:

### 2.1 Método Tríade: 103 Entradas com Ausência Total de Arquivos (`temArquivos: false`)
- **Natureza:** Cadastradas originalmente na Hotmart como aulas de texto puro (duração 0s), quizzes de plataforma ou títulos sem arquivos de download no backup KatoMart.
- **Distribuição por Categoria:**
  - **Quizzes de Módulo (1 entrada):** `aula-mod-2-38` ("Quiz Para ir ao Mês 2").
  - **Bônus / Aulas ao Vivo (3 entradas):** `aula-mod-4-35` ("BÔNUS H_P - 13 - Colchêia 1 (Ao VIVO)"), `aula-mod-4-36` ("BÔNUS_ H_P - 14 - Form de Acordes II (Pág 37) AO VIVO"), `aula-mod-4-37` ("BÔNUS H_P - 16 - Campo Harmônico I (AO VIVO)").
  - **Harmonia e Percepção (HP) Teórica (15 entradas):** `aula-mod-2-1` (HP 5), `aula-mod-4-23` (HP 15), `aula-mod-5-21` (HP 18.2), `aula-mod-5-29` (HP 20), `aula-mod-6-5` (HP 21), `aula-mod-6-14` (HP 22), `aula-mod-6-19` (HP 23), `aula-mod-6-24` (HP 24), `aula-mod-7-12` (HP 27), `aula-mod-7-17` (HP 28), `aula-mod-9-14` (HP 33), `aula-mod-9-18` (HP 35), `aula-mod-10-8` (HP 38), `aula-mod-10-9` (HP 39), `aula-mod-10-10` (HP 40).
  - **Apostilas Declaradas sem Arquivo Vinculado (2 entradas):** `aula-mod-4-14` ("APOSTILA de H_P e de Violão (Meses 4 ao 9)"), `aula-mod-7-2` ("Apostila Mês 7 ao 9").
  - **Aulas de Prática / Repertório / Upgrades (69 entradas):** Módulos 4 a 10 (ex: `aula-mod-4-24`, `aula-mod-5-22`, `aula-mod-6-21`, etc.).
  - **Itens Administrativos / Miscelânea (13 entradas):** `aula-mod-10-11` ("Mega-Bônus_ 38.235 Cifras!"), `aula-mod-7-13` ("34 - Você pode me ajudar São só 3 perguntinhas!"), avisos de plataforma ("VIOLÃO - ACONTECEU ALGUMA COISA?").
- **Disponibilidade Remota:** Nenhuma dessas 103 entradas possui URL no catálogo (`url: null`). A recuperação dependerá de consulta a outros backups ou re-download pelo usuário caso estejam disponíveis no Drive ou na plataforma.

### 2.2 Método Tríade: 2 Entradas com Apenas `descricao.md`
- `aula-mod-4-34`: "Violão - 16.12 Janeiro - TOCA que eu CANTO" (possui apenas `descricao.md` de 535 bytes, sem vídeo; o texto da descrição é uma pesquisa de opinião: "Você pode me ajudar? São só 3 perguntinhas").
- `aula-mod-11-1`: "01 - SORTEIO VIOLÁO [30 07 2026]" (possui apenas `descricao.md` de 507.258 bytes contendo lista de participantes de um sorteio antigo).

### 2.3 Kaiserplay: 6 Entradas com Apenas `descricao.md` (Sem Vídeo nem PDF)
- `aula-kaiser-64-1-como-estudar-no-kaiserplay`: Instruções de navegação da plataforma em texto.
- `aula-kaiser-65-2-como-cancelar-a-sua-assinatura-e-pedir`: Instrução puramente comercial/administrativa de cancelamento de assinatura e reembolso.
- `aula-kaiser-288-29-informacao-importante-antes-de-seguir`: Texto de orientação pedagógica sobre a ordem de estudo da teoria musical.
- `aula-kaiser-207-46-por-una-cabeza-tango`: Descrição textual de repertório sem arquivo de vídeo local.
- `aula-kaiser-115-1-209-arranjos-pra-violao`: Texto contendo links externos para download de arranjos.
- `aula-kaiser-116-1-ebook-a-arte-auditiva-do-violao`: Texto contendo links para download de e-book.

---

## 3. Fragmentos de Download e Arquivos Temporários (.part / .part-frag)

O acervo contém arquivos residuais gerados por downloads interrompidos ou incompletos via Telegram/KatoMart:

1. **Arquivos `.parte-XX-de-YY` no Tríade (246 arquivos de 0 bytes):**
   - O downloader KatoMart criou marcações como `.mp4.parte-01-de-04` a `.mp4.parte-04-de-04`.
   - **Diagnóstico:** São arquivos vazios (0 bytes) que coexistem com o arquivo `.mp4` principal (íntegro e completo).
   - **Risco identificado:** O indexador anterior (`gerar-guias-curso.cjs`) foi afetado por esses arquivos porque a chave do `Map` era sobrescrita pelo último arquivo lido (o fragmento vazio) e depois descartada, fazendo com que aulas completas fossem dadas falsamente como "sem material".
2. **Arquivos `.part-Frag` no Tríade (58 arquivos):**
   - Registrados no manifesto como anexos de mensagens (ex: `00001412 - 1. Aula.pt_br.vtt.part-Frag114`).
   - Todos foram desconsiderados do catálogo de mídias utilizáveis.
3. **Arquivos `.part` no Kaiser (13 arquivos):**
   - Localizados em pastas de vídeo do Kaiser (ex: downloads parciais). Vídeos principais correspondentes devem ser verificados quanto à integridade de reprodução.

---

## 4. Anomalias de Nomenclatura e Arquivos sem Extensão Padrão

1. **PDFs sem extensão em `LEITURA DE PARTITURA` (Kaiserplay):**
   - Na pasta `Curso Kaiser/LEITURA DE PARTITURA/1. Leitura de Partitura/3. Partituras fáceis para iniciantes`, existem 7 arquivos com nomes `0. 1`, `0. 2`, `0. 3`, `0. 4`, `0. 5`, `0. 6`, `0. 7`.
   - **Inspeção de Magic Bytes:** Todos iniciam com a assinatura `%PDF-1.7` (`25 50 44 46 2d 31 2e 37`). São documentos PDF legítimos de partituras e tablaturas para iniciantes, salvos pelo downloader sem a extensão `.pdf`.
   - O indexador anterior os ignorava por buscar apenas `.pdf`.
2. **Anexos com extensões arbitrárias (Kaiserplay):**
   - Foram identificados arquivos como `. andantehpinto`, `. allegrettohpinto`, `. andantereligiosocarcassi`, `. parabens dó maior`, `. levada 1 baden powell`.
   - Tratam-se de materiais complementares salvos com o título da música como pseudo-extensão.

---

## 5. Itens Administrativos e Quizzes de Plataforma

As seguintes entradas não constituem aulas de violão e devem ser isoladas do percurso pedagógico:

| ID da Entrada | Título Original | Origem | Natureza | Recomendação Preliminar |
|---|---|---|---|---|
| `aula-kaiser-65-2-como-cancelar-a-sua-assinatura-e-pedir` | 2. Como cancelar a sua ASSINATURA e pedir REEMBOLSO | Kaiserplay | Administrativo / Comercial | Excluir do currículo de aulas |
| `aula-mod-4-34` | Violão - 16.12 Janeiro - TOCA que eu CANTO | Tríade | Pesquisa de opinião ("3 perguntinhas") | Excluir do currículo de aulas |
| `aula-mod-7-13` | 34 - Você pode me ajudar São só 3 perguntinhas! | Tríade | Pesquisa de opinião ("3 perguntinhas") | Excluir do currículo de aulas |
| `aula-mod-11-1` | 01 - SORTEIO VIOLÁO [30 07 2026] | Tríade | Registro de sorteio promocional | Excluir do currículo de aulas |
| `aula-mod-10-11` | Mega-Bônus_ 38.235 Cifras! | Tríade | Coletânea de cifras externas | Manter apenas como biblioteca de apoio |
| `aula-mod-2-38` | Quiz Para ir ao Mês 2 | Tríade | Teste automatizado de plataforma | Transformar em diagnóstico formativo autoral |
| `aula-mod-4-38` | Quiz para ir para o Mês 4 | Tríade | Teste automatizado de plataforma | Transformar em diagnóstico formativo autoral |

---

## 6. Associações Suspeitas e Desvios de Estrutura

### 6.1 Pasta Clones do Tríade inserida dentro da pasta do Kaiserplay
- **Caminho físico:** `C:\Users\wmors\Videos\KatoMart Acelerado\Curso Kaiser\Curso de Violão Método Tríade COMPLETO -\0. 1. Módulo 1`
- **Conteúdo:** 15 arquivos contendo cópias exatas (mesmo hash SHA-256) das 3 primeiras aulas do Módulo 1 do Método Tríade (Apostilas, Ritmo e Curiosidades).
- **Diagnóstico:** O downloader KatoMart ou uma sincronização anterior descarregou erroneamente o início do curso do Heitor Castro dentro da pasta do Kaiser.
- **Ação:** O catálogo não deve mapear esses arquivos como se fossem aulas do Kaiserplay; sua proveniência legítima é o Método Tríade.

### 6.2 Vídeo Idêntico Vinculado a 5 Aulas Distintas no Kaiserplay
- **Hash SHA-256:** `53c77cbc8f1eab1f71dfb9be4c8a2b535694c71bc6002f2a74c3e80f2d400e96` (42,5 MB).
- **Arquivos Físicos:**
  1. `Curso Kaiser/ACOMPANHAMENTO/1. Acompanhamento/5. THUMB SLAP _ Batida Fingerstyle/1. Aula.mp4`
  2. `Curso Kaiser/ARRANJO/1. Arranjo/6. Preenchimento Rítmico nos Arranjos/2. Aula.mp4`
  3. `Curso Kaiser/Repertório Nível 2/1. Repertório Nível 2/10. Rocky, Um Lutador _ Tema do Filme _ 6a corda afinada em/3. Aula.mp4`
  4. `Curso Kaiser/Repertório Nível 2/1. Repertório Nível 2/34. Dragon Ball GT - Sorriso Resplandecente/4. Aula.mp4`
  5. `Curso Kaiser/Repertório Nível 3/1. Repertório Nível 3/22. Evidências (Chitãozinho & Xororó)/3. Aula.mp4`
- **Diagnóstico:** O mesmo vídeo foi reutilizado pelo produtor como trecho complementar em múltiplos tópicos. Na curadoria da Etapa 1 e 2, deve-se verificar o conteúdo específico para não ensinar "Rocky" com demonstração de "Thumb Slap" ou vice-versa.

### 6.3 Deslocamento Editorial de Percepção Auditiva para o Módulo 2
- No catálogo original, temas de intervalos diatônicos (ex: `aula-mod-1-15`, `aula-mod-1-16`) aparecem associados a módulos de mecânica/fluência, apesar de haver um Módulo 3 dedicado integralmente à Percepção Auditiva.
- A Etapa 1 deverá reorganizar o fluxo pedagógico sem alterar o ID de proveniência original.

---

## 7. Análise de Duplicatas (Hash Idêntico vs. Equivalência Temática)

A auditoria computacional identificou **107 grupos de duplicatas exatas** por hash SHA-256, consumindo **3,05 GB** de armazenamento desnecessário.

### 7.1 Exemplos Críticos de Duplicatas Exatas (Mesmo Hash SHA-256)
- **Compassos (534,7 MB):**
  - `00000891 - 01 1. Módulo 1 - 08 8. H_P - 2 _ Compassos.mp4` (SHA-256: `a5563324824a71e6...`)
  - `00000896 - 01 1. Módulo 1 - 08 8. H_P - 2 _ Compassos - Aula.mp4` (SHA-256: `a5563324824a71e6...`)
- **Exercícios Preliminares (497,1 MB):**
  - `00000880 - 01_1_Módulo_1_05_5_Violão_1_2_1_Exercícios_Preliminares.mp4` (SHA-256: `d200343075e55c89...`)
  - `00000883 - 01_1_Módulo_1_05_5_Violão_1_2_1_Exercícios_Preliminares_Aula.mp4` (SHA-256: `d200343075e55c89...`)
- **Tríades Maiores (276,8 MB):**
  - `00000899 - 01 1. Módulo 1 - 09 9. Violão - 2.1 - Tríades Maiores.mp4` (SHA-256: `1517716887c05970...`)
  - `00000903 - 01_1_Módulo_1_09_9_Violão_2_1_Tríades_Maiores_Aula.mp4` (SHA-256: `1517716887c05970...`)
- **Noções Básicas de Ritmo (246,7 MB, 3 cópias):**
  - Presente em msg `866`, msg `871` e na subpasta clonada em Kaiser.
- **Postura (116,6 MB):**
  - `00000877` e `00000879` (SHA-256: `6a4be40b8f2fa397...`).
- **Como Afinar (104,8 MB):**
  - `00000887` e `00000889` (SHA-256: `c24b65a49e56050d...`).
- **Apostilas e Apresentação (93,1 MB, 3 cópias):**
  - `00000858`, `00000864` e subpasta clonada em Kaiser.

### 7.2 Conteúdo Tematicamente Parecido (Sem Hash Idêntico — Exige Curadoria Musical)
Distinguem-se claramente das duplicatas exatas por representarem tomadas diferentes, regravações ou abordagens complementares:
1. **Upgrades de Plataforma vs. Versão Original:**
   - Exemplo: "Let It Be" versão 3.4 (`aula-mod-1-20`) vs. "Let It Be" versão balada básica (`aula-mod-1-19`).
   - Exemplo: "Born This Way" com acordes E, A, D (`aula-mod-1-21`) vs. "Born This Way" com C e G (`aula-mod-1-25`).
   - Possuem hashes diferentes, durações distintas e abordam graus de dificuldade progressivos. Devem ser integradas ou sequenciadas na Etapa 1.
2. **Versão Estúdio vs. Versão Ao Vivo:**
   - Exemplo: "Aula 3.1 Intervalos Diatônicos" versão gravada em estúdio (`aula-mod-1-15`) vs. versão "AO VIVO" (`aula-mod-1-43`).
   - São dois registros didáticos da mesma matéria com exemplos e interações distintas.
3. **Múltiplos Módulos de Baden Powell:**
   - O curso possui aulas de Baden Powell tanto no Módulo 8 do Tríade quanto nas seções de repertório e levadas do Kaiserplay. Não são arquivos idênticos, mas cobrem o mesmo universo rítmico/estilístico.

---

## 8. Resumo das Ações para a Etapa 1

1. Isolar os 7 itens administrativos/quizzes do fluxo de aulas regulares.
2. Reconciliar os 107 grupos de arquivos de hash idêntico para evitar download e armazenamento redundante na integração.
3. Definir proposta de fusão para pares temáticos complementares (Upgrades e partes 1/2).
4. Estabelecer rota de recuperação para as 111 entradas sem mídia local, registrando explicitamente as fontes ausentes sem inventar demonstrações nem homologações.
