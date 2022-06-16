import { map, tap, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardComponent implements OnInit {
	constructor(private _router: Router) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.resolveActiveNav()
		})
	}

	private unsubscribe$: Subject<any> = new Subject<any>()

	activeNavigation: number = 1

	ngOnInit(): void {
		this.resolveActiveNav()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	resolveActiveNav() {
		if (this._router.url.includes('appointments')) {
			this.activeNavigation = 1
		}

		if (this._router.url.includes('outreach')) {
			this.activeNavigation = 2
		}

		if (this._router.url.includes('for-approvals')) {
			this.activeNavigation = 3
		}
	}

	filter() {}
}
