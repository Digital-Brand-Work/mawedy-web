import { DashboardAppointment } from './modules/admin/dashboard/appointments/dashboard-appointment.model'
import { Doctor } from './modules/admin/doctors/doctor.model'
import { Appointment } from './modules/admin/appointments/appointment.model'
import { MedicalService } from './modules/admin/clinic/clinic-services/medical-service.model'
import { Department } from './modules/admin/clinic/department/department.model'
import { Patient } from './modules/admin/patients/patient.model'
import { IndexedDbController } from './app-core/indexed-db/indexed-db.controller'
import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router'
import { BehaviorSubject, forkJoin, Observable } from 'rxjs'
import { NotificationsService } from 'app/layout/common/notifications/notifications.service'
import { PatientService } from './modules/admin/patients/patient.service'
import { DepartmentService } from './modules/admin/clinic/department/department.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from './app-core/enums/index.db.enum'
import { UserService } from './core/user/user.service'
import { DoctorService } from './modules/admin/doctors/doctor.service'
import { AppointmentService } from './modules/admin/appointments/appointment.service'
import * as dayjs from 'dayjs'
import { PromotionServiceService } from './modules/admin/promotions/promotion.service'
import { ClinicUserService } from './modules/admin/clinic/clinic.service'
import { Store } from '@ngrx/store'
import { DashboardWaitingPatient } from './modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.model'
import { Promotion } from './modules/admin/promotions/promotion.model'
import * as PatientActions from './modules/admin/patients/patient.actions'
import * as DoctorActions from './modules/admin/doctors/doctor.actions'
import * as DepartmentActions from './modules/admin/clinic/department/department.actions'
import * as MedicalServiceActions from './modules/admin/clinic/clinic-services/medical-service.actions'
import * as DashboardAppointmentActions from './modules/admin/dashboard/appointments/dashboard-appointment.actions'
import * as DashboardWaitingPatientsActions from './modules/admin/dashboard/waiting-patients/dashboard-waiting-patient.actions'
import * as AppointmentActions from './modules/admin/appointments/appointment.actions'
import * as PromotionsActions from './modules/admin/promotions/promotion.actions'
import { DashboardForApprovalPatient } from './modules/admin/dashboard/for-approvals/dashboard-for-approval-patient.model'
import * as DashboardForApprovalPatients from './modules/admin/dashboard/for-approvals/dashboard-for-approval-patient.actions'
import { AppointmentStatusEnum } from './app-core/enums/appointment-status.enum'
import { PaginationService } from './app-core/misc/pagination.service'

