import { IndexedDbController } from 'app/app-core/indexed-db/indexed-db.controller'
import { Patient } from '../../../app-core/models/patient.model'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/app-core/enums/index.db.enum'
import { empty } from 'app/app-core/helpers'

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<Patient> {
	constructor(
		_http: HttpClient,
		_indexDbService: NgxIndexedDBService,
		_indexDBController: IndexedDbController,
	) {
		super(_http, _indexDbService, 'v1/clinic/patients')
		this.current$.subscribe((patient: Patient) => {
			if (!empty(patient)) {
				_indexDBController.upsert(DB.PATIENT, { data: patient })
			}
		})
	}

	current$: BehaviorSubject<Patient | null> =
		new BehaviorSubject<Patient | null>(null)
}
