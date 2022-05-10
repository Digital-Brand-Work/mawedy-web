import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AddPatientModal } from '../modals/patient-add/patient-add.service'

@Component({
	selector: 'patients-toolbar',
	templateUrl: './patients-toolbar.component.html',
	styleUrls: ['./patients-toolbar.component.scss'],
})
export class PatientsToolbarComponent implements OnInit {
	constructor(private addPatientModal: AddPatientModal) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	opened$: BehaviorSubject<boolean> = this.addPatientModal.opened$

	keyword: string = ''

	ngOnInit(): void {}
}
