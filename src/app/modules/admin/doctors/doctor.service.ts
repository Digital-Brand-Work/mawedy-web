import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Doctor } from './doctor.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { environment } from 'environments/environment'

@Injectable({ providedIn: 'root' })
export class DoctorService extends BaseService<Doctor> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/doctors')
	}

	current$: BehaviorSubject<Doctor | null> =
		new BehaviorSubject<Doctor | null>(null)

	getSchedule(doctor: Doctor): Observable<any> {
		return this.http.get(
			`${environment.api}v1/clinic/doctors/${doctor.id}/appointments?status=Confirmed&waiting=false`,
			this.headers(),
		)
	}
}
