import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Doctor } from './doctor.model'
import * as DoctorActions from './doctor.actions'

export const doctorsFeatureKey = 'doctors'

export interface State extends EntityState<Doctor> {
	// additional entities state properties
}

export const adapter: EntityAdapter<Doctor> = createEntityAdapter<Doctor>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(DoctorActions.addDoctor, (state, action) =>
		adapter.addOne(action.doctor, state),
	),

	on(DoctorActions.upsertDoctor, (state, action) =>
		adapter.upsertOne(action.doctor, state),
	),

	on(DoctorActions.addDoctors, (state, action) =>
		adapter.addMany(action.doctors, state),
	),

	on(DoctorActions.upsertDoctors, (state, action) =>
		adapter.upsertMany(action.doctors, state),
	),

	on(DoctorActions.updateDoctor, (state, action) =>
		adapter.updateOne(action.doctor, state),
	),

	on(DoctorActions.updateDoctors, (state, action) =>
		adapter.updateMany(action.doctors, state),
	),

	on(DoctorActions.deleteDoctor, (state, action) =>
		adapter.removeOne(action.id, state),
	),

	on(DoctorActions.deleteDoctors, (state, action) =>
		adapter.removeMany(action.ids, state),
	),

	on(DoctorActions.loadDoctors, (state, action) =>
		adapter.setAll(action.doctors, state),
	),

	on(DoctorActions.clearDoctors, (state) => adapter.removeAll(state)),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
