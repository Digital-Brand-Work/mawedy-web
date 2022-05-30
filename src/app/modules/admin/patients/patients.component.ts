import { Patient } from './patient.model'
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { select, Store } from '@ngrx/store'
import { PatientEffects } from 'app/modules/admin/patients/patient.effects'
import { ClinicUserService } from '../clinic/clinic.service'
import { Clinic } from '../clinic/clinic.model'

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
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patients$?: Observable<Patient[]>

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.seoService.generateTags({
				title: `${clinic.name} | ${clinic?.line_one}`,
			})
		})

		this.patients$ = this.store.pipe(select('patients'), take(1))

		// this.store.dispatch(PatientActions.loadPatients({ patients: [] }))

		this.patients$.pipe(take(1)).subscribe((patients: Patient[]) => {
			console.log(patients)
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
