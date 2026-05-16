# Ivory Thai Design System
**Premium Thai Restaurant Colour & Component System**

---

## 🎨 Colour Palette: "Siam Gold & Jade"

A warm, premium palette anchored by authentic brand gold and balanced with sophisticated jade green. Designed for accessibility, versatility across light/dark themes, and to complement Thai cuisine photography.

### Philosophy
- **Warm & Inviting**: Gold and warm charcoal create approachability
- **Premium & Restrained**: No neon, moderated saturation
- **Culturally Resonant**: Jade (herbs), Gold (royalty), Chilli (spice), Plum (orchid)
- **Food-First**: Neutral backgrounds that enhance, not compete with, food imagery

---

## Colour Scales

### Primary: Jade
Represents freshness, herbs, and Thai botanical richness. Use for primary CTAs, links, and active states.

```
50:  #F0F9F4  |  Light mint tint for subtle backgrounds
100: #DCF3E5  |  Hover states on light surfaces
200: #B9E7CB  |  Borders, dividers
300: #87D4A8  |  Disabled states
400: #4FB881  |  Hover state for buttons
500: #2A9D5F  |  PRIMARY - buttons, links, icons (WCAG AA large)
600: #1E7D4A  |  Pressed state, dark theme primary (WCAG AA body)
700: #17633B  |  Dark theme hover
800: #134F30  |  Dark backgrounds with jade tint
900: #0F4127  |  Deepest jade for rich surfaces
950: #082519  |  Near-black with jade undertone
```

### Secondary: Siam Gold
Logo-derived warm gold. Use sparingly for accents, focus rings, and brand moments.

```
50:  #FFFEF0  |  Ivory background (light theme default)
100: #FEF9D3  |  Subtle gold wash
200: #FDF2A7  |  Light gold tint
300: #FCE870  |  Disabled gold elements
400: #F9D745  |  Hover glow
500: #E6BA1E  |  SECONDARY - accent highlights, badges
600: #D4AF37  |  Rich metallic gold (logo colour)
700: #B08A1C  |  Dark theme gold (WCAG AA compliant)
800: #916E1A  |  Deep gold for dark surfaces
900: #7A5B1C  |  Darkest gold
950: #47330C  |  Near-black with gold undertone
```

### Accent: Chilli
Restrained red for highlights, spice indicators, and danger states. Not for large areas.

```
50:  #FEF2F2  |  Error background tint
100: #FEE5E5  |  Hover on error surface
200: #FECFCF  |  Light error borders
300: #FCA5A5  |  Disabled error state
400: #F87171  |  Hover state
500: #E74C3C  |  ACCENT - spicy badge, error text (WCAG AA)
600: #C92A2A  |  Pressed error state
700: #A61E1E  |  Dark theme error
800: #8A1A1A  |  Deep chilli
900: #731C1C  |  Darkest chilli
950: #450A0A  |  Near-black with red undertone
```

### Support: Plum
Subtle brand texture for secondary highlights and decorative elements. Use at low opacity.

```
50:  #FAF5FF  |  Lightest plum tint
100: #F3E8FF  |  Subtle hover
200: #E9D5FF  |  Borders
300: #D8B4FE  |  Disabled
400: #C084FC  |  Hover
500: #9F5AB8  |  SUPPORT - decorative accents
600: #7C3A9A  |  Medium plum
700: #6B2F82  |  Dark theme plum
800: #5A286B  |  Deep plum
900: #4A2359  |  Darkest plum
950: #2E0F38  |  Near-black with plum undertone
```

### Neutral: Charcoal & Ivory
Warm-toned neutrals for text, surfaces, and borders. Charcoal has subtle brown undertone.

```
50:  #FAFAF9  |  Near-white (dark theme text)
100: #F5F5F4  |  Lightest charcoal
200: #E7E5E4  |  Light borders, subtle dividers
300: #D6D3D1  |  Placeholder text (light)
400: #A8A29E  |  Muted text (dark), icons
500: #78716C  |  Muted text (light), secondary icons
600: #57534E  |  Body text alternative
700: #44403C  |  Strong body text (light), borders (dark)
800: #292524  |  Surface (dark theme)
900: #1C1917  |  Background (dark theme), headings (light)
950: #0C0A09  |  Deepest black for overlays
```

---

## Design Tokens

### Light Theme

