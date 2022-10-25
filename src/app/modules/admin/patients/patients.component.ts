import { Patient } from '../../../app-core/models/patient.model'
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { select, Store } from '@ngrx/store'
import { ClinicUserService } from '../clinic/clinic.service'
import { Clinic } from '../clinic/clinic.model'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { PatientService } from './patient.service'
import { StateEnum } from 'app/app-core/store/core/state.enum'
import { TransformEntity } from '@digital_brand_work/helpers/transform-entity'

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
		private _patientEffects: PatientService,
		private _clinicUserService: ClinicUserService,
		private _indexDBService: NgxIndexedDBService,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	patients$ = this.store.pipe(
		select(StateEnum.PATIENT),
		map((x) => new TransformEntity(x as any).toArray()),
		tap((x) => console.log(x)),
	)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address} | Patients`,
				})
			}
		})
	}

	view(patient: Patient): void {
		this._patientEffects.current$.next(patient)
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
