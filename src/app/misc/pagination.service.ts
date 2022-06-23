import { Injectable } from '@angular/core'
import { PaginationData } from 'app/app.resolvers'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class PaginationService {
	patients$: BehaviorSubject<PaginationData | null> = new BehaviorSubject(
		null,
	)

	doctors$: BehaviorSubject<PaginationData | null> = new BehaviorSubject(null)

	dashboardAppointments$: BehaviorSubject<PaginationData | null> =
		new BehaviorSubject(null)

	dashboardWaitingPatients$: BehaviorSubject<PaginationData | null> =
		new BehaviorSubject(null)

	dashboardApprovals$: BehaviorSubject<PaginationData | null> =
		new BehaviorSubject(null)

	promotions$: BehaviorSubject<PaginationData | null> = new BehaviorSubject(
		null,
	)
}
