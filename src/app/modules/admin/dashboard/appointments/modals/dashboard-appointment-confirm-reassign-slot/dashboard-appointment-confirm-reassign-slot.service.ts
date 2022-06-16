import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'

@Injectable({
	providedIn: 'root',
})
export class DashboardAppointmentConfirmReassignSlotModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	doctor$: BehaviorSubject<Doctor | null> =
		new BehaviorSubject<Doctor | null>(null)

	date$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
		null,
	)

	appointmentSlot$: BehaviorSubject<{
		start_time: string
		end_time: string
	} | null> = new BehaviorSubject<{
		start_time: string
		end_time: string
	} | null>(null)
}
