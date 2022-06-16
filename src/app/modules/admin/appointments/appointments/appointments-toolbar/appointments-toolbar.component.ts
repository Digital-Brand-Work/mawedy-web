import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-toolbar',
	templateUrl: './appointments-toolbar.component.html',
	styleUrls: ['./appointments-toolbar.component.scss'],
})
export class AppointmentsToolbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private store: Store<{ doctors: Doctor[] }>,
		@Inject(PLATFORM_ID) private _platformID: Object,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			if (this._router.url.includes('month')) {
				this.mode = 'month'
			}

			if (this._router.url.includes('week')) {
				this.mode = 'week'
			}

			if (this._router.url.includes('day')) {
				this.mode = 'day'
			}
		})
	}

	doctors$?: Observable<Doctor[]> = this.store.pipe(select('doctors'))

	unsubscribe$: Subject<any> = new Subject<any>()

	mode: 'month' | 'week' | 'day' = 'month'

	today = new Date(Date.now())

	timer: any

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformID)) {
			this.timer = setInterval(() => {
				this.today = new Date(Date.now())
			}, 1000)
		}

		if (this._router.url.includes('month')) {
			this.mode = 'month'
		}

		if (this._router.url.includes('week')) {
			this.mode = 'week'
		}

		if (this._router.url.includes('day')) {
			this.mode = 'day'
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		clearInterval(this.timer)
	}

	identity = (item: any) => item
}
