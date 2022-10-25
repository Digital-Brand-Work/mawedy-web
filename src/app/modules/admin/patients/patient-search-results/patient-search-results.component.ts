import { StoreAction } from './../../../../app-core/store/core/action.enum'
import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { Patient } from '../../../../app-core/models/patient.model'
import { PatientService } from '../patient.service'
import * as PatientActions from '../../../../app-core/store/ngrx/patients/patient.actions'

@Component({
	selector: 'patient-search-results',
	templateUrl: './patient-search-results.component.html',
	styleUrls: ['./patient-search-results.component.scss'],
})
export class PatientSearchResultsComponent implements OnInit {
	constructor(
		private _patientApi: PatientService,
		private _store: Store<{ patients: Patient[] }>,
		private _paginationService: PaginationService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.onReset()
	}

	isSearching: boolean = false

	isReady: boolean = true

	keyword: string = ''

	patients: Patient[] = []

	temporaryPaginatedData?: PaginationData

	ngOnInit(): void {}

	onReset() {
		this.keyword = ''
		this._store.dispatch(StoreAction.PATIENT.LOAD())
	}

	onEnter() {
		this._store.dispatch(
			StoreAction.PATIENT.LOAD_SUCCESS({ patients: this.patients }),
		)
		this._paginationService.patients$.next(this.temporaryPaginatedData)
		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			this._patientApi
				.query(`?keyword=${this.keyword}`)
				.subscribe((patients: any) => {
					this.patients = patients.data

					this.temporaryPaginatedData = {
						links: patients.links,
						meta: patients.meta,
					}

					setTimeout(() => {
						this.isReady = true
					}, 250)
				})
		}
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
