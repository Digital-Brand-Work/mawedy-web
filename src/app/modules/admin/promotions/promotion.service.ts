import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Promotion } from './promotion.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class PromotionServiceService extends BaseService<Promotion> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/promotions')
	}

	current$: BehaviorSubject<Promotion | null> =
		new BehaviorSubject<Promotion | null>(null)
}
