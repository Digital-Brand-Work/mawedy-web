import { HttpClient } from '@angular/common/http'
import { BaseService } from './../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class RegisterService extends BaseService<any> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, '/v1/auth/register')
	}
}
