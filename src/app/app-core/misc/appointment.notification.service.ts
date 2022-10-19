import { BaseService } from '../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class AppointmentNotificationService extends BaseService<any> {
	constructor(_http: HttpClient, _indexDbService: NgxIndexedDBService) {
		super(_http, _indexDbService, 'v1/clinic/notifications/appointment')
	}
}
