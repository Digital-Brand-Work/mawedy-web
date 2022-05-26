import { BehaviorSubject } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import {
	BILL_INTERVALS,
	mawedySubscriptions,
} from 'app/mawedy-core/constants/app.constant'
import { MawedySubscription } from 'app/mawedy-core/models/utility.models'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'home-section3',
	templateUrl: './home-section3.component.html',
	styleUrls: ['./home-section3.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection3Component implements OnInit {
	constructor() {}

	billings: string[] = BILL_INTERVALS

	mawedySubscriptions: MawedySubscription[] = mawedySubscriptions

	billing$: BehaviorSubject<string> = new BehaviorSubject<string>(
		BILL_INTERVALS[1],
	)

	ngOnInit(): void {}

	identity = (item: any) => item
}
