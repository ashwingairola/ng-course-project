import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [AuthComponent],
	imports: [CommonModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
