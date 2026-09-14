# Proposta para a Etapa 1 — Mapa de Habilidades e Arquitetura Curricular (v02)

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Orquestrador e Revisor:** Codex  
**Workspace:** `C:\Users\wmors\Documents\ChatGPT\Violão`  
**Acervo:** `C:\Users\wmors\Videos\KatoMart Acelerado` (somente leitura)  
**Versão:** `v02` (Ajustada com IDs canônicos e hipóteses transparentes)

---

## 1. Princípios da Arquitetura Curricular

1. **Desacoplamento entre Proveniência e Ensino:** As 631 entradas do acervo comercial funcionam como repositório de recursos (`fontesOrigem[]`). A organização do curso será governada por competências observáveis em sequência lógica de aprendizado.
2. **Critérios de Fusão e Divisão:**
   - **Fusão (Merge):** Permitida apenas quando duas ou mais fontes sustentam rigorosamente o mesmo objetivo observável e mesmo nível de pré-requisito (ex: vídeo explicativo e vídeo de aplicação prática da mesma levada).
   - **Divisão (Split):** Exigida quando uma aula longa abrange competências independentes que sobrecarregam a sessão de estudo de 20 a 40 minutos.
   - Nenhuma decisão de fusão/divisão é apresentada como definitiva sem inspeção prévia dos trechos relevantes.
3. **Tratamento de Itens Administrativos:** Formulários de pesquisa, avisos de reembolso e sorteios antigos não integram a trilha pedagógica ativa.

---

## 2. Candidatos Selecionados para as Seis Aulas de Calibração (Etapa 2)

Os IDs canônicos, mensagens e arquivos físicos foram rigorosamente corrigidos a partir do inventário v02:

| # | Área Didática | Objetivo Observável Preliminar | Fonte Candidata Canônica | Arquivos Físicos Conferidos no Disco | Pré-requisito Proposto | Hipótese Preliminar de Trecho |
|---|---|---|---|---|---|---|
| **1** | **Ritmo / Pulso** | Sustentar pulso quaternário e célula rítmica de balada com cordas abafadas e acordes abertos | Tríade `aula-mod-1-17` ("Violão - 3.1 - Batida Balada Básica") | `00000932` (Vídeo MP4, 109,9 MB), `00000929` (Legenda VTT), `00000928` (Descrição MD) | Postura estável e toque com polegar | Localização hipotética a verificar: minutos 02:15 a 06:40 |
| **2** | **Ouvido / Percepção** | Identificar por escuta intervalos diatônicos ascendentes de 2ª maior e 3ª maior sem apoio visual | Tríade `aula-mod-1-15` ("H P - 3.1 Intervalos Diatônicos") | `00000919` (Vídeo MP4, 85,2 MB), `00000924` (Vídeo MP4, 115,5 MB), `00000925` (Vídeo MP4, 163,8 MB), Legendas VTT | Reconhecimento prévio de grave vs. agudo | Localização hipotética a verificar: minutos 04:00 a 08:30 do vídeo 919 |
| **3** | **Troca de Acordes** | Realizar a transição entre A (Lá Maior) e D (Ré Maior) no tempo 1 do compasso sem interrupção do pulso | Tríade `aula-mod-1-10` ("Violão - 2.2 - Inovação - Fluência no A e D") | `00000905` (Vídeo MP4, 120,4 MB), `00000908` (PDF pág 1, 1,4 MB) | Posições estáticas de A e D memorizadas | Localização hipotética: exercício de dedo guia no vídeo 905 |
| **4** | **Leitura de Notação** | Ler e tocar melodia em 1ª posição em compasso 4/4 identificando cordas soltas e presas nas casas 1 a 3 | Kaiserplay `aula-kaiser-124-3-partituras-faceis-para-iniciantes` | 7 arquivos PDF (`0. 1` a `0. 7`, 38 a 67 KB, cabeçalho `%PDF-1.7`), Descrição MD | Nomes das cordas soltas | Localização hipotética: primeira linha melódica do arquivo `0. 1` |
| **5** | **Acompanhamento** | Executar levada de acompanhamento com marcação de baixo e resposta de acordes | Kaiserplay `aula-kaiser-18-5-thumb-slap-batida-fingerstyle` (ou Levada Pop Swing) | `1. Aula.mp4` (42,5 MB), Legenda VTT, Descrição MD | Troca de acordes básicos (Em, G, C) | Verificar viabilidade do gesto sem tensão muscular |
| **6** | **Melodia com Baixo / Solo** | Tocar pequeno estudo a duas vozes mantendo a linha melódica audível e o baixo soando na cabeça do compasso | Kaiserplay `aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol` | `1. Aula.mp4` (68,5 MB), `0. Pequena Valsa` (PDF, 68,5 KB) | Dedilhado básico (p-i-m-a) e controle de toque | Inspecionar relação entre melodia e baixo na partitura |

> **Declaração de Transparência:** Nenhuma das técnicas ou demonstrações acima foi declarada homologada ou integralmente observada. Os trechos citados são hipóteses para guiar a inspeção pontual da Etapa 2.

---

## 3. Quadro Atualizado de Dependências de Implementação

1. **Estado Vigente da Interface:** O aplicativo em `app/` já teve o SVG estático em Am removido em 14/09/2026. A dependência real para as etapas futuras é criar componentes dinâmicos para renderização de partituras e diagramas musicais específicos por nível e exercício.
2. **Isolamento de Dados Curados:** Os arquivos gerados por indexadores automáticos (`dados-guias-aulas.js`) devem permanecer separados do conteúdo curado, garantindo que novas regenerações do acervo não sobrescrevam o trabalho pedagógico aprovado.
3. **Migração Compatível de Progresso:** O progresso do aluno deverá migrar do registro por fonte para o registro por aula pedagógica curada, sem fabricar falsos status de domínio.
