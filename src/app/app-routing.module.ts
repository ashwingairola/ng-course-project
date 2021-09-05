import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'authenticate',
		loadChildren: () =>
			import('./routes/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'recipes',
		loadChildren: () =>
			import('./routes/recipes/recipes.module').then(m => m.RecipesModule)
	},
	{
		path: 'shopping-list',
		loadChildren: () =>
			import('./routes/shopping-list/shopping-list.module').then(
				m => m.ShoppingListModule
			)
	},
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
