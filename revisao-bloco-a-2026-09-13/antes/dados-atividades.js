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
    "slug": "bossa-nova-basica",
    "titulo": "Bossa Nova Básica: Baixo Antecipado e Acordes em Bloco",
    "area": "Rítmica e Coordenação",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "bossa-nova",
      "ritmo",
      "baixo-antecipado",
      "sincope"
    ],
    "habilidade": "Execução do padrão básico de Bossa Nova com baixo alternado e acordes sincopados.",
    "metaObservavel": "Tocar 8 compassos do padrão de Bossa Nova a 70 BPM em 2/4, cravando a antecipação do baixo.",
    "prerequisito": "Domínio de acordes com sétima (ex: C7M, Dm7) e independência básica do polegar.",
    "explicacao": "Na Bossa Nova, o ritmo é construído pela interação entre um baixo constante em semínimas (ou colcheias, no 2/4) e acordes tocados de forma sincopada pelos dedos indicador, médio e anelar (i, m, a). A característica principal é o baixo antecipado ou a síncope nos acordes, criando o balanço típico.",
    "fontes": [],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 50,
      "bpmAlvo": 90,
      "compasso": "2/4",
      "contagem": "1 e 2 e",
      "dedilhacaoMD": "p nos baixos; i, m, a em bloco nos acordes",
      "instrucoes": "Mantenha o pulso estável. O polegar ataca nos tempos fortes, enquanto o bloco (i,m,a) preenche as subdivisões sincopadas. Pratique lentamente até o padrão motor se tornar automático.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Baixo e Acorde no Tempo)",
          "descricao": "Sem síncope. Polegar no tempo 1, bloco no tempo 2. Use o acorde C7M.",
          "bpm": 60,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           |                 |\nE|-------------------|-------------------|\nB|--------0----------|-------0-----------|\nG|--------0----------|-------0-----------|\nD|--------2----------|-------2-----------|\nA|----3--------------|---3---------------|\nE|-------------------|-------------------|\n      p   ima            p   ima\n      ♩   ♩              ♩   ♩",
          "dica": "Assegure que o bloco de dedos ataque junto, sem arpejar.",
          "instrucoesRodape": "Concentre-se na clareza do som."
        },
        "alvo": {
          "nome": "Alvo (Padrão Clássico de Bossa Nova)",
          "descricao": "Padrão com o bloco antecipado e no contratempo.",
          "bpm": 70,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           |                 |\nE|-------------------|-------------------|\nB|----0-------0---0--|-------0---0-------|\nG|----0-------0---0--|-------0---0-------|\nD|----2-------2---2--|-------2---2-------|\nA|----3--------------|---3---------------|\nE|------------3------|-----------3-------|\n      p+b     p   b      p   b   p\n      ♪   ♪   ♪   ♪      ♪   ♪   ♪   ♪",
          "dica": "b = bloco (ima). Cante a levada: pá, pá-pá, pá-pá.",
          "instrucoesRodape": "O segundo baixo cai na sexta corda (G)."
        },
        "variacao": {
          "nome": "Variação (Progressão C7M - Dm7)",
          "descricao": "Aplicando o padrão trocando de acordes a cada 2 compassos.",
          "bpm": 80,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [C7M]           | [Dm7]           |\nE|-------------------|-------------------|\nB|----0-------0---0--|----6-------6---6--|\nG|----0-------0---0--|----5-------5---5--|\nD|----2-------2---2--|----7-------7---7--|\nA|----3--------------|----5--------------|\nE|------------3------|------------5------|\n      p+b     p   b       p+b     p   b",
          "dica": "Antecipe a troca do acorde mentalmente.",
          "instrucoesRodape": "Mantenha o suingue inalterado na troca."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Acelerar nos acordes sincopados.",
        "correcao": "Use o metrônomo rigorosamente, sentindo a síncope contra o clique."
      }
    ],
    "aplicacaoMusical": "Acompanhamento padrão para repertório de Bossa Nova e MPB.",
    "criterioSaida": "Tocar 8 compassos a 70 BPM de forma relaxada, sem perder a antecipação.",
    "recuperacao": "Se embolar o ritmo, toque apenas o baixo primeiro, depois cante os acordes por cima, antes de tentar tudo junto.",
    "sessao40min": [],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-8",
    "slug": "independencia-ritmica-samba",
    "titulo": "Independência Rítmica: Baixo em 2/4 com Melodia Sincopada",
    "area": "Rítmica e Coordenação",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "samba",
      "independencia",
      "poliritmia"
    ],
    "habilidade": "Manter o pulso constante no baixo enquanto articula melodias no contratempo.",
    "metaObservavel": "Tocar uma variação rítmica onde o baixo marca o tempo e a melodia ocorre apenas nas colcheias fracas.",
    "prerequisito": "Atividade de Bossa Nova básica consolidada.",
    "explicacao": "No Samba e no Choro, a independência entre o polegar e os outros dedos precisa ser ainda maior. O baixo age como o surdo marcando o 1 e 2 (frequentemente com acento no 2), enquanto a melodia brinca pelas semicolcheias e síncopes.",
    "fontes": [],
    "exercicio": {
      "bpmSugerido": 65,
      "bpmMinimo": 50,
      "bpmAlvo": 80,
      "compasso": "2/4",
      "contagem": "1 e 2 e",
      "dedilhacaoMD": "p marcando os tempos, i m articulando a melodia",
      "instrucoes": "O polegar (p) toca notas curtas ou longas estritamente nos cliques do metrônomo. Os dedos i/m tocam a melodia.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Melodia Estrita no Contratempo)",
          "descricao": "Baixo no tempo, nota aguda no contratempo.",
          "bpm": 50,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Am]            |                 |\nE|--------0-------0--|--------0-------0--|\nB|-------------------|-------------------|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|----0--------------|----0--------------|\nE|------------0------|------------0------|\n      p   i   p   i       p   i   p   i",
          "dica": "Não deixe o baixo engolir a nota aguda.",
          "instrucoesRodape": "As notas não devem se encavalar."
        },
        "alvo": {
          "nome": "Alvo (Melodia Sincopada Original)",
          "descricao": "Composição original didática onde a melodia antecipa os baixos.",
          "bpm": 65,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Am]            | [E7]            |\nE|--------0---0------|------------0------|\nB|----------------3--|--------3-------3--|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|----0-------0------|-------------------|\nE|-------------------|----0-------0------|\n      p   i   p   m       p   i   p   m\n      ♩   ♪   ♪   ♪       ♪   ♪   ♪   ♪",
          "dica": "Sinta o balanço da síncope na passagem do compasso.",
          "instrucoesRodape": "Mantenha a fluidez."
        },
        "variacao": {
          "nome": "Variação (Samba Rápido)",
          "descricao": "Mesmo padrão, mas com acento dinâmico no baixo do tempo 2.",
          "bpm": 85,
          "repeticoes": "8 compassos",
          "tablatura": "2/4 | 1   e   2   e   | 1   e   2   e   |\n    | [Am]            | [E7]            |\nE|--------0---0------|------------0------|\nB|----------------3--|--------3-------3--|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|----0-------0------|-------------------|\nE|-------------------|----0-------0------|\n      p       p>          p       p>",
          "dica": "Acentue o segundo tempo do compasso com o polegar.",
          "instrucoesRodape": "Típico do surdo de segunda no samba."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "O polegar começar a seguir o ritmo da melodia.",
        "correcao": "Pratique o polegar isoladamente cantando a melodia."
      }
    ],
    "aplicacaoMusical": "Base para violão solo em estilos brasileiros.",
    "criterioSaida": "Executar o alvo a 65 BPM com independência cristalina.",
    "recuperacao": "Se falhar, volte à atividade de Bossa Nova preparatória.",
    "sessao40min": [],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-9",
    "slug": "melodia-acompanhada-2-vozes",
    "titulo": "Melodia Acompanhada: Composição Original em 2 Vozes",
    "area": "Violão Solo",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "violao-solo",
      "arranjo",
      "fingerstyle",
      "contraponto"
    ],
    "habilidade": "Tocar uma peça completa em 2 vozes, distinguindo sonoramente a melodia do acompanhamento.",
    "metaObservavel": "Tocar a peça didática original de 8 compassos com equilíbrio dinâmico e legato.",
    "prerequisito": "Atividade 6 (Melodia e Acompanhamento Integrados).",
    "explicacao": "No violão clássico e fingerstyle, a ilusão de múltiplas guitarras é criada controlando a intensidade (dinâmica) de cada dedo. A melodia (nas primas) deve cantar mais alto que o arpejo de acompanhamento.",
    "fontes": [],
    "exercicio": {
      "bpmSugerido": 80,
      "bpmMinimo": 60,
      "bpmAlvo": 100,
      "compasso": "4/4",
      "contagem": "1 e 2 e 3 e 4 e",
      "dedilhacaoMD": "pimba",
      "instrucoes": "Composição Didática Original \"Rio Manso\". Melodia sustentada na 1a corda, arpejo suave nas internas.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Apenas a Melodia)",
          "descricao": "Toque apenas as notas da melodia com apoio (apoyando).",
          "bpm": 70,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [G]             | [C]             |\nE|----3---2---3---5--|----0-------0------|\nB|-------------------|--------3----------|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|-------------------|-------------------|\nE|-------------------|-------------------|",
          "dica": "Assegure o legato perfeito.",
          "instrucoesRodape": "Notas com duração de semínima."
        },
        "alvo": {
          "nome": "Alvo (Melodia + Baixo)",
          "descricao": "Adiciona os baixos no tempo 1 de cada compasso.",
          "bpm": 80,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [G]             | [C]             |\nE|----3---2---3---5--|----0-------0------|\nB|-------------------|--------3----------|\nG|-------------------|-------------------|\nD|-------------------|-------------------|\nA|-------------------|----3--------------|\nE|----3--------------|-------------------|\n      p+m i   m   i       p+m i   m",
          "dica": "O baixo dura o compasso inteiro (semibreve).",
          "instrucoesRodape": "Deixe o baixo ressoar."
        },
        "variacao": {
          "nome": "Variação (Composição Completa a 2 Vozes)",
          "descricao": "Melodia, baixo, e notas de preenchimento (arpejo interno).",
          "bpm": 80,
          "repeticoes": "8 compassos (mostrando 2 iniciais)",
          "tablatura": "4/4 | 1 e 2 e 3 e 4 e | 1 e 2 e 3 e 4 e |\n    | [G]             | [C]             |\nE|----3---2---3---5--|----0-------0------|\nB|------0-------0----|------1-3-----1----|\nG|----------0--------|----------0--------|\nD|-------------------|-------------------|\nA|-------------------|----3--------------|\nE|----3--------------|-------------------|\n      p m i m i m a       p a i m a i",
          "dica": "Destaque a nota aguda, deixe o arpejo em segundo plano sonoro (piano).",
          "instrucoesRodape": "A melodia é o foco."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Tocar todas as notas na mesma intensidade.",
        "correcao": "Use toque apoiado na melodia e toque livre nas internas."
      }
    ],
    "aplicacaoMusical": "Desenvolvimento de técnica para peças instrumentais.",
    "criterioSaida": "Executar com distinção clara de volumes entre a melodia e o acompanhamento.",
    "recuperacao": "Pratique apenas a mão direita nas cordas soltas focando na diferença de força.",
    "sessao40min": [],
    "ferramentaSugerida": "gravador"
  },
  {
    "id": "ativ-10",
    "slug": "baixo-caminhante-melodia-fixa",
    "titulo": "Baixo Caminhante com Melodia Fixa",
    "area": "Harmonia e Violão Solo",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "walking-bass",
      "contraponto",
      "independencia"
    ],
    "habilidade": "Movimentar a linha de baixo compasso a compasso ou semínima a semínima sob notas agudas estáticas.",
    "metaObservavel": "Tocar uma linha de walking bass (4 semínimas) sob um acorde fixo ou melodia sustentada no tempo 1.",
    "prerequisito": "Fluência em escalas no registro grave (cordas 6, 5 e 4).",
    "explicacao": "O \"Walking Bass\" é uma técnica oriunda do Jazz e Blues onde o baixo \"caminha\" em semínimas (1-2-3-4), desenhando a harmonia e o ritmo. O desafio mecânico no violão é manter os dedos que tocam os acordes agudos travados enquanto os outros dedos da mão esquerda realizam a caminhada do baixo.",
    "fontes": [],
    "exercicio": {
      "bpmSugerido": 70,
      "bpmMinimo": 60,
      "bpmAlvo": 90,
      "compasso": "4/4",
      "contagem": "1 2 3 4",
      "dedilhacaoMD": "p para os baixos em semínima, bloco ima para os acordes",
      "instrucoes": "Composição didática original \"Blues Escada\". O bloco toca no tempo 1 e 3. O baixo caminha nos tempos 1, 2, 3, 4.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Apenas o Baixo)",
          "descricao": "Toque a linha de baixo do Blues em E.",
          "bpm": 60,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [E7]            | [A7]            |\nE|-------------------|-------------------|\nB|-------------------|-------------------|\nG|-------------------|-------------------|\nD|-------------------|----2---4---5---4--|\nA|----2---4---5---4--|--0---0---0---0----|\nE|--0---0---0---0----|-------------------|",
          "dica": "As notas devem ser ligadas, sem buracos sonoros entre as semínimas.",
          "instrucoesRodape": "Observe as dedilhações na mão esquerda."
        },
        "alvo": {
          "nome": "Alvo (Baixo + Acorde no 1)",
          "descricao": "Sustente a terça e sétima do acorde no tempo 1.",
          "bpm": 70,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [E7]            | [A7]            |\nE|-------------------|-------------------|\nB|----3--------------|----2--------------|\nG|----1--------------|----0--------------|\nD|-------------------|----2---4---5---4--|\nA|----2---4---5---4--|--0---0---0---0----|\nE|--0---0---0---0----|-------------------|",
          "dica": "Não levante os dedos do acorde agudo enquanto o baixo caminha.",
          "instrucoesRodape": "Independência da mão esquerda é a chave."
        },
        "variacao": {
          "nome": "Variação (Síncope no Acorde)",
          "descricao": "O acorde entra no tempo 2 (ou no contra-tempo do 1).",
          "bpm": 80,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [E7]            | [A7]            |\nE|-------------------|-------------------|\nB|--------3----------|--------2----------|\nG|--------1----------|--------0----------|\nD|-------------------|----2---4---5---4--|\nA|----2---4---5---4--|--0---0---0---0----|\nE|--0---0---0---0----|-------------------|",
          "dica": "Preste atenção para que o baixo não sofra oscilação rítmica quando o acorde é tocado.",
          "instrucoesRodape": "Mantenha a caminhada inexorável."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Parar o baixo quando a mão se atrapalha no acorde.",
        "correcao": "Priorize o baixo sempre. Erre o acorde, mas não o baixo."
      }
    ],
    "aplicacaoMusical": "Base para Blues, Jazz, e Bossa Nova complexa.",
    "criterioSaida": "Fluidez e continuidade ininterrupta do baixo a 70 BPM.",
    "recuperacao": "Isole a linha do baixo até poder tocá-la de olhos fechados.",
    "sessao40min": [],
    "ferramentaSugerida": "metronomo"
  },
  {
    "id": "ativ-11",
    "slug": "voice-leading-basico",
    "titulo": "Voice Leading Básico: Condução de Vozes entre I-IV-V",
    "area": "Harmonia Avançada",
    "nivelDificuldade": "Intermediário",
    "statusProntidao": "em_revisao",
    "tags": [
      "voice-leading",
      "conducao-de-vozes",
      "triades",
      "inversoes"
    ],
    "habilidade": "Conectar acordes movendo cada nota (voz) para a nota mais próxima do próximo acorde.",
    "metaObservavel": "Tocar uma cadência I-IV-V-I nas três primeiras cordas movendo os dedos no máximo um tom em cada troca.",
    "prerequisito": "Atividade 5 (Montagem de Tríades) consolidada.",
    "explicacao": "\"Voice Leading\" (condução de vozes) é o princípio de encadear acordes com o mínimo de movimento possível. Em vez de saltar pelo braço inteiro, usamos inversões das tríades para que as notas comuns sejam mantidas e as outras se movam por grau conjunto (semitom ou tom), gerando uma harmonia densa, fluida e orquestral.",
    "fontes": [],
    "exercicio": {
      "bpmSugerido": 60,
      "bpmMinimo": 50,
      "bpmAlvo": 70,
      "compasso": "4/4",
      "contagem": "1 2 3 4",
      "dedilhacaoMD": "Arpejos suaves ou plaqué (bloco)",
      "instrucoes": "Cadência C - F - G - C nas cordas 1, 2, e 3. Observe como cada voz se move pouco.",
      "niveis": {
        "preparacao": {
          "nome": "Preparação (Estudo das Posições Isoladas)",
          "descricao": "Monte as três tríades nas primas: C (estado fundamental), F (2a inversão), G (1a inversão).",
          "bpm": 50,
          "repeticoes": "4 ciclos",
          "tablatura": "    [C (T-3-5)]       [F (5-T-3)]       [G (3-5-T)]\nE|---0---------------|---1-------------|---3-------------|\nB|---1---------------|---1-------------|---3-------------|\nG|---0---------------|---2-------------|---4-------------|",
          "dica": "Observe que o dedo 1 fica plantado na corda 2 (nota Dó) ao passar do C para o F.",
          "instrucoesRodape": "Notas comuns são âncoras."
        },
        "alvo": {
          "nome": "Alvo (Cadência Contínua I-IV-I-V-I)",
          "descricao": "Toque as tríades em semínimas, prestando atenção no som das linhas internas.",
          "bpm": 60,
          "repeticoes": "8 compassos",
          "tablatura": "4/4 | 1   2   3   4   | 1   2   3   4   |\n    | [C]     [F]     | [G]     [C]     |\nE|----0-------1------|----3-------0------|\nB|----1-------1------|----3-------1------|\nG|----0-------2------|----4-------0------|\nD|-------------------|-------------------|\nA|-------------------|-------------------|\nE|-------------------|-------------------|",
          "dica": "Faça os movimentos deslizarem suavemente.",
          "instrucoesRodape": "Som legato."
        },
        "variacao": {
          "nome": "Variação (Arpejo Contrapontístico)",
          "descricao": "Composição didática \"Coral em Dó\", arpejando o voice leading.",
          "bpm": 70,
          "repeticoes": "4 compassos",
          "tablatura": "4/4 | 1 e 2 e 3 e 4 e | 1 e 2 e 3 e 4 e |\n    | [C]     [F]     | [G]     [C]     |\nE|--------0-------1--|--------3-------0--|\nB|------1-------1----|------3-------1----|\nG|----0-------2------|----4-------0------|\nD|-------------------|-------------------|\nA|-------------------|-------------------|\nE|-------------------|-------------------|",
          "dica": "Deixe as cordas soarem umas sobre as outras.",
          "instrucoesRodape": "Evite abafar acidentalmente."
        }
      }
    },
    "errosComuns": [
      {
        "erro": "Saltar para a posição de acorde fundamental básica em vez de usar as inversões.",
        "correcao": "Siga rigorosamente a tablatura."
      }
    ],
    "aplicacaoMusical": "Arranjos elaborados, Chord Melody e harmonia para violão.",
    "criterioSaida": "Movimentação fluida sem ruído excessivo dos dedos deslizando.",
    "recuperacao": "Pratique a transição de um par de acordes (ex: C para F) repetidamente sem a mão direita.",
    "sessao40min": [],
    "ferramentaSugerida": "metronomo"
  }

];
