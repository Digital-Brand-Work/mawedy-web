import {
	ElementRef,
	Output,
	Directive,
	AfterViewInit,
	OnDestroy,
	EventEmitter,
} from '@angular/core'
import { fromEvent, startWith, Subscription } from 'rxjs'

@Directive({
	selector: '[is-in-screen]',
})
export class ElementIsInScreenDirective implements AfterViewInit, OnDestroy {
	constructor(private element: ElementRef) {}

	@Output()
	onElementShow = new EventEmitter<void>()

	elementPos: number = 0
	elementHeight: number = 0

	scrollPos: number = 0
	windowHeight: number = 0

	subscriptionScroll?: Subscription

	subscriptionResize?: Subscription

	saveDimensions() {
		this.elementPos = this.getOffsetTop(this.element.nativeElement)

		this.elementHeight = this.element.nativeElement.offsetHeight

		this.windowHeight = window.innerHeight
	}

	saveScrollPos() {
		this.scrollPos = window.scrollY
	}

	getOffsetTop(element: any) {
		let offsetTop = element.offsetTop || 0
		if (element.offsetParent) {
			offsetTop += this.getOffsetTop(element.offsetParent)
		}
		return offsetTop
	}

	checkVisibility() {
		if (this.isVisible()) {
			this.saveDimensions()

			if (this.isVisible()) {
				this.unsubscribe()

				this.onElementShow.emit()
			}
		}
	}

	isVisible() {
		return (
			this.scrollPos >= this.elementPos ||
			this.scrollPos + this.windowHeight >=
				this.elementPos + this.elementHeight - 100
		)
	}

	subscribe() {
		this.subscriptionScroll = fromEvent(window, 'scroll')
			.pipe(startWith(null))
			.subscribe(() => {
				this.saveScrollPos()
				this.checkVisibility()
			})

		this.subscriptionResize = fromEvent(window, 'resize')
			.pipe(startWith(null))
			.subscribe(() => {
				this.saveScrollPos()
				this.checkVisibility()
			})
	}

	unsubscribe() {
		if (this.subscriptionScroll) {
			this.subscriptionScroll.unsubscribe()
		}
		if (this.subscriptionResize) {
			this.subscriptionResize.unsubscribe()
		}
	}

	ngAfterViewInit() {
		this.subscribe()
	}

	ngOnDestroy() {
		this.unsubscribe()
	}
}
