import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { Store } from '@ngrx/store'
import { AlertState } from 'app/components/alert/alert.service'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { DoctorService } from 'app/modules/admin/doctors/doctor.service'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { Patient } from 'app/modules/admin/patients/patient.model'
import { PatientService } from 'app/modules/admin/patients/patient.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, take } from 'rxjs'
import { DashboardAppointmentService } from '../../appointments/dashboard-appointment.service'
import { DashboardAppointmentDetailsModal } from '../../appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardWaitingPatient } from '../dashboard-waiting-patient.model'

@Component({
	selector: 'waiting-patients-table',
	templateUrl: './waiting-patients-table.component.html',
	styleUrls: ['./waiting-patients-table.component.scss'],
	animations: [...dbwAnimations],
})
export class WaitingPatientsTableComponent implements OnInit {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private _doctorService: DoctorService,
		private _patientService: PatientService,
		private _indexDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private doctorDetailsModal: DoctorDetailsModal,
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _dashboardAppointmentService: DashboardAppointmentService,
	) {}

	@Input() appointments?: Appointment[]

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this.dashboardAppointmentDetailsModal.opened$

	patient$: BehaviorSubject<Patient | null> = this._patientService.current$

	ngOnInit(): void {}

	identity = (item: any) => item

	viewDoctor(doctor: Doctor) {
		this._indexDBService
			.getByKey(DB.DOCTORS, doctor.id)
			.subscribe((selectedDoctor: Doctor) => {
				this._doctorService.current$.next(selectedDoctor)

				this.doctorDetailsModalOpened$.next(true)
			})
	}

	viewPatient(patient: Patient) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._indexDBService
					.getByKey(DB.PATIENTS, patient.id)
					.subscribe((selectedPatient: Patient) => {
						this.patient$.next(selectedPatient)

						this._router.navigate([
							resolvedPath +
								`patients/${slugify(
									`${selectedPatient.first_name} ${selectedPatient.middle_name} ${selectedPatient.last_name}`,
								)}`,
						])
					})
			})
	}

	viewAppointment(appointment: Appointment) {
		this._dashboardAppointmentService.current$.next(appointment)

		this.dashboardAppointmentDetailsModalOpened$.next(true)
	}
}
