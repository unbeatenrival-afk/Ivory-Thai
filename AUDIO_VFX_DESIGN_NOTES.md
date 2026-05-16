# Audio & VFX Design Notes - Ivory Thai Menu Enrichment
**How Effects Reinforce Spiciness, Warmth & Freshness**

---

## Design Philosophy

The audio and visual effects system enhances the menu browsing experience by creating **tasteful, data-driven sensory cues** that reinforce dish characteristics without distracting from the primary goal: ordering food.

**Core Principles**:

1. **Subtle by Default**: Effects start at low intensity; users can increase if desired
2. **Respectful**: Sound off by default (autoplay policy); motion respects `prefers-reduced-motion`
3. **Purposeful**: Every sound/VFX communicates a dish property (spice, diet, category)
4. **Premium**: Warm, organic sounds and colours from brand palette (no neon, no harsh tones)
5. **Performance-Conscious**: 60fps target maintained; effects fade after 3-5s to avoid fatigue

---

## Spiciness Communication

### Visual Language

**Spice Level 0** (No Heat)
- **VFX**: None
- **Rationale**: Calm, neutral baseline; no distraction for mild dishes
- **Example**: Pad Thai (plain), Spring Rolls

**Spice Level 1** (Mild)
- **VFX**: Subtle ember glow (8-12 particles, gold 400-500 colours)
- **Motion**: Slow upward drift, gentle fade
- **Rationale**: Warmth without intensity; represents mild heat that adds flavour but doesn't dominate
- **Example**: Mild Green Curry

**Spice Level 2** (Medium)
- **VFX**: Intermittent small flames (15-25 particles, gold→chilli gradient)
- **Motion**: Quicker upward movement, occasional flicker
- **Audio**: Medium sizzle on hover, "chilli pop" on select
- **Rationale**: Noticeable heat; flames communicate "this will make you feel it" without being intimidating
- **Example**: Pad Kee Mao (Drunken Noodles)

**Spice Level 3** (Hot)
- **VFX**: Lively flame licks + ember drift (40+ particles combined, chilli-dominant palette)
- **Motion**: Dynamic, energetic; flames "dance"
- **Audio**: Crackle loop, whoosh on open
- **Rationale**: Clear warning and excitement; for chilli lovers, this IS the appeal
- **Example**: Jungle Curry, Som Tum (Spicy Papaya Salad)

### Audio Design: Spice

- **Sizzle sounds** = universal cooking metaphor; everyone knows the sound of spicy stir-fry
- **Crackle** = evokes embers, heat, energy
- **Whoosh** = dramatic flair for max spice; "here comes the heat"

**Why not use "hot" visual cues like red overlays or flames everywhere?**

- Overuse of red reduces effectiveness (alarm fatigue)
- Flames are **earned** at spice level 2+; makes them more impactful
- Gold embers for level 1 = warmth without aggression

---

## Dietary Freshness & Health

### Vegetarian / Vegan

**VFX**: Soft leaf swirl (jade 300-600 colours)
- **Particle Count**: 12-18 leaves
- **Motion**: Gentle arc downward, slow rotation (autumn leaf fall)
- **Colour**: Jade gradient (fresh herb green, not neon)

**Audio**: Leaf rustle (600ms, natural foliage sound)

**Rationale**:
- **Leaves** = plants, vegetables, freshness
- **Jade green** = brand colour + universal symbol of health/nature
- **Gentle motion** = organic, calming (vs aggressive flames for spice)
- **Rustle sound** = tactile, natural, reinforces "fresh ingredients"

**Why leaves instead of generic "green" indication?**

- Leaves have **motion** = more engaging than static icon
- **Culturally appropriate**: Thai cuisine heavily features fresh herbs (basil, coriander, lemongrass)
- **Brand-aligned**: Jade is a primary brand colour, so it feels cohesive, not tacked-on

### Gluten-Free

**VFX**: Sparse gold sparkles (10-15 particles)
- **Motion**: Short-lived, upward burst
- **Colour**: Gold 500-600 (premium, not medical)

**Audio**: None (visual-only cue)

**Rationale**:
- **Sparkle** = "clean", "pure", "special diet accommodated"
- **Gold** = premium care; this is a value-add, not a limitation
- **No sound** = already have spice + dietary (veg) audio; avoid layering 3+ sounds

