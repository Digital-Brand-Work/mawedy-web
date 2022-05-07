import { dbwAnimations } from './../../../../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'dashboard-appointment-table',
	templateUrl: './dashboard-appointment-table.component.html',
	styleUrls: ['./dashboard-appointment-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DashboardAppointmentTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
