import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipesService } from '../recipes.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {
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
}
