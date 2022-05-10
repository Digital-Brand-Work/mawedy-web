import { MatCheckboxModule } from '@angular/material/checkbox'
import { AppointmentEditComponent } from './../modules/admin/appointments/appointment-edit/appointment-edit.component'
import { AppointmentAddComponent } from './../modules/admin/appointments/appointment-add/appointment-add.component'
import { ParallaxDirective } from './../../@digital_brand_work/directives/parralax.directive'
import { MatButtonModule } from '@angular/material/button'
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
import { MatTooltipModule } from '@angular/material/tooltip'
import { ModalHeaderComponent } from 'app/components/modal-header/modal-header.component'
import { MatRadioModule } from '@angular/material/radio'
import { AutoSizeDirective } from '@digital_brand_work/directives/textarea-autosize.directive'
import { InputMaskModule } from '@ngneat/input-mask'
import { NgxMaskModule } from 'ngx-mask'
import { StopPropagation } from '@digital_brand_work/directives/stop.propagation.directive'
import { ClinicTimingInputComponent } from 'app/components/clinic-timing-input/clinic-timing-input.component'
import { ClinicServicesAddComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-add/clinic-services-add.component'
import { ClinicServicesEditComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-edit/clinic-services-edit.component'
import { ClinicDepartmentAddComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-department-add/clinic-department-add.component'
import { MatSelectModule } from '@angular/material/select'
import { CountryFormComponent } from 'app/components/country-form/country-form.component'

const components = [
	SpinnerComponent,
	MobileNumberFormComponent,
	AppToolbarComponent,
	AlertComponent,
	ModalHeaderComponent,
	ClinicTimingInputComponent,
	CountryFormComponent,

	/** Modals */
	AppointmentAddComponent,
	AppointmentEditComponent,

	ClinicDepartmentAddComponent,

	ClinicServicesAddComponent,
	ClinicServicesEditComponent,
]

const modules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	InputMaskModule,
	NgxMaskModule.forRoot(),

	/**
	    Mat Modules
	*/
	MatIconModule,
	MatMenuModule,
	MatDividerModule,
	MatButtonModule,
	MatTooltipModule,
	MatCheckboxModule,
	MatRadioModule,
	MatSelectModule,
]

const directives = [
	AnimateJsDirective,
	ParallaxDirective,
	AutoSizeDirective,
	StopPropagation,
]

const pipes = []

@NgModule({
	declarations: [...components, ...directives, ...pipes],
	imports: [...modules],
	exports: [...components, ...directives, ...pipes, ...modules],
})
export class SharedModule {}
