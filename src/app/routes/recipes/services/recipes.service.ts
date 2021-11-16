import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '@models';
import { ShoppingListService } from 'src/app/routes/shopping-list/services/shopping-list.service';
import { Recipe } from '../../../models/recipe.model';
import {
	selectRecipes,
	selectSelectedRecipe
} from '../store/selectors/recipe.selectors';
import * as RecipeActions from '../store/actions/recipe.actions';
import { RecipeApiService } from './recipe-api.service';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {
	recipes$ = this.store.select(selectRecipes);
	selectedRecipe$ = this.store.select(selectSelectedRecipe);

	constructor(
		private store: Store<AppState>,
		private recipeApiService: RecipeApiService,
		private shoppingListService: ShoppingListService
	) {}

	fetchRecipes(): Observable<Recipe[]> {
		return this.recipeApiService.fetchRecipes().pipe(
			tap(recipes => {
				this.store.dispatch(RecipeActions.recipesSet({ recipes }));
			})
		);
	}

	selectRecipe(recipeId: number) {
		this.store.dispatch(RecipeActions.recipeSelected({ recipeId }));
	}

	deselectRecipe() {
		this.store.dispatch(RecipeActions.recipeDeselected());
	}

	setRecipes(recipes: Recipe[]) {
		this.store.dispatch(RecipeActions.recipesSet({ recipes }));
	}

	addIngredientsToShoppingList(recipe: Recipe) {
		this.shoppingListService.addIngredients(recipe.ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.store.dispatch(RecipeActions.recipeAdded({ recipe }));
	}

	updateRecipe(recipeId: number, updatedRecipe: Recipe): boolean {
		try {
			this.store.dispatch(
				RecipeActions.recipeUpdated({ recipeId, updatedRecipe })
			);
			return true;
		} catch (e) {
			return false;
		}
	}

	deleteRecipe(recipeId: number) {
		this.store.dispatch(RecipeActions.recipeDeleted({ recipeId }));
	}
}
