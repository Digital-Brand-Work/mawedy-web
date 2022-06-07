import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class EditClinicDepartmentModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
