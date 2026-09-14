\version "2.22.0"
\header {
  title = "Brilha Brilha Estrelinha"
  subtitle = "Adaptação Autoral em 4 Compassos Regulares (Etapa 2A - v03)"
  subsubtitle = "Clave de Sol (Transposição de 1 Oitava para Violão: C4 escrito = C3 sonoro)"
  composer = "Tradicional / Adapt. Antigravity"
  tagline = ##f
}

\paper {
  #(set-paper-size "a4" 'landscape)
  ragged-last = ##f
}

guitarra = \relative c' {
  \clef "treble_8"
  \key c \major
  \time 4/4
  \tempo 4 = 60

  % Compasso 1
  c4\5-3 c4\5-3 g'4\3-0 g4\3-0 |
  % Compasso 2
  a4\3-2 a4\3-2 g2\3-0 |
  % Compasso 3
  f4\4-3 f4\4-3 e4\4-2 e4\4-2 |
  % Compasso 4
  d4\4-0 d4\4-0 c2\5-3 |
  \bar "|."
}

\score {
  \new Staff \with {
    instrumentName = "Violão"
    midiInstrument = "acoustic guitar (nylon)"
  } { \guitarra }
  \layout { }
  \midi { }
}
