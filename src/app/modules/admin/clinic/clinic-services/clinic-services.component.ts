import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { AddDepartmentModal } from './modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from './modals/clinic-services-add/clinic-services-add.service'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
})
export class ClinicServicesComponent implements OnInit {
	constructor(
		private addDepartmentModal: AddDepartmentModal,
		private addClinicServiceModal: AddClinicServiceModal,
	) {}

	_unsubscribeAll: Subject<any> = new Subject<any>()

	addMedicalServiceOpened$: BehaviorSubject<boolean> =
		this.addDepartmentModal.opened$

	addClinicServiceOpened$: BehaviorSubject<boolean> =
		this.addClinicServiceModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
