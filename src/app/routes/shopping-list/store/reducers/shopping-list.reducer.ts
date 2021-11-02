import { createReducer, on } from '@ngrx/store';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListState } from 'src/app/models/state.model';
import * as shoppingListActions from '../actions/shopping-list.actions';

const initialState: ShoppingListState = {
	ingredients: [
		new Ingredient('Secret Formula', 1),
		new Ingredient('Tomato Slice', 2),
		new Ingredient('Cheese Slice', 2)
	],
	selectedIngredient: null
};

export const shoppingListReducer = createReducer(
	initialState,
	on(shoppingListActions.ingredientAdded, (state, action) => ({
		...state,
		ingredients: [...state.ingredients, action]
	})),
	on(shoppingListActions.ingredientsAdded, (state, action) => ({
		...state,
		ingredients: [...state.ingredients, ...action.newIngredients]
	})),
	on(shoppingListActions.ingredientSelected, (state, action) => ({
		...state,
		selectedIngredient: action.ingredientId
	})),
	on(shoppingListActions.ingredientUpdated, (state, action) => {
		const ingredients = state.ingredients;
		const index = ingredients.findIndex(i => i.id === action.ingredientId);

		if (index === -1) {
			return { ...state };
		}

		const updatedIngredient = new Ingredient(
			action.newIngredient.name,
			action.newIngredient.amount
		);
		updatedIngredient.id = action.ingredientId;

		const newIngredients = ingredients.filter(
			ingredient => ingredient.id !== action.ingredientId
		);
		newIngredients.splice(index, 0, updatedIngredient);

		return {
			...state,
			ingredients: newIngredients
		};
	}),
	on(shoppingListActions.ingredientDeleted, (state, action) => ({
		...state,
		ingredients: state.ingredients.filter(
			ingredient => ingredient.id !== action.ingredientId
		)
	})),
	on(shoppingListActions.selectedIngredientCleared, state => ({
		...state,
		selectedIngredient: null
	}))
);
