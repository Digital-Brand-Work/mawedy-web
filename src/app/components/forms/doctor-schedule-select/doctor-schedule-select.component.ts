import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	Input,
} from '@angular/core'

@Component({
	selector: 'doctor-schedule-select',
	templateUrl: './doctor-schedule-select.component.html',
	styleUrls: ['./doctor-schedule-select.component.scss'],
})
export class DoctorScheduleSelectComponent implements OnInit {
	constructor(private _cdr: ChangeDetectorRef) {}

	@Output() onTimeSelected = new EventEmitter<string>()

	@Input() timing: string

	@Input() disabled: boolean

	@Input() day: boolean

	time = {
		hours: [],
		minutes: [],
	}

	selectedTime = {
		meridian: 'AM',
		hour: '0',
		minutes: '0',
	}

	setTime(): void {
		if (this.selectedTime.meridian === 'AM') {
			this.timing = `${this.toFixedTwo(
				parseInt(this.selectedTime.hour) + 12,
			)}:${this.toFixedTwo(parseInt(this.selectedTime.minutes))}`
		} else {
			this.timing = `${this.toFixedTwo(
				parseInt(this.selectedTime.hour),
			)}:${this.toFixedTwo(parseInt(this.selectedTime.minutes))}`
		}

		this.onTimeSelected.emit(this.timing)
	}

	ngOnInit(): void {
		if (this.timing !== undefined) {
			let hour: any = this.timing.split(':')[0]

			let min = this.timing.split(':')[1]

			let part = hour > 12 ? 'PM' : 'AM'

			if (parseInt(hour) === 0) hour = 12

			min = (min + '').length === 1 ? `0${min}` : min

			hour = hour > 12 ? hour - 12 : hour

			this.selectedTime = {
				hour: hour,
				minutes: min,
				meridian: part,
			}
		}
	}

	ngAfterViewInit(): void {
		for (let i = 0; i <= 12; i++) {
			this.time.hours.push(i)
		}

		for (let i = 0; i <= 59; i++) {
			if (i % 5 === 0) {
				this.time.minutes.push(i)
			}
		}

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}
}
