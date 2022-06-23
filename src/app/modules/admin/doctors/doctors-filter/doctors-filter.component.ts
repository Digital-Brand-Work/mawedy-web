import { takeUntil } from 'rxjs/operators'
import { weekDays } from './../../../../mawedy-core/constants/app.constant'
import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnInit,
	Output,
} from '@angular/core'
import { BehaviorSubject, Observable, Subject, take } from 'rxjs'
import { Department } from '../../clinic/department/department.model'
import { select, Store } from '@ngrx/store'

@Component({
	selector: 'doctors-filter',
	templateUrl: './doctors-filter.component.html',
	styleUrls: ['./doctors-filter.component.scss'],
})
export class DoctorsFilterComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _store: Store<{
			department: Department[]
		}>,
	) {}

	@Output() onFilter = new EventEmitter<DoctorFilter>()

	@Output() onReset = new EventEmitter()

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	unsubscribe$: Subject<any> = new Subject()

	availability: string = weekDays[0]

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
}

export interface DoctorFilter {
	department: string
	availability: string
}
