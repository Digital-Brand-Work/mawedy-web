import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../clinic/clinic.model'
import { ClinicUserService } from '../clinic/clinic.service'

@Component({
	selector: 'doctors',
	templateUrl: './doctors.component.html',
	styleUrls: ['./doctors.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (!clinic) {
				return
			}

			this.seoService.generateTags({
				title: `${clinic.name} | ${clinic?.line_one} | Doctors`,
			})
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	filter() {}
}
