import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddDoctorModal } from './doctor-add.service'

@Component({
	selector: 'doctor-add',
	templateUrl: './doctor-add.component.html',
	styleUrls: ['./doctor-add.component.scss'],
})
export class DoctorAddComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _addDoctorModal: AddDoctorModal,
		private _cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addDoctorModal.opened$

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.opened$.subscribe()

		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}
}
