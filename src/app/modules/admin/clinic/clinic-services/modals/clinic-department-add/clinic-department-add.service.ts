import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AddDepartmentModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
