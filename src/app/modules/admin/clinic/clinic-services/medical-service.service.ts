import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { MedicalService } from './medical-service.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class MedicalService_Service extends BaseService<MedicalService> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'services')

		/* 
		    ->except('index', 'show')
		*/
	}

	current$: BehaviorSubject<MedicalService | null> =
		new BehaviorSubject<MedicalService | null>(null)
}
