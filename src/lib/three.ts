/**
 * Three.js Utilities and Loaders
 * Configure DRACO, Meshopt, and KTX2 loaders for optimised 3D assets
 */

import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Configure DRACO loader for compressed geometries
 */
export function createDRACOLoader(): DRACOLoader {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/assets/decoders/draco/');
  dracoLoader.setDecoderConfig({ type: 'js' });
  dracoLoader.preload();
  return dracoLoader;
}

/**
 * Configure GLTF loader with DRACO support
 */
export function createGLTFLoader(renderer?: THREE.WebGLRenderer): GLTFLoader {
  const gltfLoader = new GLTFLoader();
  const dracoLoader = createDRACOLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  // Optional: Add KTX2 support for compressed textures
  if (renderer) {
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath('/assets/decoders/meshopt/');
    ktx2Loader.detectSupport(renderer);
    gltfLoader.setKTX2Loader(ktx2Loader);
  }

  return gltfLoader;
}

/**
 * Load GLTF model
 */
export async function loadGLTF(url: string, renderer?: THREE.WebGLRenderer) {
  const loader = createGLTFLoader(renderer);
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf),
      undefined,
      (error) => reject(error)
    );
  });
}

/**
 * Load HDRI environment map
 */
export async function loadHDRI(url: string): Promise<THREE.DataTexture> {
  const loader = new RGBELoader();
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        resolve(texture);
      },
      undefined,
      (error) => reject(error)
    );
  });
}

/**
 * Generate PMREM environment from HDRI
 */
export function generatePMREM(
  renderer: THREE.WebGLRenderer,
  hdri: THREE.DataTexture
): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(hdri).texture;
  pmremGenerator.dispose();
  return envMap;
}

/**
 * Optimise GLTF scene
 * - Traverse and optimise materials
 * - Set shadow casting
 * - Dispose unnecessary data
 */
export function optimiseGLTFScene(scene: THREE.Group, options?: {
  castShadow?: boolean;
  receiveShadow?: boolean;
  envMapIntensity?: number;
}) {
  const {
    castShadow = true,
    receiveShadow = true,
    envMapIntensity = 1.0,
  } = options || {};

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.envMapIntensity = envMapIntensity;
              mat.needsUpdate = true;
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMapIntensity = envMapIntensity;
          child.material.needsUpdate = true;
        }
      }
    }
  });

  return scene;
}

/**
 * Calculate bounding box centre
 */
export function getBoundingBoxCentre(object: THREE.Object3D): THREE.Vector3 {
  const box = new THREE.Box3().setFromObject(object);
  const centre = new THREE.Vector3();
  box.getCenter(centre);
  return centre;
}

/**
 * Fit camera to object
 */
export function fitCameraToObject(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  offset: number = 1.5
) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
  cameraZ *= offset;

  camera.position.set(centre.x, centre.y, centre.z + cameraZ);
  camera.lookAt(centre);
  camera.updateProjectionMatrix();
}

/**
 * Dispose Three.js object and its resources
 */
export function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => disposeMaterial(mat));
        } else {
          disposeMaterial(child.material);
        }
      }
    }
  });
}

function disposeMaterial(material: THREE.Material) {
  material.dispose();

  // Dispose textures
  Object.keys(material).forEach(key => {
    const value = (material as any)[key];
    if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) {
      value.dispose();
    }
  });
}
