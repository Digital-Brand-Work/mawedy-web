import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AddClinicServiceModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