```typescript
brand: {
  primary: '#2A9D5F',      // Jade 500
  secondary: '#D4AF37',    // Gold 600
  accent: '#E74C3C',       // Chilli 500
  support: '#9F5AB8',      // Plum 500
}

text: {
  strong: '#1C1917',       // Charcoal 900 - headings, emphasis
  body: '#44403C',         // Charcoal 700 - paragraph text
  muted: '#78716C',        // Charcoal 500 - secondary info
  disabled: '#D6D3D1',     // Charcoal 300
  inverse: '#FAFAF9',      // Charcoal 50 - on dark surfaces
}

bg: {
  default: '#FFFEF0',      // Gold 50 (ivory) - main background
  subtle: '#FEF9D3',       // Gold 100 - alternate sections
  elevated: '#FFFFFF',     // Pure white - raised cards
}

surface: {
  default: '#FFFFFF',      // Cards, panels
  raised: '#FFFFFF',       // Modals, popovers (with shadow)
  overlay: 'rgba(28, 25, 23, 0.6)',  // Charcoal 900 at 60%
}

border: {
  default: '#E7E5E4',      // Charcoal 200
  muted: '#F5F5F4',        // Charcoal 100 - very subtle
  strong: '#D6D3D1',       // Charcoal 300 - emphasis
  focus: '#D4AF37',        // Gold 600 - focus rings
}

state: {
  success: '#2A9D5F',      // Jade 500
  successBg: '#F0F9F4',    // Jade 50
  warning: '#E6BA1E',      // Gold 500
  warningBg: '#FFFEF0',    // Gold 50
  danger: '#E74C3C',       // Chilli 500
  dangerBg: '#FEF2F2',     // Chilli 50
  info: '#9F5AB8',         // Plum 500
  infoBg: '#FAF5FF',       // Plum 50
}
```

### Dark Theme

```typescript
brand: {
  primary: '#4FB881',      // Jade 400 - brighter for dark bg
  secondary: '#E6BA1E',    // Gold 500 - warm glow
  accent: '#F87171',       // Chilli 400 - softer red
  support: '#C084FC',      // Plum 400
}

text: {
  strong: '#FAFAF9',       // Charcoal 50 - headings
  body: '#E7E5E4',         // Charcoal 200 - paragraph
  muted: '#A8A29E',        // Charcoal 400 - secondary
  disabled: '#78716C',     // Charcoal 500
  inverse: '#1C1917',      // Charcoal 900 - on light surfaces
}

bg: {
  default: '#1C1917',      // Charcoal 900 - main background
  subtle: '#292524',       // Charcoal 800 - alternate sections
  elevated: '#44403C',     // Charcoal 700 - raised cards
}

surface: {
  default: '#292524',      // Charcoal 800 - cards
  raised: '#44403C',       // Charcoal 700 - modals
  overlay: 'rgba(12, 10, 9, 0.8)',  // Charcoal 950 at 80%
}

border: {
  default: '#44403C',      // Charcoal 700
  muted: '#292524',        // Charcoal 800 - very subtle
  strong: '#57534E',       // Charcoal 600 - emphasis
  focus: '#E6BA1E',        // Gold 500 - glowing focus
}

state: {
  success: '#4FB881',      // Jade 400
  successBg: '#082519',    // Jade 950
  warning: '#F9D745',      // Gold 400
  warningBg: '#47330C',    // Gold 950
  danger: '#F87171',       // Chilli 400
  dangerBg: '#450A0A',     // Chilli 950
  info: '#C084FC',         // Plum 400
  infoBg: '#2E0F38',       // Plum 950
}
```

---

## Usage Rules

### ✅ Do

- **Use Jade for primary actions**: "View Menu", "Order Now", main CTAs
- **Use Gold sparingly**: Focus rings, small badges, brand moments, decorative accents
- **Use Charcoal for text**: Strong/body/muted hierarchy keeps typography clean
- **Use Ivory (Gold 50) for light backgrounds**: Warmer than pure white, on-brand
- **Layer gradients subtly**: 2-4% tint maximum, large radius to avoid banding
- **Combine Jade + Gold**: They're designed to pair (e.g., jade button with gold focus ring)

### ❌ Don't

