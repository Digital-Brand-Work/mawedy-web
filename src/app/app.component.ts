import { Component, HostListener } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from './components/alert/alert.service'
import { Alert } from './app-core/models/utility.models'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { ClinicUserService } from './modules/admin/clinic/clinic.service'
import { Router } from '@angular/router'
import { fromEvent, map, merge, of } from 'rxjs'
import { ViewApi } from './app-core/http/api/view.api'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [...dbwAnimations],
})
export class AppComponent {
	constructor(
		private _router: Router,
		private _viewApi: ViewApi,
		private _alert: AlertState,
		private _mediaService: MediaService,
		private _clinicUserService: ClinicUserService,
	) {}

	alerts$: Observable<Alert[]> = this._alert.get()
	scrollTop$: Observable<number> = this._mediaService.geScrollTop()
	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$
	@HostListener('window:resize')
	onResize() {
		this._mediaService.onResize()
	}

	@HostListener('window:scroll')
	onScroll() {
		this._mediaService.onScroll()
	}

	ngOnInit(): void {
		this.checkNetworkStatus()
		this._viewApi.post({}).subscribe()
		this._clinicUserService.switched$.next()
	}

	removeAlert(id: string) {
		this._alert.remove(id)
	}

	checkNetworkStatus() {
		return merge(
			of(null),
			fromEvent(window, 'online'),
			fromEvent(window, 'offline'),
		)
			.pipe(map(() => navigator.onLine))
			.subscribe((status: boolean) => {
				if (!status) {
					return this._router.navigate(['/pages/no-internet'])
				}
			})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
