import { PaginationData } from 'app/app.resolvers'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
	constructor() {}

	@Output()
	onPageChange = new EventEmitter<string>()

	@Input()
	items: any[] = []

	@Input()
	active?: number

	@Input()
	table?: PaginationData

	ngOnInit(): void {}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
