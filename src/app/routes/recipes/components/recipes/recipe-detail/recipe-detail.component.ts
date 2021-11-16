import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Recipe } from '../../../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
	private _destroy$ = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private recipeService: RecipesService
	) {}

	recipe$: Observable<Recipe | null> = this.recipeService.selectedRecipe$;

	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				takeUntil(this._destroy$),
				map(params => {
					const id = params.get('id');
					const recipeId = id ? +id : null;
					return recipeId;
				}),
				tap(recipeId => {
					if (typeof recipeId !== 'number') {
						return;
					}

					this.recipeService.selectRecipe(recipeId);
				})
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	onAddToShoppingList() {
		// this.toShoppingListClicked.emit(this.recipe);
	}

	onDelete(recipeId: number) {
		this.recipeService.deleteRecipe(recipeId);
		this.router.navigate(['/recipes']);
	}
}