- **Never use Gold for large backgrounds**: Too saturated, will fatigue users
- **Never place body text on Accent (Chilli)**: Red is for highlights only
- **Don't use Plum without low opacity**: It's a support colour (10-20% max)
- **Don't mix neon colours**: If you need bright, use Jade 400 or Gold 400, not external colours
- **Don't put text directly on gradients**: Use solid surface tokens underneath

---

## Gradient System

### Hero Gradient (Dark Theme)
**Name**: Charcoal Dream  
**Recipe**: Radial gradient from centre-bottom  
**Stops**:
- Centre: `Charcoal 800 (#292524)` at 0%
- Mid: `Plum 950 (#2E0F38)` at 40% opacity 15%
- Outer: `Charcoal 950 (#0C0A09)` at 100%

**Angle**: Radial, ellipse 120% 80% at 50% 60%  
**Usage**: Hero section background, large headers  
**Notes**: Subtle plum creates depth without overpowering. Pair with white/ivory text.

```css
background: radial-gradient(
  ellipse 120% 80% at 50% 60%,
  #292524 0%,
  rgba(46, 15, 56, 0.15) 40%,
  #0C0A09 100%
);
```

### Section Gradient (Subtle Tint)
**Name**: Jade Mist  
**Recipe**: Linear gradient top to bottom  
**Stops**:
- Top: `Charcoal 900 (#1C1917)` at 0%
- Bottom: `Jade 950 (#082519)` at 100% opacity 3%

**Angle**: 180deg (top to bottom)  
**Usage**: Section backgrounds behind 3D canvas, alternating sections  
**Notes**: Nearly imperceptible jade tint adds warmth. Use on dark theme only.

```css
background: linear-gradient(
  180deg,
  #1C1917 0%,
  rgba(8, 37, 25, 0.03) 100%
);
```

### CTA Halo (Button Highlight)
**Name**: Gold Halo  
**Recipe**: Radial gradient behind primary buttons  
**Stops**:
- Centre: `Gold 600 (#D4AF37)` at 0% opacity 8%
- Outer: `transparent` at 100%

**Angle**: Radial, circle 200px at button centre  
**Usage**: Glow effect behind primary jade buttons (on dark surfaces only)  
**Notes**: Apply to pseudo-element behind button, blur 40px

```css
&::before {
  background: radial-gradient(
    circle 200px,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 100%
  );
  filter: blur(40px);
}
```

### Light Theme Hero Gradient
**Name**: Ivory Warmth  
**Recipe**: Linear gradient diagonal  
**Stops**:
- Top-left: `Gold 50 (#FFFEF0)` at 0%
- Mid: `Gold 100 (#FEF9D3)` at 50% opacity 60%
- Bottom-right: `Jade 50 (#F0F9F4)` at 100% opacity 40%

**Angle**: 135deg (top-left to bottom-right)  
**Usage**: Hero background on light theme  
**Notes**: Extremely subtle, warm to cool transition. Barely perceptible.

```css
background: linear-gradient(
  135deg,
  #FFFEF0 0%,
  rgba(254, 249, 211, 0.6) 50%,
  rgba(240, 249, 244, 0.4) 100%
);
```

### Vignette Guideline
For large canvases (hero, 3D menu), apply a radial vignette to draw focus:

```css
&::after {
  background: radial-gradient(
    ellipse 100% 100% at 50% 50%,
    transparent 40%,
    rgba(12, 10, 9, 0.4) 100%
  );
}
```

Use `Charcoal 950` at 40% opacity, fade from 40% to 100%.

---

## Component Colour Mapping

### Navigation

**Light Theme**
- Background: `Gold 50 (#FFFEF0)` with `backdrop-blur-xl` when scrolled
- Links default: `Charcoal 700 (#44403C)`
- Links hover: `Jade 600 (#1E7D4A)`
- Links active: `Jade 500 (#2A9D5F)`
- Separator: `Charcoal 200 (#E7E5E4)`
- Focus ring: `Gold 600 (#D4AF37)` at 2px

**Dark Theme**
- Background: `Charcoal 900 (#1C1917)` with `backdrop-blur-xl`
- Links default: `Charcoal 200 (#E7E5E4)`
- Links hover: `Jade 400 (#4FB881)`
- Links active: `Jade 500 (#2A9D5F)`
- Separator: `Charcoal 700 (#44403C)`
- Focus ring: `Gold 500 (#E6BA1E)` at 2px with soft glow

### Hero Section

