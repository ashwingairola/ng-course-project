import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	recipes: Recipe[] = [
		new Recipe(
			'A Test Recipe',
			'This is simply a test.',
			'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Faseatenontv.files.wordpress.com%2F2013%2F03%2Fkrabby-patty-2.jpg&f=1&nofb=1'
		)
	];

	constructor() {}

	ngOnInit(): void {}
}
