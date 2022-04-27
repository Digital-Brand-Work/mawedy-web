import { NgModule } from '@angular/core'
import { RouterModule, Route, PreloadAllModules } from '@angular/router'
import { InitialDataResolver } from './app.resolvers'
import { LayoutComponent } from './layout/layout.component'

export const routes: Route[] = [
	{
		path: '',
		loadChildren: () =>
			import('./modules/landing/home/home.module').then(
				(m) => m.LandingHomeModule,
			),
	},
	{
		path: ':clinic_name',
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./modules/admin/dashboard/dashboard.module').then(
						(m) => m.DashboardModule,
					),
			},
			{
				path: 'appointments',
				loadChildren: () =>
					import(
						'./modules/admin/appointments/appointments.module'
					).then((m) => m.AppointmentsModule),
			},
			{
				path: 'doctors',
				loadChildren: () =>
					import('./modules/admin/doctors/doctors.module').then(
						(m) => m.DoctorsModule,
					),
			},
			{
				path: 'patients',
				loadChildren: () =>
					import('./modules/admin/patients/patients.module').then(
						(m) => m.PatientsModule,
					),
			},
			{
				path: 'clinic',
				loadChildren: () =>
					import('./modules/admin/clinic/clinic.module').then(
						(m) => m.ClinicModule,
					),
			},
			{
				path: 'promotions',
				loadChildren: () =>
					import('./modules/admin/promotions/promotions.module').then(
						(m) => m.PromotionsModule,
					),
			},
			{
				path: 'subscription',
				loadChildren: () =>
					import(
						'./modules/admin/subscriptions/subscriptions.module'
					).then((m) => m.SubscriptionsModule),
			},
			{
				path: 'account-setting',
				loadChildren: () =>
					import(
						'./modules/admin/account-setting/account-setting.module'
					).then((m) => m.AccountSettingModule),
			},
		],
	},
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
