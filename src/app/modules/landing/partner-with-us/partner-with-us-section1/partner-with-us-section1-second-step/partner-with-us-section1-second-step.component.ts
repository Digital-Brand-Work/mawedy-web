import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnInit,
	Output,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { FormBuilder, NgForm } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import {
	BILL_INTERVALS,
	mawedySubscriptions,
} from 'app/mawedy-core/constants/app.constant'
import { clinicSubscriptionTypes } from 'app/mawedy-core/enums/clinic-subscription-type.enum'
import {
	BillInterval,
	MawedySubscription,
	Subscription,
} from 'app/mawedy-core/models/utility.models'
import { StoreRegisterRule } from 'app/mawedy-core/rules/register.request'

@Component({
	selector: 'partner-with-us-section1-second-step',
	templateUrl: './partner-with-us-section1-second-step.component.html',
	styleUrls: ['./partner-with-us-section1-second-step.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1SecondStepComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _cdr: ChangeDetectorRef,
		private _scrollService: ScrollService,
		private _formBuilder: FormBuilder,
		private _storeRegisterRule: StoreRegisterRule,
	) {}

	@ViewChild('ngForm') ngForm!: NgForm

	@ViewChild('input') input!: ElementRef

	@Output() onBack = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	subscriptionTypes: string[] = clinicSubscriptionTypes

	billIntervals: BillInterval[] = BILL_INTERVALS

	mawedySubscriptions: MawedySubscription[] = mawedySubscriptions

	currentSubscription?: Subscription

	form = this._formBuilder.group(this._storeRegisterRule.secondForm)

	previousData: any = undefined

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		if (isPlatformBrowser(this._platformID)) {
			setTimeout(() => {
				this._scrollService.scrollToTop()
			}, 50)
		}

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	handleUsers(users: number): Array<{ username: '' }> {
		let accounts = []

		for (let i = 1; i <= users; i++) {
			accounts.push({ username: '' })
		}

		this._cdr.detectChanges()

		return accounts
	}

	hasNext(data: any): void {
		this.previousData = { ...data }
	}

	register(): void {}
}
