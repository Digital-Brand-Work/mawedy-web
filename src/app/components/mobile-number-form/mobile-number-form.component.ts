import { Component, Input, OnInit } from '@angular/core'
import { countries } from 'app/mawedy-core/constants/country-codes.list'
@Component({
	selector: 'mobile-number-form',
	templateUrl: './mobile-number-form.component.html',
	styleUrls: ['./mobile-number-form.component.scss'],
})
export class MobileNumberFormComponent implements OnInit {
	constructor() {}

	@Input() bordered: boolean = false

	@Input() rounded: boolean = false

	countries = countries
		.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
		.reverse()

	country_code = 'AE'

	country_code1 = 'ae'

	ngOnInit(): void {}

	change(event) {
		this.country_code1 = event.target.value.toLowerCase()
	}
}
