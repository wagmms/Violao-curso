# Mapa Curricular Integrado: Tríade + Kaiser (v03)

**Data:** 14/09/2026  
**Produtor:** Antigravity  
**Revisor:** Codex

---

## 1. Princípios de Arquitetura e Navegação

1. **Exploração Livre desde o Dia 1:**  
   Não existem travas mecânicas ou bloqueios forçados de interface no aplicativo. O estudante tem liberdade integral para navegar por módulos, habilidades e repertório desde a primeira sessão.
2. **Pré-requisitos de Tarefa Recomendados:**  
   O encadeamento entre unidades é estruturado como recomendação pedagógica de domínio prévio (`PREREQUISITOS-JUSTIFICADOS.csv`), orientando a ordem ótima de estudo sem coagir a navegação.
3. **Núcleo Vertebral Inicial (33 Propostas) vs Fila Ampla de Expansão:**  
   As 33 aulas propostas nesta etapa constituem o **esqueleto inicial de validação curricular**. Elas asseguram 100% de cobertura dos 8 domínios pedagógicos e das 29 habilidades do DAG. As 588 entradas restantes do catálogo estão formalmente alocadas em destinos editoriais (`dest-expansao-curadoria`, etc.) para desenvolvimento nos lotes seguintes.
4. **Distinção entre Prática Autodeclarada e Revisão Ativa:**  
   O sistema pedagógico separa explicitamente sessões de execução livre/autodeclarada de exercícios de verificação com gabarito ou rubrica objetiva.

---

## 2. Estrutura dos 13 Módulos Pedagógicos

| Módulo ID | Nome do Módulo | Domínio Predominante | Aulas Iniciais | Papel no Currículo |
| :--- | :--- | :--- | :--- | :--- |
| `mod-ped-01` | Fundamentos Posturais e Ergonomia | Postura / Mecânica | `aula-prop-001` | Base física do instrumento |
| `mod-ped-02` | Produção de Som e Digitação Básica | Postura / Mecânica | `aula-prop-002`, `003` | Toque apoiado/livre e sincronia |
| `mod-ped-03` | Pulso e Levada Pop/Balada | Ritmo / Levadas | `aula-prop-004`, `005` | Pêndulo contínuo e batidas |
| `mod-ped-04` | Fluência de Acordes Abertos e Trocas | Harmonia / Mecânica | `aula-prop-006`, `007` | Montagem e trocas limpas (A/D, etc.) |
| `mod-ped-05` | Percepção de Alturas e Intervalos | Percepção Auditiva | `aula-prop-011`, `012`, `013` | Reconhecimento e entoação |
| `mod-ped-06` | Leitura Musical e Notação Básica | Leitura de Partitura | `aula-prop-014`, `015` | Pauta, clave de Sol e ritmo |
| `mod-ped-07` | Primeiro Repertório Guiado | Repertório / Prática | `aula-prop-017`, `018` | Músicas completas de 2 a 4 acordes |
| `mod-ped-08` | Campo Harmônico e Pestanas | Harmonia / Teoria | `aula-prop-019`, `020` | Pestana em Fá e funções tonais |
| `mod-ped-09` | Ritmos Brasileiros I — Samba e Bossa | Ritmo / Levadas | `aula-prop-021`, `022` | Levadas sincopadas e condução |
| `mod-ped-10` | Ritmos Brasileiros II — Baião e Choro | Ritmo / Levadas | `aula-prop-023`, `024` | Levadas regionais e Baden Powell |
| `mod-ped-11` | Técnica de Solos e Escalas | Técnica de Solos | `aula-prop-025`, `026` | Pentatônica e palhetada alternada |
| `mod-ped-12` | Técnicas Percussivas e Fingerstyle | Acompanhamento / Fingerstyle | `aula-prop-030`, `031` | Thumb Slap e levadas percussivas |
| `mod-ped-13` | Expressão, Improvisação e Criação | Expressão / Criação | `aula-prop-032`, `033` | Variação dinâmica e improvisação |

---

## 3. Grafo DAG de Habilidades (29 Habilidades, 0 Ciclos)

As 29 habilidades estão organizadas nos 8 domínios canônicos:
1. **`postura_mecanica`** (4 habilidades: `hab-tec-001` a `004`)
2. **`ritmo_levadas`** (6 habilidades: `hab-rit-001` a `006`)
3. **`harmonia`** (4 habilidades: `hab-har-001` a `004`)
4. **`percepcao_auditiva`** (4 habilidades: `hab-ouv-001` a `004`)
5. **`leitura_notacao`** (3 habilidades: `hab-not-001` a `003`)
6. **`repertorio_pratica`** (4 habilidades: `hab-rep-001` a `004`)
7. **`tecnica_solos`** (2 habilidades: `hab-solo-001` e `002`)
8. **`expressao_criacao`** (2 habilidades: `hab-exp-001` e `002`)

Todas as dependências foram checadas via busca em profundidade (DFS) com **zero ciclos detectados**.
