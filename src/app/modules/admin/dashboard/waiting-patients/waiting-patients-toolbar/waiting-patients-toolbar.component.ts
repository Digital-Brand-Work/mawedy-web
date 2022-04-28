import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'waiting-patients-toolbar',
	templateUrl: './waiting-patients-toolbar.component.html',
	styleUrls: ['./waiting-patients-toolbar.component.scss'],
})
export class WaitingPatientsToolbarComponent implements OnInit {
	constructor() {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	today = new Date(Date.now())

	keyword: string = ''

	ngOnInit(): void {}
}
