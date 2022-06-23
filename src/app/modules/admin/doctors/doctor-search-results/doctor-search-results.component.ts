import { PaginationData } from './../../../../app.resolvers'
import { Component, HostListener, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { PaginationService } from 'app/misc/pagination.service'
import { Doctor } from '../doctor.model'
import { DoctorService } from '../doctor.service'
import * as DoctorActions from '../doctor.actions'

@Component({
	selector: 'doctor-search-results',
	templateUrl: './doctor-search-results.component.html',
	styleUrls: ['./doctor-search-results.component.scss'],
})
export class DoctorSearchResultsComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _store: Store<{ doctors: Doctor[] }>,
		private _paginationService: PaginationService,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.onReset()
	}

	isSearching: boolean = false

	isReady: boolean = true

	keyword: string = ''

	doctors: Doctor[] = []

	temporaryPaginatedData?: PaginationData

	ngOnInit(): void {}

	identity = (item: any) => item

	onReset() {
		this.keyword = ''

		this._doctorService.get().subscribe((doctors: any) => {
			this.doctors = []

			this._paginationService.doctors$.next({
				links: doctors.link,
				meta: doctors.meta,
			})

			this._store.dispatch(
				DoctorActions.loadDoctors({ doctors: doctors.data }),
			)
		})
	}

	onEnter() {
		this._store.dispatch(
			DoctorActions.loadDoctors({ doctors: this.doctors }),
		)

		this._paginationService.doctors$.next(this.temporaryPaginatedData)

		this.isSearching = false
	}

	search() {
		if (this.isReady) {
			this.isReady = false

			this._doctorService
				.query(`?keyword=${this.keyword}`)
				.subscribe((doctors: any) => {
					this.doctors = doctors.data

					this.temporaryPaginatedData = {
						links: doctors.link,
						meta: doctors.meta,
					}

					setTimeout(() => {
						this.isReady = true
					}, 250)
				})
		}
	}
}
