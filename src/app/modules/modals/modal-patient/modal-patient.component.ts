import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddPatientModal } from 'app/modules/admin/patients/modals/patient-add/patient-add.service'
import { UploadResultModal } from 'app/modules/admin/patients/patient-details/modal/patient-details-booking-list-uploading-result/patient-details-booking-list-uploading-result.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-patient',
	templateUrl: './modal-patient.component.html',
	styleUrls: ['./modal-patient.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalPatientComponent implements OnInit {
	constructor(
		private _addPatientModal: AddPatientModal,
		private _uploadResultModal: UploadResultModal,
	) {}

	addPatientModalOpened$: BehaviorSubject<boolean> =
		this._addPatientModal.opened$

	uploadResultOpened$: BehaviorSubject<boolean> =
		this._uploadResultModal.opened$

	ngOnInit(): void {}
}
