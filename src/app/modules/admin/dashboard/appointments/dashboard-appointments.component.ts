import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from '../../clinic/clinic.service'
import { Clinic } from '../../clinic/clinic.model'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
import { Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import * as DashboardAppointmentActions from './dashboard-appointment.actions'
import { empty, hasData } from 'app/mawedy-core/helpers'
import { DashboardAppointment } from './dashboard-appointment.model'

@Component({
	selector: 'dashboard-appointments',
	templateUrl: './dashboard-appointments.component.html',
	styleUrls: ['./dashboard-appointments.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _store: Store<{
			dashboardAppointments: DashboardAppointment[]
		}>,
		private _indexDBService: NgxIndexedDBService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	appointments$: Observable<Appointment[]> = this._store.select(
		'dashboardAppointments',
	)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address} | Profile`,
				})
			}
		})

		this.fetchFromIndexDB()
	}

	fetchFromIndexDB() {
		this._indexDBService
			.getAll(DB.DASHBOARD_APPOINTMENTS)
			.pipe(take(1))
			.subscribe((appointments) => {
				this._store.dispatch(
					DashboardAppointmentActions.loadDashboardAppointments({
						dashboardAppointments:
							appointments as DashboardAppointment[],
					}),
				)
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
