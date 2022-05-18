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

export const updatePromotion = createAction(
	'[Promotion/API] Update Promotion',
	props<{ promotion: Update<Promotion> }>(),
)

export const deletePromotion = createAction(
	'[Promotion/API] Delete Promotion',
	props<{ id: string }>(),
)
