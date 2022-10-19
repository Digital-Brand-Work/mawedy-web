import { MediaService } from '@digital_brand_work/utilities/media.service'
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
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { StoreRegisterRule } from 'app/app-core/rules/register.request'

@Component({
	selector: 'partner-with-us-form',
	templateUrl: './partner-with-us-form.component.html',
	styleUrls: ['./partner-with-us-form.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsFormComponent implements OnInit {
	constructor(
		private _router: Router,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _mediaService: MediaService,
		private _storeRegisterRule: StoreRegisterRule,
	) {
		this._router.events
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(() =>
				this.$isInSubscription.next(
					this._router.url.includes('subscription'),
				),
			)
	}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	unsubscribe$: Subject<any> = new Subject<any>()

	$isInSubscription: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		true,
	)

	@ViewChild('input') input!: ElementRef

	@Output() onNext = new EventEmitter<{
		form: FormGroup
		trade_license_photo: any
	}>()

	@Input() step: 'one' | 'two' = 'one'

	@Input() emailErrors: boolean = false

	@Input() phoneErrors: boolean = false

	@Input() isProcessing: boolean = false

	@Input() focus$!: BehaviorSubject<boolean>

	form: FormGroup = this._formBuilder.group(this._storeRegisterRule.firstForm)

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
