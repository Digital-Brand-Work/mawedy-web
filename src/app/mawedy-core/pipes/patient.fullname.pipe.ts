import { Patient } from 'app/modules/admin/patients/patient.model'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'full_name' })
export class ToPatientFullName implements PipeTransform {
	transform(patient: Patient): string {
		return `${patient.first_name} ${patient.middle_name} ${patient.last_name}`
	}
}
