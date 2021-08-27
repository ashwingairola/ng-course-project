import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { DataStorageService } from '../services/api/data-storage.service';
import { AuthService } from '../shared/auth/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(
		private dataStorageService: DataStorageService,
		private authService: AuthService
	) {}

	isAuthenticated$ = this.authService.user$;

	ngOnInit(): void {}

	onSaveData() {
		this.dataStorageService.storeRecipes().subscribe(response => {
			console.log(response);
		}, noop);
	}

	onFetchData() {
		this.dataStorageService.fetchRecipes().subscribe(noop, noop);
	}

	onLogout() {
		this.authService.logout();
	}
}
