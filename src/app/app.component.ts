import { Component, HostListener } from '@angular/core'
import { Observable } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from './components/alert/alert.service'
import { Alert } from './mawedy-core/models/utility.models'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { ClinicUserService } from './modules/admin/clinic/clinic.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [...dbwAnimations],
})
export class AppComponent {
	constructor(
		private _alert: AlertState,
		private _mediaService: MediaService,
		private _clinicUserService: ClinicUserService,
	) {}

	alerts$: Observable<Alert[]> = this._alert.get()

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	scrollTop$: Observable<number> = this._mediaService.geScrollTop()

	@HostListener('window:resize')
	onResize() {
		this._mediaService.onResize()
	}

	@HostListener('window:scroll')
	onScroll() {
		this._mediaService.onScroll()
	}

	identity = (item: any) => item

	ngOnInit(): void {
		this._clinicUserService.switched$.next()
	}

	removeAlert(id: string) {
		this._alert.remove(id)
	}
}
