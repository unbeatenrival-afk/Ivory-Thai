# Texture Compression Pipeline

This document outlines the texture compression workflow for optimising 3D assets.

## Tools Required

- **Basis Universal**: For KTX2/Basis compression
- **ImageMagick**: For image processing
- **Sharp**: Node.js image processing

## Installation

```bash
# Install Basis Universal
# macOS
brew install basisu

# Linux
git clone https://github.com/BinomialLLC/basis_universal.git
cd basis_universal
cmake .
make

# Or use toktx from KTX-Software
brew install ktx
```

## Compression Workflow

### 1. Convert to KTX2 (Basis Universal)

For general textures:
```bash
toktx --t2 --bcmp --genmipmap output.ktx2 input.png
```

With higher quality:
```bash
toktx --t2 --uastc --zcmp 5 --genmipmap output.ktx2 input.png
```

For normal maps:
```bash
toktx --t2 --normal_map --genmipmap normal_output.ktx2 normal_input.png
```

### 2. Convert to WebP/AVIF for 2D Images

```bash
# WebP
cwebp -q 80 input.jpg -o output.webp

# AVIF (better compression)
avifenc --min 0 --max 63 -a end-usage=q -a cq-level=18 input.jpg output.avif
```

### 3. Batch Processing

Create a script `compress-all.sh`:
```bash
#!/bin/bash

# Process all PNG files in a directory
for file in *.png; do
  toktx --t2 --bcmp --genmipmap "${file%.png}.ktx2" "$file"
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

## Recommended Settings

### Menu Item Images (2D)
- Format: WebP
- Quality: 80-85
- Resolution: 800x800px max

### 3D Model Textures
- Format: KTX2 (Basis)
- Compression: BCmp for most textures, UASTC for high-quality
- Generate mipmaps: Yes
- Max resolution: 2048x2048px

### HDRI Environment Maps
- Format: KTX2
- Compression: UASTC
- Resolution: 2048x1024px

## File Organisation

```
public/assets/images/
├── menu/
│   └── [category]/
│       └── [item].webp
├── gallery/
│   └── *.webp
└── brand/
    └── logo.svg (or .webp)

public/assets/models/
└── menu/
    └── [item].glb (with embedded KTX2 textures)

public/assets/env/
└── studio.ktx2
```

## Validation

Check compression results:
```bash
# File size comparison
ls -lh original.png compressed.ktx2 compressed.webp

# KTX2 info
ktxinfo output.ktx2
```

## Notes

- KTX2 textures require the KTX2Loader in Three.js
- Configure the loader in `src/lib/three.ts`
- Place decoder files in `public/assets/decoders/meshopt/`
- Test on mobile devices for performance validation
