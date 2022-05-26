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
		email: ['', Validators.email],
		password: ['', Validators.required],
	})

	ngOnInit(): void {}

	login() {
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

					this._router.navigate([
						`/${slugify(userAccount.data.name)}/${slugify(
							userAccount.data.accounts.length === 0
								? userAccount.data.address
								: userAccount.data[0].name,
						)}/dashboard/appointments`,
					])
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
