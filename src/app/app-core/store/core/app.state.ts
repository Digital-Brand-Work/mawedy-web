import { EntityState } from '@ngrx/entity'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { Patient } from 'app/app-core/models/patient.model'

export interface AppState {
	clinic: EntityState<Clinic>
	patients: EntityState<Patient>
	appSubscription: EntityState<any>
}
