import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
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
import { BehaviorSubject, Subject } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { StoreRegisterRule } from 'app/mawedy-core/rules/register.request'

@Component({
	selector: 'partner-with-us-section1-first-step',
	templateUrl: './partner-with-us-section1-first-step.component.html',
	styleUrls: ['./partner-with-us-section1-first-step.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1FirstStepComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _storeRegisterRule: StoreRegisterRule,
	) {}

	unsubscribe: Subject<any> = new Subject<any>()

	@ViewChild('ngForm') ngForm!: NgForm

	@ViewChild('input') input!: ElementRef

	@Output() onNext = new EventEmitter<{
		form: FormGroup
		trade_license_photo: any
	}>()

	@Input() step: 'one' | 'two' = 'one'

	@Input() emailErrors: boolean = false

	@Input() phoneErrors: boolean = false

	@Input() isProcessing: boolean = false

	@Input() focus$!: BehaviorSubject<boolean>

	form: FormGroup = this._formBuilder.group(this._storeRegisterRule.firstForm)

	filename: string = ''

	file?: File

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

	setTradeLicense(event: any): void {
		this.file = event.target.files[0]

		this.filename = event.target.files[0].name
	}
}
