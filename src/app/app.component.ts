import { DashboardAppointmentSelectTimeSlotModal } from './modules/admin/dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.service'
import { DashboardAppointmentSelectDoctorModal } from './modules/admin/dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.service'
import { DashboardAppointmentDetailsModal } from './modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DoctorAvailabilityModal } from './modules/admin/doctors/modals/doctor-availability/doctor-availability.service'
import { DoctorDetailsModal } from './modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { Component } from '@angular/core'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from './components/alert/alert.service'
import { Alert } from './mawedy-core/models/utility.models'
import { AddAppointmentModal } from './modules/admin/appointments/appointment-add/appointment-add.service'
import { AddDepartmentModal } from './modules/admin/clinic/clinic-services/modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modules/admin/clinic/clinic-services/modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from './modules/admin/clinic/clinic-services/modals/clinic-services-edit/clinic-services-edit.service'
import { AddPatientModal } from './modules/admin/patients/modals/patient-add/patient-add.service'
import { AddDoctorModal } from './modules/admin/doctors/modals/doctor-add/doctor-add.service'
import { SubscriptionInvoicesModal } from './modules/admin/subscriptions/modals/subscription-invoices/subscription-invoices.service'
import { ConfirmDeleteDoctorModal } from './modules/admin/doctors/modals/doctor-confirm-delete/doctor-confirm-delete.service'
import { EditDoctorModal } from './modules/admin/doctors/modals/doctor-edit/doctor-edit.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [...dbwAnimations],
})
export class AppComponent {
	constructor(
		private alert: AlertState,

		/* Modals **/
		private addAppointmentModal: AddAppointmentModal,

		private addDepartmentModal: AddDepartmentModal,

		private addClinicServiceModal: AddClinicServiceModal,
		private editClinicServiceModal: EditClinicServiceModal,

		private addPatientModal: AddPatientModal,

		private addDoctorModal: AddDoctorModal,
		private editDoctorModal: EditDoctorModal,
		private doctorDetailsModal: DoctorDetailsModal,
		private doctorAvailabilityModal: DoctorAvailabilityModal,
		private confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,

		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private dashboardAppointmentSelectDoctorModal: DashboardAppointmentSelectDoctorModal,
		private dashboardAppointmentSelectTimeSlotModal: DashboardAppointmentSelectTimeSlotModal,

		private subscriptionInvoicesModal: SubscriptionInvoicesModal,
	) {}

	alerts$: Observable<Alert[]> = this.alert.get()

	addAppointmentModalOpened$: BehaviorSubject<boolean> =
		this.addAppointmentModal.opened$

	addDepartmentModalOpened$: BehaviorSubject<boolean> =
		this.addDepartmentModal.opened$

	addClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.editClinicServiceModal.opened$

	addPatientModalOpened$: BehaviorSubject<boolean> =
		this.addPatientModal.opened$

	addDoctorModalOpened$: BehaviorSubject<boolean> =
		this.addDoctorModal.opened$

	editDoctorModalOpened$: BehaviorSubject<boolean> =
		this.editDoctorModal.opened$

	confirmDeleteDoctorModalOpened$: BehaviorSubject<boolean> =
		this.confirmDeleteDoctorModal.opened$

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this.doctorAvailabilityModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	dashboardAppointmentSelectDoctorModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectDoctorModal.opened$

	dashboardAppointmentSelectTimeSlotModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentSelectTimeSlotModal.opened$

	subscriptionInvoicesModalOpened$: BehaviorSubject<boolean> =
		this.subscriptionInvoicesModal.opened$

	identity = (item: any) => item
}
