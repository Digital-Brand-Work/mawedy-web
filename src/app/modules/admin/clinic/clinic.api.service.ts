import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from './../../../../@digital_brand_work/api/base.api'

@Injectable({ providedIn: 'root' })
export class ClinicApi extends BaseService<any> {
	constructor(_http: HttpClient, _indexDbService: NgxIndexedDBService) {
		super(_http, _indexDbService, 'v1/my/clinic/update')
	}
}

@Injectable({ providedIn: 'root' })
export class BranchApi extends BaseService<any> {
	constructor(_http: HttpClient, _indexDbService: NgxIndexedDBService) {
		super(_http, _indexDbService, 'v1/my/self/update')
	}
}
