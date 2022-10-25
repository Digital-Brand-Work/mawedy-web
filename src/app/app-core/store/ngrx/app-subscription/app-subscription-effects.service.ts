import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Patient } from 'app/app-core/models/patient.model'
import { PHPResponse } from '@digital_brand_work/models/core.model'
import {
	SubscriptionApi,
	SubscriptionApiEnum,
} from 'app/app-core/http/api/subscription.api'

@Injectable({ providedIn: 'root' })
export class AppSubscriptionEffectService {
	constructor(private _subscriptionApi: SubscriptionApi) {}

	get(): Observable<PHPResponse<Patient[]>> {
		return this._subscriptionApi
			.query(SubscriptionApiEnum.CURRENT)
			.pipe(map((response) => response.data))
	}
}
