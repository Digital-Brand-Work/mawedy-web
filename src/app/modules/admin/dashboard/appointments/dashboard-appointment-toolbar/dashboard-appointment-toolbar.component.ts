import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { Observable } from 'rxjs'
import { DashboardWaitingPatient } from '../../waiting-patients/dashboard-waiting-patient.model'
import { DashboardAppointment } from '../dashboard-appointment.model'

@Component({
	selector: 'dashboard-toolbar',
	templateUrl: './dashboard-appointment-toolbar.component.html',
	styleUrls: ['./dashboard-appointment-toolbar.component.scss'],
})
export class DashboardAppointmentToolbarComponent implements OnInit {
	constructor(
		private _store: Store<{
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	dashboardAppointments$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardAppointments'),
	)

	dashboardWaitingPatients$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardWaitingPatients'),
	)

	today = new Date(Date.now())

	keyword: string = ''

	ngOnInit(): void {}
}
