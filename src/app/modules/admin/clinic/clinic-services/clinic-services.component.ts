import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { AddMedicalServiceModal } from './modals/clinic-department-add/clinic-department-add.service'

@Component({
	selector: 'clinic-services',
	templateUrl: './clinic-services.component.html',
	styleUrls: ['./clinic-services.component.scss'],
})
export class ClinicServicesComponent implements OnInit {
	constructor(private addMedicalService: AddMedicalServiceModal) {}

	_unsubscribeAll: Subject<any> = new Subject<any>()

	addMedicalServiceOpened$: BehaviorSubject<boolean> =
		this.addMedicalService.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
