import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { DB } from 'app/app-core/enums/index.db.enum'
import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { switchMap, map, tap } from 'rxjs/operators'
import { StoreAction } from '../../core/action.enum'
import { ClinicEffectService } from './clinic-effects.service'

@Injectable({
	providedIn: 'root',
})
export class ClinicEffects {
	constructor(
		private _actions$: Actions,
		private _clinicUserService: ClinicUserService,
		private _clinicEffectService: ClinicEffectService,
		private _indexedDBController: IndexedDbController,
	) {}

	load$ = createEffect(() =>
		this._actions$.pipe(
			ofType(StoreAction.CLINIC.LOAD),
			switchMap(() =>
				this._clinicEffectService.get().pipe(
					tap((clinic) => {
						this._clinicUserService.clinic = clinic
						this._clinicUserService.clinic$.next(clinic)
						this._indexedDBController.upsert(DB.CLINIC, clinic)
					}),
					map((clinic) =>
						StoreAction.CLINIC.LOAD_SUCCESS({
							clinic: clinic,
						}),
					),
				),
			),
		),
	)
}
