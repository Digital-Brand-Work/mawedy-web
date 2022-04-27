import { BreakPoint } from 'src/@dbw/models/core.model'
import { take } from 'rxjs/operators'
import { Directive, ElementRef, Renderer2 } from '@angular/core'
import { Observable } from 'rxjs'
import { CartState } from 'src/app/states/cart.state'
import { MediaService } from '../utilities/media.service'

@Directive({
	selector: '[addMarginOnCartChanges]',
})
export class AddMarginOnCartDirective {
	constructor(
		private state: CartState,
		private renderer: Renderer2,
		private hostElement: ElementRef,
		private media: MediaService,
	) {}

	cart$ = this.state.get()

	breakpoint$: Observable<BreakPoint> = this.media.breakpoints$

	ngAfterViewInit() {
		this.cart$.subscribe((carts) => {
			if (carts.length !== 0) {
				this.breakpoint$.pipe(take(1)).subscribe((screen: BreakPoint) => {
					let margin = 'mt-16'

					if (screen === 'laptop' || screen === 'desktop' || screen === 'max') {
						margin = 'mt-24'
					}

					this.renderer.addClass(this.hostElement.nativeElement, margin)
				})
			}
		})
	}
}