**Why sparkles?**

- **Crisp, clean** visual metaphor for dietary restriction accommodated
- **Distinct** from organic leaves/flames
- **Subtle** = doesn't overpower the dish; it's a property, not the identity

---

## Category Atmosphere

### BBQ

**VFX**: Ember bed (idle state, low-intensity glow)
- **Particle Count**: 10 embers, slow drift
- **Colour**: Gold 400-500 (warm, not red-hot)

**Audio**: Crackle loop (2s, quiet)

**Rationale**:
- **Embers** = grilling, charcoal, authentic BBQ experience
- **Persistent glow** = even when not hovering, you "feel" the heat category
- **Crackle** = iconic campfire/grill sound; triggers appetite for grilled meat

### Soup

**VFX**: Light steam plume (15-20 particles, charcoal 50-200)
- **Motion**: Slow upward drift, large soft particles, fade
- **Colour**: White/off-white (realistic steam)

**Audio**: Bubble loop (2s, very quiet)

**Rationale**:
- **Steam** = hot liquid; universal soup cue
- **White particles** = realistic (not gold/jade); this is literal steam
- **Bubbling** = simmering pot; comforting, homey sound

### Curry

**VFX**: Gold-tinted steam (subtle warm glow)
**Audio**: Mortar tap (400ms, one-shot on select)

**Rationale**:
- **Tinted steam** = aromatic curry paste; distinct from plain soup steam
- **Mortar tap** = traditional spice grinding; authentically Thai
- **Sound reinforces** the "hand-crafted paste" narrative

### Dessert

**VFX**: Gold sparkles (15-20 particles, 2.5s burst)
**Audio**: Delicate chime (500ms, soft)

**Rationale**:
- **Sparkles** = sweetness, celebration, indulgence
- **Chime** = light, delicate, dessert = treat
- **Gold** = premium; dessert is the finale, make it feel special

### Noodle/Rice

**Audio**: Whoosh (700ms, on transition)
**VFX**: None (relies on spice/dietary VFX)

**Rationale**:
- **Whoosh** = "tossing" noodles; dynamic, energetic
- **No VFX** = avoid overload; noodles/rice are often spicy or have dietary tags, those effects cover it

---

## User Control Philosophy

### Why Sound Off by Default?

1. **Autoplay Policy**: Browsers block audio until user gesture; starting "on" would fail silently and confuse users
2. **Respect**: Not everyone wants sound; better to let them opt-in
3. **Context**: User may be browsing in a quiet office, library, public transport
4. **Delight**: Discovering sound enhances joy more than being forced to hear it

### Why Motion On by Default?

1. **Visual effects enhance** browsing without being intrusive (no volume to worry about)
2. **Modern expectation**: Users expect some animation on contemporary web apps
3. **Performance**: VFX are GPU-accelerated and capped; safe to enable
4. **Respect `prefers-reduced-motion`**: Auto-disabled if system preference is set

### Why Persist Preferences?

- **User agency**: Remembering choices shows respect for user control
- **Convenience**: Don't make users toggle every session
- **Accessibility**: Critical for users who always need reduced motion

---

## How Effects Don't Distract from Ordering

### Timing

- **Hover effects**: 2-3s max, then fade; don't overstay welcome
- **Select effects**: 3-5s; enough to appreciate, not enough to fatigue
- **Loops**: Only 2-3 categories use loops (soup, BBQ, curry); others are one-shots
- **Auto-cleanup**: Effects stop when user deselects or navigates away

### Intensity

- **Particles capped**: Max 300 total across all effects; mobile gets 50% reduction
- **Volume low**: Default 40%; user can increase if desired
- **Colours from brand**: No neon, no clashing; effects use jade/gold/charcoal palette
- **Opacity**: VFX use semi-transparency (0.3-0.9 alpha); never fully opaque

### Hierarchy

**Priority 1**: Dish information (name, description, price)
**Priority 2**: Add to cart / order flow
**Priority 3**: Audio/VFX (enhancement, not core function)

**Key Design Rule**: If VFX or audio ever obscures text or makes buttons hard to click, it's a bug.

---

## Accessibility Considerations

### Visual

