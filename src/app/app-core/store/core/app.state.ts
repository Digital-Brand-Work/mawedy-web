import { EntityState } from '@ngrx/entity'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'

export interface AppState {
	clinic: EntityState<Clinic>
}
