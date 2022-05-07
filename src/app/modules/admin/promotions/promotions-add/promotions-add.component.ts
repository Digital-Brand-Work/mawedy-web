import { Component, HostListener, OnInit } from '@angular/core'

@Component({
	selector: 'promotion-add',
	templateUrl: './promotions-add.component.html',
	styleUrls: ['./promotions-add.component.scss'],
})
export class PromotionsAddComponent implements OnInit {
	constructor() {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		history.back()
	}

	ngOnInit(): void {}
}
