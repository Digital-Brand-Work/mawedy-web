import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { DashboardAppointment } from '../../appointments/dashboard-appointment.model'
import { DashboardWaitingPatient } from '../dashboard-waiting-patient.model'

@Component({
	selector: 'waiting-patients-toolbar',
	templateUrl: './waiting-patients-toolbar.component.html',
	styleUrls: ['./waiting-patients-toolbar.component.scss'],
})
export class WaitingPatientsToolbarComponent implements OnInit {
	constructor(
		private _store: Store<{
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	dashboardAppointments$: Observable<DashboardAppointment[]> =
		this._store.pipe(select('dashboardAppointments'))

	dashboardWaitingPatients$: Observable<DashboardWaitingPatient[]> =
		this._store.pipe(select('dashboardWaitingPatients'))

	today = new Date(Date.now())

	keyword: string = ''

	ngOnInit(): void {}
}
