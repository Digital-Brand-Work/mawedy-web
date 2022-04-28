import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'waiting-patients-filter',
	templateUrl: './waiting-patients-filter.component.html',
	styleUrls: ['./waiting-patients-filter.component.scss'],
})
export class WaitingPatientsFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
