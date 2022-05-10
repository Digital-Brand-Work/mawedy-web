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
import { DoctorAvailabilityModal } from './modules/admin/doctors/modals/doctor-availability/doctor-availability.service'

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

		private doctorAvailabilityModal: DoctorAvailabilityModal,
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

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this.doctorAvailabilityModal.opened$

	identity = (item: any) => item
}
