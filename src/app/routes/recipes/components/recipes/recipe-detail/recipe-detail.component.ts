import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../../../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private recipeService: RecipesService
	) {}

	recipe$: Observable<Recipe | null> = this.route.paramMap.pipe(
		map(params => {
			const id = params.get('id');
			const recipeId = id ? +id : null;
			return recipeId;
		}),
		switchMap(recipeId => {
			if (typeof recipeId !== 'number') {
				return of(null);
			}

			return this.recipeService.getRecipe(recipeId);
		})
	);

	ngOnInit(): void {}

	onAddToShoppingList() {
		// this.toShoppingListClicked.emit(this.recipe);
	}

	onDelete(recipeId: number) {
		this.recipeService.deleteRecipe(recipeId);
		this.router.navigate(['/recipes']);
	}
}