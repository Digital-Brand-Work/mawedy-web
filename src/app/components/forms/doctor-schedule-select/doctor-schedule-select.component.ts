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

	@Output()
	onTimeSelected = new EventEmitter<string>()

	@Input()
	timing: string

	@Input()
	disabled: boolean

	@Input()
	day: boolean

	time = {
		hours: [],
		minutes: [],
	}

	selectedTime = {
		hour: '0',
		minutes: '0',
	}

	setTime(): void {
		this.timing = `${this.selectedTime.hour}:${this.selectedTime.minutes}`

		this.onTimeSelected.emit(this.timing)
	}

	ngOnInit(): void {
		if (this.timing !== undefined) {
			const [hour, minutes] = this.timing.split(':')

			this.selectedTime = {
				hour: hour,
				minutes: minutes,
			}
		}
	}

	ngAfterViewInit(): void {
		for (let i = 0; i <= 23; i++) {
			this.time.hours.push(this.toFixedTwo(i))
		}

		this.time.minutes.push('00')
		this.time.minutes.push('30')
		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	toFixedTwo(value: number): string {
		return (value < 10 ? '0' : '') + value
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
