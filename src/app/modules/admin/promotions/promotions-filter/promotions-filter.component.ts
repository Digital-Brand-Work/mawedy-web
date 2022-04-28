import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'promotions-filter',
	templateUrl: './promotions-filter.component.html',
	styleUrls: ['./promotions-filter.component.scss'],
})
export class PromotionsFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
