import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Appointment } from './appointment.model'

@Injectable({ providedIn: 'root' })
export class AppointmentService extends BaseService<Appointment> {
	constructor(http: HttpClient) {
		super(http, 'patients')
	}

	current$: BehaviorSubject<Appointment | null> =
		new BehaviorSubject<Appointment | null>(null)
}
