import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { StoreRegisterRule } from 'app/app-core/rules/register.request'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { MediaService } from '@digital_brand_work/utilities/media.service'

@Component({
	selector: 'landing-subscription-section1-form',
	templateUrl: './landing-subscription-section1-form.component.html',
	styleUrls: ['./landing-subscription-section1-form.component.scss'],
	animations: [...dbwAnimations],
})
export class LandingSubscriptionSection1FormComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _mediaService: MediaService,
		private _storeRegisterRule: StoreRegisterRule,
		private _router: Router,
	) {
		this._router.events
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() =>
				this.$isInSubscription.next(
					this._router.url.includes('subscription'),
				),
			)
	}

	@ViewChild('input')
	input!: ElementRef

	@Output()
	onNext = new EventEmitter<{
		form: FormGroup
		trade_license_photo: any
	}>()

	@Input()
	step: 'one' | 'two' = 'one'

	@Input()
	emailErrors: boolean = false

	@Input()
	phoneErrors: boolean = false

	@Input()
	isProcessing: boolean = false

	@Input()
	focus$!: BehaviorSubject<boolean>

	unsubscribe$: Subject<any> = new Subject<any>()

	breakpoint$ = this._mediaService.breakpoints$

	$isInSubscription = new BehaviorSubject<boolean>(true)

	form: FormGroup = this._formBuilder.group({
		...this._storeRegisterRule.firstForm,
		password: ['', [Validators.required, Validators.min(8)]],
	})

	filename: string = ''

	file?: File

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	handleMobileNumberChange(event: {
		countryCode: string
		phoneNumber: string
	}) {
		this.form.get('phone_number_one')?.setValue(event.phoneNumber)

		this.form
			.get('phone_number_one_country_code')
			?.setValue(event.countryCode)
	}

	setTradeLicense(event: any): void {
		this.file = event.target.files[0]

		this.filename = event.target.files[0].name
	}
}