- **Particles never overlap text**: Canvas positioned absolutely, z-index below text
- **Contrast maintained**: Glow effects at 6-8% opacity don't reduce text legibility
- **Focus rings** remain visible over VFX (gold ring with offset)
- **Motion toggle**: Users with vestibular disorders can disable all particles

### Auditory

- **Volume control**: 0-100% slider; user sets comfortable level
- **Mute toggle**: One-click silence; persisted across sessions
- **No critical info in audio**: Spice level, dietary tags, etc. all have visual indicators (badges, text)
- **Concurrent limit**: Max 3 audio streams prevent cacophony

### Cognitive

- **Predictable**: Same dish always triggers same effects (deterministic)
- **Opt-in**: Sound off by default; user chooses when to engage
- **Clear toggles**: "Sound" and "Visual Effects" labels are direct and unambiguous
- **Help text**: Settings panel includes short explanation of what toggles control

---

## Performance Strategy

### Why 60fps Target?

- **Smooth scrolling**: Menu browsing involves lots of scrolling; 60fps feels responsive
- **Mobile experience**: Lower-end devices need headroom; capping at 60fps (vs uncapped) conserves battery
- **GPU efficiency**: requestAnimationFrame syncs with display refresh; no wasted frames

### Lazy Loading

- **Top 3 dishes per category** preloaded
- **Rest loaded on scroll**: Intersection Observer triggers load when card enters viewport
- **Audio buffers cached**: Once loaded, reused across sessions (IndexedDB)

### Particle Budgets

- **Desktop**: 300 total particles, 2-3 active effects
- **Mobile**: 150 total particles, 1-2 active effects
- **Auto-cleanup**: Effects older than 5s are force-stopped to reclaim resources

### Canvas Pooling

- **VFX Manager** reuses canvas elements instead of creating new ones
- **Max 3 canvases** at a time; oldest is recycled when limit exceeded
- **Memory efficient**: Avoids GC pressure from frequent create/destroy cycles

---

## Cultural Resonance

### Thai Culinary Traditions Reflected

1. **Mortar & Pestle** (curry category): Central to Thai cooking; grinding fresh paste
2. **Fresh Herbs** (vegetarian/salad): Thai cuisine's emphasis on cilantro, basil, lemongrass
3. **Fire Cooking** (BBQ, spicy dishes): Traditional charcoal grills, wok hei (breath of the wok)
4. **Balance** (overall): Thai food balances sweet/sour/salty/spicy; effects balance warmth/freshness

### Avoiding Clichés

**What We Didn't Do**:
- ❌ Overly stereotypical "Asian" sounds (gongs, bamboo flutes)
- ❌ Bright red/yellow "Chinese takeout" colour scheme
- ❌ Overly exotic/othering effects

**What We Did**:
- ✅ Universal food sounds (sizzle, bubble, crackle)
- ✅ Brand-aligned colours (jade, gold from logo)
- ✅ Authentic culinary references (mortar, fresh herbs) without being kitschy

---

## Future Enhancements (Out of Scope for V1)

1. **Seasonal variations**: Winter = warmer tones, summer = cooler tones
2. **Time-of-day ambience**: Lunch vs dinner lighting/sound
3. **Regional dish effects**: Isaan (Northeast) dishes get distinct sounds
4. **Allergy warnings**: Visual cue for common allergens (nuts, shellfish)
5. **Popularity indicator**: "Trending" sparkle for best-sellers
6. **Chef's voice**: Optional audio descriptions for signature dishes

---

## Success Metrics (Post-Launch)

1. **Engagement**: Do users with effects enabled browse longer?
2. **Opt-in rate**: What % enable sound after seeing toggle?
3. **Performance**: 60fps maintained on target devices (Lighthouse audit)
4. **Accessibility**: Zero complaints about motion sickness or audio fatigue
5. **Ordering**: Does enrichment correlate with higher add-to-cart rates for spicy/vegetarian dishes?

---

**Conclusion**:

The audio/VFX system is designed to **enhance, not replace** the core menu experience. By grounding effects in real dish properties (spice, dietary, category), using a restrained premium palette, and offering robust user controls, we create an immersive yet respectful browsing experience that **delights without distracting** from the ultimate goal: enjoying authentic Thai cuisine.

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Author**: Ivory Thai Development Team
