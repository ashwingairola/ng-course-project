import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
	declarations: [PlaceholderDirective, DropdownDirective],
	imports: [CommonModule],
	exports: [PlaceholderDirective, DropdownDirective]
})
export class SharedModule {}
