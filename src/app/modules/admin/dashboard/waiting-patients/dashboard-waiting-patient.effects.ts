import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import { EMPTY } from 'rxjs'
import { DashboardWaitingPatientService } from './dashboard-waiting-patient.service'
import * as DashboardWaitingPatientActions from './dashboard-waiting-patient.actions'

@Injectable()
export class DashboardWaitingPatientEffects {
	constructor(
		private actions$: Actions,
		private service: DashboardWaitingPatientService,
	) {}

	get$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					DashboardWaitingPatientActions.loadDashboardWaitingPatients,
				),
				mergeMap(() =>
					this.service.get().pipe(
						map((appointments) => ({
							type: DashboardWaitingPatientActions.loadDashboardWaitingPatients,
							payload: appointments,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	add$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					DashboardWaitingPatientActions.addDashboardWaitingPatient,
				),
				concatMap(({ dashboardWaitingPatient }) =>
					this.service.post(dashboardWaitingPatient).pipe(
						map((dashboardWaitingPatient) => ({
							type: DashboardWaitingPatientActions.addDashboardWaitingPatient,
							payload: dashboardWaitingPatient,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	update$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					DashboardWaitingPatientActions.updateDashboardWaitingPatient,
				),
				concatMap(({ dashboardWaitingPatient }) =>
					this.service
						.updateWithFile(
							dashboardWaitingPatient.id,
							dashboardWaitingPatient,
						)
						.pipe(
							map((dashboardWaitingPatient) => ({
								type: DashboardWaitingPatientActions.updateDashboardWaitingPatient,
								payload: dashboardWaitingPatient,
							})),
							catchError(() => EMPTY),
						),
				),
			) as any,
	)

	remove$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					DashboardWaitingPatientActions.deleteDashboardWaitingPatient,
				),
				concatMap(({ id }) =>
					this.service.remove(id).pipe(
						map(() => ({
							type: DashboardWaitingPatientActions.deleteDashboardWaitingPatient,
							payload: id,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)
}
