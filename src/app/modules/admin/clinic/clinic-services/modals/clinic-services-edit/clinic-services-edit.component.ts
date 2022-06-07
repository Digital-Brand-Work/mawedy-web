import { dbwAnimations } from './../../../../../../../@digital_brand_work/animations/animation.api'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { EditClinicServiceModal } from './clinic-services-edit.service'

@Component({
	selector: 'clinic-services-edit',
	templateUrl: './clinic-services-edit.component.html',
	styleUrls: ['./clinic-services-edit.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicServicesEditComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _editClinicServiceModal: EditClinicServiceModal,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('description', { read: ElementRef }) textArea: ElementRef

	opened$: BehaviorSubject<boolean> = this._editClinicServiceModal.opened$

	unsubscribe$: Subject<any> = new Subject<any>()

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
