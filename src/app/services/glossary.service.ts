import { Injectable } from "@angular/core";
// import { FoodProduct } from "../models/food.model";
import { GLOSSARY } from "../../assets/data/glossary.data";

@Injectable({ providedIn: 'root' })
export class GlossaryService {

//   private items: GlossaryItem[] = GLOSSARY;
  
//   getItems() {
//     return [...this.items];
//   }
  
getAll() {
    return GLOSSARY;
  }
  
  search(term: string) {
    return GLOSSARY.filter(item =>
      item.term.toLowerCase().includes(term.toLowerCase())
    );
  }
}