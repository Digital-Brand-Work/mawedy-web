import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Store } from '@ngrx/store'
import { AppointmentStatusEnum } from 'app/app-core/enums/appointment-status.enum'
import { DB } from 'app/app-core/enums/index.db.enum'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, take } from 'rxjs'
import { DashboardForApprovalPatient } from '../../../for-approvals/dashboard-for-approval-patient.model'
import { DashboardWaitingPatient } from '../../../waiting-patients/dashboard-waiting-patient.model'
import { DashboardAppointment } from '../../dashboard-appointment.model'
import { DashboardAppointmentService } from '../../dashboard-appointment.service'
import { DashboardAppointmentCancelAndAssignSlotModal } from '../dashboard-appointment-cancel-and-assign-slot/dashboard-appointment-cancel-and-assign-slot.service'
import { DashboardAppointmentDetailsModal } from '../dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardAppointmentConfirmCancelAppointmentModal } from './dashboard-appointment-confirm-cancel-appointment.service'
import * as AppointmentActions from '../../../../appointments/appointment.actions'
import * as DashboardAppointmentActions from '../../../appointments/dashboard-appointment.actions'
import * as DashboardForApprovalPatients from '../../../for-approvals/dashboard-for-approval-patient.actions'
import * as DashboardWaitingPatients from '../../../waiting-patients/dashboard-waiting-patient.actions'

@Component({
	selector: 'dashboard-appointment-confirm-cancel-appointment',
	templateUrl:
		'./dashboard-appointment-confirm-cancel-appointment.component.html',
	styleUrls: [
		'./dashboard-appointment-confirm-cancel-appointment.component.scss',
	],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentConfirmCancelAppointmentComponent
	implements OnInit
{
	constructor(
		private _appointmentAPI: AppointmentService,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _dashboardAppointmentConfirmCancelAppointmentModal: DashboardAppointmentConfirmCancelAppointmentModal,
		private _dashboardAppointmentCancelAndAssignSlotModal: DashboardAppointmentCancelAndAssignSlotModal,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{
			dashboardForApprovalPatients: DashboardForApprovalPatient[]
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentConfirmCancelAppointmentModal.opened$

	dashboardAppointmentCancelAndAssignSlotModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentCancelAndAssignSlotModal.opened$

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentDetailsModal.opened$

	appointment$: BehaviorSubject<Appointment | null> =
		this._dashboardAppointmentService.current$

	ngOnInit(): void {}

	identity = (item: any) => item

	cancel() {
		this.appointment$.pipe(take(1)).subscribe((appointment) => {
			this._appointmentAPI
				.update(appointment.id, {
					status: AppointmentStatusEnum.CANCELLED,
				})
				.subscribe((data: any) => {
					this._indexDBService
						.update(DB.APPOINTMENTS, data.data)
						.subscribe(() => {
							this._store.dispatch(
								AppointmentActions.updateAppointment({
									appointment: data.data,
								}),
							)
						})

					this.resolveTransfer(data.data)

					this.appointment$.next(data.data)

					this._dashboardAppointmentCancelAndAssignSlotModal.opened$.next(
						false,
					)

					this._dashboardAppointmentConfirmCancelAppointmentModal.opened$.next(
						false,
					)
				})
		})
	}

	resolveTransfer(appointment: Appointment) {
		if (appointment.waiting === true) {
			this._indexDBService
				.deleteByKey(DB.DASHBOARD_WAITING_PATIENTS, appointment.id)
				.subscribe(() => {
					this._store.dispatch(
						DashboardWaitingPatients.deleteDashboardWaitingPatient({
							id: appointment.id,
						}),
					)
				})

			this._indexDBService
				.add(DB.DASHBOARD_APPOINTMENTS, appointment)
				.subscribe(() => {
					this._store.dispatch(
						DashboardAppointmentActions.addDashboardAppointment({
							dashboardAppointment: appointment,
						}),
					)
				})
		} else {
			this._store.dispatch(
				DashboardAppointmentActions.upsertDashboardAppointment({
					dashboardAppointment: appointment,
				}),
			)
		}
	}
}
