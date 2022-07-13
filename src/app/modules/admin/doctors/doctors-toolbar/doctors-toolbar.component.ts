import { ExportDoctorService } from './../../../../mawedy-core/utilities/export.service'
import { environment } from './../../../../../environments/environment'
import { Doctor } from './../doctor.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { AddDoctorModal } from '../modals/doctor-add/doctor-add.service'
import { select, Store } from '@ngrx/store'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { DoctorImportModal } from '../modals/doctor-import/doctor-import.service'
import { PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/misc/pagination.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'doctors-toolbar',
	templateUrl: './doctors-toolbar.component.html',
	styleUrls: ['./doctors-toolbar.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsToolbarComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _exportService: ExportDoctorService,
		private addDoctorModal: AddDoctorModal,
		private store: Store<{ doctors: Doctor[] }>,
		private _doctorImportModal: DoctorImportModal,
		private _paginationService: PaginationService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	@Input() doctors: Doctor[] = []

	paginatedData$: BehaviorSubject<PaginationData | null> =
		this._paginationService.doctors$

	doctorImportModalOpened$: BehaviorSubject<boolean> =
		this._doctorImportModal.opened$

	doctors$?: Observable<Doctor[]> = this.store.pipe(select('doctors'))

	API_URL = environment.api

	token = localStorage.getItem('access_token')

	keyword: string = ''

	opened$: BehaviorSubject<boolean> = this.addDoctorModal.opened$

	ngOnInit(): void {}

	export() {
		this._exportService.post({}).subscribe({
			next: () => {
				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Exporting data!`,
					message:
						'Your exports are underway! We will email you the exported doctor list once it is done. Thank you for your patience',
					type: 'info',
				})
			},
			error: (http) => {
				this._errorHandlerService.handleError(http)
			},
		})
	}
}
