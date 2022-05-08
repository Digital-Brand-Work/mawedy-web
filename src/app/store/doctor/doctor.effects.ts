import { Doctor } from './doctor.model'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import * as DoctorActions from './doctor.actions'
import { DoctorService } from './doctor.service'
import { EMPTY } from 'rxjs'

@Injectable()
export class DoctorEffects {
	constructor(private actions$: Actions, private service: DoctorService) {}

	get$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DoctorActions.loadDoctors),
				mergeMap(() =>
					this.service.get().pipe(
						map((doctors: Doctor) => ({
							type: DoctorActions.loadDoctors,
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
				ofType(DoctorActions.addDoctor),
				concatMap(({ doctor }) =>
					this.service.post(doctor).pipe(
						map((doctor: Doctor) => ({
							type: DoctorActions.addDoctor,
							payload: doctor,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	update$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DoctorActions.updateDoctor),
				concatMap(({ doctor }) =>
					this.service.updateWithFile(doctor.id, doctor).pipe(
						map((doctor: Doctor) => ({
							type: DoctorActions.updateDoctor,
							payload: doctor,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	remove$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DoctorActions.deleteDoctor),
				concatMap(({ id }) =>
					this.service.remove(id).pipe(
						map(() => ({
							type: DoctorActions.deleteDoctor,
							payload: id,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)
}
