import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { countries } from 'app/app-core/constants/countries.constant'
import { iso } from 'app/app-core/constants/countries.iso.constant'

@Component({
	selector: 'country-form',
	templateUrl: './country-form.component.html',
	styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent implements OnInit {
	constructor() {}

	@Output()
	onChangeCountry = new EventEmitter<string>()

	@Input()
	bordered: boolean = false

	@Input()
	rounded: boolean = false

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

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
