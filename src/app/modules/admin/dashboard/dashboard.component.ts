import { map, tap, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardComponent implements OnInit {
	constructor(private router: Router) {
		this.isInWaitingPatients$ = this.router.events.pipe(
			map(() => this.router.url.includes('waiting-list')),
			takeUntil(this._unsubscribeAll),
		)
	}
	private _unsubscribeAll: Subject<any> = new Subject<any>()

	isInWaitingPatients$: Observable<boolean> = of(true)

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()
	}

	filter() {}
}
