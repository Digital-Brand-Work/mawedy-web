import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ForgotPasswordService extends BaseService<any> {
	constructor(_http: HttpClient, _indexDBService: NgxIndexedDBService) {
		super(_http, _indexDBService, 'v1/forgot-password/send')
	}
}

@Injectable({
	providedIn: 'root',
})
export class ForgotPasswordVerify extends BaseService<any> {
	constructor(_http: HttpClient, _indexDBService: NgxIndexedDBService) {
		super(_http, _indexDBService, 'v1/forgot-password/verify')
	}
}
