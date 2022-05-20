import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Inject,
	Input,
	OnInit,
	Output,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { isPlatformBrowser } from '@angular/common'

@Component({
	selector: 'partner-with-us-section1-first-step',
	templateUrl: './partner-with-us-section1-first-step.component.html',
	styleUrls: ['./partner-with-us-section1-first-step.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1FirstStepComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _cdr: ChangeDetectorRef,
	) {}

	unsubscribe: Subject<any> = new Subject<any>()

	@ViewChild('input') input!: ElementRef

	@Output() onNext = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	@Input() focus$!: BehaviorSubject<boolean>

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe.next(null)

		this.unsubscribe.complete()

		this._cdr.detach()
	}
}
