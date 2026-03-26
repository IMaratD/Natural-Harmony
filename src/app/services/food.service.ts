import { Injectable } from "@angular/core";
import { FoodProduct } from "../models/food.model";
import { FOOD_DB } from "../../assets/data/food.data";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FoodService {

    constructor(private http: HttpClient) {}
    
    getFoods() {
      return this.http.get<FoodProduct[]>('assets/data/foods.json');
    }
    private products: FoodProduct[] = FOOD_DB;
    

  getAll() {
    return this.products;
  }

  getById(id: string) {
    return this.products.find(p => p.id === id);
  }
}
