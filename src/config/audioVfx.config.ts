/**
 * Audio & VFX Configuration
 * Data-driven mapping for menu enrichment effects
 *
 * Maps dish properties (spice level, dietary tags, category) to audio cues and visual effects.
 * All effects respect user preferences (sound/motion toggles) and performance budgets.
 */

export type SpiceLevel = 0 | 1 | 2 | 3 | null;
export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free';
export type CategorySlug = 'ivory-special' | 'entree' | 'salad' | 'bbq' | 'soup' | 'stir-fry' | 'curry' | 'noodle-rice' | 'side-dish' | 'dessert';

export interface AudioCue {
  src: string;
  volume: number; // 0-1
  loop?: boolean;
  duration?: number; // milliseconds
  fadeIn?: number;
  fadeOut?: number;
}

export interface VFXConfig {
  type: 'flame' | 'ember' | 'steam' | 'leaf' | 'sparkle' | 'glow' | 'bubble' | 'water' | 'coconut' | 'oil';
  intensity: 'low' | 'medium' | 'high';
  particleCount: number;
  particleCountMobile: number;
  duration?: number; // milliseconds, undefined = continuous
  colours: string[]; // hex colours from design tokens
}

export interface EffectConfig {
  audio: {
    hover?: AudioCue;
    select?: AudioCue;
    loop?: AudioCue;
    deselect?: AudioCue;
  };
  vfx: {
    idle?: VFXConfig;
    hover?: VFXConfig;
    active?: VFXConfig[];
  };
}

/**
 * Spice Level Effects
 * Progressively more intense flames, embers, and sizzle sounds
 */
export const spiceLevelEffects: Record<NonNullable<SpiceLevel>, EffectConfig> = {
  0: {
    // No heat - calm
    audio: {},
    vfx: {},
  },
  1: {
    // Mild - subtle ember glow
    audio: {
      hover: {
        src: '/audio/ambience/sizzle-low.mp3',
        volume: 0.15,
        duration: 2500,
      },
    },
    vfx: {
      hover: {
        type: 'ember',
        intensity: 'low',
        particleCount: 8,
        particleCountMobile: 4,
        duration: 3000,
        colours: ['#F9D745', '#E6BA1E'], // Gold 400, 500
      },
    },
  },
  2: {
    // Medium - intermittent flames
    audio: {
      hover: {
        src: '/audio/ambience/sizzle-med.ogg',
        volume: 0.2,
        duration: 2500,
      },
      select: {
        src: '/audio/oneshot/chilli-pop.ogg',
        volume: 0.25,
        duration: 600,
      },
    },
    vfx: {
      hover: {
        type: 'ember',
        intensity: 'medium',
        particleCount: 12,
        particleCountMobile: 6,
        colours: ['#F87171', '#E74C3C'], // Chilli 400, 500
      },
      active: [
        {
          type: 'flame',
          intensity: 'low',
          particleCount: 15,
          particleCountMobile: 8,
          duration: 4000,
          colours: ['#F9D745', '#F87171', '#E74C3C'], // Gold→Chilli gradient
        },
      ],
    },
  },
  3: {
    // Hot - lively flames
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.3,
        duration: 700,
      },
      loop: {
        src: '/audio/ambience/crackle-ember.ogg',
        volume: 0.18,
        loop: true,
        duration: 2000,
        fadeIn: 300,
        fadeOut: 250,
      },
    },
    vfx: {
      hover: {
        type: 'ember',
        intensity: 'high',
        particleCount: 20,
        particleCountMobile: 10,
        colours: ['#F87171', '#E74C3C', '#C92A2A'], // Chilli 400, 500, 600
      },
      active: [
        {
          type: 'flame',
          intensity: 'medium',
          particleCount: 25,
          particleCountMobile: 12,
          colours: ['#F9D745', '#F87171', '#E74C3C'],
        },
        {
          type: 'ember',
          intensity: 'medium',
          particleCount: 15,
          particleCountMobile: 8,
          colours: ['#E74C3C', '#C92A2A'],
        },
      ],
    },
  },
};

/**
 * Ingredient-Based Effects
 * Triggered by specific ingredients detected in dish name/description
 */
