import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { AppToolbarComponent } from './../components/app-toolbar/app-toolbar.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SpinnerComponent } from 'app/components/spinner/spinner.component'
import { MobileNumberFormComponent } from 'app/components/mobile-number-form/mobile-number-form.component'
import { AnimateJsDirective } from '@digital_brand_work/directives/animate.js.directive'
import { MatMenuModule } from '@angular/material/menu'
import { AlertComponent } from 'app/components/alert/alert.component'

const components = [
	SpinnerComponent,
	MobileNumberFormComponent,
	AppToolbarComponent,
	AlertComponent,
]

const modules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	MatIconModule,
	MatMenuModule,
	MatDividerModule,
]

const directives = [AnimateJsDirective]

const pipes = []

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [...modules],
	exports: [...components, ...directives, ...pipes, ...modules],
})
export class SharedModule {}
