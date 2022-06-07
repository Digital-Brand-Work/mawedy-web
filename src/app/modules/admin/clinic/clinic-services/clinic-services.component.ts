import { MedicalService } from './medical-service.model'
import { empty } from 'app/mawedy-core/helpers'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs'
import { Department } from '../department/department.model'
import { AddDepartmentModal } from './modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from './modals/clinic-services-edit/clinic-services-edit.service'
import * as DepartmentActions from '../../clinic/department//department.actions'
import { DepartmentService } from '../department/department.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { EditClinicDepartmentModal } from './modals/clinic-department-edit/clinic-department-edit.service'
import { MedicalService_Service } from './medical-service.service'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesComponent implements OnInit {
	constructor(
		private _indexDBService: NgxIndexedDBService,
		private _departmentService: DepartmentService,
		private addDepartmentModal: AddDepartmentModal,
		private store: Store<{ department: Department[] }>,
		private _medicalServiceAPI: MedicalService_Service,
		private addClinicServiceModal: AddClinicServiceModal,
		private editClinicServiceModal: EditClinicServiceModal,
		private _editDepartmentModal: EditClinicDepartmentModal,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	addMedicalServiceOpened$: BehaviorSubject<boolean> =
		this.addDepartmentModal.opened$

	addClinicServiceOpened$: BehaviorSubject<boolean> =
		this.addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.editClinicServiceModal.opened$

	departments$?: Observable<Department[]>

	department$: BehaviorSubject<Department | null> =
		this._departmentService.current$

	ngOnInit(): void {
		this.departments$ = this.store.select('department')

		this.departments$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.fetchFromIndexedDb()
		})

		this.fetchFromIndexedDb()
	}

	fetchFromIndexedDb(): void {
		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments,
					}),
				)

				this.department$.pipe(take(1)).subscribe((department) => {
					if (departments.length !== 0 && empty(department)) {
						this.department$.next(departments[0])
					}
				})
			})
	}

	identity = (item: any): any => item

	edit(): void {
		this.department$.pipe(take(1)).subscribe((department) => {
			this._departmentService.current$.next(department)

			this._editDepartmentModal.opened$.next(true)
		})
	}

	remove(): void {
		this.department$.pipe(take(1)).subscribe((department) => {
			if (!department) {
				return
			}

			this._departmentService.remove(department.id).subscribe(() => {
				this._indexDBService
					.deleteByKey(DB.DEPARTMENTS, department.id)
					.subscribe(() => {
						this.store.dispatch(
							DepartmentActions.deleteDepartment({
								id: department.id,
							}),
						)
					})
			})
		})
	}

	editMedicalService(service: MedicalService): void {
		this.editClinicServiceModalOpened$.next(true)

		this._medicalServiceAPI.current$.next(service)
	}
}
