import { createAction, props } from '@ngrx/store';

import { Recipe } from '@models';

export const recipesSet = createAction(
	'[Recipe] RECIPES_SET',
	props<{ recipes: Recipe[] }>()
);

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
