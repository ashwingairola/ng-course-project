import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
			.pipe(takeUntil(this.destroySubject$))
			.subscribe(params => {
				const id = params.get('id');
				this.recipeId = id ? +id : null;
				this.editMode = id !== null;
			});
	}

	ngOnDestroy() {
		this.destroySubject$.next();
	}
}
