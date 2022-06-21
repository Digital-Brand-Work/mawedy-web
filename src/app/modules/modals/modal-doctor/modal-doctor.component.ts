import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddDoctorModal } from 'app/modules/admin/doctors/modals/doctor-add/doctor-add.service'
import { DoctorAvailabilityModal } from 'app/modules/admin/doctors/modals/doctor-availability/doctor-availability.service'
import { ConfirmDeleteDoctorModal } from 'app/modules/admin/doctors/modals/doctor-confirm-delete/doctor-confirm-delete.service'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { EditDoctorModal } from 'app/modules/admin/doctors/modals/doctor-edit/doctor-edit.service'
import { DoctorImportModal } from 'app/modules/admin/doctors/modals/doctor-import/doctor-import.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-doctor',
	templateUrl: './modal-doctor.component.html',
	styleUrls: ['./modal-doctor.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalDoctorComponent implements OnInit {
	constructor(
		private addDoctorModal: AddDoctorModal,
		private editDoctorModal: EditDoctorModal,
		private _doctorImportModal: DoctorImportModal,
		private doctorDetailsModal: DoctorDetailsModal,
		private doctorAvailabilityModal: DoctorAvailabilityModal,
		private confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,
	) {}

	addDoctorModalOpened$: BehaviorSubject<boolean> =
		this.addDoctorModal.opened$

	editDoctorModalOpened$: BehaviorSubject<boolean> =
		this.editDoctorModal.opened$

	confirmDeleteDoctorModalOpened$: BehaviorSubject<boolean> =
		this.confirmDeleteDoctorModal.opened$

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this.doctorAvailabilityModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	doctorImportModalOpened$: BehaviorSubject<boolean> =
		this._doctorImportModal.opened$

	ngOnInit(): void {}
}
