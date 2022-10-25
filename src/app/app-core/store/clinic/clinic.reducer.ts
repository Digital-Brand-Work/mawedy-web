import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { StoreAction } from '../core/action.enum'

export interface State extends EntityState<Clinic> {}

export const adapter: EntityAdapter<Clinic> = createEntityAdapter<Clinic>()

export const initialState: State = adapter.getInitialState({})

export const clinicReducer = createReducer(
	initialState,

	on(StoreAction.CLINIC.LOAD_SUCCESS, (state, action) =>
		adapter.setAll([action.clinic], state),
	),
)

export const CLINIC_SELECTORS = adapter.getSelectors()

export const { selectIds, selectEntities, selectAll, selectTotal } =
	CLINIC_SELECTORS
