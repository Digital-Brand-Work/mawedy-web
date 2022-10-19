import { DashboardWaitingPatient } from './dashboard-waiting-patient.model'
import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { select, Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { DB } from 'app/app-core/enums/index.db.enum'
import * as DashboardWaitingActions from './dashboard-waiting-patient.actions'
@Component({
	selector: 'waiting-patients',
	templateUrl: './waiting-patients.component.html',
	styleUrls: ['./waiting-patients.component.scss'],
})
export class WaitingPatientsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{
			dashboardWaitingPatients: DashboardWaitingPatient[]
		}>,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	appointments$: Observable<DashboardWaitingPatient[]> = this._store.pipe(
		select('dashboardWaitingPatients'),
	)

	ngOnInit(): void {
		this.clinic$.pipe(takeUntil(this.unsubscribe$)).subscribe((clinic) => {
			if (clinic) {
				this.seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address} | Dashboard Waiting Patients`,
				})
			}
		})

		this.fetchFromIndexDB()
	}

	fetchFromIndexDB() {
		this._indexDBService
			.getAll(DB.DASHBOARD_WAITING_PATIENTS)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((appointments) => {
				this._store.dispatch(
					DashboardWaitingActions.loadDashboardWaitingPatients({
						dashboardWaitingPatients:
							appointments as DashboardWaitingPatient[],
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
