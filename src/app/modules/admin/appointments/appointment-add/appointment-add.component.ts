import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddAppointmentModal } from './appointment-add.service'
import { createMask } from '@ngneat/input-mask'
import { FormControl } from '@angular/forms'

@Component({
	selector: 'appointment-add',
	templateUrl: './appointment-add.component.html',
	styleUrls: ['./appointment-add.component.scss'],
	animations: [...dbwAnimations],
})
export class AppointmentAddComponent implements OnInit {
	constructor(
		private addAppointmentModal: AddAppointmentModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	_unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.addAppointmentModal.opened$

	currencyInputMask = createMask({
		alias: 'numeric',
		groupSeparator: ',',
		digits: 2,

		digitsOptional: false,
		prefix: 'AED ',
		placeholder: '0',
	})
	currencyFC = new FormControl('')

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.opened$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()

		this.cdr.detach()
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
