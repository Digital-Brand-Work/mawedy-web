import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class DashboardAppointmentDetailsModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
