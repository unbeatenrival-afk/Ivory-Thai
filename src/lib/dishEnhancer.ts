/**
 * Dish Enhancer
 * Analyzes dish names and descriptions to add emojis and enhanced descriptions
 */

export interface DishEnhancement {
  emojis: string[];
  enhancedDescription: string;
  ingredients: string[];
  effects: string[]; // Additional VFX to trigger
}

/**
 * Ingredient to emoji mapping
 */
const ingredientEmojis: Record<string, string> = {
  // Proteins
  duck: '🦆',
  chicken: '🐔',
  beef: '🥩',
  pork: '🐖',
  lamb: '🐑',
  prawns: '🦐',
  shrimp: '🦐',
  fish: '🐟',
  barramundi: '🐟',
  salmon: '🐟',
  squid: '🦑',
  crab: '🦀',
  seafood: '🦐',
  egg: '🥚',
  tofu: '🧈',

  // Vegetables
  vegetables: '🥬',
  greens: '🥬',
  broccoli: '🥦',
  carrot: '🥕',
  tomato: '🍅',
  onion: '🧅',
  garlic: '🧄',
  chilli: '🌶️',
  pepper: '🫑',
  eggplant: '🍆',
  mushroom: '🍄',
  corn: '🌽',
  peas: '🫛',
  beans: '🫘',
  cabbage: '🥬',
  lettuce: '🥗',
  cucumber: '🥒',

  // Herbs & Aromatics
  basil: '🌿',
  coriander: '🌿',
  cilantro: '🌿',
  mint: '🌿',
  lemongrass: '🌿',
  ginger: '🫚',

  // Fruits
  pineapple: '🍍',
  mango: '🥭',
  lychee: '🥭',
  coconut: '🥥',
  lime: '🍋',
  lemon: '🍋',
  papaya: '🥭',

  // Noodles & Rice
  noodles: '🍜',
  noodle: '🍜',
  rice: '🍚',
  'fried rice': '🍛',

  // Sauces & Flavors
  curry: '🍛',
  'curry sauce': '🍛',
  'red curry': '🍛',
  'green curry': '🍛',
  'yellow curry': '🍛',
  'massaman curry': '🍛',
  'panang curry': '🍛',
  soy: '🥫',
  'oyster sauce': '🥫',
  'fish sauce': '🥫',
  tamarind: '🥫',

  // Cooking Methods
  crispy: '✨',
  fried: '🔥',
  grilled: '🔥',
  steamed: '💨',
  bbq: '🔥',
  stir: '🥘',

  // Descriptors
  spicy: '🔥',
  hot: '🔥',
  sweet: '🍯',
  sour: '🍋',
  fresh: '🌿',
};

/**
 * Effect triggers based on ingredients
 */
const ingredientEffects: Record<string, string> = {
  coconut: 'coconut',
  prawns: 'water',
  shrimp: 'water',
  fish: 'water',
  barramundi: 'water',
  squid: 'water',
  seafood: 'water',
  steamed: 'steam',
  soup: 'steam',
  crispy: 'sparkle',
  fried: 'oil',
};

/**
 * Enhanced descriptions based on ingredients and cooking methods
 */
const descriptionEnhancements: Record<string, string> = {
  duck: 'succulent roasted duck',
  'crispy duck': 'perfectly crisped duck with golden skin',
  chicken: 'tender chicken pieces',
  beef: 'premium beef slices',
  pork: 'juicy pork',
  lamb: 'tender lamb',
  prawns: 'fresh tiger prawns',
  shrimp: 'plump shrimp',
  fish: 'fresh fish fillet',
  barramundi: 'Australian barramundi',

  pineapple: 'sweet tropical pineapple chunks',
  mango: 'ripe mango slices',
  lychee: 'delicate lychee fruit',
  coconut: 'creamy coconut milk',
  tomato: 'vine-ripened tomatoes',

  basil: 'aromatic Thai basil leaves',
  coriander: 'fresh coriander',
  lemongrass: 'fragrant lemongrass',
  ginger: 'fresh ginger',
  chilli: 'Thai chillies',
  garlic: 'crispy fried garlic',

  'red curry': 'rich red curry sauce with coconut cream',
  'green curry': 'aromatic green curry paste with Thai herbs',
  'yellow curry': 'mild yellow curry with turmeric',
  'panang curry': 'thick Panang curry with peanuts',
  'massaman curry': 'slow-cooked Massaman curry with potatoes',

  noodles: 'fresh rice noodles',
  'rice noodles': 'wide rice noodles',
  'egg noodles': 'handmade egg noodles',
  rice: 'fragrant jasmine rice',
  'fried rice': 'wok-tossed fried rice',

  vegetables: 'crisp seasonal vegetables',
  greens: 'Asian greens',
};

