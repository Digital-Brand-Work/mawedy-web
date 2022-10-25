import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { select, Store } from '@ngrx/store'
import { DB } from 'app/app-core/enums/index.db.enum'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Doctor } from '../doctor.model'
import { DoctorAvailabilityModal } from '../modals/doctor-availability/doctor-availability.service'
import { DoctorDetailsModal } from '../modals/doctor-details/doctor-details.service'
import * as DoctorActions from '../doctor.actions'
import { DoctorService } from '../doctor.service'
import { InitialDataResolver, PaginationData } from 'app/app.resolvers'
import { PaginationService } from 'app/app-core/misc/pagination.service'
@Component({
	selector: 'doctors-table',
	templateUrl: './doctors-table.component.html',
	styleUrls: ['./doctors-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsTableComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _indexDBService: NgxIndexedDBService,
		private _store: Store<{ doctors: Doctor[] }>,
		private _paginationService: PaginationService,
		private _doctorDetailsModal: DoctorDetailsModal,
		private _initialDataResolver: InitialDataResolver,
		private _doctorAvailabilityModal: DoctorAvailabilityModal,
	) {}

	@Output()
	onDoctorChanges = new EventEmitter<Doctor[]>()

	unsubscribe$: Subject<any> = new Subject<any>()

	paginatedData$: BehaviorSubject<PaginationData | null> =
		this._paginationService.doctors$

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this._doctorAvailabilityModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this._doctorDetailsModal.opened$

	doctors$?: Observable<Doctor[]> = this._store.pipe(select('doctors'))

	ngOnInit(): void {
		this.fetchAndLoadDoctors()
	}

	paginate(url: string) {
		this._doctorService.paginate(url).subscribe((doctors: any) => {
			this._initialDataResolver.loadDoctors(doctors.data)

			this.paginatedData$.next({
				links: doctors.links,
				meta: doctors.meta,
			})
		})
	}

	fetchAndLoadDoctors() {
		this._indexDBService
			.getAll(DB.DOCTORS)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((doctors) => {
				if (doctors) {
					this._store.dispatch(
						DoctorActions.loadDoctors({
							doctors: doctors as Doctor[],
						}),
					)
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	manage(doctor: Doctor) {
		this.doctorDetailsModalOpened$.next(true)
		this._doctorService.current$.next(doctor)
	}

	view(doctor: Doctor) {
		this.doctorAvailabilityModalOpened$.next(true)

		this._doctorService.current$.next(doctor)
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
