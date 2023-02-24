import { empty } from 'app/app-core/helpers'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'entities' })
export class EntitiesPipe implements PipeTransform {
	transform<T>(object: T): T[] {
		if (empty(object)) {
			return []
		}

		return Object.values(object)
	}
}
