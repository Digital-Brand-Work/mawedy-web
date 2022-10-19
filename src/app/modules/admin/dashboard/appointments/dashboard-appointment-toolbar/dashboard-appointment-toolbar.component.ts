import { dashboardTabs } from './../../dashboard.tabs'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { Observable, Subject, take, takeUntil } from 'rxjs'
import { DashboardWaitingPatient } from '../../waiting-patients/dashboard-waiting-patient.model'
import { DashboardAppointment } from '../dashboard-appointment.model'
import { HomeNav } from 'app/app-core/navigation/landing.navigation'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Router } from '@angular/router'
import { DashboardFilter } from '../../dashboard.component'

@Component({
	selector: 'dashboard-toolbar',
	templateUrl: './dashboard-appointment-toolbar.component.html',
	styleUrls: ['./dashboard-appointment-toolbar.component.scss'],
})
export class DashboardAppointmentToolbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private _clinicUserService: ClinicUserService,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.resolveActiveNav()
		})
	}

	@Output() onSearch = new EventEmitter<DashboardFilter>()

	@Output() onFilter = new EventEmitter()

	unsubscribe$: Subject<any> = new Subject<any>()

	activeNavigation: number = 1

	today = new Date(Date.now())

	keyword: string = ''

	dashboardTabs: HomeNav[] = dashboardTabs

	ngOnInit(): void {
		this.resolveActiveNav()
	}

	identity = (item: any) => item

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

	resolvePath(path: string): void {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._router.navigate([resolvedPath + path])
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
