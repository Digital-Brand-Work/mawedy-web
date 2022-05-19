import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'partner-with-us-section1',
	templateUrl: './partner-with-us-section1.component.html',
	styleUrls: ['./partner-with-us-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1Component implements OnInit {
	constructor(private _scrollService: ScrollService) {}

	step: 'one' | 'two' = 'one'

	unsubscribe$: Subject<any> = new Subject<any>()

	focus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	ngOnInit(): void {
		this.focus$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			setTimeout(() => {
				this._scrollService.scrollToTop()
			}, 50)
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
