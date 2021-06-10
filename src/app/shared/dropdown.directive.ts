import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	@HostBinding('class.open') open = false;

	constructor() {}

	@HostListener('click') toggleOpen() {
		this.open = !this.open;
	}
}
