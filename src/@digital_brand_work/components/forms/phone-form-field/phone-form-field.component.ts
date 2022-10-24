import { FormGroup, ControlContainer } from '@angular/forms'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { countryWithISO } from 'app/app-core/constants/countries.iso.constant'
import { countryWithDialCode } from 'app/app-core/constants/country-codes.list'

@Component({
	selector: 'phone-form-field',
	templateUrl: './phone-form-field.component.html',
	animations: [...dbwAnimations],
})
export class PhoneFormFieldComponent implements OnInit {
	constructor(private _controlContainer: ControlContainer) {}

	readonly COUNTRIES = countryWithISO

	@Output()
	onChangeCountryCode = new EventEmitter<string>()

	@Output()
	onChangeDialCode = new EventEmitter<string>()

	@Input()
	form?: FormGroup

	@Input()
	name?: string

	countryISO: string = 'AE'

	ngOnInit(): void {
		this.form = <FormGroup>this._controlContainer.control

		const phone = this.form.get(this.name)?.value

		if (phone === null || !phone.toString().includes('+')) {
			this.changeFlag('United Arab Emirates')
		}
	}

	changeFlag(country: string) {
		const iso = countryWithISO.find((oldCountry) => {
			return oldCountry.name === (country as any)
		})

		if (iso) {
			this.countryISO = (iso['alpha-2'] ?? 'AE').toLocaleLowerCase()

			this.onChangeCountryCode.emit(this.countryISO)

			const country = countryWithDialCode.find(
				(country) =>
					country.code.toLocaleLowerCase() ===
					this.countryISO.toLocaleLowerCase(),
			)

			if (country) {
				this.onChangeDialCode.emit(country.dial_code)

				this.form.get(this.name)?.setValue(`${country.dial_code}`)
			}
		}
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
