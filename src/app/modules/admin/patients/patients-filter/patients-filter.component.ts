import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'patients-filter',
	templateUrl: './patients-filter.component.html',
	styleUrls: ['./patients-filter.component.scss'],
})
export class PatientsFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
