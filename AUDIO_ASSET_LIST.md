# Audio Asset List - Ivory Thai Menu Enrichment
**Sound Design Kit for Interactive Menu**

---

## Overview

All audio files target **−18 LUFS** (Loudness Units relative to Full Scale) with peak levels at **−3 dB** to ensure consistent, comfortable playback across devices while avoiding distortion.

**Primary Format**: OGG (Vorbis)  
**Fallback Format**: AAC  
**Target File Size**: ≤ 120 KB per file where practical  
**Compression**: High-quality variable bitrate (VBR ~96-128 kbps)

---

## Ambient Loops
**Usage**: Background atmosphere for categories and spice levels  
**Loop Behaviour**: Seamless, gapless playback

| File                              | Duration | Size (OGG) | Use Case                                      | Notes                                   |
|-----------------------------------|----------|------------|-----------------------------------------------|-----------------------------------------|
| `/audio/ambience/sizzle-low.ogg`  | 2.5s     | ~80 KB     | Spice level 1 hover                           | Gentle oil sizzle, low intensity        |
| `/audio/ambience/sizzle-med.ogg`  | 2.5s     | ~85 KB     | Spice level 2 hover                           | Moderate sizzle with occasional pop     |
| `/audio/ambience/crackle-ember.ogg` | 2.0s   | ~70 KB     | Spice level 3 loop, BBQ category              | Ember crackle, warm and organic         |
| `/audio/ambience/bubble-light.ogg` | 2.0s    | ~65 KB     | Soup category loop                            | Light bubbling, gentle and soothing     |

**Total Ambient Assets**: 4 files, ~300 KB combined

---

## One-Shot Effects
**Usage**: Triggered on specific interactions (select, hover, add to cart)  
**Behaviour**: Play once, no looping

| File                              | Duration | Size (OGG) | Use Case                                      | Notes                                   |
|-----------------------------------|----------|------------|-----------------------------------------------|-----------------------------------------|
| `/audio/oneshot/whoosh-open.ogg`  | 700ms    | ~45 KB     | Category enter, spice level 3 select          | Short air rush, clean whoosh            |
| `/audio/oneshot/chilli-pop.ogg`   | 600ms    | ~40 KB     | Spice level 2 select                          | Subtle "pop" with chilli sizzle tail    |
| `/audio/oneshot/chime-delicate.ogg` | 500ms  | ~35 KB     | Dessert select, add to cart                   | Soft metallic chime, warm tone          |
| `/audio/oneshot/leaf-rustle.ogg`  | 600ms    | ~38 KB     | Vegetarian/vegan select, salad category       | Natural leaf rustle, crisp and light    |
| `/audio/oneshot/mortar-tap.ogg`   | 400ms    | ~30 KB     | Curry category select                         | Single mortar pestle tap, grounded      |

**Total One-Shot Assets**: 5 files, ~188 KB combined

---

## UI Feedback
**Usage**: General interface interactions (buttons, hover states)  
**Behaviour**: Very short, subtle cues

| File                              | Duration | Size (OGG) | Use Case                                      | Notes                                   |
|-----------------------------------|----------|------------|-----------------------------------------------|-----------------------------------------|
| `/audio/ui/hover-subtle.ogg`      | 200ms    | ~18 KB     | Generic card/button hover                     | Extremely soft, high-pitched click      |
| `/audio/ui/click-soft.ogg`        | 300ms    | ~22 KB     | Generic button click, entree/side select      | Low impact click, non-intrusive         |

**Total UI Assets**: 2 files, ~40 KB combined

---

## Complete Asset Summary

| Category       | Files | Total Size | Average Duration |
|----------------|-------|------------|------------------|
| Ambient Loops  | 4     | ~300 KB    | 2.1s             |
| One-Shot       | 5     | ~188 KB    | 560ms            |
| UI Feedback    | 2     | ~40 KB     | 250ms            |
| **TOTAL**      | **11** | **~528 KB** | **1.4s avg**     |

---

## Sourcing & Generation Guidance

### Option 1: Source from Libraries
**Recommended Libraries** (Royalty-free, commercial-use):
- **Freesound.org** (CC0 or CC-BY licensed)
- **Zapsplat.com** (Free tier with attribution)
- **Sonniss Game Audio GDC Bundles** (Free, no attribution)

