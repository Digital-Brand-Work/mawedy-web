import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { DashboardWaitingPatient } from './dashboard-waiting-patient.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class DashboardWaitingPatientService extends BaseService<DashboardWaitingPatient> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'appointments')
	}

	current$: BehaviorSubject<DashboardWaitingPatient | null> =
		new BehaviorSubject<DashboardWaitingPatient | null>(null)
}
