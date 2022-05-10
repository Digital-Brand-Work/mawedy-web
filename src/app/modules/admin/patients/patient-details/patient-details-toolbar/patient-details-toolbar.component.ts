import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AddPatientModal } from '../../modals/patient-add/patient-add.service'

@Component({
	selector: 'patient-details-toolbar',
	templateUrl: './patient-details-toolbar.component.html',
	styleUrls: ['./patient-details-toolbar.component.scss'],
})
export class PatientDetailsToolbarComponent implements OnInit {
	constructor(private addPatientModal: AddPatientModal) {}

	ngOnInit(): void {}

	opened$: BehaviorSubject<boolean> = this.addPatientModal.opened$
}
