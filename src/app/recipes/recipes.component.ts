import { Component, OnDestroy, OnInit } from '@angular/core';
import { noop, Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';

import { Recipe } from './recipe.model';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
	recipes: Recipe[] = [
		new Recipe(
			'Krabby Patty',
			'The best burger in Bikini Bottom.',
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Faseatenontv.files.wordpress.com%2F2013%2F03%2Fkrabby-patty-2.jpg&f=1&nofb=1'
		),
		new Recipe(
			'Chum Burger',
			'The crappiest burger in Bikini Bottom.',
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg3.wikia.nocookie.net%2F__cb20120913002903%2Fspongebob%2Fimages%2F5%2F56%2FChumwich.jpg&f=1&nofb=1'
		)
	];
	selectedRecipe?: Recipe | null;

	private recipeSub?: Subscription;

	constructor(private recipeService: RecipesService) {}

	ngOnInit(): void {
		this.selectedRecipe = this.recipes[0];

		this.recipeSub = this.recipeService.selectedRecipeId$.subscribe(
			recipeId => {
				this.selectedRecipe = this.recipes.find(
					recipe => recipe.id === recipeId
				);
			},
			noop
		);
	}

	ngOnDestroy() {
		if (this.recipeSub) {
			this.recipeSub.unsubscribe();
		}
	}
}
