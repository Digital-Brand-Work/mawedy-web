import { take } from 'rxjs/operators'
import { Patient } from './../../../store/patient/patient.model'
import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { select, Store } from '@ngrx/store'
import * as PatientActions from '../../../store/patient/patient.actions'
import { PatientEffects } from 'app/store/patient/patient.effects'
import { PatientService } from 'app/store/patient/patient.service'

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
	) {}

	patients$?: Observable<Patient[]>

	ngOnInit(): void {
		this.seoService.generateTags({
			title: `Aster Clinic | Patients`,
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

	ngOnDestroy(): void {}
}
