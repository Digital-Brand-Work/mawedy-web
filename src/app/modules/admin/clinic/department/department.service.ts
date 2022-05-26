import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { Department } from './department.model'

@Injectable({ providedIn: 'root' })
export class DepartmentService extends BaseService<Department> {
	constructor(http: HttpClient) {
		super(http, 'departments')
	}

	current$: BehaviorSubject<Department | null> =
		new BehaviorSubject<Department | null>(null)
}
