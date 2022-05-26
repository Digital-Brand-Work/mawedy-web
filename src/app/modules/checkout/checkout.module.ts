import { SharedModule } from './../../shared/shared.module'
import { NgModule } from '@angular/core'
import { CheckoutComponent } from './checkout.component'
import { RouterModule } from '@angular/router'
import { checkOutRoutes } from 'app/mawedy-core/routes/checkout.routing'

const components = [CheckoutComponent]

@NgModule({
	declarations: [...components],
	exports: [...components],
	imports: [SharedModule, RouterModule.forChild(checkOutRoutes)],
})
export class CheckoutModule {}
