import { NgModule } from '@angular/core'
import { PatientsComponent } from './patients.component'
import { PatientsTableComponent } from './patients-table/patients-table.component'
import { PatientsToolbarComponent } from './patients-toolbar/patients-toolbar.component'
import { PatientsFilterComponent } from './patients-filter/patients-filter.component'
import { PatientDetailsComponent } from './patient-details/patient-details.component'
import { PatientDetailsToolbarComponent } from './patient-details/patient-details-toolbar/patient-details-toolbar.component'
import { PatientDetailsInformationComponent } from './patient-details/patient-details-information/patient-details-information.component'
import { PatientDetailsBookingListComponent } from './patient-details/patient-details-booking-list/patient-details-booking-list.component'
import { PatientDetailsBookingListUploadingResultComponent } from './patient-details/modal/patient-details-booking-list-uploading-result/patient-details-booking-list-uploading-result.component'
import { SharedModule } from 'app/shared/shared.module'
import { RouterModule } from '@angular/router'
import { patientRoutes } from 'app/mawedy-core/routes/admin/patients.routing'
import { StoreModule } from '@ngrx/store'
import * as fromPatient from './patient.reducer'
import { EffectsModule } from '@ngrx/effects'
import { PatientEffects } from 'app/modules/admin/patients/patient.effects'

const components = [
	PatientsComponent,
	PatientsTableComponent,
	PatientsToolbarComponent,
	PatientsFilterComponent,
	PatientDetailsComponent,
	PatientDetailsToolbarComponent,
	PatientDetailsInformationComponent,
	PatientDetailsBookingListComponent,
	PatientDetailsBookingListUploadingResultComponent,
]

@NgModule({
	declarations: [...components],
	imports: [
		SharedModule,
		RouterModule.forChild(patientRoutes),
		StoreModule.forFeature(
			fromPatient.patientsFeatureKey,
			fromPatient.reducer,
		),
		EffectsModule.forFeature([PatientEffects]),
	],
	exports: [...components],
})
export class PatientsModule {}
