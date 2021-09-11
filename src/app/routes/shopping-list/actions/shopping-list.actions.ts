import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';

export const ingredientAdded = createAction(
	'[Shopping List] INGREDIENT_ADDED',
	props<Ingredient>()
);
