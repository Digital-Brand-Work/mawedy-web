import { Routes } from '@angular/router'

export const authRotes: Routes = [
	{ path: '', redirectTo: 'forgot-password', pathMatch: 'full' },
	{
		path: 'forgot-password',
		loadChildren: () =>
			import(
				'../../modules/auth/forgot-password/forgot-password.module'
			).then((module) => module.AuthForgotPasswordModule),
	},
	{
		path: 'reset-password',
		loadChildren: () =>
			import(
				'../../modules/auth/reset-password/reset-password.module'
			).then((module) => module.AuthResetPasswordModule),
	},
	{
		path: 'confirmation-required',
		loadChildren: () =>
			import(
				'../../modules/auth/confirmation-required/confirmation-required.module'
			).then((module) => module.AuthConfirmationRequiredModule),
	},
	{
		path: 'sign-in',
		loadChildren: () =>
			import('../../modules/auth/sign-in/sign-in.module').then(
				(module) => module.AuthSignInModule,
			),
	},
	{
		path: 'sign-out',
		loadChildren: () =>
			import('../../modules/auth/sign-out/sign-out.module').then(
				(module) => module.AuthSignOutModule,
			),
	},
	{
		path: 'unlock-session',
		loadChildren: () =>
			import(
				'../../modules/auth/unlock-session/unlock-session.module'
			).then((module) => module.AuthUnlockSessionModule),
	},
	{
		path: 'confirmation-required',
		loadChildren: () =>
			import(
				'../../modules/auth/confirmation-required/confirmation-required.component'
			).then((module) => module.AuthConfirmationRequiredComponent),
	},
]
