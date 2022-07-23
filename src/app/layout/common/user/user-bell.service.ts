import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AnimateBellService {
	animate$ = new BehaviorSubject<boolean>(false)
}
