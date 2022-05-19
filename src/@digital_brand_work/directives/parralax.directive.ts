import { isPlatformBrowser } from '@angular/common'
import {
	Directive,
	HostBinding,
	Input,
	HostListener,
	ElementRef,
	Renderer2,
	PLATFORM_ID,
	Inject,
} from '@angular/core'

@Directive({
	selector: '[parallax]',
})
export class ParallaxDirective {
	constructor(@Inject(PLATFORM_ID) private _platformID: Object) {}

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
		if (isPlatformBrowser(this._platformID)) {
			return (window.scrollY * this.factor) / 10
		}
	}
}
