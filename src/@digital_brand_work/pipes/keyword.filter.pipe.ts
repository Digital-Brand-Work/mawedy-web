import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'keyword-filter',
})
export class KeywordFilterPipe implements PipeTransform {
	transform(value: any[], ...args: string[]): unknown {
		if (value && args[0] && args[0].length > 2) {
			return value.filter((item) =>
				item.name.toLowerCase().includes(args[0].toLowerCase()),
			)
		}

		return value
	}
}
