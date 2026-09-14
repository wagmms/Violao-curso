# Modelo de Dados, Entidades e Migração — Redesign 1 (Piloto v2 Revisado)

Este documento descreve o modelo formal de entidades, esquemas de validação profunda, arquitetura de persistência, estados de prontidão/habilidade e migração do ambiente de aprendizagem em `interface-v2/`, alinhado a `CORRECOES-ANTIGRAVITY.md` e `REVISAO-CODEX.md`.

---

## 1. Princípios Arquiteturais de Dados

1. **Separação Estrita de Papéis**: O acervo de 300 aulas catalogadas (`dados-catalogo.js`) é referência e biblioteca de consulta. As atividades didáticas (`dados-atividades.js`), rotinas de 40 minutos e registros do estudante (`app.js`) são entidades ativas separadas.
2. **Validação Profunda Antecipada**: Nenhuma mutação de estado ocorre sem validação profunda prévia (`validarEsquemaBackup`). Backups corrompidos, com `[null]`, enums inválidos ou IDs inexistentes são rejeitados com erro legível, mantendo o estado prévio inalterado.
3. **Persistência Local e Resiliente**: O estado reside no `localStorage` sob a chave isolada `metodo_triade_v2`. Em caso de falha de armazenamento, o sistema opera em memória e notifica sobre a necessidade de exportação manual em JSON.
4. **Preservação de Registros Legados**: A chave `metodo_triade_geral_v1` jamais é sobrescrita ou importada automaticamente. A migração v1 é disponibilizada como ação **explícita** pelo usuário com resumo prévio.
5. **Merge Idempotente**: Importações consecutivas do mesmo backup não duplicam tentativas, dificuldades ou revisões (deduplicação por chave única via `Map`).
6. **Sanitização Universal**: Nenhum ID, nota ou texto não confiável é interpolado diretamente em HTML sem sanitização estrita via `escapeHTML`.

---

## 2. Diagrama Conceitual de Entidades

```
┌─────────────────────────┐               ┌─────────────────────────┐
│     ModuloCatalogo      │ 1           * │       AulaCatalogo      │
│  (id, nome, ordem)      ├───────────────┤  (id, grupo_aula, ...)  │
└─────────────────────────┘               └───────────┬─────────────┘
                                                      │ 1
                                                      │ *
                                          ┌───────────┴─────────────┐
                                          │     MaterialArquivo     │
                                          │  (tipo, url, status...) │
                                          └─────────────────────────┘

┌─────────────────────────┐ 1           * ┌─────────────────────────┐
│    AtividadeDidatica    ├───────────────┤    NivelExercicio (3)   │
│ (id, slug, habilidade)  │               │ (preparacao/alvo/var.)  │
└───────────┬─────────────┘               └─────────────────────────┘
            │ 1
            ├──────────────────────────┐
            │ *                        │ *
┌───────────┴─────────────┐┌───────────┴─────────────┐┌─────────────────────────┐
│   CadernoDificuldade    ││     RevisaoEspacada     ││    TentativaSessao      │
│ (id, trecho, problema)  ││ (id, ciclo, dataPrev)   ││ (data, status, bpm)     │
└─────────────────────────┘└─────────────────────────┘└─────────────────────────┘
```

---

## 3. Especificação das Entidades e Esquemas

### 3.1. Entidade: `SessaoEstudo`
Representa o ciclo de estudo ativo ou pausado de 40 minutos:
```typescript
interface SessaoEstudo {
  id: string;              // Identificador único da sessão (ex: 'sessao-1773489123')
  atividadeId: string;     // Atividade vinculada (ex: 'ativ-1')
  nivel: 'preparacao' | 'alvo' | 'variacao';
  passoIndex: number;      // Índice do bloco ativo (0 a 5)
  elapsedMs: number;       // Milissegundos estudados (0 a 2.400.000 ms)
  totalMs: number;         // Orçamento total fixo: 2.400.000 ms (40 minutos)
  ativa: boolean;          // Estado de execução (sempre false ao restaurar do disco)
}
```

### 3.2. Entidade: `HabilidadeDemonstrada`
Registra o estado formal de domínio da habilidade conforme autoavaliação guiada por critérios:
```typescript
interface HabilidadeDemonstrada {
  status: 'em_pratica' | 'alvo_demonstrado';
  data: string; // Data ISO local (YYYY-MM-DD)
}
```
- **`em_pratica`**: Sucesso registrado no nível de *Preparação*. Registra avanço motor sem aprovar o objetivo da aula.
- **`alvo_demonstrado`**: Sucesso registrado no nível *Alvo* mediante confirmação dos critérios de estabilidade e andamento.

### 3.3. Entidade: `RevisaoEspacada`
Agenda não-punitiva de consolidação com teto de **estritamente uma revisão pendente por atividade**:
```typescript
interface RevisaoEspacada {
  id: string;              // Identificador estável (ex: 'rev-1773489300')
  atividadeId: string;     // Identificador da atividade ('ativ-1' a 'ativ-6')
  ciclo: number;           // 1 (2 dias), 2 (7 dias), 3 (21 dias)
  intervaloDias: 2 | 7 | 21;
  dataPrevista: string;    // Data local calculada (YYYY-MM-DD)
  concluida: boolean;      // true após o registro do resultado
}
```
- Sucesso no Alvo conclui a revisão pendente e avança: 2 dias (Ciclo 1) → 7 dias (Ciclo 2) → 21 dias (Ciclo 3, manutenção ajustável).
- Repetir ou Dificuldade agenda revisão curta de recuperação para 2 dias sem multiplicar dívidas.

