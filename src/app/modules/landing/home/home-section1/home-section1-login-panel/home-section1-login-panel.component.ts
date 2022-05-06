import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { AlertState } from 'app/components/alert/alert.service'
import { Observable, take } from 'rxjs'
import { Alert } from 'app/mawedy-core/models/utility.models'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'home-section1-login-panel',
	templateUrl: './home-section1-login-panel.component.html',
	styleUrls: ['./home-section1-login-panel.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection1LoginPanelComponent implements OnInit {
	constructor(private router: Router, private alert: AlertState) {}

	alerts$: Observable<Alert[]> = this.alert.get()

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	login() {
		this.alerts$.pipe(take(1)).subscribe((alerts) => {
			this.alert.add({
				id: alerts.length + 1 + '',
				title: 'Welcome Back Aster Clinic Bur Dubai Branch!',
				message:
					'We hope that you use our services to its full extent. Have a great day ahead.',
				type: 'info',
			})
		})

		this.router.navigate(['/aster_clinic'])
	}
}
