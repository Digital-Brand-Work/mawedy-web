import { AppointmentStatusEnum } from 'app/mawedy-core/enums/appointment-status.enum'
import { PatientService } from 'app/modules/admin/patients/patient.service'
import { AlertState } from 'app/components/alert/alert.service'
import { Component, Input, OnInit } from '@angular/core'
import { DoctorService } from 'app/modules/admin/doctors/doctor.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { DashboardAppointmentDetailsModal } from '../../appointments/modals/dashboard-appointment-details/dashboard-appointment-details.service'
import { DashboardAppointmentService } from '../../appointments/dashboard-appointment.service'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { BehaviorSubject, take } from 'rxjs'
import { Patient } from 'app/modules/admin/patients/patient.model'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { Router } from '@angular/router'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { Store } from '@ngrx/store'
import { DashboardForApprovalPatient } from '../dashboard-for-approval-patient.model'
import { DashboardAppointment } from '../../appointments/dashboard-appointment.model'
import { DashboardWaitingPatient } from '../../waiting-patients/dashboard-waiting-patient.model'
import * as AppointmentActions from '../../../appointments/appointment.actions'
import * as DashboardAppointmentActions from '../../appointments/dashboard-appointment.actions'
import * as DashboardForApprovalPatients from '../dashboard-for-approval-patient.actions'

@Component({
	selector: 'for-approvals-table',
	templateUrl: './for-approvals-table.component.html',
	styleUrls: ['./for-approvals-table.component.scss'],
	animations: [...dbwAnimations],
})
export class ForApprovalsTableComponent implements OnInit {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private _doctorService: DoctorService,
		private _patientService: PatientService,
		private _appointmentAPI: AppointmentService,
		private _indexDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private doctorDetailsModal: DoctorDetailsModal,
		private dashboardAppointmentDetailsModal: DashboardAppointmentDetailsModal,
		private _dashboardAppointmentService: DashboardAppointmentService,
		private _store: Store<{
			dashboardForApprovalPatients: DashboardForApprovalPatient[]
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
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

	approve(appointment: Appointment) {
		this._appointmentAPI
			.update(appointment.id, { status: AppointmentStatusEnum.CONFIRMED })
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

				this._indexDBService
					.delete(DB.DASHBOARD_FOR_APPROVAL_PATIENTS, data.data.id)
					.subscribe(() => {
						this._store.dispatch(
							DashboardForApprovalPatients.deleteDashboardForApprovalPatient(
								{ id: appointment.id },
							),
						)
					})

				this._indexDBService
					.add(DB.DASHBOARD_APPOINTMENTS, data.data)
					.subscribe(() => {
						this._store.dispatch(
							DashboardAppointmentActions.addDashboardAppointment(
								{ dashboardAppointment: data.data },
							),
						)
					})

				this._alert.add({
					title: 'Successfully Transferred to Appointments',
					type: 'success',
					message: `You have successfully transfered ${data.data.patient.first_name} appointed to ${data.data.doctor.name} to appointments`,
					id: Math.floor(Math.random() * 100000000000).toString(),
				})
			})
	}
}
