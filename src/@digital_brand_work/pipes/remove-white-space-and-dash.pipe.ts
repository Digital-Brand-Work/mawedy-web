import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'remove_white_space_and_dash' })
export class RemoveWhiteSpaceAndDashPipe implements PipeTransform {
	transform(value: string): string {
		return value.split('-').join('').split(' ').join('')
	}
}
