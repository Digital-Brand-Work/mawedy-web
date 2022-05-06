import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AddMedicalServiceModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
