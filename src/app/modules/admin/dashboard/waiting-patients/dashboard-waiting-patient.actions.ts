import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { DashboardWaitingPatient } from './dashboard-waiting-patient.model'

export const loadDashboardWaitingPatients = createAction(
	'[DashboardWaitingPatient/API] Load DashboardWaitingPatients',
	props<{ dashboardWaitingPatients: DashboardWaitingPatient[] }>(),
)

export const addDashboardWaitingPatient = createAction(
	'[DashboardWaitingPatient/API] Add DashboardWaitingPatient',
	props<{ dashboardWaitingPatient: DashboardWaitingPatient }>(),
)

export const updateDashboardWaitingPatient = createAction(
	'[DashboardWaitingPatient/API] Update DashboardWaitingPatient',
	props<{ dashboardWaitingPatient: Update<DashboardWaitingPatient> }>(),
)

export const deleteDashboardWaitingPatient = createAction(
	'[DashboardWaitingPatient/API] Delete DashboardWaitingPatient',
	props<{ id: string }>(),
)
