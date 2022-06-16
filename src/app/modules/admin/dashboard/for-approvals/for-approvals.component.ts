import { Appointment } from './../../appointments/appointment.model'
import { takeUntil } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { select, Store } from '@ngrx/store'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { DashboardWaitingPatient } from '../waiting-patients/dashboard-waiting-patient.model'
import { DashboardForApprovalPatient } from './dashboard-for-approval-patient.model'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import * as DashboardForApprovalPatients from './dashboard-for-approval-patient.actions'
@Component({
	selector: 'for-approvals',
	templateUrl: './for-approvals.component.html',
	styleUrls: ['./for-approvals.component.scss'],
})
export class ForApprovalsComponent implements OnInit {
	constructor(
		private seoService: SeoService,
		private _clinicUserService: ClinicUserService,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{
			dashboardForApprovalPatients: DashboardForApprovalPatient[]
		}>,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	unsubscribe$: Subject<any> = new Subject<any>()

	appointments$: Observable<Appointment[]> = this._store.pipe(
		select('dashboardForApprovalPatients'),
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
			.getAll(DB.DASHBOARD_FOR_APPROVAL_PATIENTS)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((appointments) => {
				this._store.dispatch(
					DashboardForApprovalPatients.loadDashboardForApprovalPatients(
						{
							dashboardForApprovalPatients:
								appointments as DashboardForApprovalPatient[],
						},
					),
				)
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any) => item
}
