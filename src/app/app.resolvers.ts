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

@Injectable({
	providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
	constructor(
		private _notificationsService: NotificationsService,
		private _userService: UserService,
		private _patientService: PatientService,
		private _departmentService: DepartmentService,
		private _indexDBService: NgxIndexedDBService,
		private _indexDBController: IndexedDbController,
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<any> {
		forkJoin([
			this._patientService.get(),
			this._departmentService.get(),
		]).subscribe((results: any) => {
			const [patient, department] = results

			this._indexDBController.removeAll([
				DB.DEPARTMENTS,
				DB.DOCTORS,
				DB.DEPARTMENTS,
				DB.PATIENTS,
				DB.MEDICAL_SERVICES,
				DB.PROMOTIONS,
			])

			this._indexDBService.bulkAdd(DB.PATIENTS, patient.data as Patient[])

			this._indexDBService.bulkAdd(
				DB.DEPARTMENTS,
				department.data as Department[],
			)
		})

		return forkJoin([
			this._notificationsService.getAll(),
			this._userService.get(),
		])
	}
}