export const ingredientEffects: Record<string, EffectConfig> = {
  water: {
    // For seafood (prawns, fish, squid)
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.2,
        duration: 600,
      },
    },
    vfx: {
      active: [
        {
          type: 'water',
          intensity: 'medium',
          particleCount: 20,
          particleCountMobile: 10,
          duration: 2500,
          colours: ['#7DD3FC', '#38BDF8', '#0EA5E9'], // Sky blue water colours
        },
      ],
    },
  },
  coconut: {
    // For coconut milk/cream dishes
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.18,
        duration: 500,
      },
    },
    vfx: {
      active: [
        {
          type: 'coconut',
          intensity: 'low',
          particleCount: 15,
          particleCountMobile: 8,
          duration: 3000,
          colours: ['#FAFAF9', '#F5F5F4', '#E7E5E4'], // White/cream colours
        },
      ],
    },
  },
  oil: {
    // For fried/crispy dishes
    audio: {
      select: {
        src: '/audio/ambience/sizzle-med.ogg',
        volume: 0.15,
        duration: 800,
      },
    },
    vfx: {
      active: [
        {
          type: 'oil',
          intensity: 'low',
          particleCount: 12,
          particleCountMobile: 6,
          duration: 2000,
          colours: ['#F9D745', '#E6BA1E', '#D4AF37'], // Golden oil colours
        },
      ],
    },
  },
  steam: {
    // For steamed dishes
    audio: {
      loop: {
        src: '/audio/ambience/bubble-light.ogg',
        volume: 0.1,
        loop: true,
        duration: 2000,
        fadeIn: 400,
        fadeOut: 250,
      },
    },
    vfx: {
      active: [
        {
          type: 'steam',
          intensity: 'low',
          particleCount: 18,
          particleCountMobile: 9,
          colours: ['#FAFAF9', '#E7E5E4'],
        },
      ],
    },
  },
  sparkle: {
    // For crispy dishes
    audio: {},
    vfx: {
      active: [
        {
          type: 'sparkle',
          intensity: 'low',
          particleCount: 15,
          particleCountMobile: 8,
          duration: 2500,
          colours: ['#F9D745', '#E6BA1E'],
        },
      ],
    },
  },
};

/**
 * Dietary Tag Effects
 * Vegetarian/vegan = leafy swirl, gluten-free = sparkle
 */
export const dietaryEffects: Record<DietaryTag, EffectConfig> = {
  vegetarian: {
    audio: {
      select: {
        src: '/audio/oneshot/leaf-rustle.ogg',
        volume: 0.2,
        duration: 600,
      },
    },
    vfx: {
      active: [
        {
          type: 'leaf',
          intensity: 'low',
          particleCount: 12,
          particleCountMobile: 6,
          duration: 3500,
          colours: ['#4FB881', '#2A9D5F', '#1E7D4A'], // Jade 400, 500, 600
        },
      ],
    },
  },
  vegan: {
    audio: {
      select: {
        src: '/audio/oneshot/leaf-rustle.ogg',
        volume: 0.2,
        duration: 600,
      },
    },
    vfx: {
      active: [
        {
          type: 'leaf',
          intensity: 'medium',
          particleCount: 18,
          particleCountMobile: 9,
          duration: 3500,
          colours: ['#87D4A8', '#4FB881', '#2A9D5F'], // Jade 300, 400, 500
        },
      ],
    },
  },
  'gluten-free': {
    audio: {},
    vfx: {
      active: [
        {
          type: 'sparkle',
          intensity: 'low',
          particleCount: 10,
          particleCountMobile: 5,
          duration: 2000,
          colours: ['#E6BA1E', '#D4AF37'], // Gold 500, 600
        },
      ],
    },
  },
};

/**
 * Category Effects
 * Optional ambient layer for category context
 */
export const categoryEffects: Record<CategorySlug, EffectConfig> = {
  'ivory-special': {
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.25,
        duration: 700,
      },
    },
    vfx: {
      active: [
        {
          type: 'glow',
          intensity: 'medium',
          particleCount: 1,
          particleCountMobile: 1,
          colours: ['#D4AF37'], // Gold 600 - signature gold halo
        },
      ],
    },
  },
  entree: {
    audio: {
      select: {
        src: '/audio/ui/click-soft.ogg',
        volume: 0.2,
        duration: 400,
      },
    },
    vfx: {},
  },
  salad: {
    audio: {
      select: {
        src: '/audio/oneshot/leaf-rustle.ogg',
        volume: 0.18,
        duration: 600,
      },
    },
    vfx: {
      hover: {
        type: 'leaf',
        intensity: 'low',
        particleCount: 6,
        particleCountMobile: 3,
        duration: 2500,
        colours: ['#87D4A8', '#4FB881'], // Jade 300, 400
      },
    },
  },
  bbq: {
    audio: {
      loop: {
        src: '/audio/ambience/crackle-ember.ogg',
        volume: 0.15,
        loop: true,
        duration: 2000,
        fadeIn: 400,
        fadeOut: 250,
      },
    },
    vfx: {
      idle: {
        type: 'ember',
        intensity: 'low',
        particleCount: 10,
        particleCountMobile: 5,
        colours: ['#F9D745', '#E6BA1E'], // Gold 400, 500
      },
    },
  },
  soup: {
    audio: {
      loop: {
        src: '/audio/ambience/bubble-light.ogg',
        volume: 0.12,
        loop: true,
        duration: 2000,
        fadeIn: 500,
        fadeOut: 300,
      },
    },
    vfx: {
      active: [
        {
          type: 'steam',
          intensity: 'low',
          particleCount: 15,
          particleCountMobile: 8,
          colours: ['#FAFAF9', '#E7E5E4'], // Charcoal 50, 200 (white steam)
        },
      ],
    },
  },
  'stir-fry': {
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.22,
        duration: 700,
      },
    },
    vfx: {},
  },
  curry: {
    audio: {
      select: {
        src: '/audio/oneshot/mortar-tap.ogg',
        volume: 0.25,
        duration: 400,
      },
    },
    vfx: {
      active: [
        {
          type: 'steam',
          intensity: 'low',
          particleCount: 12,
          particleCountMobile: 6,
          colours: ['#F9D745', '#E6BA1E'], // Gold-tinted steam
        },
      ],
    },
  },
  'noodle-rice': {
    audio: {
      select: {
        src: '/audio/oneshot/whoosh-open.ogg',
        volume: 0.2,
        duration: 700,
      },
    },
    vfx: {},
  },
  'side-dish': {
    audio: {
      select: {
        src: '/audio/ui/click-soft.ogg',
        volume: 0.18,
        duration: 400,
      },
    },
    vfx: {},
  },
  dessert: {
    audio: {
      select: {
        src: '/audio/oneshot/chime-delicate.ogg',
        volume: 0.22,
        duration: 500,
      },
    },
    vfx: {
      active: [
        {
          type: 'sparkle',
          intensity: 'low',
          particleCount: 15,
          particleCountMobile: 8,
          duration: 2500,
          colours: ['#E6BA1E', '#D4AF37', '#B08A1C'], // Gold sparkles
        },
      ],
    },
  },
};

