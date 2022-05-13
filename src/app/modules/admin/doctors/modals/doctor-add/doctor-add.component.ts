import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
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
		private addDoctorModal: AddDoctorModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.addDoctorModal.opened$

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.opened$.subscribe((value) => console.log(value))

		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()

		this.cdr.detach()
	}

	ngAfterViewInit(): void {
		this.opened$
			.pipe(takeUntil(this.unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})

		this.cdr.detectChanges()
	}
}
