import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { ClinicUserService } from './clinic.service'

@Component({
	selector: 'clinic',
	templateUrl: './clinic.component.html',
	styleUrls: ['./clinic.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicComponent implements OnInit {
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
				title: `${clinic.name} | ${clinic?.line_one} | Profile`,
			})
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
