import { createReducer, on } from '@ngrx/store';

import { Recipe, RecipeState } from '@models';
import * as RecipeActions from '../actions/recipe.actions';

const initialState: RecipeState = {
	recipes: [],
	selectedRecipeId: null
};

export const recipeReducer = createReducer(
	initialState,
	on(RecipeActions.recipesSet, (state, action) => {
		const { recipes } = action;
		return { ...state, recipes };
	}),
	on(RecipeActions.recipeAdded, (state, action) => {
		const { recipe } = action;
		return { ...state, recipes: [...state.recipes, recipe] };
	}),
	on(RecipeActions.recipeUpdated, (state, action) => {
		const { recipeId, updatedRecipe } = action;
		const recipes = [...state.recipes];
		const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
		const newRecipe: Recipe = { ...updatedRecipe, id: recipeId };

		recipes.splice(recipeIndex, 1, newRecipe);

		return { ...state, recipes };
	}),
	on(RecipeActions.recipeDeleted, (state, action) => {
		const { recipeId } = action;
		const filteredRecipes = state.recipes.filter(
			recipe => recipe.id !== recipeId
		);

		return { ...state, recipes: filteredRecipes };
	}),
	on(RecipeActions.recipeSelected, (state, action) => {
		const { recipeId } = action;
		return { ...state, selectedRecipeId: recipeId };
	}),
	on(RecipeActions.recipeDeselected, state => {
		return { ...state, selectedRecipeId: null };
	})
);
