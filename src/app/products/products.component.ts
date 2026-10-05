import { FoodProduct, FoodVariant } from "../models/food.model";
import { Component, OnInit } from "@angular/core";
import { MealService } from "../services/meal.service";
import { FoodService } from "../services/food.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
  })
  export class ProductsComponent implements OnInit {
  
    products: FoodProduct[] = [];
    selectedProduct?: FoodProduct;
    selectedVariant?: FoodVariant;
    selectedGrams = 100;
    showInfoModal = false;
    showAddModal = false;

    openInfo(product: FoodProduct): void {
      this.selectedProduct = product;
      this.showInfoModal = true;
    }
    
    closeInfo(): void {
      this.showInfoModal = false;
      this.selectedProduct = undefined;
    }

    openAdd(product: FoodProduct): void {
      this.selectedProduct = product;
      this.selectedVariant = product.variants[0];
      this.selectedGrams = 100;
    
      this.showAddModal = true;
    }
    
    closeAdd(): void {
      this.showAddModal = false;
      this.selectedProduct = undefined;
      this.selectedVariant = undefined;
    }

    constructor(
      private foodService: FoodService,
      private mealService: MealService
    ) {}
  

private searchSubject = new Subject<string>();
ngOnInit() {
    this.foodService.getFoods().subscribe((data: FoodProduct[]) => {
      this.products = data;
    });
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.searchTerm = value;
      });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }
  
    openDetails(product: FoodProduct) {
        this.selectedProduct = product;
        this.selectedVariant = product.variants[0];
        this.selectedGrams = 100;
    }

    selectVariant(variant: FoodVariant): void {
        this.selectedVariant = variant;
    }
  

    normalize(value: string): string {
        return value.toLowerCase().trim();
    }

    // addToMeal(
    //   product: FoodProduct,
    //   variant: FoodVariant,
    //   grams: number
    // ) {
    //   this.mealService.addItem(
    //     product,
    //     variant,
    //     grams
    //   );
    // }
    
    addSelectedToMeal(): void {
      if (!this.selectedProduct || !this.selectedVariant) {
        return;
      }
    
      this.mealService.addItem(
        this.selectedProduct,
        this.selectedVariant,
        this.selectedGrams
      );

      this.closeAdd();
    }

    get selectedNutrition() {
      if (!this.selectedVariant) {
        return null;
      }
    
      return this.mealService.calculateNutrition(
        this.selectedVariant,
        this.selectedGrams
      );
    }
    
    searchTerm: string = '';
    selectedCategory: string = 'Все';
    
    get categories(): string[] {
      const all = this.products.map(p => p.category);
      return ['Все', ...new Set(all)];
    }
    
  get filteredProducts(): FoodProduct[] {
    const term = this.normalize(this.searchTerm);
  
    return this.products.filter(p => {
  
      const inName = this.normalize(p.name).includes(term);
  
      const inTags = p.searchTerms?.some(t =>
        this.normalize(t).includes(term)
      );
  
      const matchesSearch = !term || inName || inTags;
  
      const matchesCategory =
        this.selectedCategory === 'Все' ||
        p.category === this.selectedCategory;
  
      return matchesSearch && matchesCategory;
    });
  }
  showSuggestions = true;
  
  selectSuggestion(product: FoodProduct) {
    this.searchTerm = product.name;
    this.showSuggestions = false;
  }

  get suggestions(): string[] {
    const term = this.normalize(this.searchTerm);
    if (!term) return [];
    
    const allTerms = this.products.flatMap(p => [
      p.name,
      ...(p.searchTerms || [])
    ]);
  
    return [...new Set(allTerms)]
      .filter(t => this.normalize(t).includes(term))
      .slice(0, 5);
  }
  
  }