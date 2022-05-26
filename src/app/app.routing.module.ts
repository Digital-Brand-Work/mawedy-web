import { NgModule } from '@angular/core'
import { RouterModule, Route, PreloadAllModules } from '@angular/router'
import { InitialDataResolver } from './app.resolvers'
import { LayoutComponent } from './layout/layout.component'
import { PageNotFoundComponent } from './modules/pages/page-not-found/page-not-found.component'

export const routes: Route[] = [
	{
		path: 'checkout',
		loadChildren: () =>
			import('./modules/checkout/checkout.module').then(
				(module) => module.CheckoutModule,
			),
	},

	{
		path: '',
		loadChildren: () =>
			import('./modules/landing/landing.module').then(
				(module) => module.LandingHomeModule,
			),
	},
	{
		path: ':clinic_name/:branch',
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./modules/admin/dashboard/dashboard.module').then(
						(module) => module.DashboardModule,
					),
			},
			{
				path: 'appointments',
				loadChildren: () =>
					import(
						'./modules/admin/appointments/appointments.module'
					).then((module) => module.AppointmentsModule),
			},
			{
				path: 'doctors',
				loadChildren: () =>
					import('./modules/admin/doctors/doctors.module').then(
						(module) => module.DoctorsModule,
					),
			},
			{
				path: 'patients',
				loadChildren: () =>
					import('./modules/admin/patients/patients.module').then(
						(module) => module.PatientsModule,
					),
			},
			{
				path: 'clinic',
				loadChildren: () =>
					import('./modules/admin/clinic/clinic.module').then(
						(module) => module.ClinicModule,
					),
			},
			{
				path: 'promotions',
				loadChildren: () =>
					import('./modules/admin/promotions/promotions.module').then(
						(module) => module.PromotionsModule,
					),
			},
			{
				path: 'subscription',
				loadChildren: () =>
					import(
						'./modules/admin/subscriptions/subscriptions.module'
					).then((module) => module.SubscriptionsModule),
			},
			{
				path: 'account-setting',
				loadChildren: () =>
					import(
						'./modules/admin/account-setting/account-setting.module'
					).then((module) => module.AccountSettingModule),
			},
		],
	},

	{
		path: '**',
		component: PageNotFoundComponent,
	},
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
			scrollPositionRestoration: 'top',
			anchorScrolling: 'enabled',
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
