import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
	@ViewChild('amountInput') amountInput!: ElementRef<HTMLInputElement>;
	@Output() ingredientAdded = new EventEmitter<Ingredient>();

	constructor() {}

	ngOnInit(): void {}

	onAddItem() {
		const ingredient = new Ingredient(
			this.nameInput.nativeElement.value,
			+this.amountInput.nativeElement.value
		);
		this.ingredientAdded.emit(ingredient);
	}
}
