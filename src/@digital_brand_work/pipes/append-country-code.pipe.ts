import { Pipe, PipeTransform } from '@angular/core'
import { countries } from 'app/mawedy-core/constants/country-codes.list'
import * as dayjs from 'dayjs'

@Pipe({
	name: 'appendCountryCode',
})
export class AppendCountryCodePipe implements PipeTransform {
	countries = countries
		.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
		.reverse()

	transform(value: string, code: string): string {
		const dial_code = this.countries.find(
			(country) => code === country.code,
		).dial_code

		return `${dial_code}-${this.numberWithSpaces(value, '##-###-####')}`
	}

	numberWithSpaces(value, pattern) {
		var i = 0,
			phone = value.toString()
		return pattern.replace(/#/g, (_) => phone[i++])
	}
}
