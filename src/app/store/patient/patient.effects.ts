import { Injectable } from '@angular/core'
import { PatientService } from './patient.service'
import { EMPTY } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import * as PatientActions from './patient.actions'
import { Patient } from './patient.model'

@Injectable()
export class PatientEffects {
	constructor(private actions$: Actions, private service: PatientService) {}

	get$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PatientActions.loadPatients),
				mergeMap(() =>
					this.service.get().pipe(
						map((doctors: Patient) => ({
							type: PatientActions.loadPatients,
							payload: doctors,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	add$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PatientActions.addPatient),
				concatMap(({ patient }) =>
					this.service.post(patient).pipe(
						map((patient: Patient) => ({
							type: PatientActions.addPatient,
							payload: patient,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	update$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PatientActions.updatePatient),
				concatMap(({ patient }) =>
					this.service.updateWithFile(patient.id, patient).pipe(
						map((patient: Patient) => ({
							type: PatientActions.updatePatient,
							payload: patient,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	remove$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(PatientActions.deletePatient),
				concatMap(({ id }) =>
					this.service.remove(id).pipe(
						map(() => ({
							type: PatientActions.deletePatient,
							payload: id,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)
}
