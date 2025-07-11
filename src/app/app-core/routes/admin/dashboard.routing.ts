import { ForApprovalsComponent } from '../../../modules/admin/dashboard/for-approvals/for-approvals.component'
import { DashboardAppointmentsComponent } from '../../../modules/admin/dashboard/appointments/dashboard-appointments.component'
import { Routes } from '@angular/router'
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component'
import { WaitingPatientsComponent } from 'app/modules/admin/dashboard/waiting-patients/waiting-patients.component'

export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				redirectTo: 'appointments',
				pathMatch: 'full',
			},
			{
				path: 'appointments',
				component: DashboardAppointmentsComponent,
			},
			{
				path: 'outreach',
				component: WaitingPatientsComponent,
			},
			{
				path: 'for-approvals',
				component: ForApprovalsComponent,
			},
		],
	},
]
