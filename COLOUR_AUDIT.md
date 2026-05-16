# Colour System Audit - Ivory Thai Restaurant

## 1. Current Colour Inventory

### Primary/Secondary/Accent Colours

**Miyazaki Palette** (lines 22-31, tailwind.config.ts)
- Sky: `#87CEEB` - Used in holographic orbs
- Sunset: `#FF6B6B` - Accent highlights
- Forest: `#4ECDC4` - Teal accents
- Magic: `#C77DFF` - Purple accents
- Gold: `#FFD700` - Bright yellow gold
- Coral: `#FF8C94`
- Teal: `#00CED1`
- Lavender: `#E0B0FF`

**Thai Palette** (lines 33-39)
- Orange: `#FF6B35` - CTA backgrounds
- Gold: `#FFA500` - Accent colour
- Red: `#DC2626` - Danger/spicy indicators
- Green: `#10B981` - Success states
- Purple: `#9333EA` - Secondary highlights

**Holographic Palette** (lines 41-47) ⚠️ PROBLEM
- Pink: `#FF6EC7` - Neon, oversaturated
- Blue: `#00D9FF` - Neon, oversaturated
- Purple: `#BF40BF` - Neon, oversaturated
- Green: `#00FF87` - Neon, oversaturated
- Yellow: `#FFE700` - Neon, oversaturated

### Gradient Usage

**Hero Background** (HeroEnhanced.tsx:37)
```
bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900
```
- Dark purples and pinks with orange
- Can reduce text contrast over complex backgrounds

**Menu Page** (menu/page.tsx:31)
```
bg-gradient-to-br from-purple-950 via-black to-pink-950
```
- Very dark, acceptable contrast

**Holographic Text** (globals.css:76-83)
```
linear-gradient(45deg, #FF6EC7, #00D9FF, #BF40BF, #00FF87, #FFE700)
```
- Rainbow neon gradient - too loud, clashes with brand

**Neon Shadows** (tailwind.config.ts:97-99)
```
shadow-neon: rgba(255, 110, 53, 0.5)
shadow-neon-blue: rgba(0, 217, 255, 0.5)
shadow-holo: rgba(191, 64, 191, 0.3)
```
- Fluorescent glows not aligned with premium aesthetic

## 2. Identified Problems

### Contrast Failures
1. **Holographic gradient text** (#FF6EC7, #00D9FF, etc.) on semi-transparent backgrounds likely fails WCAG AA
2. **Hero headings** with animated gradients may have insufficient contrast at certain animation states
3. **Neon pink/blue** on dark surfaces can cause eye strain

### Visual Noise
1. **Three conflicting palettes**: Miyazaki + Thai + Holographic creates visual chaos
2. **Oversaturation**: Most accent colours at 90-100% saturation
3. **Too many accent colours**: 13+ accent hues with no clear hierarchy
4. **Neon aesthetic** conflicts with premium restaurant positioning

### Logo Clash
1. **Logo gold** (~#D4AF37) clashes with bright neon yellow (#FFE700) and orange (#FF6B35)
2. **Ivory/cream** from logo not represented in palette
3. **Circular, elegant logo** conflicts with sharp neon gradients

## 3. Brand Cues from Logo Analysis

### Sampled Colours
- **Primary Gold**: `#D4AF37` (Rich, warm metallic gold)
- **Ivory**: `#FFFEF0` (Soft, warm white)
- **Form Language**: Circular, flowing, elegant, minimalist

### Brand Personality
- Premium, not flashy
- Warm and inviting
- Traditional with contemporary touch
- Sophisticated simplicity

## 4. Recommendations

### Remove
- All holographic/neon colours (holo.pink, holo.blue, etc.)
- Miyazaki palette (not brand-aligned)
- Oversaturated gradients
- Neon shadows

### Add
- Proper neutral scales (50-950)
- Ivory/cream tones from logo
- Deep charcoal for premium dark UI
- Restrained spice-inspired accents (turmeric, chilli, jade)
- Accessibility-compliant text colours

### Redesign
- Hero gradient: subtle, warm, premium
- Button system: clear hierarchy without neon
- 3D scene lighting: warm neutral to match palette
- Component tokens for light/dark themes

---

**Next Steps**: Propose three complete palette systems with full scales and accessibility compliance.
