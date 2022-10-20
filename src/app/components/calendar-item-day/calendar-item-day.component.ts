import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Time } from '@digital_brand_work/models/core.model'
import { select, Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentToolbarService } from 'app/modules/admin/appointments/appointments/appointment-toolbar.service'
import { DashboardAppointmentService } from 'app/modules/admin/dashboard/appointments/dashboard-appointment.service'
import { DashboardAppointmentDetailsModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'calendar-item-day',
	templateUrl: './calendar-item-day.component.html',
	styleUrls: ['./calendar-item-day.component.scss'],
	animations: [...dbwAnimations],
})
export class CalendarItemDayComponent implements OnInit {
	constructor(
		private _appointmentToolbarService: AppointmentToolbarService,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _store: Store<{
			appointments: Appointment[]
		}>,
	) {}

	@Input()
	time?: Time

	@Input()
	date?: Date

	ngOnInit(): void {}

	appointments$: Observable<Appointment[]> = this._store.pipe(
		select('appointments'),
	)

	viewAppointment(appointment: Appointment) {
		this._dashboardAppointmentService.current$.next(appointment)

		this._dashboardAppointmentDetailsModal.opened$.next(true)
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
