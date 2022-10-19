import { BaseState } from './../../../@digital_brand_work/states/base.state'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { Alert } from 'app/app-core/models/utility.models'
import { isPlatformBrowser } from '@angular/common'

@Injectable({ providedIn: 'root' })
export class AlertState extends BaseState<Alert> {
	alerts$ = this.get()

	interval: any

	constructor(@Inject(PLATFORM_ID) private _platformID: Object) {
		super({
			willSaveLocally: false,
			name: 'alert',
		})

		this.alerts$.subscribe((alerts) => {
			if (alerts.length === 0) {
				return clearInterval(this.interval)
			}

			if (isPlatformBrowser(this._platformID)) {
				this.interval = setInterval(() => {
					let newAlerts = alerts

					alerts.pop()

					this.initialize(newAlerts)
				}, 10000)
			}
		})
	}
}
