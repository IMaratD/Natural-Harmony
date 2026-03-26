export interface Nutrients {
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  }
   
  export interface FoodVariant {
    id: string;
    name: string;
    nutrientsPer100g: Nutrients;
    image?: string;
  }

  export interface FoodProduct {
    id: string;
    name: string; // "Яблоко"
    category: string;
    variants: FoodVariant[];

    searchTerms?: string[]; // "яблоко", "apple", "фрукт", "сладкое"
    image?: string;
  }
   