import { Component } from '@angular/core'
import { BehaviorSubject, Observable, take } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from './components/alert/alert.service'
import { Alert } from './mawedy-core/models/utility.models'
import { AddAppointmentModal } from './modules/admin/appointments/appointment-add/appointment-add.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [...dbwAnimations],
})
export class AppComponent {
	constructor(
		private alert: AlertState,

		/* Modals **/
		private addAppointmentModal: AddAppointmentModal,
	) {}

	alerts$: Observable<Alert[]> = this.alert.get()

	addAppointmentModalOpened$: BehaviorSubject<boolean> =
		this.addAppointmentModal.opened$

	identity = (item: any) => item
}
