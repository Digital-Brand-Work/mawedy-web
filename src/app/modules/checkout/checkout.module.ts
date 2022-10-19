import { SharedModule } from './../../shared/shared.module'
import { NgModule } from '@angular/core'
import { CheckoutComponent } from './checkout.component'
import { RouterModule } from '@angular/router'
import { checkOutRoutes } from 'app/app-core/routes/checkout.routing'
import { CheckoutSection1Component } from './checkout-section1/checkout-section1.component'
import { CheckoutSection2Component } from './checkout-section2/checkout-section2.component'

const components = [CheckoutComponent]

@NgModule({
	declarations: [
		...components,
		CheckoutSection1Component,
		CheckoutSection2Component,
	],
	exports: [...components],
	imports: [SharedModule, RouterModule.forChild(checkOutRoutes)],
})
export class CheckoutModule {}
