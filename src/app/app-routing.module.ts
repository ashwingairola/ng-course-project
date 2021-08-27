import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './shared/auth/guards/auth.guard';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
	{
		path: 'authenticate',
		loadChildren: () =>
			import('./routes/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'recipes',
		component: RecipesComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: RecipeStartComponent },
			{ path: 'new', component: RecipeEditComponent },
			{ path: ':id', component: RecipeDetailComponent },
			{ path: ':id/edit', component: RecipeEditComponent }
		]
	},
	{ path: 'shopping-list', component: ShoppingListComponent },
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
