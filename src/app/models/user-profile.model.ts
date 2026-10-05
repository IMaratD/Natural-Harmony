  export interface UserProfile {
    name: string;
    isDiabetic: boolean;
  
    sex: 'male' | 'female';
    age: number;
    weight: number; // кг
    height: number; // см
  
    activityLevel: 'low' | 'medium' | 'high';
  
    goal?: 'lose' | 'maintain' | 'gain';
  }