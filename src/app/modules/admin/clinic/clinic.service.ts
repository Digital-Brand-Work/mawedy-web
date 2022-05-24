import { BaseService } from './../../../../@digital_brand_work/api/base.api'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { Clinic } from './clinic.model'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

export interface User {
	access: {
		access_token: string
		token_type: string
		expiry: any
	}
	data: Clinic
}

@Injectable({ providedIn: 'root' })
export class ClinicUserService {
	constructor(private _router: Router, private _http: HttpClient) {}

	clinic$: BehaviorSubject<Clinic | null> =
		new BehaviorSubject<Clinic | null>(null)

	clinic?: Clinic

	saveDataLocally(data: User): void {
		localStorage.setItem('access_token', JSON.stringify(data.access))

		localStorage.setItem('user', JSON.stringify(data.data))

		this.clinic = data.data

		this.clinic$.next(data.data)

		this._router.navigate(['/dashboard'])
	}

	logout() {
		localStorage.clear()

		this._router.navigate([''])

		return new BaseService(this._http, '/v1/auth/logout')
	}
}
