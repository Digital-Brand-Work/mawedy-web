import { ComponentsModule } from 'app/components/components.module'
import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
import { AccountSettingComponent } from './account-setting.component'

@NgModule({
	declarations: [AccountSettingComponent],
	imports: [SharedModule, ComponentsModule],
})
export class AccountSettingModule {}
