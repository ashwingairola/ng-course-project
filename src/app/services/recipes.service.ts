import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class RecipesService {
	private _recipes: Recipe[] = [
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

	private _selectedRecipeId$ = new BehaviorSubject<number | null>(null);

	readonly selectedRecipeId$ = this._selectedRecipeId$.asObservable();

	constructor() {}

	get recipes(): Recipe[] {
		return this._recipes.slice();
	}

	onSelectRecipe(id: number) {
		this._selectedRecipeId$.next(id);
	}
}