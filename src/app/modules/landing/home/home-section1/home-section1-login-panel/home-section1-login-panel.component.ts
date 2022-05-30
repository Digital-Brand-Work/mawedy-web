import { ClinicRegistrationStatusEnum } from './../../../../../mawedy-core/enums/clinic-registration.enum'
import { ClinicSubscriptionTypeEnum } from './../../../../../mawedy-core/enums/clinic-subscription-type.enum'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AlertState } from 'app/components/alert/alert.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { LoginService } from '../../login.service'
import { ErrorHandlerService } from 'app/misc/error-handler.service'

@Component({
	selector: 'home-section1-login-panel',
	templateUrl: './home-section1-login-panel.component.html',
	styleUrls: ['./home-section1-login-panel.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection1LoginPanelComponent implements OnInit {
	constructor(
		private _alert: AlertState,
		private _formBuilder: FormBuilder,
		private _loginService: LoginService,
		private _clinicUserService: ClinicUserService,
		private _errorHandlerService: ErrorHandlerService,
	) {}

	@ViewChild('ngForm') ngForm!: NgForm

	@ViewChild('input') input!: ElementRef

	form: FormGroup = this._formBuilder.group({
		email: ['', [Validators.email, Validators.required]],
		password: ['', Validators.required],
	})

	errors = {
		email: false,
		password: false,
	}

	ngOnInit(): void {}

	login() {
		for (let key in this.errors) {
			this.errors[key] = false
		}

		this.form.disable()

		this._loginService
			.post(this.form.value)
			.subscribe({
				next: (userAccount) => {
					if (
						userAccount.data.subscription_type ===
							ClinicSubscriptionTypeEnum.FREE &&
						ClinicRegistrationStatusEnum.PENDING
					) {
						return this._alert.add({
							id: Math.floor(
								Math.random() * 100000000000,
							).toString(),
							title: `We are asking for your patience.`,
							message: `It seems that your account hasn't been approved yet. We ask for
                        				your patience as we review your information. Best Regards,
                        				Mawedy Team`,
							type: 'info',
						})
					}

					if (
						userAccount.data.subscription_type !==
						ClinicSubscriptionTypeEnum.FREE
					) {
						this.proceedToDashboard(userAccount)
					}

					if (
						userAccount.data.subscription_type ===
							ClinicSubscriptionTypeEnum.FREE &&
						(userAccount.data.account_status ===
							ClinicRegistrationStatusEnum.DONE ||
							userAccount.data.account_status ===
								ClinicRegistrationStatusEnum.CONFIRMED)
					) {
						this.proceedToDashboard(userAccount)
					}
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

	proceedToDashboard(userAccount) {
		this._clinicUserService.saveDataLocally(userAccount)

		this._alert.add({
			id: Math.floor(Math.random() * 100000000000).toString(),
			title: `Welcome Back ${userAccount.data.name}!`,
			message:
				'We hope that you use our services to its full extent. Have a great day ahead.',
			type: 'info',
		})

		this._clinicUserService.toDashboard()
	}
}
