import express from 'express';

const router = express.Router();

// Simple recipe database (in production, use an API like Spoonacular or Edamam)
const recipes = {
  veg: [
    {
      id: 1,
      name: '🥗 Green Salad Bowl',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      ingredients: ['Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Carrots', 'Olive oil', 'Lemon juice'],
      steps: [
        'Wash all vegetables thoroughly',
        'Chop mixed greens into bite-sized pieces',
        'Slice cherry tomatoes in half',
        'Dice cucumber and carrots',
        'Mix all vegetables in a large bowl',
        'Drizzle with olive oil and lemon juice',
        'Toss gently and serve fresh'
      ],
      calories: 120
    },
    {
      id: 2,
      name: '🥦 Steamed Broccoli with Garlic',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400',
      ingredients: ['Broccoli florets', 'Garlic cloves', 'Olive oil', 'Salt', 'Pepper'],
      steps: [
        'Wash and cut broccoli into florets',
        'Steam broccoli for 5-7 minutes until tender',
        'Heat olive oil in a pan',
        'Add minced garlic and sauté until golden',
        'Add steamed broccoli to the pan',
        'Season with salt and pepper',
        'Toss and serve hot'
      ],
      calories: 55
    },
    {
      id: 3,
      name: '🍅 Tomato Basil Pasta',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      ingredients: ['Pasta', 'Fresh tomatoes', 'Basil leaves', 'Garlic', 'Olive oil', 'Parmesan cheese'],
      steps: [
        'Cook pasta according to package instructions',
        'Blanch tomatoes and remove skin',
        'Heat olive oil in a pan, add garlic',
        'Add diced tomatoes and cook until soft',
        'Toss cooked pasta with tomato sauce',
        'Garnish with fresh basil and parmesan',
        'Serve immediately'
      ],
      calories: 320
    },
    {
      id: 4,
      name: '🥕 Carrot Ginger Soup',
      category: 'veg',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
      ingredients: ['Carrots', 'Ginger', 'Onion', 'Vegetable broth', 'Coconut milk', 'Turmeric'],
      steps: [
        'Peel and chop carrots and onions',
        'Grate fresh ginger',
        'Sauté onions until translucent',
        'Add carrots and ginger, cook for 5 minutes',
        'Add vegetable broth and simmer for 20 minutes',
        'Blend until smooth',
        'Stir in coconut milk and turmeric, serve hot'
      ],
      calories: 95
    }
  ],
  'non-veg': [
    {
      id: 5,
      name: '🍗 Grilled Chicken Breast',
      category: 'non-veg',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
      ingredients: ['Chicken breast', 'Olive oil', 'Lemon', 'Garlic', 'Herbs', 'Salt', 'Pepper'],
      steps: [
        'Marinate chicken with olive oil, lemon juice, and herbs',
        'Let it marinate for at least 30 minutes',
        'Preheat grill to medium-high heat',
        'Grill chicken for 6-7 minutes per side',
        'Check internal temperature reaches 165°F',
        'Let rest for 5 minutes before slicing',
        'Serve with vegetables or salad'
      ],
      calories: 231
    },
    {
      id: 6,
      name: '🥚 Scrambled Eggs with Spinach',
      category: 'non-veg',
      image: 'https://images.unsplash.com/photo-1630569267621-6a8e1c7c70c9?w=400',
      ingredients: ['Eggs', 'Spinach', 'Olive oil', 'Onion', 'Salt', 'Pepper'],
      steps: [
        'Heat olive oil in a pan',
        'Sauté chopped onion until soft',
        'Add fresh spinach and cook until wilted',
        'Beat eggs in a bowl',
        'Pour eggs into the pan',
        'Scramble gently over low heat',
        'Season with salt and pepper, serve hot'
      ],
      calories: 155
    },
    {
      id: 7,
      name: '🐟 Baked Salmon with Herbs',
      category: 'non-veg',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      ingredients: ['Salmon fillet', 'Fresh dill', 'Lemon', 'Olive oil', 'Garlic', 'Salt'],
      steps: [
        'Preheat oven to 400°F',
        'Place salmon on a baking sheet',
        'Drizzle with olive oil and lemon juice',
        'Sprinkle with chopped dill and minced garlic',
        'Season with salt',
        'Bake for 12-15 minutes until flaky',
        'Serve with lemon wedges'
      ],
      calories: 206
    },
    {
      id: 8,
      name: '🍲 Chicken Vegetable Stir-Fry',
      category: 'non-veg',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      ingredients: ['Chicken strips', 'Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic', 'Sesame oil'],
      steps: [
        'Cut chicken into strips',
        'Heat sesame oil in a wok',
        'Stir-fry chicken until cooked through',
        'Add minced ginger and garlic',
        'Add mixed vegetables and stir-fry',
        'Season with soy sauce',
        'Serve hot over rice or noodles'
      ],
      calories: 285
    }
  ]
};

// Get recipes by category
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;

    let filteredRecipes = [];

    if (category === 'veg') {
      filteredRecipes = recipes.veg;
    } else if (category === 'non-veg') {
      filteredRecipes = recipes['non-veg'];
    } else {
      filteredRecipes = [...recipes.veg, ...recipes['non-veg']];
    }

    // Simple search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchLower))
      );
    }

    res.json(filteredRecipes);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  try {
    const allRecipes = [...recipes.veg, ...recipes['non-veg']];
    const recipe = allRecipes.find(r => r.id === parseInt(req.params.id));

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

