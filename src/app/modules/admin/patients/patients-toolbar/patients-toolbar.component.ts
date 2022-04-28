import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'patients-toolbar',
	templateUrl: './patients-toolbar.component.html',
	styleUrls: ['./patients-toolbar.component.scss'],
})
export class PatientsToolbarComponent implements OnInit {
	constructor() {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	keyword: string = ''

	ngOnInit(): void {}
}
