# Audio Download Instructions - Quick Setup
**Get Your Menu Sound Effects in 5 Minutes**

---

## Quick Download Links (All Free & CC0)

### From Pixabay (No Attribution Required)

Visit https://pixabay.com/sound-effects/ and download these:

**Sizzle Sounds**:
1. Search "sizzle cooking" → Download first result → Rename to `sizzle-low.mp3`
2. Search "frying pan" → Download → Rename to `sizzle-med.mp3`
3. Save both to: `public/audio/ambience/`

**Fire/Crackle**:
4. Search "fire crackle" → Download → Rename to `crackle-ember.mp3`
5. Save to: `public/audio/ambience/`

**Bubbles (Soup)**:
6. Search "water bubbles" → Download → Rename to `bubble-light.mp3`
7. Save to: `public/audio/ambience/`

**One-Shot Effects**:
8. Search "whoosh" → Download → Rename to `whoosh-open.mp3`
9. Search "pop" → Download → Rename to `chilli-pop.mp3`
10. Search "bell chime" → Download → Rename to `chime-delicate.mp3`
11. Search "leaves rustle" → Download → Rename to `leaf-rustle.mp3`
12. Search "wood tap" → Download → Rename to `mortar-tap.mp3`
13. Save all to: `public/audio/oneshot/`

**UI Sounds**:
14. Search "ui click" → Download → Rename to `click-soft.mp3`
15. Search "ui hover" → Download short one → Rename to `hover-subtle.mp3`
16. Save both to: `public/audio/ui/`

---

## Alternative: Use These Direct Free Sources

### Mixkit (No Sign-Up Required)
Visit: https://mixkit.co/free-sound-effects/

- Cooking sounds: https://mixkit.co/free-sound-effects/cooking/
- Nature sounds: https://mixkit.co/free-sound-effects/nature/
- UI sounds: https://mixkit.co/free-sound-effects/click/

**How to Download**:
1. Click on any sound
2. Click "Free Download" button
3. Rename file to match names above
4. Place in correct folder

---

## File Structure (After Download)

```
public/audio/
├── ambience/
│   ├── sizzle-low.mp3
│   ├── sizzle-med.mp3
│   ├── crackle-ember.mp3
│   └── bubble-light.mp3
├── oneshot/
│   ├── whoosh-open.mp3
│   ├── chilli-pop.mp3
│   ├── chime-delicate.mp3
│   ├── leaf-rustle.mp3
│   └── mortar-tap.mp3
└── ui/
    ├── click-soft.mp3
    └── hover-subtle.mp3
```

**Total**: 11 files, ~2-3 MB total

---

## Quick Test

After downloading:
1. Run `npm run dev`
2. Go to Menu page
3. Enable sound in settings (bottom-right)
4. Click on a spicy dish
5. Should hear sizzle sound + see flames

---

## Sources Links

- **Pixabay**: https://pixabay.com/sound-effects/ (CC0, no attribution)
- **Mixkit**: https://mixkit.co/free-sound-effects/ (Free, commercial use)
- **Freesound**: https://freesound.org/ (Various CC licenses, check each)
- **Zapsplat**: https://www.zapsplat.com/ (Free with account)

All recommended sources are royalty-free for commercial use!
