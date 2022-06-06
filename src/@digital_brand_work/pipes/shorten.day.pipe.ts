import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'shortened',
})
export class ShortenDayPipe implements PipeTransform {
	transform(day: string): string {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
