import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddPatientModal } from 'app/modules/admin/patients/modals/patient-add/patient-add.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-patient',
	templateUrl: './modal-patient.component.html',
	styleUrls: ['./modal-patient.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalPatientComponent implements OnInit {
	constructor(private addPatientModal: AddPatientModal) {}

	addPatientModalOpened$: BehaviorSubject<boolean> =
		this.addPatientModal.opened$

	ngOnInit(): void {}
}
