import { HttpClient } from '@angular/common/http'
import { BaseService } from '@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseService<any> {
	constructor(_http: HttpClient, _indexedDBService: NgxIndexedDBService) {
		super(_http, _indexedDBService, 'v1/clinic/auth/')
	}
}

export enum AuthApiEnum {
	CHECK = 'check',
	LOGIN = 'login',
	LOG_OUT = 'logout',
	REGISTER = 'register',
}
