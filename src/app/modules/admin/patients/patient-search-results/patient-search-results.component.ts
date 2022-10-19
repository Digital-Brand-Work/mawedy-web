import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { Patient } from '../patient.model'
import { PatientService } from '../patient.service'
import * as PatientActions from '../patient.actions'

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

	identity = (item: any) => item

	onReset() {
		this.keyword = ''

		this._patientApi.get().subscribe((patients: any) => {
			this.patients = []

			this._paginationService.doctors$.next({
				links: patients.links,
				meta: patients.meta,
			})

			this._store.dispatch(
				PatientActions.loadPatients({ patients: patients.data }),
			)
		})
	}

	onEnter() {
		this._store.dispatch(
			PatientActions.loadPatients({ patients: this.patients }),
		)

		this._paginationService.doctors$.next(this.temporaryPaginatedData)

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
}
