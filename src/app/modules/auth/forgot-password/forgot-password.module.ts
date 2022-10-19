import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FuseCardModule } from '@fuse/components/card'
import { FuseAlertModule } from '@fuse/components/alert'
import { SharedModule } from 'app/shared/shared.module'
import { AuthForgotPasswordComponent } from 'app/modules/auth/forgot-password/forgot-password.component'
import { authForgotPasswordRoutes } from 'app/modules/auth/forgot-password/forgot-password.routing'
import { ForgotPasswordForm1Component } from './forgot-password-form1/forgot-password-form1.component'
import { ForgotPasswordForm2Component } from './forgot-password-form2/forgot-password-form2.component'

@NgModule({
	declarations: [
		AuthForgotPasswordComponent,
		ForgotPasswordForm1Component,
		ForgotPasswordForm2Component,
	],
	imports: [
		SharedModule,
		FuseCardModule,
		FuseAlertModule,
		RouterModule.forChild(authForgotPasswordRoutes),
	],
})
export class AuthForgotPasswordModule {}
