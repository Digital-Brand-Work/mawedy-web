import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { DashboardWaitingPatient } from './dashboard-waiting-patient.model'

@Injectable({ providedIn: 'root' })
export class DashboardWaitingPatientService extends BaseService<DashboardWaitingPatient> {
	constructor(http: HttpClient) {
		super(http, 'patients')
	}

	current$: BehaviorSubject<DashboardWaitingPatient | null> =
		new BehaviorSubject<DashboardWaitingPatient | null>(null)
}
