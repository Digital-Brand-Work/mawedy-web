import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, map, Subscription, tap } from 'rxjs'
import {
	HomeNav,
	homeNavigation,
} from '../../../../app-core/navigation/landing.navigation'

@Component({
	selector: 'home-navbar-responsive',
	templateUrl: './home-navbar-responsive.component.html',
	styleUrls: ['./home-navbar-responsive.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeNavbarResponsiveComponent implements OnInit {
	constructor(private router: Router) {}

	navigation: HomeNav[] = homeNavigation

	showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	activeRoute: string | undefined = undefined

	subscription!: Subscription

	ngOnInit(): void {
		this.subscription = this.showNav$.subscribe((value) => {
			if (value) {
				;(
					document.querySelector('html') as HTMLElement
				).style.position = 'fixed'
			} else {
				;(
					document.querySelector('html') as HTMLElement
				).style.position = 'relative'
			}
		})
	}
}
