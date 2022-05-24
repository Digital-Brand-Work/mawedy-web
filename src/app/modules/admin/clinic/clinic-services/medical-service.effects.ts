import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import { EMPTY } from 'rxjs'
import { MedicalService_Service } from './medical-service.service'
import * as MedicalServiceActions from './medical-service.actions'

@Injectable()
export class MedicalServiceEffects {
	constructor(
		private actions$: Actions,
		private service: MedicalService_Service,
	) {}

	get$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MedicalServiceActions.loadMedicalServices),
				mergeMap(() =>
					this.service.get().pipe(
						map((data) => ({
							type: MedicalServiceActions.loadMedicalServices,
							payload: data,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	add$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MedicalServiceActions.addMedicalService),
				concatMap(({ medicalService }) =>
					this.service.post(medicalService).pipe(
						map((data) => ({
							type: MedicalServiceActions.addMedicalService,
							payload: data,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	update$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MedicalServiceActions.updateMedicalService),
				concatMap(({ medicalService }) =>
					this.service
						.updateWithFile(medicalService.id, medicalService)
						.pipe(
							map((data) => ({
								type: MedicalServiceActions.updateMedicalService,
								payload: data,
							})),
							catchError(() => EMPTY),
						),
				),
			) as any,
	)

	remove$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MedicalServiceActions.deleteMedicalService),
				concatMap(({ id }) =>
					this.service.remove(id).pipe(
						map(() => ({
							type: MedicalServiceActions.deleteMedicalService,
							payload: id,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)
}
