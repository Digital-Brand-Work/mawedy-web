import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddDepartmentModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-department-add/clinic-department-add.service'
import { AddClinicServiceModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-edit/clinic-services-edit.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-clinic',
	templateUrl: './modal-clinic.component.html',
	styleUrls: ['./modal-clinic.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalClinicComponent implements OnInit {
	constructor(
		private addDepartmentModal: AddDepartmentModal,
		private addClinicServiceModal: AddClinicServiceModal,
		private editClinicServiceModal: EditClinicServiceModal,
	) {}

	addDepartmentModalOpened$: BehaviorSubject<boolean> =
		this.addDepartmentModal.opened$

	addClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this.editClinicServiceModal.opened$

	ngOnInit(): void {}
}
