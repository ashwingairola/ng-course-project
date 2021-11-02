import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';

export const ingredientAdded = createAction(
	'[Shopping List] INGREDIENT_ADDED',
	props<Ingredient>()
);

export const ingredientsAdded = createAction(
	'[Shopping List] INGREDIENTS_ADDED',
	props<{ newIngredients: Ingredient[] }>()
);

export const ingredientSelected = createAction(
	'[Shopping List] INGREDIENT_SELECTED',
	props<{ ingredientId: number | null }>()
);

export const ingredientUpdated = createAction(
	'[Shopping List] INGREDIENT_UPDATED',
	props<{ ingredientId: number; newIngredient: Ingredient }>()
);

export const ingredientDeleted = createAction(
	'[Shopping List] INGREDIENT_DELETED',
	props<{ ingredientId: number }>()
);

export const selectedIngredientCleared = createAction(
	'[Shopping List] SELECTED_INGREDIENT_CLEARED'
);
