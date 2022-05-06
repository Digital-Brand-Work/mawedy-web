import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'dashboard-status',
	templateUrl: './dashboard-status.component.html',
	styleUrls: ['./dashboard-status.component.scss'],
})
export class DashboardStatusComponent implements OnInit {
	constructor() {}

	@Input() color: 'red' | 'green' | 'blue' = 'blue'

	ngOnInit(): void {}
}
