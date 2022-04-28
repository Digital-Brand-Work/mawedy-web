import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'dashboard-appointment-filter',
	templateUrl: './dashboard-appointment-filter.component.html',
	styleUrls: ['./dashboard-appointment-filter.component.scss'],
})
export class DashboardAppointmentFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
