import { MedicalServiceEffects } from './../../../store/medical-service/medical-service.effects'
import { DepartmentEffects } from './../../../store/department/department.effects'
import { RouterModule } from '@angular/router'
import { SharedModule } from './../../../shared/shared.module'
import { NgModule } from '@angular/core'
import { ClinicComponent } from './clinic.component'
import { ClinicInformationComponent } from './clinic-information/clinic-information.component'
import { ClinicServicesComponent } from './clinic-services/clinic-services.component'
import { ClinicInformationMapComponent } from './clinic-information-map/clinic-information-map.component'
import { clinicRoutes } from 'app/routes/admin/clinic.routing'
import { ClinicTimingsComponent } from './clinic-timings/clinic-timings.component'
import { ClinicServiceItemComponent } from './clinic-services/clinic-service-item/clinic-service-item.component'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import * as department from '../../../store/department/department.reducer'
import * as medicalService from '../../../store/medical-service/medical-service.reducer'

const components = [
	ClinicComponent,
	ClinicInformationComponent,
	ClinicServicesComponent,
	ClinicInformationMapComponent,
	ClinicTimingsComponent,
	ClinicServiceItemComponent,
]

@NgModule({
	declarations: [...components],
	imports: [
		SharedModule,
		RouterModule.forChild(clinicRoutes),
		StoreModule.forFeature(
			department.departmentsFeatureKey,
			department.reducer,
		),
		StoreModule.forFeature(
			medicalService.medicalServicesFeatureKey,
			medicalService.reducer,
		),
		EffectsModule.forFeature([DepartmentEffects, MedicalServiceEffects]),
	],
	exports: [...components],
})
export class ClinicModule {}