/**
 * Analyze dish and generate enhancements
 */
export function enhanceDish(name: string, description: string): DishEnhancement {
  const lowerName = name.toLowerCase();
  const lowerDesc = description.toLowerCase();
  const fullText = `${lowerName} ${lowerDesc}`;

  const emojis: string[] = [];
  const ingredients: string[] = [];
  const effects: string[] = [];
  let enhancedDesc = description;

  // Find all matching ingredients
  Object.entries(ingredientEmojis).forEach(([ingredient, emoji]) => {
    if (fullText.includes(ingredient.toLowerCase())) {
      if (!emojis.includes(emoji)) {
        emojis.push(emoji);
      }
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
  });

  // Find effect triggers
  Object.entries(ingredientEffects).forEach(([ingredient, effect]) => {
    if (fullText.includes(ingredient.toLowerCase())) {
      if (!effects.includes(effect)) {
        effects.push(effect);
      }
    }
  });

  // Enhance description with more details
  if (ingredients.length > 0) {
    // Parse existing description to identify ingredients
    const words = description.split(/[,\s]+/);
    const enhancedParts: string[] = [];

    words.forEach((word) => {
      const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
      let enhanced = word;

      // Check if this word can be enhanced
      Object.entries(descriptionEnhancements).forEach(([key, enhancement]) => {
        if (lowerWord.includes(key.toLowerCase().replace(/\s/g, ''))) {
          enhanced = enhancement;
        }
      });

      enhancedParts.push(enhanced);
    });

    // Add context based on dish type
    if (fullText.includes('curry')) {
      enhancedDesc += ' Served with steamed jasmine rice. A perfect balance of aromatic Thai spices and creamy coconut.';
    } else if (fullText.includes('noodle') || fullText.includes('pad thai')) {
      enhancedDesc += ' Wok-tossed to perfection with authentic Thai flavours.';
    } else if (fullText.includes('soup')) {
      enhancedDesc += ' Served piping hot in a traditional Thai clay pot.';
    } else if (fullText.includes('salad')) {
      enhancedDesc += ' Tossed fresh to order with our homemade lime dressing.';
    } else if (fullText.includes('fried rice')) {
      enhancedDesc += ' Cooked in a blazing wok for that signature smoky flavour.';
    } else if (fullText.includes('spring roll') || fullText.includes('dumpling')) {
      enhancedDesc += ' Served with our house-made dipping sauce.';
    } else if (fullText.includes('grilled') || fullText.includes('bbq')) {
      enhancedDesc += ' Chargrilled over open flame for maximum flavour.';
    }

    // Add chef recommendation note if it's a signature dish
    if (lowerDesc.includes('chef') || lowerDesc.includes('recommended') || lowerDesc.includes('signature')) {
      enhancedDesc += ' ⭐ Chef\'s Recommendation!';
    }
  }

  return {
    emojis,
    enhancedDescription: enhancedDesc,
    ingredients,
    effects,
  };
}

/**
 * Get primary emoji for dish (first/most relevant)
 */
export function getPrimaryEmoji(name: string, description: string): string {
  const enhancement = enhanceDish(name, description);

  // Priority order: protein > special ingredient > cooking method
  const text = `${name} ${description}`.toLowerCase();

  // Check proteins first
  if (text.includes('duck')) return '🦆';
  if (text.includes('chicken')) return '🐔';
  if (text.includes('beef')) return '🥩';
  if (text.includes('pork')) return '🐖';
  if (text.includes('lamb')) return '🐑';
  if (text.includes('prawn') || text.includes('shrimp')) return '🦐';
  if (text.includes('fish') || text.includes('barramundi')) return '🐟';
  if (text.includes('squid')) return '🦑';
  if (text.includes('crab')) return '🦀';
  if (text.includes('tofu')) return '🧈';

  // Check dish type
  if (text.includes('curry')) return '🍛';
  if (text.includes('noodle')) return '🍜';
  if (text.includes('rice')) return '🍚';
  if (text.includes('soup')) return '🍲';
  if (text.includes('salad')) return '🥗';
  if (text.includes('spring roll') || text.includes('dumpling')) return '🥟';
  if (text.includes('satay')) return '🍢';

  // Fallback to first emoji or generic
  return enhancement.emojis[0] || '🍽️';
}
