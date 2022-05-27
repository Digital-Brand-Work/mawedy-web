import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Router } from '@angular/router'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { AlertState } from 'app/components/alert/alert.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { LoginService } from '../../login.service'
import { slugToSentence } from 'app/mawedy-core/helpers'
import { slugify } from '@digital_brand_work/helpers/helpers'

@Component({
	selector: 'home-section1-login-panel',
	templateUrl: './home-section1-login-panel.component.html',
	styleUrls: ['./home-section1-login-panel.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection1LoginPanelComponent implements OnInit {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private _formBuilder: FormBuilder,

		private _loginService: LoginService,
		private _clinicUserService: ClinicUserService,
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
					this._clinicUserService.saveDataLocally(userAccount)

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Welcome Back ${userAccount.data.name}!`,
						message:
							'We hope that you use our services to its full extent. Have a great day ahead.',
						type: 'info',
					})

					this._clinicUserService.toDashboard()
				},
				error: (http) => {
					for (let key in http.error.errors) {
						for (let error of http.error.errors[key]) {
							this._alert.add({
								title: `Error in ${slugToSentence(key)}`,
								message: error,
								type: 'error',
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
							})
						}

						for (let errorKey in this.errors) {
							if (key.includes(errorKey)) {
								this.errors[errorKey] = true
							}
						}
					}

					if (http.error.key !== undefined) {
						this._alert.add({
							title: `Error in ${slugToSentence(http.error.key)}`,
							message: http.error.message,
							type: 'error',
							id: Math.floor(
								Math.random() * 100000000000,
							).toString(),
						})
					}
				},
			})
			.add(() => this.form.enable())
	}
}
