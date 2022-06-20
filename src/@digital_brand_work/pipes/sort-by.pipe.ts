import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
	transform(items: any[], column: string): any[] {
		return items.sort((a: any, b: any) => {
			return a.column - b.column
		})
	}
}
