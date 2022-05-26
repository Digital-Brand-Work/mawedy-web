import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { FuseNavigationItem } from '@fuse/components/navigation'

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	constructor() {}

	_navigation: BehaviorSubject<FuseNavigationItem[]> = new BehaviorSubject<
		FuseNavigationItem[]
	>([])

	get navigation$(): Observable<FuseNavigationItem[]> {
		return this._navigation.asObservable()
	}
}
