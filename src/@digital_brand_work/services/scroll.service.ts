import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class ScrollService {
	scrollToTop(): void {
		document.body.scrollTop = 0

		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}
}
