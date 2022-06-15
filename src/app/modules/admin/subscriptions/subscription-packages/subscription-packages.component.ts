import {
	BILL_INTERVALS,
	mawedySubscriptions,
	subscription,
} from 'app/mawedy-core/constants/app.constant'
import {
	MawedySubscription,
	SubscriptionFeatures,
} from 'app/mawedy-core/models/utility.models'
import { Component, HostListener, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ClinicUserService } from '../../clinic/clinic.service'
import { BehaviorSubject } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'

@Component({
	selector: 'subscription-packages',
	templateUrl: './subscription-packages.component.html',
	styleUrls: ['./subscription-packages.component.scss'],
	animations: [...dbwAnimations],
})
export class SubscriptionPackagesComponent implements OnInit {
	constructor(private _clinicUserService: ClinicUserService) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	subscription: SubscriptionFeatures = subscription

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	billings: string[] = BILL_INTERVALS

	mawedySubscriptions: MawedySubscription[] = mawedySubscriptions

	billing$: BehaviorSubject<string> = new BehaviorSubject<string>(
		BILL_INTERVALS[1],
	)

	ngOnInit(): void {}

	identity = (item: any) => item
}
