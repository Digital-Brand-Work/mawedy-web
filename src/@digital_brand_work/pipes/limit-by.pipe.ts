import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'limitBy',
})
export class LimitByPipe implements PipeTransform {
	transform(items: any[], limit: number): any[] {
		return items.slice(0, limit)
	}
}
