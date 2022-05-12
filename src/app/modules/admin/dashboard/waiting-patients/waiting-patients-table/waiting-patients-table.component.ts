import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { DoctorDetailsModal } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'waiting-patients-table',
	templateUrl: './waiting-patients-table.component.html',
	styleUrls: ['./waiting-patients-table.component.scss'],
	animations: [...dbwAnimations],
})
export class WaitingPatientsTableComponent implements OnInit {
	constructor(private doctorDetailsModal: DoctorDetailsModal) {}

	doctorDetailsModalOpened$: BehaviorSubject<boolean> =
		this.doctorDetailsModal.opened$

	ngOnInit(): void {}

	identity = (item: any) => item
}
