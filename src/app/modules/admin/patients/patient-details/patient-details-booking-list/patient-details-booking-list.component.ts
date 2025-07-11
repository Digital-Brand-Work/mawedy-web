import { AppointmentService } from './../../../appointments/appointment.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { BaseService } from './../../../../../../@digital_brand_work/api/base.api'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Appointment } from 'app/modules/admin/appointments/appointment.model'
import { BehaviorSubject } from 'rxjs'
import { UploadResultModal } from '../modal/patient-details-booking-list-uploading-result/patient-details-booking-list-uploading-result.service'
import { AlertState } from 'app/components/alert/alert.service'
import { ErrorHandlerService } from 'app/app-core/misc/error-handler.service'

@Component({
	selector: 'patient-details-booking-list',
	templateUrl: './patient-details-booking-list.component.html',
	styleUrls: ['./patient-details-booking-list.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientDetailsBookingListComponent implements OnInit {
	constructor(
		private _http: HttpClient,
		private _alert: AlertState,
		private _indexDBService: NgxIndexedDBService,
		private _uploadResultModal: UploadResultModal,
		private _errorHandlerService: ErrorHandlerService,
		private _appointmentAPI: AppointmentService,
	) {}

	@Output()
	onUpdateAppointment = new EventEmitter<Appointment>()

	@Input()
	appointments: Appointment[] = []

	uploadResultOpened$: BehaviorSubject<boolean> =
		this._uploadResultModal.opened$

	ngOnInit(): void {}

	followUp(appointment: Appointment) {
		this._appointmentAPI
			.update(appointment.id, {
				follow_up: !appointment.follow_up,
			})
			.subscribe({
				next: (data: any) => {
					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `${
							appointment.follow_up
								? 'Request for follow up cancelled'
								: 'Appointment Follow up success'
						}`,
						message: `Patient will be notified for his follow up`,
						type: 'success',
					})

					this.onUpdateAppointment.emit(data.data)
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}

	readFile(event: any, appointment: Appointment): void {
		this.uploadResultOpened$.next(true)

		this._uploadResultModal.file$.next(event.target.files[0].name)

		let form = new FormData()

		form.append('file', event.target.files[0])

		new BaseService(
			this._http,
			this._indexDBService,
			`v1/clinic/appointments/${appointment.id}/result`,
		)
			.post(form)
			.subscribe({
				next: (data: any) => {
					this.uploadResultOpened$.next(false)

					this._alert.add({
						id: Math.floor(Math.random() * 100000000000).toString(),
						title: `Medical Result uploaded successfully`,
						message: `Patient will see the results if she has the mawedy mobile application`,
						type: 'success',
					})

					this.onUpdateAppointment.emit(data.data)
				},
				error: (http) => {
					this._errorHandlerService.handleError(http)
				},
			})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
