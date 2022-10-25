import { HttpClient } from '@angular/common/http'
import { BaseService } from '@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class SubscriptionApi extends BaseService<any> {
	constructor(_http: HttpClient, _indexedDBService: NgxIndexedDBService) {
		super(_http, _indexedDBService, 'v1/clinic/subscriptions/')
	}
}

export enum SubscriptionApiEnum {
	CURRENT = 'current',
}
