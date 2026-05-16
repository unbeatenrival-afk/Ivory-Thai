# Sound Mapping Guide - Which Sounds Play When
**Quick Reference for Menu Sound Effects**

---

## Sound Selection by Dish Properties

### Spice Level Sounds

**Level 0 (No Heat)** - Example: Spring Rolls, Pad Thai (mild)
- ❌ No sound effects
- ❌ No flames

**Level 1 (Mild)** - Example: Mild Green Curry
- 🔊 **Hover**: `sizzle-low.mp3` (gentle cooking sound)
- 🔥 **VFX**: Small gold embers (8 particles)

**Level 2 (Medium)** - Example: Pad Kee Mao, Tom Yum
- 🔊 **Hover**: `sizzle-med.mp3` (moderate sizzle)
- 🔊 **Click**: `chilli-pop.mp3` (pop sound)
- 🔥 **VFX**: Flames + embers (27 particles)

**Level 3 (Hot)** - Example: Jungle Curry, Som Tum
- 🔊 **Click**: `whoosh-open.mp3` (dramatic whoosh)
- 🔊 **Loop**: `crackle-ember.mp3` (continuous crackle while details open)
- 🔥 **VFX**: Large flames + ember drift (40 particles)

---

### Dietary Tag Sounds

**Vegetarian** - Example: Fresh 4 Seasons, Vegetable Pad Thai
- 🔊 **Click**: `leaf-rustle.mp3` (natural foliage sound)
- 🌿 **VFX**: Jade green leaves swirling (12 particles)

**Vegan** - Example: Tofu dishes, Vegan curry
- 🔊 **Click**: `leaf-rustle.mp3` (same as vegetarian)
- 🌿 **VFX**: More leaves (18 particles)

**Gluten-Free**
- 🔊 No specific sound
- ✨ **VFX**: Gold sparkles (10 particles)

---

### Category Sounds

**Ivory Special** (Signature Dishes)
- 🔊 **Click**: `whoosh-open.mp3` (premium entrance)
- ✨ **VFX**: Gold halo glow

**Entree**
- 🔊 **Click**: `click-soft.mp3` (simple UI click)
- ❌ No specific VFX

**Salad**
- 🔊 **Click**: `leaf-rustle.mp3` (fresh leaves)
- 🌿 **VFX**: Jade leaves (6 particles)

**BBQ**
- 🔊 **Loop**: `crackle-ember.mp3` (ember bed while details open)
- 🔥 **VFX**: Gold embers (10 particles) - continuous

**Soup**
- 🔊 **Loop**: `bubble-light.mp3` (gentle bubbling)
- 💨 **VFX**: White steam plumes (15 particles)

**Stir Fry**
- 🔊 **Click**: `whoosh-open.mp3` (wok toss)
- ❌ No specific VFX (relies on spice/dietary)

**Curry**
- 🔊 **Click**: `mortar-tap.mp3` (grinding spices)
- 💨 **VFX**: Gold-tinted steam (12 particles)

**Noodle/Rice**
- 🔊 **Click**: `whoosh-open.mp3` (noodle toss)
- ❌ No specific VFX

**Side Dish**
- 🔊 **Click**: `click-soft.mp3`
- ❌ No specific VFX

**Dessert**
- 🔊 **Click**: `chime-delicate.mp3` (sweet bell sound)
- ✨ **VFX**: Gold sparkles (15 particles)

---

## Example: "Gang Phed Ped Yang" (Crispy Duck with Red Curry)

**Properties**:
- Category: Ivory Special
- Spice Level: 2 (Medium)
- Dietary: None

**Effects When Clicked**:
1. 🔊 **Whoosh** plays (from category) + **Chilli pop** (from spice level 2)
2. 🔥 **Flames** appear (gold→chilli gradient)
3. 🔥 **Embers** drift upward
4. ✨ **Gold halo** glow (from Ivory Special category)

**When Closed**:
- All sounds fade out (250ms)
- Particles fade away (1 second)

---

## Example: "Fresh 4 Seasons" (Vegetarian Greens)

