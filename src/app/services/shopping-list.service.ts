import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	private _ingredients$ = new BehaviorSubject<Ingredient[]>([]);

	readonly ingredients$ = this._ingredients$
		.asObservable()
		.pipe(map(ingredients => ingredients.slice()));

	constructor() {
		this._ingredients$.next([
			new Ingredient('Secret Formula', 1),
			new Ingredient('Tomato Slice', 2),
			new Ingredient('Cheese Slice', 2)
		]);
	}

	addIngredient(ingredient: Ingredient) {
		const ingredients = this._ingredients$.getValue();
		ingredients.push(ingredient);
		this._ingredients$.next(ingredients);
	}

	addIngredients(newIngredients: Ingredient[]) {
		const ingredients = this._ingredients$.getValue();
		ingredients.push(...newIngredients);
		this._ingredients$.next(ingredients);
	}
}
