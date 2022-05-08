import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from './../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Doctor } from './doctor.model'

@Injectable({ providedIn: 'root' })
export class DoctorService extends BaseService<Doctor> {
	constructor(http: HttpClient) {
		super(http, 'doctors')
	}

	current$: BehaviorSubject<Doctor | null> =
		new BehaviorSubject<Doctor | null>(null)
}
