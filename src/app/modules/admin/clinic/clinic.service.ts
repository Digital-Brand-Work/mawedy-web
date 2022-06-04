import { NgxIndexedDBService } from 'ngx-indexed-db'
import { IndexedDbController } from '../../../mawedy-core/indexed-db/indexed-db.controller'
import { BaseService } from './../../../../@digital_brand_work/api/base.api'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, combineLatest, forkJoin, map, of, take } from 'rxjs'
import { Clinic } from './clinic.model'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

export interface User {
	access: {
		token: string
		token_type: string
		expiry: any
	}
	data: Clinic
}

@Injectable({ providedIn: 'root' })
export class ClinicUserService {
	constructor(
		private _router: Router,
		private _http: HttpClient,
		private _indexedDBController: IndexedDbController,
		private _indexedDBService: NgxIndexedDBService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> =
		new BehaviorSubject<Clinic | null>(null)

	clinic?: Clinic | null

	hasLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	initialize() {
		this._indexedDBService
			.getByKey(DB.CLINIC, 1)
			.subscribe((clinic: any) => {
				if (clinic && clinic.data) {
					this.hasLoggedIn$.next(true)

					this.clinic$.next(clinic.data)

					this.clinic = clinic.data
				}
			})
	}

	saveDataLocally(data: User): void {
		this._indexedDBController.removeAll([DB.CLINIC, DB.ACCESS_TOKEN])

		this.clinic$.next(null)

		this.clinic = null

		this.hasLoggedIn$.next(false)

		this.hasLoggedIn$.next(true)

		localStorage.setItem('access_token', data.access.token)

		localStorage.setItem('current_account', data.data.id)

		this._indexedDBController.upsert(DB.ACCESS_TOKEN, {
			data: data.access.token,
		})

		this._indexedDBController.upsert(DB.CLINIC, {
			data: data.data,
		})

		this.clinic = data.data

		this.clinic$.next(data.data)
	}

	update(): void {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			if (Object.keys(clinic).length === 0 || !clinic.accounts) {
				new BaseService(
					this._http,
					this._indexedDBService,
					'v1/auth/check',
				)
					.get()
					.pipe(take(1))
					.subscribe((clinic: any) => {
						this.clinic$.next(clinic.data)

						this.clinic = clinic.data

						this._indexedDBController.upsert(DB.CLINIC, clinic.data)
					})
			}
		})
	}

	resolveClinicPath() {
		return this.clinic$.pipe(
			map(
				(userAccount: any) =>
					`/${slugify(userAccount.name)}/${slugify(
						userAccount.address || userAccount.account_type,
					)}/`,
			),
		)
	}

	toDashboard(): void {
		this.update()

		combineLatest([this.clinic$, this.resolveClinicPath()])
			.pipe(take(1))
			.subscribe({
				next: (results: any) => {
					const [userAccount, path] = results

					if (!userAccount || !path) {
						return
					}

					if (!userAccount.accounts === undefined) {
						this.update()
					}

					this._router.navigate([path + `dashboard/appointments`])
				},
			})
	}

	logout(): void {
		localStorage.clear()

		this._indexedDBController.removeAll([DB.CLINIC, DB.ACCESS_TOKEN])

		this.clinic$.next(null)

		this.clinic = null

		this.hasLoggedIn$.next(false)

		new BaseService(this._http, this._indexedDBService, '/v1/auth/logout')

		this._router.navigate(['/'])
	}
}
