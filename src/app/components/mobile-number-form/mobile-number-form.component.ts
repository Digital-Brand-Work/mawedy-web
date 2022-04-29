import { Component, OnInit } from '@angular/core'
import { countries } from 'app/mawedy-core/constants/country-codes.list'
@Component({
	selector: 'mobile-number-form',
	templateUrl: './mobile-number-form.component.html',
	styleUrls: ['./mobile-number-form.component.scss'],
})
export class MobileNumberFormComponent implements OnInit {
	constructor() {}

	countries = countries
		.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
		.reverse()

	ngOnInit(): void {}

	country_code = 'AE'

	country_code1 = 'ae'

	change(event) {
		this.country_code1 = event.target.value.toLowerCase()
	}
}
