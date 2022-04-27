import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'

@Directive({
	selector: '[animateJs]',
})
export class AnimateJsDirective {
	constructor(private renderer: Renderer2, private element: ElementRef) {}

	@Input('animation') set setAnimation(name: string) {
		this.animation = name
	}
	animation!: string

	ngAfterContentInit() {
		this.renderer.addClass(this.element.nativeElement, 'animate__animated')
		this.renderer.addClass(this.element.nativeElement, this.animation)
	}
}
