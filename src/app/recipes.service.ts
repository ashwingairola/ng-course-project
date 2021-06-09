import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {
	selectedRecipeId$: Subject<number> = new Subject();

	constructor() {}
}
