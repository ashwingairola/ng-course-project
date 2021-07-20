import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	constructor(private route: ActivatedRoute) {}

	private destroySubject$ = new Subject<void>();
	editMode = false;
	recipeId: number | null = null;

	ngOnInit(): void {
		this.route.paramMap
			.pipe(delay(3000), takeUntil(this.destroySubject$))
			.subscribe(params => {
				const id = params.get('id');
				this.recipeId = id ? +id : null;
				this.editMode = id !== null;
				console.log(this.recipeId, this.editMode);
			});
	}

	ngOnDestroy() {
		this.destroySubject$.next();
	}
}
