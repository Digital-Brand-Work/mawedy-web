import { empty } from 'app/app-core/helpers'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { countries } from 'app/app-core/constants/country-codes.list'
@Component({
	selector: 'mobile-number-form',
	templateUrl: './mobile-number-form.component.html',
	styleUrls: ['./mobile-number-form.component.scss'],
})
export class MobileNumberFormComponent implements OnInit {
	constructor() {}

	@Output()
	onMobileNumberChange = new EventEmitter<{
		countryCode: string
		phoneNumber: string
	}>()

	@Input()
	bold: boolean = false

	@Input()
	rounded: boolean = false

	@Input()
	bordered: boolean = false

	@Input()
	phoneErrors: boolean = false

	@Input('countryCode') set setCountryCode(code: string) {
		this.country_code = code

		this.change(code)
	}

	@Input()
	phoneNumber: string = ''

	@Input('code')
	set setCode(code: any) {
		this.country_code = code

		this.country_code1 = code.toLowerCase()

		this.emit()
	}

	code: boolean = false

	countries = countries
		.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
		.reverse()

	country_code = 'AE'

	country_code1 = 'ae'

	ngOnInit(): void {}

	change(event) {
		if (!empty(this.country_code)) {
			this.country_code1 = event.target.value.toLowerCase()
		}

		this.emit()
	}

	emit() {
		if (this.country_code !== '' && this.phoneNumber !== '') {
			this.onMobileNumberChange.emit({
				countryCode: this.country_code,
				phoneNumber: this.phoneNumber,
			})
		}
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
