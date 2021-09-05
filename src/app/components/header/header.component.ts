import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';

import { RecipeApiService } from '../../routes/recipes/services/recipe-api.service';
import { AuthService } from '../../modules/auth/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(
		private recipeApiService: RecipeApiService,
		private authService: AuthService
	) {}

	isAuthenticated$ = this.authService.user$;

	ngOnInit(): void {}

	onSaveData() {
		this.recipeApiService.storeRecipes().subscribe(response => {
			console.log(response);
		}, noop);
	}

	onFetchData() {
		this.recipeApiService.fetchRecipes().subscribe(noop, noop);
	}

	onLogout() {
		this.authService.logout();
	}
}
