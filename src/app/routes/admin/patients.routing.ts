import { PatientDetailsComponent } from './../../modules/admin/patients/patient-details/patient-details.component'
import { PatientsComponent } from './../../modules/admin/patients/patients.component'
import { Routes } from '@angular/router'

export const patientRoutes: Routes = [
	{
		path: '',
		component: PatientsComponent,
	},
	{
		path: ':patient_name',
		component: PatientDetailsComponent,
	},
]
