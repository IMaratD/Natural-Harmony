import { FoodProduct } from "../../app/models/food.model";

export const FOOD_DB: FoodProduct[] = [
    {
      id: 'apple',
      name: 'Яблоко',
      category: 'Фрукты',
      image: 'assets/foods/apple.jpg',
      searchTerms: ['яблоко', 'apple', 'фрукт', 'сладкое'],
      variants: [
        {
          id: 'apple-sweet',
          name: 'Сладкое',
          nutrientsPer100g: { protein: 0.4, fat: 0.2, carbs: 13, fiber: 2.2 }
        },
        {
          id: 'apple-sour',
          name: 'Кислое',
          nutrientsPer100g: { protein: 0.3, fat: 0.2, carbs: 10, fiber: 2.8 }
        }
      ]
    },
    {
      id: 'rice',
      name: 'Рис',
      category: 'Крупы',
      image: 'assets/foods/rice.jpg',
      searchTerms: ['рис', 'крупа', 'углеводы'],
      variants: [
        {
          id: 'rice-white',
          name: 'Белый',
          nutrientsPer100g: { protein: 7, fat: 0.6, carbs: 78, fiber: 0.4 }
        },
        {
          id: 'rice-brown',
          name: 'Бурый',
          nutrientsPer100g: { protein: 7.5, fat: 2.7, carbs: 77, fiber: 3.5 }
        }
      ]
    }
  ];