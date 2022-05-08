import { SharedModule } from '../../../shared/shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { DashboardAppointmentTableComponent } from './appointments/dashboard-appointment-table/dashboard-appointment-table.component'
import { DashboardAppointmentToolbarComponent } from './appointments/dashboard-appointment-toolbar/dashboard-appointment-toolbar.component'
import { DashboardStatusComponent } from './dashboard-status/dashboard-status.component'
import { DashboardAppointmentFilterComponent } from './appointments/dashboard-appointment-filter/dashboard-appointment-filter.component'
import { DashboardAppointmentAddComponent } from './appointments/modals/dashboard-appointment-add/dashboard-appointment-add.component'
import { DashboardAppointmentDetailsComponent } from './appointments/modals/dashboard-appointment-details/dashboard-appointment-details.component'
import { DashboardAppointmentConfirmCancelAppointmentComponent } from './appointments/modals/dashboard-appointment-confirm-cancel-appointment/dashboard-appointment-confirm-cancel-appointment.component'
import { DashboardAppointmentConfirmReassignSlotComponent } from './appointments/modals/dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.component'
import { DashboardAppointmentAssignSlotComponent } from './appointments/modals/dashboard-appointment-assign-slot/dashboard-appointment-assign-slot.component'
import { WaitingPatientsComponent } from './waiting-patients/waiting-patients.component'
import { WaitingPatientsTableComponent } from './waiting-patients/waiting-patients-table/waiting-patients-table.component'
import { WaitingPatientsToolbarComponent } from './waiting-patients/waiting-patients-toolbar/waiting-patients-toolbar.component'
import { WaitingPatientsFilterComponent } from './waiting-patients/waiting-patients-filter/waiting-patients-filter.component'
import { dashboardRoutes } from 'app/routes/admin/dashboard.routing'
import { DashboardAppointmentsComponent } from './appointments/dashboard-appointments.component'
import { DashboardComponent } from './dashboard.component'
import { StoreModule } from '@ngrx/store'
import * as fromDashboardWaitingPatient from '../../../store/entities/dashboard-waiting-patient/dashboard-waiting-patient.reducer'
import * as fromDashboardAppointment from '../../../store/entities/dashboard-appointment/dashboard-appointment.reducer'

const components = [
	DashboardComponent,
	DashboardAppointmentTableComponent,
	DashboardAppointmentToolbarComponent,
	DashboardStatusComponent,
	DashboardAppointmentFilterComponent,
	DashboardAppointmentAddComponent,
	DashboardAppointmentDetailsComponent,
	DashboardAppointmentConfirmCancelAppointmentComponent,
	DashboardAppointmentConfirmReassignSlotComponent,
	DashboardAppointmentAssignSlotComponent,
	WaitingPatientsComponent,
	WaitingPatientsTableComponent,
	WaitingPatientsToolbarComponent,
	WaitingPatientsFilterComponent,
	DashboardAppointmentsComponent,
]

@NgModule({
	declarations: [...components],
	imports: [
		SharedModule,
		RouterModule.forChild(dashboardRoutes),
		StoreModule.forFeature(
			fromDashboardWaitingPatient.dashboardWaitingPatientsFeatureKey,
			fromDashboardWaitingPatient.reducer,
		),
		StoreModule.forFeature(
			fromDashboardAppointment.dashboardAppointmentsFeatureKey,
			fromDashboardAppointment.reducer,
		),
	],
	exports: [...components],
})
export class DashboardModule {}
