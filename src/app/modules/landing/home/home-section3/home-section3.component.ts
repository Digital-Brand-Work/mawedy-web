import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import {
	BILL_INTERVALS,
	mawedySubscriptions,
} from 'app/app-core/constants/app.constant'
import { MawedySubscription } from 'app/app-core/models/utility.models'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'

@Component({
	selector: 'home-section3',
	templateUrl: './home-section3.component.html',
	styleUrls: ['./home-section3.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection3Component implements OnInit {
	constructor(private media: MediaService) {}

	renderAnimation: boolean = false
	currentType: string = 'Standard'
	unsubscribe$ = new Subject<any>()
	breakpoint$ = this.media.breakpoints$
	mawedySubscriptions = mawedySubscriptions

	billings: string[] = BILL_INTERVALS

	billing$: BehaviorSubject<'yearly' | 'monthly' | string> =
		new BehaviorSubject<string>(BILL_INTERVALS[1])

	ngOnInit(): void {
		this.billing$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((billing) => {
				if (billing === 'yearly') {
					return (this.currentType = 'Standard')
				}

				return (this.currentType = 'Golden')
			})
	}
	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
