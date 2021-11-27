import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../modules/auth/services/auth.service';
import { RecipesService } from 'src/app/routes/recipes/services/recipes.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(
		private recipeService: RecipesService,
		private authService: AuthService
	) {}

	isAuthenticated$ = this.authService.user$;

	ngOnInit(): void {}

	onSaveData() {
		this.recipeService.saveRecipes();
	}

	onFetchData() {
		this.recipeService.fetchRecipes();
	}

	onLogout() {
		this.authService.logout();
	}
}
