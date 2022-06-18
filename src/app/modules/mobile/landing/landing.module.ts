import { SharedModule } from './../../../shared/shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingComponent } from './landing.component'
import { RouterModule } from '@angular/router'

@NgModule({
	declarations: [LandingComponent],
	imports: [SharedModule, RouterModule],
})
export class LandingMobileModule {}
