import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

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

	private destroySubject$ = new Subject<void>();
	editMode = false;
	selectedRecipe?: Recipe | null;

	recipeForm = new FormGroup({});

	get ingredientControls() {
		return this.recipeForm.get('ingredients') as FormArray;
	}

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
					return typeof recipeId === 'number'
						? this.recipesService.getRecipe(recipeId)
						: of(null);
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
