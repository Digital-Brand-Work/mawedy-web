import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { ForgotPasswordService } from '../forgot-password.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'

@Component({
	selector: 'forgot-password-form1',
	templateUrl: './forgot-password-form1.component.html',
	styleUrls: ['./forgot-password-form1.component.scss'],
	animations: [...dbwAnimations],
})
export class ForgotPasswordForm1Component implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _scrollService: ScrollService,
		private _errorHandlerService: ErrorHandlerService,
		private _forgotPasswordApi: ForgotPasswordService,
	) {}

	@Output() onSuccess = new EventEmitter<{
		throttled: boolean
		validated: boolean
		otp_id: string
		email: string
	}>()

	@ViewChild('email') email?: ElementRef

	hasErrorEmail: boolean = false

	errors: any = {}

	form: FormGroup = this._formBuilder.group({
		email: [
			'',
			[Validators.email, Validators.required, Validators.minLength(3)],
		],
	})

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.email?.nativeElement.focus()

		this._scrollService.scrollToTop()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	send(): void {
		this.form.disable()

		this._forgotPasswordApi.post(this.form.value).subscribe({
			next: (data) => {
				this.onSuccess.emit({
					throttled: false,
					validated: true,
					otp_id: data.otp_id,
					email: this.form.get('email')?.value,
				})
			},
			error: (http) => {
				this.form.enable()

				this.onSuccess.emit({
					throttled: true,
					validated: false,
					otp_id: '',
					email: '',
				})

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
	}
}
