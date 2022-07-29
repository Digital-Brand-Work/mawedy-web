import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
} from '@angular/core'

@Directive({
	selector: '[addAnimation]',
})
export class AddAnimationDirective {
	constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

	@Input() animationData?: {
		entranceAnimations: string[]
		exitAnimations: string[]
		faster?: true
	}

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		if (this.animationData) {
			const rect = this.hostElement.nativeElement.getBoundingClientRect()

			const topShown = rect.top >= 0

			const bottomShown = rect.bottom <= window.innerHeight - 100

			if (topShown && bottomShown) {
				this.animationData.exitAnimations.forEach(
					(className: string) => {
						this.renderer.removeClass(
							this.hostElement.nativeElement,
							className,
						)
					},
				)

				this.animationData.entranceAnimations.forEach(
					(className: string) => {
						this.renderer.addClass(
							this.hostElement.nativeElement,
							className,
						)
					},
				)
			} else {
				this.animationData.entranceAnimations.forEach(
					(className: string) => {
						this.renderer.removeClass(
							this.hostElement.nativeElement,
							className,
						)
					},
				)

				this.animationData.exitAnimations.forEach(
					(className: string) => {
						this.renderer.addClass(
							this.hostElement.nativeElement,
							className,
						)
					},
				)
			}
		}
	}

	ngAfterContentInit() {
		this.renderer.addClass(
			this.hostElement.nativeElement,
			'animate__animated',
		)

		if (this.animationData && this.animationData.faster) {
			this.renderer.addClass(
				this.hostElement.nativeElement,
				'animate__faster',
			)
		}
	}
}
