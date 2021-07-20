import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipesService } from '../services/recipes.service';
import { Recipe } from './recipe.model';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
	recipes$?: Observable<Recipe[]>;

	constructor(private recipeService: RecipesService) {}

	ngOnInit(): void {
		this.recipes$ = this.recipeService.getRecipes();
	}

	onClickAddToShoppingList(recipe: Recipe) {
		this.recipeService.addIngredientsToShoppingList(recipe);
	}
}
