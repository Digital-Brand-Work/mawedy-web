import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, tap } from 'rxjs/operators'
import { StoreAction } from '../../core/action.enum'
import { AppSubscriptionEffectService } from './app-subscription-effects.service'

@Injectable({
	providedIn: 'root',
})
export class AppSubscriptionEffects {
	constructor(
		private _actions$: Actions,
		private _appSubscriptionEffectService: AppSubscriptionEffectService,
	) {}

	load$ = createEffect(() =>
		this._actions$.pipe(
			ofType(StoreAction.APP_SUBSCRIPTION.LOAD),
			switchMap(() =>
				this._appSubscriptionEffectService.get().pipe(
					map((subscription) =>
						StoreAction.APP_SUBSCRIPTION.LOAD_SUCCESS({
							subscription: subscription,
						}),
					),
				),
			),
		),
	)
}
