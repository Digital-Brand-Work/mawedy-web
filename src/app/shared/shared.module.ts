import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { DoctorDetailsComponent } from './../modules/admin/doctors/modals/doctor-details/doctor-details.component'
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
import { DashboardAppointmentSelectDoctorComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.component'
import { DashboardAppointmentSelectTimeSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.component'
import { DoctorAddComponent } from 'app/modules/admin/doctors/modals/doctor-add/doctor-add.component'
import { DoctorAvailabilityComponent } from 'app/modules/admin/doctors/modals/doctor-availability/doctor-availability.component'
import { DoctorConfirmDeleteComponent } from 'app/modules/admin/doctors/modals/doctor-confirm-delete/doctor-confirm-delete.component'
import { DoctorDetailsWorkingScheduleComponent } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details-working-schedule/doctor-details-working-schedule.component'
import { DoctorEditComponent } from 'app/modules/admin/doctors/modals/doctor-edit/doctor-edit.component'
import { WorkingScheduleComponent } from 'app/modules/admin/doctors/modals/doctor-add/working-schedule/working-schedule.component'
import { PatientAddComponent } from 'app/modules/admin/patients/modals/patient-add/patient-add.component'
import { DashboardAppointmentAddComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-add/dashboard-appointment-add.component'
import { DashboardAppointmentDetailsComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.component'
import { DashboardAppointmentConfirmCancelAppointmentComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-cancel-appointment/dashboard-appointment-confirm-cancel-appointment.component'
import { DashboardAppointmentConfirmReassignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.component'
import { DashboardAppointmentAssignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-assign-slot/dashboard-appointment-assign-slot.component'
import { SubscriptionInvoicesComponent } from 'app/modules/admin/subscriptions/modals/subscription-invoices/subscription-invoices.component'
import { DashboardAppointmentCancelAndAssignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-cancel-and-assign-slot/dashboard-appointment-cancel-and-assign-slot.component'
import { UnderMaintenanceComponent } from 'app/modules/pages/under-maintenance/under-maintenance.component'
import { FuseCardModule } from '@fuse/components/card'
import { AppStoreButtonComponent } from 'app/components/buttons/app-store-button/app-store-button.component'
import { GooglePlayButtonComponent } from 'app/components/buttons/google-play-button/google-play-button.component'
import { UnderConstructionComponent } from 'app/modules/pages/under-construction/under-construction.component'
import { SSRExcludeModule } from 'ngx-ssr-exclude'

const components = [
	SpinnerComponent,
	MobileNumberFormComponent,
	AppToolbarComponent,
	AlertComponent,
	ModalHeaderComponent,
	ClinicTimingInputComponent,
	CountryFormComponent,
	DoctorDetailsWorkingScheduleComponent,
	WorkingScheduleComponent,

	/** Modals */
	AppointmentAddComponent,
	AppointmentEditComponent,

	DashboardAppointmentAddComponent,
	DashboardAppointmentDetailsComponent,
	DashboardAppointmentConfirmCancelAppointmentComponent,
	DashboardAppointmentConfirmReassignSlotComponent,
	DashboardAppointmentAssignSlotComponent,
	DashboardAppointmentSelectDoctorComponent,
	DashboardAppointmentSelectTimeSlotComponent,
	DashboardAppointmentCancelAndAssignSlotComponent,

	DoctorAddComponent,
	DoctorAvailabilityComponent,
	DoctorConfirmDeleteComponent,
	DoctorDetailsComponent,
	DoctorEditComponent,

	PatientAddComponent,

	ClinicServicesAddComponent,
	ClinicDepartmentAddComponent,
	ClinicServicesEditComponent,

	SubscriptionInvoicesComponent,

	UnderMaintenanceComponent,
	UnderConstructionComponent,

	GooglePlayButtonComponent,
	AppStoreButtonComponent,
]

const modules = [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	InputMaskModule,
	NgxMaskModule.forRoot(),
	FuseCardModule,
	SSRExcludeModule,

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
	MatProgressSpinnerModule,
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
	providers: [{ provide: 'isBrowser', useValue: true }],
})
export class SharedModule {}
