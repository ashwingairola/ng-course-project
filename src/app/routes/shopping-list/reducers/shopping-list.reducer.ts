import { createReducer, on } from '@ngrx/store';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ingredientAdded } from '../actions/shopping-list.actions';

const initialState = {
	ingredients: [
		new Ingredient('Secret Formula', 1),
		new Ingredient('Tomato Slice', 2),
		new Ingredient('Cheese Slice', 2)
	]
};

export const shoppingListReducer = createReducer(
	initialState,
	on(ingredientAdded, (state, action) => ({
		...state,
		ingredients: [...state.ingredients, action]
	}))
);
