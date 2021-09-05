import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { Recipe } from '../../../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	recipes$?: Observable<Recipe[]>;

	constructor(
		private recipeService: RecipesService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.recipes$ = this.recipeService.getRecipes();
		console.log(this.authService.serviceId);
	}

	onClickAddToShoppingList(recipe: Recipe) {
		this.recipeService.addIngredientsToShoppingList(recipe);
	}
}
