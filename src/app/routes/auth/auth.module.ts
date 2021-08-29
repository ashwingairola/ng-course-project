import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LoadingUtilsModule } from 'src/app/shared/loading-utils/loading-utils.module';
import { AlertModule } from 'src/app/modules/UI/alert/alert.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
	declarations: [AuthComponent],
	imports: [
		CommonModule,
		FormsModule,
		LoadingUtilsModule,
		AlertModule,
		SharedModule,
		AuthRoutingModule
	]
})
export class AuthModule {}
