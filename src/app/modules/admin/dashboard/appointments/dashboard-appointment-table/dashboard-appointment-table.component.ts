import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'

@Component({
	selector: 'dashboard-appointment-table',
	templateUrl: './dashboard-appointment-table.component.html',
	styleUrls: ['./dashboard-appointment-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentTableComponent implements OnInit {
	constructor(private doctorDetailsModal: DoctorDetailsModal) {}

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
