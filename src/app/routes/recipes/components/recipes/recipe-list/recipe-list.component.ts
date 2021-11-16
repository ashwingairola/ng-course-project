import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../../../models/recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	@Input() recipes!: Recipe[];
	@Output() newButtonClicked = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	onClickNewButton() {
		this.newButtonClicked.emit();
	}
}
