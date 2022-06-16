import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from 'app/components/alert/alert.service'
import { AppointmentStatusEnum } from 'app/mawedy-core/enums/appointment-status.enum'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, take } from 'rxjs'
import { DashboardAppointmentService } from '../../dashboard-appointment.service'
import { DashboardAppointmentConfirmCancelAppointmentModal } from '../dashboard-appointment-confirm-cancel-appointment/dashboard-appointment-confirm-cancel-appointment.service'
import { DashboardAppointmentConfirmReassignSlotModal } from '../dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.service'
import {
	AppointmentNotificationService,
	DashboardAppointmentDetailsModal,
} from './dashboard-appointment-details.service'

@Component({
	selector: 'dashboard-appointment-details',
	templateUrl: './dashboard-appointment-details.component.html',
	styleUrls: ['./dashboard-appointment-details.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentDetailsComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _errorHandlerService: ErrorHandlerService,
		private dashboardAppointmentConfirmReassignSlotModal: DashboardAppointmentConfirmReassignSlotModal,
		private dashboardAppointmentConfirmCancelAppointmentModal: DashboardAppointmentConfirmCancelAppointmentModal,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _AppointmentNotificationService: AppointmentNotificationService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	dashboardAppointmentConfirmReassignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmReassignSlotModal.opened$

	dashboardAppointmentConfirmCancelAppointmentModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmCancelAppointmentModal.opened$

	appointment$: BehaviorSubject<Appointment | null> =
		this._dashboardAppointmentService.current$

	ngOnInit(): void {}

	resolveColor(appointment: Appointment): string {
		if (appointment.status === AppointmentStatusEnum.CANCELLED) {
			return `red`
		}

		if (appointment.status === AppointmentStatusEnum.CONFIRMED) {
			return `green`
		}

		if (appointment.status === AppointmentStatusEnum.DONE) {
			return `blue`
		}

		if (appointment.status === AppointmentStatusEnum.PENDING) {
			return `red`
		}
	}

	send(type: 'sms' | 'mail') {
		this.appointment$.pipe(take(1)).subscribe((appointment) => {
			if (appointment) {
				this._AppointmentNotificationService
					.post({
						appointment_id: appointment.id,
						channels: [type],
					})
					.subscribe({
						next: () => {
							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `${type.toUpperCase()} successfully sent!`,
								message: `You have successfully sent ${type} to ${appointment.patient.first_name}  ${appointment.patient.middle_name} ${appointment.patient.last_name}`,
								type: 'success',
							})
						},
						error: (http) => {
							this._errorHandlerService.handleError(http)
						},
					})
			}
		})
	}

	reschedule() {
		this.appointment$.pipe(take(1)).subscribe((appointment) => {
			this.dashboardAppointmentConfirmReassignSlotModal.doctor$.next(
				appointment.doctor,
			)

			this.dashboardAppointmentConfirmReassignSlotModalOpened$.next(true)
		})
	}
}
