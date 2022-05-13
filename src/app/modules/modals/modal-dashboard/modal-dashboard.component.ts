import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { DashboardAppointmentCancelAndAssignSlotModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-cancel-and-assign-slot/dashboard-appointment-cancel-and-assign-slot.service'
import { DashboardAppointmentConfirmCancelAppointmentModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-cancel-appointment/dashboard-appointment-confirm-cancel-appointment.service'
import { DashboardAppointmentConfirmReassignSlotModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.service'
import { DashboardAppointmentDetailsModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardAppointmentSelectDoctorModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.service'
import { DashboardAppointmentSelectTimeSlotModal } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-dashboard',
	templateUrl: './modal-dashboard.component.html',
	styleUrls: ['./modal-dashboard.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalDashboardComponent implements OnInit {
	constructor(
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
		private dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,
		private dashboardAppointmentConfirmReassignSlotModal: DashboardAppointmentConfirmReassignSlotModal,
		private dashboardAppointmentConfirmCancelAppointmentModal: DashboardAppointmentConfirmCancelAppointmentModal,
		private dashboardAppointmentCancelAndAssignSlotModal: DashboardAppointmentCancelAndAssignSlotModal,
	) {}

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	dashboardAppointmentSelectDoctorModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectDoctorModal.opened$

	dashboardAppointmentSelectTimeSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectTimeSlotModal.opened$

	dashboardAppointmentConfirmReassignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmReassignSlotModal.opened$

	dashboardAppointmentConfirmCancelAppointmentModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentConfirmCancelAppointmentModal.opened$

	dashboardAppointmentCancelAndAssignSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentCancelAndAssignSlotModal.opened$

	ngOnInit(): void {}
}
