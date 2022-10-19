import { Component, OnInit } from '@angular/core'
import { EMAIL, PHONE } from 'app/app-core/constants/app.constant'

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	constructor() {}

	phone: string = PHONE

	email: string = EMAIL

	ngOnInit(): void {}
}
