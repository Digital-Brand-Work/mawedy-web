import { BaseState } from './../../../@digital_brand_work/states/base.state'
import { Injectable } from '@angular/core'
import { Alert } from 'app/mawedy-core/models/utility.models'

@Injectable({ providedIn: 'root' })
export class AlertState extends BaseState<Alert> {
	alerts$ = this.get()

	interval: any

	constructor() {
		super({
			willSaveLocally: false,
			name: 'alert',
		})

		this.alerts$.subscribe((alerts) => {
			if (alerts.length === 0) {
				return clearInterval(this.interval)
			}

			this.interval = setInterval(() => {
				let newAlerts = alerts

				alerts.pop()

				this.initialize(newAlerts)
			}, 2000)
		})
	}
}
