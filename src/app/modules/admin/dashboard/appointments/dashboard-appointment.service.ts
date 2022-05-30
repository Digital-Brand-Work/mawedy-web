import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { DashboardAppointment } from './dashboard-appointment.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class DashboardAppointmentService extends BaseService<DashboardAppointment> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'appointments')
	}

	current$: BehaviorSubject<DashboardAppointment | null> =
		new BehaviorSubject<DashboardAppointment | null>(null)
}