@Injectable({
	providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
	constructor(
		private _userService: UserService,
		private _patientAPI: PatientService,
		private _doctorAPI: DoctorService,
		private _departmentAPI: DepartmentService,
		private _appointmentAPI: AppointmentService,
		private _indexDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private _paginationService: PaginationService,
		private _promotionAPI: PromotionServiceService,
		private _indexDBController: IndexedDbController,
		private _notificationsService: NotificationsService,
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
	) {}

	department$: BehaviorSubject<Department | null> =
		this._departmentAPI.current$

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<any> {
		this._clinicUserService.switched$.subscribe(() => {
			setTimeout(() => {
				forkJoin([
					this._patientAPI.get(),
					this._departmentAPI.get(),
					this._doctorAPI.get(),
					this._promotionAPI.get(),
					this._appointmentAPI.query(
						`?date=${dayjs().toJSON()}&waiting=false`,
					),
					this._appointmentAPI.query(
						`?date=${dayjs().toJSON()}&waiting=true`,
					),
					this._appointmentAPI.query(
						`?status=${AppointmentStatusEnum.PENDING}`,
					),
				]).subscribe((results: any) => {
					this._clinicUserService.update()

					const [
						patients,
						departments,
						doctors,
						promotions,
						dashboardAppointments,
						waitingPatients,
						approvals,
					] = results

					this._indexDBController.removeAll([
						DB.PATIENTS,
						DB.DEPARTMENTS,
						DB.DOCTORS,
						DB.PROMOTIONS,
						DB.MEDICAL_SERVICES,
						DB.DASHBOARD_APPOINTMENTS,
						DB.DASHBOARD_WAITING_PATIENTS,
						DB.DASHBOARD_FOR_APPROVAL_PATIENTS,
						DB.APPOINTMENTS,
						DB.PROMOTIONS,
					])

					this.loadPatients(patients.data)
					this._paginationService.patients$.next({
						links: patients.links,
						meta: patients.meta,
					})

					this.loadDepartments(departments.data)

					this.loadDoctors(doctors.data)
					this._paginationService.doctors$.next({
						links: doctors.links,
						meta: doctors.meta,
					})

					this.loadDashboardAppointments(dashboardAppointments.data)
					this._paginationService.dashboardAppointments$.next({
						links: dashboardAppointments.links,
						meta: dashboardAppointments.meta,
					})

					this.loadDashboardWaitingPatients(waitingPatients.data)
					this._paginationService.dashboardWaitingPatients$.next({
						links: waitingPatients.link,
						meta: waitingPatients.meta,
					})

					this.loadForApprovalPatients(approvals.data)
					this._paginationService.dashboardApprovals$.next({
						links: approvals.links,
						meta: approvals.meta,
					})

					this.loadPromotions(promotions.data)
					this._paginationService.promotions$.next({
						links: promotions.links,
						meta: promotions.meta,
					})
				})
			}, 500)
		})

		return forkJoin([
			this._notificationsService.getAll(),
			this._userService.get(),
		])
	}

	loadPatients(patients: Patient[]) {
		this._indexDBService.bulkAdd(DB.PATIENTS, patients).subscribe(() =>
			this.store.dispatch(
				PatientActions.loadPatients({
					patients: patients,
				}),
			),
		)
	}

	loadDepartments(departments: Department[]) {
		this._indexDBController.removeAll([DB.MEDICAL_SERVICES])

		this.department$.next(null)

		this.store.dispatch(
			MedicalServiceActions.loadMedicalServices({
				medicalServices: [],
			}),
		)

		this._indexDBService
			.bulkAdd(DB.DEPARTMENTS, departments)
			.subscribe(() => {
				this.store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments.reverse(),
					}),
				)

				if (departments.length !== 0) {
					this._indexDBService
						.bulkAdd(
							DB.MEDICAL_SERVICES,
							departments[0].services as MedicalService[],
						)
						.subscribe(() => {
							this.department$.next(departments[0])

							this.store.dispatch(
								MedicalServiceActions.loadMedicalServices({
									medicalServices: departments[0].services,
								}),
							)
						})
				}
			})
	}

	loadDoctors(doctors: Doctor[]) {
		this._indexDBService
			.bulkAdd(DB.DOCTORS, doctors)
			.subscribe(() =>
				this.store.dispatch(
					DoctorActions.loadDoctors({ doctors: doctors }),
				),
			)
	}

	loadDashboardAppointments(dashboardAppointments: DashboardAppointment[]) {
		this._indexDBService
			.bulkAdd(
				DB.DASHBOARD_APPOINTMENTS,
				dashboardAppointments as DashboardAppointment[],
			)
			.subscribe(() =>
				this.store.dispatch(
					DashboardAppointmentActions.loadDashboardAppointments({
						dashboardAppointments: dashboardAppointments,
					}),
				),
			)
	}

	loadDashboardWaitingPatients(
		dashboardWaitingPatients: DashboardWaitingPatient[],
	) {
		this._indexDBService
			.bulkAdd(DB.DASHBOARD_WAITING_PATIENTS, dashboardWaitingPatients)
			.subscribe(() =>
				this.store.dispatch(
					DashboardWaitingPatientsActions.loadDashboardWaitingPatients(
						{
							dashboardWaitingPatients: dashboardWaitingPatients,
						},
					),
				),
			)
	}

	loadForApprovalPatients(appointments: Appointment[]) {
		this._indexDBService
			.bulkAdd(
				DB.DASHBOARD_FOR_APPROVAL_PATIENTS,
				appointments as DashboardForApprovalPatient[],
			)
			.subscribe(() =>
				this.store.dispatch(
					DashboardForApprovalPatients.loadDashboardForApprovalPatients(
						{
							dashboardForApprovalPatients: appointments,
						},
					),
				),
			)
	}

	loadAppointments(appointments: Appointment[]) {
		this._indexDBService
			.bulkAdd(DB.APPOINTMENTS, appointments)
			.subscribe(() =>
				this.store.dispatch(
					AppointmentActions.loadAppointments({
						appointments: appointments,
					}),
				),
			)
	}

	loadPromotions(promotions: Promotion[]) {
		this._indexDBService
			.bulkAdd(DB.PROMOTIONS, promotions as Promotion[])
			.subscribe(() =>
				this.store.dispatch(
					PromotionsActions.loadPromotions({
						promotions: promotions,
					}),
				),
			)
	}
}

export interface PaginationData {
	links: {
		first: string
		last: string
		next: string | number | null
		prev: string | number | null
	}
	meta: {
		current_page: number
		from: number
		last_page: number
		path: number
		per_page: number
		to: number
		total: number
		links: PaginationLink[]
	}
}

export interface PaginationLink {
	active: boolean
	label: string
	url: string
}
