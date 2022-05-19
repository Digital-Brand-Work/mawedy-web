import { takeUntil } from 'rxjs/operators'
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
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'partner-with-us-section1-first-step',
	templateUrl: './partner-with-us-section1-first-step.component.html',
	styleUrls: ['./partner-with-us-section1-first-step.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1FirstStepComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	unsubscribe: Subject<any> = new Subject<any>()

	@ViewChild('input') input!: ElementRef

	@Output() onNext = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	@Input() focus$!: BehaviorSubject<boolean>

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterContentInit(): void {
		this.input?.nativeElement.focus()
	}

	ngOnDestroy(): void {
		this.unsubscribe.next(null)

		this.unsubscribe.complete()
	}
}
