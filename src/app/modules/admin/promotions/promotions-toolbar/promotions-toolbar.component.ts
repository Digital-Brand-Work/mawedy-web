import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'promotions-toolbar',
	templateUrl: './promotions-toolbar.component.html',
	styleUrls: ['./promotions-toolbar.component.scss'],
})
export class PromotionsToolbarComponent implements OnInit {
	constructor() {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	keyword: string = ''

	ngOnInit(): void {}
}
