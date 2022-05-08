import { Action, createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Promotion } from './promotion.model'
import * as PromotionActions from './promotion.actions'

export const promotionsFeatureKey = 'promotions'

export interface State extends EntityState<Promotion> {
	// additional entities state properties
}

export const adapter: EntityAdapter<Promotion> =
	createEntityAdapter<Promotion>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(PromotionActions.addPromotion, (state, action) =>
		adapter.addOne(action.promotion, state),
	),

	on(PromotionActions.upsertPromotion, (state, action) =>
		adapter.upsertOne(action.promotion, state),
	),

	on(PromotionActions.addPromotions, (state, action) =>
		adapter.addMany(action.promotions, state),
	),

	on(PromotionActions.upsertPromotions, (state, action) =>
		adapter.upsertMany(action.promotions, state),
	),

	on(PromotionActions.updatePromotion, (state, action) =>
		adapter.updateOne(action.promotion, state),
	),

	on(PromotionActions.updatePromotions, (state, action) =>
		adapter.updateMany(action.promotions, state),
	),

	on(PromotionActions.deletePromotion, (state, action) =>
		adapter.removeOne(action.id, state),
	),

	on(PromotionActions.deletePromotions, (state, action) =>
		adapter.removeMany(action.ids, state),
	),

	on(PromotionActions.loadPromotions, (state, action) =>
		adapter.setAll(action.promotions, state),
	),

	on(PromotionActions.clearPromotions, (state) => adapter.removeAll(state)),
)

export const { selectIds, selectEntities, selectAll, selectTotal } =
	adapter.getSelectors()
