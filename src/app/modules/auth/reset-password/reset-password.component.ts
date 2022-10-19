import { HttpErrorResponse } from '@angular/common/http'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { LoginService } from 'app/modules/landing/home/login.service'
import { PasswordResetAPI } from './reset-password.service'

@Component({
	selector: 'auth-reset-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: [...dbwAnimations],
})
export class AuthResetPasswordComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _loginService: LoginService,
		private _scrollService: ScrollService,
		private _passwordResetAPI: PasswordResetAPI,
		private _clinicUserService: ClinicUserService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@ViewChild('password') password?: ElementRef

	form = new FormGroup({
		email: new FormControl(localStorage.getItem('email')),
		verification_id: new FormControl(
			localStorage.getItem('verification_id'),
		),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
		]),
		password_confirmation: new FormControl('', [Validators.required]),
	})

	errors: any = {}

	validated: boolean = false

	isProcessing: boolean | 'complete' = false

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.password?.nativeElement.focus()

		this._scrollService.scrollToTop()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		localStorage.clear()

		this._cdr.detach()
	}

	send() {
		this._passwordResetAPI.post(this.form.value).subscribe({
			next: () => {
				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Password has been successfully reset.`,
					message:
						'We are happy to help you recover your password have a great time using our services.',
					type: 'success',
				})

				this.validated = true
			},
			error: (http: HttpErrorResponse) => {
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

	login() {
		for (let key in this.errors) {
			this.errors[key] = false
		}

		this.isProcessing = true

		this._loginService
			.post(this.form.value)
			.subscribe({
				next: (userAccount) => {
					// if (
					// 	userAccount.data.subscription_type ===
					// 		ClinicSubscriptionTypeEnum.FREE &&
					// 	ClinicRegistrationStatusEnum.PENDING
					// ) {
					// 	return this._alert.add({
					// 		id: Math.floor(
					// 			Math.random() * 100000000000,
					// 		).toString(),
					// 		title: `We are asking for your patience.`,
					// 		message: `It seems that your account hasn't been approved yet. We ask for
					//     				your patience as we review your information. Best Regards,
					//     				Mawedy Team`,
					// 		type: 'info',
					// 	})
					// }

					// if (
					// 	userAccount.data.subscription_type !==
					// 	ClinicSubscriptionTypeEnum.FREE
					// ) {
					// 	this.proceedToDashboard(userAccount)
					// }

					// if (
					// 	userAccount.data.subscription_type ===
					// 		ClinicSubscriptionTypeEnum.FREE &&
					// 	(userAccount.data.account_status ===
					// 		ClinicRegistrationStatusEnum.DONE ||
					// 		userAccount.data.account_status ===
					// 			ClinicRegistrationStatusEnum.CONFIRMED)
					// ) {
					// 	this.proceedToDashboard(userAccount)
					// }

					this.proceedToDashboard(userAccount)
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

	proceedToDashboard(userAccount) {
		this._clinicUserService.saveDataLocally(userAccount)

		this._alert.add({
			id: Math.floor(Math.random() * 100000000000).toString(),
			title: `Welcome Back ${userAccount.data.name}!`,
			message:
				'We hope that you use our services to its full extent. Have a great day ahead.',
			type: 'success',
		})

		this._clinicUserService.toDashboard()
	}
}
