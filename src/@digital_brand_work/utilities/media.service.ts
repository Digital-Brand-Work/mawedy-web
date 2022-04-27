import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { BreakPoint } from '../models/core.model'

@Injectable({
	providedIn: 'root',
})
export class MediaService {
	constructor() {
		this.onResize()
		this.onScroll()
		this.getMedia().subscribe((innerWidth) =>
			this.resolveBreakPoint(innerWidth),
		)
	}
	public breakpoints$ = new BehaviorSubject<BreakPoint>('phone')

	private media$ = new BehaviorSubject<number>(
		typeof window === 'undefined' ? 0 : window.innerWidth,
	)

	private scrollTop$ = new BehaviorSubject<number>(
		typeof window === 'undefined' ? 0 : window.pageYOffset,
	)

	onResize() {
		if (typeof window !== 'undefined') {
			this.media$.next(window.innerWidth)
		}
	}

	getMedia(): Observable<number> {
		return this.media$.asObservable()
	}

	onScroll() {
		if (typeof window !== 'undefined') {
			this.scrollTop$.next(window.pageYOffset)
		}
	}

	geScrollTop(): Observable<number> {
		return this.scrollTop$.asObservable()
	}

	resolveBreakPoint(innerWidth: number): void {
		{
			this.breakpoints$.next('phone')

			if (innerWidth >= 768) {
				this.breakpoints$.next('tablet')
			}
			if (innerWidth >= 1024) {
				this.breakpoints$.next('laptop')
			}
			if (innerWidth >= 1280) {
				this.breakpoints$.next('desktop')
			}
			if (innerWidth >= 1536) {
				this.breakpoints$.next('max')
			}
		}
	}
}
