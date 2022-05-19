import { SharedModule } from 'app/shared/shared.module'
import { NgModule } from '@angular/core'
import { PlaceholderAppointmentsComponent } from './placeholder-appointments/placeholder-appointments.component'
import { PlaceholderWaitingPatientComponent } from './placeholder-waiting-patient/placeholder-waiting-patient.component'
import { PlaceholderDoctorComponent } from './placeholder-doctor/placeholder-doctor.component'
import { PlaceholderPatientComponent } from './placeholder-patient/placeholder-patient.component'
import { PlaceholderPromotionComponent } from './placeholder-promotion/placeholder-promotion.component'

const components = [
	PlaceholderAppointmentsComponent,
	PlaceholderWaitingPatientComponent,
	PlaceholderDoctorComponent,
	PlaceholderPatientComponent,
	PlaceholderPromotionComponent,
]

@NgModule({
	declarations: [...components],
	imports: [SharedModule],
	exports: [...components],
})
export class PlaceholderModule {}
