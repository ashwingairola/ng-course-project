import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '@env';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { LoggingService } from './services/logging.service';
import { AuthEffects } from './modules/auth/store/effects/auth.effects';
import { shoppingListReducer } from './routes/shopping-list/store/reducers/shopping-list.reducer';
import { authReducer } from './modules/auth/store/reducers/auth.reducer';
import { recipeReducer } from './routes/recipes/store/reducers/recipe.reducer';
import { RecipeEffects } from './routes/recipes/store/effects/recipe.effects';

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		StoreModule.forRoot({
			recipe: recipeReducer,
			shoppingList: shoppingListReducer,
			auth: authReducer
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
			autoPause: true
		}),
		EffectsModule.forRoot([AuthEffects, RecipeEffects]),
		AuthModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		LoggingService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
