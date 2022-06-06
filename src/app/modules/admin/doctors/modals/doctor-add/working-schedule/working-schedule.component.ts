import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	ChangeDetectorRef,
} from '@angular/core'
import { WeekDay, weekDays } from 'app/mawedy-core/constants/app.constant'
import { TimeSlot } from '../../../doctor.model'

@Component({
	selector: 'working-schedule',
	templateUrl: './working-schedule.component.html',
	styleUrls: ['./working-schedule.component.scss'],
})
export class WorkingScheduleComponent implements OnInit {
	constructor(private _cdr: ChangeDetectorRef) {}

	@Output() onChangeSchedule = new EventEmitter()

	@Input() timeslots: TimeSlot[] = []

	weekdays: string[] = weekDays

	isAvailable: boolean = true

	currentTimeSlots: {
		[key: string]: {
			active: boolean
			start: string
			end: string
		}
	} = {}

	ngOnInit(): void {}

	ngAfterContentChecked(): void {
		this._cdr.detectChanges()
	}

	ngAfterViewInit(): void {
		for (let day of this.weekdays) {
			this.currentTimeSlots[day] = {
				active: true,
				start: '00:00',
				end: '00:01',
			}
		}

		this._cdr.detectChanges()

		this.onChangeSchedule.emit(this.currentTimeSlots)
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	toggleAvailability(mode: boolean) {
		for (let key in this.currentTimeSlots) {
			this.currentTimeSlots[key].active = mode
		}

		this.isAvailable = mode

		this._cdr.detectChanges()

		this.onChangeSchedule.emit(this.currentTimeSlots)
	}

	shorten(day: WeekDay) {
		const char = day.split('')

		return `${char[0]}${char[1]}${char[2]}`
	}
}
