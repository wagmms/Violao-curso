---
name: Studio Acústico
colors:
  surface: '#151312'
  surface-dim: '#151312'
  surface-bright: '#3b3937'
  surface-container-lowest: '#100e0d'
  surface-container-low: '#1d1b1a'
  surface-container: '#211f1e'
  surface-container-high: '#2c2928'
  surface-container-highest: '#373433'
  on-surface: '#e7e1df'
  on-surface-variant: '#dbc1b4'
  inverse-surface: '#e7e1df'
  inverse-on-surface: '#32302f'
  outline: '#a38c80'
  outline-variant: '#554339'
  surface-tint: '#ffb68c'
  primary: '#ffb68c'
  on-primary: '#532200'
  primary-container: '#d97736'
  on-primary-container: '#491d00'
  inverse-primary: '#994703'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#d5c3b7'
  on-tertiary: '#392e26'
  tertiary-container: '#9e8e83'
  on-tertiary-container: '#332820'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68c'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#753400'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#f2dfd2'
  tertiary-fixed-dim: '#d5c3b7'
  on-tertiary-fixed: '#231a12'
  on-tertiary-fixed-variant: '#51443b'
  background: '#151312'
  on-background: '#e7e1df'
  surface-variant: '#373433'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes an intimate, focused environment tailored for guitar mastery and acoustic music pedagogy. It translates the organic resonance of solid tone-woods—spruce, cedar, rosewood, and aged mahogany—into a digital studio space that minimizes visual noise while sustaining deep artistic concentration.

### Emotional Architecture & Persona
- **Atmospheric Resonance:** Deep, warm, low-reflection surfaces evoke a private, sound-treated acoustic suite lit by soft amber incandescent lamps.
- **Pedagogical Precision:** Clear chord fingerings, fretboards, tablatures, and audio controls prioritize legibility and ergonomic muscle memory over decorative clutter.
- **Understated Craft:** Subtle micro-accents reminiscent of polished bronze strings, fret markers, and harmonic divisions replace generic digital motifs.

### Design Movement
A contemporary fusion of **Modern Acoustic Warmth** and **Refined Editorial Craft**:
- Dark organic graphite foundations provide high dynamic range for musical charts and fretboard diagrams.
- Low-contrast hairline dividers echo the tension of acoustic guitar strings (0.5px to 1px linear gradients).
- Flat, tactile surfaces with warm, translucent amber-caramel borders eliminate harsh contrast and heavy drop shadows.

## Colors

The color palette centers on warm, acoustic-inspired tones that reproduce the tactile richness of classical and folk lutherie, calibrated specifically to reduce eye fatigue during extended practice sessions.

### Core Swatches
- **Primary (`#d97736`):** Warm resonant amber. Used for active fretboard markers, primary playback actions, key chord roots, and practice milestones.
- **Secondary (`#f59e0b`):** Golden maple accent. Applied to metronome pulses, highlight badges, pitch accuracy indicators, and audio progress markers.
- **Tertiary (`#4a3e35`):** Smoked brass and walnut undertone. Used for structural fretboard wirelines, borders on interactive modules, and secondary card strokes.
- **Neutral Canvas (`#121110` to `#161413`):** Warm dark graphite base, preventing the stark eye-strain of pure `#000000` while isolating notation and tablature.

### Extended Tonal Hierarchy
- **Canvas Base:** `#121110` (Master view backdrop).
- **Surface Elevation 1 (Cards, panels):** `#1c1a18`.
- **Surface Elevation 2 (Elevated modules, popovers):** `#23201d`.
- **Surface Elevation 3 (Active states, practice overlays):** `#2b2723`.
- **Subtle Stroke & Border:** `#3a332c` (standard) and `#4a3e35` (hover/focus).
- **Text Primary (Marfim):** `#f5f2eb` (96% contrast on dark graphite).
- **Text Secondary (Cinza Areia Suave):** `#a8a29e` (clear notation labels, metadata, finger numbering).
- **Text Tertiary / Muted:** `#736d67` (inactive fret wires, disabled measures, subtle musical staves).
- **Feedback & Tuning States:**
  - *In-Tune / Resolved:* `#22c55e`
  - *Sharp / Amber:* `#f59e0b`
  - *Flat / Red Ochre:* `#ef4444`

## Typography

Typography strikes an intentional equilibrium between warm, artisanal character and clinical pedagogical clarity:

- **Headlines (`Epilogue`):** Delivers structural gravitas and rhythmic weight. Its geometric baseline with organic proportions evokes classical guitar monographs and modern studio identity.
- **Body & Controls (`Plus Jakarta Sans`):** Warm grotesque terminals provide fatigue-free readability for fingering guides, chord notes, exercise routines, and theory descriptions.
- **Musical Precision Usage:**
  - Chord symbols (e.g., `Cmaj7(#11)`, `Dm9`) employ `Plus Jakarta Sans` semi-bold with non-proportional tabular numbers where harmonic clarity is vital.
  - Fingerings (P, I, M, A, and fret numbers 1–4) render in uppercase `label-sm` with slight positive tracking (+0.06em) inside fret markers.

## Layout & Spacing

The layout is grounded in a stable 12-column adaptive grid on desktop and tablet, shifting to a single-column flow on mobile. Layout rhythm follows multiples of 4px and 8px, mirroring rhythmic musical meter (4/4 time signature).

