import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/state.model';

export const selectShoppingList = (state: AppState) => state.shoppingList;

export const selectIngredients = createSelector(
	selectShoppingList,
	shoppingListState => shoppingListState.ingredients
);

export const selectSelectedIngredient = createSelector(
	selectShoppingList,
	({ ingredients, selectedIngredient }) => {
		return ingredients.find(i => i.id === selectedIngredient) || null;
	}
);
