import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/state.model';
import { Ingredient } from '../../../models/ingredient.model';
import * as shoppingListActions from '../store/actions/shopping-list.actions';
import {
	selectIngredients,
	selectSelectedIngredient
} from '../store/selectors/shopping-list.selectors';

@Injectable({
	providedIn: 'root'
})
export class ShoppingListService {
	readonly ingredients$ = this.store.select(selectIngredients);

	readonly selectedIngredient$: Observable<Ingredient | null> =
		this.store.select(selectSelectedIngredient);

	constructor(private store: Store<AppState>) {}

	addIngredient(ingredient: Ingredient) {
		this.store.dispatch(shoppingListActions.ingredientAdded(ingredient));
	}

	addIngredients(newIngredients: Ingredient[]) {
		this.store.dispatch(
			shoppingListActions.ingredientsAdded({ newIngredients })
		);
	}

	selectIngredientForEdit(ingredientId: number) {
		this.store.dispatch(
			shoppingListActions.ingredientSelected({ ingredientId })
		);
	}

	updateIngredient(ingredientId: number, newIngredient: Ingredient) {
		this.store.dispatch(
			shoppingListActions.ingredientUpdated({ ingredientId, newIngredient })
		);
	}

	deleteIngredient(ingredientId: number) {
		this.store.dispatch(
			shoppingListActions.ingredientDeleted({ ingredientId })
		);
	}

	clearSelectedIngredient() {
		this.store.dispatch(shoppingListActions.selectedIngredientCleared());
	}
}
