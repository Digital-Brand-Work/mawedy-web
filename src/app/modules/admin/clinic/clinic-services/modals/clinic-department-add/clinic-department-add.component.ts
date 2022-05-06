import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddDepartmentModal } from './clinic-department-add.service'

@Component({
	selector: 'clinic-department-add',
	templateUrl: './clinic-department-add.component.html',
	styleUrls: ['./clinic-department-add.component.scss'],
})
export class ClinicDepartmentAddComponent implements OnInit {
	constructor(
		private addDepartment: AddDepartmentModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	opened$: BehaviorSubject<boolean> = this.addDepartment.opened$

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
}
