import { Component, Input } from '@angular/core';

type TSpinnerSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'app-loading-spinner',
	templateUrl: './loading-spinner.component.html',
	styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
	@Input() size: TSpinnerSize = 'md';
	constructor() {}
}
