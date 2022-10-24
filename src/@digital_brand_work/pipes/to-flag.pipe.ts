import { Pipe, PipeTransform } from '@angular/core'
import { iso } from 'app/app-core/constants/countries.iso.constant'

@Pipe({ name: 'to_flag' })
export class ToFlagPipe implements PipeTransform {
	transform(country: string, find: boolean = false): string {
		return to_flag(country, find)
	}
}

export function to_flag(country: string, find: boolean = false): string {
	// return `https://flagcdn.com/64x48/${country.toLocaleLowerCase()}.png`

	if (!find) {
		return `https://countryflagsapi.com/svg/${country.toLocaleLowerCase()}`
	}

	const flag = iso.find((oldCountry) => {
		return oldCountry.name === (country as any)
	})['alpha-2']

	return `https://countryflagsapi.com/svg/${flag.toLocaleLowerCase()}`
}
