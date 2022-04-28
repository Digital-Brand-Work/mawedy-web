import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	constructor(private router: Router) {}

	isInAppointments$ = this.router.events.pipe(
		map(() => this.router.url.includes('appointments')),
	)

	ngOnInit(): void {}
}
