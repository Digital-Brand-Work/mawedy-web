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
import { AddClinicServiceModal } from './clinic-services-add.service'

@Component({
	selector: 'clinic-services-add',
	templateUrl: './clinic-services-add.component.html',
	styleUrls: ['./clinic-services-add.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesAddComponent implements OnInit {
	constructor(
		private addMedicalService: AddClinicServiceModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('description', { read: ElementRef }) textArea: ElementRef

	opened$: BehaviorSubject<boolean> = this.addMedicalService.opened$

	_unsubscribeAll: Subject<any> = new Subject<any>()

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
