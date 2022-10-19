import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '@digital_brand_work/api/base.api'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class ImportDoctorService extends BaseService<any> {
	constructor(_http: HttpClient, _indexDbService: NgxIndexedDBService) {
		super(_http, _indexDbService, 'v1/clinic/imports/doctors')
	}
}

@Injectable({ providedIn: 'root' })
export class ImportPatientService extends BaseService<any> {
	constructor(_http: HttpClient, _indexDbService: NgxIndexedDBService) {
		super(_http, _indexDbService, 'v1/clinic/imports/patients')
	}
}
