import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	ChangeDetectorRef,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { WeekDay, weekDays } from 'app/app-core/constants/app.constant'
import { TimeSlot } from '../../../doctor.model'

@Component({
	selector: 'working-schedule',
	templateUrl: './working-schedule.component.html',
	styleUrls: ['./working-schedule.component.scss'],
	animations: [...dbwAnimations],
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
		setTimeout(() => {
			for (let day of this.weekdays) {
				this.currentTimeSlots[day] = {
					active: true,
					start: '00:00',
					end: '00:30',
				}

				const timeslot = this.timeslots.find(
					(slot) => slot.day.toLowerCase() === day.toLowerCase(),
				)

				if (timeslot && timeslot.start && timeslot.end) {
					this.currentTimeSlots[day] = {
						active: timeslot.active,
						start: timeslot.start,
						end: timeslot.end,
					}
				}

				if (timeslot) {
					this.currentTimeSlots[day].active = timeslot.active
				}
			}
		}, 200)

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
}
