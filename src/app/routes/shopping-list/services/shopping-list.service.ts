import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Ingredient } from '../../../models/ingredient.model';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	private _ingredients$ = new BehaviorSubject<Ingredient[]>([]);
	private _selectedIngredient$ = new BehaviorSubject<number | null>(null);

	readonly ingredients$ = this._ingredients$
		.asObservable()
		.pipe(map(ingredients => ingredients.slice()));

	readonly selectedIngredient$: Observable<Ingredient | null> =
		this._selectedIngredient$.asObservable().pipe(
			withLatestFrom(this._ingredients$),
			map(([ingredientId, ingredients]) => {
				const ingredient = ingredients.find(i => i.id === ingredientId);
				return ingredient ? { ...ingredient } : null;
			})
		);

	constructor() {}

	addIngredient(ingredient: Ingredient): boolean {
		const ingredients = this._ingredients$.getValue();
		ingredients.push(ingredient);
		this._ingredients$.next(ingredients);
		return true;
	}

	addIngredients(newIngredients: Ingredient[]) {
		const ingredients = this._ingredients$.getValue();
		ingredients.push(...newIngredients);
		this._ingredients$.next(ingredients);
	}

	selectIngredientForEdit(ingredientId: number) {
		this._selectedIngredient$.next(ingredientId);
	}

	updateIngredient(ingredientId: number, newIngredient: Ingredient): boolean {
		const ingredients = this._ingredients$.value;
		const ingredientToUpdate = ingredients.find(i => i.id === ingredientId);

		if (ingredientToUpdate) {
			const index = ingredients.indexOf(ingredientToUpdate);
			ingredients[index] = newIngredient;
			this._ingredients$.next(ingredients);
			this._selectedIngredient$.next(null);
			return true;
		}

		return false;
	}

	deleteIngredient(ingredientId: number) {
		let ingredients = this._ingredients$.value;
		ingredients = ingredients.filter(
			ingredient => ingredient.id !== ingredientId
		);
		this._ingredients$.next(ingredients);
	}
}
