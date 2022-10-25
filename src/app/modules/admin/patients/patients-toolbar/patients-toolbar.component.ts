import { ExportPatientService } from '../../../../app-core/utilities/export.service'
import { environment } from './../../../../../environments/environment'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AddPatientModal } from '../modals/patient-add/patient-add.service'
import { Patient } from '../../../../app-core/models/patient.model'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { PatientImportModal } from '../modals/patient-import/patient-import.service'
import { PaginationData } from 'app/app.resolvers'
import { PatientService } from '../patient.service'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'patients-toolbar',
	templateUrl: './patients-toolbar.component.html',
	styleUrls: ['./patients-toolbar.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientsToolbarComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private addPatientModal: AddPatientModal,
		private _exportService: ExportPatientService,
		private _paginationService: PaginationService,
		private _patientImportModal: PatientImportModal,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	patientImportModalOpened$: BehaviorSubject<boolean> =
		this._patientImportModal.opened$

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	paginatedData$: BehaviorSubject<PaginationData | null> =
		this._paginationService.patients$

	@Input() patients: Patient[] = []

	API_URL = environment.api

	token = localStorage.getItem('access_token')

	opened$: BehaviorSubject<boolean> = this.addPatientModal.opened$

	keyword: string = ''

	ngOnInit(): void {}

	export() {
		this._exportService.post({}).subscribe({
			next: () => {
				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Exporting data!`,
					message:
						'Your exports are underway! We will email you the exported patients list once it is done. Thank you for your patience',
					type: 'info',
				})
			},
			error: (http) => {
				this._errorHandlerService.handleError(http)
			},
		})
	}
}
