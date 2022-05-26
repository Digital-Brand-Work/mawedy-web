import { Patient } from './patient.model'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<Patient> {
	constructor(http: HttpClient) {
		super(http, 'patients')
	}

	current$: BehaviorSubject<Patient | null> =
		new BehaviorSubject<Patient | null>(null)
}
