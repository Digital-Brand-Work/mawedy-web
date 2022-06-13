import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { Observable } from 'rxjs'
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
		}>,
	) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	appointments$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardAppointments'),
	)

	today = new Date(Date.now())

	keyword: string = ''

	ngOnInit(): void {}
}
