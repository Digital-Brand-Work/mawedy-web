import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'modal-appointment',
	templateUrl: './modal-appointment.component.html',
	styleUrls: ['./modal-appointment.component.scss'],
	animations: [...dbwAnimations],
})
export class ModalAppointmentComponent implements OnInit {
	constructor(private addAppointmentModal: AddAppointmentModal) {}

	addAppointmentModalOpened$: BehaviorSubject<boolean> =
		this.addAppointmentModal.opened$

	ngOnInit(): void {}
}
