import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'home-section3',
	templateUrl: './home-section3.component.html',
	styleUrls: ['./home-section3.component.scss'],
})
export class HomeSection3Component implements OnInit {
	constructor() {}

	description: string =
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis .'

	ngOnInit(): void {}
}
