import { dbwAnimations } from './../../../../../../../@digital_brand_work/animations/animation.api'
import { ClinicTimingSelectModal } from './clinic-timings.select-moda.service'
import { Component, HostListener, OnInit } from '@angular/core'
import { BehaviorSubject, take } from 'rxjs'
import { ClinicTimeSlot } from '../../../clinic.model'

@Component({
	selector: 'clinic-timings-select-modal',
	templateUrl: './clinic-timings-select-modal.component.html',
	styleUrls: ['./clinic-timings-select-modal.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicTimingsSelectModalComponent implements OnInit {
	constructor(private _clinicTimingSelectModal: ClinicTimingSelectModal) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler(): void {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> = this._clinicTimingSelectModal.opened$

	timing$: BehaviorSubject<ClinicTimeSlot> = this._clinicTimingSelectModal.timing$

	selectedTime: string = ''

	ngOnInit(): void {}

	identity = (item: any): any => item

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	ngOnDestroy(): void {}

	handleTimeValue(): string {
		// const meridian = this.selectedTime.split()

		return ''
	}

	handleTimeChange(timing: 'start' | 'end') {
		this.timing$.pipe(take(1)).subscribe((timeSlot) => {
			if (timing === 'start') {
				this.timing$.next({ ...timeSlot, start: this.handleTimeValue() })
			}
		})
	}

	handleOpenAndClose(mode: 'open' | 'close' | 'custom') {}
}
