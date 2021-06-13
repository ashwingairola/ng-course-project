import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input() recipe!: Recipe;

	constructor(private recipeService: RecipesService) {}

	ngOnInit(): void {}

	onRecipeSelected() {
		this.recipeService.selectedRecipeId$.next(this.recipe.id);
	}
}
