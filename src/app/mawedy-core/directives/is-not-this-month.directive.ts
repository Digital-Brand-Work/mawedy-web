import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import * as dayjs from 'dayjs'

@Directive({
	selector: '[isNotThisMonth]',
})
export class IsNotThisMonthDirective {
	constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

	@Input() date: Date

	ngAfterContentInit(): void {
		const currentMonth =
			dayjs().format('MM') === dayjs(this.date).format('MM')

		if (!currentMonth) {
			this.renderer.addClass(
				this.hostElement.nativeElement,
				'text-gray-400',
			)
		} else {
			this.renderer.addClass(
				this.hostElement.nativeElement,
				'accent-color',
			)
		}
	}
}
