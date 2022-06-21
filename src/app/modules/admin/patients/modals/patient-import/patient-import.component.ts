import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { PatientImportModal } from './patient-import.service'

@Component({
	selector: 'patient-import',
	templateUrl: './patient-import.component.html',
	styleUrls: ['./patient-import.component.scss'],
})
export class PatientImportComponent implements OnInit {
	constructor(private _patientImportModal: PatientImportModal) {}

	opened$: BehaviorSubject<boolean> = this._patientImportModal.opened$

	ngOnInit(): void {}
}
