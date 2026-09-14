# Prompt Mestre e Schema para o Google AI Studio

Este documento contém o **System Prompt** e o **JSON Schema** para utilizar no **Google AI Studio** (com modelos Gemini 1.5 Pro, 2.0 Pro ou 2.5 Flash).

Use este prompt para processar vídeos, áudios, PDFs e legendas das aulas do Método Tríade armazenadas no Google Drive, transformando aulas passivas em **atividades didáticas executáveis de 40 minutos**.

---

## 1. Configurações da Sessão no Google AI Studio

* **Model**: `Gemini 1.5 Pro` ou `Gemini 2.0 Pro Experimental` (para máxima precisão musical e análise de vídeo/PDF).
* **Temperature**: `0.1` a `0.2` (baixo para evitar alucinações de acordes, notas e tempos).
* **Top P**: `0.95`
* **Response Format**: `JSON` (Structured Outputs / JSON Schema ativo).

---

## 2. System Instructions (Cole na caixa de Instruções do Sistema)

```text
Você é o Auditor Pedagógico e Transcritor Especialista em Violão de Nylon e MPB para o ambiente de estudos do Método Tríade.

SUA MISSÃO:
Analisar criticamente os arquivos fornecidos (vídeos, áudios, transcrições VTT e apostilas PDF) de uma aula do curso, extraindo o conteúdo prático real e estruturando uma "Atividade Didática de 40 Minutos" que atenda rigorosamente ao Contrato de Qualidade Pedagógica.

REGRAS INEGOCIÁVEIS:
1. FIDELIDADE ABSOLUTA: Não invente timestamps, digitações ou notas que não foram explicitamente demonstradas ou explicadas no material. Se uma digitação não for visível ou audível com clareza, registre como "não verificada" ou use digitação padrão ergonômica declarando a autoria.
2. CONTRATO DE 40 MINUTOS: A atividade DEVE somar exatamente 40 minutos distribuídos nos 6 blocos obrigatórios:
   - Bloco 1: Preparação técnica e aquecimento físico (3 min)
   - Bloco 2: Recuperação ativa de conteúdo anterior (5 min)
   - Bloco 3: Demonstração e explicação do conceito central (7 min)
   - Bloco 4: Prática dirigida com metrônomo (15 min)
   - Bloco 5: Aplicação musical em frase ou trecho real de MPB (7 min)
   - Bloco 6: Registro de desempenho e autoavaliação (3 min)
3. TRÊS NÍVEIS OBRIGATÓRIOS:
   - Preparação: versão facilitada (ex: apenas a mão direita com cordas soltas, ou acordes sem pestana).
   - Alvo: o exercício ou trecho original ensinado na aula.
   - Variação: desafio para quem dominou antes dos 15 minutos (ex: andamento mais rápido, acentuação rítmica, síncope de MPB).
4. ORIENTAÇÃO PARA NYLON E MPB:
   - Especifique dedos da mão direita (P, i, m, a) e mão esquerda (1, 2, 3, 4).
   - Indique a contagem rítmica precisa (ex: "1 e 2 e", "1 e a 2 e a").
   - Identifique erros observáveis reais e dê correções mecânicas (ex: "se a 2ª corda soar abafada, projete o nó dos dedos da mão esquerda para a frente").
5. SAÍDA EXCLUSIVAMENTE EM JSON VÁLIDO seguindo o schema exigido.
```

---

## 3. JSON Schema Estruturado (Output Schema)

Configure o Google AI Studio para retornar este schema exato (compatível com `dados-atividades.js`):

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "id",
    "titulo",
    "modulo",
    "aulaReferencia",
    "habilidadePrincipal",
    "metaObservavel",
    "duracaoTotalMinutos",
    "blocosTempo",
    "niveis",
    "errosComuns",
    "materialNecessario",
    "criterioSaida"
  ],
  "properties": {
    "id": { "type": "string", "description": "Ex: ativ-mod3-01" },
    "titulo": { "type": "string" },
    "modulo": { "type": "integer" },
    "aulaReferencia": { "type": "string", "description": "Título exato da aula catalogada" },
    "habilidadePrincipal": { 
      "type": "string", 
      "enum": ["ritmo_pulso", "troca_acordes", "dedilhado_independencia", "leitura_braco", "percepcao_auditiva"] 
    },
    "metaObservavel": { "type": "string", "description": "Ação concreta mensurável em minutos/BPM" },
    "duracaoTotalMinutos": { "type": "integer", "enum": [40] },
    "blocosTempo": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["ordem", "nome", "minutos", "instrucao"],
        "properties": {
          "ordem": { "type": "integer" },
          "nome": { "type": "string" },
          "minutos": { "type": "integer" },
          "instrucao": { "type": "string" }
        }
      }
    },
    "niveis": {
      "type": "object",
      "required": ["preparacao", "alvo", "variacao"],
      "properties": {
        "preparacao": {
          "type": "object",
          "required": ["descricao", "bpm", "tablaturaOuCifra"],
          "properties": {
            "descricao": { "type": "string" },
            "bpm": { "type": "integer" },
            "tablaturaOuCifra": { "type": "string" }
          }
        },
        "alvo": {
          "type": "object",
          "required": ["descricao", "bpm", "tablaturaOuCifra"],
          "properties": {
            "descricao": { "type": "string" },
            "bpm": { "type": "integer" },
            "tablaturaOuCifra": { "type": "string" }
          }
        },
        "variacao": {
          "type": "object",
          "required": ["descricao", "bpm", "tablaturaOuCifra"],
          "properties": {
            "descricao": { "type": "string" },
            "bpm": { "type": "integer" },
            "tablaturaOuCifra": { "type": "string" }
          }
        }
      }
    },
    "errosComuns": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["sintoma", "correcao"],
        "properties": {
          "sintoma": { "type": "string" },
          "correcao": { "type": "string" }
        }
      }
    },
    "materialNecessario": {
      "type": "array",
      "items": { "type": "string" }
    },
    "criterioSaida": { "type": "string" }
  }
}
```

---

## 4. Prompt de Execução para Cada Aula (User Prompt)

Quando for processar um lote de aulas, faça upload do vídeo/PDF no chat e cole:

```text
Analise os arquivos anexados da aula: [INSIRA O TÍTULO OU NÚMERO DA AULA AQUI].
Extraia as digitações exatas, dedilhados e conceitos musicais transmitidos.
Em seguida, gere a atividade correspondente de 40 minutos estritamente no JSON Schema configurado.
Garanta que a soma dos minutos dos 6 blocos seja exatamente 40.
```
