import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
	selector: '[autoSize]',
})
export class AutoSizeDirective {
	constructor(public element: ElementRef) {}
	@Input() max: number

	@Input() min: number

	@HostListener('input', ['$event.target'])
	@HostListener('cut', ['$event.target'])
	@HostListener('paste', ['$event.target'])
	@HostListener('change', ['$event.target'])
	ngOnInit(): void {
		this.adjustCustom()
	}

	adjustCustom(): void {
		const element = this.element.nativeElement

		element.style.height = this.min + 'px'

		element.style.height = element.scrollHeight + 'px'

		if (element.scrollHeight <= this.max) {
			element.style.overflowY = 'hidden'

			delete element.style.maxHeight
		} else {
			element.style.overflowY = 'scroll'

			element.style.maxHeight = this.max + 'px'
		}
	}
}
