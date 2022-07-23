import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { PaginationService } from 'app/misc/pagination.service'
import { PaginationData } from 'app/app.resolvers'
import * as DashboardAppointmentActions from '../dashboard-appointment.actions'
import * as dayjs from 'dayjs'

@Component({
	selector: 'dashboard-appointment-search-results',
	templateUrl: './dashboard-appointment-search-results.component.html',
	styleUrls: ['./dashboard-appointment-search-results.component.scss'],
})
export class DashboardAppointmentSearchResultsComponent implements OnInit {
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
			waiting: 'false',
			date: dayjs().toJSON(),
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this.appointments = []

				this._store.dispatch(
					DashboardAppointmentActions.loadDashboardAppointments({
						dashboardAppointments: appointments.data,
					}),
				)
			})
	}

	onEnter() {
		this._store.dispatch(
			DashboardAppointmentActions.loadDashboardAppointments({
				dashboardAppointments: this.appointments,
			}),
		)

		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			const search = {
				keyword: this.keyword,
				waiting: 'false',
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
