import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { DashboardAppointment } from './dashboard-appointment.model'
import * as DashboardAppointmentActions from './dashboard-appointment.actions'

export const dashboardAppointmentsFeatureKey = 'dashboardAppointments'

export interface State extends EntityState<DashboardAppointment> {
	// additional entities state properties
}

export const adapter: EntityAdapter<DashboardAppointment> =
	createEntityAdapter<DashboardAppointment>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(DashboardAppointmentActions.loadDashboardAppointments, (state, action) =>
		adapter.setAll(action.dashboardAppointments, state),
	),

	on(DashboardAppointmentActions.addDashboardAppointment, (state, action) =>
		adapter.addOne(action.dashboardAppointment, state),
	),

	on(
		DashboardAppointmentActions.updateDashboardAppointment,
		(state, action) =>
			adapter.updateOne(action.dashboardAppointment, state),
	),

	on(
		DashboardAppointmentActions.deleteDashboardAppointment,
		(state, action) => adapter.removeOne(action.id, state),
	),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
