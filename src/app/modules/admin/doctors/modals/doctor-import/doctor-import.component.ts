import { ErrorHandlerService } from './../../../../../misc/error-handler.service'
import { AlertState } from './../../../../../components/alert/alert.service'
import { DoctorImportModal } from './doctor-import.service'
import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { ImportDoctorService } from 'app/mawedy-core/utilities/import.service'

@Component({
	selector: 'doctor-import',
	templateUrl: './doctor-import.component.html',
	styleUrls: ['./doctor-import.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorImportComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _doctorImportModal: DoctorImportModal,
		private _errorHandlerService: ErrorHandlerService,
		private _importDoctorService: ImportDoctorService,
	) {}

	opened$: BehaviorSubject<boolean> = this._doctorImportModal.opened$

	ngOnInit(): void {}

	file: File | undefined

	readFile(event: any): void {
		this.file = event.target.files[0]
	}

	import() {
		let form = new FormData()

		form.append('file', this.file as Blob)

		this._importDoctorService.post(form).subscribe({
			next: () => {
				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Importing data......`,
					message:
						'Your imports are underway! Doctors will automatically appear when imports are finished',
					type: 'info',
				})
			},
			error: (http) => {
				this._errorHandlerService.handleError(http)
			},
		})
	}
}
