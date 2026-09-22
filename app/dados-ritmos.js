/**
 * Padrões Rítmicos para o AudioMotor (Bossa Nova, Samba, Baião, etc.)
 * Estrutura:
 *  - nome: Nome amigável do ritmo
 *  - steps: Total de passos no grid rítmico
 *  - stepBeatLength: Duração de cada passo em relação a 1 batida (ex: 0.25 para semicolcheia)
 *  - surdo, tamborim, vassourinha: Arrays com acentuação/dinâmica (0.0 a 1.0) para cada passo
 */

(function(global) {
  'use strict';

  const PADROES_RITMICOS = {
    'bossa': {
      nome: 'Bossa Nova (2/4)',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0, 0.7, 0, 0, 0, 1, 0, 0, 0, 0.7, 0, 0, 0],
      tamborim:    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      vassourinha: [0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3, 0.6, 0.3]
    },
    'samba': {
      nome: 'Samba / Partido Alto',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      tamborim:    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0],
      vassourinha: [0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0, 0.8, 0, 0.4, 0]
    },
    'baiao': {
      nome: 'Baião / Forró',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0.5, 0, 0, 1, 0, 1, 0, 0, 0.5, 0, 0, 1, 0],
      tamborim:    [0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0, 0.5, 0, 0.8, 0],
      vassourinha: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
    },
    'dedilhado68': {
      nome: 'Dedilhado 6/8',
      steps: 12,
      stepBeatLength: 0.5,
      surdo:       [1, 0, 0, 0.7, 0, 0, 1, 0, 0, 0.7, 0, 0],
      tamborim:    [0, 0, 0.6, 0, 0, 0.6, 0, 0, 0.6, 0, 0, 0.6],
      vassourinha: [0.8, 0.4, 0.4, 0.8, 0.4, 0.4, 0.8, 0.4, 0.4, 0.8, 0.4, 0.4]
    },
    'baden': {
      nome: 'Baden Powell (Afro-Samba)',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0.4, 0.9, 0, 0, 0.3, 1, 0, 0, 0.4, 0.9, 0, 0, 0.3],
      tamborim:    [0.9, 0, 0.6, 0.9, 0, 0.8, 0.9, 0, 0.9, 0, 0.6, 0.9, 0, 0.8, 0.9, 0],
      vassourinha: [0.7, 0.3, 0.5, 0.3, 0.7, 0.3, 0.5, 0.3, 0.7, 0.3, 0.5, 0.3, 0.7, 0.3, 0.5, 0.3]
    },
    'choro': {
      nome: 'Choro Tradicional (2/4)',
      steps: 16,
      stepBeatLength: 0.25,
      surdo:       [1, 0, 0, 0, 0.6, 0, 0, 0, 1, 0, 0, 0, 0.6, 0, 0, 0],
      tamborim:    [0.7, 0.3, 0.7, 0.4, 0.8, 0.3, 0.6, 0.4, 0.7, 0.3, 0.7, 0.4, 0.8, 0.3, 0.6, 0.4],
      vassourinha: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    }
  };

  if (typeof global !== 'undefined') {
    global.PADROES_RITMICOS = PADROES_RITMICOS;
  }
  if (typeof window !== 'undefined') {
    window.PADROES_RITMICOS = PADROES_RITMICOS;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PADROES_RITMICOS;
  }
})(typeof window !== 'undefined' ? window : globalThis);