**Search Terms**:
- Sizzle: "oil sizzle", "frying pan", "cooking"
- Crackle: "fire crackle", "embers", "campfire"
- Bubble: "water bubble", "boil", "pot"
- Whoosh: "air whoosh", "swish", "wind"
- Chime: "bell", "ting", "glass chime"
- Leaf: "foliage rustle", "leaf movement", "nature"

### Option 2: Generate with Tools
**AI Audio Generation** (if recording isn't feasible):
- **Stable Audio** (Stability AI)
- **AudioCraft** (Meta)
- **Riffusion**

**Prompt Examples**:
- "Gentle oil sizzling in a pan, close-up, 2.5 seconds loop"
- "Light bubbling water, soft and soothing, seamless 2-second loop"
- "Short air whoosh, clean and modern, 700ms one-shot"

### Option 3: Record Custom (Best Quality)
**Equipment**:
- Zoom H5 or similar field recorder
- Lavalier mic for close-up foley
- Recording environment: quiet kitchen or foley studio

**Recording Tips**:
- Record at **48kHz, 24-bit** for maximum headroom
- Leave 0.5s silence before/after for clean editing
- Record 5-10 takes, select best for consistency
- Use **Audacity** or **Adobe Audition** for editing and looping

---

## Post-Processing Workflow

1. **Trim & Normalize**
   - Remove silence/noise at start/end
   - Normalize to **−18 LUFS** using Loudness Meter plugin

2. **Loop Editing** (for ambient files)
   - Crossfade start/end (20-50ms) for seamless loop
   - Test playback at 10+ loops to ensure no clicks/pops

3. **EQ & Dynamics**
   - High-pass filter at 80Hz (remove rumble)
   - Gentle compression (2:1 ratio, -6dB threshold) for consistency
   - De-esser if needed for harsh high frequencies

4. **Export**
   - **OGG Vorbis**: Quality level 5-6 (VBR ~96-128 kbps)
   - **AAC**: 128 kbps CBR for fallback
   - Ensure metadata is stripped (no album art, ID3 tags)

5. **QA**
   - Test in browser (Chrome, Firefox, Safari)
   - Verify file size ≤ target
   - Confirm loop points are seamless
   - Check peak levels never exceed −3 dB

---

## Fallback Strategy

If audio files aren't available initially, the system gracefully degrades:

1. **Audio manager** checks file existence before loading
2. **Errors logged** to console (dev mode only)
3. **VFX still trigger** (visual-only experience)
4. **User sees** settings toggle but no audio plays (expected behaviour until assets are added)

This allows development/testing of VFX and integration without blocking on audio asset creation.

---

## Asset Hosting

**Recommended Location**: `/public/audio/` in Next.js project

```
/public
  /audio
    /ambience
      sizzle-low.ogg
      sizzle-med.ogg
      crackle-ember.ogg
      bubble-light.ogg
    /oneshot
      whoosh-open.ogg
      chilli-pop.ogg
      chime-delicate.ogg
      leaf-rustle.ogg
      mortar-tap.ogg
    /ui
      hover-subtle.ogg
      click-soft.ogg
```

**Alternative**: CDN hosting for production (CloudFlare, AWS S3 + CloudFront) to reduce server load and improve global latency.

---

## Rationale

**Why these specific sounds?**

- **Sizzle**: Universal indicator of heat/spice; familiar from cooking
- **Crackle**: Evokes BBQ, fire, warmth; complements ember VFX
- **Bubble**: Soup-specific; gentle and non-intrusive
- **Whoosh**: Modern UI staple; signals transition/activation
- **Chime**: Desserts = sweetness = delicate, light tones
- **Leaf Rustle**: Vegetarian = fresh greens = natural sounds
- **Mortar Tap**: Curry = grinding spices = traditional Thai cooking

**Why short loops (2-2.5s)?**

- Minimizes file size
- Easier to create seamless loops
- Less repetitive/fatiguing than longer loops
- Faster loading

**Why low volume defaults?**

- Respects user attention (not intrusive)
- Allows UI sounds to layer without clipping
- User can increase if desired
- Better first impression than loud sounds

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Next Review**: After asset implementation & user testing
