import { NgModule } from '@angular/core'
import { RouterModule, Route, PreloadAllModules } from '@angular/router'
import { InitialDataResolver } from './app.resolvers'
import { LayoutComponent } from './layout/layout.component'

export const routes: Route[] = [
	{
		path: ':clinic_name',
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [],
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
