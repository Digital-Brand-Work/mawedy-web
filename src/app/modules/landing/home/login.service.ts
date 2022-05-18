import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from './../../../../@digital_brand_work/api/base.api'

@Injectable({
	providedIn: 'root',
})
export class LoginService extends BaseService<any> {
	constructor(http: HttpClient) {
		super(http, 'auth/login')
	}
}
