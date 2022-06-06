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

	setTime() {
		this.timing = `${this.selectedTime.hour}:${this.selectedTime.minutes}`

		if (this.selectedTime.meridian === 'AM') {
			this.timing = `${parseInt(this.selectedTime.hour) + 12}:${
				this.selectedTime.minutes
			}`
		}

		this.onTimeSelected.emit(this.toFixedTwo(parseInt(this.timing)))
	}

	ngOnInit(): void {}

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
