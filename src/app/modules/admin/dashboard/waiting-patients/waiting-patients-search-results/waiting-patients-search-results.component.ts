import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import * as WaitingPatientsActions from '../dashboard-waiting-patient.actions'
import * as dayjs from 'dayjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'waiting-patients-search-results',
	templateUrl: './waiting-patients-search-results.component.html',
	styleUrls: ['./waiting-patients-search-results.component.scss'],
	animations: [...dbwAnimations],
})
export class WaitingPatientsSearchResultsComponent implements OnInit {
	constructor(
		private _appointmentAPI: AppointmentService,
		private _store: Store<{ appointments: Appointment[] }>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.onReset()
	}

	isSearching: boolean = false

	isReady: boolean = true

	keyword: string = ''

	appointments: Appointment[] = []

	ngOnInit(): void {}

	identity = (item: any) => item

	onReset() {
		this.keyword = ''

		const search = {
			waiting: 'true',
			date: dayjs().toJSON(),
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this.appointments = []

				this._store.dispatch(
					WaitingPatientsActions.loadDashboardWaitingPatients({
						dashboardWaitingPatients: appointments.data,
					}),
				)
			})
	}

	onEnter() {
		this._store.dispatch(
			WaitingPatientsActions.loadDashboardWaitingPatients({
				dashboardWaitingPatients: this.appointments,
			}),
		)

		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			const search = {
				keyword: this.keyword,
				waiting: 'true',
				date: dayjs().toJSON(),
			}

			this._appointmentAPI
				.query(`?` + new URLSearchParams(search).toString())
				.subscribe((appointments: any) => {
					this.appointments = appointments.data

					setTimeout(() => {
						this.isReady = true
					}, 250)
				})
		}
	}
}
