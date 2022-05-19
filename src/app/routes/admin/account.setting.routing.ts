import { Routes } from '@angular/router'
import { AccountSettingComponent } from 'app/modules/admin/account-setting/account-setting.component'
import { UserAccountsComponent } from 'app/modules/admin/account-setting/user-accounts/user-accounts.component'

export const accountSettingRoutes: Routes = [
	{
		path: '',
		redirectTo: 'update',
		pathMatch: 'full',
	},

	{
		path: 'update',
		component: AccountSettingComponent,
	},
	{
		path: 'user-account',
		component: UserAccountsComponent,
	},
]
