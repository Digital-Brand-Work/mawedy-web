import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'doctors-toolbar',
	templateUrl: './doctors-toolbar.component.html',
	styleUrls: ['./doctors-toolbar.component.scss'],
})
export class DoctorsToolbarComponent implements OnInit {
	constructor() {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	keyword: string = ''

	ngOnInit(): void {}
}
