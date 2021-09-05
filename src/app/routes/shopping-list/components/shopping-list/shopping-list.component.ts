import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../../../models/ingredient.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	ingredients$: Observable<Ingredient[]>;

	constructor(
		private shoppingListService: ShoppingListService,
		private authService: AuthService,
		private loggingService: LoggingService
	) {
		this.ingredients$ = this.shoppingListService.ingredients$;
	}

	ngOnInit(): void {
		console.log(this.authService.serviceId);
		this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit.');
	}

	onEditItem(ingredientId: number) {
		this.shoppingListService.selectIngredientForEdit(ingredientId);
	}
}
