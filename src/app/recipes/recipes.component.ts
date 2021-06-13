import { Component, OnDestroy, OnInit } from '@angular/core';
import { noop, Subscription } from 'rxjs';
import { RecipesService } from '../services/recipes.service';

import { Recipe } from './recipe.model';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css'],
	providers: [RecipesService]
})
export class RecipesComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = [];
	selectedRecipe?: Recipe | null;

	private recipeSub?: Subscription;

	constructor(private recipeService: RecipesService) {}

	ngOnInit(): void {
		this.recipes = this.recipeService.recipes;
		this.selectedRecipe = this.recipes[0];

		this.recipeSub = this.recipeService.selectedRecipeId$.subscribe(
			recipeId => {
				this.selectedRecipe = this.recipes.find(
					recipe => recipe.id === recipeId
				);
			},
			noop
		);
	}

	ngOnDestroy() {
		if (this.recipeSub) {
			this.recipeSub.unsubscribe();
		}
	}
}
