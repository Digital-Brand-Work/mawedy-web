import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'filter',
})
export class TableFilterPipe implements PipeTransform {
	transform(items: any[], key: string, value: string): any[] {
		if (!items || items === null) {
			return []
		}

		if (!key || !value) {
			return items
		}

		return items.filter(
			(property) =>
				property[key] !== null &&
				property[key].toLowerCase().includes(value.toLowerCase()),
		)
	}
}
