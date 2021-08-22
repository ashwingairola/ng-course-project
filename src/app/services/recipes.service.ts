import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {
	private _recipes: Recipe[] = [
		new Recipe(
			'Krabby Patty',
			'The best burger in Bikini Bottom.',
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Faseatenontv.files.wordpress.com%2F2013%2F03%2Fkrabby-patty-2.jpg&f=1&nofb=1',
			[
				new Ingredient('Bun', 1),
				new Ingredient('Pickle', 1),
				new Ingredient('Cheese slice', 1),
				new Ingredient('Tomato slice', 2),
				new Ingredient('Onion rings', 4),
				new Ingredient('Seaweed', 1),
				new Ingredient('SECRET FORMULA', 1)
			]
		),
		new Recipe(
			'Chum Burger',
			'The crappiest burger in Bikini Bottom.',
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg3.wikia.nocookie.net%2F__cb20120913002903%2Fspongebob%2Fimages%2F5%2F56%2FChumwich.jpg&f=1&nofb=1',
			[
				new Ingredient('Soggy bun', 1),
				new Ingredient('Cursed offals', 1),
				new Ingredient('Hot gas', 1)
			]
		)
	];

	private _recipes$ = new BehaviorSubject<Recipe[]>(this._recipes);

	constructor(private shoppingListService: ShoppingListService) {}

	getRecipes(): Observable<Recipe[]> {
		return this._recipes$.asObservable().pipe(map(recipes => recipes.slice()));
	}

	getRecipe(id: number): Observable<Recipe | null> {
		return this._recipes$.pipe(
			map(recipes => recipes.find(recipe => recipe.id === id) || null)
		);
	}

	addIngredientsToShoppingList(recipe: Recipe) {
		this.shoppingListService.addIngredients(recipe.ingredients);
	}

	addRecipe(recipe: Recipe) {
		const recipes = this._recipes$.getValue();
		recipes.push(recipe);
		this._recipes$.next(recipes);
	}

	updateRecipe(recipeId: number, newRecipe: Recipe): boolean {
		const recipes = this._recipes$.getValue();
		const recipeToUpdate = recipes.find(recipe => recipe.id === recipeId);

		if (recipeToUpdate) {
			const index = recipes.indexOf(recipeToUpdate);
			recipes[index] = newRecipe;
			this._recipes$.next(recipes);
			return true;
		}

		return false;
	}
}
