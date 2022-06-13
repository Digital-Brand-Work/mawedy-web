import { Injectable } from '@angular/core'
import { EMPTY } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import * as PromotionActions from './promotion.actions'
import { PromotionServiceService } from './promotion.service'

@Injectable()
export class PromotionEffects {
	constructor(
		private actions$: Actions,
		private service: PromotionServiceService,
	) {}

	// get$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(PromotionActions.loadPromotions),
	// 			mergeMap(() =>
	// 				this.service.get().pipe(
	// 					map((promotions) => ({
	// 						type: PromotionActions.loadPromotions,
	// 						payload: promotions,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// add$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(PromotionActions.addPromotion),
	// 			concatMap(({ promotion }) =>
	// 				this.service.post(promotion).pipe(
	// 					map((promotion) => ({
	// 						type: PromotionActions.addPromotion,
	// 						payload: promotion,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// update$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(PromotionActions.updatePromotion),
	// 			concatMap(({ promotion }) =>
	// 				this.service.updateWithFile(promotion.id, promotion).pipe(
	// 					map((promotion) => ({
	// 						type: PromotionActions.updatePromotion,
	// 						payload: promotion,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// remove$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(PromotionActions.deletePromotion),
	// 			concatMap(({ id }) =>
	// 				this.service.remove(id).pipe(
	// 					map(() => ({
	// 						type: PromotionActions.deletePromotion,
	// 						payload: id,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )
}
