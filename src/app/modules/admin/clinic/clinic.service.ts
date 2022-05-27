import { IndexedDbController } from '../../../mawedy-core/indexed-db/indexed-db.controller'
import { BaseService } from './../../../../@digital_brand_work/api/base.api'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, take } from 'rxjs'
import { Clinic } from './clinic.model'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { slugify } from '@digital_brand_work/helpers/helpers'

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
	) {
		const clinic = localStorage.getItem('user')

		if (clinic !== null) {
			this.hasLoggedIn$.next(true)

			this.clinic$.next(JSON.parse(clinic))

			this.clinic = JSON.parse(clinic)
		}
	}

	clinic$: BehaviorSubject<Clinic | null> =
		new BehaviorSubject<Clinic | null>(null)

	clinic?: Clinic | null

	hasLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	saveDataLocally(data: User): void {
		this.hasLoggedIn$.next(true)

		localStorage.setItem('access_token', data.access.token)

		localStorage.setItem('user', JSON.stringify(data.data))

		this.clinic = data.data

		this.clinic$.next(data.data)

		this._router.navigate(['/dashboard'])
	}

	update(): void {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (Object.keys(clinic).length === 0 || !clinic.accounts) {
				new BaseService(this._http, 'v1/auth/check')
					.get()
					.pipe(take(1))
					.subscribe((clinic: any) => {
						this.clinic$.next(clinic.data)

						this.clinic = clinic.data

						localStorage.setItem(
							'user',
							JSON.stringify(clinic.data),
						)
					})
			}
		})
	}

	resolveClinicPath() {
		this.update()

		this.clinic$.pipe(take(1)).subscribe((userAccount) => {
			return `/${slugify(userAccount.name)}/${slugify(
				userAccount.account_type,
			)}/`
		})
	}

	toDashboard(): void {
		this.update()

		this.clinic$.pipe(take(1)).subscribe((userAccount) => {
			if (!userAccount.accounts === undefined) {
				this.update()
			}

			this._router.navigate([
				this.resolveClinicPath() + `dashboard/appointments`,
			])
		})
	}

	logout(): void {
		localStorage.clear()

		this._router.navigate([''])

		this.clinic$.next(null)

		this.clinic = null

		this.hasLoggedIn$.next(false)

		new BaseService(this._http, '/v1/auth/logout')

		this._router.navigate(['/'])
	}
}
