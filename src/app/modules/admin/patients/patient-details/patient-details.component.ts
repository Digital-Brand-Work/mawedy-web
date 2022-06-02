import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Patient } from '../patient.model'
import { PatientService } from '../patient.service'

@Component({
	selector: 'patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientDetailsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _patientService: PatientService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patient$: BehaviorSubject<Patient | null> = this._patientService.current$

	unsubscribe$: Subject<any> = new Subject<any>()

	ngOnInit(): void {
		combineLatest([this.clinic$, this.patient$])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [clinic, patient] = results

				if (!clinic || !patient) {
					return
				}

				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.line_one} | ${patient.first_name} ${patient.middle_name} ${patient.last_name}`,
				})
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	back() {
		history.back()
	}
}
