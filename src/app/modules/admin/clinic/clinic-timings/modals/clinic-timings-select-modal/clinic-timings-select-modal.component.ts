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

	ngOnDestroy(): void {}

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	handleTimeValue(): string {
		const meridian = this.selectedTime.split(' ')

		if (meridian[1] !== 'AM') {
			let time = meridian[0].split(':')

			time[0] = (parseInt(time[0]) + 12).toString()

			return time.join(':')
		}

		return meridian[0]
	}

	timeWithMeridian(value: string): string {
		let time = value.split(':')

		if (parseInt(time[0]) < 13) {
			return time.join(':') + ' AM'
		}

		time[0] = (parseInt(time[0]) - 12).toString()

		time[0] = this.toFixedTwo(parseInt(time[0]))

		return time.join(':') + ' PM'
	}

	handleTimeChange(timing: 'start' | 'end'): void {
		this.timing$.pipe(take(1)).subscribe((timeSlot) => {
			if (timing === 'start') {
				return this.timing$.next({ ...timeSlot, start: this.handleTimeValue() })
			}

			return this.timing$.next({ ...timeSlot, end: this.handleTimeValue() })
		})
	}

	handleOpenAndClose(mode: 'open' | 'close' | 'custom'): void {
		this.timing$.pipe(take(1)).subscribe((timeSlot) => {
			if (mode === 'open') {
				this.timing$.next({ ...timeSlot, start: '00:00', end: '24:00', active: true })
			}

			if (mode === 'close') {
				this.timing$.next({ ...timeSlot, start: null, end: null, active: false })
			}

			if (mode === 'custom') {
				this.timing$.next({ ...timeSlot, start: '01:00', end: '24:30', active: true })
			}
		})
	}
}
