import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import {
	HomeNav,
	homeNavigation,
} from '../../../../mawedy-core/navigation/landing.navigation'
import { BehaviorSubject, take } from 'rxjs'

@Component({
	selector: 'home-navbar',
	templateUrl: './home-navbar.component.html',
	styleUrls: ['./home-navbar.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeNavbarComponent implements OnInit {
	constructor(
		private _clinicUserService: ClinicUserService,
		private _router: Router,
	) {}

	navigation: HomeNav[] = homeNavigation

	hasLoggedIn$: BehaviorSubject<boolean> =
		this._clinicUserService.hasLoggedIn$

	ngOnInit(): void {}

	toDashboard() {
		this._clinicUserService.hasLoggedIn$
			.pipe(take(1))
			.subscribe((hasLoggedIn) => {
				if (hasLoggedIn) {
					this._clinicUserService.toDashboard()
				}
			})
	}
}
