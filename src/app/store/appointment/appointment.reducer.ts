import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Appointment } from './appointment.model'
import * as AppointmentActions from './appointment.actions'

export const appointmentsFeatureKey = 'appointments'

export interface State extends EntityState<Appointment> {
	// additional entities state properties
}

export const adapter: EntityAdapter<Appointment> =
	createEntityAdapter<Appointment>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(AppointmentActions.addAppointment, (state, action) =>
		adapter.addOne(action.appointment, state),
	),

	on(AppointmentActions.upsertAppointment, (state, action) =>
		adapter.upsertOne(action.appointment, state),
	),

	on(AppointmentActions.addAppointments, (state, action) =>
		adapter.addMany(action.appointments, state),
	),

	on(AppointmentActions.upsertAppointments, (state, action) =>
		adapter.upsertMany(action.appointments, state),
	),

	on(AppointmentActions.updateAppointment, (state, action) =>
		adapter.updateOne(action.appointment, state),
	),

	on(AppointmentActions.updateAppointments, (state, action) =>
		adapter.updateMany(action.appointments, state),
	),

	on(AppointmentActions.deleteAppointment, (state, action) =>
		adapter.removeOne(action.id, state),
	),

	on(AppointmentActions.deleteAppointments, (state, action) =>
		adapter.removeMany(action.ids, state),
	),

	on(AppointmentActions.loadAppointments, (state, action) =>
		adapter.setAll(action.appointments, state),
	),

	on(AppointmentActions.clearAppointments, (state) =>
		adapter.removeAll(state),
	),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
