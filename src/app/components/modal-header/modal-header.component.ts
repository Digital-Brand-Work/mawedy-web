import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'modal-header',
	templateUrl: './modal-header.component.html',
	styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
	constructor() {}

	@Output() onClose = new EventEmitter()

	@Input() modalTitle: string = ''

	ngOnInit(): void {}
}
