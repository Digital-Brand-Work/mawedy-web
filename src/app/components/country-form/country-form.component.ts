import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { countries } from 'app/mawedy-core/constants/countries.constant'
import { iso } from 'app/mawedy-core/constants/countries.iso.constant'

@Component({
	selector: 'country-form',
	templateUrl: './country-form.component.html',
	styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent implements OnInit {
	constructor() {}

	@Output() onChangeCountry = new EventEmitter<string>()

	countries: string[] = []

	country_code1 = 'ae'

	country = 'United Arab Emirates'

	ngOnInit(): void {
		for (let key in countries) {
			this.countries.push(key)
		}

		this.onChange('United Arab Emirates')
	}

	onChange(country: string) {
		this.country_code1 = iso
			.find((element: any) => element.name === country)
			['alpha-2'].toLowerCase()

		this.onChangeCountry.emit(country)
	}

	identity = (item: any) => item
}
