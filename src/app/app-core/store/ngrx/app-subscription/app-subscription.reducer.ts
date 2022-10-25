import { StoreAction } from './../../core/action.enum'
import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

export interface State extends EntityState<any> {}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>()

export const initialState: State = adapter.getInitialState({})

export const appSubscriptionReducer = createReducer(
	initialState,

	on(StoreAction.APP_SUBSCRIPTION.LOAD_SUCCESS, (state, action) =>
		adapter.setAll([action.subscription], state),
	),
)

export const APP_SUBSCRIPTION_SELECTORS = adapter.getSelectors()

export const { selectIds, selectEntities, selectAll, selectTotal } =
	APP_SUBSCRIPTION_SELECTORS
