import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'home-section2-first-step',
	templateUrl: './home-section2-first-step.component.html',
	styleUrls: ['./home-section2-first-step.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2FirstStepComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	_unsubscribeAll: Subject<any> = new Subject<any>()

	@ViewChild('input') input!: ElementRef

	@Output() onNext = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	@Input() focus$!: BehaviorSubject<boolean>

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterContentInit(): void {
		this.focus$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()
	}
}
