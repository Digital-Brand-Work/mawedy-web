import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'for-approvals-filter',
	templateUrl: './for-approvals-filter.component.html',
	styleUrls: ['./for-approvals-filter.component.scss'],
})
export class ForApprovalsFilterComponent implements OnInit {
	constructor() {}

	@Output() onFilter = new EventEmitter()

	ngOnInit(): void {}
}
