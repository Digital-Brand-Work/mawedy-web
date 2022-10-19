import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Router } from '@angular/router'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { BehaviorSubject } from 'rxjs'
import { ForgotPasswordVerify } from '../forgot-password.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'

@Component({
	selector: 'forgot-password-form2',
	templateUrl: './forgot-password-form2.component.html',
	styleUrls: ['./forgot-password-form2.component.scss'],
	animations: [...dbwAnimations],
})
export class ForgotPasswordForm2Component implements OnInit {
	constructor(
		private _router: Router,
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _scrollService: ScrollService,
		private _errorHandlerService: ErrorHandlerService,
		private _forgotPasswordVerify: ForgotPasswordVerify,
	) {}

	@ViewChild('code') code?: ElementRef

	@Input() email: string

	@Input('otp_id') set OTP(otp_id: string) {
		this.form.get('otp_id')?.setValue(otp_id)
	}

	@Input() throttle$?: BehaviorSubject<number>

	errors: any = {}

	form: FormGroup = this._formBuilder.group({
		code: ['', Validators.required],
		otp_id: [''],
	})

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.code?.nativeElement.focus()

		this._scrollService.scrollToTop()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	verify() {
		this.form.disable()

		this._forgotPasswordVerify
			.post(this.form.value)
			.subscribe({
				next: (data: any) => {
					this._router.navigate(['/auth/reset-password'])

					localStorage.setItem(
						'verification_id',
						data.verification_id,
					)

					localStorage.setItem('email', this.email)
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
			.add(() => this.form.enable())
	}
}
