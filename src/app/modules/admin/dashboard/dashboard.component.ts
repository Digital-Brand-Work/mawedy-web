import { TransformEntity } from './../../../../@digital_brand_work/helpers/transform-entity'
import { subscription } from 'app/app-core/constants/app.constant'
import { StoreAction } from './../../../app-core/store/core/action.enum'
import { AppState } from 'app/app-core/store/core/app.state'
import { map, tap, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { DashboardAppointmentService } from './appointments/dashboard-appointment.service'
import * as dayjs from 'dayjs'
import { select, Store } from '@ngrx/store'
import { StateEnum } from 'app/app-core/store/core/state.enum'

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardComponent implements OnInit {
	constructor(
		private _router: Router,
		private _store: Store<AppState>,
		private _dashboardAppointmentService: DashboardAppointmentService,
	) {
		this._router.events.pipe(takeUntil(this.destroyed$)).subscribe(() => {
			this.resolveActiveNav()
		})
	}

	destroyed$ = new Subject<any>()

	subscription$ = this._store.pipe(
		select(StateEnum.APP_SUBSCRIPTION),
		map((x) => new TransformEntity(x).toObject()),
		tap((subscription) => {}),
	)

	activeNavigation: number = 1

	ngOnInit(): void {
		this._store.dispatch(StoreAction.APP_SUBSCRIPTION.LOAD())
		this.resolveActiveNav()
	}

	ngOnDestroy(): void {
		this.destroyed$.next(null)
		this.destroyed$.complete()
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
	startDate?: string
	endDate?: string
}
