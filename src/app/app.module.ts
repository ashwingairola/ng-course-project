import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { LoggingService } from './services/logging.service';
import { shoppingListReducer } from './routes/shopping-list/reducers/shopping-list.reducer';
@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		StoreModule.forRoot({ shoppingList: shoppingListReducer }),
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
