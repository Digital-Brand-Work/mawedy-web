import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject, finalize, take } from 'rxjs'
import { fuseAnimations } from '@fuse/animations'
import { FuseAlertType } from '@fuse/components/alert'
import { AuthService } from 'app/core/auth/auth.service'
import { ScrollService } from '@digital_brand_work/services/scroll.service'

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
	constructor(
		// private _passwordResetSendService: ResetSendService,-
		private _cdr: ChangeDetectorRef,
		private _scrollService: ScrollService,
	) {}

	@ViewChild('email') email?: ElementRef

	throttle$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

	form = new FormGroup({
		email: new FormControl('', [
			Validators.email,
			Validators.required,
			Validators.minLength(3),
		]),
	})

	hasErrorEmail: boolean = false

	validated: boolean = false

	throttled: boolean = false

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.email?.nativeElement.focus()

		this._scrollService.scrollToTop()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	send() {
		this.form.disable()

		// this._passwordResetSendService.post(this.form.value).subscribe({
		// 	next: () => {
		// 		this.throttled = false

		// 		this.validated = true

		// 		this.throttle$.next(60)

		// 		this.setTimer()
		// 	},
		// 	error: () => {
		// 		this.form.enable()

		// 		this.throttled = true
		// 	},
		// })
	}

	setTimer() {
		setInterval(() => {
			this.throttle$.pipe(take(1)).subscribe((value) => {
				if (value > 0) {
					this.throttle$.next(value - 1)
				}

				if (value === 0) {
					this.throttled = false
				}
			})
		}, 1000)
	}
}
