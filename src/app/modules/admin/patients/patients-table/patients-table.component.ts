import { InitialDataResolver } from 'app/app.resolvers'
import { PaginationData } from './../../../../app.resolvers'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { Patient } from './../patient.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, Input, OnInit } from '@angular/core'
import { PatientService } from '../patient.service'
import { Store } from '@ngrx/store'
import * as PatientActions from '../patient.actions'
import { BehaviorSubject, take } from 'rxjs'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Router } from '@angular/router'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { PaginationService } from 'app/misc/pagination.service'

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
		private _indexDBService: NgxIndexedDBService,
		private store: Store<{ patients: Patient[] }>,
		private _clinicUserService: ClinicUserService,
		private _paginationService: PaginationService,
		private InitialDataResolver: InitialDataResolver,
	) {}

	patient$: BehaviorSubject<Patient | null> = this._patientService.current$

	paginatedData$: BehaviorSubject<PaginationData | null> =
		this._paginationService.patients$

	@Input() patients: Patient[] = []

	ngOnInit(): void {}

	identity = (item: any) => item

	paginate(url: string) {
		this._patientService.paginate(url).subscribe((patients: any) => {
			this.InitialDataResolver.loadPatients(patients.data)

			this.paginatedData$.next({
				links: patients.links,
				meta: patients.meta,
			})
		})
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
		this._patientService.remove(patient.id).subscribe(() => {
			this._indexDBService
				.delete(DB.PATIENTS, patient.id)
				.subscribe(() => {
					this.store.dispatch(
						PatientActions.deletePatient({ id: patient.id }),
					)
				})
		})
	}
}
