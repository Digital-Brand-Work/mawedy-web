import { StoreAction } from './../../../../app-core/store/core/action.enum'
import { PaginationData } from './../../../../app.resolvers'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { Patient } from './../patient.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, Input, OnInit } from '@angular/core'
import { PatientService } from '../patient.service'
import { Store } from '@ngrx/store'
import * as PatientActions from '../../../../app-core/store/ngrx/patients/patient.actions'
import { BehaviorSubject, take } from 'rxjs'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Router } from '@angular/router'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/app-core/enums/index.db.enum'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { AppState } from 'app/app-core/store/core/app.state'

@Component({
	selector: 'patients-table',
	templateUrl: './patients-table.component.html',
	styleUrls: ['./patients-table.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientsTableComponent implements OnInit {
	constructor(
		private _router: Router,
		private _patientService: PatientService,
		private store: Store<AppState>,
		private _clinicUserService: ClinicUserService,
		private _paginationService: PaginationService,
	) {}

	patient$ = this._patientService.current$

	paginatedData$ = this._paginationService.patients$

	@Input()
	patients: Patient[] = []

	ngOnInit(): void {
		this.store.dispatch(StoreAction.PATIENT.LOAD())
	}

	paginate(url: string) {
		this.store.dispatch(StoreAction.PATIENT.PAGINATE({ url: url }))
	}

	viewPatient(patient: Patient) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this.patient$.next(patient)

				this._router.navigate([
					resolvedPath +
						`patients/${slugify(
							`${patient.first_name} ${patient.middle_name} ${patient.last_name}`,
						)}`,
				])
			})
	}

	remove(patient: Patient) {
		this.store.dispatch(StoreAction.PATIENT.REMOVE({ id: patient.id }))
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
