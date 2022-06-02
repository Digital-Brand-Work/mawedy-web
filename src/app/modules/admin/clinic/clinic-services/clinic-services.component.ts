import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, map, Observable, of, pipe, Subject, tap } from 'rxjs'
import { Department } from '../department/department.model'
import { AddDepartmentModal } from './modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from './modals/clinic-services-edit/clinic-services-edit.service'
import * as DepartmentActions from '../../clinic/department//department.actions'
import { DepartmentService } from '../department/department.service'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
})
export class ClinicServicesComponent implements OnInit {
	constructor(
		private addDepartmentModal: AddDepartmentModal,
		private addClinicServiceModal: AddClinicServiceModal,
		private editClinicServiceModal: EditClinicServiceModal,
		private store: Store<{ department: Department[] }>,
		private departmentService: DepartmentService,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	addMedicalServiceOpened$: BehaviorSubject<boolean> =
		this.addDepartmentModal.opened$

	addClinicServiceOpened$: BehaviorSubject<boolean> =
		this.addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.editClinicServiceModal.opened$

	departments$?: Observable<Department[]>

	ngOnInit(): void {
		this.departments$ = this.store.select('department')

		this.departmentService.get().subscribe((data: any) => {
			this.store.dispatch(
				DepartmentActions.loadDepartments({ departments: data.data }),
			)
		})
	}

	identity = (item: any) => item
}
