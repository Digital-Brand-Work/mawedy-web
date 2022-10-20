import { Appointment } from './../../modules/admin/appointments/appointment.model'
import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { DashboardAppointmentDetailsModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardAppointmentService } from 'app/modules/admin/dashboard/appointments/dashboard-appointment.service'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { AppointmentToolbarService } from 'app/modules/admin/appointments/appointments/appointment-toolbar.service'
import { Time } from '@digital_brand_work/models/core.model'

@Component({
	selector: 'calendar-items',
	templateUrl: './calendar-item.component.html',
	styleUrls: ['./calendar-item.component.scss'],
	animations: [...dbwAnimations],
})
export class CalendarItemComponent implements OnInit {
	constructor(
		private _appointmentToolbarService: AppointmentToolbarService,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _store: Store<{
			appointments: Appointment[]
		}>,
	) {}

	@Input()
	date: Date

	@Input()
	time?: Time

	@Input()
	matchTime: boolean = false

	@Input()
	weekly: boolean = false

	doctor$ = this._appointmentToolbarService.doctorFilter$

	appointments$ = this._store.pipe(select('appointments'))

	ngOnInit(): void {}

	viewAppointment(appointment: Appointment) {
		this._dashboardAppointmentService.current$.next(appointment)
		this._dashboardAppointmentDetailsModal.opened$.next(true)
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
