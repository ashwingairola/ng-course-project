import { EAuthError, TRequestStatus } from '../modules/auth/models';
import { Ingredient } from './ingredient.model';

export interface ShoppingListState {
	ingredients: Ingredient[];
	selectedIngredient: number | null;
}

export interface AuthState {
	accessToken: string;
	refreshToken: string;
	email: string;
	authStatus: TRequestStatus;
	authError: EAuthError | null;
}

export interface AppState {
	shoppingList: ShoppingListState;
	auth: AuthState;
}
