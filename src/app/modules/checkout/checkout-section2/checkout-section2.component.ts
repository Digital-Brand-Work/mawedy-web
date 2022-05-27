import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { RegisterService } from './../../landing/home/register.service'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { Router } from '@angular/router'
import { AlertState } from 'app/components/alert/alert.service'
import { StoreRegisterRule } from 'app/mawedy-core/rules/register.request'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { countries } from 'app/mawedy-core/constants/countries.constant'
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
		private _router: Router,
		private _alert: AlertState,
		private _formBuilder: FormBuilder,

		private _storeRegisterRule: StoreRegisterRule,
		private _registerService: RegisterService,
	) {}

	@ViewChild('ngForm') ngForm?: NgForm

	@ViewChild('input') input?: ElementRef

	form: FormGroup = this._formBuilder.group(this._storeRegisterRule.form)

	showApplePay = false

	cities: string[] = []

	countryJson = countries

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

		this.cities = this.countryJson['United Arab Emirates']
	}

	ngAfterViewInit(): void {
		this.input?.nativeElement.focus()

		setTimeout(() => {
			this._scrollService.scrollToTop()
		}, 500)

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}

	pay() {
		this._router.navigate(['/'])
	}
}
