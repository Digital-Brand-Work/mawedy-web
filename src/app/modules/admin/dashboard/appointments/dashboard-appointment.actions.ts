import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { DashboardAppointment } from './dashboard-appointment.model'

export const loadDashboardAppointments = createAction(
	'[DashboardAppointment/API] Load DashboardAppointments',
	props<{ dashboardAppointments: DashboardAppointment[] }>(),
)

export const addDashboardAppointment = createAction(
	'[DashboardAppointment/API] Add DashboardAppointment',
	props<{ dashboardAppointment: DashboardAppointment }>(),
)

export const updateDashboardAppointment = createAction(
	'[DashboardAppointment/API] Update DashboardAppointment',
	props<{ dashboardAppointment: Update<DashboardAppointment> }>(),
)

export const deleteDashboardAppointment = createAction(
	'[DashboardAppointment/API] Delete DashboardAppointment',
	props<{ id: string }>(),
)
