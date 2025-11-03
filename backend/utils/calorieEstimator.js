// Simple calorie estimation based on food text
// This is a basic implementation. In production, you'd use a proper AI API

const calorieDatabase = {
  'apple': 52,
  'banana': 89,
  'rice': 130,
  'chicken': 165,
  'egg': 70,
  'bread': 79,
  'milk': 42,
  'yogurt': 59,
  'salad': 20,
  'pasta': 131,
  'pizza': 266,
  'burger': 354,
  'soup': 50,
  'fish': 206,
  'vegetable': 25,
  'fruit': 60,
  'meat': 250,
  'cheese': 113,
  'nuts': 607,
  'oats': 389,
};

export const estimateCalories = (foodText) => {
  if (!foodText || typeof foodText !== 'string') {
    return 200; // Default estimate
  }

  const lowerText = foodText.toLowerCase();
  
  // Try to find exact match
  for (const [food, calories] of Object.entries(calorieDatabase)) {
    if (lowerText.includes(food)) {
      return calories;
    }
  }

  // Estimate based on text length and keywords
  let baseCalories = 150;
  
  if (lowerText.includes('fried') || lowerText.includes('deep') || lowerText.includes('crispy')) {
    baseCalories *= 1.5;
  }
  
  if (lowerText.includes('small') || lowerText.includes('little')) {
    baseCalories *= 0.7;
  }
  
  if (lowerText.includes('large') || lowerText.includes('big') || lowerText.includes('jumbo')) {
    baseCalories *= 1.5;
  }

  // Portion estimation based on common serving sizes
  const portionKeywords = {
    'bowl': 1.5,
    'plate': 1.2,
    'cup': 1.0,
    'piece': 0.8,
    'slice': 0.5,
    'serving': 1.0
  };

  for (const [keyword, multiplier] of Object.entries(portionKeywords)) {
    if (lowerText.includes(keyword)) {
      baseCalories *= multiplier;
    }
  }

  return Math.round(baseCalories);
};

// For image-based recognition, you would integrate with an AI service
// This is a placeholder that returns an estimate
export const estimateCaloriesFromImage = async (imageUrl) => {
  // In production, use HuggingFace, OpenAI Vision, or Google Vision API
  // For now, return a random estimate in a typical range
  return {
    foodName: 'Detected Food',
    calories: Math.floor(Math.random() * 400) + 100
  };
};

