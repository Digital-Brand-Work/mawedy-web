import { MediaService } from '@digital_brand_work/utilities/media.service'
import { ErrorHandlerService } from '../../../../app-core/misc/error-handler.service'
import { isPlatformBrowser } from '@angular/common'
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { AlertState } from 'app/components/alert/alert.service'
import { setPrefix, slugToSentence } from 'app/app-core/helpers'
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs'
import { RegisterService } from '../../home/register.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'

@Component({
	selector: 'partner-with-us-section1',
	templateUrl: './partner-with-us-section1.component.html',
	styleUrls: ['./partner-with-us-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1Component implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _scrollService: ScrollService,
		private _router: Router,
		private _alert: AlertState,
		private _registerService: RegisterService,
		private _errorHandlerService: ErrorHandlerService,
		private _mediaService: MediaService,
	) {}

	unsubscribe$: Subject<any> = new Subject<any>()

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	focus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	isProcessing: boolean = false

	emailErrors: boolean = false

	phoneErrors: boolean = false

	ngOnInit(): void {
		this.focus$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			if (isPlatformBrowser(this._platformID)) {
				setTimeout(() => {
					this._scrollService.scrollToTop()
				}, 50)
			}
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	register(data: { form: FormGroup; trade_license_photo: any }) {
		this.isProcessing = true
		this.emailErrors = false
		this.phoneErrors = false

		let form = new FormData()
		let payload = data.form.value
		delete payload.interval

		console.log(payload)

		form.append('trade_license_photo', data.trade_license_photo)

		form.append(
			'phone_number_one',
			`${setPrefix(payload.phone_number_one_country_code)}${
				payload.phone_number_one
			}`,
		)

		for (let key in payload) {
			if (key !== 'phone_number_one') {
				form.append(key, payload[key])
			}
		}

		this._registerService
			.post(form)
			.subscribe({
				next: () => {
					this._router.navigate(['/sit-back-relax'])
				},
				error: (http) => this._errorHandlerService.handleError(http),
			})
			.add(() => (this.isProcessing = false))
	}
}
