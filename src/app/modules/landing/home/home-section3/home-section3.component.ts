import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import {
	BILL_INTERVALS,
	mawedySubscriptions,
} from 'app/mawedy-core/constants/app.constant'
import { MawedySubscription } from 'app/mawedy-core/models/utility.models'
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

	unsubscribe$: Subject<any> = new Subject<any>()

	breakpoint$: Observable<BreakPoint> = this.media.breakpoints$

	billing$: BehaviorSubject<'yearly' | 'monthly' | string> =
		new BehaviorSubject<string>(BILL_INTERVALS[1])

	billings: string[] = BILL_INTERVALS

	mawedySubscriptions: MawedySubscription[] = mawedySubscriptions

	currentType: string = 'Standard'

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

	identity = (item: any) => item
}
