import { map, tap, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { DashboardAppointmentService } from './appointments/dashboard-appointment.service'
import * as dayjs from 'dayjs'

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardComponent implements OnInit {
	constructor(
		private _router: Router,
		private _dashboardAppointmentService: DashboardAppointmentService,
	) {
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

	filter(event: DashboardFilter) {
		if (event.type === 'dashboardAppointments') {
			const search = {
				keyword: event.keyword,
				waiting: 'false',
				date: dayjs().toJSON(),
			}

			this._dashboardAppointmentService
				.query(`?` + new URLSearchParams(search).toString())
				.subscribe((data) => {})
		}
	}
}

export interface DashboardFilter {
	keyword: string
	type: 'dashboardAppointments' | 'outreachPatients' | 'forApprovals'
}
