import { CartState } from './../../app/states/cart.state'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { Product } from 'src/app/core/models/models'

@Directive({
	selector: '[basketResolver]',
})
export class BasketResolverDirective {
	constructor(
		private renderer: Renderer2,
		private hostElement: ElementRef,
		private cartState: CartState,
	) {}

	@Input('product') set productValue(product: Product | undefined) {
		this.product = product
	}

	cart$ = this.cartState.get()

	product: Product | undefined
	ngAfterViewInit() {
		this.cart$.subscribe((carts) => {
			const value = carts.some((cart) => cart.id == this.product?.id)
			const classes = ['pointer-events-none', 'opacity-30']
			if (value === true) {
				for (let value of classes) {
					this.renderer.addClass(this.hostElement.nativeElement, value)
				}
			}
		})
	}
}
