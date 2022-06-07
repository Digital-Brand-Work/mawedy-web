import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddDepartmentModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-department-add/clinic-department-add.service'
import { EditClinicDepartmentModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-department-edit/clinic-department-edit.service'
import { AddClinicServiceModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-add/clinic-services-add.service'
import { EditClinicServiceModal } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-edit/clinic-services-edit.service'
import { ClinicTimingSelectModal } from 'app/modules/admin/clinic/clinic-timings/modals/clinic-timings-select-modal/clinic-timings.select-moda.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-clinic',
	templateUrl: './modal-clinic.component.html',
	styleUrls: ['./modal-clinic.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalClinicComponent implements OnInit {
	constructor(
		private _addDepartmentModal: AddDepartmentModal,
		private _addClinicServiceModal: AddClinicServiceModal,
		private _editClinicServiceModal: EditClinicServiceModal,
		private _clinicTimingSelectModal: ClinicTimingSelectModal,
		private _editDepartmentModal: EditClinicDepartmentModal,
	) {}

	addDepartmentModalOpened$: BehaviorSubject<boolean> =
		this._addDepartmentModal.opened$

	editDepartmentModalOpened$: BehaviorSubject<boolean> =
		this._editDepartmentModal.opened$

	addClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this._addClinicServiceModal.opened$

	editClinicServiceModalOpened$: BehaviorSubject<boolean> =
		this._editClinicServiceModal.opened$

	clinicTimingSelectModalOpened$: BehaviorSubject<boolean> =
		this._clinicTimingSelectModal.opened$

	ngOnInit(): void {}
}
