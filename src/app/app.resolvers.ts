import { Appointment } from './modules/admin/appointments/appointment.model'
import { MedicalService } from './modules/admin/clinic/clinic-services/medical-service.model'
import { Department } from './modules/admin/clinic/department/department.model'
import { Patient } from './modules/admin/patients/patient.model'
import { IndexedDbController } from './mawedy-core/indexed-db/indexed-db.controller'
import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router'
import { forkJoin, Observable } from 'rxjs'
import { NotificationsService } from 'app/layout/common/notifications/notifications.service'
import { PatientService } from './modules/admin/patients/patient.service'
import { DepartmentService } from './modules/admin/clinic/department/department.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from './mawedy-core/enums/index.db.enum'
import { UserService } from './core/user/user.service'
import { DoctorService } from './modules/admin/doctors/doctor.service'
import { AppointmentService } from './modules/admin/appointments/appointment.service'
import * as dayjs from 'dayjs'
import { PromotionServiceService } from './modules/admin/promotions/promotion.service'

@Injectable({
	providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
	constructor(
		private _notificationsService: NotificationsService,
		private _userService: UserService,
		private _patientAPI: PatientService,
		private _doctorAPI: DoctorService,
		private _departmentAPI: DepartmentService,
		private _appointmentAPI: AppointmentService,
		private _indexDBService: NgxIndexedDBService,
		private _promotionAPI: PromotionServiceService,
		private _indexDBController: IndexedDbController,
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<any> {
		forkJoin([
			this._patientAPI.get(),
			this._departmentAPI.get(),
			this._doctorAPI.get(),
			this._appointmentAPI.query(`?date=${dayjs().toJSON()}`),
			this._appointmentAPI.query(
				`?date=${dayjs().toJSON()}&waiting=true`,
			),
			this._appointmentAPI.query(``),
			this._promotionAPI.get(),
		]).subscribe((results: any) => {
			const [
				patients,
				departments,
				doctors,
				dashboardAppointments,
				waitingPatients,
				appointments,
				promotions,
			] = results

			this._indexDBController.removeAll([
				DB.PATIENTS,
				DB.DEPARTMENTS,
				DB.DOCTORS,
				DB.PROMOTIONS,
				DB.MEDICAL_SERVICES,
				DB.DASHBOARD_APPOINTMENTS,
				DB.DASHBOARD_WAITING_PATIENTS,
				DB.APPOINTMENTS,
				DB.PROMOTIONS,
			])

			this._indexDBService.bulkAdd(
				DB.PATIENTS,
				patients.data as Patient[],
			)

			this._indexDBService.bulkAdd(
				DB.DEPARTMENTS,
				departments.data as Department[],
			)

			this._indexDBService.bulkAdd(
				DB.DOCTORS,
				doctors.data as Department[],
			)

			this._indexDBService.bulkAdd(
				DB.MEDICAL_SERVICES,
				departments.data[0].services as MedicalService[],
			)

			this._indexDBService.bulkAdd(
				DB.DASHBOARD_APPOINTMENTS,
				dashboardAppointments.data as Appointment[],
			)

			this._indexDBService.bulkAdd(
				DB.DASHBOARD_WAITING_PATIENTS,
				waitingPatients.data as Appointment[],
			)

			this._indexDBService.bulkAdd(
				DB.APPOINTMENTS,
				appointments.data as Appointment[],
			)

			this._indexDBService.bulkAdd(
				DB.PROMOTIONS,
				promotions.data as Appointment[],
			)
		})

		return forkJoin([
			this._notificationsService.getAll(),
			this._userService.get(),
		])
	}
}
