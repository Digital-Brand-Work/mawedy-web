import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { DashboardForApprovalPatient } from './dashboard-for-approval-patient.model'
import * as DashboardForApprovalPatientActions from './dashboard-for-approval-patient.actions'

export const dashboardForApprovalPatientsFeatureKey =
	'dashboardForApprovalPatients'

export interface State extends EntityState<DashboardForApprovalPatient> {
	// additional entities state properties
}

export const adapter: EntityAdapter<DashboardForApprovalPatient> =
	createEntityAdapter<DashboardForApprovalPatient>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(
		DashboardForApprovalPatientActions.loadDashboardForApprovalPatients,
		(state, action) =>
			adapter.setAll(action.dashboardForApprovalPatients, state),
	),
	on(
		DashboardForApprovalPatientActions.addDashboardForApprovalPatient,
		(state, action) =>
			adapter.addOne(action.dashboardForApprovalPatient, state),
	),
	on(
		DashboardForApprovalPatientActions.upsertDashboardForApprovalPatient,
		(state, action) =>
			adapter.upsertOne(action.dashboardForApprovalPatient, state),
	),

	on(
		DashboardForApprovalPatientActions.deleteDashboardForApprovalPatient,
		(state, action) => adapter.removeOne(action.id, state),
	),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
