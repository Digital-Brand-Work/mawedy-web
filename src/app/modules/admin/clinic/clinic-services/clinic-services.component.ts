import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { MedicalService } from './medical-service.model'
import { empty } from 'app/mawedy-core/helpers'
import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, take } from 'rxjs'
import { Department } from '../department/department.model'
import { AddDepartmentModal } from './modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from './modals/clinic-services-edit/clinic-services-edit.service'
import { DepartmentService } from '../department/department.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { EditClinicDepartmentModal } from './modals/clinic-department-edit/clinic-department-edit.service'
import { MedicalService_Service } from './medical-service.service'
import * as MedicalServiceActions from './medical-service.actions'
import * as DepartmentActions from '../../clinic/department//department.actions'
import { FuseConfirmationService } from '@fuse/services/confirmation'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesComponent implements OnInit {
	constructor(
		private _confirm: FuseConfirmationService,
		private _indexDBService: NgxIndexedDBService,
		private _departmentService: DepartmentService,
		private _addDepartmentModal: AddDepartmentModal,
		private _indexDBController: IndexedDbController,
		private _medicalServiceAPI: MedicalService_Service,
		private _addClinicServiceModal: AddClinicServiceModal,
		private _editClinicServiceModal: EditClinicServiceModal,
		private _editDepartmentModal: EditClinicDepartmentModal,
		private _store: Store<{
			department: Department[]
			medicalService: MedicalService[]
		}>,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	addMedicalServiceOpened$: BehaviorSubject<boolean> =
		this._addDepartmentModal.opened$

	addClinicServiceOpened$: BehaviorSubject<boolean> =
		this._addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this._editClinicServiceModal.opened$

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	department$: BehaviorSubject<Department | null> =
		this._departmentService.current$

	medicalServices$?: Observable<MedicalService[]> = this._store.pipe(
		select('medicalService'),
	)

	ngOnInit(): void {
		this.fetchFromIndexedDb()
	}

	fetchFromIndexedDb(): void {
		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this._store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments,
					}),
				)

				this.department$.pipe(take(1)).subscribe((department) => {
					if (departments.length !== 0 && empty(department)) {
						this.department$.next(departments[0])

						this._store.dispatch(
							MedicalServiceActions.loadMedicalServices({
								medicalServices: departments[0].services,
							}),
						)

						this._indexDBService.bulkAdd(
							DB.MEDICAL_SERVICES,
							departments[0].services,
						)
					}
				})
			})
	}

	identity = (item: any): any => item

	setDepartment(department: Department) {
		this.department$.next(department)

		this._store.dispatch(
			MedicalServiceActions.loadMedicalServices({
				medicalServices: department.services,
			}),
		)

		this._indexDBController.removeAll([DB.MEDICAL_SERVICES])

		this._indexDBService.bulkAdd(DB.MEDICAL_SERVICES, department.services)
	}

	edit(): void {
		this.department$.pipe(take(1)).subscribe((department) => {
			this._departmentService.current$.next(department)

			this._editDepartmentModal.opened$.next(true)
		})
	}

	remove(): void {
		this.department$.pipe(take(1)).subscribe((department) => {
			if (department) {
				this._confirm
					.open({
						title: `Are you sure you want to remove ${department.name}?`,
						message: `Appointments and medical services bound to this department will be removed. Continue?`,
						dismissible: true,
						icon: {
							name: 'delete',
							color: 'accent',
						},
						actions: {
							confirm: {
								color: 'accent',
								label: 'Remove',
							},
						},
					})
					.afterClosed()
					.subscribe((result) => {
						if (result && result !== 'cancelled') {
							this._departmentService
								.remove(department.id)
								.subscribe(() => {
									this._indexDBService
										.deleteByKey(
											DB.DEPARTMENTS,
											department.id,
										)
										.subscribe(() => {
											this._store.dispatch(
												DepartmentActions.deleteDepartment(
													{
														id: department.id,
													},
												),
											)
										})
								})
						}
					})
			}
		})
	}

	editMedicalService(service: MedicalService): void {
		this.editClinicServiceModalOpened$.next(true)

		this._medicalServiceAPI.current$.next(service)
	}
}
