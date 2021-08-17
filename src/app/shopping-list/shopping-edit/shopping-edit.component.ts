import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	formModel = {
		name: '',
		amount: 0
	};

	constructor() {}

	ngOnInit(): void {}

	onAddItem() {
		const ingredient = new Ingredient(
			this.formModel.name,
			this.formModel.amount
		);
		this.ingredientAdded.emit(ingredient);
	}
}
