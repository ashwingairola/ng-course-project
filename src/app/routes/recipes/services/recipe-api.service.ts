import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Recipe } from '../../../models/recipe.model';

@Injectable({
	providedIn: 'root'
})
export class RecipeApiService {
	constructor(private http: HttpClient) {}

	storeRecipes(recipes: Recipe[]) {
		return this.http
			.put<Recipe[]>(
				'https://ng-course-project-89e65-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
				recipes
			)
			.pipe(
				map(recipes =>
					recipes.map(recipe => {
						if (!recipe.ingredients) {
							recipe.ingredients = [];
						}

						return recipe;
					})
				)
			);
	}

	fetchRecipes() {
		return this.http
			.get<Recipe[]>(
				'https://ng-course-project-89e65-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
			)
			.pipe(
				map(recipes =>
					recipes.map(recipe => {
						if (!recipe.ingredients) {
							recipe.ingredients = [];
						}

						return recipe;
					})
				)
			);
	}
}