/**
 * UI Sound Effects
 * Subtle feedback for interactions
 */
export const uiEffects = {
  hover: {
    src: '/audio/ui/hover-subtle.ogg',
    volume: 0.1,
    duration: 200,
  },
  click: {
    src: '/audio/ui/click-soft.ogg',
    volume: 0.15,
    duration: 300,
  },
  addToCart: {
    src: '/audio/oneshot/chime-delicate.ogg',
    volume: 0.25,
    duration: 500,
  },
} as const;

/**
 * Performance Configuration
 * Budget limits and device-specific settings
 */
export const performanceConfig = {
  maxConcurrentAudio: 3,
  maxConcurrentVfx: 2,
  maxParticlesTotal: 300,
  targetFps: 60,

  // Device detection thresholds
  deviceTiers: {
    low: {
      // Mobile, older devices
      particleMultiplier: 0.5,
      maxConcurrentVfx: 1,
      disableLoops: true,
    },
    medium: {
      // Standard mobile, mid-range desktop
      particleMultiplier: 1.0,
      maxConcurrentVfx: 2,
      disableLoops: false,
    },
    high: {
      // High-end desktop
      particleMultiplier: 1.2,
      maxConcurrentVfx: 3,
      disableLoops: false,
    },
  },

  // Lazy loading
  preloadTopDishesPerCategory: 3,

  // Effect durations (max before auto-cleanup)
  maxEffectDuration: 5000,
  idleTimeout: 3000,
} as const;

/**
 * Default Settings
 * User preference defaults
 */
export const defaultSettings = {
  soundEnabled: false, // Respects autoplay policy
  motionEnabled: true,
  volume: 0.4, // 40% default
  prefersReducedMotion: false, // Detected from system
} as const;

/**
 * Merge dish effects based on properties
 * Combines spice, dietary, and category effects with priority order
 */
export function getDishEffects(
  spiceLevel: SpiceLevel,
  dietaryTags: DietaryTag[],
  categorySlug: CategorySlug
): EffectConfig {
  const effects: EffectConfig = {
    audio: {},
    vfx: {},
  };

  // Priority 1: Spice level (most prominent)
  if (spiceLevel !== null && spiceLevel > 0) {
    const spiceEffect = spiceLevelEffects[spiceLevel];
    effects.audio = { ...effects.audio, ...spiceEffect.audio };
    effects.vfx = { ...effects.vfx, ...spiceEffect.vfx };
  }

  // Priority 2: Dietary tags (additive)
  dietaryTags.forEach((tag) => {
    const dietEffect = dietaryEffects[tag];
    if (dietEffect) {
      // Merge audio (prefer existing)
      effects.audio = { ...dietEffect.audio, ...effects.audio };

      // Merge VFX (combine arrays)
      if (dietEffect.vfx.active) {
        if (!effects.vfx.active) effects.vfx.active = [];
        effects.vfx.active = [...effects.vfx.active, ...dietEffect.vfx.active];
      }
    }
  });

  // Priority 3: Category (fill gaps only)
  const categoryEffect = categoryEffects[categorySlug];
  if (!effects.audio.select && categoryEffect.audio.select) {
    effects.audio.select = categoryEffect.audio.select;
  }
  if (!effects.audio.loop && categoryEffect.audio.loop) {
    effects.audio.loop = categoryEffect.audio.loop;
  }
  if (!effects.vfx.idle && categoryEffect.vfx.idle) {
    effects.vfx.idle = categoryEffect.vfx.idle;
  }
  if (!effects.vfx.hover && categoryEffect.vfx.hover) {
    effects.vfx.hover = categoryEffect.vfx.hover;
  }

  return effects;
}
