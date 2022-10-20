import { takeUntil } from 'rxjs/operators'
import { weekDays } from '../../../../app-core/constants/app.constant'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Observable, Subject, take } from 'rxjs'
import { Department } from '../../clinic/department/department.model'
import { select, Store } from '@ngrx/store'
import { DoctorService } from '../doctor.service'
import { PaginationService } from 'app/app-core/misc/pagination.service'
import { Doctor } from '../doctor.model'
import * as DoctorActions from '../doctor.actions'
import * as dayjs from 'dayjs'
import { hasData, toSentenceCase } from 'app/app-core/helpers'
import { MedicalService } from '../../clinic/clinic-services/medical-service.model'

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

	medicalServices: MedicalService[] = []

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	unsubscribe$: Subject<any> = new Subject()

	availability: string = dayjs().format('dddd').toLowerCase()

	department: string = ''

	service_id: string = ''

	weekDays = weekDays

	ngOnInit(): void {
		this.departments$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((store: any) => {
				const departments: Department[] = Object.values(store.entities)

				if (departments.length !== 0) {
					this.department = departments[0].id

					this.medicalServices = departments[0].services

					if (hasData(departments[0].services)) {
						this.service_id = departments[0].services[0].id
					}
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

	setMedicalServices(id: string): void {
		this.departments$.pipe(take(1)).subscribe((store: any) => {
			const departments: Department[] = Object.values(store.entities)

			const department: Department = departments.find(
				(department) => department.id === id,
			)

			if (!department) {
				this.service_id = ''

				return
			}

			if (department.services.length !== 0) {
				this.medicalServices = department.services

				this.service_id = department.services[0].id
			}
		})
	}

	onReset() {
		this._doctorService.get().subscribe((doctors: any) => {
			this._paginationService.doctors$.next({
				links: doctors.links,
				meta: doctors.meta,
			})

			this._store.dispatch(
				DoctorActions.loadDoctors({ doctors: doctors.data }),
			)
		})
	}

	onFilter() {
		const filter = {
			day_of_week: toSentenceCase(this.availability),
			department_id: this.department,
			service_id: this.service_id,
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
					links: doctors.links,
					meta: doctors.meta,
				})

				this._store.dispatch(
					DoctorActions.loadDoctors({ doctors: doctors.data }),
				)
			})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}

export interface DoctorFilter {
	department: string
	availability: string
}