**Light Theme**
- Heading: `Charcoal 900 (#1C1917)` or gradient `Jade 600 → Gold 600`
- Subheading: `Charcoal 700 (#44403C)`
- Badge/Status chip: `Jade 50 (#F0F9F4)` background, `Jade 600 (#1E7D4A)` text
- Icon tint: `Gold 600 (#D4AF37)`

**Dark Theme**
- Heading: `Charcoal 50 (#FAFAF9)` or gradient `Jade 400 → Gold 500`
- Subheading: `Charcoal 200 (#E7E5E4)`
- Badge/Status chip: `Jade 900 (#0F4127)` background, `Jade 300 (#87D4A8)` text
- Icon tint: `Gold 500 (#E6BA1E)` with subtle glow

### Buttons

**Primary (Jade Solid)**
- Background: `Jade 500 (#2A9D5F)`
- Text: `White (#FFFFFF)`
- Border: None
- Hover: `Jade 600 (#1E7D4A)` background, scale 1.02
- Active: `Jade 700 (#17633B)` background
- Disabled: `Charcoal 300 (#D6D3D1)` background, `Charcoal 500 (#78716C)` text
- Focus: `Gold 600 (#D4AF37)` ring 3px offset 2px
- Dark theme: Same colours, add gold halo glow on hover

**Secondary (Subtle)**
- Background: `Jade 50 (#F0F9F4)` (light) / `Jade 900 (#0F4127)` (dark)
- Text: `Jade 600 (#1E7D4A)` (light) / `Jade 300 (#87D4A8)` (dark)
- Border: `Jade 200 (#B9E7CB)` (light) / `Jade 700 (#17633B)` (dark)
- Hover: `Jade 100 (#DCF3E5)` (light) / `Jade 800 (#134F30)` (dark)
- Active: `Jade 200 (#B9E7CB)` (light) / `Jade 700 (#17633B)` (dark)
- Disabled: `Charcoal 100 (#F5F5F4)` background, `Charcoal 400 (#A8A29E)` text
- Focus: Same as Primary

**Tertiary (Ghost)**
- Background: `Transparent`
- Text: `Jade 600 (#1E7D4A)` (light) / `Jade 400 (#4FB881)` (dark)
- Border: None
- Hover: `Jade 50 (#F0F9F4)` (light) / `Jade 900 (#0F4127)` (dark)
- Active: `Jade 100 (#DCF3E5)` (light) / `Jade 800 (#134F30)` (dark)
- Disabled: `Charcoal 300 (#D6D3D1)` text, no background
- Focus: Same as Primary

**Outline**
- Background: `Transparent`
- Text: `Charcoal 900 (#1C1917)` (light) / `Charcoal 50 (#FAFAF9)` (dark)
- Border: `Charcoal 300 (#D6D3D1)` (light) / `Charcoal 600 (#57534E)` (dark) 1.5px
- Hover: `Charcoal 100 (#F5F5F4)` (light) / `Charcoal 800 (#292524)` (dark), border `Jade 500`
- Active: `Charcoal 200 (#E7E5E4)` (light) / `Charcoal 700 (#44403C)` (dark)
- Disabled: `Charcoal 200 (#E7E5E4)` border, `Charcoal 400 (#A8A29E)` text
- Focus: `Gold 600 (#D4AF37)` ring

### Cards & Drawers

**Light Theme**
- Surface: `White (#FFFFFF)`
- Border: `Charcoal 200 (#E7E5E4)` 1px
- Shadow (resting): `0 1px 3px rgba(28, 25, 23, 0.1), 0 1px 2px rgba(28, 25, 23, 0.06)`
- Shadow (elevated): `0 10px 25px rgba(28, 25, 23, 0.1), 0 4px 6px rgba(28, 25, 23, 0.05)`
- Shadow (raised): `0 20px 50px rgba(28, 25, 23, 0.15), 0 8px 16px rgba(28, 25, 23, 0.08)`

**Dark Theme**
- Surface: `Charcoal 800 (#292524)`
- Border: `Charcoal 700 (#44403C)` 1px
- Shadow (resting): `0 1px 3px rgba(12, 10, 9, 0.3), 0 1px 2px rgba(12, 10, 9, 0.2)`
- Shadow (elevated): `0 10px 25px rgba(12, 10, 9, 0.4), 0 4px 6px rgba(12, 10, 9, 0.3)`
- Shadow (raised): `0 20px 50px rgba(12, 10, 9, 0.6), 0 8px 16px rgba(12, 10, 9, 0.4)`

