import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { MedicalService } from './medical-service.model'
import * as MedicalServiceActions from './medical-service.actions'

export const medicalServicesFeatureKey = 'medicalService'

export interface State extends EntityState<MedicalService> {
	// additional entities state properties
}

export const adapter: EntityAdapter<MedicalService> =
	createEntityAdapter<MedicalService>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(MedicalServiceActions.loadMedicalServices, (state, action) =>
		adapter.setAll(action.medicalServices, state),
	),

	on(MedicalServiceActions.addMedicalService, (state, action) =>
		adapter.addOne(action.medicalService, state),
	),

	on(MedicalServiceActions.updateMedicalService, (state, action) =>
		adapter.updateOne(action.medicalService, state),
	),

	on(MedicalServiceActions.deleteMedicalService, (state, action) =>
		adapter.removeOne(action.id, state),
	),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
