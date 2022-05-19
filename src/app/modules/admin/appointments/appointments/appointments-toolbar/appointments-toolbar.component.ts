import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-toolbar',
	templateUrl: './appointments-toolbar.component.html',
	styleUrls: ['./appointments-toolbar.component.scss'],
})
export class AppointmentsToolbarComponent implements OnInit {
	constructor(
		private _router: Router,
		@Inject(PLATFORM_ID) private _platformID: Object,
	) {
		this._router.events
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(() => {
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

	private _unsubscribeAll: Subject<any> = new Subject<any>()

	mode: 'month' | 'week' | 'day' = 'month'

	today = new Date(Date.now())

	timer: any

	ngOnInit(): void {
		if (isPlatformBrowser(this._platformID)) {
			this.timer = setInterval(() => {
				this.today = new Date(Date.now())
			}, 1000)
		}
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()

		clearInterval(this.timer)
	}
}
