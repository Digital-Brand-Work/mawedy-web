import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Department } from './department.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class DepartmentService extends BaseService<Department> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/departments')
	}

	current$: BehaviorSubject<Department | null> = new BehaviorSubject<Department | null>(null)
}
