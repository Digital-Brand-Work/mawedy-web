import { Clinic } from './../modules/admin/clinic/clinic.model'
import { environment } from './../../environments/environment'
import { Injectable } from '@angular/core'
import Echo, { Channel } from 'laravel-echo'

@Injectable({ providedIn: 'root' })
export class LaravelNotificationService {
	constructor() {}

	echo?: Echo

	init(token: string, clinic: Clinic) {
		this.echo = new Echo({
			broadcaster: 'pusher',
			key: 'YY-i5Q.er4icw',
			wsHost: 'realtime-pusher.ably.io',
			wsPort: 443,
			disableStats: true,
			encrypted: true,
			namespace: '',
			auth: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
			authEndpoint: `${environment.api}broadcasting/auth`,
		})

		this.registerClinic(clinic.id)
	}

	registerClinic(id: string) {
		this.echo.private(`clinic.${id}`).notification((e: any) => {
			console.log('notification', e)
		})
	}
}