### 3.4. Entidade: `CadernoDificuldade`
Registros específicos de tropeço observável no instrumento:
```typescript
interface CadernoDificuldade {
  id: string;              // 'dif-1773489201'
  atividadeId: string;     // 'ativ-2'
  trecho: string;          // Ex: "Troca de Lá para Ré no tempo 4"
  problema: string;        // Ex: "Dedo 3 chiou ao aproximar da casa 3"
  data: string;            // Data local (YYYY-MM-DD)
  resolvida: boolean;      // Alternado via botão no Caderno
}
```

### 3.5. Entidade: `TentativaSessao`
Histórico de execuções com ID estável e métricas concretas:
```typescript
interface TentativaSessao {
  id: string;              // 'tent-1773489100'
  data: string;            // Data local (YYYY-MM-DD)
  atividadeId: string;     // 'ativ-1'
  nivel: 'preparacao' | 'alvo' | 'variacao';
  status: 'consegui' | 'repetir' | 'dificuldade';
  bpm: number;             // Valor numérico finito verificado
  observacoes?: string;    // Texto livre (sanitizado na renderização)
}
```

### 3.6. Entidade Central: `EstadoUsuario` (v2)
Serializado no `localStorage` sob a chave `metodo_triade_v2`:
```json
{
  "versao": 2,
  "perfil": {
    "nivel": "basico",
    "estilo": "nylon_geral",
    "meta": "MPB / Solo e Acompanhamento",
    "dataCriacao": "2026-09-13"
  },
  "atividadeAtualId": "ativ-1",
  "nivelExercicioAtual": "alvo",
  "sessao": {
    "id": "sessao-1773489123",
    "atividadeId": "ativ-1",
    "nivel": "alvo",
    "passoIndex": 0,
    "elapsedMs": 600000,
    "totalMs": 2400000,
    "ativa": false
  },
  "tentativas": [],
  "dificuldades": [],
  "revisoes": [],
  "habilidades": {
    "pulso-subdivisao": { "status": "alvo_demonstrado", "data": "2026-09-13" }
  },
  "legado": {
    "assistidos": ["aula-mod-1-1", "aula-mod-1-2"],
    "praticados": ["aula-mod-1-2"],
    "notas": { "aula-mod-1-2": "Anotação histórica preservada" }
  }
}
```

---

## 4. Estados de Prontidão e Verificação de Fontes

| Dimensão | Estado | Significado Técnico e Pedagógico |
|---|---|---|
| **Prontidão Didática** | `catalogo` | Aula apenas inventariada no acervo de referência. |
| | `em_revisao` | **Status obrigatório do piloto** (as 6 atividades) até parecer final de homologação do Codex. |
| | `pronta` | Homologada em produção após aceite formal de código e pedagogia. |
| **Verificação de Fonte** | `catalogado` | Link para arquivo existente no Google Drive confirmado. |
| | `complemento_proprio` | Roteiro autoral (Antigravity), exercitável e autocontido, sem falsa atribuição a transcrição oficial do acervo. |

---

## 5. Algoritmo do Motor de Recomendação

A função `obterRecomendacao()` implementa a seguinte ordem determinística de prioridades:
1. **Atividade Escolhida pelo Usuário**: Se `state.atividadeAtualId` foi selecionada manualmente ou diagnosticada e o alvo ainda não foi demonstrado, essa atividade é prioritária.
2. **Retomada de Sessão Pausada**: Se houver sessão pausada com tempo decorrido (`elapsedMs > 0`), prioriza a conclusão dos 40 minutos.
3. **Recuperação de Dificuldade**: Se houver dificuldade não resolvida no Caderno, sugere a atividade vinculada para prática em nível de Preparação.
4. **Revisão Espaçada Prevista**: Se houver revisão com data prevista menor ou igual à data local atual (`dataPrevista <= hoje`).
5. **Sequência Curricular**: Próxima atividade cujos pré-requisitos formais foram demonstrados.

---

## 6. Estratégia de Migração e Importação de Backup

1. **Isolamento de Chave**: O piloto escreve exclusivamente em `metodo_triade_v2`. A chave legada `metodo_triade_geral_v1` permanece intocada.
2. **Importação Explícita de Legado**: O usuário pode acionar a importação dos dados legados v1 por meio do botão "Importar dados da interface anterior (v1)" na tela Progresso. O sistema valida os campos, deduplica e mescla em `state.legado`.
3. **Validador Profundo (`validarEsquemaBackup`)**:
   - Rejeita qualquer entrada não-objeto ou nula.
   - Verifica `versao === 1` ou `versao === 2`.
   - Na versão 2: valida pertença de `atividadeAtualId` ao conjunto `ATIVIDADES_VALIDAS_IDS`; valida pertença de `nivelExercicioAtual` ao conjunto `NIVEIS_VALIDOS`; itera por `dificuldades`, `revisoes` e `tentativas` rejeitando elementos nulos, tipos incorretos ou BPM não finito (`!Number.isFinite`).
4. **Merge Idempotente**: Ao importar backup v2, mapeia registros existentes por ID estável via `Map` e sobrepõe/adiciona apenas novos registros, garantindo que reimportações sucessivas não dupliquem dados.
