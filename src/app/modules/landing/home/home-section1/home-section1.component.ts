import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, Observable, take } from 'rxjs'

@Component({
	selector: 'home-section1',
	templateUrl: './home-section1.component.html',
	styleUrls: ['./home-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection1Component implements OnInit {
	constructor(
		private _mediaService: MediaService,
		private _clinicUserService: ClinicUserService,
	) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	showSignInPanel: boolean = true

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	ngOnInit(): void {
		this._clinicUserService.hasLoggedIn$
			.pipe(take(1))
			.subscribe((hasLoggedIn) => {
				if (hasLoggedIn) {
					this.showSignInPanel = false
				}
			})
	}
}
