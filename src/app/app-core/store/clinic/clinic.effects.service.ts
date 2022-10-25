import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { AuthApi, AuthApiEnum } from 'app/app-core/http/api/auth.api'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'

@Injectable({ providedIn: 'root' })
export class ClinicEffectService {
	constructor(private _authApi: AuthApi) {}

	get(): Observable<Clinic> {
		return this._authApi
			.query(AuthApiEnum.CHECK)
			.pipe(map((response) => response.data))
	}
}
