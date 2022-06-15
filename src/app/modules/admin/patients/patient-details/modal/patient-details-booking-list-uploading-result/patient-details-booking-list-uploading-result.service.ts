import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class UploadResultModal {
	opened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	file$: BehaviorSubject<string> = new BehaviorSubject<string>('')
}
