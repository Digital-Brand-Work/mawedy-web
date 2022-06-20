// import { Pipe, PipeTransform } from '@angular/core'
// import { CartProduct, Product } from 'src/app/core/models/models'

// @Pipe({
// 	name: 'basketResolver',
// })
// export class BasketResolverPipe implements PipeTransform {
// 	transform(
// 		string: string,
// 		value: {
// 			product: Product | undefined
// 			carts: CartProduct[]
// 		},
// 	): string {
// 		const isAdded = value.carts.some((cart) => cart.id == value.product?.id)
// 		return isAdded ? 'On your basket' : 'Add to Basket'
// 	}
// }
