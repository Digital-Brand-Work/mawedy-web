import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'appointments-toolbar',
	templateUrl: './appointments-toolbar.component.html',
	styleUrls: ['./appointments-toolbar.component.scss'],
})
export class AppointmentsToolbarComponent implements OnInit {
	constructor(private router: Router) {
		this.router.events
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(() => {
				if (this.router.url.includes('month')) {
					this.mode = 'month'
				}

				if (this.router.url.includes('week')) {
					this.mode = 'week'
				}

				if (this.router.url.includes('day')) {
					this.mode = 'day'
				}
			})
	}

	private _unsubscribeAll: Subject<any> = new Subject<any>()

	mode: 'month' | 'week' | 'day' = 'month'

	today = new Date(Date.now())

	timer: any

	ngOnInit(): void {
		this.timer = setInterval(() => {
			this.today = new Date(Date.now())
		}, 1000)
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()

		clearInterval(this.timer)
	}
}
