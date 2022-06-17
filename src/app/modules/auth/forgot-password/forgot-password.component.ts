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
import { ForgotPasswordService } from './forgot-password.service'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: [...dbwAnimations],
})
export class AuthForgotPasswordComponent implements OnInit {
	constructor() {}

	throttle$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

	email: string = ''

	validated: boolean = false

	throttled: boolean = false

	otp_id: string = ''

	ngOnInit(): void {}

	resolveSuccess(successEvent: {
		throttled: boolean
		validated: boolean
		otp_id: string
		email: string
	}): void {
		this.throttled = successEvent.throttled

		this.validated = successEvent.validated

		this.otp_id = successEvent.otp_id

		this.email = successEvent.email

		if (successEvent.throttled) {
			this.throttle$.next(60)

			this.setTimer()
		}
	}

	setTimer(): void {
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
