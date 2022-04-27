import { NgModule } from '@angular/core'
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component'
import { SharedModule } from 'app/shared/shared.module'

const components = [AppToolbarComponent]

@NgModule({
	declarations: [...components],
	imports: [SharedModule],
	exports: [...components],
})
export class ComponentsModule {}
