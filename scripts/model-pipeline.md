# 3D Model Pipeline

Guide for optimising and preparing 3D models for web delivery.

## Tools Required

- **Blender**: 3D modelling and export
- **gltfjsx**: Generate React components from GLTF
- **@gltf-transform/cli**: Optimise and compress GLTF files

## Installation

```bash
# gltfjsx (already in dev dependencies)
npm install -g @gltf-transform/cli

# Blender
# Download from blender.org
```

## Workflow

### 1. Model Creation/Export from Blender

Best practices:
- Keep poly count low (< 50k triangles for menu items)
- Use power-of-two texture resolutions (512, 1024, 2048)
- Bake lighting when possible
- Apply all transforms before export

Export settings:
```
Format: glTF 2.0 (.glb)
✓ Include: Selected Objects
✓ Transform: +Y Up
✓ Geometry: Apply Modifiers, UVs, Normals, Tangents
✓ Compression: DRACO
✓ Materials: Export
✓ Animation: None (unless needed)
```

### 2. Optimisation with gltf-transform

Basic optimisation:
```bash
gltf-transform optimize input.glb output.glb \
  --compress meshopt \
  --texture-compress webp
```

Advanced optimisation:
```bash
gltf-transform optimize input.glb output.glb \
  --compress meshopt \
  --texture-compress ktx2 \
  --simplify 0.75 \
  --instance \
  --dedup \
  --prune
```

DRACO compression:
```bash
gltf-transform draco input.glb output.glb \
  --method edgebreaker \
  --encode-speed 0 \
  --decode-speed 5
```

### 3. Generate React Components

```bash
npx gltfjsx public/assets/models/menu/dish.glb -o src/components/3d/models/Dish.tsx -t
```

Options:
- `-t`: TypeScript
- `-T`: Transform the asset
- `-k`: Keep original materials

### 4. Manual Adjustments

After generation, you may need to:
- Adjust scale and position
- Add interactivity (onClick, onPointerOver)
- Configure materials (metalness, roughness)
- Add animations

## Example Model Component

```tsx
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Mesh: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export function DishModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/menu/dish.glb') as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh.geometry}
        material={materials.Material}
        scale={0.01}
      />
    </group>
  )
}

useGLTF.preload('/assets/models/menu/dish.glb')
```

## Quality Targets

### Menu Item Models
- Triangles: 5k-20k
- Textures: 1024x1024 KTX2
- File size: < 500KB compressed

### Category Cards (if 3D)
- Triangles: 2k-5k
- Textures: 512x512 KTX2
- File size: < 200KB compressed

## File Organisation

```
public/assets/models/
├── menu/
│   ├── pad-thai.glb
│   ├── tom-yum.glb
│   └── ...
└── common/
    ├── plate.glb
    └── stand.glb

src/components/3d/models/
├── PadThai.tsx
├── TomYum.tsx
└── ...
```

## Validation

Check model stats:
```bash
gltf-transform inspect model.glb
```

Test loading:
```bash
# Start dev server
npm run dev

# Check browser console for:
# - Loading time
# - Draw calls
# - Memory usage
```

## Tips

- Use instancing for repeated geometry
- Share materials between models when possible
- Bake ambient occlusion into textures
- Use LOD (Level of Detail) for complex scenes
- Test on mobile devices
- Profile with Chrome DevTools Performance tab
