import { Component, Input, OnInit } from '@angular/core'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'

@Component({
	selector: 'doctor-image-placeholder',
	templateUrl: './doctor-image-placeholder.component.html',
	styleUrls: ['./doctor-image-placeholder.component.scss'],
})
export class DoctorImagePlaceholderComponent implements OnInit {
	constructor() {}

	@Input() doctor: Doctor

	ngOnInit(): void {}
}
