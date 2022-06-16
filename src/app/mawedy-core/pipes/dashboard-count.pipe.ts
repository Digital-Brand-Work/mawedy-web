import { Pipe, PipeTransform } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { DashboardAppointment } from 'app/modules/admin/dashboard/appointments/dashboard-appointment.model'
import { DashboardWaitingPatient } from 'app/modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.model'
import { map, Observable, Subject, takeUntil } from 'rxjs'

@Pipe({
	name: 'dashboard_count',
})
export class DashboardCountPipe implements PipeTransform {
	constructor(
		private _store: Store<{
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	dashboardAppointments$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardAppointments'),
	)

	dashboardWaitingPatients$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardWaitingPatients'),
	)

	forApprovalPatients$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardWaitingPatients'),
	)

	transform(id: number): Observable<any> {
		console.log(
			this.dashboardAppointments$.pipe(takeUntil(this.unsubscribe$)),
		)

		if (id === 1) {
			return this.dashboardAppointments$.pipe(
				takeUntil(this.unsubscribe$),
			)
		}

		if (id === 2) {
			return this.dashboardWaitingPatients$.pipe(
				takeUntil(this.unsubscribe$),
			)
		}

		if (id === 3) {
			return this.dashboardAppointments$.pipe(
				takeUntil(this.unsubscribe$),
			)
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
