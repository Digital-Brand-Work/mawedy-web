import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Patient } from './patient.model'
import * as PatientActions from './patient.actions'

export const patientsFeatureKey = 'patients'

export interface State extends EntityState<Patient> {
	// additional entities state properties
}

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(PatientActions.addPatient, (state, action) =>
		adapter.addOne(action.patient, state),
	),

	on(PatientActions.upsertPatient, (state, action) =>
		adapter.upsertOne(action.patient, state),
	),

	on(PatientActions.addPatients, (state, action) =>
		adapter.addMany(action.patients, state),
	),

	on(PatientActions.upsertPatients, (state, action) =>
		adapter.upsertMany(action.patients, state),
	),

	on(PatientActions.updatePatient, (state, action) =>
		adapter.updateOne(action.patient, state),
	),

	on(PatientActions.updatePatients, (state, action) =>
		adapter.updateMany(action.patients, state),
	),

	on(PatientActions.deletePatient, (state, action) =>
		adapter.removeOne(action.id, state),
	),

	on(PatientActions.deletePatients, (state, action) =>
		adapter.removeMany(action.ids, state),
	),

	on(PatientActions.loadPatients, (state, action) =>
		adapter.setAll(action.patients, state),
	),

	on(PatientActions.clearPatients, (state) => adapter.removeAll(state)),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
