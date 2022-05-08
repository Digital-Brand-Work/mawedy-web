import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'

import { Promotion } from './promotion.model'

export const loadPromotions = createAction(
	'[Promotion/API] Load Promotions',
	props<{ promotions: Promotion[] }>(),
)

export const addPromotion = createAction(
	'[Promotion/API] Add Promotion',
	props<{ promotion: Promotion }>(),
)

export const upsertPromotion = createAction(
	'[Promotion/API] Upsert Promotion',
	props<{ promotion: Promotion }>(),
)

export const addPromotions = createAction(
	'[Promotion/API] Add Promotions',
	props<{ promotions: Promotion[] }>(),
)

export const upsertPromotions = createAction(
	'[Promotion/API] Upsert Promotions',
	props<{ promotions: Promotion[] }>(),
)

export const updatePromotion = createAction(
	'[Promotion/API] Update Promotion',
	props<{ promotion: Update<Promotion> }>(),
)

export const updatePromotions = createAction(
	'[Promotion/API] Update Promotions',
	props<{ promotions: Update<Promotion>[] }>(),
)

export const deletePromotion = createAction(
	'[Promotion/API] Delete Promotion',
	props<{ id: string }>(),
)

export const deletePromotions = createAction(
	'[Promotion/API] Delete Promotions',
	props<{ ids: string[] }>(),
)

export const clearPromotions = createAction('[Promotion/API] Clear Promotions')
