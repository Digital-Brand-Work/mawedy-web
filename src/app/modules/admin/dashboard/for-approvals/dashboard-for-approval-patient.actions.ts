import { createAction, props } from '@ngrx/store'

import { DashboardForApprovalPatient } from './dashboard-for-approval-patient.model'

export const loadDashboardForApprovalPatients = createAction(
	'[DashboardForApprovalPatient/API] Load DashboardForApprovalPatients',
	props<{ dashboardForApprovalPatients: DashboardForApprovalPatient[] }>(),
)

export const addDashboardForApprovalPatient = createAction(
	'[DashboardForApprovalPatient/API] Add DashboardForApprovalPatient',
	props<{ dashboardForApprovalPatient: DashboardForApprovalPatient }>(),
)

export const upsertDashboardForApprovalPatient = createAction(
	'[DashboardForApprovalPatient/API] Upsert DashboardForApprovalPatient',
	props<{ dashboardForApprovalPatient: DashboardForApprovalPatient }>(),
)

export const deleteDashboardForApprovalPatient = createAction(
	'[DashboardForApprovalPatient/API] Delete DashboardForApprovalPatient',
	props<{ id: string }>(),
)
