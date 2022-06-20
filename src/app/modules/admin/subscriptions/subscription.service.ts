import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@digital_brand_work/api/base.api'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class BillingPortalAPi extends BaseService<any> {
	constructor(_http: HttpClient, _indexDBService: NgxIndexedDBService) {
		super(_http, _indexDBService, 'v1/clinic/subscriptions/billing')
	}
}
