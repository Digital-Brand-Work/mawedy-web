import { Patient } from './patient.model'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<Patient> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/patients')
	}

	current$: BehaviorSubject<Patient | null> =
		new BehaviorSubject<Patient | null>(null)
}
