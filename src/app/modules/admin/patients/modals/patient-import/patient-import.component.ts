import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from 'app/components/alert/alert.service'
import {
	ImportDoctorService,
	ImportPatientService,
} from 'app/app-core/utilities/import.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { BehaviorSubject } from 'rxjs'
import { PatientImportModal } from './patient-import.service'

@Component({
	selector: 'patient-import',
	templateUrl: './patient-import.component.html',
	styleUrls: ['./patient-import.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientImportComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _patientImportModal: PatientImportModal,
		private _importPatientService: ImportPatientService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	opened$: BehaviorSubject<boolean> = this._patientImportModal.opened$

	ngOnInit(): void {}

	file: File | undefined

	readFile(event: any): void {
		this.file = event.target.files[0]
	}

	import() {
		let form = new FormData()

		form.append('file', this.file)

		this._importPatientService.post(form).subscribe({
			next: () => {
				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Importing data......`,
					message:
						'Your imports are underway! Patients will automatically appear when imports are finished',
					type: 'info',
				})
			},
			error: (http) => {
				this._errorHandlerService.handleError(http)
			},
		})
	}
}
