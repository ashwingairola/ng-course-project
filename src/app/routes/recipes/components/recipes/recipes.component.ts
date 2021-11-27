import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../../../models/recipe.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RecipesService } from '../../services/recipes.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	recipes$ = this.recipeService.recipes$;

	constructor(
		private recipeService: RecipesService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		console.log(this.authService.serviceId);

		this.recipeService.fetchRecipes();
	}

	onClickAddToShoppingList(recipe: Recipe) {
		this.recipeService.addIngredientsToShoppingList(recipe);
	}

	onNewButtonClicked() {
		this.recipeService.deselectRecipe();
	}
}
