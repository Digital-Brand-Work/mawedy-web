import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class SubscriptionInvoicesModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
