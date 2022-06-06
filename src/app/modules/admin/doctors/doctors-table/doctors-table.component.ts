import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Store } from '@ngrx/store'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Doctor } from '../doctor.model'
import { DoctorAvailabilityModal } from '../modals/doctor-availability/doctor-availability.service'
import { DoctorDetailsModal } from '../modals/doctor-details/doctor-details.service'
import * as DoctorActions from '../doctor.actions'
import { DoctorService } from '../doctor.service'
@Component({
	selector: 'doctors-table',
	templateUrl: './doctors-table.component.html',
	styleUrls: ['./doctors-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsTableComponent implements OnInit {
	constructor(
		private store: Store<{ doctors: Doctor[] }>,
		private _doctorService: DoctorService,
		private _indexDBService: NgxIndexedDBService,
		private doctorDetailsModal: DoctorDetailsModal,
		private doctorAvailabilityModal: DoctorAvailabilityModal,
	) {}

	@Output() onDoctorChanges = new EventEmitter<Doctor[]>()

	unsubscribe$: Subject<any> = new Subject<any>()

	doctorAvailabilityModalOpened$: BehaviorSubject<boolean> =
		this.doctorAvailabilityModal.opened$

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	doctors$?: Observable<Doctor[]>

	ngOnInit(): void {
		this.doctors$ = this.store.select('doctors')

		this.doctors$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((doctors: any) => {
				if (doctors) {
					this.onDoctorChanges.emit(
						Object.values(doctors.entities) as Doctor[],
					)
				}
			})

		this._indexDBService
			.getAll(DB.DOCTORS)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((doctors) => {
				if (doctors) {
					this.store.dispatch(
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

	identity = (item: any) => item

	manage(doctor: Doctor) {
		this.doctorDetailsModalOpened$.next(true)

		this._doctorService.current$.next(doctor)
	}

	remove(doctor: Doctor) {
		this._doctorService.remove(doctor.id).subscribe(() => {
			this.store.dispatch(DoctorActions.deleteDoctor({ id: doctor.id }))
		})
	}
}
