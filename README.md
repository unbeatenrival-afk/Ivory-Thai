# Ivory Thai 3D - Premium Restaurant Website

A production-ready Next.js TypeScript project featuring an immersive 3D menu experience for Ivory Thai North Ryde restaurant.

## 🌟 Features

- **Immersive 3D Menu**: Interactive React Three Fibre scene with circular category layout
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select, Esc to return
- **Responsive Design**: Mobile-first with Tailwind CSS and shadcn/ui
- **Performance Optimised**: DRACO compression, texture streaming, adaptive quality
- **Type-Safe**: Full TypeScript coverage with strict types
- **Content Management**: JSON-based content system with normalisation pipeline
- **SEO Optimised**: Meta tags, structured data, Australian English content

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **3D**: React Three Fibre, Drei, Postprocessing, Rapier
- **Styling**: Tailwind CSS 4, shadcn/ui
- **State**: Zustand
- **Animation**: Framer Motion
- **Build**: TypeScript, ESLint, tsx

## 📁 Project Structure

```
ivory-thai-3d/
├── public/assets/          # Static assets
│   ├── images/            # WebP/AVIF images
│   ├── models/            # GLB 3D models
│   ├── env/               # HDRIs
│   └── decoders/          # DRACO/Meshopt decoders
├── content/
│   ├── raw/               # knowledge_base.json
│   └── normalised/        # Processed JSON
├── scripts/               # Build scripts
├── src/
│   ├── app/               # Next.js pages
│   ├── components/        # React components
│   │   ├── 3d/           # R3F components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # shadcn components
│   ├── lib/              # Utilities
│   ├── schemas/          # TypeScript types
│   ├── store/            # Zustand stores
│   └── hooks/            # Custom hooks
└── ...config files
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Install dependencies (use --legacy-peer-deps if needed)
npm install --legacy-peer-deps

# Build normalised content from knowledge base
npm run build:content

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 📝 Content Pipeline

### 1. Raw Data

`content/raw/knowledge_base.json` contains scraped restaurant data:
- Business info, hours, contact
- Complete menu with categories and items
- Page metadata

### 2. Normalisation

Run the build script to process raw data:

```bash
npm run build:content
```

Outputs:
- `business.json` - Contact, location, links
- `hours.json` - Opening hours
- `menu.json` - Categories and items with slugs
- `pages.json` - Page registry

### 3. Consumption

Components import from `@/lib/content`:

```typescript
import { getCategories, getItemsByCategory } from '@/lib/content';

const categories = getCategories();
const items = getItemsByCategory('ivory-special');
```

## 🎨 3D Menu Experience

The 3D menu features:

- **Circular Layout**: Categories arranged in a 3D circle
- **Camera Animations**: Smooth transitions between views
- **Interactive Cards**: Hover effects, click to explore
- **Item Details**: Side panel with prices, descriptions, allergens
- **Keyboard Shortcuts**:
  - `←/→` - Navigate categories
  - `Enter` - Select category
  - `Esc` - Return to overview
  - `Drag` - Rotate view
  - `Scroll` - Zoom

## 🛠️ Development

### Adding Menu Items

1. Update `content/raw/knowledge_base.json`
2. Run `npm run build:content`
3. Items automatically appear in 3D menu

### Adding 3D Models

1. Export GLB from Blender (see `scripts/model-pipeline.md`)
2. Optimise: `gltf-transform optimize input.glb output.glb --compress meshopt`
3. Place in `public/assets/models/menu/`
4. Generate React component: `npx gltfjsx model.glb -o src/components/3d/models/Model.tsx -t`

### Adding UI Components

Using shadcn/ui:

```bash
npx shadcn@latest add button card dialog
```

## 📦 Build Optimisations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimisation**: WebP/AVIF with Next.js Image
- **3D Asset Compression**: DRACO + Meshopt
- **Texture Compression**: KTX2/Basis Universal
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: `npm run build` shows bundle sizes

## 🎯 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **3D Scene Load**: < 2s
- **FPS**: 60fps on desktop, 30fps on mobile
- **Bundle Size**: < 500KB initial JS

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

```bash
npm run build
# Deploy the .next folder
```

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [scripts/model-pipeline.md](./scripts/model-pipeline.md) - 3D model workflow
- [scripts/compress-textures.md](./scripts/compress-textures.md) - Texture optimisation

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# Optional analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Tailwind Theme

Edit `tailwind.config.ts` to customise colours, fonts, spacing.

### Content Types

Add new content schemas in `src/schemas/content.types.ts`.

## 🐛 Troubleshooting

### Dependency Issues

```bash
npm install --legacy-peer-deps
```

### Build Content Fails

Check `content/raw/knowledge_base.json` exists and is valid JSON.

### 3D Models Not Loading

1. Check file paths in `public/assets/models/`
2. Verify DRACO decoders in `public/assets/decoders/draco/`
3. Check browser console for loader errors

### Performance Issues

1. Use production build: `npm run build && npm start`
2. Reduce model poly counts
3. Use compressed textures (KTX2)
4. Enable FPS counter in dev: Check `useUIStore`

## 🤝 Contributing

This is a production project for Ivory Thai North Ryde. For improvements:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit for review

## 📄 License

© 2026 Ivory Thai North Ryde. All rights reserved.

## 🙏 Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- 3D powered by [React Three Fibre](https://docs.pmnd.rs/react-three-fiber/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Australian English Notice**: All content and code comments use Australian English spelling (colour, centre, optimise, etc.).
