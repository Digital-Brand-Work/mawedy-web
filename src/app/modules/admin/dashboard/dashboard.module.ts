import { SharedModule } from '../../../shared/shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { DashboardAppointmentTableComponent } from './appointments/dashboard-appointment-table/dashboard-appointment-table.component'
import { DashboardAppointmentToolbarComponent } from './appointments/dashboard-appointment-toolbar/dashboard-appointment-toolbar.component'
import { DashboardStatusComponent } from './dashboard-status/dashboard-status.component'
import { DashboardAppointmentFilterComponent } from './appointments/dashboard-appointment-filter/dashboard-appointment-filter.component'

import { WaitingPatientsComponent } from './waiting-patients/waiting-patients.component'
import { WaitingPatientsTableComponent } from './waiting-patients/waiting-patients-table/waiting-patients-table.component'
import { WaitingPatientsToolbarComponent } from './waiting-patients/waiting-patients-toolbar/waiting-patients-toolbar.component'
import { WaitingPatientsFilterComponent } from './waiting-patients/waiting-patients-filter/waiting-patients-filter.component'
import { dashboardRoutes } from 'app/mawedy-core/routes/admin/dashboard.routing'
import { DashboardAppointmentsComponent } from './appointments/dashboard-appointments.component'
import { DashboardComponent } from './dashboard.component'
import { StoreModule } from '@ngrx/store'
import * as fromDashboardWaitingPatient from './waiting-patients/dashboard-waiting-patient.reducer'
import * as fromDashboardAppointment from './appointments/dashboard-appointment.reducer'
import { EffectsModule } from '@ngrx/effects'
import { DashboardAppointmentEffects } from 'app/modules/admin/dashboard/appointments/dashboard-appointment.effects'
import { DashboardWaitingPatientEffects } from 'app/modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.effects'
import { ForApprovalsComponent } from './for-approvals/for-approvals.component'
import { ForApprovalsFilterComponent } from './for-approvals/for-approvals-filter/for-approvals-filter.component'
import { ForApprovalsTableComponent } from './for-approvals/for-approvals-table/for-approvals-table.component'
import { ForApprovalsToolbarComponent } from './for-approvals/for-approvals-toolbar/for-approvals-toolbar.component'
import * as fromDashboardForApprovalPatient from './for-approvals/dashboard-for-approval-patient.reducer';
import { DashboardAppointmentSearchResultsComponent } from './appointments/dashboard-appointment-search-results/dashboard-appointment-search-results.component';
import { WaitingPatientsSearchResultsComponent } from './waiting-patients/waiting-patients-search-results/waiting-patients-search-results.component';
import { ForApproalsSearchResultsComponent } from './for-approvals/for-approals-search-results/for-approals-search-results.component'

const components = [
	DashboardComponent,
	DashboardAppointmentTableComponent,
	DashboardAppointmentToolbarComponent,
	DashboardAppointmentFilterComponent,

	WaitingPatientsComponent,
	WaitingPatientsTableComponent,
	WaitingPatientsToolbarComponent,
	WaitingPatientsFilterComponent,
	DashboardAppointmentsComponent,

	ForApprovalsComponent,
	ForApprovalsFilterComponent,
	ForApprovalsTableComponent,
	ForApprovalsToolbarComponent,
]

@NgModule({
	declarations: [...components, DashboardAppointmentSearchResultsComponent, WaitingPatientsSearchResultsComponent, ForApproalsSearchResultsComponent],
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
		EffectsModule.forFeature([
			DashboardAppointmentEffects,
			DashboardWaitingPatientEffects,
		]),
		StoreModule.forFeature(
			fromDashboardForApprovalPatient.dashboardForApprovalPatientsFeatureKey,
			fromDashboardForApprovalPatient.reducer,
		),
	],
	exports: [...components],
})
export class DashboardModule {}
