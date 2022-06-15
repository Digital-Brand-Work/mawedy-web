import { AppointmentStatusTypes } from './../../../../../mawedy-core/enums/appointment-status.enum'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import { Component, Input, OnInit } from '@angular/core'
import { BehaviorSubject, take } from 'rxjs'
import { DashboardAppointmentDetailsModal } from '../modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { Patient } from 'app/modules/admin/patients/patient.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Router } from '@angular/router'
import { PatientService } from 'app/modules/admin/patients/patient.service'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { DoctorService } from 'app/modules/admin/doctors/doctor.service'
import { AppointmentStatusEnum } from 'app/mawedy-core/enums/appointment-status.enum'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { AlertState } from 'app/components/alert/alert.service'
import * as DashboardAppointmentActions from '../dashboard-appointment.actions'
import { Store } from '@ngrx/store'
import { DashboardAppointment } from '../dashboard-appointment.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import * as dayjs from 'dayjs'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { DashboardAppointmentService } from '../dashboard-appointment.service'

@Component({
	selector: 'dashboard-appointment-table',
	templateUrl: './dashboard-appointment-table.component.html',
	styleUrls: ['./dashboard-appointment-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentTableComponent implements OnInit {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private _doctorService: DoctorService,
		private _patientService: PatientService,
		private _appointmentAPI: AppointmentService,
		private _indexDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private _doctorDetailsModal: DoctorDetailsModal,
		private _dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _store: Store<{
			dashboardAppointment: DashboardAppointment
		}>,
	) {}

	@Input() appointments?: Appointment[]

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this._doctorDetailsModal.opened$

	dashboardAppointmentDetailsModalOpened$: BehaviorSubject<boolean> =
		this._dashboardAppointmentDetailsModal.opened$

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

	setStatus(appointment: Appointment, status: AppointmentStatusTypes) {
		this._appointmentAPI
			.update(appointment.id, { status: status })
			.subscribe((data: any) => {
				const databases = [DB.APPOINTMENTS, DB.DASHBOARD_APPOINTMENTS]

				databases.forEach((db: string) =>
					this._indexDBService
						.update(db, data.data)
						.subscribe((newAppointment) => {
							this._store.dispatch(
								DashboardAppointmentActions.upsertDashboardAppointment(
									{
										dashboardAppointment: newAppointment,
									},
								),
							)
						}),
				)

				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `You set the status to ${status}`,
					message: `Appointment successfully Updated`,
					type: 'success',
				})
			})
	}

	resolveColor(appointment: Appointment): string {
		if (appointment.status === AppointmentStatusEnum.CANCELLED) return `red`

		if (appointment.status === AppointmentStatusEnum.CONFIRMED)
			return `green`
		if (appointment.status === AppointmentStatusEnum.DONE) return `blue`

		if (appointment.status === AppointmentStatusEnum.PENDING) return `red`
	}

	viewAppointment(appointment: Appointment) {
		this._dashboardAppointmentService.current$.next(appointment)

		this.dashboardAppointmentDetailsModalOpened$.next(true)
	}
}
