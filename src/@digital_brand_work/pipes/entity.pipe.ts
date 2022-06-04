import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'entities' })
export class EntitiesPipe implements PipeTransform {
	transform(value: any, arg: any = null): any {
		return Object.values(value)
	}
}
