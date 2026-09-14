/**
 * Atividades Didáticas do Piloto — Método Tríade v2 (Revisado pós-auditoria Codex)
 * 
 * Contrato rigoroso de 9 itens conforme PLANO-EXPERIENCIA-APRENDIZAGEM.md e CORRECOES-ANTIGRAVITY.md.
 * Fontes reais do acervo vinculadas com IDs canônicos e status de verificação.
 * Status operacional marcado como 'em_revisao' até parecer final de homologação.
 * Orçamento de sessão de 40 minutos (3 + 5 + 7 + 15 + 7 + 3 = 40 min).
 */

window.PILOTO_ATIVIDADES = [
  {
    "id": "ativ-1",
    "slug": "pulso-subdivisao",
    "titulo": "Pulso e Subdivisão Rítmica no Nylon",
    "area": "Rítmica e Coordenação",
    "nivelDificuldade": "Básico",
    "statusProntidao": "em_revisao",
    "tags": [
      "ritmo",
      "pulso",
      "subdivisao",
      "mao-direita",
      "metronomo"
    ],
    "habilidade": "Manutenção de pulso isócrono estável em 4/4 e subdivisão binária precisa (tempo e contratempo) no violão de nylon.",
    "metaObservavel": "Tocar 8 compassos contínuos em 4/4 a 60-70 BPM sem acelerar, atrasar ou engolir o contratempo, mantendo apoio firme e relaxado, com encerramento formal no tempo 1 do 9º compasso.",
    "prerequisito": "Postura básica no violão e toque apoiado/livre do polegar (p) e indicador (i) em cordas soltas.",
    "explicacao": "O pulso (batimento) é o coração do ritmo — regular e constante como passos de uma caminhada tranquila. A subdivisão binária divide cada pulso exatamente em duas partes de duração idêntica: a cabeça do tempo ('1, 2, 3, 4') e o contratempo (chamado de 'e'). No violão de nylon, o polegar comanda os tempos nos bordões graves enquanto o indicador articula os contratempos nas primas agudas.",
    "fontes": [
      {
        "aulaId": "aula-mod-1-2",
        "observacao": "Referência teórica primária do acervo sobre pulso e métrica básica.",
        "autoria": "Método Tríade (acervo) / Roteiro didático e exercícios por Antigravity (em revisão)"
      },
      {
        "aulaId": "aula-mod-1-8",
        "observacao": "Fundamentos de compasso binário e quaternário.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 60,
      "bpmMinimo": 45,
      "bpmAlvo": 72,
      "compasso": "4/4",
      "contagem": "1 - e - 2 - e - 3 - e - 4 - e",
      "dedilhacaoMD": "Polegar (p) na 6ª corda no tempo; Indicador (i) na 3ª corda no contratempo",
      "instrucoes": "Apoie o braço direito na borda superior do instrumento sem travar o punho. Ligue o metrônomo a 60 BPM. Conte um compasso prévio (4 tempos) em voz audível antes de iniciar. Cada semínima dura exatamente 1 tempo inteiro; cada colcheia dura 1/2 tempo. Ao final do 8º compasso, execute o encerramento abafando as cordas no tempo 1 do compasso 9.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Pulso Fundamental em Semínimas)",
          "descricao": "Apenas semínimas (tempos 1, 2, 3, 4). Toque a 6ª corda solta (Mi grave, E2) a cada clique do metrônomo com o polegar (p). Duração de cada nota: 1 tempo (semínima). A corda sustenta até o próximo toque; não é necessário amortecer entre os tempos. Encerre no tempo 1 do 5º compasso abafando a corda.",
          "bpm": 50,
          "repeticoes": "4 compassos completos + abafamento de encerramento",
          "tablatura": "4/4 | 1 . . . | 2 . . . | 3 . . . | 4 . . . |  (c. 1 a 4)\nE|---------------------------------|\nB|---------------------------------|\nG|---------------------------------|\nD|---------------------------------|\nA|---------------------------------|\nE|--0-------0-------0-------0------|\n   p       p       p       p\n   ♩(1T)   ♩(1T)   ♩(1T)   ♩(1T)\nEncerramento (c. 5 t.1): polegar pousa na 6ª corda; silêncio a partir do tempo 1.",
          "dica": "Sinta o peso do polegar caindo com gravidade natural sobre a corda, repousando levemente na 5ª corda após o toque apoiado.",
          "instrucoesRodape": "Sustentação: cada nota ressoa por 1 tempo completo antes do próximo toque."
        },
        "alvo": {
          "nome": "Alvo (Subdivisão Binária Contínua)",
          "descricao": "Semínimas nos tempos com polegar (p na 6ª corda solta) e colcheias no contratempo com indicador (i na 3ª corda solta Sol, G3). Duração: semínima dura 1 tempo inteiro; colcheia dura 1/2 tempo. A 6ª corda (baixo) sustenta de um tempo ao próximo. A 3ª corda (i) sustenta até a próxima colcheia. Ambas ressoam simultaneamente no 'e', criando textura p+i.",
          "bpm": 60,
          "repeticoes": "8 compassos contínuos + corte no c. 9",
          "tablatura": "4/4 | 1   e   2   e   3   e   4   e   |  (c. 1 a 8)\nE|-----------------------------------|\nB|-----------------------------------|\nG|------0-------0-------0-------0----|\nD|-----------------------------------|\nA|-----------------------------------|\nE|--0-------0-------0-------0--------|\n   p   i   p   i   p   i   p   i\n   ♩  (♪) ♩  (♪) ♩  (♪) ♩  (♪)\nEncerramento (c. 9 t.1): polegar e indicador repousam simultaneamente nas cordas 6 e 3.",
          "dica": "Pronuncie '1-e-2-e-3-e-4-e' continuamente. O dedo indicador deve articular exatamente no ponto médio entre dois cliques do metrônomo.",
          "instrucoesRodape": "Sustentação: polegar soa 1 tempo (corda 6); indicador soa 1/2 tempo (corda 3). Sobreposição natural."
        },
        "variacao": {
          "nome": "Variação (Acento Dinâmico nos Tempos 2 e 4 com Bordões Alternados)",
          "descricao": "Alternância de bordões (6ª corda no tempo 1 e 3; 5ª corda nos tempos 2 e 4) com leve acento dinâmico nos tempos 2 e 4. Opcional para ampliação técnica.",
          "bpm": 72,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "4/4 | 1   e   2   e   3   e   4   e   |\nE|-----------------------------------|\nB|-----------------------------------|\nG|------0-------0-------0-------0----|\nD|-----------------------------------|\nA|----------0---------------0--------|\nE|--0---------------0----------------|\n   p   i   p   i   p   i   p   i\n           >               >",
          "dica": "O acento é obtido por velocidade rápida e relaxada do polegar, jamais por rigidez no antebraço ou tranco no instrumento."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Correr e antecipar o contratempo (o dedo 'i' toca grudado no polegar, soando como tercina).",
        "correcao": "Isole um único tempo falando 'um... e...'. Bata a mão na coxa no tempo e estale o dedo no contratempo antes de tocar no violão."
      },
      {
        "erro": "Falta de encerramento claro: soltar as cordas e deixá-las ressoando sozinhas.",
        "correcao": "Treine o encerramento deliberado: no tempo 1 após o 8º compasso, pouse a polpa do polegar na 6ª corda e o indicador na 3ª corda cortando o som."
      }
    ],
    "aplicacaoMusical": "Este padrão p-i é a base da levada de toada, balada de MPB e da coordenação motora exigida para violão solo.",
    "criterioSaida": "Executar os 8 compassos do nível Alvo a 60 BPM sem oscilação perceptível de pulso e com encerramento formal.",
    "recuperacao": "Se houver instabilidade no contratempo: volte à Preparação a 50 BPM por 3 minutos; pratique a contagem vocal isolada com palmas antes de retomar o instrumento.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Postura e afinação",
        "instrucao": "Verifique a afinação (EADGBE), relaxe ombros e posicione o violão sem inclinar o tampo para cima."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Toque livre de cordas soltas",
        "instrucao": "Revisite o toque alternado i-m e p em cordas soltas com foco no relaxamento muscular."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Compreender o pulso e a subdivisão",
        "instrucao": "Ouvir o metrônomo, verbalizar a contagem '1-e-2-e-3-e-4-e' e acompanhar com palmas no tempo."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Executar os 3 níveis progressivos",
        "instrucao": "4 min na Preparação (50 BPM), 8 min no Alvo (60 BPM) e 3 min na Variação (ou reforço do Alvo)."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Aplicação em cadência rítmica contínua",
        "instrucao": "Toque o padrão contínuo sobre uma harmonia simples de bordões (E - A - D - E)."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Autoavaliação e caderno de dificuldades",
        "instrucao": "Anote o BPM estável alcançado, confirme os critérios do nível e registre observações."
      }
    ],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-2",
    "slug": "troca-acordes-continuidade",
    "titulo": "Troca de Acordes com Continuidade (Lá Maior e Ré Maior)",
    "area": "Harmonia e Fluência",
    "nivelDificuldade": "Básico",
    "statusProntidao": "em_revisao",
    "tags": [
      "acordes",
      "troca",
      "fluencia",
      "la-maior",
      "re-maior",
      "mao-esquerda"
    ],
    "habilidade": "Transição contínua entre acordes fundamentais no tempo exato, sem interrupção do pulso nem pausas involuntárias.",
    "metaObservavel": "Realizar 16 trocas consecutivas entre Lá Maior (A) e Ré Maior (D) a 60 BPM em compasso 4/4 sem pausar o movimento da mão direita.",
    "prerequisito": "Digitações estáticas limpas dos acordes A (Lá maior) e D (Ré maior) na primeira posição.",
    "explicacao": "A hesitação na troca de acordes ocorre quando o estudante move um dedo por vez ou espera o compasso terminar para então procurar a nova posição. A chave pedagógica é o deslocamento em bloco com antecipação: durante o tempo 4, a mão esquerda relaxa suavemente a pressão, reconfigura o formato dos dedos no ar e pousa todos simultaneamente no tempo 1 de Ré. (Nota mecânica: na digitação tradicional de A com dedos 1 na 4ª, 2 na 3ª e 3 na 2ª corda, não há dedo fixo em relação a D, que usa dedo 1 na 3ª corda; caso utilize a digitação alternativa de A com dedos 2-1-3, o dedo 1 permanece na 3ª corda como guia).",
    "fontes": [
      {
        "aulaId": "aula-mod-1-10",
        "observacao": "Aula de referência do acervo sobre a fluência nos acordes A e D.",
        "autoria": "Método Tríade (acervo) / Sistematização de deslocamento em bloco por Antigravity (em revisão)"
      },
      {
        "aulaId": "aula-mod-1-13",
        "observacao": "Tratamento de ruído e proximidade com o traste metálico.",
        "autoria": "Método Tríade (acervo)"
      },
      {
        "aulaId": "aula-mod-1-14",
        "observacao": "Estratégia para montagem simultânea em bloco.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 55,
      "bpmMinimo": 45,
      "bpmAlvo": 68,
      "compasso": "4/4",
      "contagem": "1 - 2 - 3 - 4 (1 compasso de A / 1 compasso de D)",
      "dedilhacaoMD": "Polegar deslizando em rasqueado suave nas cordas centrais",
      "instrucoes": "Posições: Lá Maior [A]: dedo 1 na 4ª corda casa 2, dedo 2 na 3ª corda casa 2, dedo 3 na 2ª corda casa 2. Ré Maior [D]: dedo 1 na 3ª corda casa 2, dedo 2 na 1ª corda casa 2, dedo 3 na 2ª corda casa 3. Pratique a mudança em bloco: todos os dedos descolam juntos, mudam a postura no ar e descem juntos.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Toque no Tempo 1 com 3 Tempos de Antecipação)",
          "descricao": "Toque o acorde apenas no tempo 1 com o polegar. Use os tempos 2, 3 e 4 para mover a mão esquerda no ar com calma, preparando a chegada precisa no tempo 1 do compasso seguinte.",
          "bpm": 50,
          "repeticoes": "8 ciclos (16 compassos alternados)",
          "tablatura": "   [A]                                 [D]\n   1   2   3   4                       1   2   3   4\nE|-0---------------------------------|-2---------------------------------|\nB|-2---(relaxar e mudar no ar)-------|-3---(relaxar e mudar no ar)-------|\nG|-2---------------------------------|-2---------------------------------|\nD|-2---------------------------------|-0---------------------------------|\nA|-0---------------------------------|-----------------------------------|\nE|-----------------------------------|-----------------------------------|",
          "dica": "Nunca interrompa a contagem mental ou o metrônomo. Se os dedos não chegarem a tempo, toque as cordas soltas mas NÁO pare o tempo 1."
        },
        "alvo": {
          "nome": "Alvo (Batida em Semínimas Contínuas)",
          "descricao": "Quatro toques regulares por compasso no acorde A e quatro toques no acorde D a 60 BPM. A transição física ocorre entre o tempo 4 e o tempo 1 sem atraso.",
          "bpm": 60,
          "repeticoes": "8 ciclos (16 compassos contínuos)",
          "tablatura": "   [A]                                 [D]\n   1   2   3   4                       1   2   3   4\nE|-0---0---0---0---------------------|-2---2---2---2---------------------|\nB|-2---2---2---2---------------------|-3---3---3---3---------------------|\nG|-2---2---2---2---------------------|-2---2---2---2---------------------|\nD|-2---2---2---2---------------------|-0---0---0---0---------------------|\nA|-0---0---0---0---------------------|-----------------------------------|\nE|-----------------------------------|-----------------------------------|",
          "dica": "Aproveite o movimento ascendente da mão direita no tempo 4 para aliviar a tensão da mão esquerda e iniciar a reconfiguração motora."
        },
        "variacao": {
          "nome": "Variação (Levada de Balada com Subdivisão e Síncope)",
          "descricao": "Aplicação da levada rítmica de balada em 4/4 com subdivisão explícita: Tempo 1: semínima (♩ p); Tempo 2: duas colcheias (♫ ↓↑); Tempo 3: pausa de colcheia + colcheia sincopada (𝄽 ♪ ↑); Tempo 4: duas colcheias (♫ ↓↑).",
          "bpm": 68,
          "repeticoes": "8 ciclos contínuos (opcional)",
          "tablatura": "   [A]                                        [D]\n   1   2   e   (3)  e   4   e                 1   2   e   (3)  e   4   e\n   ↓   ↓   ↑   (𝄽)  ↑   ↓   ↑                 ↓   ↓   ↑   (𝄽)  ↑   ↓   ↑\nE|-0---0---0--------0---0---0---------------|-2---2---2--------2---2---2---|\nB|-2---2---2--------2---2---2---------------|-3---3---3--------3---3---3---|\nG|-2---2---2--------2---2---2---------------|-2---2---2--------2---2---2---|\nD|-2---2---2--------2---2---2---------------|-0---0---0--------0---0---0---|\nA|-0----------------------------------------|------------------------------|\nE|------------------------------------------|------------------------------|",
          "dica": "A troca de acorde é preparada exatamente no 'e' final do tempo 4 para que o novo baixo entre com segurança no tempo 1."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Montar 'um dedo por vez' no acorde de destino, quebrando a métrica.",
        "correcao": "Pratique o exercício de 'ar-violão': aperte o A, solte 1 milímetro mantendo o formato no ar, transforme o formato para D no ar e pouse todos os dedos ao mesmo tempo."
      },
      {
        "erro": "Dedo 3 de Ré encostando na 1ª corda ou longe do traste metálico.",
        "correcao": "Arredonde a falange distal do dedo 3 (como um martelinho) e encoste-o bem próximo ao traste da casa 3."
      }
    ],
    "aplicacaoMusical": "A progressão Lá Maior para Ré Maior (I - IV) é a cadência mestra do pop, rock e MPB para violão de nylon.",
    "criterioSaida": "Executar 16 compassos alternados (A e D) a 60 BPM no nível Alvo sem perder o tempo 1.",
    "recuperacao": "Se a troca travar: reduza para 48 BPM na versão Preparação; isole a montagem em bloco por 3 minutos antes de retomar a batida contínua.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Alongamento e aquecimento de dedos",
        "instrucao": "Alongue flexores do antebraço e articulações dos dedos 1, 2 e 3 da mão esquerda."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Digitação estática limpa",
        "instrucao": "Monte o A e confira corda por corda; monte o D e confira clareza sem chiado."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Entender o deslocamento em bloco",
        "instrucao": "Observe a mudança de formato no ar sem pausar a batida contínua da mão direita."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Execução progressiva dos níveis",
        "instrucao": "5 min na Preparação (50 BPM), 8 min no Alvo (60 BPM) e 2 min na Variação (ou reforço do Alvo)."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Tocar acompanhamento cadenciado",
        "instrucao": "Execute a sequência A - D cantando mentalmente a métrica da canção."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Gravar resultado e registrar no caderno",
        "instrucao": "Anote no Caderno de Dificuldades se houve chiado ou atraso e confirme o resultado."
      }
    ],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-3",
    "slug": "leitura-ritmica-simples",
    "titulo": "Leitura Rítmica Simples (Semínima, Colcheia e Pausa em 4/4)",
    "area": "Leitura e Solfejo",
    "nivelDificuldade": "Básico",
    "statusProntidao": "em_revisao",
    "tags": [
      "leitura",
      "partitura",
      "figuras-ritmicas",
      "seminima",
      "colcheia",
      "pausa"
    ],
    "habilidade": "Decodificação visual e execução instrumental imediata de células rítmicas com semínimas (♩), colcheias (♫) e pausas de semínima (𝄽) em compasso quaternário.",
    "metaObservavel": "Ler à primeira vista e executar no violão 4 compassos de leitura rítmica a 60 BPM sem hesitar em pausas ou subdivisões, com abafamento nítido.",
    "prerequisito": "Compreensão do compasso 4/4 e manutenção de pulso estável.",
    "explicacao": "A leitura rítmica confere autonomia ao estudante. Em 4/4, cada semínima dura 1 pulso inteiro. Duas colcheias subdividem o pulso em metades iguais. A pausa de semínima exige silêncio ativo por exatamente 1 pulso, requerendo o abafamento voluntário da corda que estava soando.",
    "fontes": [
      {
        "aulaId": "aula-mod-1-8",
        "observacao": "Estrutura do compasso quaternário e valor das figuras fundamentais.",
        "autoria": "Método Tríade (acervo)"
      },
      {
        "aulaId": "aula-mod-3-4",
        "observacao": "Quadro de figuras rítmicas e pausas da apostila.",
        "autoria": "Método Tríade (acervo) / Exercício transcrito por Antigravity (em revisão)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 60,
      "bpmMinimo": 50,
      "bpmAlvo": 75,
      "compasso": "4/4",
      "contagem": "1 - 2 - 3 - 4 com subdivisões 'e' e abafamento na pausa",
      "dedilhacaoMD": "i e m alternados na 1ª corda solta (Mi agudo); polegar (p) na 6ª corda na variação",
      "instrucoes": "Para abafar a corda na pausa de semínima, pouse a lateral do dedo da mão direita sobre a corda no tempo exato da pausa (símbolo X). Não deixe o som prolongar-se sobre a pausa.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Solfejo Falado e Palmas no Pulso)",
          "descricao": "Fale as sílabas rítmicas 'TÁ' para semínima (1 tempo), 'TI-TI' para duas colcheias (1/2 tempo cada) e 'SHH' (silêncio) para a pausa, marcando palmas no pulso a 50 BPM.",
          "bpm": 50,
          "repeticoes": "4 compassos duas vezes",
          "tablatura": "Compasso 1: [ ♩ ]   [ ♩ ]   [ ♫ ]     [ ♩ ]   -> TÁ    TÁ    TI-TI   TÁ\nCompasso 2: [ ♩ ]   [ 𝄽 ]   [ ♩ ]     [ ♩ ]   -> TÁ   (SHH)  TÁ      TÁ\nCompasso 3: [ ♫ ]   [ ♫ ]   [ ♩ ]     [ 𝄽 ]   -> TI-TI TI-TI TÁ     (SHH)\nCompasso 4: [ ♩ ]   [ ♫ ]   [ ♩ ]     [ ♩ ]   -> TÁ    TI-TI TÁ      TÁ",
          "dica": "A pausa é silêncio consciente: não antecipe a nota seguinte durante o silêncio."
        },
        "alvo": {
          "nome": "Alvo (Execução Instrumental na 1ª Corda com Abafamento)",
          "descricao": "Toque as figuras rítmicas na 1ª corda solta (E4) alternando estritamente os dedos i e m. No símbolo (X), abafe a corda cortando a ressonância.",
          "bpm": 60,
          "repeticoes": "4 compassos contínuos",
          "tablatura": "4/4  | 1       2       3       4       |\nC1:  | E|--0-------0-------0---0---0-------|  (♩  ♩  ♫  ♩)\nC2:  | E|--0------(X)------0-------0-------|  (♩ (X) ♩  ♩)\nC3:  | E|--0---0---0---0---0------(X)------|  (♫  ♫  ♩ (X))\nC4:  | E|--0-------0---0---0-------0-------|  (♩  ♫  ♩  ♩)",
          "dica": "O corte do som no tempo 2 do compasso 2 e no tempo 4 do compasso 3 deve ser seco e limpo."
        },
        "variacao": {
          "nome": "Variação (Leitura Polifônica: Duas Vozes Independentes)",
          "descricao": "Execução em duas vozes independentes simultâneas: baixo (6ª corda solta, polegar p) em semínimas nos tempos 1 e 3 com duração de 1 tempo cada; pausa de semínima implícita nos tempos 2 e 4 do baixo (abafamento p). Melodia rítmica (1ª corda, i/m) mantém o ritmo do Alvo com pausas abafadas por i ou m. Cada voz tem autonomia de duração e silêncio.",
          "bpm": 72,
          "repeticoes": "4 compassos contínuos (opcional)",
          "tablatura": "4/4  | 1       2       3       4       |\nagudo i/m (1ª corda, ritmo do Alvo):\nC1:  | E|--0-------0-------0---0---0-------|\nC2:  | E|--0------(X)------0-------0-------|\nC3:  | E|--0---0---0---0---0------(X)------|\nC4:  | E|--0-------0---0---0-------0-------|\n\nbaixo p (6ª corda, semínimas independentes):\nC1:  | E|--0-------[𝄽]----0-------[𝄽]-----|\nC2:  | E|--0-------[𝄽]----0-------[𝄽]-----|\nC3:  | E|--0-------[𝄽]----0-------[𝄽]-----|\nC4:  | E|--0-------[𝄽]----0-------[𝄽]-----|\n       p  (mute)   p  (mute)\n       ♩   𝄽       ♩   𝄽",
          "dica": "Mantenha a independência total entre polegar e dedos agudos. O polegar não deve reagir ao ritmo da melodia: cada voz tem seu próprio pulso interno.",
          "instrucoesRodape": "Legenda: (X) = abafar i/m; [𝄽] = polegar amortecer baixo no tempo 2 e 4.\nAs duas vozes soam em camadas separadas — o baixo sustenta 1 tempo e fica silencioso 1 tempo."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Deixar a nota vibrar através da pausa (ausência de corte sonoro).",
        "correcao": "Treine o gesto de 'muting': pouse o indicador deitado sobre a corda no tempo 2 do compasso 2 interrompendo o som instantaneamente."
      },
      {
        "erro": "Apressar as colcheias tocando-as como notas curtas sem valor simétrico.",
        "correcao": "Garanta que as duas colcheias durem exatamente metade do clique do metrônomo cada uma."
      }
    ],
    "aplicacaoMusical": "Essencial para ler partituras, tablaturas com métrica e convenções de ritmo da música brasileira.",
    "criterioSaida": "Executar os 4 compassos do nível Alvo a 60 BPM com pausas devidamente abafadas e alternância regular de i-m.",
    "recuperacao": "Se houver erro de valor nas pausas: volte à Preparação falada marcando o tempo com o pé antes de tocar no instrumento.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Foco visual e relaxamento",
        "instrucao": "Posicione a partitura ou tela na altura dos olhos para evitar tensão cervical."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Toque alternado i-m",
        "instrucao": "Toque semínimas regulares a 60 BPM alternando estritamente os dedos indicador e médio."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Decodificar as figuras rítmicas",
        "instrucao": "Analise visualmente os 4 compassos identificando as pausas e as colcheias."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Prática dos 3 níveis de leitura",
        "instrucao": "4 min falando o solfejo na Preparação; 8 min no Alvo no violão; 3 min na Variação (ou reforço do Alvo)."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Leitura de frase musical aplicada",
        "instrucao": "Toque o ritmo com abafamento sobre harmonia de bordões."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Anotação de pontos de tropeço",
        "instrucao": "Registre se o tropeço foi na leitura da pausa ou na alternância dos dedos."
      }
    ],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-4",
    "slug": "reconhecimento-auditivo-intervalos",
    "titulo": "Reconhecimento Auditivo de Intervalos Diatônicos",
    "area": "Percepção e Teoria Musical",
    "nivelDificuldade": "Básico a Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "percepcao",
      "ouvido",
      "intervalos",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "oitava"
    ],
    "habilidade": "Identificação auditiva de intervalos melódicos ascendentes a partir de uma nota tônica de referência.",
    "metaObservavel": "Completar uma série de 10 perguntas e acertar pelo menos 8 no nível Alvo com registro da primeira resposta.",
    "prerequisito": "Conhecimento conceitual da escala diatônica e distinção entre sons graves e agudos.",
    "explicacao": "O intervalo é a distância de altura entre duas notas. O ouvido musical identifica o intervalo pela relação intervalar (distância em semitons) e pela sensação musical característica. A referência acústica adotada no sintetizador é Dó4 (261.63 Hz), correspondente exatamente à 2ª corda, casa 1 do violão (onde a síntese senoidal soa no mesmo registro do instrumento, diferentemente de Dó3 na 5ª corda/casa 3 que soa uma oitava abaixo, em 130.81 Hz).",
    "fontes": [
      {
        "aulaId": "aula-mod-1-15",
        "observacao": "Explicação teórica dos intervalos diatônicos e semitons na apostila.",
        "autoria": "Método Tríade (acervo)"
      },
      {
        "aulaId": "aula-mod-1-16",
        "observacao": "Recomendação de treino de percepção interativa.",
        "autoria": "Método Tríade (acervo) / Treinador sintetizado por Antigravity (em revisão)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 0,
      "bpmMinimo": 0,
      "bpmAlvo": 0,
      "compasso": "Livre",
      "contagem": "Ouvir Tônica -> Ouvir Pergunta -> Analisar Semitons -> Selecionar",
      "dedilhacaoMD": "Síntese sonora Web Audio / Reprodução na 2ª e 1ª cordas do violão",
      "instrucoes": "Tônica de Referência: Dó4 (261.63 Hz, 2ª corda casa 1). Ouça a tônica, em seguida ouça a nota desconhecida e analise a distância em semitons. A série consiste em 10 perguntas. Apenas a primeira resposta de cada pergunta é computada.",
      "intervalosPorNivel": {
        "preparacao": [
          "terca_maior",
          "quinta_justa"
        ],
        "alvo": [
          "segunda_maior",
          "terca_maior",
          "quarta_justa",
          "quinta_justa"
        ],
        "variacao": [
          "segunda_maior",
          "terca_maior",
          "quarta_justa",
          "quinta_justa",
          "sexta_maior",
          "oitava_justa"
        ]
      },
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Contraste Binário: 3ª Maior vs 5ª Justa)",
          "descricao": "Treino com apenas dois intervalos de sensação contrastante: Terça Maior (4 semitons, C4 -> E4, 329.63 Hz, 1ª corda solta) e Quinta Justa (7 semitons, C4 -> G4, 392.00 Hz, 1ª corda casa 3).",
          "repeticoes": "Série de 10 perguntas",
          "tablatura": "Tônica de Referência: Dó4 (2ª corda, casa 1, 261.63 Hz)\n- 3ª Maior: Mi4 (1ª corda solta, 329.63 Hz, 4 semitons)\n- 5ª Justa: Sol4 (1ª corda, casa 3, 392.00 Hz, 7 semitons)",
          "dica": "A 3ª Maior possui sensação afirmativa e melódica; a 5ª Justa possui sensação aberta e de estabilidade pura."
        },
        "alvo": {
          "nome": "Alvo (Quatro Intervalos Fundamentais: 2ªM, 3ªM, 4ªJ, 5ªJ)",
          "descricao": "Reconhecimento entre os quatro intervalos diatônicos mais comuns com fundamentação verificada em notas de canções conhecidas.",
          "repeticoes": "Série de 10 perguntas",
          "tablatura": "- 2ª Maior: Dó4 -> Ré4 (2ª corda c. 3, 2 semitons, ex: início de 'Ciranda Cirandinha' C-D-E-F)\n- 3ª Maior: Dó4 -> Mi4 (1ª corda solta, 4 semitons, ex: início de 'Asa Branca' C-E)\n- 4ª Justa: Dó4 -> Fá4 (1ª corda c. 1, 5 semitons, ex: salto inicial do Hino Nacional C-F)\n- 5ª Justa: Dó4 -> Sol4 (1ª corda c. 3, 7 semitons, ex: início de 'Brilha Brilha' C-C-G-G)",
          "dica": "Cante as notas mentalmente antes de registrar sua resposta. O treino auditivo desenvolve a memória interna."
        },
        "variacao": {
          "nome": "Variação (Escopo Ampliado: Incluindo 6ª Maior e 8ª Justa)",
          "descricao": "Adiciona a 6ª Maior (9 semitons, C4 -> A4, 440 Hz, ex: início de 'Berimbau' C-A) e a 8ª Justa (12 semitons, C4 -> C5, 523.25 Hz, ex: 'Somewhere Over the Rainbow' C4-C5). Opcional para ampliação auditiva.",
          "repeticoes": "Série de 10 perguntas",
          "tablatura": "- 6ª Maior: Dó4 -> Lá4 (1ª corda c. 5, 9 semitons)\n- 8ª Justa: Dó4 -> Dó5 (1ª corda c. 8, 12 semitons)",
          "dica": "A oitava tem sonoridade de identidade pura em outro registro; a sexta maior possui sensação de abertura doce e lírica."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Confundir a 4ª Justa com a 5ª Justa.",
        "correcao": "A 4ª Justa soa como uma pergunta suspensa que pede resolução para baixo; a 5ª Justa soa como uma chegada conclusiva e firme."
      },
      {
        "erro": "Adivinhar por clique rápido sem analisar o intervalo em semitons.",
        "correcao": "Cante internamente a tônica e a nota alvo; se necessário, localize as casas no violão para conferir fisicamente a distância."
      }
    ],
    "aplicacaoMusical": "Habilidade central para tirar músicas de ouvido, transcrever melodias e ajustar afinação sem depender de afinadores eletrônicos.",
    "criterioSaida": "Atingir pelo menos 8 acertos em 10 perguntas na série do nível Alvo (registrando a primeira resposta).",
    "recuperacao": "Se errar 3 vezes consecutivas: retorne à Preparação e pratique o contraste entre 3ª Maior e 5ª Justa entoando vocalmente cada nota.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Silêncio e foco auditivo",
        "instrucao": "Elimine ruídos de fundo; ajuste o volume do computador para um nível claro e confortável."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Cantar intervalos no violão",
        "instrucao": "Toque C4 (2ª corda c. 1) e cante as notas E4 e G4 correspondentes."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Memorizar as referências intervalares",
        "instrucao": "Revise a distância em semitons de cada um dos quatro intervalos do nível Alvo."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Série de 10 perguntas no treinador de ouvido",
        "instrucao": "Complete a série de 10 perguntas do nível Alvo no treinador integrado."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Localização no violão",
        "instrucao": "Dado o intervalo ouvido, encontre as duas notas na 2ª e 1ª cordas do violão."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Registro do placar final",
        "instrucao": "Anote o número de acertos obtidos na primeira tentativa da série."
      }
    ],
    "ferramentaSugerida": "treinador-ouvido"
  },
  {
    "id": "ativ-5",
    "slug": "montagem-triades",
    "titulo": "Montagem e Compreensão de Tríades Maiores e Menores",
    "area": "Harmonia e Teoria no Braço",
    "nivelDificuldade": "Básico a Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "harmonia",
      "triades",
      "acordes",
      "teoria",
      "braco",
      "maior",
      "menor"
    ],
    "habilidade": "Construção conceitual e digitação de tríades maiores (T - 3M - 5J) e menores (T - 3m - 5J) no violão, identificando as funções de cada nota tocada.",
    "metaObservavel": "Arpejar e nomear oralmente Tônica, Terça e Quinta em Dó Maior e Lá Menor em estado fundamental sem hesitação motora.",
    "prerequisito": "Conhecimento das notas nas cordas soltas e digitação limpa dos acordes básicos C e Am.",
    "explicacao": "Todo acorde básico deriva de uma tríade: três notas empilhadas formadas por Tônica (T, define a identidade), Terça (3, define se é Maior com 2 tons ou Menor com 1 tom e meio) e Quinta Justa (5, confere estabilidade com 3 tons e meio). Inversões harmônicas (quando a terça ou a quinta estão no baixo) são perfeitamente válidas e frequentes na música; o foco deste exercício introdutório no estado fundamental (tônica na nota mais grave) é uma restrição pedagógica deliberada para consolidar a percepção da fundamental.",
    "fontes": [
      {
        "aulaId": "aula-mod-1-9",
        "observacao": "Apresentação da formação de acordes e tríades no acervo.",
        "autoria": "Método Tríade (acervo)"
      },
      {
        "aulaId": "aula-mod-2-3",
        "observacao": "Diferenciação estrutural entre acordes maiores e menores.",
        "autoria": "Método Tríade (acervo) / Sistematização de arpejos e digitações por Antigravity (em revisão)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 50,
      "bpmMinimo": 40,
      "bpmAlvo": 60,
      "compasso": "4/4",
      "contagem": "Tônica → Terça → Quinta em arpejo lento a pulso livre (sem divisão de compasso obrigatória)",
      "dedilhacaoMD": "p no baixo da tônica; i e m nas notas agudas da tríade",
      "instrucoes": "Este exercício é analítico: o metrônomo marca o tempo de referência, mas o arpejo não precisa preencher 4 tempos exatos. O aluno decide a duração de cada nota para focar a atenção na identificação da função harmônica. Compare Mi Maior (E) e Mi Menor (Em): observe que apenas UM dedo se move (a terça Sol# vira Sol natural). Em seguida, arpeje as tríades estritas de C e Am em estado fundamental.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (O Papel da Terça: E Maior vs Em Menor)",
          "descricao": "Toque E Maior e identifique o dedo 1 na 3ª corda (Sol#, 3ª Maior). Levante o dedo 1 para soar a 3ª corda solta (Sol natural, 3ª Menor), formando Mi Menor. Sinta a transformação de luminosidade causada por apenas 1 semitom de diferença.",
          "bpm": 45,
          "repeticoes": "Alternar 6 vezes ouvindo atentamente a cor sonora",
          "tablatura": "   [E Maior: T-3M-5J]                   [Em Menor: T-3m-5J]\nE|--0--- (Mi - T)                    E|--0--- (Mi - T)\nB|--0--- (Si - 5J)                   B|--0--- (Si - 5J)\nG|--1--- (Sol# - 3M: dedo 1)         G|--0--- (Sol - 3m: corda solta!)\nD|--2--- (Mi - T)                    D|--2--- (Mi - T)\nA|--2--- (Si - 5J)                   A|--2--- (Si - 5J)\nE|--0--- (Mi - Baixo T)              E|--0--- (Mi - Baixo T)",
          "dica": "A terça maior tem 4 semitons em relação à tônica; a terça menor tem 3 semitons."
        },
        "alvo": {
          "nome": "Alvo (Arpejos Estritos de C Maior e Am Menor em Estado Fundamental)",
          "descricao": "Arpeje isoladamente as notas da tríade estrita de C (T-3M-5J) e Am (T-3m-5J). Alturas sonoras e digitações exatas: em C: Dó3 (5ª c. 3, p) -> Mi3 (4ª c. 2, i) -> Sol3 (3ª solta, m). Em Am: Lá3 (3ª c. 2, p) -> Dó4 (2ª c. 1, i) -> Mi4 (1ª solta, m).",
          "bpm": 50,
          "repeticoes": "8 ciclos completos",
          "tablatura": "   [Dó Maior (C) Estrito: T-3M-5J]      [Lá Menor (Am) Estrito: T-3m-5J]\n   C3 (T)    E3 (3M)   G3 (5J)            A3 (T)    C4 (3m)   E4 (5J)\nE|-----------------------------------|-------------------------0---------|\nB|-----------------------------------|---------------1-------------------|\nG|---------------------0-------------|-----2-----------------------------|\nD|-----------2-----------------------|-----------------------------------|\nA|--3--------------------------------|-----------------------------------|\nE|-----------------------------------|-----------------------------------|\n   p        i         m                  p         i         m",
          "dica": "Fale em voz audível 'Tônica, Terça, Quinta' conforme o dedo tocar cada corda correspondente."
        },
        "variacao": {
          "nome": "Variação (Tríade Fechada de Sol Maior nas Cordas Agudas)",
          "descricao": "Montagem da tríade completa de Sol Maior (G-B-D) nas primas: 3ª corda casa 4 (Si3, 3ªM, dedo 3), 2ª corda casa 3 (Ré4, 5ªJ, dedo 2), 1ª corda casa 3 (Sol4, T, dedo 4). (Nota: a forma aberta comum com cordas 3 e 2 soltas e 1ª na casa 3 é uma díade Sol–Si com tônica dobrada sem a quinta Ré, textura incompleta muito frequente no violão).",
          "bpm": 60,
          "repeticoes": "8 ciclos (opcional)",
          "tablatura": "   [G Maior Tríade Completa (1ª Inversão)]     [G Textura Aberta Incompleta (sem 5ª)]\n   3M (Si)   5J (Ré)   T (Sol)                 T (Sol)   3M (Si)   T (Sol)\nE|--3----------------------------------------|--3-----------------------------------|\nB|--3----------------------------------------|--0-----------------------------------|\nG|--4----------------------------------------|--0-----------------------------------|\n   (dedos 3, 2 e 4)                             (dedo 3 na 1ª corda, cordas 2 e 3 soltas)",
          "dica": "Reconhecer tríades completas nas primas permite harmonizar linhas melódicas no violão solo."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Confundir a posição da terça no acorde de Lá Menor.",
        "correcao": "Lembre-se que no acorde aberto de Am, a 3ª corda casa 2 é Lá (tônica oitavada) e a 2ª corda casa 1 é Dó (a terça menor real)."
      },
      {
        "erro": "Dedo deitado abafando as cordas adjacentes durante o arpejo.",
        "correcao": "Posicione as pontas dos dedos perpendiculares à escala como martelinhos curvos."
      }
    ],
    "aplicacaoMusical": "Permite compreender a arquitetura dos acordes, encontrar inversões no braço e harmonizar melodias no violão solo.",
    "criterioSaida": "Arpejar C e Am no nível Alvo identificando oralmente Tônica, Terça e Quinta a 50 BPM sem hesitação.",
    "recuperacao": "Se houver dúvida entre terça maior e menor: retorne à Preparação com E e Em até automatizar a diferença auditiva e motora.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Afinação e postura",
        "instrucao": "Afine o violão com atenção especial às cordas 3 (Sol) e 2 (Si)."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Notas das cordas soltas",
        "instrucao": "Recite e toque as 6 cordas soltas de cima para baixo: Mi, Lá, Ré, Sol, Si, Mi."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Ouvir a diferença de terça maior e menor",
        "instrucao": "Toque E e Em alternadamente. Sinta o efeito da terça no humor do acorde."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Arpejar C e Am em estado fundamental",
        "instrucao": "5 min na Preparação; 8 min no Alvo arpejando e nomeando as notas; 2 min na Variação (ou reforço do Alvo)."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Cadência harmônica de tríades",
        "instrucao": "Toque a progressão C - Am no violão ouvindo a condução das terças."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Caderno de dificuldades",
        "instrucao": "Anote se houve dificuldade com a localização das funções das notas."
      }
    ],
    "ferramentaSugerida": "troca-acordes"
  },
  {
    "id": "ativ-6",
    "slug": "aplicacao-melodia-acompanhamento",
    "titulo": "Aplicação Curta: Melodia e Acompanhamento Integrados",
    "area": "Violão Solo e Integração",
    "nivelDificuldade": "Intermediário Inicial",
    "statusProntidao": "em_revisao",
    "tags": [
      "violao-solo",
      "melodia",
      "acompanhamento",
      "baixo",
      "integracao",
      "nylon"
    ],
    "habilidade": "Execução coordenada de linha melódica e linha de baixo simultâneas em violão de nylon em compasso 4/4.",
    "metaObservavel": "Tocar frase musical autoral de 4 compassos completos em 4/4 a 55 BPM com melodia expressiva nas cordas agudas e baixos fundamentais nos tempos 1 e 3.",
    "prerequisito": "Domínio de pulso em 4/4 (Atividade 1) e arpejos básicos com p-i-m.",
    "explicacao": "O violão solo reside na independência polifônica de dois planos sonoros: o polegar atua como contrabaixista, sustentando a fundação rítmico-harmônica nos bordões, enquanto os dedos indicador e médio cantam a melodia com clareza dinâmica nas cordas agudas sem cortar a sustentação do baixo.",
    "fontes": [
      {
        "aulaId": "aula-mod-1-19",
        "observacao": "Aplicação de acompanhamento com harmonia estruturada.",
        "autoria": "Método Tríade (acervo)"
      },
      {
        "aulaId": "aula-mod-2-38",
        "observacao": "Exemplo oficial de melodia acompanhada em três níveis progressivos no acervo.",
        "autoria": "Método Tríade (acervo) / Arranjo e composição didática autoral em 4/4 por Antigravity (em revisão)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 55,
      "bpmMinimo": 45,
      "bpmAlvo": 65,
      "compasso": "4/4",
      "contagem": "1 - 2 - 3 - 4 em todos os níveis",
      "dedilhacaoMD": "p no baixo nos tempos 1 e 3; i e m na melodia",
      "instrucoes": "Frase Melódica Didática em Dó Maior (4 compassos em 4/4). O polegar toca o baixo no tempo 1 junto com a primeira nota da melodia em movimento de pinça [p+m]. Deixe o baixo soar por 2 tempos inteiros.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Melodia Isolada de 4 Compassos em 4/4)",
          "descricao": "Toque apenas a linha melódica nas cordas 2 e 1 com dedos i e m alternados. Durações explícitas: semínima = 1 tempo; mínima = 2 tempos; semibreve = 4 tempos. Mantenha cada nota soando pelo seu valor total antes do próximo ataque.",
          "bpm": 50,
          "repeticoes": "4 compassos completos duas vezes",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   | 1   2   3   4   | 1   2   3   4   |\nC:  | c. 1 (C)         | c. 2 (G)         | c. 3 (G7)        | c. 4 (C)         |\nE|-------------------|--------------------|-------------------|-------------------|\nB|--1-------1---3----|--0-------0---1-----|--0----------------|--1----------------|\nG|------0------------|--------------------|---------2---0-----|-------------------|\nD|-------------------|--------------------|-------------------|-------------------|\nA|-------------------|--------------------|-------------------|-------------------|\nE|-------------------|--------------------|-------------------|-------------------|\n    ♩(1t) ♩(1t) ♩(1t) ♩(1t)  𝅗𝅥(2t)  ♩(1t) ♩(1t)  𝅗𝅥(2t)  ♩(1t) ♩(1t)  𝅝(4t)",
          "dica": "Cante as notas da melodia em voz alta para memorizar o desenho rítmico antes de acrescentar o baixo.",
          "instrucoesRodape": "Duração: t.1=Fá4(B c. 1), t.2=Mi4(G), t.3=Ré4(B c. 3), t.4=Sol4(B c. 3);\nc. 2: t.1-2=Si3(B solto, mínima), t.3=Si3, t.4=Dó4(B c. 1);\nc. 3: t.1-2=Si3(mínima), t.3=Sol3(G c. 2), t.4=Mi3(G); c. 4: Ré4(B c. 4)—semibreve 4 tempos."
        },
        "alvo": {
          "nome": "Alvo (Melodia com Baixo Fundamental nos Tempos 1 e 3 — 4 Compassos Completos)",
          "descricao": "Mesmos 4 compassos em 4/4 com baixo fundamental (polegar p) nos tempos 1 e 3 de TODOS os 4 compassos, incluindo c. 4. Cada baixo sustenta por 2 tempos (mínima); c. 4 tem baixo em Dó (5ª c. 3) no t.1 e rearticulação no t.3, enquanto a melodia sustenta semibreve (4 tempos).",
          "bpm": 55,
          "repeticoes": "4 compassos completos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   | 1   2   3   4   | 1   2   3   4   |\nC:  | c. 1 (C)         | c. 2 (G)         | c. 3 (G7)        | c. 4 (C)         |\nE|-------------------|--------------------|-------------------|-------------------|\nB|--1-------1---3----|--0-------0---1-----|--0----------------|--1-----------|\nG|------0------------|--------------------|---------2---0-----|---------------|\nD|-------------------|--------------------|-------------------|-------------------|\nA|--3-------3--------|--------------------|--------------------|--3-------3--------|\nE|-------------------|-3-------3----------|-3-------3---------|-------------------|\n   [p+i] [p] [p+m]    [p]   [p] [p+i]    [p]  [p] ♩  ♩    [p+m](𝅝)[p] t.3\n    1    2    3   4     1    2    3   4     1    2   3   4    1   2   3   4\nc. 3→Sol/6ªE(t1)+Sol/6ªE(t3); c. 4→Dó/5ªA(t1)sustenta2t e Dó/5ªA(t3)rearticulação.",
          "dica": "No c. 4, o polegar ataca nos t.1 e t.3 (dois ataques do baixo Dó). A melodia não é re-atacada. Deixe a nota melódica soar os 4 tempos inteiros enquanto o baixo pulsa.",
          "instrucoesRodape": "Baixo (duração mínima = 2 tempos): c. 1→Dó/5ªA(t1)+Dó/5ªA(t3); c. 2→Sol/6ªE(t1)+Sol/6ªE(t3);\nMelodia c. 4: Ré4(B c. 4) semibreve — sustenta os 4 tempos inteiros sem re-ataque."
        },
        "variacao": {
          "nome": "Variação (Preenchimento Harmônico nas Cordas 4/5 — sem Reinvadir a Melodia)",
          "descricao": "Mesmos 4 compassos acrescentando notas de preenchimento harmônico arpejadas APENAS nas cordas 4 (Ré) e 5 (Lá) nos contratempos dos tempos 2 e 4. A corda 3 (Sol) NÁO é rearticada quando em sustentação da melodia — o preenchimento fica restrito às cordas graves (D e A), preservando o espaço sonoro da melodia.",
          "bpm": 60,
          "repeticoes": "4 compassos completos (opcional)",
          "tablatura": "4/4 | 1  2e  3  4e  | 1  2e  3  4e  | 1  2e  3  4e  | 1   2   3   4  |\nC:  | c. 1 (C)          | c. 2 (G)          | c. 3 (G7)         | c. 4 (C)          |\nE|-------------------|--------------------|-------------------|-------------------|\nB|--1-------1---3----|--0-------0---1-----|--0----------------|--1----------------|\nG|------0------------|--------------------|---------2---0-----|-------------------|\nD|---2-------2-------|--0---------0-------|--0---------0------|--2---2---2---2----|\nA|--3-------3--------|--3---------3-------|--3---------3------|--3-------3--------|\nE|-------------------|--------------------|-------------------|---------3---------|\n   1  (2e) 3  (4e)    1  (2e) 3  (4e)    1  (2e) 3  (4e)",
          "dica": "Destaque a melodia nas primas com dinâmica firme. O preenchimento (cordas D/A, contratempos) deve soar suave ao fundo, como um baixo de colcheia sem chamar atenção.",
          "instrucoesRodape": "Leg.: (2e)/(4e) = preenchimento nas cordas D(4ª) e A(5ª) apenas.\nA corda G(3ª) NÁO recebe novas articulações enquanto sustenta melodia — evita conflito timbrístico."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Cortar a sustentação do baixo assim que o dedo toca a segunda nota melódica.",
        "correcao": "Mantenha o dedo da mão esquerda pressionando o baixo na casa durante os 2 tempos inteiros do valor da nota."
      },
      {
        "erro": "Tocar o baixo muito forte encobrindo a melodia cantada.",
        "correcao": "A melodia aguda é a protagonista. O polegar deve tocar com peso equilibrado e sem estalo."
      }
    ],
    "aplicacaoMusical": "Porta de entrada para todo o repertório de violão solo de MPB, Choro e Bossa Nova.",
    "criterioSaida": "Executar os 4 compassos do nível Alvo a 55 BPM em 4/4 com baixos sustentados e melodia límpida.",
    "recuperacao": "Se a mão direita perder a coordenação: pratique a pinça [p+m] isolada em cordas soltas (5ª e 2ª cordas) por 3 minutos antes de voltar à peça.",
    "sessao40min": [
      {
        "fase": "Preparar",
        "minutos": 3,
        "objetivo": "Posição e relaxamento da mão direita",
        "instrucao": "Confira a curvatura do pulso da mão direita para que o polegar não colida com os outros dedos."
      },
      {
        "fase": "Recuperar",
        "minutos": 5,
        "objetivo": "Ataque em pinça de cordas soltas",
        "instrucao": "Toque a 5ª corda (p) e 2ª corda (m) juntas, deixando soar por 2 tempos repetidamente."
      },
      {
        "fase": "Explicar e Ouvir",
        "minutos": 7,
        "objetivo": "Ouvir as duas vozes separadas",
        "instrucao": "Cante a melodia aguda e ouça mentalmente o baixo grave sustentando o fundo."
      },
      {
        "fase": "Prática Dirigida",
        "minutos": 15,
        "objetivo": "Construção do arranjo nos 3 níveis",
        "instrucao": "4 min na Preparação (só melodia); 8 min no Alvo (baixo + melodia); 3 min na Variação (ou reforço do Alvo)."
      },
      {
        "fase": "Aplicação Musical",
        "minutos": 7,
        "objetivo": "Interpretação e dinâmica musical",
        "instrucao": "Toque a frase com fraseado expressivo no nylon."
      },
      {
        "fase": "Registro",
        "minutos": 3,
        "objetivo": "Autoavaliação final de sessão",
        "instrucao": "Anote se conseguiu sustentar os bordões e registre no progresso."
      }
    ],
    "ferramentaSugerida": "metronomo"
  }
