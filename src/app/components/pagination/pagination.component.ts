import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
	@Output() onPageChange = new EventEmitter<number>()

	@Input() items: any[] = []

	@Input() active?: number

	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
