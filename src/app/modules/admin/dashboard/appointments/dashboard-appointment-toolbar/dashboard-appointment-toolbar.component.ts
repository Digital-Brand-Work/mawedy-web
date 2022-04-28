import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'dashboard-toolbar',
	templateUrl: './dashboard-appointment-toolbar.component.html',
	styleUrls: ['./dashboard-appointment-toolbar.component.scss'],
})
export class DashboardAppointmentToolbarComponent implements OnInit {
	constructor() {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	today = new Date(Date.now())

	keyword: string = ''

	ngOnInit(): void {}
}
