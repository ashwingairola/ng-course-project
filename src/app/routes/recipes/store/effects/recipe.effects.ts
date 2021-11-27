import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
	catchError,
	map,
	startWith,
	switchMap,
	withLatestFrom
} from 'rxjs/operators';

import * as RecipeActions from '../actions/recipe.actions';
import { RecipeApiService } from '../../services/recipe-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '@models';
import { selectRecipes } from '../selectors/recipe.selectors';

@Injectable()
export class RecipeEffects {
	recipesFetch$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RecipeActions.fetchRecipes.fetch),
			switchMap(() =>
				this.recipeApiService.fetchRecipes().pipe(
					map(recipes => RecipeActions.fetchRecipes.fulfilled({ recipes })),
					catchError(() => of(RecipeActions.fetchRecipes.rejected())),
					startWith(RecipeActions.fetchRecipes.pending())
				)
			)
		)
	);

	recipesSave$ = createEffect(() =>
		this.actions$.pipe(
			ofType(RecipeActions.saveRecipes.save),
			withLatestFrom(this.store.select(selectRecipes)),
			switchMap(({ '1': recipes }) =>
				this.recipeApiService.storeRecipes(recipes).pipe(
					map(recipes => RecipeActions.saveRecipes.fulfilled({ recipes })),
					catchError(() => of(RecipeActions.saveRecipes.rejected())),
					startWith(RecipeActions.saveRecipes.pending())
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private recipeApiService: RecipeApiService
	) {}
}
