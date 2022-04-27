import { BehaviorSubject, Observable } from 'rxjs'
import { Inject, Injectable } from '@angular/core'
import { map, take, filter } from 'rxjs/operators'

@Injectable({
	providedIn: 'root',
})
export class BaseState<T extends { id?: string | number }> {
	constructor(
		@Inject('state')
		public state: {
			name: string
			willSaveLocally?: boolean
		},
	) {
		this.get()
	}

	/*
	 * When subscribed as async subscription will automatically be destroyed when component is destroyed.
	 * When subscribed by function need to call ngOnDestroy.
	 * @param willSaveLocally
	    will save and retrieve data from storage driver: localStorage
	    //TODO:Save to IndexedDB
	 **/

	state$ = new BehaviorSubject<T[]>([])

	activeState$ = new BehaviorSubject<T | null>(null)

	initialize(data: T[]): Observable<T[]> {
		return this.setState(data)
	}

	setActiveState(data: T): Observable<T> {
		this.activeState$.next(data)

		return this.activeState$.asObservable() as Observable<T>
	}

	get(): Observable<T[]> {
		if (this.state.willSaveLocally) {
			const stateInStorage = localStorage.getItem(this.state.name)

			if (stateInStorage !== null) {
				return this.setState(JSON.parse(stateInStorage))
			}
		}

		return this.setState([])
	}

	findOne(id: string): Observable<T> {
		return <Observable<T>>(
			this.state$
				.pipe(take(1))
				.pipe(map((state) => state.find((previousState) => id == previousState?.id)))
		)
	}

	add(data: T): void {
		this.state$.pipe(take(1)).subscribe((state) => {
			if (!state.some((previousState) => data.id == previousState?.id)) {
				this.setState([...state, data])

				return
			}
		})
	}

	update(data: T): void {
		this.state$.pipe(take(1)).subscribe((state) => {
			let nextState = state

			const index = state.findIndex((previousState) => data.id == previousState?.id)

			if (index >= 0) {
				nextState[index] = data

				const state: any = [...nextState]

				this.setState(state)

				return
			}
		})
	}

	//TODO:splice Observable not changing the state
	remove(id: string): void {
		this.state$.pipe(take(1)).subscribe((state) => {
			let nextState = state

			const index = state.findIndex((previousState) => id == previousState?.id)

			if (index >= 0) {
				nextState.splice(index, 1)

				const state: any = [...nextState]

				this.setState(state)

				return
			}
		})
	}

	setState(state: any): Observable<T[]> {
		this.state$.next(state)

		if (this.state.willSaveLocally) {
			localStorage.setItem(this.state.name, JSON.stringify(state))
		}

		return this.state$.asObservable()
	}
}
