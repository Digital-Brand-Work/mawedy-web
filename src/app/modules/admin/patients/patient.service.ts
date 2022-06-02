import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { Patient } from './patient.model'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Injectable({ providedIn: 'root' })
export class PatientService extends BaseService<Patient> {
	constructor(
		_http: HttpClient,
		_indexDbService: NgxIndexedDBService,
		private _indexDBController: IndexedDbController,
	) {
		super(_http, _indexDbService, 'v1/patients')

		this.current$.subscribe((patient: Patient) => {
			if (!patient || patient === null) {
				return
			}

			this._indexDBController.upsert(DB.PATIENT, { data: patient })
		})
	}

	current$: BehaviorSubject<Patient | null> =
		new BehaviorSubject<Patient | null>(null)
}
