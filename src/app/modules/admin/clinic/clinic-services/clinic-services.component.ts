import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subject, take } from 'rxjs'
import { Department } from '../department/department.model'
import { AddDepartmentModal } from './modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from './modals/clinic-services-edit/clinic-services-edit.service'
import * as DepartmentActions from '../../clinic/department//department.actions'
import { DepartmentService } from '../department/department.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesComponent implements OnInit {
	constructor(
		private addDepartmentModal: AddDepartmentModal,
		private addClinicServiceModal: AddClinicServiceModal,
		private editClinicServiceModal: EditClinicServiceModal,
		private store: Store<{ department: Department[] }>,
		private _departmentService: DepartmentService,
		private _indexDBService: NgxIndexedDBService,
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

		this._indexDBService
			.getAll(DB.DEPARTMENTS)
			.subscribe((departments: Department[]) => {
				this.store.dispatch(
					DepartmentActions.loadDepartments({
						departments: departments,
					}),
				)

				if (departments.length !== 0) {
					this.department$.next(departments[0])
				}
			})
	}

	identity = (item: any) => item

	remove() {
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
}
