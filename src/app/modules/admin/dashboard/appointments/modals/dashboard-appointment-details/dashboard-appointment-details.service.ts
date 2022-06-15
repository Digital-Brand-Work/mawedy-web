import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { BaseService } from './../../../../../../../@digital_brand_work/api/base.api'
import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class DashboardAppointmentDetailsModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}

@Injectable({ providedIn: 'root' })
export class AppointmentNotificationService extends BaseService<any> {
	constructor(_http: HttpClient, _indexDBService: NgxIndexedDBService) {
		super(_http, _indexDBService, 'v1/notifications/appointment')
	}
}