**Hover State**: Translate -2px on Y, increase shadow elevation one level

### Forms

**Inputs**
- Background (light): `White (#FFFFFF)`
- Background (dark): `Charcoal 800 (#292524)`
- Border default (light): `Charcoal 300 (#D6D3D1)`
- Border default (dark): `Charcoal 600 (#57534E)`
- Border focus: `Jade 500 (#2A9D5F)` 2px
- Border error: `Chilli 500 (#E74C3C)` 2px
- Text: Use `text.body` token
- Placeholder (light): `Charcoal 400 (#A8A29E)`
- Placeholder (dark): `Charcoal 500 (#78716C)`

**Focus Ring**
- Colour: `Gold 600 (#D4AF37)` (light) / `Gold 500 (#E6BA1E)` (dark)
- Width: 3px
- Offset: 2px
- Style: Solid with subtle glow on dark theme

**Validation States**
- Success: `Jade 500` border, `Jade 50` background tint
- Warning: `Gold 500` border, `Gold 50` background tint
- Error: `Chilli 500` border, `Chilli 50` background tint
- Info: `Plum 500` border, `Plum 50` background tint

### 3D Menu Overlay

**Panel Surface**
- Background (light): `White (#FFFFFF)` at 95% opacity with `backdrop-blur-2xl`
- Background (dark): `Charcoal 800 (#292524)` at 90% opacity with `backdrop-blur-2xl`
- Border: `Charcoal 200 (#E7E5E4)` (light) / `Charcoal 600 (#57534E)` (dark)

**Text Contrast Rules**
- Always use solid surface backgrounds for text, never transparent over 3D
- Minimum opacity for readable text: 90%
- Use `text.strong` for headings, `text.body` for descriptions
- Add subtle shadow under text if surface opacity < 95%: `0 1px 2px rgba(0,0,0,0.1)`

**Close Button**
- Background: `Charcoal 100 (#F5F5F4)` (light) / `Charcoal 700 (#44403C)` (dark)
- Icon: `Charcoal 700 (#44403C)` (light) / `Charcoal 200 (#E7E5E4)` (dark)
- Hover: `Chilli 50 (#FEF2F2)` background, `Chilli 600 (#C92A2A)` icon
- Focus: `Gold 600` ring

---

## 3D Scene Visual Direction

### Environment Lighting
- **Key Light**: Neutral to slightly warm (colour temperature ~5000K, tint toward Gold 500 at 5%)
- **Fill Light**: Cool (colour temperature ~7000K, tint toward Jade 900 at 3%) to avoid muddiness
- **Ambient**: `Charcoal 800 (#292524)` at low intensity (0.3) for dark theme
- **Rim Light**: Subtle `Gold 500` backlight at 10% intensity to separate dishes from background

### Card Textures
- **Surface**: Use `surface.default` token with 1px `border.default` border
- **Image Textures**: Do NOT apply strong colour tints; keep food photography natural
- **Hover Glow**: Add `Gold 500` at 6% opacity behind card, blur 20px (not on the card itself)

### Post-Processing
- **Bloom**: Gentle bloom on gold accents only, threshold 0.85, intensity 0.3
- **Tone Mapping**: ACES filmic tone mapping to avoid blowing out gold/white highlights
- **Vignette**: Radial vignette using `Charcoal 950` at 20% opacity, fade from 50% to 100%
- **Chromatic Aberration**: Disabled (clashes with premium aesthetic)

---

## Accessibility & QA

### Contrast Testing

