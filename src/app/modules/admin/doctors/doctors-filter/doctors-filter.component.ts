import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'doctors-filter',
	templateUrl: './doctors-filter.component.html',
	styleUrls: ['./doctors-filter.component.scss'],
})
export class DoctorsFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
