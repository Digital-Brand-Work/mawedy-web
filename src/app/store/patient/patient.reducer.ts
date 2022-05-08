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

	on(PatientActions.loadPatients, (state, action) =>
		adapter.setAll(action.patients, state),
	),

	on(PatientActions.addPatient, (state, action) =>
		adapter.addOne(action.patient, state),
	),

	on(PatientActions.updatePatient, (state, action) =>
		adapter.updateOne(action.patient, state),
	),

	on(PatientActions.deletePatient, (state, action) =>
		adapter.removeOne(action.id, state),
	),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
