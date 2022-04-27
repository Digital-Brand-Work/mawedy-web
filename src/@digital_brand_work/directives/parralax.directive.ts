import {
	Directive,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Renderer2,
} from '@angular/core'

@Directive({
	selector: '[parallax]',
})
export class ParallaxDirective {
	@Input('factor') set parallaxFactor(val: any) {
		this.factor = val ? val : 1
	}

	@HostBinding('style.transform')
	scroll: string = ''

	private factor!: number

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		this.scroll = ` translateY(${this.getTranslation()}px) !important`
	}

	private getTranslation() {
		return (window.scrollY * this.factor) / 10
	}
}
