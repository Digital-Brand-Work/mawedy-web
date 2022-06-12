import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import { EMPTY } from 'rxjs'
import * as DashboardAppointmentActions from './dashboard-appointment.actions'
import { DashboardAppointmentService } from './dashboard-appointment.service'

@Injectable()
export class DashboardAppointmentEffects {
	constructor(
		private actions$: Actions,
		private service: DashboardAppointmentService,
	) {}

	// get$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(DashboardAppointmentActions.loadDashboardAppointments),
	// 			mergeMap(() =>
	// 				this.service.get().pipe(
	// 					map((appointments) => ({
	// 						type: DashboardAppointmentActions.loadDashboardAppointments,
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
	// 			ofType(DashboardAppointmentActions.addDashboardAppointment),
	// 			concatMap(({ dashboardAppointment }) =>
	// 				this.service.post(dashboardAppointment).pipe(
	// 					map((dashboardAppointment) => ({
	// 						type: DashboardAppointmentActions.addDashboardAppointment,
	// 						payload: dashboardAppointment,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )

	// update$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(DashboardAppointmentActions.updateDashboardAppointment),
	// 			concatMap(({ dashboardAppointment }) =>
	// 				this.service
	// 					.updateWithFile(
	// 						dashboardAppointment.id,
	// 						dashboardAppointment,
	// 					)
	// 					.pipe(
	// 						map((dashboardAppointment) => ({
	// 							type: DashboardAppointmentActions.updateDashboardAppointment,
	// 							payload: dashboardAppointment,
	// 						})),
	// 						catchError(() => EMPTY),
	// 					),
	// 			),
	// 		) as any,
	// )

	// remove$ = createEffect(
	// 	() =>
	// 		this.actions$.pipe(
	// 			ofType(DashboardAppointmentActions.deleteDashboardAppointment),
	// 			concatMap(({ id }) =>
	// 				this.service.remove(id).pipe(
	// 					map(() => ({
	// 						type: DashboardAppointmentActions.deleteDashboardAppointment,
	// 						payload: id,
	// 					})),
	// 					catchError(() => EMPTY),
	// 				),
	// 			),
	// 		) as any,
	// )
}
