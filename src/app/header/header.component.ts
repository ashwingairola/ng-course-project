import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { DataStorageService } from '../services/api/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(private dataStorageService: DataStorageService) {}

	ngOnInit(): void {}

	onSaveData() {
		this.dataStorageService.storeRecipes().subscribe(response => {
			console.log(response);
		}, noop);
	}
}
