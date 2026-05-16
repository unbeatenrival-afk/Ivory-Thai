# Ivory Thai 3D - Setup Guide

## System Requirements

- Node.js 20+ 
- npm 10+
- Modern browser with WebGL 2.0 support

## Installation Issues & Workarounds

### Known Issues

1. **System Policy Blocking**: `unrs-resolver` package blocked by group policy
2. **Peer Dependency Conflicts**: Some @react-three packages have conflicting peer dependencies

### Installation Options

#### Option 1: Install with Legacy Peer Deps (Recommended)
```bash
npm install --legacy-peer-deps
```

#### Option 2: Force Installation
```bash
npm install --force
```

#### Option 3: Manual Dependency Resolution

If the above fail, manually install dependencies in groups:

**Core Dependencies:**
```bash
npm install --legacy-peer-deps next react react-dom three zustand clsx framer-motion
```

**React Three Fibre Ecosystem:**
```bash
npm install --legacy-peer-deps @react-three/fiber@^8.0.0 @react-three/drei@^10.0.0 @react-three/postprocessing@^2.0.0 @react-three/rapier@^2.0.0
```

**Post-processing:**
```bash
npm install --legacy-peer-deps postprocessing leva three-stdlib
```

**Dev Dependencies:**
```bash
npm install --legacy-peer-deps -D @types/three @types/node @types/react @types/react-dom typescript tsx @gltf-transform/cli autoprefixer postcss
```

### shadcn/ui Installation

After dependencies are installed:

```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog drawer sheet tabs tooltip separator input
```

When prompted:
- TypeScript: Yes
- Style: Default
- Base colour: Slate
- CSS variables: Yes
- Tailwind config: tailwind.config.ts
- Components location: @/components/ui
- Utils location: @/lib/utils
- React Server Components: Yes

## Project Structure

```
ivory-thai-3d/
├── public/
│   └── assets/
│       ├── images/          # 2D images (WebP/AVIF)
│       ├── models/          # 3D models (GLB/GLTF)
│       ├── env/             # HDRIs and environment maps
│       └── decoders/        # DRACO and Meshopt decoders
├── content/
│   ├── raw/                 # Original knowledge_base.json
│   └── normalised/          # Processed JSON data
├── scripts/                 # Build scripts
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   ├── sections/        # Page sections
│   │   ├── ui/              # shadcn components
│   │   └── 3d/              # React Three Fibre components
│   ├── lib/                 # Utilities
│   ├── schemas/             # TypeScript types
│   ├── store/               # Zustand stores
│   └── hooks/               # Custom hooks
└── ...config files
```

## Running the Project

### Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build Content
```bash
npm run build:content
```

This processes `content/raw/knowledge_base.json` into normalised data files.

### Production Build
```bash
npm run build
npm start
```

## Content Pipeline

1. **Raw Data**: `content/raw/knowledge_base.json` (scraped site data)
2. **Normalisation**: Run `npm run build:content` 
3. **Output**: Generates `business.json`, `hours.json`, `menu.json`, `pages.json` in `content/normalised/`
4. **Consumption**: Components import from `@/lib/content`

## 3D Asset Pipeline

### Model Optimisation
```bash
# Convert and optimise GLB files
gltf-transform optimize input.glb output.glb --compress meshopt

# Add DRACO compression
gltf-transform draco input.glb output.glb
```

### Texture Compression
```bash
# Convert to KTX2 (Basis Universal)
toktx --t2 --bcmp --genmipmap output.ktx2 input.png
```

Place DRACO and Meshopt decoder files in `public/assets/decoders/`.

## Troubleshooting

### "Module not found" errors
Run `npm install --legacy-peer-deps` again

### 3D models not loading
1. Check file paths in `public/assets/models/`
2. Verify DRACO/Meshopt decoders are in `public/assets/decoders/`
3. Check browser console for loader errors

### Slow performance
1. Enable production build: `npm run build && npm start`
2. Reduce model poly count
3. Use compressed textures (KTX2)
4. Check FPS with Leva panel (enabled in dev)

## Next Steps

1. Install dependencies (see options above)
2. Copy `knowledge_base.json` to `content/raw/`
3. Run `npm run build:content`
4. Add 3D models to `public/assets/models/`
5. Add menu images to `public/assets/images/menu/`
6. Add brand assets to `public/assets/images/brand/`
7. Run `npm run dev`

## Australian English

All content and code comments use Australian English spelling (colour, centre, favour, etc.).