### Grid Structure & Adaptation
- **Desktop (1024px+):** 12 columns, 20px (`1.25rem`) gutters, max-width container capped at 1320px to maintain natural eye span during score and tablature reading.
- **Tablet (768px - 1023px):** 8 columns, 16px (`1rem`) gutters, 24px (`1.5rem`) margin. Fretboard diagrams and video tutorials reflow from side-by-side to stacked panels.
- **Mobile (< 768px):** 4 columns (or single stack), 12px (`0.75rem`) gutters, 16px (`1rem`) canvas margin. Chord blocks display in horizontal scroll ribbons; fretboards switch to vertical or zoomable neck views.

### Architectural Rhythms
- Tablature line heights and fret spacing are locked to standardized increments using `space-sm` (8px) and `space-md` (16px) to maintain proportional distance between strings.
- Practice modules and audio player footers retain persistent anchor positions with fixed safe areas.

## Elevation & Depth

Visual hierarchy does not rely on harsh drops or synthetic multi-layer drop shadows. Depth is achieved via **tonal stacking** paired with **warm hairline boundary strokes**:

- **Ground (Canvas):** Base graphite (`#121110`). Unraised, non-interactive foundation.
- **Level 1 (Structural Cards & Practice Tracks):** Fill `#1c1a18`, bordered by a subtle 1px translucent border (`#3a332c`).
- **Level 2 (Active Workspaces, Fretboards, Tuner Consoles):** Fill `#23201d`, bordered by `#4a3e35`. Accompanied by a diffused amber ambient wash: `box-shadow: 0 12px 32px -8px rgba(217, 119, 54, 0.08)`.
- **Level 3 (Modals, Overlays, Dropdowns):** Fill `#2b2723`, border `1px solid rgba(245, 158, 11, 0.25)`, `box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.6)`.
- **String Divider Detailing:** Section dividers use a 1px line textured as a dual-stop gradient (`transparent -> #3a332c -> #4a3e35 -> #3a332c -> transparent`), mimicking the light play across a tensioned phosphor bronze string.

## Shapes

Corner radii reference the gentle, ergonomic curves of an acoustic guitar body—neither aggressively clinical nor excessively round:

- **Base Radius (`0.5rem` / `8px`):** Used for micro-components including badges, checkboxes, fret marker pips, and metronome tick buttons.
- **Container Radius (`1rem` / `16px` - `rounded-lg`):** Standard for chord diagrams, lesson cards, modal windows, practice modules, and playback decks.
- **Focus Rings & Micro-Indicators:** Inner target rings (such as root finger dots on the fretboard) retain perfect circular geometry (`border-radius: 9999px`).

## Components

### Buttons
- **Primary (Action/Play):** Background `#d97736`, text `#f5f2eb`, border `1px solid #e68a48`, radius `12px` (`0.75rem`). Hover scales luminosity to `#e68a48` with a subtle amber glow (`0 0 16px rgba(217, 119, 54, 0.25)`).
- **Secondary (Exercise variations):** Background `#23201d`, text `#f5f2eb`, border `1px solid #3a332c`. Hover shifts border to `#4a3e35` and background to `#2b2723`.
- **Ghost (Transport controls, looping):** Background transparent, text `#a8a29e`. Hover text `#f5f2eb` with subtle icon tint in `#f59e0b`.

### Cards & Lesson Modules
- Constructed on `#1c1a18` with a 1px perimeter in `#3a332c` and `rounded-lg` (16px) corners.
- Lesson modules feature a discreet upper border accent: a 1px gradient running from `#d97736` (left) fading into `#3a332c` (center-right).

### Badges & Chips
- **Harmonic Badges (Triad, Arpeggio, Pentatonic):** Background `rgba(217, 119, 54, 0.12)`, text `#f59e0b`, border `1px solid rgba(217, 119, 54, 0.28)`, padding `4px 10px`, radius `6px`.
- **BPM / Key Chips:** Background `#161413`, text `#a8a29e`, border `1px solid #3a332c`, tabular numerals for flicker-free real-time tempo changes.

### Form Inputs & Knobs
- **Sliders & Inputs (BPM, Pitch, Loop Interval):** Background `#161413`, border `1px solid #3a332c`, text `#f5f2eb`.
- **Focused State:** Border transitions to `#d97736` without external browser outline; subtle inset glow `0 0 0 1px #d97736`.
- **Checkboxes & Radios:** Solid rounded squares (4px radius) in `#23201d` with `#3a332c` borders. Checked state fills with `#d97736` carrying an ivory (`#f5f2eb`) checkmark.

### Domain-Specific Components
- **Interactive Fretboard Neck:** Dark rosewood background (`#161413`), horizontal fret dividers rendered with crisp 1px `#3a332c`. Strings vary in weight (0.5px for treble E to 2px for bass E) in `#736d67`. Root notes appear in filled `#d97736` with ivory text; triad inversions appear in `#f59e0b` outlines.
- **Audio Scrubber & Loop Range:** Background track `#23201d`, active selection segment highlighted in translucent amber (`rgba(217, 119, 54, 0.25)`) capped with brass pin handles (`#e68a48`).
- **Metronome / Pulse Bar:** Rhythmic beat dots in `#3a332c` that illuminate to `#f59e0b` on downbeats with a soft radial falloff.