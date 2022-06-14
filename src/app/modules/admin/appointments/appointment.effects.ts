import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import { EMPTY } from 'rxjs'
import { AppointmentService } from './appointment.service'
import * as AppointmentActions from './appointment.actions'

@Injectable()
export class AppointmentEffects {
	constructor(
		private actions$: Actions,
		private service: AppointmentService,
	) {}

	// get$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(AppointmentActions.loadAppointments),
	// 			mergeMap(() =>
	// 				this.service.get().pipe(
	// 					map((appointments) => ({
	// 						type: AppointmentActions.loadAppointments,
	// 						payload: appointments,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// add$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(AppointmentActions.addAppointment),
	// 			concatMap(({ appointment }) =>
	// 				this.service.post(appointment).pipe(
	// 					map((appointment) => ({
	// 						type: AppointmentActions.addAppointment,
	// 						payload: appointment,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// update$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(AppointmentActions.updateAppointment),
	// 			concatMap(({ appointment }) =>
	// 				this.service
	// 					.updateWithFile(appointment.id, appointment)
	// 					.pipe(
	// 						map((appointment) => ({
	// 							type: AppointmentActions.updateAppointment,
	// 							payload: appointment,
	// 						})),
	// 						catchError(() => EMPTY),
	// 					),
	// 			),
	// 		) as any,
	// )

	// remove$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(AppointmentActions.deleteAppointment),
	// 			concatMap(({ id }) =>
	// 				this.service.remove(id).pipe(
	// 					map(() => ({
	// 						type: AppointmentActions.deleteAppointment,
	// 						payload: id,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )
}
