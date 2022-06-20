import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from '../enums/index.db.enum'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject, take } from 'rxjs'
import { empty } from '../helpers'
import { DayTypes } from '../enums/day.enum'
import * as customFormatter from 'dayjs/plugin/customParseFormat'
import * as dayjs from 'dayjs'
import * as isToday from 'dayjs/plugin/isToday'

@Directive({
	selector: '[syncWithClinic]',
})
export class SyncWithClinicDirective {
	constructor(
		private _indexedDBService: NgxIndexedDBService,
		private _clinicUserService: ClinicUserService,
		private renderer: Renderer2,
		private hostElement: ElementRef,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	customParseFormat = customFormatter

	isToday = isToday

	@Input() day?: DayTypes

	@Input() slot?: string

	@Input() date?: Date

	ngAfterViewInit() {
		this._indexedDBService
			.getByKey(DB.CLINIC, 1)
			.pipe(take(1))
			.subscribe((results: any) => {
				if (!empty(results)) {
					const clinic: Clinic = results.data

					this.clinic$.next(clinic)

					if (this.day) {
						const timeSlot = clinic.timeslots.find(
							(slot) => slot.day === this.day,
						)

						dayjs.extend(this.customParseFormat)

						const timeSlotHasPassed = dayjs(
							this.slot,
							'HH:mm',
						).isBefore(dayjs())

						dayjs.extend(this.isToday)

						if (
							timeSlot.start > this.slot ||
							timeSlot.end < this.slot ||
							(timeSlotHasPassed && dayjs(this.date).isToday())
						) {
							'bg-gray-300 pointer-events-none text-white'
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
			})
	}
}
