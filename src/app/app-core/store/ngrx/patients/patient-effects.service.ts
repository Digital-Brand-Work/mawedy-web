import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { PatientApi } from 'app/app-core/http/api/patient.api'
import { Patient } from 'app/app-core/models/patient.model'
import { PHPResponse } from '@digital_brand_work/models/core.model'

@Injectable({ providedIn: 'root' })
export class PatientEffectService {
	constructor(private _patientApi: PatientApi) {}

	get(): Observable<PHPResponse<Patient[]>> {
		return this._patientApi.get()
	}

	paginate(url: string) {
		this._patientApi.paginate(url)
	}

	add(patient: Patient): Observable<Patient> {
		return this._patientApi
			.post(patient)
			.pipe(map((response) => response.data))
	}

	update(patient: Patient): Observable<Patient> {
		return this._patientApi
			.update(patient.id, patient)
			.pipe(map((response) => response.data))
	}

	remove(id: string): Observable<void> {
		return this._patientApi.remove(id)
	}
}
