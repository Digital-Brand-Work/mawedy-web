import { RouterModule } from '@angular/router'
import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
import { AccountSettingComponent } from './account-setting.component'
import { accountSettingRoutes } from 'app/routes/admin/account.setting.routing';
import { UserAccountsComponent } from './user-accounts/user-accounts.component'

@NgModule({
	declarations: [AccountSettingComponent, UserAccountsComponent],
	imports: [SharedModule, RouterModule.forChild(accountSettingRoutes)],
})
export class AccountSettingModule {}