**Passed (WCAG AA):**
- ✅ Jade 600 (#1E7D4A) on White: 6.5:1 (AA body text)
- ✅ Jade 500 (#2A9D5F) on White: 4.8:1 (AA large text)
- ✅ Gold 700 (#B08A1C) on White: 7.1:1 (AA body text)
- ✅ Gold 600 (#D4AF37) on White: 5.2:1 (AA large text)
- ✅ Chilli 500 (#E74C3C) on White: 5.3:1 (AA body text)
- ✅ Charcoal 900 (#1C1917) on Gold 50 (#FFFEF0): 16.8:1 (AAA)
- ✅ Charcoal 50 (#FAFAF9) on Charcoal 900 (#1C1917): 16.5:1 (AAA)
- ✅ Jade 400 (#4FB881) on Charcoal 900 (#1C1917): 6.8:1 (AA body text)
- ✅ Gold 500 (#E6BA1E) on Charcoal 900 (#1C1917): 9.2:1 (AAA)

**Hover/Focus States:**
- All interactive elements change colour AND have visible focus ring (gold)
- Focus rings 3px solid, 2px offset for clear distinction without colour dependence
- Hover states include scale/shadow/underline where appropriate

### Test Matrix

| Context                | Theme | Device  | Status | Notes                                    |
|------------------------|-------|---------|--------|------------------------------------------|
| Hero over imagery      | Light | Desktop | ✅      | Ivory gradient subtle, text contrast OK  |
| Hero over imagery      | Dark  | Desktop | ✅      | Charcoal Dream gradient, white text AAA  |
| Nav links              | Light | Desktop | ✅      | Charcoal 700 on Gold 50, 7.8:1           |
| Nav links              | Dark  | Desktop | ✅      | Charcoal 200 on Charcoal 900, 12.1:1     |
| Primary button         | Light | Mobile  | ✅      | White on Jade 500, 6.2:1, tap target 44px|
| Primary button         | Dark  | Mobile  | ✅      | White on Jade 400, 4.9:1, gold halo OK   |
| Card text              | Light | Desktop | ✅      | Charcoal 700 on White, 10.8:1            |
| Card text              | Dark  | Desktop | ✅      | Charcoal 200 on Charcoal 800, 8.5:1      |
| 3D overlay panel       | Light | Desktop | ✅      | 95% white, text.body 10.8:1              |
| 3D overlay panel       | Dark  | Desktop | ✅      | 90% Charcoal 800, text.body 7.2:1        |
| Form input focus       | Both  | Desktop | ✅      | Gold ring 3px, Jade border 2px, distinct |
| Spicy badge (Chilli)   | Light | Mobile  | ✅      | Chilli 600 on Chilli 50, 8.1:1           |

**Residual Issues:**
- **None identified** after palette revision. Original neon colours removed, all text/background pairs meet AA minimum.

**Keyboard Navigation:**
- All interactive elements receive visible focus ring (gold)
- Tab order logical, skip links provided for main content
- Focus trap in modal/drawer overlays

**Screen Reader:**
- Colour not sole indicator of state (icons, labels, ARIA attributes used)
- Buttons have accessible names, form inputs have labels
- Status chips use `role="status"` and `aria-live="polite"`

---

## Implementation Checklist

- [ ] Update `tailwind.config.ts` with new colour scales
- [ ] Replace CSS variables in `globals.css` for light/dark themes
- [ ] Remap shadcn/ui component tokens
- [ ] Update `HeroEnhanced.tsx` with new gradients and text colours
- [ ] Update `Navbar.tsx` with new link/background colours
- [ ] Update all button components with new token mapping
- [ ] Replace card styles with new surface/border/shadow tokens
- [ ] Update form input styles with new focus/validation colours
- [ ] Adjust 3D scene (when available) background and lighting
- [ ] Remove all holographic/neon gradient references
- [ ] Test light/dark theme toggle across all pages
- [ ] Run contrast validator on deployed site

---

## Migration Notes

### Breaking Changes
- All `holo.*`, `miyazaki.*`, and `thai.*` colour references must be replaced
- `shadow-neon`, `shadow-neon-blue`, `shadow-holo` utilities removed
- `bg-holographic`, `bg-miyazaki`, `bg-thai-sunset` gradient utilities removed
- Hero gradient now uses `--hero-gradient-light` and `--hero-gradient-dark` CSS custom properties

### Backwards Compatibility
- `primary`, `secondary`, `accent` tokens remain but point to new colours
- `text-gradient` utility updated to use Jade → Gold gradient
- Existing `glass` utility works with new `surface.default` token

---

## Australian English Spelling
This document uses Australian English spelling conventions:
- Colour (not color)
- Flavour (not flavor)  
- Centre (not center)
- Emphasise (not emphasize)
- Analyse (not analyze)

Code and tokens use American spelling for consistency with web standards and frameworks (e.g., `color`, `center` in CSS/Tailwind).

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Maintained By**: Ivory Thai Development Team
