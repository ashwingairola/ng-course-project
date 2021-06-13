import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	@Input() recipe!: Recipe;
	@Output() toShoppingListClicked = new EventEmitter<Recipe>();

	constructor() {}

	ngOnInit(): void {}

	onAddToShoppingList() {
		this.toShoppingListClicked.emit(this.recipe);
	}
}