,

  {
    "id": "ativ-7",
    "statusOperacional": "em_revisao",
    "emElaboracao": false,
    "slug": "bossa-nova-basica",
    "titulo": "Bossa Nova Básica: Baixo Antecipado e Acordes em Bloco",
    "area": "Rítmica e Coordenação",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "bossa-nova",
      "ritmo",
      "baixo-antecipado",
      "sincope",
      "mpb"
    ],
    "habilidade": "Execução do padrão rítmico clássico de Bossa Nova com baixo alternado de polegar e acordes sincopados em bloco (i-m-a).",
    "metaObservavel": "Tocar 8 compassos contínuos do padrão de Bossa Nova a 70 BPM em 2/4 sobre C7M e Dm7(9), cravando a síncope e a antecipação rítmica sem oscilar o pulso.",
    "prerequisito": "Domínio de acordes com sétima (ex: C7M, Dm7) e independência básica entre polegar e dedos articuladores.",
    "explicacao": "Na Bossa Nova (escola João Gilberto e Roberto Menescal), o violão funciona como uma bateria de bolso: o polegar faz o papel do surdo marcando os tempos fundamentais, enquanto os dedos indicador, médio e anelar (i, m, a) pinçam as primas em bloco, simulando o tamborim com antecipações rítmicas nas colcheias fracas.",
    "fontes": [
      {
        "aulaId": "aula-mod-9-10",
        "observacao": "Referência de Bossa Nova: Garota de Ipanema e levada sincopada no Método Tríade.",
        "autoria": "Método Tríade (acervo) / Mapeamento com Acompanhamento de Bossa Nova do Curso Kaiser"
      },
      {
        "aulaId": "aula-mod-1-8",
        "observacao": "Métrica e pulso de compasso binário no violão.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 50,
      "bpmAlvo": 80,
      "compasso": "2/4",
      "contagem": "1 e 2 e",
      "dedilhacaoMD": "p nos baixos (cordas 5 e 6); bloco i, m, a nas cordas 4, 3 e 2",
      "instrucoes": "Mantenha a mão direita relaxada em formato de concha. O polegar desce tocando a tônica no tempo 1; no contratempo do 1 ('e') e na cabeça do 2, o bloco i-m-a puxa as cordas agudas simultaneamente. Cante a levada: 'TUM... tá-tá... TUM... tá-tá'.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Baixo e Bloco nos Tempos Fortes)",
          "descricao": "Toque a tônica no tempo 1 com polegar (p) e o bloco de acordes no tempo 2 com (i-m-a) no acorde C7M. Sem síncope inicial, focando na sonoridade limpa do bloco.",
          "bpm": 60,
          "repeticoes": "4 compassos completos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           |                 |\nE|-------------------|-------------------|\nB|--------0----------|-------0-----------|\nG|--------0----------|-------0-----------|\nD|--------2----------|-------2-----------|\nA|----3--------------|---3---------------|\nE|-------------------|-------------------|\n      p   ima             p   ima\n      ♩   ♩               ♩   ♩",
          "dica": "Os dedos i, m, a devem fechar juntos em direção à palma, produzindo um som aveludado e uniforme.",
          "instrucoesRodape": "Clareza polifônica: ouça a nota mais aguda (B solta) soar límpida."
        },
        "alvo": {
          "nome": "Alvo (Levada Clássica de Bossa Nova com Antecipação)",
          "descricao": "Padrão rítmico oficial de 2 compassos com ataque sincopado no contratempo e alternância de baixo na 5ª corda (Dó) e 6ª corda (Sol).",
          "bpm": 70,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           |                 |\nE|-------------------|-------------------|\nB|----0-------0---0--|-------0---0-------|\nG|----0-------0---0--|-------0---0-------|\nD|----2-------2---2--|-------2---2-------|\nA|----3--------------|---3---------------|\nE|------------3------|-----------3-------|\n      p+b     p   b      p   b   p\n      ♪   ♪   ♪   ♪      ♪   ♪   ♪   ♪",
          "dica": "O segundo toque de polegar cai na 6ª corda (Sol, traste 3). Não apoie o polegar com força excessiva.",
          "instrucoesRodape": "O suingue reside na precisão da síncope: nunca atrase o acorde."
        },
        "variacao": {
          "nome": "Variação (Transição Harmônica C7M para Dm7(9))",
          "descricao": "Aplique a levada completa alternando entre C7M (2 compassos) e Dm7(9) (2 compassos), mantendo a fluidez rítmica ininterrupta na troca.",
          "bpm": 75,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           | [Dm7(9)]        |\nE|-------------------|-------------------|\nB|----0-------0---0--|----5-------5---5--|\nG|----0-------0---0--|----5-------5---5--|\nD|----2-------2---2--|----3-------3---3--|\nA|----3--------------|----5--------------|\nE|------------3------|------------5------|\n      p+b     p   b       p+b     p   b",
          "dica": "Antecipe o formato do Dm7(9) visualizando a pestana no 5º traste antes de descer a mão.",
          "instrucoesRodape": "Mantenha o mesmo volume dinâmico em ambos os acordes."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Arpejar o bloco de notas em vez de pinçar todas as três cordas exatamente no mesmo milissegundo.",
        "correcao": "Cole as pontas dos dedos i-m-a nas cordas antes de puxar, disparando o movimento a partir da articulação dos nós dos dedos."
      },
      {
        "erro": "Acelerar o andamento quando os acordes entram no contratempo.",
        "correcao": "Toque acompanhando a Máquina de Ritmos do app no preset Bossa Nova (80 BPM) para travar a grade rítmica."
      }
    ],
    "aplicacaoMusical": "Levada fundamental de 'Garota de Ipanema', 'O Barquinho', 'Wave' e da maior parte da discografia de Tom Jobim e João Gilberto.",
    "criterioSaida": "Executar os 8 compassos do nível Alvo a 70 BPM de forma relaxada, sem engolir notas nem oscilar o pulso.",
    "recuperacao": "Se perder a coordenação, desative o metrônomo e pratique o ciclo rítmico apenas em cordas abafadas por 2 minutos.",
    "sessao40min": [
      { "fase": "Preparar", "minutos": 3, "objetivo": "Postura e afinação", "instrucao": "Afine o violão com o afinador cromático do app e relaxe a musculatura do ombro direito." },
      { "fase": "Recuperar", "minutos": 5, "objetivo": "Mecânica de bloco", "instrucao": "Treine o pinçamento em bloco i-m-a em cordas soltas com firmeza e sem arpejo." },
      { "fase": "Explicar e Ouvir", "minutos": 7, "objetivo": "Interiorização rítmica", "instrucao": "Ligue a Máquina de Ritmos do app em Bossa Nova e vocalize a levada sincopada antes de tocar." },
      { "fase": "Prática Dirigida", "minutos": 15, "objetivo": "Execução progressiva", "instrucao": "Pratique a Preparação (60 BPM) e avance para o Alvo (70 BPM) com metrônomo contínuo." },
      { "fase": "Aplicação Musical", "minutos": 7, "objetivo": "Aplicação em cadência", "instrucao": "Execute a Variação alternando C7M e Dm7(9) sentindo o balanço característico." },
      { "fase": "Registro", "minutos": 3, "objetivo": "Autoavaliação", "instrucao": "Anote seu BPM estável e eventuais tensões no caderno de notas do app." }
    ],
    "ferramentaSugerida": "metronomo"
  },

  {
    "id": "ativ-8",
    "statusOperacional": "em_revisao",
    "emElaboracao": false,
    "slug": "levada-baden-powell",
    "titulo": "As Levadas de Baden Powell: Mão Direita Percussiva e Dinâmica",
    "area": "Violão Brasileiro",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "baden-powell",
      "samba",
      "mao-direita",
      "violao-brasileiro",
      "levada"
    ],
    "habilidade": "Execução da emblemática Levada 1 de Baden Powell, integrando batida percussiva, rasgueio suave e acentuação sincopada de polegar.",
    "metaObservavel": "Tocar 8 compassos contínuos da Levada 1 de Baden Powell a 75 BPM em 2/4 sobre Em e B7, mantendo a sonoridade enérgica e o balanço afro-samba.",
    "prerequisito": "Atividade 7 (Bossa Nova Básica) e boa articulação livre do polegar nos bordões.",
    "explicacao": "Baden Powell revolucionou a linguagem do violão moderno ao fundir a harmonia da Bossa Nova com o batuque percussivo dos terreiros e do samba de roda. A sua mão direita não apenas toca as notas, mas 'percute' o instrumento através de toques apoiados potentes do polegar intercalados com puxadas rápidas dos dedos e abafamentos rítmicos.",
    "fontes": [
      {
        "aulaId": "aula-mod-7-1",
        "observacao": "Exercícios fundamentais de técnica de mão direita e coordenação motora no Método Tríade.",
        "autoria": "Método Tríade (acervo) / Mapeamento com Módulo 'As Levadas da Mão Direita de Baden Powell' do Curso Kaiser"
      },
      {
        "aulaId": "aula-mod-7-6",
        "observacao": "Preparação e independência motora para fingerstyle e violão solo.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 75,
      "bpmMinimo": 60,
      "bpmAlvo": 90,
      "compasso": "2/4",
      "contagem": "1 e 2 e",
      "dedilhacaoMD": "p no bordão grave; i, m, a puxando e percutindo nas primas",
      "instrucoes": "Mantenha o pulso solto. O polegar ataca a 6ª corda (Em) com energia, e os dedos i-m-a respondem com um toque vivo e ligeiramente estalado nas três primeiras cordas, criando o característico balanço afro-brasileiro.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Ataque Fundamental Polegar e Resposta)",
          "descricao": "Polegar no tempo 1 (Mi grave solto) e resposta do bloco i-m-a no tempo 2 sobre o acorde Em, focando no contraste de peso.",
          "bpm": 60,
          "repeticoes": "4 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Em]            |                 |\nE|--------0----------|-------0-----------|\nB|--------0----------|-------0-----------|\nG|--------0----------|-------0-----------|\nD|--------2----------|-------2-----------|\nA|--------2----------|-------2-----------|\nE|----0--------------|---0---------------|\n      p   ima             p   ima",
          "dica": "Deixe o polegar repousar na 5ª corda após o ataque no bordão (toque apoiado).",
          "instrucoesRodape": "Ouça o contraste: o grave pesado contra o agudo brilhante."
        },
        "alvo": {
          "nome": "Alvo (Levada 1 de Baden Powell Completa)",
          "descricao": "Padrão de 2 compassos com a síncope característica de Baden: baixo forte no tempo 1, corte seco e contratempo acentuado.",
          "bpm": 75,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Em]            |                 |\nE|----0-------0---0--|-------0---0-------|\nB|----0-------0---0--|-------0---0-------|\nG|----0-------0---0--|-------0---0-------|\nD|----2-------2---2--|-------2---2-------|\nA|-------------------|-------------------|\nE|----0-------0------|---0-------0-------|\n      p+b     p   b      p   b   p   b",
          "dica": "Imite a sonoridade de um atabaque e pandeiro dialogando no mesmo instrumento.",
          "instrucoesRodape": "O ritmo deve ser pulsante e nunca letárgico."
        },
        "variacao": {
          "nome": "Variação (Progressão Em - B7/F# com Acento Afro-Samba)",
          "descricao": "Aplique a levada alternando entre Em e B7/F# com condução do baixo no 2º traste da 6ª corda.",
          "bpm": 85,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Em]            | [B7/F#]         |\nE|----0-------0---0--|----2-------2---2--|\nB|----0-------0---0--|----0-------0---0--|\nG|----0-------0---0--|----2-------2---2--|\nD|----2-------2---2--|----1-------1---1--|\nA|-------------------|-------------------|\nE|----0-------0------|----2-------2------|\n      p+b     p   b       p+b     p   b",
          "dica": "O acorde B7/F# usa o dedo 2 na 6ª corda; mantenha a pressão firme na ponta do dedo.",
          "instrucoesRodape": "Troca precisa sem interrupção do pulso de 2/4."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Tocar com timidez ou excesso de suavidade clássica.",
        "correcao": "O estilo Baden Powell exige pegada firme, usando a unha da mão direita para dar brilho metálico ao nylon."
      }
    ],
    "aplicacaoMusical": "Base de 'Samba da Bênção', 'Berimbau', 'Canto de Ossanha' e de toda a estética dos Afro-Sambas de Baden e Vinicius.",
    "criterioSaida": "Executar os 8 compassos a 75 BPM com firmeza rítmica e clareza percussiva.",
    "recuperacao": "Isole o movimento da mão direita batendo o ritmo no corpo do violão antes de aplicar nas cordas.",
    "sessao40min": [
      { "fase": "Preparar", "minutos": 3, "objetivo": "Postura e alongamento", "instrucao": "Alongue os tendões dos flexores dos dedos e posicione o violão com apoio firme." },
      { "fase": "Recuperar", "minutos": 5, "objetivo": "Apoio de polegar", "instrucao": "Toque a 6ª corda com apoio dinâmico sentindo a ressonância do grave." },
      { "fase": "Explicar e Ouvir", "minutos": 7, "objetivo": "Audição comparativa", "instrucao": "Ouça a gravação de 'Samba da Bênção' prestando atenção exclusiva ao ataque da mão direita de Baden." },
      { "fase": "Prática Dirigida", "minutos": 15, "objetivo": "Estudo metronômico", "instrucao": "Pratique a Levada 1 no nível Alvo a 65 BPM e suba gradativamente até 75 BPM." },
      { "fase": "Aplicação Musical", "minutos": 7, "objetivo": "Fluência harmônica", "instrucao": "Aplique a transição Em para B7/F# sustentando o suingue contínuo." },
      { "fase": "Registro", "minutos": 3, "objetivo": "Autoavaliação", "instrucao": "Registre no app se conseguiu a pegada percussiva sem tensionar o trapézio." }
    ],
    "ferramentaSugerida": "metronomo"
  },

  {
    "id": "ativ-9",
    "statusOperacional": "em_revisao",
    "emElaboracao": false,
    "slug": "baixarias-choro-samba",
    "titulo": "Baixarias de Choro e Samba: Condução Melódica nos Bordões",
    "area": "Violão Brasileiro",
    "nivelDificuldade": "Avançado",
    "statusProntidao": "em_revisao",
    "tags": [
      "choro",
      "samba",
      "baixarias",
      "bordao",
      "violao-7-cordas",
      "contraponto"
    ],
    "habilidade": "Execução de frases de baixaria nos bordões graves (cordas 4, 5 e 6) conectando cadências harmônicas tradicionais de Choro e Samba.",
    "metaObservavel": "Tocar uma linha de baixaria contínua de 4 compassos em Lá Menor a 70 BPM, unindo os acordes Am -> Dm -> E7 -> Am com clareza melódica de polegar.",
    "prerequisito": "Fluência em escalas diatônicas nos bordões e independência de polegar consolidada na Atividade 8.",
    "explicacao": "A 'baixaria' é a grande marca registrada do violão brasileiro no Choro e no Samba de raiz (escola Dino 7 Cordas e Raphael Rabello). Trata-se de um contracanto melódico executado pelo polegar nos bordões graves que costura os vazios da melodia principal e conduz o ouvido de um acorde para o próximo.",
    "fontes": [
      {
        "aulaId": "aula-mod-7-2",
        "observacao": "Inversões e condução de baixo na prática no Método Tríade.",
        "autoria": "Método Tríade (acervo) / Mapeamento com Módulo 'BAIXARIAS DE 6 E 7 CORDAS' do Curso Kaiser"
      },
      {
        "aulaId": "aula-mod-7-3",
        "observacao": "Condução de baixos e transições harmônicas aplicadas.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 55,
      "bpmAlvo": 85,
      "compasso": "2/4",
      "contagem": "1 e 2 e",
      "dedilhacaoMD": "Polegar (p) com apoio firme em todas as notas da frase de baixaria",
      "instrucoes": "Cada nota da baixaria deve ser tocada com apoio do polegar sobre a corda imediatamente inferior, garantindo timbre encorpado, volume sonoro dominante e sustentação legato entre as notas.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Escala Descendente Conduzida pelo Polegar)",
          "descricao": "Frase de 2 compassos descendo de Lá (5ª corda solta) até Mi grave (6ª corda solta) em semínimas.",
          "bpm": 60,
          "repeticoes": "4 repetições",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\nE|-------------------|-------------------|\nB|-------------------|-------------------|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|----0--------------|-------------------|\nE|--------3---1---0--|---0---------------|\n      A   G   F   E       E\n      p   p   p   p       p",
          "dica": "Use os dedos 3 e 1 da mão esquerda para as casas 3 e 1 da 6ª corda.",
          "instrucoesRodape": "Apoie o polegar com peso natural."
        },
        "alvo": {
          "nome": "Alvo (Baixaria Clássica em Am Conectando para E7)",
          "descricao": "Frase tradicional de choro em colcheias ligando Am a E7 com cromatismo de aproximação (Ré# -> Mi).",
          "bpm": 70,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Am]            | [E7]            |\nE|-------------------|-------------------|\nB|--------1----------|--------3----------|\nG|--------2----------|--------1----------|\nD|--------2----------|--------2----------|\nA|----0-------0---2--|----3---2---1---0--|\nE|-------------------|-------------------|\n      p   ima p   p       p   p   p   p\n             (baixaria: A - B - C - B - Bb - A)",
          "dica": "Mantenha o acorde Am armado enquanto o polegar caminha nas cordas graves.",
          "instrucoesRodape": "O cromatismo Bb -> A dá o típico sabor de Choro antigo."
        },
        "variacao": {
          "nome": "Variação (Ciclo Completo Am -> Dm -> E7 -> Am com Baixaria de Resolução)",
          "descricao": "Cadência completa de 4 compassos com frase arpejada no baixo fechando no tempo 1 do acorde de tônica.",
          "bpm": 80,
          "repeticoes": "4 ciclos completos",
          "tablatura": "2/4 | [Am]      | [Dm]      | [E7]      | [Am]      |\nE|-----------|-----------|-----------|-----------|\nB|----1------|----3------|----3------|----1------|\nG|----2------|----2------|----1------|----2------|\nD|----2------|0---0------|----2------|----2------|\nA|0---0--2-3-|-------3-2-|-------1-2-|0---0------|\nE|-----------|-----------|0---0------|-----------|",
          "dica": "Cante as notas do baixo em voz alta para memorizar a linha melódica.",
          "instrucoesRodape": "Fluidez contínua: nunca interrompa o tempo para procurar a nota."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Tocar a baixaria com volume fraco ou abafada em relação aos acordes.",
        "correcao": "Lembre-se que a baixaria É a melodia do momento. O polegar deve soar mais alto e encorpado que qualquer outra nota."
      }
    ],
    "aplicacaoMusical": "Linguagem obrigatória para tocar Choro ('Noites Cariocas', 'Brasileirinho') e acompanhar Samba de mesa tradicional.",
    "criterioSaida": "Executar os 4 compassos do nível Alvo a 70 BPM com timbre limpo de polegar e sem esbarrar nas primas.",
    "recuperacao": "Pratique a linha do baixo isoladamente sem tocar os acordes até decorar a digitação de ouvido.",
    "sessao40min": [
      { "fase": "Preparar", "minutos": 3, "objetivo": "Afinação e aquecimento", "instrucao": "Verifique a afinação precisa dos bordões 4, 5 e 6 com o afinador." },
      { "fase": "Recuperar", "minutos": 5, "objetivo": "Escala cromática no bordão", "instrucao": "Pratique digitação 1-2-3-4 na 5ª corda com apoio do polegar." },
      { "fase": "Explicar e Ouvir", "minutos": 7, "objetivo": "Percepção contrapontística", "instrucao": "Ouça o clássico 'Noites Cariocas' de Jacob do Bandolim focando a atenção no violão de 7 cordas ao fundo." },
      { "fase": "Prática Dirigida", "minutos": 15, "objetivo": "Estudo metronômico", "instrucao": "Execute o nível Alvo a 60 BPM focando na precisão milimétrica dos ataques." },
      { "fase": "Aplicação Musical", "minutos": 7, "objetivo": "Ciclo completo", "instrucao": "Toque a Variação encadeando Am -> Dm -> E7 -> Am com fluidez e suingue de choro." },
      { "fase": "Registro", "minutos": 3, "objetivo": "Autoavaliação", "instrucao": "Anote suas impressões no caderno de notas e confirme a ausência de dor no polegar." }
    ],
    "ferramentaSugerida": "metronomo"
  },

  {
    "id": "ativ-10",
    "statusOperacional": "em_revisao",
    "emElaboracao": false,
    "slug": "melodia-acompanhada-violao-solo",
    "titulo": "Violão Solo: Melodia Acompanhada e Hierarquia Dinâmica",
    "area": "Violão Solo",
    "nivelDificuldade": "Avançado",
    "statusProntidao": "em_revisao",
    "tags": [
      "violao-solo",
      "fingerstyle",
      "arranjo",
      "polifonia",
      "dinamica"
    ],
    "habilidade": "Controle simultâneo de duas camadas sonoras (melodia cantante na prima vs baixo e arpejo de acompanhamento em plano secundário).",
    "metaObservavel": "Executar uma peça didática de 8 compassos a 70 BPM com separação dinâmica evidente: soprano cantante (forte) e harmonia de fundo (piano).",
    "prerequisito": "Atividade 6 (Melodia e Acompanhamento Integrados) e fluência de dedilhado P-I-M-A.",
    "explicacao": "No violão clássico e no fingerstyle brasileiro, o grande segredo para soar como uma orquestra é a hierarquia dinâmica: a melodia nas primas precisa cantar livre e sustentada, enquanto o polegar e os arpejos internos funcionam como o tapete harmônico suave.",
    "fontes": [
      {
        "aulaId": "aula-mod-8-2",
        "observacao": "Arranjo e melodia acompanhada no violão: O Poderoso Chefão no Método Tríade.",
        "autoria": "Método Tríade (acervo) / Mapeamento com Módulo 'ARRANJO: Comece pelo Simples' do Curso Kaiser"
      },
      {
        "aulaId": "aula-mod-9-4",
        "observacao": "Arranjo fingerstyle e violão solo em peças consagradas.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 55,
      "bpmAlvo": 80,
      "compasso": "3/4",
      "contagem": "1 - 2 - 3",
      "dedilhacaoMD": "p no baixo (tempo 1); i, m nas cordas médias; a cantando a melodia na 1ª corda",
      "instrucoes": "O anelar (a) ataca a 1ª corda com toque firme e apoiado (ou toque livre com peso de braço), enquanto i e m apenas acariciam as cordas 2 e 3 sem roubar a cena da melodia.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Isolamento da Melodia Cantante)",
          "descricao": "Toque apenas a linha melódica da 1ª corda com o dedo anelar (a), prestando atenção no timbre aveludado e na duração inteira de cada nota.",
          "bpm": 60,
          "repeticoes": "4 compassos",
          "tablatura": "3/4 | 1 . 2 . 3 . | 1 . 2 . 3 . |\nE|----0---2---3---|---5-------3---|\nB|----------------|---------------|\nG|----------------|---------------|\nD|----------------|---------------|\nA|----------------|---------------|\nE|----------------|---------------|\n      a   a   a       a       a",
          "dica": "Cante a melodia com a voz enquanto toca para imprimir intenção lírica ao fraseado.",
          "instrucoesRodape": "Sustente o som de cada nota até o instante exato da seguinte."
        },
        "alvo": {
          "nome": "Alvo (Melodia Integrada ao Baixo e Arpejo a 2 Vozes)",
          "descricao": "Peça didática clássica a 2 vozes: baixo no tempo 1, arpejo de preenchimento nos tempos 2 e 3, e melodia flutuando no soprano.",
          "bpm": 70,
          "repeticoes": "8 compassos contínuos",
          "tablatura": "3/4 | 1 . . 2 . . 3 . . | 1 . . 2 . . 3 . . |\n    | [Em]              | [Am]              |\nE|----3-----------------|---0---------------|\nB|----------0-----0-----|---------1-----1---|\nG|--------0-----0-------|-------2-----2-----|\nD|----------------------|-------------------|\nA|----------------------|---0---------------|\nE|----0-----------------|-------------------|\n      p+a   i m   i m       p+a   i m   i m\n     (forte) (piano)       (forte) (piano)",
          "dica": "A nota Mi grave e a nota Sol da 1ª corda atacam juntas no tempo 1. O anelar deve soar com o dobro do volume dos dedos médios.",
          "instrucoesRodape": "O arpejo i-m deve ser quase sussurrado."
        },
        "variacao": {
          "nome": "Variação (Condução Polifônica com Mudança de Registro)",
          "descricao": "Extensão do arranjo introduzindo nota melódica no tempo 3 contra o baixo pedal sustentado.",
          "bpm": 75,
          "repeticoes": "8 compassos",
          "tablatura": "3/4 | 1 . . 2 . . 3 . . | 1 . . 2 . . 3 . . |\n    | [Em]              | [B7]              |\nE|----0-----------2-----|---3-----------2---|\nB|----------0-----------|---------0---------|\nG|--------0-----0-------|-------2-----2-----|\nD|----------------------|-------------------|\nA|----------------------|---2---------------|\nE|----0-----------------|-------------------|",
          "dica": "Mantenha o baixo soando durante todo o compasso sem cortar prematuramente.",
          "instrucoesRodape": "Sensação de duas pessoas tocando juntas no mesmo violão."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Tocar todas as notas com a mesma intensidade, resultando em uma massa sonora embolada onde a música não se destaca.",
        "correcao": "Pratique tocar o arpejo intermediário tão baixo que quase não se ouça, enquanto toca a melodia forte."
      }
    ],
    "aplicacaoMusical": "A base de todo arranjo fingerstyle, peças renascentistas/barrocas e arranjos solos de MPB.",
    "criterioSaida": "Executar os 8 compassos a 70 BPM com clara distinção auditiva entre a melodia principal e o acompanhamento.",
    "recuperacao": "Isole a mão direita nas cordas abafadas, praticando o peso diferenciado do anelar sobre o indicador e médio.",
    "sessao40min": [
      { "fase": "Preparar", "minutos": 3, "objetivo": "Afinação e postura", "instrucao": "Apoie o pé esquerdo (ou suporte ergonômico) elevando a mão esquerda na altura do peito." },
      { "fase": "Recuperar", "minutos": 5, "objetivo": "Equalização de toque", "instrucao": "Treine tocar a 1ª corda forte e a 2ª corda piano alternadamente." },
      { "fase": "Explicar e Ouvir", "minutos": 7, "objetivo": "Apreciação musical", "instrucao": "Ouça o 'Prelúdio em Dó' de Bach ao violão e identifique como a voz soprano guia a escuta." },
      { "fase": "Prática Dirigida", "minutos": 15, "objetivo": "Estudo metronômico", "instrucao": "Pratique a peça do nível Alvo a 60 BPM garantindo que a melodia cante sem interrupção." },
      { "fase": "Aplicação Musical", "minutos": 7, "objetivo": "Interpretação e dinâmica", "instrucao": "Toque a Variação adicionando dinâmica expressiva nos pontos culminantes da melodia." },
      { "fase": "Registro", "minutos": 3, "objetivo": "Autoavaliação", "instrucao": "Anote seu resultado no app e grave 30 segundos no celular para avaliar a clareza da melodia." }
    ],
    "ferramentaSugerida": "metronomo"
  },

  {
    "id": "ativ-11",
    "statusOperacional": "em_revisao",
    "emElaboracao": false,
    "slug": "voice-leading-voicings-drop2",
    "titulo": "Voice Leading e Voicings Drop 2: Condução Suave II-V-I",
    "area": "Harmonia e Teoria",
    "nivelDificuldade": "Avançado",
    "statusProntidao": "em_revisao",
    "tags": [
      "harmonia",
      "voice-leading",
      "drop-2",
      "ii-v-i",
      "bossa-nova",
      "jazz"
    ],
    "habilidade": "Condução harmônica de vozes (voice leading) com movimento mínimo de dedos através de voicings Drop 2 no grupo de cordas 4-3-2-1.",
    "metaObservavel": "Tocar a cadência II-V-I em Dó Maior (Dm7 -> G7 -> C7M) movendo as vozes por grau conjunto (máximo 1 tom por voz) a 70 BPM.",
    "prerequisito": "Atividade 5 (Tríades e Acordes) e familiaridade com pestanas nas primeiras casas.",
    "explicacao": "Voice Leading (condução de vozes) é o princípio mestre da harmonia refinada: em vez de saltar com a mão inteira pelo braço, mantemos as notas comuns e movemos as outras pelo caminho mais curto possível (semitom ou tom). O resultado é uma textura harmônica contínua, densa e sofisticada típica da Bossa Nova e do Jazz.",
    "fontes": [
      {
        "aulaId": "aula-mod-9-8",
        "observacao": "Tétrades com 9ª e condução harmônica no Método Tríade.",
        "autoria": "Método Tríade (acervo) / Mapeamento com Módulo 'Inversões e Aberturas de Acordes' do Curso Kaiser"
      },
      {
        "aulaId": "aula-mod-9-11",
        "observacao": "Acordes dominantes sofisticados X7(13) e voice leading.",
        "autoria": "Método Tríade (acervo)"
      }
    ],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 50,
      "bpmAlvo": 85,
      "compasso": "4/4",
      "contagem": "1 - 2 - 3 - 4",
      "dedilhacaoMD": "p na 4ª corda; i na 3ª; m na 2ª; a na 1ª corda (bloco de 4 notas)",
      "instrucoes": "Monte o acorde Dm7 nas quatro primeiras cordas. Para ir para G7, observe que apenas dois dedos se movem por um semitom. Para ir para C7M, apenas uma voz desce meio tom. Mantenha os dedos colados na escala.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Transição Estática Dm7 para G7)",
          "descricao": "Isole a troca entre Dm7 (xx0211) e G7 (xx0001) sentindo as notas comuns e o movimento de semitom do Fá para Mi.",
          "bpm": 60,
          "repeticoes": "4 repetições de 2 compassos",
          "tablatura": "4/4 | 1 . . . 2 . . . 3 . . . 4 . . . | 1 . . . 2 . . . 3 . . . 4 . . . |\n    | [Dm7]                           | [G7]                            |\nE|----1-------------------------------|---1-----------------------------|\nB|----1-------------------------------|---0-----------------------------|\nG|----2-------------------------------|---0-----------------------------|\nD|----0-------------------------------|---0-----------------------------|\nA|------------------------------------|---------------------------------|\nE|------------------------------------|---------------------------------|",
          "dica": "A 4ª corda solta (Dó ou Ré) serve de âncora fixa. Não levante a mão da escala.",
          "instrucoesRodape": "Economia máxima de movimento."
        },
        "alvo": {
          "nome": "Alvo (Cadência II-V-I Completa nas Cordas 4-3-2-1)",
          "descricao": "Cadência completa Dm7 (xx3535) -> G7(13) (xx3453) -> C7M (xx2413) com condução suave de vozes.",
          "bpm": 70,
          "repeticoes": "4 ciclos de 4 compassos",
          "tablatura": "4/4 | [Dm7]   | [G7(13)] | [C7M]   | [C7M]   |\nE|----5-------|----3-----|----3----|----3----|\nB|----6-------|----5-----|----5----|----5----|\nG|----5-------|----4-----|----4----|----4----|\nD|----7-------|----5-----|----5----|----5----|\nA|----5-------|----------|----3----|----3----|\nE|------------|----3-----|---------|---------|",
          "dica": "Repare como a nota soprano desce elegantemente: Lá (5) -> Sol (3) -> Sol (3).",
          "instrucoesRodape": "Sonoridade orquestral imediata sob os dedos."
        },
        "variacao": {
          "nome": "Variação (Cadência com Ritmo de Bossa Nova)",
          "descricao": "Aplique a levada de Bossa Nova sincopada sobre a cadência II-V-I a 80 BPM.",
          "bpm": 80,
          "repeticoes": "4 ciclos",
          "tablatura": "2/4 | [Dm7] | [G7]  | [C7M] | [C7M] |\n    | levada sincopada contínua     |",
          "dica": "Conecte com o Laboratório Harmônico do app para visualizar os voicings montados.",
          "instrucoesRodape": "A harmonia da MPB se desvenda neste exercício."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Tirar todos os dedos da escala a cada troca de acorde e recolocá-los do zero.",
        "correcao": "Identifique a 'nota guia' que permanece no mesmo traste e use-a como pivô imóvel."
      }
    ],
    "aplicacaoMusical": "A espinha dorsal de 90% do cancioneiro da Bossa Nova, MPB e Jazz Standards ('Chega de Saudade', 'Autumn Leaves', 'Wave').",
    "criterioSaida": "Executar a cadência do nível Alvo a 70 BPM com troca silenciosa e condução perfeita de vozes.",
    "recuperacao": "Pratique a transição de apenas dois acordes por 3 minutos sem palhetar, focando apenas no movimento mínimo da mão esquerda.",
    "sessao40min": [
      { "fase": "Preparar", "minutos": 3, "objetivo": "Alongamento e afinação", "instrucao": "Verifique a afinação precisa das primas (cordas 1 a 4) com o afinador." },
      { "fase": "Recuperar", "minutos": 5, "objetivo": "Mapeamento das notas guia", "instrucao": "Toque apenas as notas que se movem por semitom entre Dm7 e G7." },
      { "fase": "Explicar e Ouvir", "minutos": 7, "objetivo": "Compreensão harmônica", "instrucao": "Abra o Laboratório Harmônico do app e compare o som do Dm7(9) com o G7." },
      { "fase": "Prática Dirigida", "minutos": 15, "objetivo": "Estudo metronômico", "instrucao": "Treine a cadência no nível Alvo a 60 BPM até a transição se tornar invisível aos olhos." },
      { "fase": "Aplicação Musical", "minutos": 7, "objetivo": "Aplicação musical", "instrucao": "Toque com a Máquina de Ritmos em Bossa Nova a 75 BPM sentindo a resolução no C7M." },
      { "fase": "Registro", "minutos": 3, "objetivo": "Autoavaliação", "instrucao": "Anote seu BPM no progresso e celebre o domínio do voice leading!" }
    ],
    "ferramentaSugerida": "laboratorio"
  }
];
