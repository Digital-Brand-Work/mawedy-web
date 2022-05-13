import { NgModule } from '@angular/core'
import { ModalAppointmentComponent } from './modal-appointment/modal-appointment.component'
import { ModalDashboardComponent } from './modal-dashboard/modal-dashboard.component'
import { ModalClinicComponent } from './modal-clinic/modal-clinic.component'
import { ModalDoctorComponent } from './modal-doctor/modal-doctor.component'
import { ModalSubscriptionComponent } from './modal-subscription/modal-subscription.component'
import { SharedModule } from 'app/shared/shared.module'
import { ModalPatientComponent } from './modal-patient/modal-patient.component'

const components = [
	ModalAppointmentComponent,
	ModalDashboardComponent,
	ModalClinicComponent,
	ModalDoctorComponent,
	ModalSubscriptionComponent,
	ModalPatientComponent,
]

@NgModule({
	declarations: [...components],
	imports: [SharedModule],
	exports: [...components],
})
export class ModalModule {}
