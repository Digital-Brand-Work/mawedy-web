import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Promotion } from './promotion.model'

@Injectable({ providedIn: 'root' })
export class PromotionServiceService extends BaseService<Promotion> {
	constructor(http: HttpClient) {
		super(http, 'patients')
	}

	current$: BehaviorSubject<Promotion | null> =
		new BehaviorSubject<Promotion | null>(null)
}
