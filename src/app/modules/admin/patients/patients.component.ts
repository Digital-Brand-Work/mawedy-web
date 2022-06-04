import { Patient } from './patient.model'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	takeUntil,
} from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Store } from '@ngrx/store'
import { PatientEffects } from 'app/modules/admin/patients/patient.effects'
import { ClinicUserService } from '../clinic/clinic.service'
import { Clinic } from '../clinic/clinic.model'
import * as PatientActions from './patient.actions'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'

@Component({
	selector: 'patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private store: Store<{ patients: Patient[] }>,
		private patientEffects: PatientEffects,
		private _clinicUserService: ClinicUserService,
		private _indexDBService: NgxIndexedDBService,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patients$?: Observable<Patient[]>

	ngOnInit(): void {
		this.patients$ = this.store.select('patients')

		combineLatest([this.clinic$, this._indexDBService.getAll(DB.PATIENTS)])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [clinic, patients] = results

				if (!clinic) {
					return
				}

				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address}`,
				})

				if (patients) {
					this.store.dispatch(
						PatientActions.loadPatients({
							patients: patients as Patient[],
						}),
					)
				}
			})
	}

	view(patient: Patient) {
		this.patientEffects.current$.next(patient)
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
