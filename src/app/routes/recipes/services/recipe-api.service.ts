import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { Recipe } from '../../../models/recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
	providedIn: 'root'
})
export class RecipeApiService {
	constructor(
		private http: HttpClient,
		private recipesService: RecipesService
	) {}

	storeRecipes() {
		return this.recipesService.getRecipes().pipe(
			take(1),
			switchMap(recipes => {
				return this.http.put<unknown>(
					'https://ng-course-project-89e65-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
					recipes
				);
			})
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
				),
				tap(recipes => {
					this.recipesService.setRecipes(recipes);
				})
			);
	}
}
