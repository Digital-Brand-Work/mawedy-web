import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'filter',
})
export class TableFilterPipe implements PipeTransform {
	transform(items: any[], value: string): any[] {
		if (!items || items === null) {
			return []
		}

		if (value === undefined || value === '') {
			return items
		}

		if (value.split('').length === 1) {
			return items
		}

		const newItems = []

		items.forEach((item) => {
			for (let key in item) {
				if (
					item !== null &&
					item[key] !== null &&
					typeof item[key] === 'string' &&
					item[key].toLowerCase().includes(value.toLowerCase())
				) {
					const index = newItems.findIndex(
						(array) => array.id === item[key].id,
					)

					if (index < 0) {
						newItems.push(item)
					}
				}
			}
		})

		return [...new Set(newItems)]
	}
}
