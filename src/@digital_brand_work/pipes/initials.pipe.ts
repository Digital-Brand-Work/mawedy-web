import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
	transform(value: string): any {
		if (value.split('').length === 1) {
			return value
		}

		const initials = value.split(' ')

		if (initials.length === 1) {
			const newInitial = initials[0].split('')

			return newInitial[0] + newInitial[1]
		}

		return initials[0].charAt(0) + initials[1].charAt(0)
	}
}
