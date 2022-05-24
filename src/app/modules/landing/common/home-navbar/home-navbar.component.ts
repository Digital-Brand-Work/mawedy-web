import { Component, OnInit } from '@angular/core'
import {
	HomeNav,
	homeNavigation,
} from '../../../../mawedy-core/navigation/landing.navigation'

@Component({
	selector: 'home-navbar',
	templateUrl: './home-navbar.component.html',
	styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
	constructor() {}

	navigation: HomeNav[] = homeNavigation

	ngOnInit(): void {}
}
