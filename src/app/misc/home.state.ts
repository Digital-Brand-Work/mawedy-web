import { Subscription } from './../mawedy-core/models/utility.models'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class HomeSubscriptionState {
	subscription$: BehaviorSubject<Subscription | null> =
		new BehaviorSubject<Subscription | null>(null)

	interval$: BehaviorSubject<'yearly' | 'monthly' | null> =
		new BehaviorSubject<'yearly' | 'monthly' | null>(null)

	users$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
}
