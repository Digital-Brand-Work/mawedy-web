import {
	Component,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs'
import { AuthService } from 'app/core/auth/auth.service'
import { isPlatformBrowser } from '@angular/common'

@Component({
	selector: 'auth-sign-out',
	templateUrl: './sign-out.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
	constructor(
		private _authService: AuthService,
		private _router: Router,
		@Inject(PLATFORM_ID) private _platformID: Object,
	) {}

	countdown: number = 5

	countdownMapping: any = {
		'=1': '# second',
		other: '# seconds',
	}
	private _unsubscribeAll: Subject<any> = new Subject<any>()

	ngOnInit(): void {
		this._authService.signOut()

		if (isPlatformBrowser(this._platformID)) {
			timer(1000, 1000)
				.pipe(
					finalize(() => {
						this._router.navigate(['sign-in'])
					}),
					takeWhile(() => this.countdown > 0),
					takeUntil(this._unsubscribeAll),
					tap(() => this.countdown--),
				)
				.subscribe()
		}
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)
		this._unsubscribeAll.complete()
	}
}
