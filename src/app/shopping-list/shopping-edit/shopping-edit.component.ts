import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	formModel = {
		name: '',
		amount: 0
	};
	editMode = false;

	selectedIngredient$: Observable<Ingredient | null> =
		this.shoppingListService.selectedIngredient$;

	private _destroy$ = new Subject<void>();

	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit(): void {
		this.selectedIngredient$
			.pipe(takeUntil(this._destroy$), shareReplay())
			.subscribe(ingredient => {
				if (ingredient) {
					this.editMode = true;
					this.formModel = {
						name: ingredient.name,
						amount: ingredient.amount
					};
				}
			});
	}

	ngOnDestroy() {
		this._destroy$.next();
	}

	onAddItem() {
		const ingredient = new Ingredient(
			this.formModel.name,
			this.formModel.amount
		);
		this.shoppingListService.addIngredient(ingredient);
	}
}
