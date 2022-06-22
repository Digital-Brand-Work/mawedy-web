import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { BreakPoint } from '../models/core.model'

@Injectable({
	providedIn: 'root',
})
export class MediaService {
	constructor(@Inject(PLATFORM_ID) private _platformID: Object) {
		this.onResize()
		this.onScroll()
		this.getMedia().subscribe((innerWidth) =>
			this.resolveBreakPoint(innerWidth),
		)
	}

	breakpoints$ = new BehaviorSubject<BreakPoint>('phone')

	media$ = new BehaviorSubject<number>(typeof window === 'undefined' ? 0 : 0)

	private scrollTop$ = new BehaviorSubject<number>(
		typeof window === 'undefined' ? 0 : 0,
	)

	onResize() {
		if (isPlatformBrowser(this._platformID)) {
			if (typeof window !== 'undefined') {
				this.media$.next(window.innerWidth)
			}
		}
	}

	getMedia(): Observable<number> {
		return this.media$.asObservable()
	}

	onScroll() {
		if (isPlatformBrowser(this._platformID)) {
			if (typeof window !== 'undefined') {
				this.scrollTop$.next(window.pageYOffset)
			}
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
