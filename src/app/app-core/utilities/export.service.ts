import { BaseService } from '@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class ExportDoctorService extends BaseService<any> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/exports/doctors')
	}
}
@Injectable({ providedIn: 'root' })
export class ExportPatientService extends BaseService<any> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/exports/patients')
	}
}
