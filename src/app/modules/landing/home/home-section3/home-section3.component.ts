import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'home-section3',
	templateUrl: './home-section3.component.html',
	styleUrls: ['./home-section3.component.scss'],
})
export class HomeSection3Component implements OnInit {
	constructor() {}

	yearlyBilling: boolean = true

	ngOnInit(): void {}

	identity = (item: any) => item
}
