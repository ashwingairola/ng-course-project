import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { ShoppingListService } from 'src/app/routes/shopping-list/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild('ingredientForm') ingredientForm!: NgForm;

	formModel = {
		name: '',
		amount: 0
	};
	editMode = false;
	selectedIngredient?: Ingredient | null;

	private _destroy$ = new Subject<void>();

	constructor(private shoppingListService: ShoppingListService) {}

	ngOnInit(): void {
		this.shoppingListService.selectedIngredient$
			.pipe(takeUntil(this._destroy$), shareReplay())
			.subscribe(ingredient => {
				if (ingredient) {
					this.editMode = true;
					this.selectedIngredient = ingredient;
					this.formModel = {
						name: ingredient.name,
						amount: ingredient.amount
					};
				} else {
					this.editMode = false;
				}
			});
	}

	ngOnDestroy() {
		this._destroy$.next();
	}

	onSubmit() {
		const ingredient = new Ingredient(
			this.formModel.name,
			this.formModel.amount
		);

		if (this.editMode && this.selectedIngredient) {
			this.shoppingListService.updateIngredient(
				this.selectedIngredient.id,
				ingredient
			);
		} else {
			this.shoppingListService.addIngredient(ingredient);
		}

		this.onReset();
	}

	onReset() {
		this.ingredientForm.reset();
		this.editMode = false;
		this.shoppingListService.clearSelectedIngredient();
	}

	onDelete() {
		if (this.selectedIngredient) {
			this.shoppingListService.deleteIngredient(this.selectedIngredient.id);
			this.onReset();
		}
	}
}
