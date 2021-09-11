import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { LoggingService } from 'src/app/services/logging.service';
// import { StoreModule } from '@ngrx/store';
// import { shoppingListReducer } from './reducers/shopping-list.reducer';

@NgModule({
	declarations: [ShoppingListComponent, ShoppingEditComponent],
	imports: [
		CommonModule,
		FormsModule,
		ShoppingListRoutingModule
		// StoreModule.forFeature('Shopping List', {
		// 	shoppingList: shoppingListReducer
		// })
	],
	providers: [LoggingService]
})
export class ShoppingListModule {}
