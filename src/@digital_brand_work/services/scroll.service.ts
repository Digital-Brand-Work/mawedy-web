import { isPlatformBrowser } from '@angular/common'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ScrollService {
	constructor(@Inject(PLATFORM_ID) private _platformID: Object) {}

	scrollToTop(): void {
		document.body.scrollTop = 0

		if (isPlatformBrowser(this._platformID)) {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}
	}
}