**Properties**:
- Category: Ivory Special
- Spice Level: 0 (None)
- Dietary: Vegetarian

**Effects When Clicked**:
1. 🔊 **Whoosh** plays (from category) + **Leaf rustle** (from vegetarian)
2. 🌿 **Jade leaves** swirl down
3. ✨ **Gold halo** glow
4. ❌ No flames (spice level 0)

**When Closed**:
- All sounds fade out
- Leaves and glow fade away

---

## Example: "Tom Yum Goong" (Spicy Soup)

**Properties**:
- Category: Soup
- Spice Level: 2-3 (Hot)
- Dietary: None

**Effects When Clicked**:
1. 🔊 **Sizzle** (spice level) + **Bubble loop** (soup category, continuous)
2. 🔥 **Flames** appear
3. 💨 **Steam** rises (white particles)
4. 🔊 Bubbling continues until you close

**When Closed**:
- Bubbling fades out
- Steam and flames disappear

---

## Sound Priority (When Multiple Apply)

**Priority 1**: Spice level (most prominent)
**Priority 2**: Dietary tags (adds to spice)
**Priority 3**: Category (fills gaps if no spice/dietary)

**Example**: Spicy (level 2) + Vegetarian
- Plays **both** sizzle AND leaf rustle
- Shows **both** flames AND leaves
- Total: 2 sounds, 2 VFX types (not overwhelming because they're designed to layer)

---

## Download These Specific Sounds

### From Pixabay (Recommended):

1. **Sizzle Low**: Search "gentle sizzle" → Pick quieter one
2. **Sizzle Med**: Search "frying pan sizzle" → Pick medium intensity
3. **Crackle Ember**: Search "fire crackle" → Pick one with embers, not roaring fire
4. **Bubble Light**: Search "water bubbles gentle" → Pick subtle one
5. **Whoosh Open**: Search "air whoosh short" → Pick clean, 0.5-1s duration
6. **Chilli Pop**: Search "pop sound effect" → Pick short, crisp pop
7. **Chime Delicate**: Search "bell chime soft" → Pick light, pleasant bell
8. **Leaf Rustle**: Search "leaves rustling" → Pick natural, not windy
9. **Mortar Tap**: Search "wood tap" or "pestle grind" → Pick single tap
10. **Click Soft**: Search "ui click soft" → Pick subtle click
11. **Hover Subtle**: Search "ui hover" → Pick very short (< 200ms)

### Mixkit Alternative:

Visit https://mixkit.co/free-sound-effects/

- **Cooking**: Browse cooking category for sizzle/crackle
- **Nature**: Get leaf rustle sounds
- **UI**: Get click/hover sounds
- **Household**: Get bubbling water

---

## Testing Your Sounds

After downloading and placing in `/public/audio/`:

1. Run `npm run dev`
2. Go to http://localhost:3000/menu
3. Click settings (bottom-right) → Enable Sound
4. Click on "Entree" category
5. Click on "Peking Duck Spring Roll"
   - Should hear: soft click
   - Should see: If it has spice/dietary tags, those VFX appear

6. Try a spicy dish (Tom Yum, Pad Kee Mao)
   - Should hear: sizzle + maybe crackle
   - Should see: flames and embers

7. Try a vegetarian dish
   - Should hear: leaf rustle
   - Should see: jade leaves swirling

**If no sound plays**:
- Check browser console for 404 errors
- Verify files are in correct folders
- Check file names match exactly (case-sensitive)
- Ensure sound toggle is ON in settings

---

## Quick Troubleshooting

**Problem**: No sound at all
- **Fix**: Click sound toggle in settings (bottom-right gear icon)

**Problem**: Sound plays but cuts off immediately
- **Fix**: File might be too short or corrupted, download again

**Problem**: Too loud
- **Fix**: Adjust volume slider in settings (default is 40%)

**Problem**: VFX showing but no sound
- **Fix**: Audio files missing or wrong file names

**Problem**: Sound but no VFX
- **Fix**: Motion toggle might be off in settings

---

**Happy cooking sounds! 🍜🔥🌿**
