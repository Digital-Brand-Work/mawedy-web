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
import { LoginService } from 'app/modules/landing/home/login.service'

@Component({
	selector: 'auth-reset-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: [...dbwAnimations],
})
export class AuthResetPasswordComponent implements OnInit {
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _cdr: ChangeDetectorRef,
		// private _userService: UserService,
		// private _passwordFinalizeService: ResetFinalizeService,
		private _loginService: LoginService,
		private _scrollService: ScrollService,
	) {}

	@ViewChild('password') password?: ElementRef

	form = new FormGroup({
		email: new FormControl(''),
		token: new FormControl(''),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6),
		]),
		password_confirmation: new FormControl('', [Validators.required]),
	})

	validated: boolean = false

	isProcessing: boolean | 'complete' = false

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.password?.nativeElement.focus()

		this._scrollService.scrollToTop()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	send() {
		this._route.queryParams.subscribe((params) => {
			if (Object.keys(params).length !== 0) {
				const { email, token } = params

				this.form.value.email = email

				this.form.value.token = token
			}
		})

		// this._passwordFinalizeService.post(this.form.value).subscribe({
		// 	next: () => {
		// 		this.validated = true
		// 	},
		// 	error: (error) => {
		// 		alert(
		// 			`${error.error.message} You will be redirected to forgot password page`,
		// 		)

		// 		this._router.navigate(['/forgot-password'])
		// 	},
		// })
	}

	login() {
		this.isProcessing = true

		this._route.queryParams.subscribe((params) => {
			this.form.value.email = params.email

			this.form.value.token = params.token
		})

		this._loginService.post(this.form.value).subscribe({
			next: (data) => {
				this.isProcessing = false

				localStorage.setItem('access_token', data.access_token)

				localStorage.setItem('expiry', data.expiry)

				localStorage.setItem('user', JSON.stringify(data.user))

				// this._userService.setUser(data.user)

				this._router.navigate(['/dashboard'])
			},
		})
	}
}
