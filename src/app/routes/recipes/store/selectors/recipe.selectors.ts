import { createSelector } from '@ngrx/store';

import { AppState } from '@models';

export const selectRecipesState = (state: AppState) => state.recipe;

export const selectRecipes = createSelector(
	selectRecipesState,
	recipesState => recipesState.recipes
);

export const selectSelectedRecipe = createSelector(
	selectRecipesState,
	recipesState => {
		const { recipes, selectedRecipeId } = recipesState;
		const selectedRecipe = recipes.find(
			recipe => recipe.id === selectedRecipeId
		);

		return selectedRecipe || null;
	}
);
