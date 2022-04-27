import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'home-section1-login-panel',
	templateUrl: './home-section1-login-panel.component.html',
	styleUrls: ['./home-section1-login-panel.component.scss'],
})
export class HomeSection1LoginPanelComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	login() {
		this.router.navigate(['/aster_clinic'])
	}
}
