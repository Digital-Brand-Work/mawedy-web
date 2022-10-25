import { empty, hasData } from 'app/app-core/helpers'
import { AppointmentService } from 'app/modules/admin/appointments/appointment.service'
import { Department } from './../../../clinic/department/department.model'
import { MedicalService } from './../../../clinic/clinic-services/medical-service.model'
import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as WaitingPatientsActions from '../dashboard-waiting-patient.actions'
import { Observable, take } from 'rxjs'
import * as dayjs from 'dayjs'
import { Doctor } from 'app/modules/admin/doctors/doctor.model'
@Component({
	selector: 'waiting-patients-filter',
	templateUrl: './waiting-patients-filter.component.html',
	styleUrls: ['./waiting-patients-filter.component.scss'],
})
export class WaitingPatientsFilterComponent implements OnInit {
	constructor(
		private _store: Store<{
			department: Department[]
			medicalService: MedicalService[]
		}>,
		private _appointmentAPI: AppointmentService,
	) {}

	filter = {
		department_id: '',
		doctor_id: '',
		service_id: '',
		status: 'Confirmed',
		to: dayjs().add(1, 'day').format('YYYY-MM-DD'),
		from: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
	}

	departments$?: Observable<Department[]> = this._store.pipe(
		select('department'),
	)

	medicalServices: MedicalService[] = []

	doctors: Doctor[] = []

	ngOnInit(): void {}

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
			waiting: 'true',
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
					WaitingPatientsActions.loadDashboardWaitingPatients({
						dashboardWaitingPatients: appointments.data,
					}),
				)
			})
	}

	onReset() {
		const search = {
			waiting: 'true',
			date: dayjs().toJSON(),
		}

		this._appointmentAPI
			.query(`?` + new URLSearchParams(search).toString())
			.subscribe((appointments: any) => {
				this._store.dispatch(
					WaitingPatientsActions.loadDashboardWaitingPatients({
						dashboardWaitingPatients: appointments.data,
					}),
				)
			})
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
