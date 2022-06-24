import { takeUntil } from 'rxjs/operators'
import { weekDays } from './../../../../mawedy-core/constants/app.constant'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Observable, Subject, take } from 'rxjs'
import { Department } from '../../clinic/department/department.model'
import { select, Store } from '@ngrx/store'
import { DoctorService } from '../doctor.service'
import { PaginationService } from 'app/misc/pagination.service'
import { Doctor } from '../doctor.model'
import * as DoctorActions from '../doctor.actions'
import * as dayjs from 'dayjs'

@Component({
	selector: 'doctors-filter',
	templateUrl: './doctors-filter.component.html',
	styleUrls: ['./doctors-filter.component.scss'],
})
export class DoctorsFilterComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _doctorService: DoctorService,
		private _paginationService: PaginationService,
		private _store: Store<{
			department: Department[]
			doctors: Doctor[]
		}>,
	) {}

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	unsubscribe$: Subject<any> = new Subject()

	availability: string = dayjs().format('dddd').toLowerCase()

	department: string = ''

	weekDays = weekDays

	ngOnInit(): void {
		this.departments$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((store: any) => {
				const departments: Department[] = Object.values(store.entities)

				if (departments.length !== 0) {
					this.department = departments[0].id
				}

				this._cdr.detectChanges()
			})
	}

	ngAfterViewInit(): void {}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	identity = (item: any) => item

	onReset() {
		this._doctorService.get().subscribe((doctors: any) => {
			this._paginationService.doctors$.next({
				links: doctors.link,
				meta: doctors.meta,
			})

			this._store.dispatch(
				DoctorActions.loadDoctors({ doctors: doctors.data }),
			)
		})
	}

	onFilter() {
		const filter = {
			day_of_week: this.availability,
			department: this.department,
		}

		for (let key in filter) {
			if (filter[key] === '') {
				delete filter[key]
			}
		}

		this._doctorService
			.query(`?` + new URLSearchParams(filter).toString())
			.subscribe((doctors: any) => {
				this._paginationService.doctors$.next({
					links: doctors.link,
					meta: doctors.meta,
				})

				this._store.dispatch(
					DoctorActions.loadDoctors({ doctors: doctors.data }),
				)
			})
	}
}

export interface DoctorFilter {
	department: string
	availability: string
}
