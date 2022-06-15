import { empty } from 'app/mawedy-core/helpers'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject } from 'rxjs'
import { DayTypes } from '../enums/day.enum'
import * as dayjs from 'dayjs'
import { toTwelve } from '../helpers'
import * as customFormatter from 'dayjs/plugin/customParseFormat'

@Directive({
	selector: '[checkForAppointments]',
})
export class CheckForAppointmentsDirective {
	constructor(
		private _clinicUserService: ClinicUserService,
		private renderer: Renderer2,
		private hostElement: ElementRef,
	) {}

	// customParseFormat = require('dayjs/plugin/customParseFormat')

	customParseFormat = customFormatter

	unsubscribe$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	@Input() day?: DayTypes

	@Input() date?: Date

	@Input() start?: string

	@Input() end?: string

	@Input() schedule?: Appointment[]

	ngAfterViewInit() {
		// dayjs.extend(this.customParseFormat)

		// console.log(dayjs(this.start, 'HH:mm').format('HH:mm'))

		// console.log(this.start)

		// TODO: dayjs

		const hasAppointment = this.schedule.find(
			(appointment) =>
				dayjs(appointment.date).format('YYYY-MM-DD') ===
					dayjs(this.date).format('YYYY-MM-DD') &&
				this.day ===
					(dayjs(appointment.date).format('dddd') as DayTypes) &&
				(toTwelve(appointment.start_time) === toTwelve(this.start) ||
					toTwelve(appointment.end_time) === toTwelve(this.end)),
		)

		if (!empty(hasAppointment)) {
			'bg-rose-500 opacity-50 pointer-events-none text-white'
				.split(' ')
				.forEach((className: string) => {
					this.renderer.addClass(
						this.hostElement.nativeElement,
						className,
					)
				})
		}
	}
}
