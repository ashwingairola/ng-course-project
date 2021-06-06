import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [
		new Ingredient('Secret Formula', 1),
		new Ingredient('Tomato Slice', 2),
		new Ingredient('Cheese Slice', 2)
	];

	constructor() {}

	ngOnInit(): void {}
}
