import { ClinicTimeSlot } from './../../modules/admin/clinic/clinic.model'
import { ClinicTimingSelectModal } from 'app/modules/admin/clinic/clinic-timings/modals/clinic-timings-select-modal/clinic-timings.select-moda.service'
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'clinic-timing-input',
	templateUrl: './clinic-timing-input.component.html',
	styleUrls: ['./clinic-timing-input.component.scss'],
})
export class ClinicTimingInputComponent implements OnInit {
	constructor(private _clinicTimingSelectModal: ClinicTimingSelectModal) {}

	@Output() onChangeTime = new EventEmitter<{ start: any; end: any }>()

	@Input() timeslot?: ClinicTimeSlot

	opened$: BehaviorSubject<boolean> = this._clinicTimingSelectModal.opened$

	timing$: BehaviorSubject<ClinicTimeSlot> = this._clinicTimingSelectModal.timing$

	ngOnInit(): void {}

	openTimeSheet(): void {
		this.opened$.next(true)

		this.timing$.next(this.timeslot)
	}

	resolveTiming(timing: string): string {
		const time = parseInt(timing.split(':')[0])

		if (time < 13) {
			return `${timing} AM`
		}

		return `${time - 12}:${timing.split(':')[1]} PM`
	}
}
