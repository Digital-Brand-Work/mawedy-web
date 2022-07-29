import { ElementRef, Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'is_in_view' })
export class IsInViewPipe implements PipeTransform {
	transform(hostElement: ElementRef) {
		return is_in_view(hostElement)
	}
}

export function is_in_view(hostElement: ElementRef) {
	const rect = hostElement.nativeElement.getBoundingClientRect()

	const topShown = rect.top >= 0

	const bottomShown = rect.bottom <= window.innerHeight

	return topShown && bottomShown
}
