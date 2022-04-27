import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
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
import { ComponentsModule } from 'app/components/components.module'
import { dashboardRoutes } from 'app/routes/admin/dashboard.routing'

const components = [
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
]

@NgModule({
	declarations: [...components],
	imports: [
		CommonModule,
		ComponentsModule,
		RouterModule.forChild(dashboardRoutes),
	],
	exports: [...components],
})
export class DashboardModule {}
