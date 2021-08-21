import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	constructor(
		private route: ActivatedRoute,
		private recipesService: RecipesService
	) {}

	private destroySubject$ = new Subject<void>();
	editMode = false;
	selectedRecipe?: Recipe | null;

	recipeForm = new FormGroup({});

	ngOnInit(): void {
		this.route.paramMap
			.pipe(
				takeUntil(this.destroySubject$),
				map(params => {
					const id = params.get('id');
					const recipeId = id ? +id : null;

					return recipeId;
				}),
				switchMap(recipeId => {
					return recipeId ? this.recipesService.getRecipe(recipeId) : of(null);
				})
			)
			.subscribe(recipe => {
				this.selectedRecipe = recipe;
				this.editMode = !!this.selectedRecipe;
				this.initForm();
			});
	}

	ngOnDestroy() {
		this.destroySubject$.next();
	}

	onSubmit() {
		console.log(this.recipeForm);
	}

	private initForm() {
		this.recipeForm = new FormGroup({
			name: new FormControl(this.editMode ? this.selectedRecipe?.name : ''),
			imgUrl: new FormControl(
				this.editMode ? this.selectedRecipe?.imagePath : ''
			),
			description: new FormControl(
				this.editMode ? this.selectedRecipe?.description : ''
			)
		});
	}
}
