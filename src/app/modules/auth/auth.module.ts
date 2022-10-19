import { authRotes } from '../../app-core/routes/auth.routes'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'

@NgModule({
	declarations: [],
	exports: [],
	imports: [SharedModule, RouterModule.forChild(authRotes)],
})
export class AuthModule {}
