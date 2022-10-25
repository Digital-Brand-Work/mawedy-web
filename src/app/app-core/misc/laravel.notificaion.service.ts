import { InitialDataResolver } from 'app/app.resolvers'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { Clinic } from '../../modules/admin/clinic/clinic.model'
import { environment } from '../../../environments/environment'
import { Injectable } from '@angular/core'
import Echo, { Channel } from 'laravel-echo'
import { PatientService } from 'app/modules/admin/patients/patient.service'
import { AlertState } from 'app/components/alert/alert.service'
import { PaginationService } from './pagination.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { Store } from '@ngrx/store'
import { Patient } from 'app/app-core/models/patient.model'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { DashboardAppointment } from 'app/modules/admin/dashboard/appointments/dashboard-appointment.model'
import { DashboardWaitingPatient } from 'app/modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.model'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { MedicalService } from 'app/modules/admin/clinic/clinic-services/medical-service.model'
import { Promotion } from 'app/modules/admin/promotions/promotion.model'
import * as PatientActions from '../store/ngrx/patients/patient.actions'
import { DB } from 'app/app-core/enums/index.db.enum'
import { DoctorService } from 'app/modules/admin/doctors/doctor.service'
import * as DoctorActions from '../../modules/admin/doctors/doctor.actions'
import { AnimateBellService } from 'app/layout/common/user/user-bell.service'
import { NotificationsService } from 'app/layout/common/notifications/notifications.service'
import { take } from 'rxjs'
import * as ForApprovalActions from '../../modules/admin/dashboard/for-approvals/dashboard-for-approval-patient.actions'
@Injectable({ providedIn: 'root' })
export class LaravelNotificationService {
	constructor(
		private _alert: AlertState,
		private _doctorAPI: DoctorService,
		private _patientAPI: PatientService,
		private _paginationService: PaginationService,
		private _indexDBService: NgxIndexedDBService,
		private _animateBellService: AnimateBellService,
		private store: Store<{
			patients: Patient[]
			doctors: Doctor[]
			departments: Department[]
			dashboardAppointments: DashboardAppointment[]
			dashboardWaitingPatients: DashboardWaitingPatient[]
			appointments: Appointment[]
			medicalServices: MedicalService[]
			promotions: Promotion[]
		}>,
		private _notificationService: NotificationsService,
		private _appointmentAPI: AppointmentService,
	) {}

	echo?: Echo

	animate$ = this._animateBellService.animate$

	init(token: string, clinic: Clinic) {
		this.echo = new Echo({
			broadcaster: 'pusher',
			key: environment.socket.key,
			wsHost: environment.socket.wsHost,
			wsPort: environment.socket.wsPort,
			forceTLS: false,
			encrypted: true,
			disableStats: true,
			enabledTransports: ['ws', 'wss'],
			namespace: '',
			auth: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			authEndpoint: `${environment.api}broadcasting/auth`,
		})

		this.registerClinic(clinic.id)
	}

	registerClinic(id: string) {
		this.echo.private(`clinic.${id}`).notification((e: any) => {
			if (
				e.type === 'imports.successful' &&
				e.import_type === 'Patients'
			) {
				this.reloadPatients()
			}

			if (
				e.type === 'imports.successful' &&
				e.import_type === 'Doctors'
			) {
				this.reloadDoctors()
			}

			if (
				e.type.includes('appointment.new') ||
				e.type.includes('appointment.cancelled')
			) {
				this.addNotification(e)
			}
		})
	}

	addNotification(event: any) {
		this.animate$.next(true)

		this._appointmentAPI
			.findOne(event.appointment_id)
			.subscribe((appointment: any) => {
				this.store.dispatch(
					ForApprovalActions.addDashboardForApprovalPatient({
						dashboardForApprovalPatient: appointment.data,
					}),
				)

				this._notificationService.notifications$
					.pipe(take(1))
					.subscribe((notifications) => {
						this._notificationService.notifications$.next([
							...notifications,
							appointment.data,
						])
					})
			})

		this._alert.add({
			id: Math.floor(Math.random() * 100000000000).toString(),
			title: `You have new notification`,
			message: 'Someone wants an appointment from mawedy app.',
			type: 'success',
		})
	}

	removeNotification() {
		this.animate$.next(true)
	}

	reloadDoctors() {
		this._doctorAPI.get().subscribe((doctors: any) => {
			this._indexDBService.clear(DB.DOCTORS).subscribe(() => {
				this._paginationService.doctors$.next({
					links: doctors.link,
					meta: doctors.meta,
				})

				this._indexDBService
					.bulkAdd(DB.DOCTORS, doctors.data)
					.subscribe(() =>
						this.store.dispatch(
							DoctorActions.loadDoctors({
								doctors: doctors.data,
							}),
						),
					)

				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Import of Doctors successful!`,
					message: 'Doctors are successfully imported.',
					type: 'success',
				})
			})
		})
	}

	reloadPatients() {
		this._patientAPI.get().subscribe((patients: any) => {
			this._indexDBService.clear(DB.PATIENTS).subscribe(() => {
				this._paginationService.patients$.next({
					links: patients.link,
					meta: patients.meta,
				})

				this._indexDBService
					.bulkAdd(DB.PATIENTS, patients.data)
					.subscribe(() =>
						this.store.dispatch(
							PatientActions.loadPatients({
								patients: patients.data,
							}),
						),
					)

				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Import of Patients successful!`,
					message: 'Patients are successfully imported.',
					type: 'success',
				})
			})
		})
	}
}
