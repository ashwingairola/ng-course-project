import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
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
}
