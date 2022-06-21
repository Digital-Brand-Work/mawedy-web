import { Component, OnInit } from '@angular/core'
import { DoctorImportModal } from './doctor-import.service'

@Component({
	selector: 'doctor-import',
	templateUrl: './doctor-import.component.html',
	styleUrls: ['./doctor-import.component.scss'],
})
export class DoctorImportComponent implements OnInit {
	constructor(private _doctorImportModal: DoctorImportModal) {}

	ngOnInit(): void {}
}
