import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, take } from 'rxjs/operators';

import { AppState } from '@models';
import { Recipe } from '../../../models/recipe.model';
import { selectRecipes } from '../store/selectors/recipe.selectors';

@Injectable({
	providedIn: 'root'
})
export class RecipeApiService {
	constructor(private http: HttpClient, private store: Store<AppState>) {}

	private _recipes$ = this.store.select(selectRecipes);

	storeRecipes() {
		return this._recipes$.pipe(
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
				)
			);
	}
}
