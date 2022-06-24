import { Appointment } from './../../../appointments/appointment.model';
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service';
import { AppointmentStatusEnum } from './../../../../../mawedy-core/enums/appointment-status.enum';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { dbwAnimations } from '@digital_brand_work/animations/animation.api';
import * as ForApprovalActions from '../dashboard-for-approval-patient.actions'

@Component({
	selector: 'for-approals-search-results',
	templateUrl: './for-approals-search-results.component.html',
	styleUrls: ['./for-approals-search-results.component.scss'],
	animations:[...dbwAnimations]
})
export class ForApproalsSearchResultsComponent implements OnInit {
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
			status: AppointmentStatusEnum.PENDING,
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this.appointments = []

				this._store.dispatch(
					ForApprovalActions.loadDashboardForApprovalPatients({
						dashboardForApprovalPatients: appointments.data,
					}),
				)
			})
	}

	onEnter() {
		this._store.dispatch(
			ForApprovalActions.loadDashboardForApprovalPatients({
				dashboardForApprovalPatients: this.appointments,
			}),
		)

		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			const search = {
				keyword: this.keyword,
				status: AppointmentStatusEnum.PENDING,
			}

			this._appointmentAPI
				.query(`?` + new URLSearchParams(search).toString())
				.subscribe((appointments: any) => {
					this.appointments = appointments.data

					console.log(appointments.data)

					setTimeout(() => {
						this.isReady = true
					}, 250)
				})
		}
	}
}
