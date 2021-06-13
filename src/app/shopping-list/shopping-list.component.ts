import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients$: Observable<Ingredient[]>;

	constructor(private shoppingListService: ShoppingListService) {
		this.ingredients$ = this.shoppingListService.ingredients$;
	}

	ngOnInit(): void {
		this.shoppingListService.fetchIngredients();
	}

	onIngredientAdded(ingredient: Ingredient) {
		this.shoppingListService.addIngredient(ingredient);
	}
}
