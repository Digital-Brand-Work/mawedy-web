import { NgModule } from '@angular/core'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { doctorRoutes } from 'app/app-core/routes/admin/doctors.routing'
import { DoctorsComponent } from './doctors.component'
import { DoctorsFilterComponent } from './doctors-filter/doctors-filter.component'
import { DoctorsTableComponent } from './doctors-table/doctors-table.component'
import { DoctorsToolbarComponent } from './doctors-toolbar/doctors-toolbar.component'
import { StoreModule } from '@ngrx/store'
import * as fromDoctor from './doctor.reducer'
import { EffectsModule } from '@ngrx/effects'
import { DoctorEffects } from './doctor.effects'
import { DoctorSearchResultsComponent } from './doctor-search-results/doctor-search-results.component'

const components = [
	DoctorsComponent,
	DoctorsTableComponent,
	DoctorsToolbarComponent,
	DoctorsFilterComponent,
]

@NgModule({
	declarations: [...components, DoctorSearchResultsComponent],
	imports: [
		SharedModule,
		RouterModule.forChild(doctorRoutes),
		StoreModule.forFeature(
			fromDoctor.doctorsFeatureKey,
			fromDoctor.reducer,
		),
		EffectsModule.forFeature([DoctorEffects]),
	],
	exports: [...components],
})
export class DoctorsModule {}
