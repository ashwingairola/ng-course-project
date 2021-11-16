import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';

import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from '../../../../../models/recipe.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private recipesService: RecipesService
	) {}

	private _destroy$ = new Subject<void>();
	editMode = false;
	selectedRecipe$ = this.recipesService.selectedRecipe$;
	selectedRecipe?: Recipe | null;

	recipeForm = new FormGroup({});

	get ingredientControls() {
		return this.recipeForm.get('ingredients') as FormArray;
	}

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
					return typeof recipeId === 'number'
						? this.recipesService.selectRecipe(recipeId)
						: of(null);
				})
			)
			.subscribe();

		this.selectedRecipe$
			.pipe(shareReplay(1), takeUntil(this._destroy$))
			.subscribe(recipe => {
				this.selectedRecipe = recipe;
				this.editMode = !!this.selectedRecipe;
				this.initForm();
			});
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

	onAddIngredient() {
		this.ingredientControls.push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/)
				])
			})
		);
	}

	onDeleteIngredient(index: number) {
		this.ingredientControls.removeAt(index);
	}

	onSubmit() {
		const {
			name,
			description,
			imgUrl,
			ingredients: ingredientValues
		}: {
			name: string;
			description: string;
			imgUrl: string;
			ingredients: { name: string; amount: number }[];
		} = this.recipeForm.value;
		const ingredients = ingredientValues?.length
			? ingredientValues.map(i => new Ingredient(i.name, i.amount))
			: [];

		const newRecipe = new Recipe(name, description, imgUrl, ingredients);
		if (this.editMode && this.selectedRecipe) {
			this.recipesService.updateRecipe(this.selectedRecipe?.id, newRecipe);
		} else {
			this.recipesService.addRecipe(newRecipe);
		}

		this.router.navigate(['..'], { relativeTo: this.route });
	}

	private initForm() {
		this.recipeForm = new FormGroup({
			name: new FormControl(
				this.editMode ? this.selectedRecipe?.name : '',
				Validators.required
			),
			imgUrl: new FormControl(
				this.editMode ? this.selectedRecipe?.imagePath : '',
				Validators.required
			),
			description: new FormControl(
				this.editMode ? this.selectedRecipe?.description : '',
				Validators.required
			),
			ingredients: new FormArray(
				this.editMode && this.selectedRecipe
					? this.selectedRecipe.ingredients.map(i => {
							return new FormGroup({
								name: new FormControl(i.name, Validators.required),
								amount: new FormControl(i.amount, [
									Validators.required,
									Validators.pattern(/^[1-9]+[0-9]*$/)
								])
							});
					  })
					: []
			)
		});
	}
}
