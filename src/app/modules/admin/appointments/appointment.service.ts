import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Appointment } from './appointment.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class AppointmentService extends BaseService<Appointment> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/appointments')
	}

	current$: BehaviorSubject<Appointment | null> =
		new BehaviorSubject<Appointment | null>(null)
}
