import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Router } from '@angular/router'
import { AlertState } from 'app/components/alert/alert.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { countries } from 'app/mawedy-core/constants/countries.constant'
import { CheckoutService } from '../stripe.service'
import { BehaviorSubject, take } from 'rxjs'
import { Subscription } from 'app/mawedy-core/models/utility.models'
import { toCardExpiry } from 'app/mawedy-core/helpers'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
declare var window: any

@Component({
	selector: 'checkout-section2',
	templateUrl: './checkout-section2.component.html',
	styleUrls: ['./checkout-section2.component.scss'],
	animations: [...dbwAnimations],
})
export class CheckoutSection2Component implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _scrollService: ScrollService,
		private _alert: AlertState,
		private _formBuilder: FormBuilder,
		private _checkoutService: CheckoutService,
		private _errorHandlerService: ErrorHandlerService,
		private _router: Router,
	) {}

	@ViewChild('ngForm') ngForm?: NgForm

	@ViewChild('input') input?: ElementRef

	@Input() subscription$?: BehaviorSubject<Subscription | null>

	@Input() interval$?: BehaviorSubject<string | null>

	@Input() billMultiplier: number = 1

	@Input() additionalUsers: number = 5

	isProcessing: boolean = false

	showApplePay = false

	cities: string[] = []

	countryJson = countries

	expiryError: boolean = false

	form: FormGroup = this._formBuilder.group({
		name: ['', Validators.required],
		email: ['', Validators.email],
		country: ['', Validators.required],
		city: ['', Validators.required],
		line_one: ['', Validators.required],
		postal_code: ['', Validators.required],
		phone_number_one: ['', Validators.required],
		phone_number_one_country_code: ['', Validators.required],
		number: ['', [Validators.required]],
		expiry: ['', [Validators.required]],
		cvc: ['', [Validators.required]],
	})

	ngOnInit(): void {
		this.showApplePay = false

		if (window.ApplePaySession) {
			const merchantIdentifier = 'example.com.store'

			window.ApplePaySession.canMakePaymentsWithActiveCard(
				merchantIdentifier,
			).then((canMakePayments: boolean) => {
				if (canMakePayments) {
					this.showApplePay = true
				}
			})
		}
	}

	ngAfterViewInit(): void {
		this.input?.nativeElement.focus()

		setTimeout(() => {
			this._scrollService.scrollToTop()
		}, 500)

		this.onChangeCountry('United Arab Emirates')

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	onCardNumberChange(cardNumber: string) {
		this.form.value.number = cardNumber
	}

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]

		this.form.value.country = country

		this.form.value.city = this.cities[0]
	}

	pay() {
		for (let key in this.form.value) {
			if (this.form.value[key] === '') {
				console.log(key)
				return this._alert.add({
					title: `Cannot perform operation`,
					message: 'One or more fields are empty.',
					type: 'error',
					id: Math.floor(Math.random() * 100000000000).toString(),
				})
			}
		}

		this.expiryError = false

		this.isProcessing = true

		let data: any = {}

		data.user = { ...this.form.value }

		data.accounts = { count: this.additionalUsers }

		data.card = {
			number: this.form.value.number,
			expiry: toCardExpiry(this.form.value.expiry),
			cvc: this.form.value.cvc,
		}

		this.subscription$.pipe(take(1)).subscribe((subscription) => {
			data.type = subscription.type
		})

		this.interval$.pipe(take(1)).subscribe((interval) => {
			if (interval === 'yearly') {
				return (data.interval = 'year')
			}
			data.interval = 'month'
		})

		this._checkoutService
			.post(data)
			.subscribe({
				next: () => {
					this._router.navigate([`/success`])
				},
				error: (http) => {
					if (http.error.message.includes('exp')) {
						this.expiryError = true
					}

					this._errorHandlerService.handleError(http)
				},
			})
			.add(() => (this.isProcessing = false))
	}
}
