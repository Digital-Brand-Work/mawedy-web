import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { AlertState } from 'app/components/alert/alert.service'
import { PHONE } from 'app/mawedy-core/constants/app.constant'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { Observable } from 'rxjs'
import { TalkToUsService } from './talk-to-us.service'

@Component({
	selector: 'talk-to-us-section1',
	templateUrl: './talk-to-us-section1.component.html',
	styleUrls: ['./talk-to-us-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class TalkToUsSection1Component implements OnInit {
	constructor(
		private _alert: AlertState,
		private _seoService: SeoService,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
		private _talkToUsService: TalkToUsService,
		private _errorHandlerService: ErrorHandlerService,
	) {
		this._seoService.generateTags({
			title: 'Mawedy | Talk to us Us',
			description: 'Lets have a coffee ',
		})
	}

	@ViewChild('input') input!: ElementRef

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	phone = PHONE

	form: FormGroup = this._formBuilder.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		phone_number: [''],
		phone_number_country_code: ['AE'],
		message: ['', Validators.required],
	})

	errors: any = {}

	isProcessing: boolean = false

	handleMobileNumberChange(event: {
		countryCode: string
		phoneNumber: string
	}): void {
		this.form.get('phone_number')?.setValue(event.phoneNumber)

		this.form.get('phone_country_code')?.setValue(event.countryCode)
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.input.nativeElement.focus()

			this._scrollService.scrollToTop()
		}, 400)

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	send() {
		this.isProcessing = true

		this._talkToUsService
			.post(this.form.value)
			.subscribe({
				next: () => {
					this.form.reset()

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Message sent`,
						message:
							'Welcome have received your message and will contact you as soon as we can.',
						type: 'success',
					})
				},
				error: (http) => {
					for (let key in http.error.errors) {
						for (let errorKey in this.errors) {
							if (key.includes(errorKey)) {
								this.errors[errorKey] = true
							}
						}
					}

					this._errorHandlerService.handleError(http)
				},
			})
			.add(() => (this.isProcessing = false))
	}
}
