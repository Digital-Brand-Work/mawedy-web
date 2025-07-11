import { MedicalService } from './../medical-service.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'clinic-service-item',
	templateUrl: './clinic-service-item.component.html',
	styleUrls: ['./clinic-service-item.component.scss'],
})
export class ClinicServiceItemComponent implements OnInit {
	constructor() {}

	@Output() onSelectMedicalService = new EventEmitter<MedicalService>()

	@Input() service: MedicalService

	ngOnInit(): void {}
}
