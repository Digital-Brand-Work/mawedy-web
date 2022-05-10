import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class DoctorAvailabilityModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
