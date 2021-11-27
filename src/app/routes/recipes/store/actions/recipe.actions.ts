import { createAction, props } from '@ngrx/store';

import { Recipe } from '@models';

export const fetchRecipes = {
	fetch: createAction('[Recipe] RECIPES_FETCH_INITIATED'),
	pending: createAction('[Recipe] RECIPES_FETCH_PENDING'),
	rejected: createAction('[Recipe] RECIPES_FETCH_REJECTED'),
	fulfilled: createAction(
		'[Recipe] RECIPES_FETCH_FULFILLED',
		props<{ recipes: Recipe[] }>()
	)
};

export const saveRecipes = {
	save: createAction('[Recipe] RECIPES_SAVE_INITIATED'),
	pending: createAction('[Recipe] RECIPES_SAVE_PENDING'),
	rejected: createAction('[Recipe] RECIPES_SAVE_REJECTED'),
	fulfilled: createAction(
		'[Recipe] RECIPES_SAVE_FULFILLED',
		props<{ recipes: Recipe[] }>()
	)
};

export const recipeAdded = createAction(
	'[Recipe] RECIPE_ADDED',
	props<{ recipe: Recipe }>()
);

export const recipeUpdated = createAction(
	'[Recipe] RECIPE_UPDATED',
	props<{ recipeId: number; updatedRecipe: Recipe }>()
);

export const recipeDeleted = createAction(
	'[Recipe] RECIPE_DELETED',
	props<{ recipeId: number }>()
);

export const recipeSelected = createAction(
	'[Recipe] RECIPE_SELECTED',
	props<{ recipeId: number }>()
);

export const recipeDeselected = createAction('[Recipe] RECIPE_DESELECTED');
