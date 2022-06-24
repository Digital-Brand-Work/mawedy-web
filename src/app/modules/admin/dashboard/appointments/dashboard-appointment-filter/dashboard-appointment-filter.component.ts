import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { empty, hasData } from 'app/mawedy-core/helpers'
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Department } from 'app/modules/admin/clinic/department/department.model'
import { Observable, take } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { MedicalService } from 'app/modules/admin/clinic/clinic-services/medical-service.model'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
import * as DashboardAppointmentActions from '../dashboard-appointment.actions'
import * as dayjs from 'dayjs'

@Component({
	selector: 'dashboard-appointment-filter',
	templateUrl: './dashboard-appointment-filter.component.html',
	styleUrls: ['./dashboard-appointment-filter.component.scss'],
})
export class DashboardAppointmentFilterComponent implements OnInit {
	constructor(
		private _store: Store<{
			department: Department[]
			medicalService: MedicalService[]
		}>,
		private _appointmentAPI: AppointmentService,
	) {}

	filter = {
		status: 'Confirmed',
		department_id: '',
		doctor_id: '',
		service_id: '',
	}

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	medicalServices: MedicalService[] = []

	doctors: Doctor[] = []

	ngOnInit(): void {}

	identity = (item: any): any => item

	setMedicalServices(id: string) {
		this.departments$.pipe(take(1)).subscribe((store: any) => {
			const departments: Department[] = Object.values(store.entities)

			const department = departments.find(
				(department) => department.id === id,
			)

			if (!empty(department)) {
				this.medicalServices = department.services

				if (hasData(department.services)) {
					this.doctors = department.services[0].doctors
				}
			}

			this.filter.service_id = ''

			this.filter.doctor_id = ''
		})
	}

	onFilter() {
		const search = {
			waiting: 'false',
			date: dayjs().toJSON(),
			...this.filter,
		}

		for (let key in search) {
			if (empty(search[key])) {
				delete search[key]
			}
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this._store.dispatch(
					DashboardAppointmentActions.loadDashboardAppointments({
						dashboardAppointments: appointments.data,
					}),
				)
			})
	}

	onReset() {
		const search = {
			waiting: 'false',
			date: dayjs().toJSON(),
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this._store.dispatch(
					DashboardAppointmentActions.loadDashboardAppointments({
						dashboardAppointments: appointments.data,
					}),
				)
			})
	}
}
