import { Injectable } from '@angular/core'
import { PHPResponse } from '@digital_brand_work/models/core.model'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { DB } from 'app/app-core/enums/index.db.enum'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { switchMap, map, tap } from 'rxjs/operators'
import { StoreAction } from '../../core/action.enum'
import { PatientEffectService } from './patient-effects.service'

@Injectable({
	providedIn: 'root',
})
export class PatientEffects {
	constructor(
		private _actions$: Actions,
		private _indexDBService: NgxIndexedDBService,
		private _paginationService: PaginationService,
		private _patientEffectService: PatientEffectService,
	) {}

	loadPagination<T>(response: PHPResponse<T>): void {
		this._paginationService.patients$.next({
			links: response.links,
			meta: response.meta,
		})
	}

	load$ = createEffect(() =>
		this._actions$.pipe(
			ofType(StoreAction.PATIENT.LOAD),
			switchMap(() =>
				this._patientEffectService.get().pipe(
					tap((response) => {
						const patients = response.data

						this._indexDBService
							.bulkAdd(DB.PATIENTS, patients)
							.subscribe()

						this.loadPagination(response)
					}),
					map((response) => response.data),
					map((patients) =>
						StoreAction.PATIENT.LOAD_SUCCESS({
							patients: patients,
						}),
					),
				),
			),
		),
	)

	remove$ = createEffect(() =>
		this._actions$.pipe(
			ofType(StoreAction.PATIENT.REMOVE),
			switchMap((action) =>
				this._patientEffectService.get().pipe(
					tap(() => {
						this._indexDBService
							.delete(DB.PATIENTS, action.id)
							.subscribe()
					}),
					map(() =>
						StoreAction.PATIENT.REMOVE_SUCCESS({
							id: action.id,
						}),
					),
				),
			),
		),
	)
}
